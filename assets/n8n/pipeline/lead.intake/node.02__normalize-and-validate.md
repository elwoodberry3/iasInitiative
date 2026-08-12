# Normalize & Validate
**NODE 02**  
Cleans the raw form data before anything touches HubSpot. Lowercases and trims the email, drops submissions with no valid email, and standardizes the field names. It also pre-builds the HubSpot search query used by the next node, so the lookup is ready to send.

## Configuration Settings
**Node Type**: Code - Runs custom JavaScript or Python code 


### Parameters  
| Setting | Value |
| --- | --- |
| **Mode** | Run Once For Each Item |
| **Language** | Javascript |

#### JavaScript 
```js


/**
 * =============================================================================
 * PIPELINE CODE MODULE
 * =============================================================================
 *
 * @file        Normalize & Validate
 * @module      n8n/CodeNode/IAS-Lead-Intake/Normalize-And-Validate
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
 * First processing step after the Lead Intake webhook. Cleans the raw form
 * payload from the Vercel /api/lead route before any HubSpot call: lowercases
 * and trims the email, drops submissions without a valid email, and standardizes
 * field names. Also pre-builds the HubSpot Contacts search body used by the
 * next node, so the downstream lookup is ready to send.
 *
 * -----------------------------------------------------------------------------
 * INPUT & OUTPUT CONTRACT (n8n Execution Schema)
 * -----------------------------------------------------------------------------
 * @input {Array<Object>} $input.all() — one item from the Lead Intake webhook
 *   - json.body    {Object} Optional - webhook-wrapped payload; falls back to json.
 *   - json.email   {string} Required - lead email (validated here).
 *   - json.firstName / json.firstname {string} Optional - lead first name.
 *   - json.role / json.goal / json.source {string} Optional - form context.
 *
 * @output {Array<Object>} Zero or one item (empty array drops invalid leads)
 *   - json.email       {string} Normalized (trimmed, lowercased) email.
 *   - json.firstName   {string} Trimmed first name.
 *   - json.role        {string} Pass-through.
 *   - json.goal        {string} Pass-through.
 *   - json.source      {string} Defaults to 'ias-vsl'.
 *   - json.nowIso      {string} ISO timestamp for this submission.
 *   - json.searchBody  {Object} Prepared HubSpot Contacts search payload.
 *
 * -----------------------------------------------------------------------------
 * DEPENDENCIES & ENVIRONMENT
 * -----------------------------------------------------------------------------
 * @requires Credentials            None (pure transform).
 * @external-libs                   None.
 * @downstream                      HubSpot: Search Contact (consumes searchBody).
 *
 * -----------------------------------------------------------------------------
 * SECURITY & COMPLIANCE
 * -----------------------------------------------------------------------------
 * @classification  Confidential
 * @containsPII     Yes - email address, first name.
 * @compliance      GDPR/CCPA - email is normalized, not logged in raw form.
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
| Setting | Value |
| --- | --- |
| **Always Output Data** | Inactive |
| **Execute Once** | Inactive |
| **Retry On Fail** | Inactive |
| **On Error** | Inactive |
| **Notes** | Cleans the email, drops junk, and preps the HubSpot lookup. |