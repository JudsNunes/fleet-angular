import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { FormValidationService } from '../services/form-validation.service';
import { ErrorResponse } from '../models/error.models';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService);
  const formValidation = inject(FormValidationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const body = error.error as ErrorResponse;

      if (error.status === 400 && body?.fieldErrors) {
        return throwError(() => ({
          status: error.status,
          fieldErrors: body.fieldErrors,
          message: body.message || 'Erro de validação',
        }));
      }

      if (error.status === 404) {
        notification.error('Recurso não encontrado');
      } else if (error.status === 403) {
        notification.error('Acesso negado');
      } else if (error.status === 401) {
        notification.error('Sessão expirada');
      } else if (error.status >= 500) {
        notification.error('Erro interno do servidor');
      } else {
        notification.error(body?.message || 'Erro inesperado');
      }

      return throwError(() => error);
    })
  );
};
