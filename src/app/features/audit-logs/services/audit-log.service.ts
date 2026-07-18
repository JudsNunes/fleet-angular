import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../../core/services/api-base.service';
import { AuditLog } from '../../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class AuditLogService extends ApiBaseService<AuditLog> {
  protected readonly basePath = 'audit-logs';
}
