import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataGridComponent, ColumnDef } from '../../../shared/components/data-grid/data-grid.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DateFormatPipe } from '../../../core/pipes/date-format.pipe';
import { AuditLogService } from '../services/audit-log.service';
import { AuditLog } from '../../../core/models/api.models';
import { DEFAULT_PAGE_PARAMS, PageParams } from '../../../core/models/pagination.models';

@Component({
  selector: 'app-audit-log-list',
  standalone: true,
  imports: [MatIconModule, DataGridComponent, PageHeaderComponent, DateFormatPipe],
  template: `
    <app-page-header title="Auditoria" subtitle="Log de ações do sistema (somente leitura)" />
    <app-data-grid [data]="items()" [columns]="columns" [totalElements]="totalElements()"
      [pageSize]="pageSize()" [pageIndex]="pageIndex()" (pageChange)="onPageChange($event)" />
  `,
})
export class AuditLogListComponent implements OnInit {
  private readonly service = inject(AuditLogService);
  items = signal<AuditLog[]>([]);
  totalElements = signal(0);
  pageSize = signal(20);
  pageIndex = signal(0);
  columns: ColumnDef<AuditLog>[] = [
    { key: 'entityType', label: 'Entidade' },
    { key: 'entityId', label: 'ID' },
    { key: 'action', label: 'Ação' },
    { key: 'performedBy', label: 'Realizado por' },
    { key: 'timestamp', label: 'Data/Hora', format: (row) => new DateFormatPipe().transform(row.timestamp, 'datetime') },
    { key: 'details', label: 'Detalhes' },
  ];

  ngOnInit(): void { this.load(DEFAULT_PAGE_PARAMS); }
  load(params: PageParams): void {
    this.service.getPage(params).subscribe({ next: (res) => { this.items.set(res.content); this.totalElements.set(res.totalElements); this.pageIndex.set(res.number); this.pageSize.set(res.size); } });
  }
  onPageChange(params: PageParams): void { this.load(params); }
}
