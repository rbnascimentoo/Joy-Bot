// Seleciona os elementos do DOM
const form = document.getElementById('input-form');
const input = document.getElementById('chat-input');
const chat = document.getElementById('chat');

// Função para rolar o chat para o final
function scrollToBottom() {
    chat.scrollTop = chat.scrollHeight;
}

// Função para adicionar uma mensagem ao chat
function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender); // 'user' ou 'bot'

    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.textContent = text;

    messageElement.appendChild(textElement);
    chat.appendChild(messageElement);

    scrollToBottom();
}

// Lida com o envio do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const userMessage = input.value.trim();

    if (userMessage) {
        // Adiciona a mensagem do usuário à interface
        addMessage('user', userMessage);

        // Limpa o campo de texto
        input.value = '';
        input.style.height = 'auto'; // Reseta a altura do textarea

        // Simula a resposta do bot após um pequeno atraso
        setTimeout(() => {
            // Resposta padrão (aqui integrara a IA)
            const botResponse = "Obrigado por perguntar! No momento, estou aprendendo. Em breve, poderei dar dicas sobre " + userMessage.split(' ').pop() + ".";
            addMessage('bot', botResponse);
        }, 1200); // Atraso de 1.2 segundos
    }
});

// Faz o textarea crescer dinamicamente
input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = (input.scrollHeight) + 'px';
});

// Adiciona uma mensagem de boas-vindas do bot ao carregar
window.addEventListener('load', () => {
    setTimeout(() => {
        addMessage('bot', 'Olá! 👋 Sou o Joy-Bot. Sobre qual jogo você gostaria de dicas hoje?');
    }, 1000); // Atraso para aparecer depois da animação inicial
});

// Desabilita o clique com o botão direito do mouse
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

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