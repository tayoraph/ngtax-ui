import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { EncryptionService } from "../Encryption/encryption";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class EncryptionInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private enc:EncryptionService, public toaster: ToastrService) {
  }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Encrypt request body if it exists
    let encryptedRequest = request;
    if (request.body) {
      const encryptedBody = this.enc.envEnc(JSON.stringify(request.body));
      encryptedRequest = request.clone({
        body: { param: encryptedBody },
      });
    }

    return next.handle(encryptedRequest).pipe(
      map(event => {
        if (event instanceof HttpResponse && event.body?.param) {
          try {
            const decryptedBody =  JSON.parse(this.enc.envDecrpt(event.body.param));
            return event.clone({ body: decryptedBody });
          } catch (error) {
            return event;
          }
        }
        return event;
      }),
    catchError((err: any) => {
       let decryptedBody 
         if (err instanceof HttpErrorResponse) {
         try {
             decryptedBody =  JSON.parse(this.enc.envDecrpt(err.error));
            this.toaster.error(decryptedBody.message)
          } catch (error) {
          }
        }
            return of(decryptedBody);

    })
    );
  }
}