public with sharing class LeadInfoProvider {

    @AuraEnabled(cacheable=true)
    public static Lead getLeadInfos(Id id){
        System.debug('the is id '+id);
        return [select Id,Name,Company,Email,Phone,Status,AnnualRevenue,Industry from Lead where ID=:id];
    }
}