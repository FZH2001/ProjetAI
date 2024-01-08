import { LightningElement,track,wire,api } from 'lwc';
import getLeadInfos from '@salesforce/apex/LeadInfoProvider.getLeadInfos';
import { getRecord } from 'lightning/uiRecordApi';
import frequentChoice from '@salesforce/apex/Configuration.frequentChoice';


export default class MsgGeneratorFields extends LightningElement {
    @api recordId;
    fields=[ 
        { label: 'Name', value: 'Name' },
        { label: 'Company', value: 'Company' },
        { label: 'Email', value: 'Email' },
        { label: 'Phone', value: 'Phone' },
        { label: 'Lead Status', value: 'Status' },
        { label: 'Revenue', value: 'AnnualRevenue' },
        { label: 'Industry', value: 'Industry' },


    ];
    fieldValues=[];
    lead ;
    @track selectedFields=[];
    @api defaultOptions;

   @wire(getLeadInfos,{id:'$recordId'}) 
    getLeadInfos({data,error}){
        console.log('wire is being called')
        if (data) {
            this.lead=data
        console.log(data); 
        } else if (error) {
        console.log(error);
        }}
        frequentconfig ; 

options ;
newoptions = [] ;
callFrequentChoice() {
          frequentChoice()
              .then((result) => {
                  this.frequentconfig = result ;
                this.options = this.frequentconfig.Options__c ;
                this.newoptions = this.options.split(';');
                this.selectedFields = this.newoptions ;
                setTimeout(()=>{
                    this.selectedFields.forEach(field => {
                        console.log('fieeel',this.lead[field])
    
                        this.fieldValues = [...this.fieldValues, { key : field, value :this.lead[field] } ];
                            
                        
                      });

                },3000)
               // console.log("options",JSON.stringify(this.fieldValues));
                  console.log("i am the frequent config",JSON.stringify(this.frequentconfig));
              })
              .catch(error => {
                  console.error(error);
              });
      }

    connectedCallback(){

        
        this.callFrequentChoice();
    }

    handleCheck(event){
        console.log(this.lead)

        this.selectedFields=event.detail.value;
        
         //keyys = Object.keys(this.selectedFields);
        //console.log('champs',JSON.stringify(keyys));

        this.fieldValues=[];
        this.selectedFields.forEach(field => {
        this.fieldValues = [...this.fieldValues, { key : field, value :this.lead[field] } ];
            
        
      });
        console.log('liste de champs',JSON.stringify(this.fieldValues));
        this.sendFields()
    }

    sendFields(){
        console.log('hilllllll',this.selectedFields);
        this.dispatchEvent(new CustomEvent("fieldschanged",{
            detail: {
                fieldvalues :this.fieldValues,
                fieldkeys:this.selectedFields
    }}));
    }

}