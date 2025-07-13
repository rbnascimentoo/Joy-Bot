# 🤖 Joy-Bot

Bem-vindo ao Joy-Bot, seu assistente pessoal de IA para o universo dos games! Este projeto é uma interface de chat desenvolvida para ajudar jogadores de todos os níveis com dicas, truques, estratégias e informações sobre qualquer jogo.

## ✨ Funcionalidades

-   **Interface de Chat Clean e Moderna**: Um layout com tema escuro, focado na usabilidade e agradável para longas sessões de consulta.
-   **Interação Dinâmica com IA**: Envie suas perguntas e receba respostas reais de um modelo de linguagem.
-   **Seleção de Provedor**: Permite escolher dinamicamente entre diferentes provedores de IA (Google Gemini ou OpenAI).
-   **Animações Suaves**: Efeitos de entrada na tela e para novas mensagens, criando uma experiência mais fluida.
-   **Foco em Acessibilidade**: Estrutura semântica e elementos de interface claros para todos os usuários.

## 🛠️ Tecnologias Utilizadas

-   **HTML5**: Para a estrutura semântica e o conteúdo da página.
-   **CSS3**: Para a estilização, layout (Flexbox/Grid), animações e design da interface.
-   **JavaScript (Vanilla)**: Para a interatividade, manipulação do DOM e lógica do chat.
-   **Node.js (Serverless Function)**: Para criar um back-end seguro que protege as chaves de API e se comunica com os provedores de IA.

## ⚙️ Configuração e Execução

Para executar este projeto localmente, você precisará de uma plataforma que suporte funções serverless, como a CLI da Vercel.

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-repositorio>
    ```

2.  **Crie o arquivo de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e adicione suas chaves de API:
    ```
    # Chave da API do Google AI Studio
    GEMINI_API_KEY="sua-chave-aqui"

    # Chave da API da OpenAI
    OPENAI_API_KEY="sua-chave-aqui"
    ```

3.  **Execute o projeto com a CLI da Vercel:**
    ```bash
    vercel dev
    ```
    Isso iniciará um servidor de desenvolvimento local que executa o front-end e a função de API.

## 🔮 Próximos Passos

-   [ ] Adicionar efeito de *streaming* na resposta do bot.