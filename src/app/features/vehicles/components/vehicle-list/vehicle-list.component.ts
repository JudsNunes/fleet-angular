import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataGridComponent, ColumnDef } from '../../../../shared/components/data-grid/data-grid.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { PlateFormatPipe } from '../../../../core/pipes/plate-format.pipe';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../../../core/models/api.models';
import { PageParams, DEFAULT_PAGE_PARAMS } from '../../../../core/models/pagination.models';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, DataGridComponent, PageHeaderComponent, PlateFormatPipe],
  template: `
    <app-page-header title="Veículos" subtitle="Gestão da frota de veículos">
      <button mat-flat-button color="primary" (click)="navigateToForm()">
        <mat-icon>add</mat-icon> Novo Veículo
      </button>
    </app-page-header>

    <app-data-grid
      [data]="vehicles()"
      [columns]="columns"
      [totalElements]="totalElements()"
      [pageSize]="pageSize()"
      [pageIndex]="pageIndex()"
      (pageChange)="onPageChange($event)"
      (rowClick)="navigateToDetail($event)" />
  `,
})
export class VehicleListComponent implements OnInit {
  private readonly vehicleService = inject(VehicleService);
  private readonly router = inject(Router);

  vehicles = signal<Vehicle[]>([]);
  totalElements = signal(0);
  pageSize = signal(20);
  pageIndex = signal(0);

  columns: ColumnDef<Vehicle>[] = [
    { key: 'licensePlate', label: 'Placa', format: (row) => new PlateFormatPipe().transform(row.licensePlate) },
    { key: 'brand', label: 'Marca' },
    { key: 'model', label: 'Modelo' },
    { key: 'year', label: 'Ano' },
    { key: 'status', label: 'Status' },
    { key: 'currentMileage', label: 'Quilometragem' },
  ];

  ngOnInit(): void {
    this.loadVehicles(DEFAULT_PAGE_PARAMS);
  }

  loadVehicles(params: PageParams): void {
    this.vehicleService.getPage(params).subscribe({
      next: (res) => {
        this.vehicles.set(res.content);
        this.totalElements.set(res.totalElements);
        this.pageIndex.set(res.number);
        this.pageSize.set(res.size);
      },
    });
  }

  onPageChange(params: PageParams): void {
    this.loadVehicles(params);
  }

  navigateToForm(): void {
    this.router.navigate(['/vehicles/new']);
  }

  navigateToDetail(vehicle: Vehicle): void {
    this.router.navigate(['/vehicles', vehicle.id]);
  }
}
