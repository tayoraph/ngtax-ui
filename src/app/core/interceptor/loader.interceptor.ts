import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/Utils/store';
import { showLoader, hideLoader } from '../loader/store/loader.action';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(showLoader());

    return next.handle(req).pipe(
      finalize(() => this.store.dispatch(hideLoader()))
    );
  }
}
