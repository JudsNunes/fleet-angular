## Why

O frontend Angular do Fleet SaaS possui erros de enquadramento (layout/alignment) e inconsistências com o backend: componentes visuais desalinhados, endpoints incorretos em services, componentes não utilizados, bugs de performance e classes CSS faltantes. Isso compromete a experiência do usuário e a correta integração com a API REST.

## What Changes

- **Sidebar**: Alinhar nav-items com expansion-panels, corrigir padding/height/border-radius, adicionar hover em child items
- **Breadcrumbs**: Integrar BreadcrumbsComponent no ShellComponent
- **LoadingSpinner**: Remover duplicação — usar LoadingSpinnerComponent no shell, remover loading bar inline do header
- **DataGrid**: Substituir `setInterval()` por `effect()` do Angular Signals
- **VehicleService**: Corrigir endpoint `updateStatus()` para `PATCH /vehicles/{id}/status`
- **TripService**: Corrigir actions (`startTrip`, `completeTrip`, `cancelTrip`) para endpoints específicos
- **Badge classes**: Adicionar classes CSS faltantes (retired, scheduled, planned, in_progress, completed, cancelled)
- **app.html**: Limpar template Angular default desnecessário
- **Forms**: Ajustar `gap` do form-container de 4px para 16px para consistência

## Capabilities

### New Capabilities
- `frontend-alignment`: Correção de enquadramento visual e layout do frontend Angular (sidebar, badges, forms)
- `api-service-fixes`: Correção de endpoints nos services (Vehicle, Trip) para alinhamento com backend

### Modified Capabilities
- `spec-angular-fleet-mvp`: Models e services precisam ser atualizados com os campos corretos do backend

## Impact

- `src/app/shared/layout/sidebar/sidebar.component.ts` — estilos CSS
- `src/app/shared/layout/shell/shell.component.ts` — import do BreadcrumbsComponent
- `src/app/shared/layout/header/header.component.ts` — remover loading bar
- `src/app/shared/components/data-grid/data-grid.component.ts` — corrigir constructor
- `src/app/shared/components/loading-spinner/loading-spinner.component.ts` — integrar no shell
- `src/app/features/vehicles/services/vehicle.service.ts` — corrigir endpoint
- `src/app/features/trips/services/trip.service.ts` — corrigir endpoints
- `src/app/features/vehicles/components/vehicle-detail/vehicle-detail.component.ts` — badges
- `src/app/features/drivers/components/driver-detail/driver-detail.component.ts` — badges
- `src/app/app.html` — limpar template default
