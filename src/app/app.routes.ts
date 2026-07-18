import { Routes } from '@angular/router';
import { ShellComponent } from './shared/layout/shell/shell.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./features/vehicles/vehicles.routes').then(m => m.VEHICLES_ROUTES),
        data: { breadcrumb: 'Veículos' },
      },
      {
        path: 'drivers',
        loadChildren: () => import('./features/drivers/drivers.routes').then(m => m.DRIVERS_ROUTES),
        data: { breadcrumb: 'Motoristas' },
      },
      {
        path: 'trips',
        loadChildren: () => import('./features/trips/trips.routes').then(m => m.TRIPS_ROUTES),
        data: { breadcrumb: 'Viagens' },
      },
      {
        path: 'maintenances',
        loadChildren: () => import('./features/maintenances/maintenances.routes').then(m => m.MAINTENANCES_ROUTES),
        data: { breadcrumb: 'Manutenções' },
      },
      {
        path: 'assignments',
        loadChildren: () => import('./features/assignments/assignments.routes').then(m => m.ASSIGNMENTS_ROUTES),
        data: { breadcrumb: 'Atribuições' },
      },
      {
        path: 'fines',
        loadChildren: () => import('./features/fines/fines.routes').then(m => m.FINES_ROUTES),
        data: { breadcrumb: 'Multas' },
      },
      {
        path: 'service-orders',
        loadChildren: () => import('./features/service-orders/service-orders.routes').then(m => m.SERVICE_ORDERS_ROUTES),
        data: { breadcrumb: 'Ordens de Serviço' },
      },
      {
        path: 'audit-logs',
        loadComponent: () => import('./features/audit-logs/audit-log-list/audit-log-list.component').then(m => m.AuditLogListComponent),
        data: { breadcrumb: 'Auditoria' },
      },
    ],
  },
];
