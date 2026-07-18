import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: { label: string; route: string }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule, MatExpansionModule],
  template: `
    <aside class="sidebar">
      <div class="sidebar-brand">
        <mat-icon>local_shipping</mat-icon>
        <span>Fleet SaaS</span>
      </div>
      <nav class="sidebar-nav">
        @for (item of navItems; track item.label) {
          @if (item.children) {
            <mat-expansion-panel class="nav-group" [expanded]="false">
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>{{ item.icon }}</mat-icon>
                  <span>{{ item.label }}</span>
                </mat-panel-title>
              </mat-expansion-panel-header>
              @for (child of item.children; track child.route) {
                <a mat-list-item [routerLink]="child.route" routerLinkActive="active-link">
                  {{ child.label }}
                </a>
              }
            </mat-expansion-panel>
          } @else {
            <a [routerLink]="item.route" routerLinkActive="active-link" class="nav-item">
              <mat-icon>{{ item.icon }}</mat-icon>
              <span>{{ item.label }}</span>
            </a>
          }
        }
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      background: #1a1a2e;
      color: white;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 16px;
      font-size: 18px;
      font-weight: 600;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .sidebar-nav {
      padding: 8px 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .nav-item {
      color: rgba(255,255,255,0.8);
      margin: 0 8px;
      padding: 8px 12px;
      border-radius: 8px;
      height: 44px;
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      cursor: pointer;
    }
    .nav-item:hover {
      background: rgba(255,255,255,0.1);
    }
    .nav-item .mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    .active-link {
      background: rgba(63, 81, 181, 0.3) !important;
      color: white !important;
    }
    mat-expansion-panel {
      background: transparent !important;
      color: rgba(255,255,255,0.8);
      box-shadow: none !important;
      margin: 0 8px;
      padding: 0;
      border-radius: 8px;
    }
    ::ng-deep .mat-expansion-panel-header {
      color: rgba(255,255,255,0.8);
      padding: 8px 12px;
      height: 44px;
      border-radius: 8px;
    }
    ::ng-deep .mat-expansion-panel-header:hover {
      background: rgba(255,255,255,0.1);
    }
    ::ng-deep .mat-expansion-panel-header-title {
      margin: 0;
      gap: 12px;
      align-items: center;
    }
    ::ng-deep .mat-expansion-panel-header-title mat-icon {
      margin-right: 0;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    ::ng-deep .mat-expansion-panel-body {
      padding: 0 0 4px 0;
    }
    ::ng-deep mat-expansion-panel mat-list-item {
      margin: 0 8px;
      padding: 8px 12px;
      border-radius: 8px;
      height: 44px;
      color: rgba(255,255,255,0.8);
    }
    ::ng-deep mat-expansion-panel mat-list-item:hover {
      background: rgba(255,255,255,0.1);
    }
    ::ng-deep mat-expansion-panel mat-list-item.active-link {
      background: rgba(63, 81, 181, 0.3) !important;
      color: white !important;
    }
  `],
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    {
      label: 'Gestão de Ativos',
      icon: 'directions_car',
      children: [
        { label: 'Veículos', route: '/vehicles' },
        { label: 'Motoristas', route: '/drivers' },
      ],
    },
    {
      label: 'Operações',
      icon: 'route',
      children: [
        { label: 'Viagens', route: '/trips' },
        { label: 'Atribuições', route: '/assignments' },
      ],
    },
    {
      label: 'Manutenção',
      icon: 'build',
      children: [
        { label: 'Ordens de Serviço', route: '/service-orders' },
        { label: 'Manutenções', route: '/maintenances' },
      ],
    },
    { label: 'Multas', icon: 'gavel', route: '/fines' },
    { label: 'Auditoria', icon: 'history', route: '/audit-logs' },
  ];
}
