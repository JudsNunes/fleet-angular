import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../../core/services/api-base.service';
import { Trip, TripRequest } from '../../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class TripService extends ApiBaseService<Trip, TripRequest> {
  protected readonly basePath = 'trips';

  startTrip(id: string) {
    return this.patch(id, { status: 'IN_PROGRESS' } as Partial<TripRequest>);
  }

  completeTrip(id: string) {
    return this.patch(id, { status: 'COMPLETED' } as Partial<TripRequest>);
  }

  cancelTrip(id: string) {
    return this.patch(id, { status: 'CANCELLED' } as Partial<TripRequest>);
  }
}
