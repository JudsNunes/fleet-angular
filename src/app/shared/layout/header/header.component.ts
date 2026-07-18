import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  template: `
    <header class="header">
      @if (loading.loading()) {
        <div class="loading-bar"></div>
      }
      <div class="header-spacer"></div>
      <button mat-icon-button [matMenuTriggerFor]="userMenu">
        <mat-icon>account_circle</mat-icon>
      </button>
      <mat-menu #userMenu="matMenu">
        <button mat-menu-item>
          <mat-icon>person</mat-icon>
          <span>Meu Perfil</span>
        </button>
        <button mat-menu-item>
          <mat-icon>settings</mat-icon>
          <span>Configurações</span>
        </button>
        <button mat-menu-item>
          <mat-icon>logout</mat-icon>
          <span>Sair</span>
        </button>
      </mat-menu>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      height: 56px;
      padding: 0 16px;
      background: white;
      border-bottom: 1px solid #e0e0e0;
      position: relative;
    }
    .header-spacer {
      flex: 1;
    }
    .loading-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #3f51b5, #2196f3);
      animation: loading 1.5s ease-in-out infinite;
    }
    @keyframes loading {
      0% { transform: translateX(-100%); }
      50% { transform: translateX(0); }
      100% { transform: translateX(100%); }
    }
  `],
})
export class HeaderComponent {
  readonly loading = inject(LoadingService);
}
