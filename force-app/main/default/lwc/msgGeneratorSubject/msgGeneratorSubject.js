import { LightningElement,track,api ,wire} from 'lwc';

export default class MsgGeneratorSubject extends LightningElement {
    //changement
    @api subjectTexte='';
    handelChange(event){
        this.subjectTexte=event.target.value;

        console.log('Handle change'+this.subjectTexte);
        this.sendContext();
    }
    sendContext() {
        console.log('GeneratorSubject'+this.subjectTexte)
        const customEvent = new CustomEvent("contextchanged", {
            detail: this.subjectTexte
        });
        this.dispatchEvent(customEvent)

}
}