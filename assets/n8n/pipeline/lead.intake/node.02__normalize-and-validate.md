# Normalize & Validate
**NODE 02**  
Cleans the raw form data before anything touches HubSpot. Lowercases and trims the email, drops submissions with no valid email, and standardizes the field names. It also pre-builds the HubSpot search query used by the next node, so the lookup is ready to send.

## Configuration Settings
**Node Type**: Code - Runs custom JavaScript or Python code 


### Parameters  
**Mode**: Run Once For Each Item
**Language**: Javascript

#### JavaScript 
```js

// Input: the /api/lead payload from the Vercel route (webhook body).
const body = $json.body ?? $json;
const email = String(body.email ?? '').trim().toLowerCase();
if (!email || !email.includes('@')) { return []; } // drop invalid; browser already got 200
const firstName = String(body.firstName ?? body.firstname ?? '').trim();
const nowIso = new Date().toISOString();
return [{ json: {
  email,
  firstName,
  role: body.role ?? '',
  goal: body.goal ?? '',
  source: body.source ?? 'ias-vsl',
  nowIso,
  searchBody: {
    filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
    properties: ['email','firstname','drip_status','drip_started_at','drip_last_step','submission_count','suppressed'],
    limit: 1
  }
}}];


```  

### Settings
**Always Output Data**: Inactive
**Execute Once**: Inactive
**Retry On Fail**: Inactive
**On Error**: Inactive

**Notes**: Cleans the email, drops junk, and preps the HubSpot lookup.