# Build Confirmation Email
**NODE 10**  
Constructs the immediate welcome email. Builds the from/to, subject, HTML body with the training link and workflow download, plus the unsubscribe header, into the exact JSON the Resend API expects. Pulls the recipient's name and email from the enrolled contact so the message is personalized.

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
 * @version     1.0.0
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
 * Builds the immediate welcome email for a newly enrolled lead. Composes the
 * from/to, subject, personalized HTML body (training link + workflow download)
 * and the List-Unsubscribe header into the exact JSON the Resend API expects.
 * Reads identity from Build Enroll Props because the intervening upsert node's
 * HubSpot response has already replaced $json.
 *
 * -----------------------------------------------------------------------------
 * INPUT & OUTPUT CONTRACT (n8n Execution Schema)
 * -----------------------------------------------------------------------------
 * @input {Object} $('Build Enroll Props').item.json — enrolled lead identity
 *   - email     {string} Required - recipient address.
 *   - firstName {string} Optional - personalization (falls back to 'there').
 *
 * @output {Object} Single item shaped for the Resend: Send Confirmation node
 *   - json.resendBody {Object} from, to[], subject, html, headers
 *                     (List-Unsubscribe), tags[] (type=confirmation).
 *
 * -----------------------------------------------------------------------------
 * DEPENDENCIES & ENVIRONMENT
 * -----------------------------------------------------------------------------
 * @requires Credentials            None here; send happens downstream via Resend.
 * @external-libs                   None.
 * @upstream                        Build Enroll Props (identity), HubSpot Upsert.
 * @downstream                      Resend: Send Confirmation (POSTs resendBody).
 * @todo Replace TODO_TRAINING_URL, TODO_UNSUB_URL, and the from: sender before
 *       sending to real recipients.
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
 * =============================================================================
 */

// Read identity from the enroll-props node (upsert response replaced $json).
const s = $('Build Enroll Props').item.json;
const first = s.firstName || 'there';
const email = s.email;
const html = `<p>What's up ${first},</p>
<p>You're in. Here's your training: <a href="TODO_TRAINING_URL">watch it here</a>.</p>
<p>The workflow file from the video is on that page too — import it and make it yours.</p>
<p>— Steve<br/>I Automate Shit</p>
<hr/>
<p style="font-size:12px;color:#6B7280">You signed up at iautomateshit.
<a href="TODO_UNSUB_URL?e=${encodeURIComponent(email)}">Unsubscribe</a>.</p>`;
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

**Notes**: Assembles the personalized welcome email for Resend to send.