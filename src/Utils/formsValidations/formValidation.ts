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

/**
 * 
 * @todo : Email validation
 */
emailFormgroup() {
    return this.formBuilder.group({ 
        email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^(?![0-9])+[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        ])),
    })
}


    /**
     * returns Step by step form 
     */

RegisterUser() {
        return this.formBuilder.group({ 
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^(?![0-9])+[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(8),
                Validators.required,
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')
              ])),
              confirm_password: new FormControl('', Validators.compose([
                Validators.minLength(8),
                Validators.required,
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')
               
              ])),
              
             
            firstName: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z \-\']+'),
                Validators.minLength(3),

            ])),
            lastName: new FormControl('',  Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z \-\']+'),
                Validators.minLength(3),

            ])),
            phoneNumber: new FormControl('', Validators.compose([Validators.required,
                Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([+][(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')
            ])),
            country: new FormControl('', Validators.compose([Validators.required])),
            state: new FormControl('', Validators.compose([Validators.required])),
            lga: new FormControl('', Validators.compose([])), },
            
            { validators: confirmPasswordValidator });
            
    }


        /**
     * returns Step by step form 
     */

        RegisterFarmerUser() {
            return this.formBuilder.group({ 
                farmAddress: new FormControl('', Validators.compose([Validators.required])),
                farmName: new FormControl('', Validators.compose([Validators.required])),
                productCategory: new FormControl(''),
                product: new FormControl(''),
                productDescription : new FormControl('', Validators.compose([Validators.required])),
                openProduct :  new FormControl(false, Validators.compose([Validators.required])),
                country: new FormControl('', Validators.compose([Validators.required])),
                state: new FormControl('', Validators.compose([Validators.required])),
                lga: new FormControl('', Validators.compose([])),
                documentId: new FormControl('', Validators.compose([Validators.required])),
                documentType : new FormControl('', Validators.compose([Validators.required])),
             });
        }
    
            /**
     * returns Step by step form 
     */

            RegisterDistributorUser() {
                return this.formBuilder.group({ 
                    distributorAddress: new FormControl('', Validators.compose([Validators.required])),
                    distributorName: new FormControl('', Validators.compose([Validators.required])),
                    productCategory: new FormControl(''),
                    product: new FormControl(''),
                    productDescription : new FormControl('', Validators.compose([Validators.required])),
                    openProduct :  new FormControl(false, Validators.compose([Validators.required])),
                    country: new FormControl('', Validators.compose([Validators.required])),
                    state: new FormControl('', Validators.compose([Validators.required])),
                    lga: new FormControl('', Validators.compose([])),
                    documentId: new FormControl('', Validators.compose([Validators.required])),
                    documentType : new FormControl('', Validators.compose([Validators.required])),
                 });
            }
        
  
/**
 * create product 
 */
createProduct() {
    return this.formBuilder.group({ 
        productCategory: new FormControl('', Validators.compose([Validators.required]) ),
        product: new FormControl('', Validators.compose([Validators.required])),
        productDescription : new FormControl('', Validators.compose([Validators.required])),
        openProduct :  new FormControl(false, Validators.compose([Validators.required])),
        productLocation :  new FormControl(""),
        
     });
}

addAddress(){
    return this.formBuilder.group({ 
        firstName: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z \-\']+'),
            Validators.minLength(3),

        ])),
        lastName: new FormControl('',  Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z \-\']+'),
            Validators.minLength(3),

        ])),
        block: new FormControl('', Validators.compose([Validators.required])),
        street: new FormControl('', Validators.compose([Validators.required])),
        phoneNumber: new FormControl('', Validators.compose([Validators.required,
            Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([+][(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')

        ])),
        country: new FormControl('', Validators.compose([Validators.required])),
        state: new FormControl('', Validators.compose([Validators.required])),
        lga: new FormControl('', Validators.compose([])),
        landmark: new FormControl('', Validators.compose([])),
     });
}

addAccountDetails(){
    return this.formBuilder.group({ 
        bank: new FormControl('', Validators.compose([Validators.required])),
        accountName: new FormControl('', Validators.compose([Validators.required])),
        accountNumber: new FormControl('', Validators.compose([ Validators.minLength(10), Validators.maxLength(10),Validators.required])),
     });
}

addProductDimension(){
    return this.formBuilder.group({ 
        packageLength: new FormControl('', Validators.compose([Validators.required,  Validators.pattern("^[0-9]*$")])),
        packageWidth: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])),
        packageHeight: new FormControl('', Validators.compose([Validators.required,  Validators.pattern("^[0-9]*$")])),
        packageWeight: new FormControl('', Validators.compose([Validators.required])),
     });
}

accountActivationForm(){
    return this.formBuilder.group({ 
        otp: new FormControl('', Validators.compose([Validators.required,  Validators.minLength(6),Validators.pattern("^[0-9]*$")])),
     });
}

addPricesAndSizes(){
    return this.formBuilder.group({ 
        size: new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")])),
        currency: new FormControl('', Validators.compose([Validators.required])),
        amount: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])),
        weight: new FormControl('', Validators.compose([Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9.][A-Za-z0-9 _]*$"), Validators.required])),
        availableStock: new FormControl('', Validators.compose([ Validators.minLength(1),Validators.required])),
        allowBooking :  new FormControl(false, Validators.compose([Validators.required])),
        estimatedProductionDuration: new FormControl('', Validators.compose([])),
    });
}

}
