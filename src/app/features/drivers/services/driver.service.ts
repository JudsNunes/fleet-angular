import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../../core/services/api-base.service';
import { Driver, DriverRequest } from '../../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class DriverService extends ApiBaseService<Driver, DriverRequest> {
  protected readonly basePath = 'drivers';
}
