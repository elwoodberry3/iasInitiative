# HubSpot: Upsert & Enroll
**NODE 09**  
Creates the contact in HubSpot (or updates them if they slipped through as existing), writing the enrollment properties built upstream. Upserting by email guarantees no duplicate contacts. This is the moment the lead officially enters the 30-day drip that the scheduler later acts on.

## Configuration Settings
**Node Type**: HTTP - Makes an HTTP request and returns the response data.  

### Parameters  
**HTTP Method**: POST
**Path**: ias-lead
**Authentication**: none
**Respond**: Immediately

### Settings  
**Allow Multiple HTTP Methods**: Inactive
**Always Output Data**: Inactive
**Execute Once**: Inactive
**Retry On Fail**: Inactive
**On Error**: Inactive

**Notes**: Writes the new contact to HubSpot and starts their drip.