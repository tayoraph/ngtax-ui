import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { login } from '../store/auth.actions';
import { Router } from '@angular/router';
import { FormValidation } from '../../Utils/formsValidations/formValidation';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl:'./login.component.html',
  styleUrl:'./login.component.scss'
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public hidePassword = true;
  constructor(public formValidation :FormValidation,  private store: Store, private router: Router) {
     this.loginForm = this.formValidation.Login();
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(login({ email: this.loginForm.value.email, password: this.loginForm.value.password }));
      // navigate to dashboard - real app should wait for success
      this.router.navigate(['/']);
    }
  }


}
