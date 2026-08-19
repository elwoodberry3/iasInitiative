# Build Confirmation Email
**NODE 10**  
Builds the outbound email for a new contact and branches the copy on intent: confirmed signups get the training link, waitlisters get a linkless "you're on the list" message. Shapes the exact JSON the Resend node sends, including a working unsubscribe link and List-Unsubscribe header.

## Configuration Settings
**Node Type**: Code - Runs custom JavaScript or Python code 

### Parameters  
**Mode**: Run Once For Each Item
**Language**: Javascript

#### JavaScript 
```js
/**
 * =============================================================================
 * PIPELINE CODE MODULE
 * =============================================================================
 *
 * @file        Build Confirmation Email
 * @module      n8n/CodeNode/IAS-Lead-Intake/Build-Confirmation-Email
 * @version     1.1.0
 * @environment Production
 * @workflowId  ${workflow.id}
 *
 * -----------------------------------------------------------------------------
 * GOVERNANCE & OWNERSHIP
 * -----------------------------------------------------------------------------
 * @author      Steve Berry <steve@i-automate-shit.com>
 * @owner       IAS Automation
 * @maintainer  Steve Berry <steve@i-automate-shit.com>
 * @sla         Tier 2 - Business Hours
 * @license     Proprietary - Internal Use Only
 *
 * -----------------------------------------------------------------------------
 * BUSINESS CONTEXT & PURPOSE
 * -----------------------------------------------------------------------------
 * @description
 * Builds the outbound email for a newly processed contact and branches on the
 * lead's intent. Confirmed signups receive the training link; waitlisters
 * receive a linkless "you're on the list" message (promising a stream that
 * isn't live yet would be a broken promise). Reads identity + intent from
 * Build Enroll Props because the intervening HubSpot upsert response has
 * already replaced $json. Emits the exact JSON the Resend node sends.
 *
 * -----------------------------------------------------------------------------
 * INPUT & OUTPUT CONTRACT (n8n Execution Schema)
 * -----------------------------------------------------------------------------
 * @input {Object} $('Build Enroll Props').item.json — processed lead identity
 *   - email     {string} Required - recipient address.
 *   - firstName {string} Optional - personalization (falls back to 'there').
 *   - intent    {string} Required - 'waitlist' | 'confirmed' (drives branch).
 *
 * @output {Object} Single item shaped for the Resend: Send Confirmation node
 *   - json.resendBody {Object} from, to[], subject, html, headers
 *                     (List-Unsubscribe), tags[] (type=waitlist|confirmation).
 *
 * -----------------------------------------------------------------------------
 * DEPENDENCIES & ENVIRONMENT
 * -----------------------------------------------------------------------------
 * @requires Credentials            None here; send happens downstream via Resend.
 * @external-libs                   None.
 * @upstream                        Build Enroll Props (identity + intent).
 * @downstream                      Resend: Send Confirmation (POSTs resendBody).
 * @todo /unsubscribe route must exist and actually suppress the contact —
 *       a link that 404s or does nothing hurts deliverability.
 *
 * -----------------------------------------------------------------------------
 * SECURITY & COMPLIANCE
 * -----------------------------------------------------------------------------
 * @classification  Confidential
 * @containsPII     Yes - recipient email (also embedded in unsubscribe link).
 * @compliance      CAN-SPAM/GDPR - every message carries a working unsubscribe
 *                  link and List-Unsubscribe header.
 * @audit           Logs sanitized data only. No raw tokens or secrets.
 *
 * -----------------------------------------------------------------------------
 * CHANGELOG
 * -----------------------------------------------------------------------------
 * Date        Version  Author               Change Description
 * -----------------------------------------------------------------------------
 * 2026-08-12  1.0.0    Steve Berry          Initial implementation.
 * 2026-08-19  1.1.0    Steve Berry          Intent branch (waitlist vs confirmed);
 *                                           real from: sender; split unsub URL
 *                                           into bare link + bracketed header.
 * =============================================================================
 */

// Read identity + intent from the enroll-props node (upsert response replaced $json).
const s = $('Build Enroll Props').item.json;
const first = s.firstName || 'there';
const email = s.email;
const isWaitlist = s.intent === 'waitlist';

// Training link ONLY goes to confirmed signups. Waitlisters get no link.
const TRAINING_URL = 'https://www.iasbootcamp.com';

// Unsubscribe: bare URL for the clickable <a> in the body; bracketed form for
// the List-Unsubscribe header (RFC 2369 wants <url>). Points at a real route
// that must suppress the contact — not the homepage.
const UNSUB_URL = 'https://www.iasbootcamp.com/unsubscribe?e=' + encodeURIComponent(email);
const UNSUB_HEADER = '<' + UNSUB_URL + '>';

let subject, html;

if (isWaitlist) {
  subject = "You're on the IAS waitlist";
  html = `<p>What's up ${first},</p>
<p>You're on the list. The bootcamp isn't open yet — when a seat opens up, you'll be the first to know, right here in your inbox.</p>
<p>Nothing you need to do for now. Just keep an eye out.</p>
<p>— Steve<br/>I Automate Shit</p>
<hr/>
<p style="font-size:12px;color:#6B7280">You joined the IAS waitlist.
<a href="${UNSUB_URL}">Unsubscribe</a>.</p>`;
} else {
  subject = 'Your IAS training (+ the workflow)';
  html = `<p>What's up ${first},</p>
<p>You're in. Here's your training: <a href="${TRAINING_URL}">watch it here</a>.</p>
<p>The workflow file from the video is on that page too — import it and make it yours.</p>
<p>— Steve<br/>I Automate Shit</p>
<hr/>
<p style="font-size:12px;color:#6B7280">You signed up at iautomateshit.
<a href="${UNSUB_URL}">Unsubscribe</a>.</p>`;
}

return { json: { resendBody: {
  from: 'Steve <steve@iasbootcamp.com>',
  to: [email],
  subject,
  html,
  headers: { 'List-Unsubscribe': UNSUB_HEADER },
  tags: [{ name: 'type', value: isWaitlist ? 'waitlist' : 'confirmation' }]
}}};
```  

### Settings
**Always Output Data**: Inactive
**Execute Once**: Inactive
**Retry On Fail**: Inactive
**On Error**: Inactive

**Notes**: Branches email copy on intent; confirmed gets the link, waitlist doesn't.