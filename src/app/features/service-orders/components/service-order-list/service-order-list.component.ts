import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataGridComponent, ColumnDef } from '../../../../shared/components/data-grid/data-grid.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CurrencyBrlPipe } from '../../../../core/pipes/currency-brl.pipe';
import { ServiceOrderService } from '../../services/service-order.service';
import { ServiceOrder } from '../../../../core/models/api.models';
import { DEFAULT_PAGE_PARAMS, PageParams } from '../../../../core/models/pagination.models';

@Component({
  selector: 'app-service-order-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, DataGridComponent, PageHeaderComponent, CurrencyBrlPipe],
  template: `
    <app-page-header title="Ordens de Serviço" subtitle="Workflow de aprovação de OS">
      <button mat-flat-button color="primary" (click)="navigateToForm()">
        <mat-icon>add</mat-icon> Nova OS
      </button>
    </app-page-header>
    <app-data-grid [data]="items()" [columns]="columns" [totalElements]="totalElements()"
      [pageSize]="pageSize()" [pageIndex]="pageIndex()" (pageChange)="onPageChange($event)" (rowClick)="navigateToDetail($event)" />
  `,
})
export class ServiceOrderListComponent implements OnInit {
  private readonly service = inject(ServiceOrderService);
  private readonly router = inject(Router);
  items = signal<ServiceOrder[]>([]);
  totalElements = signal(0);
  pageSize = signal(20);
  pageIndex = signal(0);
  columns: ColumnDef<ServiceOrder>[] = [
    { key: 'vehiclePlate', label: 'Veículo' },
    { key: 'description', label: 'Descrição' },
    { key: 'status', label: 'Status' },
    { key: 'cost', label: 'Custo', format: (row) => new CurrencyBrlPipe().transform(row.cost) },
    { key: 'requestedBy', label: 'Solicitado por' },
    { key: 'createdAt', label: 'Criado em' },
  ];

  ngOnInit(): void { this.load(DEFAULT_PAGE_PARAMS); }
  load(params: PageParams): void {
    this.service.getPage(params).subscribe({ next: (res) => { this.items.set(res.content); this.totalElements.set(res.totalElements); this.pageIndex.set(res.number); this.pageSize.set(res.size); } });
  }
  onPageChange(params: PageParams): void { this.load(params); }
  navigateToForm(): void { this.router.navigate(['/service-orders/new']); }
  navigateToDetail(item: ServiceOrder): void { this.router.navigate(['/service-orders', item.id]); }
}
