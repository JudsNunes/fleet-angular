import { InjectionToken } from '@angular/core';

export interface Environment {
  apiUrl: string;
  production: boolean;
}

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT', {
  providedIn: 'root',
  factory: () => ({
    apiUrl: '/api/v1',
    production: false,
  }),
});
