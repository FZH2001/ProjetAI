import { LightningElement, track ,api} from "lwc";
import frequentChoice from '@salesforce/apex/Configuration.frequentChoice';

export default class MsgGeneratorOptions extends LightningElement {
  @track selectedTone = "Professional";
  @track selectedFormat = "Email";
  @track selectedLength = "Short";

  @track availableTones = ["Professional", "Casual", "Informational", "Funny"];
  //   @track availableFormats = ["Email", "Phone Message"];
  @track availableLengths = ["Short", "Medium", "Long"];
  
  defaultlength ;
 defaultone ;


frequentconfig ; 
  callFrequentChoice() {
    frequentChoice()
        .then((result) => {
            this.frequentconfig = result ;
            this.defaultlength = this.frequentconfig.Length__c;
            console.log('long',this.defaultlength);
            this.defaultone = this.frequentconfig.Tone__c ;
            this.selectedTone = this.frequentconfig.Tone__c ; 
            this.selectedLength = this.frequentconfig.Length__c;
            console.log('tone',this.selectedTone);
            console.log("i am the frequent config",JSON.stringify(this.frequentconfig));
        })
        .catch(error => {
            console.error(error);
        });
}
  connectedCallback(){
    this.callFrequentChoice();
    console.log('longueur',this.defaultlength);

    const customEvent = new CustomEvent("optionschanged", {
      detail: {
        tone: this.selectedTone  ,
        format: this.selectedFormat,
        length: this.selectedLength
      }
    });

    this.dispatchEvent(customEvent);
  }

  @track availableFormats = [
    {
      label: "Email",
      pathD: `M17.25 16H30.75C32.483 16 33.8992 17.3565 33.9949 19.0656L34 19.25V28.75C34 30.483 32.6435 31.8992 30.9344 31.9949L30.75 32H17.25C15.517 32 14.1008 30.6435 14.0051 28.9344L14 28.75V19.25C14 17.517 15.3565 16.1008 17.0656 16.0051L17.25 16H30.75H17.25ZM32.5 21.373L24.3493 25.6637C24.1619 25.7623 23.9431 25.7764 23.7468 25.706L23.6507 25.6637L15.5 21.374V28.75C15.5 29.6682 16.2071 30.4212 17.1065 30.4942L17.25 30.5H30.75C31.6682 30.5 32.4212 29.7929 32.4942 28.8935L32.5 28.75V21.373ZM30.75 17.5H17.25C16.3318 17.5 15.5788 18.2071 15.5058 19.1065L15.5 19.25V19.679L24 24.1525L32.5 19.678V19.25C32.5 18.3318 31.7929 17.5788 30.8935 17.5058L30.75 17.5Z`
    },
    {
      label: "Phone",
      pathD: `M14.75 29H27.25C27.6642 29 28 29.3358 28 29.75C28 30.1297 27.7178 30.4435 27.3518 30.4932L27.25 30.5H14.75C14.3358 30.5 14 30.1642 14 29.75C14 29.3703 14.2822 29.0565 14.6482 29.0068L14.75 29H27.25H14.75ZM14.75 25H33.25C33.6642 25 34 25.3358 34 25.75C34 26.1297 33.7178 26.4435 33.3518 26.4932L33.25 26.5H14.75C14.3358 26.5 14 26.1642 14 25.75C14 25.3703 14.2822 25.0565 14.6482 25.0068L14.75 25H33.25H14.75ZM14.75 21H33.25C33.6642 21 34 21.3358 34 21.75C34 22.1297 33.7178 22.4435 33.3518 22.4932L33.25 22.5H14.75C14.3358 22.5 14 22.1642 14 21.75C14 21.3703 14.2822 21.0565 14.6482 21.0068L14.75 21H33.25H14.75ZM14.75 17H33.25C33.6642 17 34 17.3358 34 17.75C34 18.1297 33.7178 18.4435 33.3518 18.4932L33.25 18.5H14.75C14.3358 18.5 14 18.1642 14 17.75C14 17.3703 14.2822 17.0565 14.6482 17.0068L14.75 17H33.25H14.75Z`
    }
  ];
  sendSelectedVariables() {
    const customEvent = new CustomEvent("optionschanged", {
      detail: {
        tone: this.selectedTone  ,
        format: this.selectedFormat,
        length: this.selectedLength
      }
    });

    this.dispatchEvent(customEvent);
  }

  handleChangeTone(event) {
    console.log('before',this.selectedTone);
    this.selectedTone = event.currentTarget.dataset.tone;
    console.log(this.selectedTone);
    this.sendSelectedVariables();
}
handleChangeFormat(event) {
    this.selectedFormat = event.currentTarget.dataset.format;
    console.log(this.selectedFormat);
    this.sendSelectedVariables();
}
handleChangeLength(event) {
    this.selectedLength = event.currentTarget.dataset.length;
    console.log(this.selectedLength);
    this.sendSelectedVariables();
}

  get tones() {
    return this.availableTones.map((tone) => {
      return {
        label: tone,
        className:
          tone === this.selectedTone ? "normal-btn selected" : "normal-btn"
      };
    });
  }

  get formats() {
    return this.availableFormats.map((format) => {
      return {
        label: format.label,
        pathD: format.pathD,
        className:
          format.label === this.selectedFormat
            ? "format-Btn selectedFormat"
            : "format-Btn"
      };
    });
  }

  get lengths() {
    return this.availableLengths.map((length) => {
      return {
        label: length,
        className:
          length === this.selectedLength ? "normal-btn selected" : "normal-btn"
      };
    });
  }
}