import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldError } from '../models/error.models';

@Injectable({ providedIn: 'root' })
export class FormValidationService {
  applyFieldErrors(form: FormGroup, fieldErrors: FieldError[]): void {
    fieldErrors.forEach(({ field, message }) => {
      const control = form.get(field);
      if (control) {
        control.setErrors({ serverError: message });
        control.markAsTouched();
      }
    });
  }

  clearFieldErrors(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control?.errors?.['serverError']) {
        control.setErrors(null);
      }
    });
  }

  getErrorMessage(form: FormGroup, fieldName: string): string | null {
    const control = form.get(fieldName);
    if (!control || !control.touched || !control.errors) {
      return null;
    }

    if (control.errors['serverError']) {
      return control.errors['serverError'];
    }
    if (control.errors['required']) {
      return 'Campo obrigatório';
    }
    if (control.errors['minlength']) {
      return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control.errors['maxlength']) {
      return `Máximo de ${control.errors['maxlength'].requiredLength} caracteres`;
    }
    if (control.errors['pattern']) {
      return 'Formato inválido';
    }
    if (control.errors['email']) {
      return 'Email inválido';
    }
    return 'Campo inválido';
  }
}
