import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../../core/services/api-base.service';
import { MaintenanceOrder, MaintenanceOrderRequest } from '../../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class MaintenanceService extends ApiBaseService<MaintenanceOrder, MaintenanceOrderRequest> {
  protected readonly basePath = 'maintenances';
}
