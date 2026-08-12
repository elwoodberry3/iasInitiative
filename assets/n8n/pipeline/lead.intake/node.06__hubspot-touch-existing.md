# HubSpot: Touch Existing 
**NODE 06**  
Handles a returning contact who resubmitted. Updates their record with the latest submission timestamp and a bumped submission count, without restarting their drip or resending the welcome email. This is the "we see you, but you're already in" path that keeps repeat submissions clean.

## Configuration Settings
**Node Type**: HTTP - Makes an HTTP request and returns the response data.  

### Parameters  
**HTTP Method**: PATCH
**Path**: https://api.hubapi.com/crm/v3/objects/contacts/{{ $json.contactId }}
**Authentication**: Predefined Credential Type
**Credential Type**: Hubspot OAuth2 API
**Hubspot OAuth2 API**: Hubspot Account 

**Send Query Parameters**: Inactive

**Send Headers**: Active
**Specify Headers**: Using Fields Below

#### Headers  
##### Content Type  
**Name**: Content Type
**Value**: application/json  

**Send Body**: Active. 
**Body Content Type**: JSON
**Specify Body**: USING JSON

**JSON**: {{ JSON.stringify({ properties: { last_submitted_at: $json.nowIso, submission_count: String($json.newSubmissionCount) } }) }}

### Settings  
**SSL Certificates**: Inactive
**Always Output Data**: Inactive
**Execute Once**: Inactive
**Retry On Fail**: Inactive
**On Error**: Inactive

**Notes**: Updates a repeat submitter without re-enrolling or re-emailing them. 