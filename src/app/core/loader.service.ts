import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  loading = false;
  private _count = 0;

  show() {
    this._count++;
    this.loading = true;
  }

  hide() {
    this._count = Math.max(0, this._count - 1);
    if (this._count === 0) this.loading = false;
  }
}
