public with sharing class MsgRequest {
    @AuraEnabled public Map<String, String> fields {get;set;}
    @AuraEnabled public String tone {get;set;}
    @AuraEnabled public String type {get;set;}
    @AuraEnabled public String length {get;set;}
    @AuraEnabled public String context {get;set;}

}