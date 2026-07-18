---
name: skill-java-api-integration
description: >
  Guia de integração com a API Java (Spring Boot) do projeto Fleet.
  Use ao verificar contratos OpenAPI, validar endpoints, ou
  resolver inconsistências entre frontend e backend.
---

## Backend Reference

- **Spec**: `evolutech-fleet.yaml` (OpenAPI 3.1.0)
- **Base URL**: `/api/v1`
- **Auth**: JWT (bearerAuth)
- **Pagination**: Spring Data Pageable (campo `number`, não `page`)
- **Errors**: RFC 7807 ProblemDetail com `fieldErrors`

## Cenários BDD

```gherkin
Cenário: Validação de contrato OpenAPI
  Dado que o backend define evolutech-fleet.yaml
  Quando uma nova interface TypeScript é criada
  Então ela deve espelhar exatamente o schema do OpenAPI

Cenário: Driver update retorna 200 vazio
  Dado que o backend retorna 200 OK sem body para PUT /drivers/{id}
  Quando o frontend envia atualização de motorista
  Então o service não tenta parsear response body

Cenário: Paginação com sort
  Dado que o backend ordena veículos por plate ASC
  Quando o frontend carrega a lista
  Então a ordenação é aplicada no backend
```

## Responsabilidades

- Verificar OpenAPI spec do backend (`evolutech-fleet.yaml`)
- Validar que interfaces TypeScript espelham DTOs
- Identificar inconsistências entre contratos
- Documentar comportamentos específicos do backend
- Testar endpoints via Swagger UI
