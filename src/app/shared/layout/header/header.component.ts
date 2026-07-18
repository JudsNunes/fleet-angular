import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  template: `
    <header class="header">
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
    }
    .header-spacer {
      flex: 1;
    }
  `],
})
export class HeaderComponent {}
