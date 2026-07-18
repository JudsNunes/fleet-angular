import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private counter = 0;
  readonly loading = signal(false);

  show(): void {
    this.counter++;
    this.loading.set(true);
  }

  hide(): void {
    this.counter--;
    if (this.counter <= 0) {
      this.counter = 0;
      this.loading.set(false);
    }
  }
}
