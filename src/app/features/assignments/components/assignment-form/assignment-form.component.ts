import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { AssignmentService } from '../../services/assignment.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-assignment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, PageHeaderComponent],
  template: `
    <app-page-header title="Nova Atribuição" backRoute="/assignments" />
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <mat-form-field appearance="outline"><mat-label>ID do Veículo</mat-label><input matInput formControlName="vehicleId" /></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>ID do Motorista</mat-label><input matInput formControlName="driverId" /></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Data de Início</mat-label><input matInput type="date" formControlName="startDate" /></mat-form-field>
      <div class="form-actions">
        <button mat-button type="button" routerLink="/assignments">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Cadastrar</button>
      </div>
    </form>
  `,
  styles: [`.form-container { max-width: 700px; display: flex; flex-direction: column; gap: 16px; } .form-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }`],
})
export class AssignmentFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(AssignmentService);
  private readonly notification = inject(NotificationService);
  form: FormGroup = this.fb.group({
    vehicleId: ['', Validators.required],
    driverId: ['', Validators.required],
    startDate: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) return;
    this.service.create(this.form.value).subscribe({
      next: () => { this.notification.success('Atribuição criada!'); this.router.navigate(['/assignments']); },
    });
  }
}
