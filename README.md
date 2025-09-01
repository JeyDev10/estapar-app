# **Next.js Project**

Este projeto é uma aplicação [Next.js](https://nextjs.org) inicializada com [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## **🚀 Como Começar**

Para rodar o servidor de desenvolvimento, execute um dos seguintes comandos no terminal:

npm run dev  
\# ou  
yarn dev  
\# ou  
pnpm dev  
\# ou  
bun dev

Abra [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) no seu navegador para ver o resultado.
Projeto rodando em produção utilizando a Vercel  [Link](https://estapar-app-one.vercel.app)

## **💻 Stack da Aplicação**

* **Next.js**: Utilizado para aproveitar recursos como autenticação, middleware e renderização híbrida.  
* **Next-auth**: Uma excelente ferramenta para autenticação, simplificando o gerenciamento de sessões e segurança.  
* **Zod & React Hook Form**: Juntas, oferecem uma maneira simples e direta de validar e gerenciar campos de formulários.  
* **Tailwind CSS**: Escolhido para a estilização, devido ao seu *bundle* leve e facilidade de personalizar componentes.  
* **Shadcn UI**: Componentes de UI nativos e totalmente personalizáveis, facilitando a adesão ao *design system* e a escalabilidade.  
* **Cypress**: Utilizado para criar testes *end-to-end*, garantindo que a aplicação funcione como esperado e validando rapidamente as regras de negócio sem comprometer o prazo.

## **🏛️ Arquitetura do Projeto**

A arquitetura do projeto segue os padrões de roteamento do Next.js, mas com uma estrutura adicional para organização:

* **src/app**: A pasta principal que contém as páginas e layouts.  
* **src/components/ui**: Componentes de UI sem regras de negócio.  
* **src/domain**: Contém interfaces e constantes relacionadas às regras de negócio.  
* **src/hooks**: Hooks customizados, comuns ao projeto.  
* **src/lib**:  
  * **actions**: Requisições executadas no lado do servidor.  
  * **utils**: Funções de uso rotineiro.  
* **src/services**: Camada com toda a lógica de negócio e implementações para requisições.  
* **src/features**: A parte mais complexa, onde a lógica do sistema é implementada com base nas regras de domínio.