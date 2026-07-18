---
name: skill-fullstack-integration
description: >
  Guia de integração fullstack (Angular + Spring Boot) para o projeto Fleet.
  Use ao consumir endpoints da API, mapear DTOs, ou sincronizar contratos
  entre frontend e backend.
---

## Contratos API (interfaces TypeScript)

| Interface | Backend DTO | Campos-chave |
|-----------|-------------|--------------|
| `Vehicle` | `VehicleDTO` | id, plate, model, brand, year, status, fuelType |
| `Driver` | `DriverDTO` | id, name, cpf, cnhNumber, cnhCategory, cnhStatus |
| `Trip` | `TripDTO` | id, vehicleId, driverId, status, origin, destination |
| `MaintenanceOrder` | `MaintenanceDTO` | id, vehicleId, type, cost, mileage, nextMileage |
| `VehicleAssignment` | `AssignmentDTO` | id, vehicleId, driverId, startDate, status |
| `Fine` | `FineDTO` | id, vehicleId, driverCpf, amount, status |
| `ServiceOrder` | `ServiceOrderDTO` | id, vehicleId, description, status |
| `AuditLog` | `AuditLogDTO` | id, entityType, entityId, action, timestamp |

## Cenários BDD

```gherkin
Cenário: Consumo de endpoint paginado
  Dado que o backend retorna PageableResponse<Vehicle>
  Quando o frontend consome GET /api/v1/vehicles?page=0&size=20
  Então o response é tipado como PageableResponse<Vehicle>
  E o campo 'number' (não 'page') é usado para índice da página atual

Cenário: Tratamento de erro 400 com fieldErrors
  Dado que o backend retorna ErrorResponse com fieldErrors
  Quando o frontend recebe HTTP 400
  Então o errorInterceptor extrai fieldErrors
  E o FormValidationService aplica nos controles do FormGroup
```

## Responsabilidades

- Sincronizar interfaces TypeScript com DTOs do backend
- Implementar services que consomem endpoints corretos
- Tratar erros da API no frontend
- Mapear paginação (campo `number` vs `page`)
- Integrar com Swagger UI para validação de contratos
