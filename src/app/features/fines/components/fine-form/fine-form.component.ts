import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { FineService } from '../../services/fine.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-fine-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, PageHeaderComponent],
  template: `
    <app-page-header title="Nova Multa" backRoute="/fines" />
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <mat-form-field appearance="outline"><mat-label>ID do Veículo</mat-label><input matInput formControlName="vehicleId" /></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>CPF do Motorista</mat-label><input matInput formControlName="driverCpf" maxlength="11" /></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Valor (R$)</mat-label><input matInput type="number" formControlName="amount" /></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Descrição</mat-label><textarea matInput formControlName="description" rows="2"></textarea></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Data da Infração</mat-label><input matInput type="date" formControlName="infractionDate" /></mat-form-field>
      <div class="form-actions">
        <button mat-button type="button" routerLink="/fines">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Cadastrar</button>
      </div>
    </form>
  `,
  styles: [`.form-container { max-width: 700px; display: flex; flex-direction: column; gap: 4px; } .form-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }`],
})
export class FineFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(FineService);
  private readonly notification = inject(NotificationService);
  form: FormGroup = this.fb.group({
    vehicleId: ['', Validators.required],
    driverCpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', Validators.required],
    infractionDate: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.service.create(this.form.value).subscribe({
      next: () => { this.notification.success('Multa cadastrada!'); this.router.navigate(['/fines']); },
    });
  }
}
