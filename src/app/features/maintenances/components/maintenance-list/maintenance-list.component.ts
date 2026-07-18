import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataGridComponent, ColumnDef } from '../../../../shared/components/data-grid/data-grid.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CurrencyBrlPipe } from '../../../../core/pipes/currency-brl.pipe';
import { MaintenanceService } from '../../services/maintenance.service';
import { MaintenanceOrder } from '../../../../core/models/api.models';
import { DEFAULT_PAGE_PARAMS, PageParams } from '../../../../core/models/pagination.models';

@Component({
  selector: 'app-maintenance-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, DataGridComponent, PageHeaderComponent, CurrencyBrlPipe],
  template: `
    <app-page-header title="Manutenções" subtitle="Controle de manutenções da frota">
      <button mat-flat-button color="primary" (click)="navigateToForm()">
        <mat-icon>add</mat-icon> Nova Manutenção
      </button>
    </app-page-header>
    <app-data-grid [data]="items()" [columns]="columns" [totalElements]="totalElements()"
      [pageSize]="pageSize()" [pageIndex]="pageIndex()" (pageChange)="onPageChange($event)" (rowClick)="navigateToDetail($event)" />
  `,
})
export class MaintenanceListComponent implements OnInit {
  private readonly service = inject(MaintenanceService);
  private readonly router = inject(Router);
  items = signal<MaintenanceOrder[]>([]);
  totalElements = signal(0);
  pageSize = signal(20);
  pageIndex = signal(0);
  columns: ColumnDef<MaintenanceOrder>[] = [
    { key: 'vehiclePlate', label: 'Veículo' },
    { key: 'type', label: 'Tipo' },
    { key: 'description', label: 'Descrição' },
    { key: 'status', label: 'Status' },
    { key: 'mileage', label: 'Quilometragem' },
    { key: 'cost', label: 'Custo', format: (row) => new CurrencyBrlPipe().transform(row.cost) },
  ];

  ngOnInit(): void { this.load(DEFAULT_PAGE_PARAMS); }
  load(params: PageParams): void {
    this.service.getPage(params).subscribe({ next: (res) => { this.items.set(res.content); this.totalElements.set(res.totalElements); this.pageIndex.set(res.number); this.pageSize.set(res.size); } });
  }
  onPageChange(params: PageParams): void { this.load(params); }
  navigateToForm(): void { this.router.navigate(['/maintenances/new']); }
  navigateToDetail(item: MaintenanceOrder): void { this.router.navigate(['/maintenances', item.id]); }
}
