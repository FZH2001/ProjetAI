public with sharing class GPTService {

    @AuraEnabled
    public static string getMessage(MsgRequest req){
        String result = 'Error!';
        try {
            System.debug('context'+ req.context);
            result = OpenAiController.generateResult(req.fields,req.tone,req.type,req.length,req.context);
            System.debug('test'+ result);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return result;
    }
}