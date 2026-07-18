import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiBaseService } from '../../../core/services/api-base.service';
import { Trip, TripRequest } from '../../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class TripService extends ApiBaseService<Trip, TripRequest> {
  protected readonly basePath = 'trips';
  private readonly httpClient = inject(HttpClient);

  startTrip(id: string, startMileage: number) {
    return this.httpClient.post<Trip>(`${this.baseUrl}/${id}/start`, { startMileage });
  }

  completeTrip(id: string, endMileage: number) {
    return this.httpClient.post<Trip>(`${this.baseUrl}/${id}/complete`, { endMileage });
  }

  cancelTrip(id: string) {
    return this.httpClient.post<Trip>(`${this.baseUrl}/${id}/cancel`, {});
  }
}
