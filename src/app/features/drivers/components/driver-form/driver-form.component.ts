import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DriverService } from '../../services/driver.service';
import { FormValidationService } from '../../../../core/services/form-validation.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, PageHeaderComponent,
  ],
  template: `
    <app-page-header [title]="isEdit ? 'Editar Motorista' : 'Novo Motorista'" backRoute="/drivers" />

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <mat-form-field appearance="outline">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="name" />
        @if (formValidation.getErrorMessage(form, 'name'); as msg) {
          <mat-error>{{ msg }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>CPF</mat-label>
        <input matInput formControlName="cpf" maxlength="11" />
        @if (formValidation.getErrorMessage(form, 'cpf'); as msg) {
          <mat-error>{{ msg }}</mat-error>
        }
      </mat-form-field>

      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Número CNH</mat-label>
          <input matInput formControlName="cnhNumber" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Categoria CNH</mat-label>
          <input matInput formControlName="cnhCategory" />
        </mat-form-field>
      </div>

      <mat-form-field appearance="outline">
        <mat-label>Validade CNH</mat-label>
        <input matInput type="date" formControlName="cnhExpiry" />
      </mat-form-field>

      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Telefone</mat-label>
          <input matInput formControlName="phone" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" />
        </mat-form-field>
      </div>

      <div class="form-actions">
        <button mat-button type="button" routerLink="/drivers">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">
          {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .form-container {
      max-width: 700px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .form-row {
      display: flex;
      gap: 16px;
    }
    .form-row mat-form-field { flex: 1; }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
  `],
})
export class DriverFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly driverService = inject(DriverService);
  private readonly notification = inject(NotificationService);
  readonly formValidation = inject(FormValidationService);

  isEdit = false;
  driverId = '';

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    cnhNumber: ['', Validators.required],
    cnhCategory: ['', Validators.required],
    cnhExpiry: ['', Validators.required],
    phone: [''],
    email: ['', Validators.email],
  });

  ngOnInit(): void {
    this.driverId = this.route.snapshot.paramMap.get('id') ?? '';
    this.isEdit = !!this.driverId && this.driverId !== 'new';

    if (this.isEdit) {
      this.driverService.getById(this.driverId).subscribe({
        next: (driver) => this.form.patchValue(driver),
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const obs = this.isEdit
      ? this.driverService.update(this.driverId, this.form.value)
      : this.driverService.create(this.form.value);

    obs.subscribe({
      next: () => {
        this.notification.success(this.isEdit ? 'Motorista atualizado!' : 'Motorista cadastrado!');
        this.router.navigate(['/drivers']);
      },
      error: (err) => {
        if (err.fieldErrors) {
          this.formValidation.applyFieldErrors(this.form, err.fieldErrors);
        }
      },
    });
  }
}
