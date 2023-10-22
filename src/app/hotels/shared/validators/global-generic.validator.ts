import {FormGroup} from "@angular/forms";

export class GlobalGenericValidator{
  constructor(private validatorMessage: {[key : string]: {[key:string]:string} }) {
  }

  public createErrorMessage(container: FormGroup): {[key: string]: string}{
    const errorMessages = {}

    for(const controlName in container){
      if (container.controls.hasOwnProperty(controlName)){
        const selectedControl = container.controls[controlName];

        if(this.validatorMessage[controlName]){

          // @ts-ignore
          errorMessages[controlName] ='';
          if ((selectedControl.dirty || selectedControl.touched) && (selectedControl.errors)){
            console.log(Object.keys(selectedControl.errors));
            Object.keys(selectedControl.errors).map((errorMessageKey:String)=>{
              console.log(errorMessageKey);
              // @ts-ignore
              if(this.validatorMessage[controlName][errorMessageKey]){

                // @ts-ignore
                errorMessages[controlName] += this.validatorMessage[controlName][errorMessageKey] + ' '

              }
            })
          }
        }
      }
    }
    return  errorMessages;
  }
}
