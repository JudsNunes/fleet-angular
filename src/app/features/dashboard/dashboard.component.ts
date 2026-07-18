import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { NotificationService } from '../../core/services/notification.service';

interface KpiCard {
  label: string;
  value: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, PageHeaderComponent],
  template: `
    <app-page-header title="Dashboard" subtitle="Visão geral da frota" />

    <div class="kpi-grid">
      @for (kpi of kpis(); track kpi.label) {
        <mat-card class="kpi-card" [style.border-left-color]="kpi.color">
          <mat-card-content>
            <div class="kpi-icon" [style.background]="kpi.color + '20'" [style.color]="kpi.color">
              <mat-icon>{{ kpi.icon }}</mat-icon>
            </div>
            <div class="kpi-info">
              <span class="kpi-value">{{ kpi.value }}</span>
              <span class="kpi-label">{{ kpi.label }}</span>
            </div>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .kpi-card {
      border-left: 4px solid;
    }
    .kpi-card mat-card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
    }
    .kpi-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .kpi-info {
      display: flex;
      flex-direction: column;
    }
    .kpi-value {
      font-size: 28px;
      font-weight: 600;
      color: #333;
    }
    .kpi-label {
      font-size: 13px;
      color: #666;
      margin-top: 2px;
    }
  `],
})
export class DashboardComponent implements OnInit {
  private readonly notification = inject(NotificationService);

  kpis = signal<KpiCard[]>([
    { label: 'Veículos Ativos', value: 0, icon: 'directions_car', color: '#4caf50' },
    { label: 'Motoristas CNH Válida', value: 0, icon: 'person', color: '#2196f3' },
    { label: 'Viagens em Andamento', value: 0, icon: 'route', color: '#ff9800' },
    { label: 'Manutenções Pendentes', value: 0, icon: 'build', color: '#f44336' },
  ]);

  ngOnInit(): void {
    // TODO: fetch real KPIs from backend
    this.kpis.set([
      { label: 'Veículos Ativos', value: 24, icon: 'directions_car', color: '#4caf50' },
      { label: 'Motoristas CNH Válida', value: 18, icon: 'person', color: '#2196f3' },
      { label: 'Viagens em Andamento', value: 7, icon: 'route', color: '#ff9800' },
      { label: 'Manutenções Pendentes', value: 3, icon: 'build', color: '#f44336' },
    ]);
  }
}
