public with sharing class MessageGenerator {
    public MessageGenerator() {
 	
    }
    public static String buildPrompt(
    String tone,
    String format,
    String length,
    Map<String,String> fields,String context){

    	// TODO : specifiy number of words based on length
    	Integer wordsCount=100;
 		// Start building the prompt
        String prompt = 'Write an/a ';

        // Add format (email or phone text)
        if (format.equalsIgnoreCase('email')) {
            prompt += ' email copy ';
        } else if (format.equalsIgnoreCase('phone')) {
            prompt += ' SMS phone message copy';
        }

        // Add tone
        prompt += 'respecting the following guidelines :\n';
        prompt+='Tone : '+tone+'\n';
        prompt+='Maximum Length : '+wordsCount+'\n';
        prompt+='Topic :\n'+context;
        System.debug(context);

        // Add additional details from fields
        prompt += 'Important Note : You must include the following details, these details concern the recepient not the sender of the email or SMS message , use them following the context of the email or SMS message to replace the placeholders in the generated text wherever it"s approprite , make sure to respect the topic ! \n';
        prompt+='Recepient Details : \n';
        for (String key : fields.keySet()) {
            prompt += key + ': ' + fields.get(key) + '\n';
        }

        // Close the instruction
        prompt += '.\nPlease write it below and make sure to respect all the guidelines !';
		System.debug(prompt);
        return prompt;
    }
}