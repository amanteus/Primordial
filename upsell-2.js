// ==========================================================
// --- SCRIPT CORRIGIDO PARA UPSELL 2: "O ORÁCULO" ---
// ==========================================================
function initUpsell2Page() {
    // --- GUARDA DE SEGURANÇA ---
    const pageIdentifier = document.getElementById('oracle-section');
    if (!pageIdentifier) return;

    // --- MÓDULO 1: ANIMAÇÕES DE SCROLL COM GSAP (VERSÃO CORRIGIDA) ---
    function startScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Animação do fundo dinâmico
        const dynamicBg = document.querySelector('.dynamic-background');
        if (dynamicBg) {
            gsap.to(dynamicBg, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5
                },
                opacity: 0.2,
                scale: 1.5,
                rotate: 45
            });
        }

        // Animação de revelação de texto para headlines
        const textReveals = document.querySelectorAll('[data-animation="text-reveal"]');
        textReveals.forEach(textEl => {
            
            // ===== CORREÇÃO 1: Animação por PALAVRAS em vez de letras =====
            // Isso previne a quebra de linha e o scroll horizontal.
            const words = textEl.textContent.split(' ').map(word => `<span class="word-wrapper"><span class="word">${word}</span></span>`).join(' ');
            textEl.innerHTML = words;

            gsap.from(textEl.querySelectorAll('.word'), {
                scrollTrigger: {
                    trigger: textEl,
                    start: "top 85%", // Gatilho um pouco mais cedo para melhor visualização
                    toggleActions: "play none none none"
                },
                opacity: 0,
                yPercent: 100,
                ease: "back.out(1.7)",
                stagger: 0.05, // Anima palavra por palavra
                duration: 0.8
            });
        });

        // Animação de Parallax para as "Duas Jornadas"
        const journeyCards = document.querySelectorAll('.journey-card');
        journeyCards.forEach(card => {
            const speed = card.dataset.speed || 1;
            
            // ===== CORREÇÃO 2: Lógica de Parallax simplificada e robusta =====
            // Move o card verticalmente em uma porcentagem de sua própria altura,
            // garantindo que ele permaneça no lugar correto no layout.
            gsap.to(card, {
                yPercent: (speed - 1) * -20, // Ajuste este valor (ex: -15, -25) para mais ou menos efeito
                ease: "none",
                scrollTrigger: {
                    trigger: card.parentElement, // Usa o grid como gatilho para melhor sincronia
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    // --- MÓDULO 2: SIMULAÇÃO DE CHAT DO ORÁCULO (Funcional) ---
    function startOracleChat() {
        const browserWindow = document.querySelector('.browser-window');
        if (!browserWindow) return;

        const tabs = browserWindow.querySelectorAll('.browser-tab');
        const chatSimulations = browserWindow.querySelectorAll('.chat-simulation');
        const playedTabs = new Set();

        const chatScripts = {
            '1': [ { sender: 'user', text: 'Vou encontrar uma mulher que me intimida hoje. O que eu digo?', delay: 1500 }, { sender: 'oracle', text: '// INICIANDO PROTOCOLO SOCRÁTICO...', delay: 2000 }, { sender: 'oracle', text: 'Analisando... Sua pergunta assume que o "o quê" é mais importante que o "quem". Por que você acredita que precisa de um roteiro para validar sua presença?', delay: 4000 } ],
            '2': [ { sender: 'user', text: 'A conversa morreu. Falei do meu trabalho e ela pareceu entediada.', delay: 1500 }, { sender: 'oracle', text: '// AUTÓPSIA DE INTERAÇÃO EM ANDAMENTO...', delay: 2000 }, { sender: 'oracle', text: 'Você descreveu fatos ou transmitiu paixão? O tédio não nasce do assunto, mas da ausência de emoção. Qual sentimento você queria que ela sentisse ao ouvir sobre seu trabalho?', delay: 4500 } ],
            '3': [ { sender: 'user', text: 'Tenho uma negociação de salário amanhã. Sinto que não mereço o valor que vou pedir.', delay: 1500 }, { sender: 'oracle', text: '// RECALIBRANDO FRAME DE VALOR...', delay: 2000 }, { sender: 'oracle', text: 'A negociação não é sobre o que você acha que merece. É sobre o custo que a empresa teria para substituir o valor que você gera. Liste três problemas críticos que você resolveu nos últimos 6 meses.', delay: 4500 } ]
        };

        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        async function runChatAnimation(simulationEl) {
            const messagesContainer = simulationEl.querySelector('.oracle-messages');
            const scriptKey = simulationEl.id.split('-')[2];
            const script = chatScripts[scriptKey];
            if (!script) return;
            
            messagesContainer.innerHTML = '';
            await wait(500);

            for (const msg of script) {
                await wait(msg.delay || 1500);
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
                
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.textContent = '_';

                if (msg.sender === 'oracle') {
                    textEl.appendChild(cursor);
                    await wait(1000 + Math.random() * 500);
                    let currentText = '';
                    for (let char of msg.text) {
                        currentText += char;
                        textEl.textContent = currentText;
                        textEl.appendChild(cursor);
                        await wait(30);
                    }
                    cursor.remove();
                } else {
                    textEl.textContent = msg.text;
                }
            }
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                chatSimulations.forEach(s => s.classList.remove('active'));
                tab.classList.add('active');
                const activeSimulation = document.getElementById(`chat-tab-${tabId}`);
                activeSimulation.classList.add('active');
                if (!playedTabs.has(tabId)) {
                    runChatAnimation(activeSimulation);
                    playedTabs.add(tabId);
                }
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !playedTabs.has('1')) {
                    runChatAnimation(document.getElementById('chat-tab-1'));
                    playedTabs.add('1');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        observer.observe(browserWindow);
    }

    // --- INICIALIZAÇÃO DOS MÓDULOS DA PÁGINA ---
    startScrollAnimations();
    startOracleChat();
}

// Lembre-se de chamar a função principal no seu script principal,
// por exemplo, dentro do DOMContentLoaded ou da sua função initApp.
initUpsell2Page();
