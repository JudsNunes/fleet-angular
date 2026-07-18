import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataGridComponent, ColumnDef } from '../../../../shared/components/data-grid/data-grid.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CurrencyBrlPipe } from '../../../../core/pipes/currency-brl.pipe';
import { CpfFormatPipe } from '../../../../core/pipes/cpf-format.pipe';
import { FineService } from '../../services/fine.service';
import { Fine } from '../../../../core/models/api.models';
import { DEFAULT_PAGE_PARAMS, PageParams } from '../../../../core/models/pagination.models';

@Component({
  selector: 'app-fine-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, DataGridComponent, PageHeaderComponent, CurrencyBrlPipe, CpfFormatPipe],
  template: `
    <app-page-header title="Multas" subtitle="Gestão de multas da frota">
      <button mat-flat-button color="primary" (click)="navigateToForm()"><mat-icon>add</mat-icon> Nova Multa</button>
    </app-page-header>
    <app-data-grid [data]="items()" [columns]="columns" [totalElements]="totalElements()"
      [pageSize]="pageSize()" [pageIndex]="pageIndex()" (pageChange)="onPageChange($event)" (rowClick)="navigateToDetail($event)" />
  `,
})
export class FineListComponent implements OnInit {
  private readonly service = inject(FineService);
  private readonly router = inject(Router);
  items = signal<Fine[]>([]);
  totalElements = signal(0);
  pageSize = signal(20);
  pageIndex = signal(0);
  columns: ColumnDef<Fine>[] = [
    { key: 'vehiclePlate', label: 'Veículo' },
    { key: 'driverCpf', label: 'CPF Motorista', format: (row) => new CpfFormatPipe().transform(row.driverCpf) },
    { key: 'amount', label: 'Valor', format: (row) => new CurrencyBrlPipe().transform(row.amount) },
    { key: 'description', label: 'Descrição' },
    { key: 'infractionDate', label: 'Data Infração' },
    { key: 'status', label: 'Status' },
  ];

  ngOnInit(): void { this.load(DEFAULT_PAGE_PARAMS); }
  load(params: PageParams): void {
    this.service.getPage(params).subscribe({ next: (res) => { this.items.set(res.content); this.totalElements.set(res.totalElements); this.pageIndex.set(res.number); this.pageSize.set(res.size); } });
  }
  onPageChange(params: PageParams): void { this.load(params); }
  navigateToForm(): void { this.router.navigate(['/fines/new']); }
  navigateToDetail(item: Fine): void { this.router.navigate(['/fines', item.id]); }
}
