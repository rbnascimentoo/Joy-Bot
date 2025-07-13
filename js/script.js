// Seleciona os elementos do DOM
const form = document.getElementById('input-form');
const input = document.getElementById('chat-input');
const chat = document.getElementById('chat');
const aiProviderSelect = document.getElementById('ai-provider');

// --- Gerenciamento do Histórico ---
let chatHistory = [];

function saveHistory() {
    // Salva o array do histórico no localStorage como uma string JSON
    localStorage.setItem('joy-bot-history', JSON.stringify(chatHistory));
}

function loadHistory() {
    const savedHistory = localStorage.getItem('joy-bot-history');
    if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
        // Limpa o chat antes de carregar o histórico para evitar duplicatas
        chat.innerHTML = '';
        chatHistory.forEach(message => {
            // O terceiro parâmetro 'false' impede que a mensagem seja salva novamente no histórico
            addMessage(message.sender, message.text, false);
        });
        return true; // Indica que o histórico foi carregado
    }
    return false; // Nenhum histórico encontrado
}

// Converte texto Markdown para HTML simples
const markdownToHtml = (text) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
}

// Função para rolar o chat para o final
function scrollToBottom() {
    chat.scrollTop = chat.scrollHeight;
}

// Função para adicionar uma mensagem ao chat
function addMessage(sender, text, save = true) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender); // 'user' ou 'bot'

    const textElement = document.createElement('div');
    textElement.classList.add('text');

    if (sender === 'bot') {
        // Para o bot, converte Markdown para HTML. É seguro pois o conteúdo vem do servidor.
        textElement.innerHTML = markdownToHtml(text);
    } else {
        // Para o usuário, usa textContent para evitar injeção de HTML (XSS).
        textElement.textContent = text;
    }

    messageElement.appendChild(textElement);
    chat.appendChild(messageElement);

    scrollToBottom();

    // Salva a mensagem no histórico se 'save' for true (o padrão)
    if (save) {
        chatHistory.push({ sender, text });
        saveHistory();
    }
}
// --- Indicador de "digitando..." ---
const typingIndicator = document.createElement('div');
typingIndicator.classList.add('message', 'bot', 'typing-indicator');
typingIndicator.innerHTML = `
    <div class="text">
        <span></span>
        <span></span>
        <span></span>
    </div>
`;

function showTypingIndicator() {
    chat.appendChild(typingIndicator);
    scrollToBottom();
}

function hideTypingIndicator() {
    if (chat.contains(typingIndicator)) {
        chat.removeChild(typingIndicator);
    }
}

// Lida com o envio do formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const userMessage = input.value.trim();
    const selectedProvider = aiProviderSelect.value;

    if (userMessage) {
        // Adiciona a mensagem do usuário à interface
        addMessage('user', userMessage);

        input.value = '';
        input.style.height = 'auto'; // Reseta a altura do textarea

        // Mostra o indicador de "digitando..."
        showTypingIndicator();

        try {
            // Chama API segura no back-end
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: userMessage,
                    provider: selectedProvider // Envia o provedor selecionado
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            addMessage('bot', data.reply);
        } catch (error) {
            console.error("Erro ao contatar a API:", error);
            addMessage('bot', `Ops! Algo deu errado, tente novamente mais tarde.`);
        } finally {
            hideTypingIndicator();
        }
    }
});

// Faz o textarea crescer dinamicamente
input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = (input.scrollHeight) + 'px';
});

// Adiciona uma mensagem de boas-vindas do bot ao carregar
window.addEventListener('load', () => {
    if (!loadHistory()) {
        setTimeout(() => {
            addMessage('bot', 'Olá! 👋 Sou o Joy-Bot. Sobre qual jogo você gostaria de dicas hoje?');
        }, 1000); // Atraso para aparecer depois da animação inicial
    }
});

// Desabilita o clique com o botão direito do mouse
// document.addEventListener('contextmenu', function(event) {
//     event.preventDefault();
// });

// Desabilita atalhos de teclado comuns para abrir as ferramentas de desenvolvedor
document.addEventListener('keydown', function(event) {
    // F12
    if (event.keyCode === 123) {
        event.preventDefault();
    }
    // Ctrl+Shift+I
    if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
        event.preventDefault();
    }
    // Ctrl+Shift+J
    if (event.ctrlKey && event.shiftKey && event.keyCode === 74) {
        event.preventDefault();
    }
    // Ctrl+U
    if (event.ctrlKey && event.keyCode === 85) {
        event.preventDefault();
    }
});

// Desabilita o arrastar e soltar de imagens
document.addEventListener('dragover', function(event) {
    event.preventDefault();
});
document.addEventListener('drop', function(event) {
    event.preventDefault();
});