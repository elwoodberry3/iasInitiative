# HTTP Request 
**NODE 03**  
Asks HubSpot whether this email already exists. Sends the prepared search query to the Contacts API and returns any matching contact plus its drip fields. This is what makes the workflow idempotent — the answer here decides whether the lead is brand new or a repeat submitter.

## Configuration Settings
**Node Type**: HTTP - Makes an HTTP request and returns the response data.  

### Parameters  
| Setting | Value |
| --- | --- |
| **HTTP Method** | POST |
| **Path** | https://api.hubapi.com/crm/v3/objects/contacts/search |
| **Authentication** | Generic Credential Type |
| **Generic Auth Type** | Header Auth |
| **Header Auth** | IAS Hubspot Private App | 
| **Send Query Parameters** | Inactive |
| **Send Headers** | Active |
| **Specify Headers** | Using Fields Below |  

#### Headers  
##### Content Type  
| Setting | Value |
| --- | --- |
| **Name** | Content Type |
| **Value** | application/json | 

#### Body
| Setting | Value |
| --- | --- |  
| **Send Body** | Active |
| **Body Content Type** | JSON |
| **Specify Body** | USING JSON |
| **JSON** | {{ JSON.stringify($json.searchBody) }} |

### Settings  
| Setting | Value |
| --- | --- |  
| **SSL Certificates** | Inactive |
| **Always Output Data** | Inactive |
| **Execute Once** | Inactive |
| **Retry On Fail** | Inactive |
| **On Error** | Inactive |
| **Notes** | Looks up the email in HubSpot to see if they're already a contact.  |