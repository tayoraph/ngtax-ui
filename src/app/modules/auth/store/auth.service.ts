import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // simulate api calls
  login(email: string, password: string) {
    return of({ id: 1, email }).pipe(delay(800));
  }
  signup(email: string, password: string) {
    return of({ id: 2, email }).pipe(delay(800));
  }
}
