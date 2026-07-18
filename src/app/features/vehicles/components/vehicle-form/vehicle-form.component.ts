import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { VehicleService } from '../../services/vehicle.service';
import { FormValidationService } from '../../../../core/services/form-validation.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { VehicleStatusEnum, FuelTypeEnum } from '../../../../core/models/enums';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, PageHeaderComponent,
  ],
  template: `
    <app-page-header [title]="isEdit ? 'Editar Veículo' : 'Novo Veículo'" backRoute="/vehicles" />

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <mat-form-field appearance="outline">
        <mat-label>Placa</mat-label>
        <input matInput formControlName="licensePlate" placeholder="ABC1D23" />
        @if (formValidation.getErrorMessage(form, 'licensePlate'); as msg) {
          <mat-error>{{ msg }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Chassi</mat-label>
        <input matInput formControlName="chassis" maxlength="17" />
        @if (formValidation.getErrorMessage(form, 'chassis'); as msg) {
          <mat-error>{{ msg }}</mat-error>
        }
      </mat-form-field>

      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Marca</mat-label>
          <input matInput formControlName="brand" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Modelo</mat-label>
          <input matInput formControlName="model" />
        </mat-form-field>
      </div>

      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Ano</mat-label>
          <input matInput type="number" formControlName="year" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Capacidade</mat-label>
          <input matInput type="number" formControlName="capacity" />
        </mat-form-field>
      </div>

      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Combustível</mat-label>
          <mat-select formControlName="fuelType">
            @for (fuel of fuelTypes; track fuel) {
              <mat-option [value]="fuel">{{ fuel }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            @for (status of statuses; track status) {
              <mat-option [value]="status">{{ status }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>

      <div class="form-actions">
        <button mat-button type="button" routerLink="/vehicles">Cancelar</button>
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
      gap: 16px;
    }
    .form-row {
      display: flex;
      gap: 16px;
    }
    .form-row mat-form-field {
      flex: 1;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
  `],
})
export class VehicleFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly vehicleService = inject(VehicleService);
  private readonly notification = inject(NotificationService);
  readonly formValidation = inject(FormValidationService);

  isEdit = false;
  vehicleId = '';

  form: FormGroup = this.fb.group({
    licensePlate: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/)]],
    chassis: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    year: [new Date().getFullYear(), Validators.required],
    capacity: [1, [Validators.required, Validators.min(1)]],
    fuelType: [FuelTypeEnum.GASOLINE, Validators.required],
    status: [VehicleStatusEnum.ACTIVE, Validators.required],
  });

  fuelTypes = Object.values(FuelTypeEnum);
  statuses = Object.values(VehicleStatusEnum);

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id') ?? '';
    this.isEdit = !!this.vehicleId && this.vehicleId !== 'new';

    if (this.isEdit) {
      this.vehicleService.getById(this.vehicleId).subscribe({
        next: (vehicle) => this.form.patchValue(vehicle),
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const request = this.form.value;

    const obs = this.isEdit
      ? this.vehicleService.update(this.vehicleId, request)
      : this.vehicleService.create(request);

    obs.subscribe({
      next: () => {
        this.notification.success(this.isEdit ? 'Veículo atualizado!' : 'Veículo cadastrado!');
        this.router.navigate(['/vehicles']);
      },
      error: (err) => {
        if (err.fieldErrors) {
          this.formValidation.applyFieldErrors(this.form, err.fieldErrors);
        }
      },
    });
  }
}
