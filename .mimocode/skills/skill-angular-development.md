---
name: skill-angular-development
description: >
  Guia de desenvolvimento Angular para o projeto Fleet.
  Use ao criar novos componentes, services, pipes, diretivas,
  ou qualquer código TypeScript/Angular no projeto.
---

## Convenções de Naming

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Component | `{domain}-{action}.component.ts` | `vehicle-list.component.ts` |
| Service | `{domain}.service.ts` | `vehicle.service.ts` |
| Interface | `{domain}.models.ts` | `vehicle.models.ts` |
| Route | `{domain}.routes.ts` | `vehicles.routes.ts` |
| Pipe | `{name}.pipe.ts` | `cpf-format.pipe.ts` |
| Guard | `{name}.guard.ts` | `auth.guard.ts` |
| Interceptor | `{name}.interceptor.ts` | `error.interceptor.ts` |

## Cenários BDD

```gherkin
Cenário: Criação de componente CRUD
  Dado que preciso criar a feature de Veículos
  Quando o componente VehicleListComponent é criado
  Então ele usa DataGridComponent para exibir dados
  E se conecta ao VehicleService via inject()

Cenário: Service com ApiBaseService
  Dado que todos os domains seguem o mesmo padrão CRUD
  Quando VehicleService é criado
  Então ele estende ApiBaseService<Vehicle, VehicleRequest>
  E sobrescreve basePath = 'vehicles'
```

## Responsabilidades

- Criar componentes seguindo o padrão standalone
- Implementar services com ApiBaseService
- Criar formulários com Reactive Forms + validação
- Implementar pipes e diretivas
- Escrever testes unitários (Vitest)
