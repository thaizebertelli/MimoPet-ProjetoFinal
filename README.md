# MimoPet Web — Projeto Final

Aplicação web desenvolvida em **React** e **Vite** para simulação de uma experiência completa de e-commerce pet: desde a navegação no catálogo, busca e filtragem de produtos, até o fluxo completo de checkout (carrinho, formulário de pagamento com validação e telas de conclusão).

O sistema permite ao usuário navegar pelo catálogo, visualizar detalhes de produtos, gerenciar os itens na sacola via estado global (Context API), preencher dados de pagamento em tempo real com máscaras e validações, e receber o resultado do processamento (aprovação ou detecção de fraude), além de contar com uma página customizada para rotas inexistentes (Erro 404).

---

## Link do Projeto Online (GitHub Pages)

**[Acessar a Aplicação MimoPet](https://thaizebertelli.github.io/MimoPet-ProjetoFinal/)**

---

## Objetivo

O projeto foi desenvolvido como **Projeto Final** do Módulo de Front-end / React do curso SCTEC.  
O objetivo foi construir uma SPA (Single Page Application) totalmente responsiva, modularizada e acessível, aplicando conceitos avançados de gerenciamento de estado global com **Context API**, validação de formulários com **Zod** e **React Hook Form**, simulação assíncrona, roteamento dinâmico com **React Router Dom** e deploy automatizado.

---

## Funcionalidades

- **Catálogo & Pesquisa de Produtos**:
  - Busca de produtos em tempo real por nome.
  - Filtragem dinâmica de produtos por categorias (Cães, Gatos, Acessórios, Alimentos, etc.).
  - Visualização de detalhes em página dedicada para cada produto.
- **Gerenciamento de Estado Global (Carrinho)**:
  - Contexto global (`CarrinhoContext`) para persistência e compartilhamento do estado da sacola de compras entre todas as telas.
  - Adição, alteração de quantidade e remoção de itens com atualização automática dos totais e do badge numérico no header.
- **Página de Erro 404 e de produtos inexistentes**:
  - Layout integrado via CSS Modules para rotas não encontradas ou produtos inexistentes.
- **Header Dinâmico**:
  - Indicador visual de etapas do checkout e contador responsivo de itens no carrinho.
- **Formulário de Pagamento com Máscaras e Filtros**:
  - Máscara para número de cartão (limitação de 16 dígitos com separação a cada 4 números).
  - Filtro para data de validade (`MM/AA`) com formatação automática da barra `/`.
  - Limitação do CVV para 3 dígitos numéricos.
  - Validação de nome do titular apenas com letras e até 50 caracteres.
- **Detecção de Fraude (Regra de Negócio)**:
  - Identificação automática de cartões com 16 dígitos idênticos (ex: `1111 1111 1111 1111`), direcionando para a tela de erro/tentativa de golpe.
- **Simulação Assíncrona de Compra**:
  - Custom Hook (`usePagamento`) com estado de carregamento e spinner visual antes da finalização.
- **Telas de Conclusão**:
  - Telas de "Compra Aprovada" e "Tentativa de Golpe" com redirecionamento correto e opção de retorno à loja.
- **Interface Responsiva (Mobile-First)**:
  - Design totalmente adaptável para smartphones, tablets e desktops.

---

## Tecnologias Utilizadas

- **React 18** (Vite)
- **React Router Dom** (Roteamento SPA com `basename` dinâmico)
- **Context API** (Gerenciamento global de estado do carrinho)
- **React Hook Form** (Gerenciamento simplificado de formulários)
- **Zod** & **@hookform/resolvers** (Validação de esquemas e regras de negócio)
- **CSS3 / CSS Modules** (Variáveis globais, Flexbox, CSS Grid e escopo modular)
- **SVGs Nativos** (Ícones e ilustrações vetoriais otimizadas)
- **gh-pages** (Deploy e hospedagem automatizada no GitHub Pages)

---

## Conceitos Aplicados

- Componentização avançada e reuso de componentes UI
- Arquitetura de estado global com React Context (`CarrinhoContext`)
- Hooks nativos (`useState`, `useEffect`, `useContext`) e Custom Hooks (`usePagamento`)
- Roteamento SPA declarativo com manipulação de parâmetros de URL (`useParams`) e rotas curinga (`*`)
- Validação estrita de formulários com Zod (`regex`, `transform`, `refine`)
- Estilização modular via CSS Modules para evitar conflito de seletores
- Compatibilidade de rotas em subpastas no GitHub Pages (`import.meta.env.BASE_URL`)
- Padrão de versionamento com Gitflow (`feature/*`, `develop`, `main`)
- HTML Semântico e Acessibilidade (atributos `aria-label`, contraste e suporte a leitores de tela)

---

## Estrutura do Projeto

```text
mimopet/
│
├── src/
│   ├── assets/
│   │   ├── img/
│   │   └── styles/
│   │       ├──Catalogo.module.css
│   │       ├──DetalhesProduto.css
│   │       ├──Footer.css
│   │       ├──Header.css
│   │       ├──ProdutoCard.module.css
│   │       ├── index.css
│   │       └── ProdutoNaoEncontrado.module.css
│   │
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ItemCarrinho.jsx
│   │   ├── ResumoCompra.jsx
│   │   └── ProdutoCard.jsx
│   │
│   ├── context/
│   │   └── CarrinhoContext.jsx
│   │
│   ├── hooks/
│   │   └── usePagamento.js
│   │
│   ├── pages/
│   │   ├── Catalogo.jsx
│   │   ├── DetalhesProduto.jsx
│   │   ├── Carrinho.jsx
│   │   ├── Pagamento.jsx
│   │   ├── Sucesso.jsx
│   │   ├── Falha.jsx
│   │   ├── ProdutoNaoEncontrado.jsx
│   │   └── Erro404.jsx
│   │
│   ├── Services/
│   │   └── api.js
│   │
│   ├── utils/
│   │   ├── carrinhoUtils.js
│   │   ├── formatador.js
│   │   └── pagamento.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── db.json
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/thaizebertelli/MimoPet-ProjetoFinal.git](https://github.com/thaizebertelli/MimoPet-ProjetoFinal.git)

   1. Acesse a pasta da aplicação:
   cd MimoPet/mimopet

   2.Instale as dependências:
   npm install

   3.Inicie o servidor de API
   npx json-server --watch db.json --port 3001

   4.Inicie o servidor de desenvolvimento:
   npm run dev

   3.Abra a URL informada no terminal (ex: http://localhost:5173) no navegador.

---

## Funcionamento da Aplicação

1.Catálogo & Catálogo Interativo:

Ao acessar a página inicial, o usuário visualiza o catálogo completo de produtos consumido da API (json-server), podendo filtrar os itens por categorias ou utilizar a barra de busca em tempo real.

Clicar em um produto direciona o usuário para a página de detalhes, exibindo informações completas.

2.Gerenciamento do Carrinho:

O usuário pode adicionar produtos à sacola. O estado é gerenciado de forma global via CarrinhoContext.

Na página do carrinho, é possível alterar as quantidades de cada item, remover produtos e visualizar a atualização dinâmica do valor total do pedido.

3.Fluxo de Checkout e Pagamento:

Ao clicar em "Continuar para pagamento", o usuário é direcionado para a tela de Pagamento.

Os campos do formulário preenchem e formatam os dados do cartão de crédito automaticamente em tempo real (número com separação a cada 4 dígitos, validade MM/AA, CVV e nome do titular).

4.Validação e Regras de Negócio com Zod:

O formulário valida estritamente os campos utilizando Zod e React Hook Form.

Regra anti-fraude: Se forem informados 16 dígitos idênticos (ex: 1111 1111 1111 1111), o sistema identifica a transação como tentativa de golpe. Cartões válidos com 16 dígitos diferentes aprovam a transação.

5.rocessamento e Conclusão:

Ao submeter o pagamento, o sistema exibe um estado visual de carregamento (spinner) simulando a requisição assíncrona.

O usuário é redirecionado para a tela de Sucesso ("Compra Aprovada!") ou Falha ("Tentativa de Golpe"), com opções para retornar à loja e reiniciar a navegação.

## Organização Kanban

O projeto foi organizado utilizando a metodologia Kanban através do Trello.

As tarefas foram separadas nas colunas:

-Backlog
-A fazer
-Em andamento
-Concluído
Link do quadro Kaban: https://trello.com/b/AVSLpmDc/mimopet-projeto-final

## Controle de Versão

O repositório foi organizado utilizando Git e GitHub, seguindo a estratégia de branches:

main: Versão final e estável do projeto.

develop: Branch de integração das funcionalidades.

feature/*: Branches dedicadas para telas e refinamentos específicos (ex: feature/tela-carrinho, feature/tela-pagamento, feature/telas-resultado).

## Vídeo de Apresentação

O vídeo de demonstração do projeto pode ser acessado pelo link abaixo:

Assistir vídeo de apresentação (Em breve)

## Desenvolvido por

Thaize de Paula Bertelli

Projeto Final — Desenvolvimento Front-End / React

Outubro • 2026