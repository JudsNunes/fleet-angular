import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { MaintenanceService } from '../../services/maintenance.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MaintenanceTypeEnum } from '../../../../core/models/enums';

@Component({
  selector: 'app-maintenance-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, PageHeaderComponent],
  template: `
    <app-page-header [title]="isEdit ? 'Editar Manutenção' : 'Nova Manutenção'" backRoute="/maintenances" />
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <mat-form-field appearance="outline">
        <mat-label>ID do Veículo</mat-label>
        <input matInput formControlName="vehicleId" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Tipo</mat-label>
        <mat-select formControlName="type">
          @for (t of types; track t) { <mat-option [value]="t">{{ t }}</mat-option> }
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Descrição</mat-label>
        <textarea matInput formControlName="description" rows="3"></textarea>
      </mat-form-field>
      <div class="form-row">
        <mat-form-field appearance="outline">
          <mat-label>Quilometragem</mat-label>
          <input matInput type="number" formControlName="mileage" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Custo (R$)</mat-label>
          <input matInput type="number" formControlName="cost" />
        </mat-form-field>
      </div>
      <div class="form-actions">
        <button mat-button type="button" routerLink="/maintenances">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">{{ isEdit ? 'Atualizar' : 'Cadastrar' }}</button>
      </div>
    </form>
  `,
  styles: [`.form-container { max-width: 700px; display: flex; flex-direction: column; gap: 16px; } .form-row { display: flex; gap: 16px; } .form-row mat-form-field { flex: 1; } .form-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }`],
})
export class MaintenanceFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(MaintenanceService);
  private readonly notification = inject(NotificationService);
  isEdit = false;
  itemId = '';
  types = Object.values(MaintenanceTypeEnum);
  form: FormGroup = this.fb.group({
    vehicleId: ['', Validators.required],
    type: [MaintenanceTypeEnum.PREVENTIVE, Validators.required],
    description: ['', Validators.required],
    mileage: [0, Validators.required],
    cost: [0],
  });

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id') ?? '';
    this.isEdit = !!this.itemId && this.itemId !== 'new';
    if (this.isEdit) { this.service.getById(this.itemId).subscribe({ next: (item) => this.form.patchValue(item) }); }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const obs = this.isEdit ? this.service.update(this.itemId, this.form.value) : this.service.create(this.form.value);
    obs.subscribe({ next: () => { this.notification.success(this.isEdit ? 'Manutenção atualizada!' : 'Manutenção cadastrada!'); this.router.navigate(['/maintenances']); } });
  }
}
