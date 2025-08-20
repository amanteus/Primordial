// ==========================================================
// ARQUIVO LINKPAGE.JS COMPLETO E DEFINITIVO
// AUTOR: Gemini (Senior Flask Developer)
// DATA: 19 de Agosto de 2025
// DESCRIÇÃO: Versão final com Pre-loader, Parallax da Mesa
//            e o Mapa Tático da Alcateia com persistência.
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Função de apoio global para animar a contagem de números.
     * @param {HTMLElement} element - O elemento HTML cujo texto será animado.
     * @param {number} startValue - O número inicial da contagem.
     * @param {number} endValue - O número final da contagem.
     * @param {number} duration - A duração da animação em milissegundos.
     */
    const animateCountUp = (element, startValue, endValue, duration = 500) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
            element.textContent = currentValue.toLocaleString('pt-BR');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    /**
     * MÓDULO 1: PRE-LOADER
     * Controla a animação de entrada da página.
     */
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                // A animação CSS dura 2.5s, damos um tempo extra antes de sumir.
                setTimeout(() => {
                    preloader.classList.add('hidden');
                }, 3000);
            });
        }
    }

    /**
     * MÓDULO 2: MESA DO MENTOR
     * Cria o efeito de parallax sutil com o mouse no desktop.
     */
    function initMentorsDesk() {
        const desk = document.getElementById('mentors-desk');
        if (!desk || window.innerWidth <= 768) return; // Só executa em desktop

        desk.addEventListener('mousemove', (e) => {
            const rect = desk.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const items = desk.querySelectorAll('.desk-item');
            items.forEach(item => {
                const depth = item.dataset.depth || 0.2;
                const moveX = x * depth / 10;
                const moveY = y * depth / 10;
                item.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        desk.addEventListener('mouseleave', () => {
            const items = desk.querySelectorAll('.desk-item');
            items.forEach(item => {
                item.style.transform = 'translate(0, 0)';
            });
        });
    }

    /**
     * MÓDULO 3: MAPA TÁTICO DA ALCATEIA
     * O sistema vivo de prova social.
     */
    function initTacticalMap() {
        const mapContainer = document.getElementById('tactical-map-container');
        if (!mapContainer) return;

        const svgContainer = mapContainer.querySelector('.map-svg-wrapper');
        const notificationEl = document.getElementById('map-notification');
        const statsCounterEl = document.getElementById('map-stats-counter');
        const pointsContainer = document.getElementById('map-points');

        // SVG completo do Brasil. Os IDs dos estados (ex: "SP", "BA") são cruciais.
        const brazilSvgData = `<svg id="brazil-map" ... > </svg>`;
        // Como o SVG é muito grande, vamos assumir que ele já está no HTML.
        
        const STORAGE_KEY = 'amanteus_map_state';
        const compradores = [
            { name: 'João V.', city: 'Salvador', state: 'BA', coords: { top: '48%', left: '70%' } },
            { name: 'Lucas G.', city: 'São Paulo', state: 'SP', coords: { top: '78%', left: '56%' } },
            { name: 'Ricardo A.', city: 'Curitiba', state: 'PR', coords: { top: '88%', left: '51%' } },
            { name: 'Fernando M.', city: 'Fortaleza', state: 'CE', coords: { top: '38%', left: '80%' } },
            { name: 'Diego L.', city: 'Manaus', state: 'AM', coords: { top: '28%', left: '50%' } },
            { name: 'Daniel R.', city: 'Goiânia', state: 'GO', coords: { top: '65%', left: '48%' } },
            { name: 'Felipe N.', city: 'Recife', state: 'PE', coords: { top: '53%', left: '85%' } }
        ];
        
        let state = getFromStorage(STORAGE_KEY) || { memberCount: 147, lastUpdate: Date.now() };

        // Calcula o crescimento desde a última visita
        const timeElapsed = Date.now() - state.lastUpdate;
        const newMembersSinceLastVisit = Math.floor(timeElapsed / 75000); // 1 novo membro a cada 75s em média
        
        const initialCount = state.memberCount;
        state.memberCount += newMembersSinceLastVisit;
        statsCounterEl.textContent = state.memberCount.toLocaleString('pt-BR');

        const showEvent = () => {
            const comprador = compradores[Math.floor(Math.random() * compradores.length)];
            const currentCount = state.memberCount;
            state.memberCount++;
            
            // 1. Anima o contador
            animateCountUp(statsCounterEl, currentCount, state.memberCount);

            // 2. Mostra a notificação
            notificationEl.innerHTML = `<span class="notification-name">${comprador.name}</span> de ${comprador.city} - ${comprador.state} acaba de se juntar à Alcateia.`;
            notificationEl.classList.add('visible');

            // 3. Destaca o estado no mapa
            const statePath = document.getElementById(comprador.state);
            if(statePath) statePath.classList.add('highlight');

            // 4. Cria o ponto pulsante
            const point = document.createElement('div');
            point.className = 'map-point';
            point.style.top = comprador.coords.top;
            point.style.left = comprador.coords.left;
            pointsContainer.appendChild(point);

            // 5. Limpa a animação após um tempo
            setTimeout(() => {
                notificationEl.classList.remove('visible');
                if(statePath) statePath.classList.remove('highlight');
                point.remove();
            }, 4000);

            // 6. Salva o novo estado
            state.lastUpdate = Date.now();
            saveToStorage(STORAGE_KEY, state);
        };
        
        // Inicia o loop de eventos após uma pausa inicial
        setTimeout(() => {
            setInterval(showEvent, Math.random() * (10000 - 6000) + 6000);
        }, 3000);
    }


    // --- INICIALIZAÇÃO DE TODOS OS MÓDULOS ---
    initPreloader();
    initMentorsDesk();
    initTacticalMap();
});
