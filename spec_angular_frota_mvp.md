# Especificação Orientada a Comportamento (SDD)
## Aplicação Front-End Angular: SaaS de Gestão de Frota Veicular

### 1. Visão Geral da Arquitetura Angular
Esta especificação define o comportamento e a estrutura técnica para a auditoria e desenvolvimento do front-end em **Angular** do MVP ("fleet"). A abordagem *Spec-Driven Development* garante que a interface Angular aja como um cliente reativo, consumindo a API RESTful (arquitetada sobre Spring Boot 3.4.x) de forma estrita.

**Diretrizes do Projeto Angular:**
* **Arquitetura de Componentes:** Uso de *Standalone Components* para reduzir o acoplamento de módulos (`NgModules`) e facilitar o *lazy loading*. analise o path do backend "C:\Users\LUCAS NUNES\Documents\dev\fleet\fleet"
* **Reatividade:** Gerenciamento de estado utilizando *Angular Signals* para UI síncrona e *RxJS* para fluxos assíncronos de dados de telemetria.
* **Interceptação:** Uso de `HttpInterceptor` para injeção automática de tokens JWT e captura global de erros.

---

### 2. Portal de Gerenciamento Admin (SaaS Multi-Tenant)

#### 2.1. Cenários de Comportamento (BDD) mapeados para Angular

**Funcionalidade: Gestão do Ciclo de Vida do Tenant**
* **Cenário: Suspensão de tenant por inadimplência**
  * **Dado** que o Administrador Global acessa o componente `TenantDashboardComponent`
  * **E** o `TenantService` retorna no `Observable` que a "Logística Alfa" possui faturas em atraso
  * **Quando** o administrador acionar o método `suspendTenant()` via botão na UI
  * **Então** o `HttpClient` deve disparar um `PATCH` para `/api/v1/admin/tenants/{tenantId}/status`
  * **E** ao resolver a requisição com `200 OK`, um `Signal` de estado global (`tenantStatus()`) deve ser atualizado para "SUSPENDED"
  * **E** o `MatSnackBar` (ou serviço de notificação equivalente) deve exibir: "Tenant suspenso."

**Funcionalidade: Impersonificação (Acesso Suporte)**
* **Cenário: Admin acessando a visão de um cliente para suporte**
  * **Dado** que o Admin aciona a impersonificação no `SupportComponent`
  * **Quando** o novo token de escopo restrito for recebido
  * **Então** o `AuthInterceptor` deve substituir o token no *header* das próximas requisições
  * **E** o `Router` deve navegar para a rota protegida do cliente
  * **E** um componente estrutural `SupportBannerComponent` deve ser renderizado no *layout* principal através de uma diretiva estrutural `*ngIf="isImpersonating()"`.

---

### 3. Módulo: Reconhecimento de Padrões da Frota (Analytics)

#### 3.1. Cenários de Comportamento (BDD) mapeados para Angular

**Funcionalidade: Alertas Visuais de Anomalia de Consumo**
* **Cenário: Identificação de desvio padrão na renderização**
  * **Dado** que o `AnalyticsComponent` faz o *subscribe* no *endpoint* de anomalias
  * **Quando** o *array* de telemetria for iterado na view
  * **Então** a diretiva `[ngClass]` deve aplicar a classe CSS de destaque crítico (vermelho) se a métrica *actual* for 25% maior que a *expected*
  * **E** o componente de *tooltip* do Angular Material (`matTooltip`) deve formatar a exibição usando um *Pipe* customizado `ConsumptionFormatPipe`.

---

### 4. Estrutura de Componentes e Serviços Angular (Design System)

Para auditar o código atual e guiar os próximos passos, o MVP deve aderir aos seguintes padrões:

* **`FleetDataGridComponent` (Tabela Universal):**
  * *Requisito:* Deve implementar `MatTableDataSource` (ou similar) conectado diretamente a um serviço de paginação baseado em RxJS (`BehaviorSubject` para parâmetros de página/tamanho).
* **`GlobalErrorInterceptor` (Tratamento de Exceções):**
  * *Requisito:* Deve capturar respostas `400 Bad Request` [cite: 1]. Se o *payload* contiver o array `fieldErrors` [cite: 1], o interceptor deve delegar o erro para um serviço de validação (`FormValidationService`), que fará o *bind* das mensagens de erro nos controles do `ReactiveFormsModule` usando `AbstractControl.setErrors()`.
* **`PatternChartComponent`:**
  * *Requisito:* O ciclo de vida `ngOnInit` deve inicializar os gráficos, e o `ngOnDestroy` deve obrigatoriamente fazer o `unsubscribe` de conexões *WebSocket* ou *Polling* de telemetria para evitar vazamento de memória (*memory leaks*).

---

### 5. Contratos de API Esperados (Mock API-First)
As interfaces do TypeScript (`interfaces.ts` ou `models.ts`) devem espelhar estritamente as respostas do backend.

```typescript
// Interface baseada no contrato de anomalias da API
export interface FleetAnomaly {
  anomalyId: string;
  vehicleId: string;
  licensePlate: string;
  patternCategory: 'FUEL_CONSUMPTION' | 'MECHANICAL_FAILURE' | 'ROUTE_DEVIATION';
  severity: 'LOW' | 'WARNING' | 'CRITICAL';
  description: string;
  metrics: {
    expected: number;
    actual: number;
    unit: string;
  };
  detectedAt: string; // ISO-8601
}

// Interface de paginação padrão do Spring Data
export interface PageableResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}
```
