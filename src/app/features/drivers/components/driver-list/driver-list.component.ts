import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataGridComponent, ColumnDef } from '../../../../shared/components/data-grid/data-grid.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CpfFormatPipe } from '../../../../core/pipes/cpf-format.pipe';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../../../core/models/api.models';
import { DEFAULT_PAGE_PARAMS, PageParams } from '../../../../core/models/pagination.models';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, DataGridComponent, PageHeaderComponent, CpfFormatPipe],
  template: `
    <app-page-header title="Motoristas" subtitle="Gestão de motoristas e CNH">
      <button mat-flat-button color="primary" (click)="navigateToForm()">
        <mat-icon>add</mat-icon> Novo Motorista
      </button>
    </app-page-header>

    <app-data-grid
      [data]="drivers()"
      [columns]="columns"
      [totalElements]="totalElements()"
      [pageSize]="pageSize()"
      [pageIndex]="pageIndex()"
      (pageChange)="onPageChange($event)"
      (rowClick)="navigateToDetail($event)" />
  `,
})
export class DriverListComponent implements OnInit {
  private readonly driverService = inject(DriverService);
  private readonly router = inject(Router);

  drivers = signal<Driver[]>([]);
  totalElements = signal(0);
  pageSize = signal(20);
  pageIndex = signal(0);

  columns: ColumnDef<Driver>[] = [
    { key: 'name', label: 'Nome' },
    { key: 'cpf', label: 'CPF', format: (row) => new CpfFormatPipe().transform(row.cpf) },
    { key: 'cnhNumber', label: 'CNH' },
    { key: 'cnhCategory', label: 'Categoria' },
    { key: 'cnhStatus', label: 'Status CNH' },
  ];

  ngOnInit(): void {
    this.loadDrivers(DEFAULT_PAGE_PARAMS);
  }

  loadDrivers(params: PageParams): void {
    this.driverService.getPage(params).subscribe({
      next: (res) => {
        this.drivers.set(res.content);
        this.totalElements.set(res.totalElements);
        this.pageIndex.set(res.number);
        this.pageSize.set(res.size);
      },
    });
  }

  onPageChange(params: PageParams): void {
    this.loadDrivers(params);
  }

  navigateToForm(): void {
    this.router.navigate(['/drivers/new']);
  }

  navigateToDetail(driver: Driver): void {
    this.router.navigate(['/drivers', driver.id]);
  }
}
