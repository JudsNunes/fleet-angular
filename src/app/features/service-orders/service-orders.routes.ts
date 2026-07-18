import { Routes } from '@angular/router';

export const SERVICE_ORDERS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./components/service-order-list/service-order-list.component').then(m => m.ServiceOrderListComponent) },
  { path: 'new', loadComponent: () => import('./components/service-order-form/service-order-form.component').then(m => m.ServiceOrderFormComponent) },
];
