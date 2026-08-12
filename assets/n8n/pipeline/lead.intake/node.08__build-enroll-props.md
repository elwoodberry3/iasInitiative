# Build Enroll Props
**NODE 08**  
Assembles the property object for a brand-new contact. Packages email, first name, source, and the initial drip fields (**drip_status enrolled**, **drip_started_at**, **drip_last_step** 0, submission count) into the exact shape the HubSpot upsert expects — separating data-shaping from the API call that follows.

## Configuration Settings
**Node Type**: Code - Runs custom JavaScript or Python code 

### Parameters  
**Mode**: Run Once For Each Item
**Language**: Javascript

#### JavaScript 
```js


// Read identity from the enroll-props node (upsert response replaced $json).

const s = $('Build Enroll Props').item.json;
const first = s.firstName || 'there';
const email = s.email;
const html = `<p>What's up ${first},</p><p>You're in. Here's your training: <a href="TODO_TRAINING_URL">watch it here</a>.</p><p>The workflow file from the video is on that page too — import it and make it yours.</p><p>— Steve<br/>I Automate Shit</p><hr/><p style="font-size:12px;color:#6B7280">You signed up at iautomateshit.<a href="TODO_UNSUB_URL?e=${encodeURIComponent(email)}">Unsubscribe</a>.</p>`;

return { json: { resendBody: {
  from: 'Steve <TODO_FROM@mail.yourdomain.com>',
  to: [email],
  subject: 'Your IAS training (+ the workflow)',
  html,
  headers: { 'List-Unsubscribe': '<TODO_UNSUB_URL?e=' + encodeURIComponent(email) + '>' },
  tags: [{ name: 'type', value: 'confirmation' }]
}}};


```  

### Settings
**Always Output Data**: Inactive
**Execute Once**: Inactive
**Retry On Fail**: Inactive
**On Error**: Inactive

**Notes**: Builds the new contact's property set for HubSpot. 