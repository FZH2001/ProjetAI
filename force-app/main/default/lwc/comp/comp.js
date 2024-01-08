import { getRecord } from 'lightning/uiRecordApi';
import { LightningElement , api, wire} from 'lwc';
import sendEmail from '@salesforce/apex/SendEmailMessage.sendEmail'


export default class Comp extends LightningElement {

     text = 'the generated text';
     @api recordId ; 
     format = 'email';
     
     fields = [] ; 

     @wire(getRecord , {recordId : '$recordId' , fields : ['Case.ContactEmail','Case.ContactPhone']})
     record ;

    get ContactEmail(){
        return this.record.data ? this.record.data.fields.ContactEmail.value : null;  
      }
    get ContactPhone(){
        
        return this.record.data ? this.record.data.fields.ContactPhone.value : null;  

    }

    handleEmail(){
        console.log('text',this.text) ;

        console.log('phone', this.ContactPhone) ;

        console.log('email',this.ContactEmail) ;
        
        sendEmail({  email: this.ContactEmail ,text : this.text , format : this.format , phone : this.ContactPhone})
            .then(result => {
                // Handle success
                console.log('Email sent successfully:', result);
            })
            .catch(error => {
                // Handle error
                console.error('Error sending email:', error);
            });
    }

}