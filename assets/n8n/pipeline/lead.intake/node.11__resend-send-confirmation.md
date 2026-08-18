# Resend: Send Confirmation
**NODE 11**  
Sends the welcome email through Resend. Posts the prepared message to the Resend API using the Header Auth key, delivering the training link and workflow to the new lead's inbox. Set to continue on error so a mail hiccup never rolls back the HubSpot enrollment that already succeeded.

## Configuration Settings
**Node Type**: HTTP - Makes an HTTP request and returns the response data.   

### Parameters  
| Setting | Value |
| --- | --- |
| **HTTP Method** | POST |
| **Path** | https://api.resend.com/emails|
| **Authentication** | Generic Credential Type |
| **Generic Auth Type** | Header Auth |
| **Header Auth** | Resend API | 
| **Send Headers** | Active → Content-Type: application/json | 
| **Send Body** | Active, JSON | 
| **JSON** | {{ JSON.stringify($json.resendBody) }} | 
| **On Error** | Continue (so a mail failure doesn't roll back the enrollment) | 

### Settings  
**Allow Multiple HTTP Methods**: Inactive
**Always Output Data**: Inactive
**Execute Once**: Inactive
**Retry On Fail**: Inactive
**On Error**: Inactive

**Notes**: Delivers the welcome email to the new lead via Resend.