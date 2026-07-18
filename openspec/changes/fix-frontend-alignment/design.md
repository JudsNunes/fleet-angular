## Context

O frontend Angular 22 do Fleet SaaS foi construído com componentes standalone e Signals. Durante a exploração, identificaram-se 8 categorias de problemas de enquadramento (layout/alignment) e integração com backend. A correção será incremental, uma branch por tipo de erro, para permitir PRs individuais.

## Goals / Non-Goals

**Goals:**
- Corrigir alinhamento visual e spacing do sidebar (nav-items vs expansion-panels)
- Integrar BreadcrumbsComponent no ShellComponent
- Unificar loading indicator (LoadingSpinnerComponent no shell, remover duplicação do header)
- Corrigir bug de performance no DataGrid (setInterval -> effect())
- Corrigir endpoints incorretos nos services (Vehicle, Trip)
- Adicionar badge classes CSS faltantes
- Remover template Angular default inútil (app.html)
- Ajustar spacing dos formulários (gap 4px -> 16px)

**Non-Goals:**
- Não alterar a lógica de negócio do backend
- Não refatorar a arquitetura de componentes (standalone)
- Não implementar autenticação real (permanece stub)
- Não implementar multi-tenancy

## Decisions

| Decisão | Opção | Rationale |
|---------|-------|-----------|
| Loading unificado | LoadingSpinnerComponent no shell, remover do header | Evita duplicação, único ponto de controle |
| Hover child items | `::ng-deep mat-expansion-panel mat-list-item:hover` | Consistência com nav-items |
| Badge classes | Adicionar no CSS inline dos components de detail | Cada detail sabe seus próprios status |
| DataGrid displayedColumns | `effect()` em vez de `setInterval()` | Signals idiomático, sem polling |
| Trip endpoints | `POST /trips/{id}/start`, `/complete`, `/cancel` | Alinhado com backend Spring |
| Vehicle endpoint | `PATCH /vehicles/{id}/status` com body `{ status: ... }` | Alinhado com backend |

## Risks / Trade-offs

- [Risco] Mudar endpoints do TripService pode quejar componentes que chamam as actions. → Mitigação: verificar que trip-list e trip-form usam os métodos corretos.
- [Risco] `effect()` no DataGrid pode disparar mudanças detectivas se não configurado corretamente. → Mitigação: usar `effect(() => { ... }, { allowSignalWrites: true })`.
