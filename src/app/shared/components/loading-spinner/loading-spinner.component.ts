import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressBarModule],
  template: `
    @if (loading.loading()) {
      <mat-progress-bar mode="indeterminate" class="loading-bar"></mat-progress-bar>
    }
  `,
  styles: [`
    .loading-bar {
      position: fixed;
      top: 0;
      z-index: 9999;
    }
  `],
})
export class LoadingSpinnerComponent {
  readonly loading = inject(LoadingService);
}
