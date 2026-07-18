import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TripService } from '../../services/trip.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, PageHeaderComponent],
  template: `
    <app-page-header [title]="isEdit ? 'Editar Viagem' : 'Nova Viagem'" backRoute="/trips" />
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <mat-form-field appearance="outline">
        <mat-label>ID do Veículo</mat-label>
        <input matInput formControlName="vehicleId" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>ID do Motorista</mat-label>
        <input matInput formControlName="driverId" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Origem</mat-label>
        <input matInput formControlName="origin" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Destino</mat-label>
        <input matInput formControlName="destination" />
      </mat-form-field>
      <div class="form-actions">
        <button mat-button type="button" routerLink="/trips">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">{{ isEdit ? 'Atualizar' : 'Cadastrar' }}</button>
      </div>
    </form>
  `,
  styles: [`.form-container { max-width: 700px; display: flex; flex-direction: column; gap: 4px; } .form-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }`],
})
export class TripFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly tripService = inject(TripService);
  private readonly notification = inject(NotificationService);
  isEdit = false;
  tripId = '';
  form: FormGroup = this.fb.group({
    vehicleId: ['', Validators.required],
    driverId: ['', Validators.required],
    origin: ['', Validators.required],
    destination: ['', Validators.required],
  });

  ngOnInit(): void {
    this.tripId = this.route.snapshot.paramMap.get('id') ?? '';
    this.isEdit = !!this.tripId && this.tripId !== 'new';
    if (this.isEdit) { this.tripService.getById(this.tripId).subscribe({ next: (t) => this.form.patchValue(t) }); }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const obs = this.isEdit ? this.tripService.update(this.tripId, this.form.value) : this.tripService.create(this.form.value);
    obs.subscribe({ next: () => { this.notification.success(this.isEdit ? 'Viagem atualizada!' : 'Viagem cadastrada!'); this.router.navigate(['/trips']); } });
  }
}
