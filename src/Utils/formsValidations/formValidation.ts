import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.password === control.value.confirm_password
      ? null
      : { PasswordNoMatch: true };
  };
@Injectable()
export class FormValidation {

    constructor(public formBuilder: FormBuilder) { }



 /**
     * 
     * @todo Login
     */
 Login() {
    return this.formBuilder.group({
        email: new FormControl('', Validators.compose([
            Validators.required,
            // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            Validators.pattern('^(?![0-9])+[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        ])),
        password: new FormControl('', Validators.compose([
            Validators.minLength(5),
            Validators.required
          ])),
    });
}


titleForm() {
    return this.formBuilder.group({ 
      
         role: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),

            ])),
        income: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(4),

        ])),
    })
}


categoryForm() {
    return this.formBuilder.group({ 
         category: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),

            ])),
         role: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),

            ])),
        income: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(4),

        ])),
    })
}


taxFormByEntity() {
    return this.formBuilder.group({ 
       userType: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),

            ])),
         category: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),

            ])),
         role: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),

            ])),
        income: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(4),

        ])),
    })
}
}