// Espera todo o conteúdo da página carregar antes de executar o código
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // --- FUNÇÃO DE INICIALIZAÇÃO PARA A PÁGINA DE VENDAS ---
    // ==========================================================
    function setupSalesPage() {
        // Seleciona elementos específicos da página de vendas
        const accordionItems = document.querySelectorAll('.accordion-item');
        const animatedElements = document.querySelectorAll('.anim-on-scroll');
        const onlineCountElement = document.getElementById('pessoas-online');
        const vagasHeaderElement = document.getElementById('vagas-restantes-header');
        const notificationElement = document.getElementById('social-proof-notification');
        const progressBar = document.getElementById('progress-bar-inner');
        
        // Acordeão
        if (accordionItems.length > 0) {
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                header.addEventListener('click', () => {
                    const content = item.querySelector('.accordion-content');
                    header.classList.toggle('active');
                    if (header.classList.contains('active')) {
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.style.padding = "20px";
                    } else {
                        content.style.maxHeight = null;
                        content.style.padding = "0 20px";
                    }
                });
            });
        }

        // Animações ao Rolar
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }

    // ==========================================================
// --- NOVO SISTEMA DE ESCASSEZ PERSISTENTE (V4.0) ---
// ==========================================================
function initScarcitySystem() {
    const vagasHeaderElement = document.getElementById('vagas-restantes-header');
    const progressBar = document.getElementById('progress-bar-inner');

    if (!vagasHeaderElement || !progressBar) return;

    // --- CONFIGURAÇÕES ---
    const TOTAL_VAGAS = 250;
    const VENDA_A_CADA_X_MINUTOS = 30;
    const VAGAS_INICIAIS_MIN = 45;
    const VAGAS_INICIAIS_MAX = 65;
    const VAGAS_MINIMAS_EXIBIDAS = 3;
    const STORAGE_KEY = 'primordial_scarcity_state';

    let vagasAtuais; // Variável para manter o estado durante a sessão

    // --- FUNÇÕES HELPER ---
    const getScarcityState = () => JSON.parse(localStorage.getItem(STORAGE_KEY));
    const saveScarcityState = (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    const updateVagasDisplay = () => {
        vagasHeaderElement.textContent = vagasAtuais;
        const vagasPreenchidas = TOTAL_VAGAS - vagasAtuais;
        const percentualPreenchido = (vagasPreenchidas / TOTAL_VAGAS) * 100;
        progressBar.style.width = percentualPreenchido + '%';
    };

    // --- LÓGICA PRINCIPAL ---
    let state = getScarcityState();

    if (state) {
        // --- LÓGICA PARA USUÁRIO RECORRENTE ---
        const tempoDecorridoMs = Date.now() - state.timestamp;
        const minutosDecorridos = tempoDecorridoMs / (1000 * 60);
        const vendasSimuladas = Math.floor(minutosDecorridos / VENDA_A_CADA_X_MINUTOS);

        const vagasCalculadas = state.initialVagas - vendasSimuladas;

        // Regra de Ouro: O número nunca sobe em relação à última visita.
        vagasAtuais = Math.min(state.lastSeenVagas, vagasCalculadas);
        
        // Garante que não vá abaixo do piso mínimo
        if (vagasAtuais < VAGAS_MINIMAS_EXIBIDAS) {
            vagasAtuais = VAGAS_MINIMAS_EXIBIDAS;
        }

    } else {
        // --- LÓGICA PARA PRIMEIRA VISITA ---
        vagasAtuais = Math.floor(Math.random() * (VAGAS_INICIAIS_MAX - VAGAS_INICIAIS_MIN + 1)) + VAGAS_INICIAIS_MIN;
        
        state = {
            initialVagas: vagasAtuais,
            timestamp: Date.now(),
            lastSeenVagas: vagasAtuais // Na primeira visita, lastSeen é o valor atual
        };
        saveScarcityState(state);
    }
    
    // Atualiza a UI com o número de vagas correto
    updateVagasDisplay();

    // Evento para salvar o estado antes de o usuário sair da página
    window.addEventListener('beforeunload', () => {
        state.lastSeenVagas = vagasAtuais;
        saveScarcityState(state);
    });

    // Para uso futuro na Fase 2: uma função para simular uma venda
    window.simularVenda = () => {
        if (vagasAtuais > VAGAS_MINIMAS_EXIBIDAS) {
            vagasAtuais--;
            updateVagasDisplay();
            // Aqui chamaremos a lógica da Fase 2 (aumentar membros, notificar)
            console.log(`Venda simulada! Vagas restantes: ${vagasAtuais}`);
        }
    };
}

    // ==========================================================
    // --- LÓGICA DA PÁGINA DE UPSELL (VERSÃO CORRIGIDA) ---
    // ==========================================================

    // 1. Lógica do Alerta de Sobreposição
    const overlay = document.getElementById('alert-overlay');
    if (overlay) { 
        function hideOverlay() {
            overlay.classList.remove('visible');
        }
        const autoHide = setTimeout(hideOverlay, 3000);
        overlay.addEventListener('click', () => {
            clearTimeout(autoHide);
            hideOverlay();
        });
    }

    // 2. Lógica da Seleção de Missão
    const missoes = document.querySelectorAll('.missao-card');
    const upsellButtons = document.querySelectorAll('.upsell-cta-button');
    const escolhaMissaoTexto = document.querySelector('.escolha-missao-texto');

    if (missoes.length > 0 && upsellButtons.length > 0 && escolhaMissaoTexto) {
        missoes.forEach((missao, index) => {
            missao.addEventListener('click', () => {
                missoes.forEach(m => m.classList.remove('selected'));
                missao.classList.add('selected');

                escolhaMissaoTexto.style.display = 'none';

                upsellButtons.forEach(button => button.classList.add('hidden-cta'));
                
                if (upsellButtons[index]) {
                    upsellButtons[index].classList.remove('hidden-cta');
                }
            });
        });
    }

    // ==========================================================
// --- SISTEMA DE COMENTÁRIOS PERSISTENTE (VERSÃO 4.0 - FINAL) ---
// ==========================================================
function initCommentSystem() {
    const commentListElement = document.getElementById('primordial-comments-list');
    const commentTemplate = document.getElementById('comment-template');
    const notificationElement = document.getElementById('social-proof-notification');

    if (!commentListElement || !commentTemplate || !notificationElement) return;

    // --- CHAVES DO LOCALSTORAGE ---
    const SEEN_COMMENTS_KEY = 'primordial_seen_comments';
    const LIKED_COMMENTS_KEY = 'primordial_liked_comments';
    const LIKES_CACHE_KEY = 'primordial_likes_cache';
    const LAST_VISIT_KEY = 'primordial_last_visit';

    const MIN_TIME_FOR_NEW_COMMENTS = 6 * 3600 * 1000; // 6 horas em milissegundos

    // --- BASE DE DADOS (EXPANDIDA) ---
     const staticComments = [
        // Adicionei mais 20 comentários aqui para totalizar 30
        // As datas estão mais espalhadas para maior realismo
        { id: 101, username: 'Ricardo.M', text: 'Mudei completamente a forma como me apresento. As pessoas notam. Chega de ser o "bonzinho".', originalTimestamp: '2025-06-28T10:00:00Z', initialLikes: 112 },
        { id: 102, username: 'F_Guimarães', text: 'O módulo 2 foi um soco no estômago. Percebi o quanto eu estava me sabotando. Recomendo.', originalTimestamp: '2025-06-27T18:30:00Z', initialLikes: 98 },
        { id: 103, username: 'Vitor_S', text: 'Finalmente entendi a diferença entre ser agressivo e ser um babaca. O Primordial te ensina a ser perigoso, não tóxico.', originalTimestamp: '2025-06-27T11:45:00Z', initialLikes: 154 },
        { id: 104, username: 'Leo_Costa', text: 'A chave virou. Não peço mais desculpas por querer mais da vida. Energia renovada.', originalTimestamp: '2025-06-26T22:10:00Z', initialLikes: 89 },
        { id: 105, username: 'Danilo.Ribeiro', text: 'Impressionante. O conteúdo sobre linguagem corporal silenciosa já valeu o investimento todo.', originalTimestamp: '2025-06-26T15:00:00Z', initialLikes: 210 },
        { id: 106, username: 'G_Alves', text: 'Parei de buscar validação e comecei a construir meu próprio valor. Isso muda o jogo.', originalTimestamp: '2025-06-25T20:05:00Z', initialLikes: 77 },
        { id: 107, username: 'Marcos.P', text: 'Não é mágica, é protocolo. Segui os passos e a mudança na minha rotina foi brutal.', originalTimestamp: '2025-06-25T09:00:00Z', initialLikes: 132 },
        { id: 108, username: 'Thiago.Nunes', text: 'O acesso à "Irmandade" é o maior bônus. Trocar ideia com outros homens na mesma jornada não tem preço.', originalTimestamp: '2025-06-24T19:20:00Z', initialLikes: 188 },
        { id: 109, username: 'Caio.F', text: 'Sentia que algo estava errado, mas não sabia o quê. O Primordial deu nome ao problema e entregou a solução.', originalTimestamp: '2025-06-24T14:15:00Z', initialLikes: 121 },
        { id: 110, username: 'Bruno.Siqueira', text: 'Nunca mais serei o mesmo. E agradeço por isso. Recomendo a todos que sentem que podem ser mais.', originalTimestamp: '2025-06-23T23:55:00Z', initialLikes: 253 },
        { id: 111, username: 'Alex.J', text: 'A forma como o curso aborda a biologia da atração é algo que nunca vi em nenhum outro lugar. Fascinante.', originalTimestamp: '2025-06-22T17:00:00Z', initialLikes: 93 },
        { id: 112, username: 'Reinivaldo.C', text: 'A confiança que eu sinto agora ao entrar em uma sala... é palpável. Elas sentem.', originalTimestamp: '2025-06-21T12:30:00Z', initialLikes: 140 },
        { id: 113, username: 'Pedro.H', text: 'Deixei de ser reativo e passei a ser o que dita o ritmo das interações. Mudança de paradigma total.', originalTimestamp: '2025-06-20T09:00:00Z', initialLikes: 111 },
        { id: 114, username: 'Diego.L', text: 'O ritual final de integração do módulo 4 é poderoso. Solidifica tudo que foi aprendido.', originalTimestamp: '2025-06-19T21:00:00Z', initialLikes: 84 },
        { id: 115, username: 'Gustavo.R', text: 'Minha produtividade no trabalho aumentou. O foco laser que eles ensinam se aplica a todas as áreas da vida.', originalTimestamp: '2025-06-18T16:45:00Z', initialLikes: 102 },
        { id: 116, username: 'Leandro.D', text: 'A mentalidade de escassez foi eliminada. Hoje eu entendo que eu sou o prêmio.', originalTimestamp: '2025-06-17T11:20:00Z', initialLikes: 176 },
        { id: 117, username: 'André.B', text: 'Cada centavo valeu a pena. Na verdade, paguei barato pela transformação que está acontecendo.', originalTimestamp: '2025-06-16T20:00:00Z', initialLikes: 230 },
        { id: 118, username: 'Marcelo.V', text: 'A clareza mental que ganhei é o maior benefício. Sei o que quero e sei como buscar.', originalTimestamp: '2025-06-15T14:00:00Z', initialLikes: 99 },
        { id: 119, username: 'Roberto.A', text: 'O conceito de "agressividade saudável" foi libertador. Permissão para ser homem de novo.', originalTimestamp: '2025-06-14T10:10:00Z', initialLikes: 165 },
        { id: 120, username: 'Fernando.M', text: 'As mulheres não reagem mais a mim, elas iniciam. É bizarro e incrível.', originalTimestamp: '2025-06-13T22:50:00Z', initialLikes: 301 },
        { id: 121, username: 'Elias.V', text: 'Demorei pra entrar, me arrependo de não ter feito antes. Não espere.', originalTimestamp: '2025-06-12T19:00:00Z', initialLikes: 128 },
        { id: 122, username: 'Alan.S', text: 'Minha postura mudou, minha voz mudou, meus resultados mudaram.', originalTimestamp: '2025-06-11T15:30:00Z', initialLikes: 108 },
        { id: 123, username: 'Cauã.C', text: 'Finalmente entendi o que significa "energia masculina". Não é algo que se explica, se vive. Este curso te mostra o caminho.', originalTimestamp: '2025-06-10T11:00:00Z', initialLikes: 194 },
        { id: 124, username: 'Davi.M', text: 'O Manual da Mulher Magnética é ouro puro. Entender a psicologia delas te dá um poder absurdo.', originalTimestamp: '2025-06-09T20:40:00Z', initialLikes: 280 },
        { id: 125, username: 'Gabriel.P', text: 'O melhor investimento que fiz em anos. Ponto final.', originalTimestamp: '2025-06-08T18:00:00Z', initialLikes: 159 },
        { id: 126, username: 'Carlos.E', text: 'Reaprendi a liderar minha própria vida. O resto é consequência.', originalTimestamp: '2025-06-07T13:15:00Z', initialLikes: 115 },
        { id: 127, username: 'Júlio.C', text: 'A comunidade é forte. Ninguém te julga, todo mundo se ajuda. É uma verdadeira irmandade.', originalTimestamp: '2025-06-06T21:20:00Z', initialLikes: 205 },
        { id: 128, username: 'Renato.M', text: 'Recomendo. Se você está sentindo um vazio, uma falta de propósito, aqui está o mapa de volta.', originalTimestamp: '2025-06-05T16:00:00Z', initialLikes: 148 },
        { id: 129, username: 'Wesley.N', text: 'É denso. É direto. Sem enrolação. Exatamente como deveria ser.', originalTimestamp: '2025-06-04T10:00:00Z', initialLikes: 133 },
        { id: 130, username: 'Benício.M', text: 'A sensação de controle e poder sobre meu próprio destino é algo que eu não sentia há anos. Grato.', originalTimestamp: '2025-06-03T23:00:00Z', initialLikes: 264 }
    ];

    const dynamicCommentPool = [
        // Os comentários dinâmicos permanecem os mesmos
        { id: 201, username: 'Lucas.G', text: 'Ok, entrei. Chega de ser espectador da minha própria vida. Hora de virar protagonista.', initialLikes: 0 },
        { id: 202, username: 'Rafael.O', text: 'Aquele manifesto mexeu comigo. Se for metade do que a página promete, já valeu. Vaga garantida.', initialLikes: 0 },
        { id: 203, username: 'Matheus.C', text: 'Tava cético, mas a quantidade de prova aqui é surreal. Decidi dar o passo. Mais um na alcateia.', initialLikes: 0 },
        { id: 204, username: 'Guilherme.T', text: 'Acabei de garantir meu acesso. O sentimento não é de comprar um curso, é de entrar pra uma guerra.', initialLikes: 0 },
        { id: 205, username: 'Felipe.A', text: 'É isso. Investimento feito na única coisa que importa: eu mesmo. Ansioso pra começar a transformação.', initialLikes: 0 },
        { id: 206, username: 'Rodrigo.V', text: 'Comprado! A parte de "recalibração neurobiológica" me pegou. Parece ser mais profundo que o resto.', initialLikes: 0 },
        { id: 207, username: 'Eduardo.P', text: 'Hesitei por 10 minutos. Pensei: "Daqui a um ano, vou me arrepender de não ter tentado?". A resposta foi óbvia. Estou dentro.', initialLikes: 0 },
        { id: 208, username: 'Sérgio.L', text: 'Chega de ser o "cara legal" que fica na friendzone. Se é pra ser perigoso, que comece agora. Inscrição feita.', initialLikes: 0 }
    ];
    
    // --- FUNÇÕES HELPER ---
    const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) || null;
    const saveToStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    function simulateNewLikes(baseLikes, timestamp) {
        const timeSincePost = Date.now() - new Date(timestamp).getTime();
        const hoursSincePost = timeSincePost / (1000 * 3600);
        // Adiciona um número pequeno e aleatório de curtidas por hora
        const simulatedLikes = Math.floor(hoursSincePost * (Math.random() * 0.5 + 0.1)); 
        return baseLikes + simulatedLikes;
    }

    function formatTimeAgo(date) {
        const now = new Date();
        const seconds = Math.round((now - new Date(date)) / 1000);
        if (seconds < 5) return 'agora mesmo';
        const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
        const intervals = [
            { value: 31536000, unit: 'year' }, { value: 2592000, unit: 'month' },
            { value: 86400, unit: 'day' }, { value: 3600, unit: 'hour' },
            { value: 60, unit: 'minute' }, { value: 1, unit: 'second' }
        ];
        for (const i of intervals) {
            const amount = Math.floor(seconds / i.value);
            if (amount >= 1) return rtf.format(-amount, i.unit);
        }
        return 'há poucos segundos';
    }
    function truncateText(text, maxLength = 60) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    /** Cria o elemento DOM para um comentário */
    function createCommentElement(comment, timestamp) {
        const commentElement = commentTemplate.content.cloneNode(true).querySelector('.mural-post');
        const likedIds = Object.keys(getFromStorage(LIKED_COMMENTS_KEY) || {});
        const likesCache = getFromStorage(LIKES_CACHE_KEY) || {};
        
        const isLiked = likedIds.includes(String(comment.id));
        
        // Usa o like do cache ou simula um novo
        let likeCount = likesCache[comment.id] || simulateNewLikes(comment.initialLikes, timestamp);
        if (isLiked && !likesCache[comment.id]) { // Se foi curtido nesta sessão pela primeira vez
            likeCount += 1;
        }
        likesCache[comment.id] = likeCount; // Atualiza o cache
        
        commentElement.dataset.id = comment.id;
        commentElement.querySelector('.post-username').textContent = comment.username;
        commentElement.querySelector('.post-body p').textContent = comment.text;
        commentElement.querySelector('.post-timestamp').textContent = formatTimeAgo(timestamp);
        
        const avatarImg = document.createElement('img');
        avatarImg.src = `https://i.pravatar.cc/50?u=${comment.id}`;
        avatarImg.alt = `Avatar de ${comment.username}`;
        commentElement.querySelector('.post-avatar').appendChild(avatarImg);
        
        const likeButton = commentElement.querySelector('.post-like-button');
        likeButton.querySelector('.like-count').textContent = likeCount;
        if (isLiked) {
            likeButton.classList.add('is-liked');
        }

        saveToStorage(LIKES_CACHE_KEY, likesCache); // Salva o cache atualizado
        return commentElement;
    }

    /** Renderiza todo o mural */
    function renderMural() {
        commentListElement.innerHTML = '';
        const seenComments = getFromStorage(SEEN_COMMENTS_KEY) || {};
        const allCommentsData = [
            ...staticComments, ...dynamicCommentPool
        ];
        
        const commentsToRender = allCommentsData
            .filter(c => staticComments.includes(c) || seenComments[c.id])
            .map(c => ({
                ...c,
                timestamp: seenComments[c.id] || c.originalTimestamp
            }));

        commentsToRender.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        commentsToRender.forEach(c => commentListElement.appendChild(createCommentElement(c, c.timestamp)));
    }
    
    /** Lida com o clique de curtir */
    function handleLikeClick(event) { /* ...função inalterada... */ }

    /** Mostra a notificação e atualiza o mural */
    function showNewDynamicComment(comment) {
        // ...lógica da notificação...
        setTimeout(() => {
            const now = Date.now();
            const seenComments = getFromStorage(SEEN_COMMENTS_KEY) || {};
            seenComments[comment.id] = now;
            saveToStorage(SEEN_COMMENTS_KEY, seenComments);
            renderMural();
        }, 1000);
    }

    /** Agenda novos comentários baseado no tempo desde a última visita */
    function scheduleNewComments(timeSinceLastVisit) {
        // Só agenda se o usuário esteve ausente por mais de 6 horas
        if (timeSinceLastVisit < MIN_TIME_FOR_NEW_COMMENTS) {
            console.log("Usuário retornou muito cedo. Nenhum novo comentário agendado.");
            return;
        }

        const seenComments = getFromStorage(SEEN_COMMENTS_KEY) || {};
        const unseenComments = dynamicCommentPool.filter(c => !seenComments[c.id]);
        if (unseenComments.length === 0) return;

        const numberOfCommentsToShow = Math.floor(Math.random() * 3) + 3;
        const commentsToShow = unseenComments.sort(() => 0.5 - Math.random()).slice(0, numberOfCommentsToShow);

        let initialDelay = 12000;
        commentsToShow.forEach(comment => {
            const randomInterval = Math.random() * (35000 - 15000) + 15000;
            setTimeout(() => showNewDynamicComment(comment), initialDelay);
            initialDelay += randomInterval;
        });
    }

    // --- ROTINA DE INICIALIZAÇÃO ---
    const lastVisit = getFromStorage(LAST_VISIT_KEY);
    const timeSinceLastVisit = lastVisit ? Date.now() - lastVisit : Infinity;

    renderMural();
    scheduleNewComments(timeSinceLastVisit);
    commentListElement.addEventListener('click', handleLikeClick);
    
    // Atualiza o timestamp da visita para a próxima vez
    saveToStorage(LAST_VISIT_KEY, Date.now());
}
    // --- EXECUTA AS FUNÇÕES DE INICIALIZAÇÃO ---
    // Cada função verifica internamente se os elementos de sua página existem
    setupSalesPage();
    initCommentSystem();
    initScarcitySystem();
    setupUpsellPage();
});
