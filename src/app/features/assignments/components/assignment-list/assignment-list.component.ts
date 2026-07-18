import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataGridComponent, ColumnDef } from '../../../../shared/components/data-grid/data-grid.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { AssignmentService } from '../../services/assignment.service';
import { VehicleAssignment } from '../../../../core/models/api.models';
import { DEFAULT_PAGE_PARAMS, PageParams } from '../../../../core/models/pagination.models';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, DataGridComponent, PageHeaderComponent],
  template: `
    <app-page-header title="Atribuições" subtitle="Vinculação motorista-veículo">
      <button mat-flat-button color="primary" (click)="navigateToForm()">
        <mat-icon>add</mat-icon> Nova Atribuição
      </button>
    </app-page-header>
    <app-data-grid [data]="items()" [columns]="columns" [totalElements]="totalElements()"
      [pageSize]="pageSize()" [pageIndex]="pageIndex()" (pageChange)="onPageChange($event)" (rowClick)="navigateToDetail($event)" />
  `,
})
export class AssignmentListComponent implements OnInit {
  private readonly service = inject(AssignmentService);
  private readonly router = inject(Router);
  items = signal<VehicleAssignment[]>([]);
  totalElements = signal(0);
  pageSize = signal(20);
  pageIndex = signal(0);
  columns: ColumnDef<VehicleAssignment>[] = [
    { key: 'vehiclePlate', label: 'Veículo' },
    { key: 'driverName', label: 'Motorista' },
    { key: 'startDate', label: 'Início' },
    { key: 'endDate', label: 'Fim' },
    { key: 'status', label: 'Status' },
  ];

  ngOnInit(): void { this.load(DEFAULT_PAGE_PARAMS); }
  load(params: PageParams): void {
    this.service.getPage(params).subscribe({ next: (res) => { this.items.set(res.content); this.totalElements.set(res.totalElements); this.pageIndex.set(res.number); this.pageSize.set(res.size); } });
  }
  onPageChange(params: PageParams): void { this.load(params); }
  navigateToForm(): void { this.router.navigate(['/assignments/new']); }
  navigateToDetail(item: VehicleAssignment): void { this.router.navigate(['/assignments', item.id]); }
}
