# Decide Enrollment
**NODE 04**  
Takes the HubSpot search result and decides the lead's path. Reads whether a contact was found and its current drip status, then sets an alreadyEnrolled flag and increments the submission count. This single true/false is what routes the lead between re-enrolling and simply being updated.

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
 * @file        Decide Enrollment
 * @module      n8n/CodeNode/IAS-Lead-Intake/Decide-Enrollment
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
 * The idempotency decision point. Takes the HubSpot search result and the
 * original normalized lead, determines whether this contact is already active
 * in the drip, and sets the alreadyEnrolled flag that the downstream IF node
 * uses to route between "touch existing" and "enroll new". Also computes the
 * incremented submission count carried forward to whichever branch runs.
 *
 * -----------------------------------------------------------------------------
 * INPUT & OUTPUT CONTRACT (n8n Execution Schema)
 * -----------------------------------------------------------------------------
 * @input {Object} $json — HubSpot: Search Contact response for this item
 *   - json.results   {Array} Optional - matching contacts (0 or 1 expected).
 * @input {Object} $('Normalize & Validate').item.json — original lead fields
 *   - email, firstName, role, goal, source, nowIso, searchBody.
 *
 * @output {Object} Single item merging the lead with the routing decision
 *   - json.contactId          {string|null} HubSpot record id if found.
 *   - json.alreadyEnrolled    {boolean} True if drip_status is enrolled|active.
 *   - json.newSubmissionCount {number} Prior count + 1.
 *   - json.<lead fields...>   Spread from Normalize & Validate.
 *
 * -----------------------------------------------------------------------------
 * DEPENDENCIES & ENVIRONMENT
 * -----------------------------------------------------------------------------
 * @requires Credentials            None (pure decision logic).
 * @external-libs                   None.
 * @upstream                        HubSpot: Search Contact, Normalize & Validate.
 * @downstream                      Already Enrolled? (IF node reads alreadyEnrolled).
 *
 * -----------------------------------------------------------------------------
 * SECURITY & COMPLIANCE
 * -----------------------------------------------------------------------------
 * @classification  Confidential
 * @containsPII     Yes - email, first name carried through.
 * @compliance      GDPR/CCPA - no new PII introduced; pass-through only.
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

// Runs per item. $json = HubSpot search response; source fields via node ref.
const res = $json;
const src = $('Normalize & Validate').item.json;
const found = (res.results && res.results.length) ? res.results[0] : null;
const props = found ? (found.properties || {}) : {};
const status = props.drip_status || '';
const alreadyEnrolled = !!found && (status === 'enrolled' || status === 'active');
const submissionCount = parseInt(props.submission_count || '0', 10);
return { json: {
  ...src,
  contactId: found ? found.id : null,
  alreadyEnrolled,
  newSubmissionCount: submissionCount + 1
}};


```  

### Settings
**Always Output Data**: Inactive
**Execute Once**: Inactive
**Retry On Fail**: Inactive
**On Error**: Inactive

**Notes**: Compares the lookup to the lead and flags new vs. returning.