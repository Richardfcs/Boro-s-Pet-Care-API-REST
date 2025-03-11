Este projeto é um website desenvolvido para veterinários, com o objetivo de fornecer uma plataforma online para gerenciar perfis de usuários e seus pets.  O foco principal é demonstrar a criação de um sistema web funcional com funcionalidades básicas de autenticação, perfil de usuário e gerenciamento de dados simples utilizando tecnologias web modernas.

As principais funcionalidades incluem:

*   **Inscrição e Login de Usuários:**  Permite que veterinários se inscrevam e acessem o sistema com suas credenciais.
*   **Tela de Perfil do Usuário:**  Cada usuário pode visualizar as informações fornecidas durante a inscrição.
*   **Cadastro e Listagem de Pets:** Usuários podem cadastrar informações sobre seus animais de estimação e visualizar uma lista dos pets cadastrados.
*   **Edição de Perfil:**  Permite que os usuários editem suas informações de perfil (nome, email, número de pets, e senha).
*   **Deleção de Conta:**  Opção para o usuário deletar sua conta permanentemente.

**Importante:** Este projeto foi desenvolvido para fins acadêmicos e demonstração de conceitos.  O sistema de autenticação é simplificado e **inseguro para uso em produção**, e o uso de JSON como banco de dados é **não escalável e não recomendado para aplicações reais.**

## Tecnologias Utilizadas

*   **Frontend:**
    *   HTML5
    *   CSS3
    *   Javascript
    *   Bootstrap (Framework CSS)
*   **Backend:**
    *   Node.js
    *   Express.js (para roteamento da API)
*   **Banco de Dados (Para Fins Acadêmicos):**
    *   JSON (arquivos `.json`)
*   **Deploy:**
    *   Netlify (para frontend e backend - Netlify Functions)
*   **Controle de Versão:**
    *   Git
    *   GitHub

## Configuração e Execução Local (Para Desenvolvimento)

Para executar o projeto localmente para fins de desenvolvimento, siga os passos abaixo:

### Pré-requisitos

*   **Node.js** (Certifique-se de ter o Node.js instalado em sua máquina)
*   **npm** (Node Package Manager - instalado com o Node.js)
*   **Git** (para clonar o repositório)

### Passos

1.  **Clone o repositório do GitHub:**

    ```bash
    git clone https://github.com/Richardfcs/Boro-s-Pet-Care-API-REST.git
    cd Boro-s-Pet-Care-API-REST
    ```

2.  **Navegue até a pasta do backend (Netlify Functions):**

    ```bash
    cd Frontend/functions/api
    ```

3.  **Instale as dependências do backend (Node.js):**

    ```bash
    npm install
    ```

4.  **Volte para a pasta raiz do frontend:**

    ```bash
    cd ../../.. # Voltar para a pasta Boro-s-Pet-Care-API-REST/Frontend
    ```

5.  **Abra o arquivo `index.html` (ou a página inicial desejada) no seu navegador.**

    Você pode simplesmente abrir o arquivo `index.html` diretamente no seu navegador para visualizar o frontend.  **Note que a API backend (Netlify Functions) não será executada localmente desta forma.** Para testar a integração completa com o backend (emulação local de Netlify Functions), você precisaria usar a CLI do Netlify (`netlify dev`) ou configurar um servidor Node.js localmente para o backend (o que não é o foco deste README para deploy no Netlify).

## Deploy no Netlify

Este projeto foi configurado para ser facilmente deployado no Netlify.  Para fazer o deploy, siga os passos descritos na [documentação do Netlify](https://docs.netlify.com/get-started/):

1.  Crie uma conta no [Netlify](https://www.netlify.com/).
2.  Instale o Netlify CLI (opcional, mas recomendado): `npm install -g netlify-cli`
3.  Faça login no Netlify CLI: `netlify login`
4.  Execute o deploy a partir da raiz do seu repositório: `netlify deploy --prod` (ou use deploy contínuo via GitHub).

Certifique-se de configurar as **Build settings** no Netlify conforme as instruções fornecidas anteriormente (Publish directory: `Frontend`, Functions directory: `functions`, Build command: vazio).

## Considerações e Limitações Importantes

*   **Banco de Dados JSON (Não para Produção):**  O uso de arquivos JSON como "banco de dados" é **apenas para fins didáticos e de demonstração.**  Não é adequado para aplicações reais devido a problemas de escalabilidade, concorrência, segurança e persistência de dados em ambientes serverless como Netlify Functions. Para um sistema real, utilize um banco de dados adequado (ex: PostgreSQL, MySQL, MongoDB, FaunaDB, etc.).
*   **Segurança da Autenticação (Simplificada e Insegura):** O sistema de autenticação implementado neste projeto é **muito simplificado e INSEGURO (Opção 1).**  Não utilize este sistema de autenticação em aplicações reais. Para sistemas de produção, implemente autenticação robusta e segura (ex: JWT, OAuth 2.0, hashing de senhas com bcrypt, etc.).
*   **Escalabilidade Limitada:**  Devido ao uso de JSON como "banco de dados" e à natureza serverless das Netlify Functions (que podem ter limitações de tempo de execução e recursos no plano gratuito), este projeto **não é escalável para um grande número de usuários ou grande volume de dados.**

## Próximos Passos (Melhorias Possíveis)

*   **Implementar um banco de dados real:** Substituir o JSON por um banco de dados adequado (ex: FaunaDB, MongoDB Atlas, PostgreSQL) para persistência e escalabilidade dos dados.
*   **Melhorar a segurança da autenticação:** Implementar um sistema de autenticação mais robusto e seguro, como JWT ou OAuth 2.0, e utilizar hashing de senhas com bcrypt no backend.
*   **Adicionar validação de dados no backend:** Implementar validação dos dados de entrada no backend para garantir a integridade dos dados e a segurança da aplicação.
*   **Implementar testes automatizados:** Adicionar testes unitários e de integração para garantir a qualidade e a estabilidade do código.
*   **Melhorar a interface do usuário (UX/UI):** Refinar o design da interface do usuário para uma melhor experiência do usuário.
*   **Adicionar mais funcionalidades veterinárias:** Expandir o sistema com funcionalidades mais específicas para veterinários, como agendamento de consultas, prontuários eletrônicos de animais, etc.

