import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../../core/services/api-base.service';
import { Fine, FineRequest } from '../../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class FineService extends ApiBaseService<Fine, FineRequest> {
  protected readonly basePath = 'fines';
}
