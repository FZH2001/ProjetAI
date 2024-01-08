public with sharing class SendEmailMessage {

    // private static final String baseURL = 'https://ppdn9v.api.infobip.com/sms/1/text/single';
    private static final String apiKey = 'ae9db9561a0d3e27335d22c3a723e635-913b7fc9-ae8d-4d24-b041-18924d746c2f';

    @future(callout=true)
    @AuraEnabled
    public static void sendEmail(String email , String text , String format , String phone) {
        try{

            System.debug('formaaaaaaaaat'+format);

        if(format == 'Email') {
        
             Messaging.SingleEmailMessage emailMessage = new Messaging.SingleEmailMessage();

            // Set the recipient email address
            emailMessage.setToAddresses(new List<String>{email});

            // Set the email subject and body
            emailMessage.setSubject('Subject of the mail ');
            emailMessage.setPlainTextBody(text);
            System.debug('hello form emailing apex');

            // Use the sendEmail method to send the email
            Messaging.SendEmailResult[] emailResults = Messaging.sendEmail(new List<Messaging.Email>{emailMessage}, true);

            // Check the results of the email sending operation
            for (Messaging.SendEmailResult result : emailResults) {
                if (result.isSuccess()) 
                {
                    System.debug('Email sent successfully.');
                } 
                else
                 {
                    System.debug('Error sending email: ' + result.getErrors()[0].getMessage());
                 }
            }
        }
        else if(format == 'Phone') {
        
            HttpRequest req = new HttpRequest();
            req.setEndpoint('callout:smsApi');
            // req.setEndpoint(baseURL);
            req.setMethod('POST');
            req.setHeader('Content-Type', 'application/json');
            req.setHeader('Authorization','Bearer '+apiKey);
            // Set Basic Authentication header
            // String authHeader = 'Basic ' + EncodingUtil.base64Encode(Blob.valueOf('rita20' + ':' + 'Ghita2001+'));
            // req.setHeader('Authorization', authHeader);

            String requestBody = '{"to": "' + phone + '", "text": "' + text + '"}';
            req.setBody(requestBody);
                System.debug('tryiiing');
            HttpResponse res = new Http().send(req);

            System.debug('Infobip Response: ' + res.getBody());
            //If everything goes smooth
            if (res.getStatusCode() == 200) {
                System.debug('Infobip SMS sent successfully.');
            } else {
                System.debug('Infobip SMS failed. Response: ' + res.getStatusCode() + ' - ' + res.getBody());
                System.debug('helll theeere');
            }
            } 
        }catch (Exception e) {
            System.debug('Error making Infobip SMS callout: ' + e.getMessage());
        }
        
    }
    
}