import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DriverService } from '../../services/driver.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Driver } from '../../../../core/models/api.models';
import { CpfFormatPipe } from '../../../../core/pipes/cpf-format.pipe';
import { DateFormatPipe } from '../../../../core/pipes/date-format.pipe';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, PageHeaderComponent, CpfFormatPipe, DateFormatPipe],
  template: `
    <app-page-header [title]="'Motorista — ' + (driver()?.name ?? '')" backRoute="/drivers">
      <button mat-stroked-button (click)="edit()"><mat-icon>edit</mat-icon> Editar</button>
      <button mat-stroked-button color="warn" (click)="confirmDelete()"><mat-icon>delete</mat-icon> Excluir</button>
    </app-page-header>

    @if (driver(); as d) {
      <mat-card class="detail-card">
        <mat-card-content>
          <div class="detail-row"><span class="label">Nome:</span><span>{{ d.name }}</span></div>
          <div class="detail-row"><span class="label">CPF:</span><span>{{ d.cpf | cpfFormat }}</span></div>
          <div class="detail-row"><span class="label">CNH:</span><span>{{ d.cnhNumber }} ({{ d.cnhCategory }})</span></div>
          <div class="detail-row"><span class="label">Validade CNH:</span><span>{{ d.cnhExpiry | dateFormat:'long' }}</span></div>
          <div class="detail-row"><span class="label">Status CNH:</span><span class="badge badge-{{ d.cnhStatus?.toLowerCase() }}">{{ d.cnhStatus }}</span></div>
          <div class="detail-row"><span class="label">Telefone:</span><span>{{ d.phone }}</span></div>
          <div class="detail-row"><span class="label">Email:</span><span>{{ d.email }}</span></div>
        </mat-card-content>
      </mat-card>
    }
  `,
  styles: [`
    .detail-card { max-width: 700px; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .label { font-weight: 500; color: #666; }
    .badge { padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .badge-valid { background: #e8f5e9; color: #2e7d32; }
    .badge-expired { background: #fce4ec; color: #c62828; }
    .badge-suspended { background: #fff3e0; color: #e65100; }
    .badge-pending { background: #f3e5f5; color: #7b1fa2; }
  `],
})
export class DriverDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly driverService = inject(DriverService);
  private readonly notification = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  driver = signal<Driver | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.driverService.getById(id).subscribe({ next: (d) => this.driver.set(d) });
  }

  edit(): void {
    this.router.navigate(['/drivers', this.driver()?.id, 'edit']);
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Excluir Motorista', message: `Deseja excluir ${this.driver()?.name}?`, confirmLabel: 'Excluir', color: 'warn' },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.driverService.delete(this.driver()!.id).subscribe({
          next: () => { this.notification.success('Motorista excluído!'); this.router.navigate(['/drivers']); },
        });
      }
    });
  }
}
