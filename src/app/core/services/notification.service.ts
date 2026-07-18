import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string, duration = 3000): void {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: ['snackbar-success'],
    });
  }

  error(message: string, duration = 5000): void {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: ['snackbar-error'],
    });
  }

  info(message: string, duration = 3000): void {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: ['snackbar-info'],
    });
  }

  warning(message: string, duration = 4000): void {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: ['snackbar-warning'],
    });
  }
}
