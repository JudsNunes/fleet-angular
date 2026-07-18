import { Component, input, output, signal, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { PageParams, DEFAULT_PAGE_PARAMS } from '../../../core/models/pagination.models';

export interface ColumnDef<T> {
  key: string;
  label: string;
  pipe?: string;
  pipeArgs?: unknown;
  width?: string;
  sortable?: boolean;
  format?: (row: T) => string;
}

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  template: `
    <div class="data-grid-container">
      <table mat-table [dataSource]="data()" class="data-table">
        @for (col of columns(); track col.key) {
          <ng-container [matColumnDef]="col.key">
            <th mat-header-cell *matHeaderCellDef [style.width]="col.width ?? 'auto'">
              @if (col.sortable !== false) {
                {{ col.label }}
              } @else {
                {{ col.label }}
              }
            </th>
            <td mat-cell *matCellDef="let row">
              @if (col.format) {
                {{ col.format(row) }}
              } @else {
                {{ row[col.key] }}
              }
            </td>
          </ng-container>
        }

        <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns()" (click)="rowClick.emit(row)" class="clickable-row"></tr>

        @if (data().length === 0) {
          <tr class="mat-row no-data-row">
            <td class="mat-cell" [attr.colspan]="columns().length">
              Nenhum registro encontrado
            </td>
          </tr>
        }
      </table>

      @if (showPaginator()) {
        <mat-paginator
          [length]="totalElements()"
          [pageSize]="pageSize()"
          [pageSizeOptions]="[10, 20, 50]"
          [pageIndex]="pageIndex()"
          (page)="onPageChange($event)"
          showFirstLastButtons>
        </mat-paginator>
      }
    </div>
  `,
  styles: [`
    .data-grid-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    }
    .data-table {
      width: 100%;
    }
    .clickable-row {
      cursor: pointer;
    }
    .clickable-row:hover {
      background: #f5f5f5;
    }
    .no-data-row td {
      text-align: center;
      padding: 24px;
      color: #666;
    }
  `],
})
export class DataGridComponent<T> {
  data = input<T[]>([]);
  columns = input.required<ColumnDef<T>[]>();
  totalElements = input(0);
  pageSize = input(20);
  pageIndex = input(0);
  showPaginator = input(true);

  pageChange = output<PageParams>();
  rowClick = output<T>();

  displayedColumns = signal<string[]>([]);

  constructor() {
    effect(() => {
      if (this.columns().length > 0) {
        this.displayedColumns.set(this.columns().map(c => c.key));
      }
    }, { allowSignalWrites: true });
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit({
      page: event.pageIndex,
      size: event.pageSize,
    });
  }
}
