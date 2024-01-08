public with sharing class Configuration {

  @AuraEnabled
  public static void createConfig(Configuration__c config){
        Configuration__c conf = new Configuration__c();
        conf.Length__c = config.Length__c ;
        conf.Tone__c = config.Tone__c ;
        conf.Options__c = config.Options__c ; 
        System.debug('configur'+conf);
        insert conf ; 
        }

        private static  String findMaxChosen(Map<String, Integer> counts) {
          String maxKey = null;
          Integer maxValue = 0;
      
          for(String key : counts.keySet()) {
              Integer currentValue = counts.get(key);
              if (currentValue > maxValue) {
                  maxValue = currentValue;
                  maxKey = key;
              }
          }
      
          return maxKey;
      }
      private static String popMaxOption(Map<String, Integer> optionCounts) {
        String maxOption = null;
        Integer maxCount = -1;
        for (String option : optionCounts.keySet()) {
            Integer count = optionCounts.get(option);
            if (count > maxCount) {
                maxCount = count;
                maxOption = option;
            }
        }
        // Remove the max option from the map
        if (maxOption != null) {
            optionCounts.remove(maxOption);
        }
        return maxOption;
    }

  @AuraEnabled   
  public static Configuration__c frequentChoice(){
    Configuration__c configuration = new Configuration__c();
        List<Configuration__c> configs = [SELECT Length__c, Tone__c, Options__c FROM Configuration__c];
        Map<String, Integer> lengthCounts = new Map<String, Integer>();
        Map<String, Integer> toneCounts = new Map<String, Integer>();
        Map<String, Integer> optionsCounts = new Map<String, Integer>();

        List<String> topTwoOptions = new List<String>();

      for(Configuration__c conf : configs) {
      String length = conf.Length__c;
      if(lengthCounts.containsKey(length)) {
        lengthCounts.put(length, lengthCounts.get(length) + 1);
      } else {
        lengthCounts.put(length, 1);
    }

    // Count Tone__c occurrences
    String tone = conf.Tone__c;
    if(toneCounts.containsKey(tone)) {
        toneCounts.put(tone, toneCounts.get(tone) + 1);
    } else {
        toneCounts.put(tone, 1);
    }

    if (String.isNotBlank(conf.Options__c)) { // Check if Options__c is not blank
      String[] optionsArray = conf.Options__c.split(';');

      // Count occurrences of each option
      for (String option : optionsArray) {
          if (optionsCounts.containsKey(option)) {
              optionsCounts.put(option, optionsCounts.get(option) + 1);
          } else {
              optionsCounts.put(option, 1);
          }
      }
  }


   

}


// Find the first max option
String firstMaxOption = popMaxOption(optionsCounts);
System.debug('first opt'+firstMaxOption);

// Find the second max option
String secondMaxOption = popMaxOption(optionsCounts);
System.debug('second  opt'+secondMaxOption);

if (firstMaxOption != null) topTwoOptions.add(firstMaxOption);
if (secondMaxOption != null) topTwoOptions.add(secondMaxOption);
  
String maxChosenLength = findMaxChosen(lengthCounts);
String maxChosenTone = findMaxChosen(toneCounts);
//String maxChosenOptions = findMaxChosen(optionsCounts);
configuration.Length__c = maxChosenLength ;
configuration.Tone__c = maxChosenTone ;
configuration.Options__c =  String.join(topTwoOptions, ';') ;
System.debug('max'+maxChosenLength);
System.debug('tone'+maxChosenTone);
System.debug('options'+topTwoOptions);

return configuration ; 
}


  

  

}