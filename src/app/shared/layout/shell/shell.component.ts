import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, BreadcrumbsComponent, LoadingSpinnerComponent],
  template: `
    <app-loading-spinner />
    <div class="shell-container">
      <app-sidebar />
      <div class="main-area">
        <app-header />
        <main class="content">
          <app-breadcrumbs />
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .shell-container {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      background: #f5f5f5;
    }
  `],
})
export class ShellComponent {}
