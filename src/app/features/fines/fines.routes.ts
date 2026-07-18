import { Routes } from '@angular/router';

export const FINES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./components/fine-list/fine-list.component').then(m => m.FineListComponent) },
  { path: 'new', loadComponent: () => import('./components/fine-form/fine-form.component').then(m => m.FineFormComponent) },
];
