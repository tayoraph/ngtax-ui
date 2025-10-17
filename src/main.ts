import { enableProdMode, importProvidersFrom, inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormValidation } from './Utils/formsValidations/formValidation';
import { appStoreProviders, reducers } from './Utils/store';
import { AppRoutingModule } from './app/app.routes';
import { toastrProvider } from './Utils/config/toastr.config';
import { LoaderService } from './Utils/Loader/loader.service';
import { LoadingInterceptor } from './Utils/Loader/loading.interceptor';
import { EncryptionInterceptor } from './Utils/BaseHttp/HttpInterceptor';

if (environment.production) {
  enableProdMode();
  //show this warning only on prod mode
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, AppRoutingModule), provideAnimations(),
 
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    ...appStoreProviders,
    toastrProvider,
    FormValidation,
    LoaderService,
      provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: EncryptionInterceptor, multi: true },
  ],
  
}).catch((err) => console.error(err));




