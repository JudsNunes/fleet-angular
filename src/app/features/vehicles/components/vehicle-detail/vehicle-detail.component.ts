import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { VehicleService } from '../../services/vehicle.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Vehicle } from '../../../../core/models/api.models';
import { PlateFormatPipe } from '../../../../core/pipes/plate-format.pipe';
import { DateFormatPipe } from '../../../../core/pipes/date-format.pipe';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [DecimalPipe, MatCardModule, MatButtonModule, MatIconModule, PageHeaderComponent, PlateFormatPipe],
  template: `
    <app-page-header [title]="'Veículo — ' + (vehicle()?.licensePlate ?? '')" backRoute="/vehicles">
      <button mat-stroked-button (click)="edit()">
        <mat-icon>edit</mat-icon> Editar
      </button>
      <button mat-stroked-button color="warn" (click)="confirmDelete()">
        <mat-icon>delete</mat-icon> Excluir
      </button>
    </app-page-header>

    @if (vehicle(); as v) {
      <div class="detail-grid">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Informações do Veículo</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="detail-row">
              <span class="label">Placa:</span>
              <span>{{ v.licensePlate | plateFormat }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Chassi:</span>
              <span>{{ v.chassis }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Marca / Modelo:</span>
              <span>{{ v.brand }} {{ v.model }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Ano:</span>
              <span>{{ v.year }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Combustível:</span>
              <span>{{ v.fuelType }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Capacidade:</span>
              <span>{{ v.capacity }} passageiros</span>
            </div>
            <div class="detail-row">
              <span class="label">Quilometragem:</span>
              <span>{{ v.currentMileage | number }} km</span>
            </div>
            <div class="detail-row">
              <span class="label">Status:</span>
              <span class="badge" [class]="'badge-' + v.status.toLowerCase()">{{ v.status }}</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    }
  `,
  styles: [`
    .detail-grid {
      max-width: 700px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .label {
      font-weight: 500;
      color: #666;
    }
    .badge {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    .badge-active { background: #e8f5e9; color: #2e7d32; }
    .badge-inactive { background: #fce4ec; color: #c62828; }
    .badge-in_maintenance { background: #fff3e0; color: #e65100; }
    .badge-retired { background: #e0e0e0; color: #616161; }
    .badge-scheduled { background: #e3f2fd; color: #1565c0; }
    .badge-planned { background: #e3f2fd; color: #1565c0; }
    .badge-in_progress { background: #fff3e0; color: #e65100; }
    .badge-completed { background: #e8f5e9; color: #2e7d32; }
    .badge-cancelled { background: #fce4ec; color: #c62828; }
    .badge-pending { background: #f3e5f5; color: #7b1fa2; }
  `],
})
export class VehicleDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly vehicleService = inject(VehicleService);
  private readonly notification = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  vehicle = signal<Vehicle | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.vehicleService.getById(id).subscribe({
      next: (v) => this.vehicle.set(v),
    });
  }

  edit(): void {
    this.router.navigate(['/vehicles', this.vehicle()?.id, 'edit']);
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir Veículo',
        message: `Deseja excluir o veículo ${this.vehicle()?.licensePlate}?`,
        confirmLabel: 'Excluir',
        color: 'warn',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.vehicleService.delete(this.vehicle()!.id).subscribe({
          next: () => {
            this.notification.success('Veículo excluído!');
            this.router.navigate(['/vehicles']);
          },
        });
      }
    });
  }
}
