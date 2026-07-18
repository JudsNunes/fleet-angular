import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="page-header">
      <div class="header-left">
        @if (backRoute()) {
          <a mat-icon-button [routerLink]="backRoute()">
            <mat-icon>arrow_back</mat-icon>
          </a>
        }
        <div>
          <h1 class="title">{{ title() }}</h1>
          @if (subtitle()) {
            <p class="subtitle">{{ subtitle() }}</p>
          }
        </div>
      </div>
      <div class="header-actions">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .title {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
      color: #333;
    }
    .subtitle {
      margin: 4px 0 0;
      font-size: 14px;
      color: #666;
    }
    .header-actions {
      display: flex;
      gap: 8px;
    }
  `],
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
  backRoute = input<string>();
}
