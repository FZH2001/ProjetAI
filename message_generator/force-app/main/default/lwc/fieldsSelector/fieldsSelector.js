import { LightningElement,track } from 'lwc';

export default class FieldsSelector extends LightningElement {

    recordId;

    fields=[ 
        { label: 'Name', value: 'Name' },
        { label: 'Company', value: 'Company' },
        { label: 'Email', value: 'Email' },
        { label: 'Phone', value: 'Phone' },
        { label: 'Priority', value: 'Priority' },
        { label: 'Lead Status', value: 'Lead Status' },
        { label: 'Revenue', value: 'Revenue' }

    ];
    fieldValues=[];
    lead ={Name:'Ahmed Mohamed',Company:'Ensa',Email:'abc@gmail.com',Priority:'High'}
    @track selectedFields=[];


    handleCheck(event){
        this.selectedFields=event.detail.value;

        this.fieldValues=[];
        this.selectedFields.forEach(field => {
        //    this.fieldValues.set(field, this.lead[field]);

        //   this.fieldValues.push({key:field, value:this.lead[field]});
        this.fieldValues = [...this.fieldValues, { key : field, value :this.lead[field] } ];

        });
        console.log( this.fieldValues)

    }

}