---
name: skill-angular-architecture
description: >
  Guia de arquitetura Angular para o projeto Fleet SaaS.
  Use ao projetar componentes, definir padrões de state management,
  configurar routing, ou tomar decisões arquiteturais no frontend.
---

## Padrões

- Components: standalone (sem NgModules)
- State (UI): Angular Signals
- State (HTTP): RxJS BehaviorSubject + Observable
- Routing: lazy-loaded features via `loadChildren`/`loadComponent`
- Forms: Reactive Forms com bind de fieldErrors via setErrors()

## Cenários BDD

```gherkin
Cenário: Arquitetura de standalone components
  Dado que o projeto usa Angular 22
  E todos os componentes são standalone
  Quando um novo componente é criado
  Então ele declara seus próprios imports no decorator @Component

Cenário: State management com Signals e RxJS
  Dado que a aplicação precisa de estado síncrono (UI) e assíncrono (HTTP)
  Quando o estado é de UI (loading, sidebar, filtros)
  Então usa-se Angular Signals
  Quando o estado é de dados assíncronos (HTTP, WebSocket)
  Então usa-se RxJS BehaviorSubject + Observable
```

## Responsabilidades

- Definir padrões de componentes (standalone, signals, RxJS)
- Projetar estrutura de pastas (feature-based)
- Decidir patterns de state management
- Validar routing strategy (lazy-loaded)
- Revisar arquitetura de interceptadores
