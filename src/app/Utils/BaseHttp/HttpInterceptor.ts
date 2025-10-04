// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map, filter, retry } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { EncryptionService } from '../Encryption/encryption';
// import { Store } from '@ngxs/store';
// import { loggedInUserData } from 'src/app/pages/login/store/login.model';
// import { LoginState } from 'src/app/pages/login/store/login.state.';

// @Injectable()
// export class HeaderInterceptor implements HttpInterceptor {
//   public loggedInUser: loggedInUserData | undefined; // getting store data as an observable
//   constructor(public store :Store, private enc:EncryptionService) {
//     this.getLoggedInUserData()
//   }
//   getLoggedInUserData(){
//     let user = this;
//     this.store.select(LoginState.getLoggedInUserSelector)
//     .subscribe({
//       next(value) {
//       user.loggedInUser = value;
//       // console.log(user.loggedInUser)
//       }
//     })
//     }

//   intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(httpRequest.clone({ setHeaders: { 
//       token:  this.loggedInUser.currentLoggedInUserDetails !== undefined ? this.loggedInUser?.currentLoggedInUserDetails?.token
//     : "",
//      device:  this.enc.envEnc(JSON.stringify(this.loggedInUser.deviceInfromation)),
//     } }));
//   }
// }



// @Injectable()
// export class EncryptionInterceptor implements HttpInterceptor {
//   /**
//    *
//    */
//   constructor(private enc:EncryptionService) {
//   }
//   intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // console.log(environment.excemptedUrl)
//    let excemptedUrl =environment.excemptedUrl
//     if (this.isValidRequestForInterceptor(httpRequest.url, excemptedUrl)) { //exempting some endpoint from encryption
//     httpRequest = httpRequest.clone({
//       //encrypting request going to server
//       body: { param: this.enc.envEnc(JSON.stringify(httpRequest.body)) },
//     });

//     return next.handle(httpRequest).pipe(
//       map((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//           // decrypting response from server
//           let decryptedResponse = JSON.parse(
//             this.enc.envDecrpt(event.body.param)
//           );
//           event = event.clone({ body: decryptedResponse });
//         }
//         return event;
//       })
//     );
//   } else {
//     // return next.handle(httpRequest);
//     return next.handle(httpRequest).pipe(
//       map((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//           // decrypting response from server
//           let decryptedResponse = JSON.parse(
//             this.enc.envDecrpt(event.body.param)
//           );
//           event = event.clone({ body: decryptedResponse });
//         }
//         return event;
//       })
//     );
//   }
//   }

//   private isValidRequestForInterceptor(requestUrl: string, excemptedUrl:any): boolean {
//     let positionIndicator: string = 'uploadfile/';
//     let position = requestUrl.indexOf(positionIndicator);
//     if (position > 0) {
//       let destination: string = requestUrl.substr(position + positionIndicator.length);
//       // console.log(excemptedUrl)
//       for (let address of excemptedUrl) {
//         if (new RegExp(address).test(destination)) {
//           return false;
//         }
//       }
//     }
//     return true;
//   }

// }

