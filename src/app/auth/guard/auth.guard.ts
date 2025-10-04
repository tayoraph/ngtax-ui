import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectUser } from '../store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private store: Store, private router: Router) {}

  canActivate = () => {
    return this.store.select(selectUser).pipe(
      map(user => {
        if (user) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  };
}

// Standalone function version for Angular 20
export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectUser).pipe(
    map(user => {
      if (user) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};
