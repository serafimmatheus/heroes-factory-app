# Heroes Factory App

Este é o frontend da aplicação **Heroes Factory**, construído com **Next.js (App Router), React, TypeScript, TailwindCSS e componentes Shadcn UI**. O objetivo do projeto é oferecer uma interface moderna e acessível para o gerenciamento de heróis.

## 🚀 Tecnologias Utilizadas

- **Next.js (App Router)** (Framework React)
- **React 19**
- **TypeScript** (Tipagem estática)
- **TailwindCSS** (Estilização via utilitários)
- **Shadcn UI & Radix UI** (Componentes de UI acessíveis e headless)
- **React Hook Form + Zod** (Gerenciamento e validação de formulários)
- **Vitest & React Testing Library** (Testes unitários no front-end)

## 🏗️ O que fizemos e por que fizemos assim

O projeto foi criado visando uma excelente Experiência do Usuário (UX) e Experiência do Desenvolvedor (DX):

- **Next.js App Router e Server Actions**: Escolhemos a estrutura mais recente do Next.js. Os Server Actions permitem integrar as mutations (criação, atualização, remoção) diretamente nos arquivos do lado do servidor e usar a revalidação de caminhos (`revalidatePath`) para atualizar a UI instantaneamente de forma declarativa.
- **Componentes Acessíveis (Shadcn UI)**: Não reinventamos a roda e utilizamos componentes pré-construídos que seguem todos os padrões WAI-ARIA (Radix UI), garantindo que a aplicação possa ser navegada por teclado e screen readers, mantendo um design muito atraente.
- **Loading States (Skeletons) & Suspense**: O Next.js preza por uma UI robusta no lado do cliente. Adicionamos o React `<Suspense>` junto com `Skeleton` components para que o usuário sinta a fluidez do carregamento inicial antes de os dados (heróis) chegarem da API, evitando renderizações "em branco".
- **Formulários Fortemente Tipados**: O uso de `react-hook-form` acoplado ao `zod` e ao resolver `zodResolver` garante a checagem no client side do tipo correto, mantendo a consistência dos dados de envio e reduzindo erros na comunicação com a API.
- **Paginação e Busca via Search Params**: Toda a busca e paginação é tratada pela URL da aplicação (ex: `?page=2&search=Batman`). Isso foi feito para que a aplicação seja completamente "partilhável" e obedeça ao histórico do navegador.

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Node.js (v20+)
- pnpm

### Instalação e Execução

1. Instale as dependências:
   ```bash
   pnpm install
   ```

2. Crie um arquivo `.env` (ou `.env.local`) configurando a URL da API, se necessário. O padrão assume que a API rode em `http://localhost:3333`. (O código usa esta porta em server actions).

3. Rode o ambiente de desenvolvimento:
   ```bash
   pnpm dev
   ```

4. Acesse em seu navegador: [http://localhost:3000](http://localhost:3000)

### Rodando os Testes

Para executar os testes com Vitest:
```bash
pnpm test
```

## 🔮 Pontos de Melhoria Futura

1. **Testes E2E**: Implementar testes End-to-End com **Playwright** ou **Cypress** para cobrir fluxos críticos do usuário, do login até a criação e edição de heróis.
2. **Atualizações Otimistas (Optimistic UI)**: Usar `useOptimistic` (hook nativo do React) ao excluir ou desativar heróis para fazer a interface ser instântanea antes mesmo do servidor responder.
3. **Suporte a Dark Mode**: Aproveitar o poder do Tailwind para inserir toggle de modo claro/escuro.
4. **Tratamento de Erros de API**: Expandir a utilização de `error.tsx` globais e usar `Toast` components de forma global nos Server Actions em casos onde o backend ficar indisponível.
5. **Responsividade Avançada**: Embora construída com classes flex, refinar elementos menores na interface para uma experiência mobile aprimorada.
