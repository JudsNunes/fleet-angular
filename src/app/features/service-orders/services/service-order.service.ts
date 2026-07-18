import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../../core/services/api-base.service';
import { ServiceOrder, ServiceOrderRequest } from '../../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class ServiceOrderService extends ApiBaseService<ServiceOrder, ServiceOrderRequest> {
  protected readonly basePath = 'service-orders';

  approve(id: string) {
    return this.patch(id, { status: 'APPROVED' } as Partial<ServiceOrderRequest>);
  }

  reject(id: string) {
    return this.patch(id, { status: 'REJECTED' } as Partial<ServiceOrderRequest>);
  }

  complete(id: string) {
    return this.patch(id, { status: 'COMPLETED' } as Partial<ServiceOrderRequest>);
  }
}
