import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiBaseService } from '../../../core/services/api-base.service';
import { Vehicle, VehicleRequest } from '../../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class VehicleService extends ApiBaseService<Vehicle, VehicleRequest> {
  protected readonly basePath = 'vehicles';
  private readonly httpClient = inject(HttpClient);

  updateStatus(id: string, status: string) {
    return this.httpClient.patch<Vehicle>(`${this.baseUrl}/${id}/status`, { status });
  }
}
