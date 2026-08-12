# Lead Intake Webhook 
**NODE 05**  
The fork in the road. Reads the **alreadyEnrolled** flag from the previous node and splits the flow: existing contacts go down the true branch (just update them), brand-new contacts go down the false branch (enroll them and send the email). Prevents double-enrolling and double-emailing repeat submitters.

## Configuration Settings
**Node Type**: IF - Route items to different branches (true/false)

### Parameters  
#### Conditions  
**fx**: {{ $json.alreadyEnrolled }} | IS TRUE

### Settings  
**Always Output Data**: Inactive
**Execute Once**: Inactive
**Retry On Fail**: Inactive
**On Error**: Inactive

**Notes**: Routes returning contacts one way, new contacts the other.