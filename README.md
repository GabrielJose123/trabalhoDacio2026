# 🚛 CARGOO — Nenhum caminhão roda vazio

Landing page do **CARGOO**, um aplicativo que conecta **caminhoneiros autônomos** a **cargas de retorno**, e permite que **empresas** publiquem fretes e encontrem motoristas que já estão voltando vazios para a região delas — reduzindo o custo logístico de todos.

> Projeto da disciplina de **Programação Front-End** (Engenharia de Software).

## 🌐 Acesso

Hospede com GitHub Pages: `Settings → Pages → Branch: main → / (root)`.
A página ficará disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## 🧱 Tecnologias e decisões

| Tecnologia | Uso no projeto |
|---|---|
| **HTML5 semântico** | `header`, `nav`, `main`, `section`, `article`, `footer`, formulários com `label` e validação |
| **CSS3** | Variáveis CSS (`:root`), Flexbox, **CSS Grid**, media queries (responsivo), animações `@keyframes`, `prefers-reduced-motion` |
| **JavaScript (vanilla)** | Manipulação de DOM, eventos, `IntersectionObserver`, `requestAnimationFrame` |
| **Google Fonts** | Saira Condensed (títulos) + Archivo (texto) |

### Funcionalidades em JavaScript
1. **Menu mobile** com toggle e `aria-expanded` (acessibilidade);
2. **Contadores animados** que disparam quando a seção entra na tela;
3. **Simulador de frete de retorno**: sliders de distância e custo/km calculam em tempo real o prejuízo de rodar vazio vs. o ganho com um frete pelo CARGOO;
4. **Formulário de lista de espera** com validação e feedback sem recarregar a página;
5. **Animação de revelar ao rolar** as seções.

### Decisões de layout e identidade
- **Paleta inspirada na estrada brasileira**: asfalto (escuro), laranja de sinalização (lado do motorista), verde de placa rodoviária (lado da empresa) e amarelo de faixa central.
- **Elemento assinatura**: a faixa amarela tracejada animada que separa o hero do conteúdo, remetendo à pista.
- **Estrutura em dois lados** (motorista × empresa) refletindo os dois públicos do app.
- Layout **responsivo** (desktop → mobile) e respeito a `prefers-reduced-motion`.

## 📁 Estrutura

```
cargoo/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

## ▶️ Rodando localmente

Basta abrir o `index.html` no navegador — não há dependências nem build.
