// ==========================================================
// --- SCRIPT DEDICADO PARA UPSELL 2: "O ORÁCULO" ---
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

    function initUpsell2Page() {
        // --- GUARDA DE SEGURANÇA ---
        const pageIdentifier = document.getElementById('oracle-section');
        if (!pageIdentifier) return;

        // --- MÓDULO 1: ANIMAÇÕES DE SCROLL COM GSAP ---
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
                // Prepara o texto dividindo em spans
                const chars = textEl.textContent.split('').map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
                textEl.innerHTML = chars;

                gsap.from(textEl.querySelectorAll('.char'), {
                    scrollTrigger: {
                        trigger: textEl,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 40,
                    ease: "back.out(1.7)",
                    stagger: 0.03,
                    duration: 0.8
                });
            });

            // Animação de Parallax para as "Duas Jornadas"
            const journeyCards = document.querySelectorAll('.journey-card');
            journeyCards.forEach(card => {
                const speed = card.dataset.speed || 1;
                gsap.to(card, {
                    y: (i, target) => -(target.offsetHeight * (1 - speed)) * ScrollTrigger.maxScroll(window),
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }

        // --- MÓDULO 2: SIMULAÇÃO DE CHAT DO ORÁCULO ---
        function startOracleChat() {
            const browserWindow = document.querySelector('.browser-window');
            if (!browserWindow) return;

            const tabs = browserWindow.querySelectorAll('.browser-tab');
            const chatSimulations = browserWindow.querySelectorAll('.chat-simulation');
            const playedTabs = new Set(); // Armazena as abas que já tiveram a animação executada

            const chatScripts = {
                '1': [ // Dúvida Pré-Interação
                    { sender: 'user', text: 'Vou encontrar uma mulher que me intimida hoje. O que eu digo?' },
                    { sender: 'oracle', text: '// INICIANDO PROTOCOLO SOCRÁTICO...' },
                    { sender: 'oracle', text: 'Analisando... Sua pergunta assume que o "o quê" é mais importante que o "quem". Por que você acredita que precisa de um roteiro para validar sua presença?' }
                ],
                '2': [ // Análise Pós-Ação
                    { sender: 'user', text: 'A conversa morreu. Falei do meu trabalho e ela pareceu entediada.' },
                    { sender: 'oracle', text: '// AUTÓPSIA DE INTERAÇÃO EM ANDAMENTO...' },
                    { sender: 'oracle', text: 'Você descreveu fatos ou transmitiu paixão? O tédio não nasce do assunto, mas da ausência de emoção. Qual sentimento você queria que ela sentisse ao ouvir sobre seu trabalho?' }
                ],
                '3': [ // Calibragem Estratégica
                    { sender: 'user', text: 'Tenho uma negociação de salário amanhã. Sinto que não mereço o valor que vou pedir.' },
                    { sender: 'oracle', text: '// RECALIBRANDO FRAME DE VALOR...' },
                    { sender: 'oracle', text: 'A negociação não é sobre o que você acha que merece. É sobre o custo que a empresa teria para substituir o valor que você gera. Liste três problemas críticos que você resolveu nos últimos 6 meses.' }
                ]
            };

            const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            async function typeText(element, text) { /* ... (função de digitação) ... */ }

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
            await wait(1000 + Math.random() * 500); // Simula "pensamento"
            
            let currentText = '';
            for (let char of msg.text) {
                currentText += char;
                textEl.textContent = currentText;
                textEl.appendChild(cursor);
                await wait(30); // Velocidade de digitação
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

            // Inicia a primeira animação assim que a seção se torna visível
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
    
    // Chama a função principal da página
    initUpsell2Page();
});
