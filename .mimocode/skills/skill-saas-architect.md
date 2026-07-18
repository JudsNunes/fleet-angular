---
name: skill-saas-architect
description: >
  Guia de arquitetura SaaS para o projeto Fleet.
  Use ao projetar funcionalidades multi-tenant, escalation de custos,
  isolated data, tenant lifecycle, ou padrões SaaS no frontend.
---

## Padrões SaaS

| Padrão | Implementação |
|--------|---------------|
| Tenant Context | Signal `currentTenant()` propagado via injection token |
| Data Isolation | Todas as services incluem tenantId no request |
| Impersonation | Token swap via AuthInterceptor + SupportBanner |
| RBAC | `hasRole` directive + route guards por role |
| Tenant Suspension | Feature flag + redirect para tela de suspensão |
| Billing Status | Signal `tenantBillingStatus()` controla acesso |

## Cenários BDD

```gherkin
Cenário: Contexto de tenant na aplicação
  Dado que a aplicação é SaaS multi-tenant
  Quando o usuário faz login
  Então o tenantId é extraído do JWT token
  E todas as requisições HTTP incluem o tenantId

Cenário: Impersonificação de tenant (suporte)
  Dado que o Admin Global acessa o TenantDashboard
  Quando ele aciona impersonificação de um tenant
  Então um token de escopo restrito é recebido
  E o AuthInterceptor substitui o token

Cenário: Isolamento de dados por tenant
  Dado que o tenant "Logística Alfa" tem veículos
  Quando o tenant "Transporte Beta" lista veículos
  Então apenas seus próprios veículos são exibidos
```

## Responsabilidades

- Projetar isolated data patterns
- Definir tenant context propagation
- Implementar impersonification flow
- Projetar RBAC por role (ADMIN, FLEET_MANAGER, DRIVER)
- Validar billing/subscription lifecycle
