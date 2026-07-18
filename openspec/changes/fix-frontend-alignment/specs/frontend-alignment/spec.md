# Spec: Frontend Alignment

## Visão Geral
Correção de enquadramento visual e layout do frontend Angular para consistência entre componentes.

## Mudanças

### Sidebar
- Nav-items e expansion-panels devem ter mesma altura, padding e border-radius
- Child items (mat-list-item) devem ter hover: rgba(255,255,255,0.1)
- Ícones devem ter mesmo posicionamento (via mat-icon) em ambos os casos

### Breadcrumbs
- BreadcrumbsComponent deve ser importado no ShellComponent
- Renderizado acima do `<router-outlet>` na área de conteúdo

### LoadingSpinner
- LoadingSpinnerComponent importado no ShellComponent
- Remover loading bar duplicada do HeaderComponent

### Badge classes
- Adicionar classes: `.badge-retired`, `.badge-scheduled`, `.badge-planned`, `.badge-in_progress`, `.badge-completed`, `.badge-cancelled`, `.badge-pending`
- Cores consistentes com Material Design (verde, azul, laranja, vermelho, cinza)

### Forms
- Form container: `gap: 16px` em vez de 4px
- Manter `max-width: 700px` e `.form-row gap: 16px`

### app.html
- Remover template Angular default (mantido como placeholder vazio)
