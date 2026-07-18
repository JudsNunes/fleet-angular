# Spec: Fleet Angular MVP

## Visão Geral
Frontend Angular 22 que consome a API REST Spring Boot do Fleet SaaS. Segue padrão Spec-Driven Development com OpenAPI como fonte de verdade.

## Módulos

### Dashboard
- KPIs: veículos ativos, motoristas CNH válida, viagens em andamento, manutenções pendentes
- Filtros por tenant

### Veículos (CRUD)
- Listagem paginada com filtros (placa, marca, modelo, status)
- Formulário com validação Mercosul (regex `^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$`)
- Detalhe com edição e exclusão (soft-delete)
- Service: `VehicleService extends ApiBaseService<Vehicle, VehicleRequest>`

### Motoristas (CRUD)
- Listagem paginada com filtro por CPF
- Formulário com validação de CPF (11 dígitos) e CNH
- Detalhe com status de CNH (VALID, EXPIRED, SUSPENDED)
- Service: `DriverService extends ApiBaseService<Driver, DriverRequest>`

### Viagens (CRUD + Actions)
- Listagem com status (SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, DEVIATED)
- Actions: start, complete, cancel
- Service: `TripService extends ApiBaseService<Trip, TripRequest>`

### Manutenções (CRUD)
- Types: PREVENTIVE, CORRECTIVE, EMERGENCY
- Custo por quilômetro (analytics)
- Service: `MaintenanceService extends ApiBaseService<MaintenanceOrder, MaintenanceOrderRequest>`

### Atribuições (CRUD)
- Vinculação motorista-veício
- End assignment
- Service: `AssignmentService extends ApiBaseService<VehicleAssignment, VehicleAssignmentRequest>`

### Multas (CRUD)
- Status: PENDING, PAID, CONTESTED, CANCELLED
- Service: `FineService extends ApiBaseService<Fine, FineRequest>`

### Ordens de Serviço (CRUD + Workflow)
- Workflow: OPEN → IN_PROGRESS → APPROVED → COMPLETED (ou REJECTED)
- Actions: approve, reject, complete
- Service: `ServiceOrderService extends ApiBaseService<ServiceOrder, ServiceOrderRequest>`

### Auditoria (Read-only)
- Logs de ações com filtros por entidade, ação, data
- Service: `AuditLogService extends ApiBaseService<AuditLog>`

## Convenções

| Aspecto | Padrão |
|---------|--------|
| Components | Standalone (sem NgModules) |
| State (UI) | Angular Signals |
| State (HTTP) | RxJS BehaviorSubject |
| Forms | Reactive Forms |
| Routing | Lazy-loaded features |
| UI Library | Angular Material |
| Error Handling | RFC 7807 ProblemDetail via error interceptor |
| Pagination | `number` field (não `page`) |
| Soft-delete | `deletedAt` field |

## Endpoints Backend (61 total)
- Auth: `POST /api/v1/auth/token`
- Admin: `GET /api/v1/admin/tenants`
- Vehicles: CRUD + status + search
- Drivers: CRUD + CPF search
- Trips: CRUD + start/complete/cancel/deviation
- Maintenances: CRUD + by-vehicle + by-status
- Assignments: CRUD + end + active
- Fines: CRUD + by-driver + by-status
- Service Orders: CRUD + approve/reject/complete
- Audit Logs: read-only com filtros
