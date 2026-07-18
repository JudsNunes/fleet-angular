import { Routes } from '@angular/router';

export const MAINTENANCES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./components/maintenance-list/maintenance-list.component').then(m => m.MaintenanceListComponent) },
  { path: 'new', loadComponent: () => import('./components/maintenance-form/maintenance-form.component').then(m => m.MaintenanceFormComponent) },
  { path: ':id', loadComponent: () => import('./components/maintenance-list/maintenance-list.component').then(m => m.MaintenanceListComponent) },
];
