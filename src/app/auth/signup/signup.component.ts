import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { signup } from '../store/auth.actions';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormValidation } from '../../Utils/formsValidations/formValidation';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl:'./signup.component.scss'
})
export class SignupComponent {

    public signUpForm!: FormGroup;

  constructor( public formValidation :FormValidation,private store: Store, private router: Router) {
     this.signUpForm = this.formValidation.Login();

  }
  onSubmit() {
    if (this.signUpForm.valid) {
      this.store.dispatch(signup({ email: this.signUpForm.value.email, password: this.signUpForm.value.password }));
      // navigate to login - real app should wait for success
      this.router.navigate(['/login']);
    }
  }
}
