# Passo 2 (Refatorado): Arquitetura Orientada a Contratos (Open Spec) para MVP de Gestão de Frotas

Este documento redefine a arquitetura do SaaS de Gestão de Frotas ("fleet") adotando estritamente o **Spec-Driven Development** (via OpenAPI Specification - OAS 3.1). O foco é garantir que o contrato da API seja a única fonte de verdade antes da escrita de qualquer código, alinhando o back-end e o front-end em Angular de forma simétrica.

---

## 1. Princípios do Open Spec Development no MVP

1. **Design First:** O arquivo `openapi.yaml` é escrito, revisado e aprovado antes da implementação das *Controllers* no back-end ou dos *Services* no Angular.
2. **Geração de Código (Code-Gen):** 
   * No front-end: Uso de `@openapitools/openapi-generator-cli` para gerar modelos TypeScript e serviços Angular baseados em `HttpClient`.
   * No back-end: Validação estrita de interfaces geradas, garantindo que as respostas respeitem os *schemas* definidos.
3. **Evolução Segura:** Qualquer quebra de contrato (ex: remoção de um campo obrigatório) falha no build de CI/CD.

---

## 2. Levantamento de Requisitos e Modelagem OpenAPI

Abaixo estão os requisitos arquiteturais mapeados diretamente para as especificações de contrato que o SaaS deve suportar.

### 2.1. Módulo de Identidade e Multi-Tenancy (Admin/Tenant)
* **Requisito:** Isolamento criptográfico de dados por locatário (Tenant) e controle de acesso RBAC (Role-Based Access Control).
* **Contrato Open Spec:**
  * Componente de Segurança: `bearerAuth` (JWT) exigido globalmente.
  * *Headers* Mandatórios: O `openapi.yaml` deve definir a passagem implícita (ou extração via JWT) do `X-Tenant-ID`.
  * **Schemas:** `Tenant`, `User`, `Role`.
  * **Endpoints:** `POST /api/v1/auth/token`, `GET /api/v1/admin/tenants`.

### 2.2. Módulo de Gestão de Ativos (Veículos e Condutores)
* **Requisito:** Cadastro rigoroso com regras de validação de negócio centralizadas (ex: Placa Mercosul, CNH).
* **Contrato Open Spec:**
  * Uso de `pattern` (Regex) nos schemas do OpenAPI para validação de formato antes da requisição chegar ao banco de dados PostgreSQL.
  * Implementação de `x-spring-data-pageable` para padronizar paginação.
  * **Schemas:** `Vehicle`, `Driver`, `VehicleStatusEnum`.
  * **Endpoints:** `GET /api/v1/vehicles` (com query params de filtro estruturados), `POST /api/v1/vehicles`.

### 2.3. Módulo de Telemetria e Monitoramento de Rota (Real-Time)
* **Requisito:** Rastreamento georreferenciado contínuo de alta volumetria.
* **Contrato Open Spec (Extendido para AsyncAPI):**
  * Para telemetria via WebSocket (STOMP), a especificação OpenAPI tradicional é complementada por **AsyncAPI** para definir os canais de mensageria.
  * **Canais:** `topic/telemetry/{tenantId}/{vehicleId}`.
  * **Schemas:** `GeoLocationEvent` (Latitude, Longitude, IgnitionStatus, Speed, Timestamp ISO-8601).

### 2.4. Módulo de Manutenção e Custos
* **Requisito:** Previsibilidade operacional e controle de despesas vinculadas a ordens de serviço (OS).
* **Contrato Open Spec:**
  * Uso de *Problem Details for HTTP APIs* (RFC 7807) para retornar erros de regras de negócio (ex: "Peça fora da garantia").
  * **Schemas:** `MaintenanceOrder`, `Expense`, `ProblemDetail`.
  * **Endpoints:** `POST /api/v1/maintenance/orders`, `GET /api/v1/analytics/cpk` (Custo por Quilômetro).

---

## 3. Exemplo Estrutural de Contrato (YAML Snippet)

Esta é a estrutura base que o projeto Maven deve exportar (via `springdoc-openapi`) e o Angular consumir:

```yaml
openapi: 3.1.0
info:
  title: Fleet SaaS API
  version: 1.0.0-MVP
paths:
  /api/v1/vehicles:
    post:
      summary: Cadastra um novo veículo na frota
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/VehicleRequest'
      responses:
        '201':
          description: Veículo criado com sucesso
        '400':
          description: Erro de validação de negócio (RFC 7807)
          content:
            application/problem+json:
              schema:
                $ref: '#/components/schemas/ProblemDetail'
components:
  schemas:
    VehicleRequest:
      type: object
      required: [licensePlate, chassis, capacity]
      properties:
        licensePlate:
          type: string
          pattern: '^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$' # Mercosul/Brasil
        chassis:
          type: string
          minLength: 17
          maxLength: 17
```

---

## 4. Matriz de Skills e Tecnologias Apropriadas (Squad Requirement)

Para sustentar esta arquitetura complexa, a equipe ou o desenvolvedor *Full-Stack* deve dominar as seguintes habilidades (Skills):

### 4.1. Skills de Front-end (Angular)
1. **OpenAPI Code Generation:** Domínio do `openapi-generator-cli` para automatizar a criação de interfaces e serviços no Angular, mantendo a tipagem estrita de ponta a ponta.
2. **Reatividade Avançada (RxJS & Signals):** Capacidade de lidar com fluxos de telemetria contínuos combinando WebSockets (RxJS) e atualizações de UI de alta performance usando Angular Signals (evitando ciclos desnecessários do *Zone.js*).
3. **Integração Geoespacial:** Conhecimento em APIs de mapas (Google Maps API ou Leaflet) integradas ao ecossistema Angular para renderização de marcadores em movimento e *geofencing*.
4. **Tratamento Global de Erros:** Habilidade de interceptar (`HttpInterceptor`) respostas do tipo `application/problem+json` e mapeá-las nativamente para o `ReactiveFormsModule` e componentes de feedback de usuário.

### 4.2. Skills de Back-end e Banco de Dados
1. **Spring Boot 3.4.x & OpenAPI:** Configuração avançada do `springdoc-openapi-starter-webmvc-ui` para geração *code-first* ou configuração de geradores *contract-first* no ciclo de build do Maven.
2. **Modelagem de Dados Geoespaciais:** Proficiência em PostgreSQL, com extensão **PostGIS**, para realizar cálculos de rotas, distâncias e intersecções de zonas de risco diretamente no banco.
3. **Segurança Multi-Tenant:** Implementação de filtros e resolução de escopo OAuth2 (JWT) no Spring Security, isolando *Row-Level Security* no banco ou filtros do Hibernate.
4. **Processamento Assíncrono:** Conhecimentos em mensageria e *Task Scheduling* (`@Async`, `@Scheduled`) para cálculos pesados, como previsão de manutenção e agregação de telemetria para *analytics*.
