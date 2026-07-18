# Spec: API Service Fixes

## Visão Geral
Correção de endpoints nos services Angular para alinhamento com a API REST do backend Spring Boot.

## Mudanças

### VehicleService
- `updateStatus(id, status)`: deve chamar `PATCH /api/v1/vehicles/{id}/status` com body `{ status: "ACTIVE" }`
- Atualmente chama `PATCH /api/v1/vehicles/{id}` genérico

### TripService
- `startTrip(id)`: deve chamar `POST /api/v1/trips/{id}/start` com body `{ startMileage: ... }`
- `completeTrip(id)`: deve chamar `POST /api/v1/trips/{id}/complete` com body `{ endMileage: ... }`
- `cancelTrip(id)`: deve chamar `POST /api/v1/trips/{id}/cancel`
- Atualmente todos chamam `PATCH /api/v1/trips/{id}` genérico

### DataGrid
- Substituir `setInterval()` no constructor por `effect()` do Angular Signals
- `displayedColumns` deve ser computado reativamente via `computed()` ou `effect()`
