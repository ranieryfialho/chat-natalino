let userName = '';

// Recupera mensagens salvas
function loadMessages() {
    const chatContainer = document.getElementById('chat-container');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    chatContainer.innerHTML = ''; // Limpa o chat
    messages.forEach(msg => addMessageToDOM(msg));
}

// Adiciona uma mensagem ao DOM
function addMessageToDOM({ name, text }) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `<span>${name}:</span> ${text}`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Rola para a última mensagem
}

// Envia uma mensagem
function sendMessage() {
    const input = document.getElementById('message');
    const message = input.value.trim();

    if (message) {
        const chatMessage = { name: userName, text: message };

        // Salva mensagem no localStorage
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(chatMessage);
        localStorage.setItem('messages', JSON.stringify(messages));

        // Adiciona ao DOM e limpa o input
        addMessageToDOM(chatMessage);
        input.value = '';
    }
}

// Solicita o nome do usuário
function askUserName() {
    userName = prompt('Digite seu nome:') || 'Anônimo';
    localStorage.setItem('userName', userName);
}

// Reinicia o chat
function resetChat() {
    if (confirm('Tem certeza de que deseja reiniciar o chat? Todas as mensagens serão apagadas.')) {
        localStorage.clear(); // Limpa todo o armazenamento local
        userName = ''; // Reseta o nome do usuário
        location.reload(); // Recarrega a página
    }
}

// Configura o envio de mensagens com Enter
function setupEnterKey() {
    const input = document.getElementById('message');
    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') { // Detecta a tecla Enter
            sendMessage();
            event.preventDefault(); // Evita comportamento padrão (submissão de formulário, se aplicável)
        }
    });
}

// Carrega o nome do usuário e mensagens ao abrir a página
window.onload = function () {
    userName = localStorage.getItem('userName') || '';
    if (!userName) {
        askUserName();
    }
    loadMessages();
    setupEnterKey(); // Configura o envio com Enter
};