# Architecture Decisions

## AD-001: Standalone Components
- **Decision**: Todos os componentes são standalone (sem NgModules)
- **Rationale**: Angular 22 default, lazy loading nativo, tree-shaking melhor

## AD-002: Signals para Estado de UI
- **Decision**: Angular Signals para loading, filtros, sidebar state
- **Rationale**: Performance superior ao Zone.js, DX melhor

## AD-003: RxJS para Estado Assíncrono
- **Decision**: BehaviorSubject + Observable para HTTP e WebSocket
- **Rationale**: Compatível com HttpClient, debounce, cancellation

## AD-004: ApiBaseService Genérico
- **Decision**: Service abstrato genérico com CRUD básico
- **Rationale**: Elimina duplicação, padrão consistente em todos os domains

## AD-005: Error Handling com RFC 7807
- **Decision**: errorInterceptor mapeia fieldErrors para FormValidationService
- **Rationale**: Backend já retorna ProblemDetail, frontend aplica nativamente

## AD-006: Lazy-Loaded Features
- **Decision**: Cada feature é carregada sob demanda via `loadChildren`/`loadComponent`
- **Rationale**: Bundle inicial mínimo, performance em produção

## AD-007: Pagination Field `number`
- **Decision**: Backend usa `number` (não `page`) no PageableResponse
- **Rationale**: Alinhado com Spring Data Pageable response
