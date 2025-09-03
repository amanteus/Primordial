// ==========================================================
// --- SCRIPT PARA A PÁGINA UPSELL 2: "O ORÁCULO" ---
// ==========================================================

function initUpsell2Page() {
    // --- Seleção de Elementos ---
    const chatWindow = document.getElementById('oracle-chat-window');
    const messagesContainer = document.getElementById('oracle-messages');

    // Guarda de segurança: só executa se os elementos da página existirem.
    if (!chatWindow || !messagesContainer) {
        return;
    }

    // --- Roteiro da Simulação Socrática ---
    const chatScript = [
        {
            sender: 'user',
            text: 'Vou encontrar uma mulher que me intimida hoje à noite. O que eu digo?',
            delay: 1500
        },
        {
            sender: 'oracle',
            text: '// INICIANDO PROTOCOLO SOCRÁTICO...',
            delay: 2000
        },
        {
            sender: 'oracle',
            text: 'Analisando... Sua pergunta assume que o "o quê" é mais importante que o "quem". Por que você acredita que precisa de um roteiro para validar sua presença?',
            delay: 4000
        },
        {
            sender: 'user',
            text: '...porque tenho medo do silêncio ou de dizer a coisa errada.',
            delay: 3500
        },
        {
            sender: 'oracle',
            text: 'Correto. A fissura na sua estratégia não é a falta de palavras, é o medo da sua própria autenticidade. Seu objetivo hoje não é "dizer a coisa certa". É calibrar sua presença para que seu silêncio seja mais poderoso que as palavras de outros homens.',
            delay: 5000
        },
        {
            sender: 'oracle',
            text: 'Protocolo sugerido: Foco em Contato Visual e Dominância de Frame. Iniciar?',
            delay: 3000
        }
    ];

    // --- Funções do Motor de Animação ---
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function typeText(element, text) {
        element.innerHTML = '';
        for (let char of text) {
            element.innerHTML += char;
            await wait(40); // Velocidade da digitação
        }
    }

    async function startChatAnimation() {
        messagesContainer.innerHTML = ''; // Limpa o chat antes de começar
        await wait(1000); // Pausa inicial

        for (const msg of chatScript) {
            await wait(msg.delay);

            const messageEl = document.createElement('div');
            messageEl.className = `oracle-message ${msg.sender}`;

            const senderEl = document.createElement('span');
            senderEl.className = 'sender';
            senderEl.textContent = msg.sender === 'user' ? 'Você:' : 'Oráculo IA:';
            
            const textEl = document.createElement('div');
            textEl.className = 'text';

            messageEl.appendChild(senderEl);
            messageEl.appendChild(textEl);
            messagesContainer.appendChild(messageEl);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            if (msg.sender === 'oracle') {
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.textContent = '_';
                textEl.appendChild(cursor);
                await wait(1000); // Simula "pensamento"
                await typeText(textEl, msg.text);
            } else {
                textEl.textContent = msg.text;
            }
        }
    }

    // --- Gatilho da Animação ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startChatAnimation();
                observer.unobserve(entry.target); // Roda a animação apenas uma vez
            }
        });
    }, { threshold: 0.6 }); // Dispara quando 60% do chat estiver visível

    observer.observe(chatWindow);
}
