import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../../core/services/api-base.service';
import { VehicleAssignment, VehicleAssignmentRequest } from '../../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class AssignmentService extends ApiBaseService<VehicleAssignment, VehicleAssignmentRequest> {
  protected readonly basePath = 'assignments';

  endAssignment(id: string) {
    return this.patch(id, { status: 'COMPLETED' } as Partial<VehicleAssignmentRequest>);
  }
}
