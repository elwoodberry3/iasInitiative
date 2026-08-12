# Lead Intake Webhook 
**NODE 01**  
Receives the POST request from the Vercel /api/lead route when someone submits the funnel form. This is the workflow's front door — it accepts the lead's raw payload (name, email, role, goal, source) over HTTP and immediately passes it downstream for cleaning, so the browser gets a fast response while processing continues.

## Configuration Settings
**Node Type**: Webhook - Starts the workflow when a webhook is called.  

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

**Notes**: [ 100 character subtitle for this node ] 