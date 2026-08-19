# Build Enroll Props
**NODE 08**  
Runs on the new-contact (false) branch. Assembles the HubSpot property object for a brand-new lead — identity plus initial drip state — and sets drip_status from intent so waitlisters are parked out of the 30-day drip. Shapes the exact object the Upsert & Enroll node sends.

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
 * @file        Build Enroll Props
 * @module      n8n/CodeNode/IAS-Lead-Intake/Build-Enroll-Props
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
 * Runs on the "new contact" (false) branch of the enrollment IF. Assembles the
 * HubSpot property object for a brand-new lead — identity plus the initial drip
 * state — in the exact shape the Upsert & Enroll node sends. Sets drip_status
 * from the lead's intent: 'confirmed' enters the 30-day drip ('enrolled'),
 * 'waitlist' is parked ('waitlist') so the scheduler never picks it up. Keeps
 * data-shaping separate from the API call so the request node stays declarative.
 *
 * -----------------------------------------------------------------------------
 * INPUT & OUTPUT CONTRACT (n8n Execution Schema)
 * -----------------------------------------------------------------------------
 * @input {Object} $json — item from Decide Enrollment (false branch)
 *   - email               {string} Required - normalized email.
 *   - firstName           {string} Optional - lead first name.
 *   - source              {string} Required - funnel source (e.g. 'ias-vsl').
 *   - intent              {string} Required - 'waitlist' | 'confirmed'.
 *   - nowIso              {string} Required - enrollment timestamp.
 *   - newSubmissionCount  {number} Required - submission counter.
 *
 * @output {Object} Single item: original fields plus the HubSpot property set
 *   - json.hsProps {Object} email, firstname, ias_source, drip_status,
 *                  drip_started_at, drip_last_step, submission_count,
 *                  last_submitted_at, suppressed (all strings, HubSpot-ready).
 *   - json.<incoming fields...> Spread through unchanged.
 *
 * -----------------------------------------------------------------------------
 * DEPENDENCIES & ENVIRONMENT
 * -----------------------------------------------------------------------------
 * @requires Credentials            None (pure transform).
 * @external-libs                   None.
 * @upstream                        Already Enrolled? (false output).
 * @downstream                      HubSpot: Upsert & Enroll (consumes hsProps).
 * @note HubSpot custom property internal names must match hsProps keys exactly.
 *
 * -----------------------------------------------------------------------------
 * SECURITY & COMPLIANCE
 * -----------------------------------------------------------------------------
 * @classification  Confidential
 * @containsPII     Yes - email, first name.
 * @compliance      GDPR/CCPA - writes only fields the contact consented to.
 * @audit           Logs sanitized data only. No raw tokens or secrets.
 *
 * -----------------------------------------------------------------------------
 * CHANGELOG
 * -----------------------------------------------------------------------------
 * Date        Version  Author               Change Description
 * -----------------------------------------------------------------------------
 * 2026-08-12  1.0.0    Steve Berry          Initial implementation.
 * 2026-08-19  1.1.0    Steve Berry          drip_status set from intent so
 *                                           waitlisters are parked out of the drip.
 * =============================================================================
 */

const s = $json;
// Waitlisters must NOT enter the 30-day drip. The scheduler only picks up
// contacts whose drip_status is 'enrolled' or 'active', so 'waitlist' parks
// them safely with no drip sends.
const isWaitlist = s.intent === 'waitlist';
return { json: { ...s, hsProps: {
  email: s.email,
  firstname: s.firstName,
  ias_source: s.source,
  drip_status: isWaitlist ? 'waitlist' : 'enrolled',
  drip_started_at: s.nowIso,
  drip_last_step: '0',
  submission_count: String(s.newSubmissionCount),
  last_submitted_at: s.nowIso,
  suppressed: 'false'
}}};
```  

### Settings
**Always Output Data**: Inactive
**Execute Once**: Inactive
**Retry On Fail**: Inactive
**On Error**: Inactive

**Notes**: Builds the new contact's property set for HubSpot. 