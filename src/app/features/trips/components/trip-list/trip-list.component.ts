import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataGridComponent, ColumnDef } from '../../../../shared/components/data-grid/data-grid.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../../../core/models/api.models';
import { DEFAULT_PAGE_PARAMS, PageParams } from '../../../../core/models/pagination.models';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, DataGridComponent, PageHeaderComponent],
  template: `
    <app-page-header title="Viagens" subtitle="Registro de viagens da frota">
      <button mat-flat-button color="primary" (click)="navigateToForm()">
        <mat-icon>add</mat-icon> Nova Viagem
      </button>
    </app-page-header>
    <app-data-grid [data]="trips()" [columns]="columns" [totalElements]="totalElements()"
      [pageSize]="pageSize()" [pageIndex]="pageIndex()" (pageChange)="onPageChange($event)" (rowClick)="navigateToDetail($event)" />
  `,
})
export class TripListComponent implements OnInit {
  private readonly tripService = inject(TripService);
  private readonly router = inject(Router);
  trips = signal<Trip[]>([]);
  totalElements = signal(0);
  pageSize = signal(20);
  pageIndex = signal(0);
  columns: ColumnDef<Trip>[] = [
    { key: 'vehiclePlate', label: 'Veículo' },
    { key: 'driverName', label: 'Motorista' },
    { key: 'origin', label: 'Origem' },
    { key: 'destination', label: 'Destino' },
    { key: 'status', label: 'Status' },
    { key: 'startTime', label: 'Início' },
  ];

  ngOnInit(): void { this.load(DEFAULT_PAGE_PARAMS); }

  load(params: PageParams): void {
    this.tripService.getPage(params).subscribe({
      next: (res) => { this.trips.set(res.content); this.totalElements.set(res.totalElements); this.pageIndex.set(res.number); this.pageSize.set(res.size); },
    });
  }

  onPageChange(params: PageParams): void { this.load(params); }
  navigateToForm(): void { this.router.navigate(['/trips/new']); }
  navigateToDetail(trip: Trip): void { this.router.navigate(['/trips', trip.id]); }
}
