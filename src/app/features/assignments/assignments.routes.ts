import { Routes } from '@angular/router';

export const ASSIGNMENTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./components/assignment-list/assignment-list.component').then(m => m.AssignmentListComponent) },
  { path: 'new', loadComponent: () => import('./components/assignment-form/assignment-form.component').then(m => m.AssignmentFormComponent) },
];
