import { LightningElement,track,api ,wire} from 'lwc';
import { getRecord ,getFieldValue } from 'lightning/uiRecordApi';
import PHONE_FIELD from "@salesforce/schema/Lead.Phone";
import EMAIL_FIELD from "@salesforce/schema/Lead.Email";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getMessage from '@salesforce/apex/GPTService.getMessage';
import createConfig from '@salesforce/apex/Configuration.createConfig';
import frequentChoice from '@salesforce/apex/Configuration.frequentChoice';
import sendEmail from '@salesforce/apex/SendEmailMessage.sendEmail';
//const unproxy = (obj) => JSON.parse(JSON.stringify(obj)) 

export default class MsgGeneratorParent extends LightningElement {
    @api isLoaded ;
    @api recordId; 
    displayedText = '';
    @track textValue = '';
    grtextValue ="generate generate generate generate generate generate generate generate generate generate generate generate generate generate ";
    regrtextValue ="regenerate regenerate regenerate regenerate regenerate regenerate regenerate regenerate regenerate regenerate regenerate";
    backtextValue ="back generate generate generate generate generate generate generate generate generate generate generate generate ";
    forwardtextValue="forword generate generate generate generate generate generate generate generate generate generate generate generate";
    backActive = true;
    forwardActive = true;
    copyActive = true;
    generateActive = false;
    stopActive= true;
    regenerateActive = true ;
    numversion='';
    typingInterval;
    //VAR POUR GÉRER L'ACTIVATION DES BOUTTON 
    backActiveLV; 
    forwardActiveLV; 
    copyActiveLV;  
    regenerateActiveLV;

    @track
    options={}

    @track
    context

    @track
    fields={}

    @track
    testRequest = ""

    @track
    testObject= ""

    format = 'email';
    field = [] ; 

    defaultlength ; 
    defaultone ; 
    defaultoptions ;

    //list to store chosen fields 
    listFieldsConfig = [];

    //list of keys 
    keyslist = [];

    joinedlist = [] ; 

    frequentconfig ;

    config = {
        Tone__c :'',
        Length__c:'',
        Options__c:''
    }

    @wire(getRecord , {recordId : '$recordId' , fields : [EMAIL_FIELD,PHONE_FIELD]})
     record ;
    get Email(){
        //return this.record.data ? this.record.data.field.Email.value : null;  
        console.log("Getting Email"+getFieldValue(this.record.data, EMAIL_FIELD));
        return getFieldValue(this.record.data, EMAIL_FIELD);
        
      }
    get Phone(){
        return getFieldValue(this.record.data, PHONE_FIELD);

        // return this.record.data ? this.record.data.field.Phone.value : null;  

    }
    handleContextChanged(event){
        console.log('GeneratorParent'+event.detail)
        this.context=event.detail


    }

    handleOptionsChanged(event){
        console.log(this.options);
        this.options=event.detail
    }

    handleFieldsChanged(event){
        this.fields = event.detail
    }

   
    handleEmail(){

        console.log('im the maiiil');
        console.log(this.options.format);
        console.log("fields" +this.fields);

        //here tempo
        // this.keyslist = this.fields.fieldkeys ; 
        // console.log('tesss',this.keyslist);
        // this.keyslist.forEach(item => this.listFieldsConfig.push(item));
        // console.log('text',JSON.stringify(this.keyslist)) ;
        // this.joinedlist = this.keyslist.join(';');
        // console.log('joined list',this.joinedlist);
        // this.config.Length__c = this.options.length ;
        // this.config.Tone__c = this.options.tone ; 
        // this.config.Options__c = this.joinedlist ;
        // console.log('config',JSON.stringify(this.config));

        // createConfig({ config: this.config })
        //     .then(()=>{
        //        console.log('configuration saved')

        //     })
        //     .catch(error => { 
        //         console.error(error);
               
        //     })
           
        //     .finally(() => {
        //         console.log('heloo')
        //       }) 
        
        sendEmail({email: this.Email ,text : this.displayedText , format : this.options.format , phone : this.Phone})
        
            .then(result => {
                // Handle success
                console.log('formattt',this.options.format)
                console.log('Email sent successfully:', result);
            })
            .catch(error => {
                // Handle error
                console.error('Error sending email:', error);
            });


        console.log("Email done");
    }   


    handleGenerate(){
        this.isLoaded=true;
        let reqFields = {}
        //console.log("key",JSON.stringify(this.fields.fieldvalues))
        this.keyslist = this.fields.fieldkeys ; 
        //console.log('list of keys',JSON.stringify(this.keyslist));
        
        this.fields.fieldvalues.forEach((field)=>{
            reqFields[field.key] = field.value
        })
        this.testRequest = {
            tone: this.options.tone,
            type: this.options.format,
            length: this.options.length,
            context: this.context,
            fields : reqFields
            
        }
        console.log("Generating message...");
        console.log(this.context)
        console.log(this.testRequest.context);
        console.log(JSON.stringify(this.testRequest));
        getMessage({req:this.testRequest}).then((response)=>{
            let responseObject = JSON.parse(response)
            this.testObject = JSON.stringify(responseObject)
            this.copyActive=false;
            this.regenerateActive=false;
            this.stopActive=false;
            
            let choices = responseObject.choices
            if(!(choices && choices.length > 0)){
                console.log("choices are not defined");
                return;

            }

            this.textValue=responseObject.choices[0].message.content;
            this.displayedText=this.textValue;
            this.isLoaded=false;
            this.generateActive = true;
            this.numversion='1/1';
            //if(this.textValue){
               // this.simulateTyping();
            //}
            //else{
                //console.error("No textValue");
            //}

        })
    }
    handleRegenerate(){
        this.isLoaded=true;
        let reqFields = {}
        //console.log("key",JSON.stringify(this.fields.fieldvalues))
        this.keyslist = this.fields.fieldkeys ; 
        //console.log('list of keys',JSON.stringify(this.keyslist));
        
        this.fields.fieldvalues.forEach((field)=>{
            reqFields[field.key] = field.value
        })
        this.testRequest = {
            tone: this.options.tone,
            type: this.options.format,
            length: this.options.length,
            context: this.context,
            fields : reqFields
        }
        console.log("Generating message...");
        console.log(JSON.stringify(this.testRequest));
        getMessage({req:this.testRequest}).then((response)=>{
            let responseObject = JSON.parse(response)
            this.testObject = JSON.stringify(responseObject)
            this.copyActive=false;
            this.regenerateActive=false;
            this.stopActive=false;
            
            let choices = responseObject.choices
            if(!(choices && choices.length > 0)){
                console.log("choices are not defined");
                return;

            }
            this.backtextValue=this.textValue
            this.textValue=responseObject.choices[0].message.content;
            this.displayedText=this.textValue;
            this.isLoaded=false;
            this.generateActive = false;
            this.numversion='2/2';
            this.backActive=false;
            
            //if(this.textValue){
                //this.simulateTyping();
            //}
            //else{
               // console.error("No textValue");
            //}

        })
        //this.backtextValue=this.textValue;
       // this.textValue=this.regrtextValue;
        //this.backActive=false;
        //this.numversion='2/2'; 
        //this.simulateTyping();
    }
    handleBack(){
        this.forwardtextValue=this.textValue;
        this.textValue=this.backtextValue;
        //
        this.displayedText=this.textValue;
        this.backActive=true; 
        this.forwardActive=false;
        this.numversion='1/2';
    }
    handleForword(){
        this.backtextValue=this.textValue;
        this.textValue=this.forwardtextValue;
        this.displayedText=this.textValue;
        this.backActive=false; 
        this.forwardActive=true;
        this.numversion='2/2';
    } 
    handelChange(event){
        this.textValue=event.target.value;
    }
    handleCopy(){
        navigator.clipboard
        .writeText(this.textValue)
        .then(()=>{
            const event = new ShowToastEvent({
                title:"success",
                message:"Text copied to clipboard",
                variant:"success"
            });
            this.dispatchEvent(event);
        }) 
        .catch((err) =>{
            Console.error("Failed to copy text:", err);
            const event =new ShowToastEvent({
                title:"Error",
                message:"Failed to copy text :" + err,
                variant:"error"
            });
            this.dispatchEvent(event);
         
        })
    }
    simulateTyping() {
        let index = 0;
        this.typingInterval = setInterval(() => {
            // Add one character at a time
            this.displayedText = this.textValue.slice(0, index + 1);
            
            index++;

            // Stop the interval when the entire text is displayed
            if (index === this.textValue.length) {
                clearInterval(this.typingInterval);
            }
        }, 40); // Adjust the interval as needed
        
    }
    stopTyping() {
        // Effacer l'intervalle pour arrêter la simulation de frappe
        clearInterval(this.typingInterval);
    }
}