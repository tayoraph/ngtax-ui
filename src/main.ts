import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { reducers } from './app/store/index';
import { AuthEffects } from './app/auth/store/auth.effects';
import { loaderInterceptor } from './app/core/loader.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormValidation } from './app/Utils/formsValidations/formValidation';

bootstrapApplication(AppComponent, {
  providers: [
   provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([ (req, next) => inject(loaderInterceptor).call(req, next) ])),
    provideStore(reducers),
    provideEffects([AuthEffects]),
    FormValidation
  ]
}).catch(err => console.error(err));
