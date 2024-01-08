public with sharing class OpenAiController {
    public OpenAiController() {

    }
    private static Map<String,Object> createBody(Map<String, String> fields,String tone,String type,String length ,String context){
        String content = MessageGenerator.buildPrompt(tone,type,length,fields,context);
        // Constructing the JSON body using a Map
        Map<String, Object> body = new Map<String, Object>();
        List<Map<String, String>> messages = new List<Map<String, String>>();
        messages.add(new Map<String, String>{'role' => 'system', 'content' => 'You are a helpful assistant for writing emails and text messages.'});
        messages.add(new Map<String, String>{'role' => 'user', 'content' => content});

        body.put('messages', messages);
        body.put('model', 'gpt-3.5-turbo');
        return body;
    }
public static String generateResult(Map<String, String> fields,String tone,String type,String length ,String context ){
    
 ChatGPTIntegration__mdt integration = ChatGPTIntegration__mdt.getInstance('ChatGPT_Integration'); 
    
        if (integration == null) {
            return 'Error: ChatGPTIntegration configuration not found';
        } 
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        HttpResponse response;
        request.setEndpoint(integration.Endpoint__c);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Authorization', 'Bearer ' + integration.API_Key__c);
        // Set maximum timeout
        request.setTimeout(120000);
   
        request.setBody(JSON.serialize(createBody(fields,tone,type,length,context)));

        try {
            response = http.send(request);
            if (response.getStatusCode() == 200) {
                System.debug('response '+response.getBody());
                return response.getBody();
            } else {
                System.debug('error 12'+response.getStatus());
                return 'Error: ' + response.getStatus();
            }
        } catch (Exception e) {
            System.debug('error 13');

            return 'Error: ' + e.getMessage();
        }

}
}