import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../../core/services/api-base.service';
import { Vehicle, VehicleRequest } from '../../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class VehicleService extends ApiBaseService<Vehicle, VehicleRequest> {
  protected readonly basePath = 'vehicles';

  updateStatus(id: string, status: string) {
    return this.patch(id, { status } as Partial<VehicleRequest>);
  }
}
