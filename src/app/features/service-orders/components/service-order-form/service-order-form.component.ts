import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ServiceOrderService } from '../../services/service-order.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-service-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, PageHeaderComponent],
  template: `
    <app-page-header title="Nova Ordem de Serviço" backRoute="/service-orders" />
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <mat-form-field appearance="outline"><mat-label>ID do Veículo</mat-label><input matInput formControlName="vehicleId" /></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Descrição</mat-label><textarea matInput formControlName="description" rows="3"></textarea></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Custo Estimado (R$)</mat-label><input matInput type="number" formControlName="cost" /></mat-form-field>
      <div class="form-actions">
        <button mat-button type="button" routerLink="/service-orders">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Cadastrar</button>
      </div>
    </form>
  `,
  styles: [`.form-container { max-width: 700px; display: flex; flex-direction: column; gap: 4px; } .form-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }`],
})
export class ServiceOrderFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(ServiceOrderService);
  private readonly notification = inject(NotificationService);
  form: FormGroup = this.fb.group({
    vehicleId: ['', Validators.required],
    description: ['', Validators.required],
    cost: [0],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.service.create(this.form.value).subscribe({
      next: () => { this.notification.success('OS criada!'); this.router.navigate(['/service-orders']); },
    });
  }
}
