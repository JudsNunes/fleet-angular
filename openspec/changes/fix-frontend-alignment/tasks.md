# Tasks: fix-frontend-alignment

## Fase 1 — Sidebar Alignment
- [x] Task: Corrigir alinhamento nav-items vs expansion-panels (padding, height, border-radius consistentes)
- [x] Task: Adicionar hover em child items do expansion-panel
- [x] Task: Unificar posicionamento de ícones entre nav-items e panels

## Fase 2 — Breadcrumbs Integration
- [ ] Task: Importar BreadcrumbsComponent no ShellComponent e renderizar acima do router-outlet

## Fase 3 — Loading Spinner Unification
- [ ] Task: Importar LoadingSpinnerComponent no ShellComponent
- [ ] Task: Remover loading bar inline do HeaderComponent (duplicada)

## Fase 4 — DataGrid Bug Fix
- [ ] Task: Substituir setInterval() por effect() no constructor do DataGridComponent

## Fase 5 — VehicleService Endpoint Fix
- [ ] Task: Corrigir VehicleService.updateStatus() para PATCH /vehicles/{id}/status

## Fase 6 — TripService Endpoint Fix
- [ ] Task: Corrigir TripService.startTrip() para POST /trips/{id}/start
- [ ] Task: Corrigir TripService.completeTrip() para POST /trips/{id}/complete
- [ ] Task: Corrigir TripService.cancelTrip() para POST /trips/{id}/cancel

## Fase 7 — Badge CSS Classes
- [ ] Task: Adicionar classes de badge faltantes no VehicleDetailComponent
- [ ] Task: Adicionar classes de badge faltantes no DriverDetailComponent

## Fase 8 — Limpeza
- [ ] Task: Remover template Angular default do app.html
- [ ] Task: Ajustar gap do form-container de 4px para 16px
