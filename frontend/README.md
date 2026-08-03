# Loja Online — Frontend

Frontend completo de um sistema de gestao de loja online: vitrine publica para
clientes e painel administrativo protegido por login, integrado a um backend
Spring Boot.

## Tecnologias usadas

- React 19 + TypeScript
- Vite 6 (bundler)
- React Router DOM v7 (navegacao)
- Tailwind CSS v4 (estilizacao)
- GSAP + ScrollTrigger (animacoes)
- React Hook Form + Zod (formularios e validacao)
- Axios (requisicoes HTTP)
- Lucide React (icones)

## Como rodar o projeto

### 1. Pre-requisitos

- Node.js 18 ou superior instalado
- O backend Spring Boot rodando em `http://localhost:8080`

### 2. Instalar as dependencias

```bash
npm install
```

### 3. Configurar o endereco da API

O arquivo `.env` ja vem pronto apontando para o backend local:

```
VITE_API_URL=http://localhost:8080/api
```

Se o backend estiver em outro endereco (por exemplo, em producao), troque essa
linha pela URL correta.

### 4. Rodar em modo de desenvolvimento

```bash
npm run dev
```

O site abre em `http://localhost:5173`.

### 5. Gerar a versao de producao

```bash
npm run build
```

Os arquivos prontos para publicar ficam na pasta `dist/`.

## Login do painel administrativo

O login nao usa um usuario fixo no codigo — ele testa as credenciais
digitadas diretamente contra o backend (Basic Auth). Use as credenciais
configuradas no backend, por exemplo:

- **Usuario:** `admin`
- **Senha:** `admin123`

## Estrutura de pastas

```
src/
├── api/            # Configuracao do Axios (conexao com o backend)
├── components/
│   ├── common/     # Header, Footer, Card de produto, Modal, Loading...
│   ├── admin/      # Tudo do painel administrativo (listas, formularios)
│   └── public/     # Grid de produtos da vitrine
├── context/        # Contexto de autenticacao (quem esta logado)
├── hooks/          # Funcoes que buscam dados da API (produtos, pedidos...)
├── pages/          # As paginas do site (Home, Login, Admin, etc.)
├── types/          # Formatos (interfaces) dos dados
└── utils/          # Formatadores, validacoes (Zod) e animacoes (GSAP)
```

## Funcionalidades

**Area publica**
- Vitrine com busca, filtro por categoria e por faixa de preco
- Pagina de detalhe do produto (com leitura em voz alta do conteudo)

**Area administrativa** (login obrigatorio)
- Dashboard com resumo (produtos, clientes, pedidos, faturamento)
- CRUD completo de Produtos, Categorias e Clientes
- Gestao de Pedidos: criacao, visualizacao detalhada e alteracao de status
  (Pendente -> Pago -> Enviado / Cancelado)

## Acessibilidade

- Integracao com o VLibras (traducao em Libras)
- Leitura em voz alta (Web Speech API) na pagina de detalhe do produto
- Navegacao por teclado (Tab / Enter / Esc) e foco visivel em todos os
  elementos interativos
- Atributos ARIA em botoes, campos de formulario e modais
- Suporte a preferencia de "menos animacoes" do sistema operacional

## Deploy

- **Frontend:** Netlify ou Vercel — comando de build: `npm run build`,
  pasta de saida: `dist`
- **Backend:** deve estar publicado e acessivel publicamente; lembre-se de
  atualizar `VITE_API_URL` no `.env` (ou nas variaveis de ambiente da
  plataforma de deploy) para a URL real do backend em producao
