# Spec: Sidebar Layout — Correção de Espaçamento

## Visão Geral
Componente `SidebarComponent` — navegação lateral do Fleet SaaS. Este spec define os requisitos visuais e de comportamento após correção de espaçamento.

**Arquivo**: `src/app/shared/layout/sidebar/sidebar.component.ts`

---

## 1. Estrutura do Componente

```
sidebar (260px, #1a1a2e)
├── sidebar-brand (logo + título)
│   ├── mat-icon: local_shipping
│   └── span: "Fleet SaaS"
└── sidebar-nav (lista de navegação)
    ├── nav-item simples (Dashboard, Multas, Auditoria)
    └── nav-group (expansion panel)
        ├── panel-header (ícone + label)
        └── panel-body
            ├── child-item (Veículos)
            └── child-item (Motoristas)
```

---

## 2. Cenários BDD

### 2.1 Espaçamento entre itens

```gherkin
Cenário: Itens da navegação têm espaçamento consistente
  Dado que o sidebar está renderizado
  Quando observo os itens de navegação
  Então cada item tem margin horizontal de 8px
  E gap vertical de 2px entre itens
  E padding interno de 8px 12px
  E border-radius de 8px
```

### 2.2 Espaçamento dos expansion panels

```gherkin
Cenário: Grupos expansíveis têm espaçamento alinhado
  Dado que existe um nav-group (ex: "Gestão de Ativos")
  Quando o painel está colapsado
  Então ele tem margin horizontal de 8px
  E height do header é 44px
  E gap de 12px entre ícone e label no header
  E padding do header é 8px 12px
```

### 2.3 Itens filhos dentro do expansion panel

```gherkin
Cenário: Itens filhos têm indentação e espaçamento corretos
  Dado que o nav-group está expandido
  Quando vejo os itens filhos (ex: "Veículos", "Motoristas")
  Então cada filho tem margin horizontal de 8px
  E padding de 6px 12px
  E border-radius de 6px
  E height automático (não estica)
```

### 2.4 Brand area

```gherkin
Cenário: Logo e título têm espaçamento adequado
  Dado que o sidebar renderiza
  Quando observo a area do brand
  Então tem padding de 20px 16px
  E gap de 12px entre ícone e texto
  E border-bottom de 1px solid rgba(255,255,255,0.1)
```

### 2.5 Hover e Active states

```gherkin
Cenário: Hover feedback visual
  Dado que o mouse está sobre um nav-item
  Quando o hover é aplicado
  Então o background muda para rgba(255,255,255,0.1)

Cenário: Active link highlight
  Dado que o usuário está na rota do item
  Quando o item está ativo
  Então o background é rgba(63, 81, 181, 0.3)
  E a cor do texto é white
```

---

## 3. Valores de Espaçamento (Referência)

| Elemento | Margin | Padding | Gap | Height | Border-radius |
|----------|--------|---------|-----|--------|---------------|
| `.sidebar-nav` | — | 8px 0 | 2px | — | — |
| `.nav-item` | 0 8px | 8px 12px | — | auto | 8px |
| `mat-expansion-panel` | 0 8px | 0 | — | — | — |
| `panel-header` | — | 8px 12px | — | 44px | — |
| `panel-title` | 0 | — | 12px | — | — |
| `panel-body` | — | 0 0 4px 0 | — | — | — |
| child `mat-list-item` | 0 8px | 6px 12px | — | auto | 6px |

---

## 4. Decisões de Design

| Decisão | Valor | Rationale |
|---------|-------|-----------|
| Largura sidebar | 260px | Padrão SaaS, cabe em 1366px |
| Background | #1a1a2e | Dark theme, contraste com conteúdo |
| Gap entre itens | 2px | Espaçamento sutil, não compacto demais |
| Margin horizontal | 8px | Alinhado com o padding do brand (16px) |
| Header height | 44px | Tocável em mobile, não muito alto |
| Expansion gap | 12px | Ícone e label com espaço respirável |
| Border-radius | 8px/6px | Arredondado, moderno |

---

## 5. Arquivos Afetados

| Arquivo | Ação |
|---------|------|
| `src/app/shared/layout/sidebar/sidebar.component.ts` | Corrigido (estilos e template) |

---

## 6. Verificação

1. Abrir sidebar no navegador
2. Verificar alinhamento vertical dos itens simples com os headers dos groups
3. Expandir um group e verificar espaçamento dos filhos
4. Navegar para cada rota e verificar active-link
5. Testar hover em todos os itens
6. Verificar que o sidebar faz scroll quando conteúdo excede a viewport
