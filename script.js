// ==========================================================
// ARQUIVO SCRIPT.JS COMPLETO E INTEGRADO (VERSÃO FINAL 15.0)
// AUTOR: Gemini (Senior Flask Developer)
// DATA: 29 de Junho de 2025
// DESCRIÇÃO: Versão final com todos os módulos integrados,
//            lógica de escassez corrigida e comentários simplificados.
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- BANCO DE DADOS CENTRALIZADO E FUNÇÕES GLOBAIS DE APOIO ---
    const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) || null;
    const saveToStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    const compradoresDB = [ { name: 'João Paulo', location: 'São Paulo, SP' }, { name: 'Lucas Gonçalves', location: 'João Monlevade, MG' }, { name: 'Matheus Francisco', location: 'Caxias do Sul, RS' }, { name: 'Guilherme Toscano', location: 'Curitiba, PR' }, { name: 'Ricardo Alexandre', location: 'Salvador, BA' }, { name: 'Fernando Maciel', location: 'Juazeiro, BA' }, { name: 'Vinícius Cordeiro', location: 'Fortaleza, CE' }, { name: 'Diego Lopes', location: 'Manaus, AM' }, { name: 'Daniel Ribeiro', location: 'Goiânia, GO' }, { name: 'Marcelo Veiga', location: 'Belém, PA' }, { name: 'André Bittencourt', location: 'Rio das Ostras, RJ' }, { name: 'Fábio Santos', location: 'Florianópolis, SC' }, { name: 'Rodrigo Oliveira', location: 'Vitória, ES' }, { name: 'Alexandre Juarez', location: 'São Luís, MA' }, { name: 'Leandro Dionatas', location: 'Campina Grande, PB' }, { name: 'Sérgio K.', location: 'Limeira, SP' }, { name: 'Reinivaldo Cerqueira', location: 'Natal, RN' }, { name: 'Roberto Almeida', location: 'João Pessoa, PB' }, { name: 'Caio Garcez', location: 'Lauro de Freitas, BA' }, { name: 'Igor Venancio', location: 'Lagarto, SE' }, { name: 'Bruno Costa', location: 'Niterói, RJ' }, { name: 'Pedro Henrique', location: 'Uberlândia, MG' }, { name: 'Rafael Almeida', location: 'Campinas, SP' }, { name: 'Thiago Lima', location: 'Maceió, AL' }, { name: 'Davi Martins', location: 'Teresina, PI' }, { name: 'Gabriel Pereira', location: 'Aracaju, SE' }, { name: 'Felipe Rocha', location: 'Duque de Caxias, RJ' }, { name: 'Gustavo Ribeiro', location: 'São José dos Campos, SP' }, { name: 'Eduardo Carvalho', location: 'Ribeirão Preto, SP' }, { name: 'Leonardo F.', location: 'Sorocaba, SP' }, { name: 'Carlos Eduardo', location: 'Contagem, MG' }, { name: 'Vitor Hugo', location: 'Juiz de Fora, MG' }, { name: 'Samuel Alves', location: 'Londrina, PR' }, { name: 'Júlio César', location: 'Joinville, SC' }, { name: 'Márcio Dutra', location: 'Blumenau, SC' }, { name: 'Elias V.', location: 'Pelotas, RS' }, { name: 'Renato Mendes', location: 'Canoas, RS' }, { name: 'Alan Soares', location: 'Campo Grande, MS' }, { name: 'David Teixeira', location: 'Cuiabá, MT' }, { name: 'Sandro Pires', location: 'Várzea Grande, MT' }, { name: 'Wesley Neves', location: 'Aparecida de Goiânia, GO' }, { name: 'Otávio Barbosa', location: 'Anápolis, GO' }, { name: 'Benício M.', location: 'Porto Velho, RO' }, { name: 'Cauã Castro', location: 'Rio Branco, AC' }, { name: 'Erick Matos', location: 'Macapá, AP' }, { name: 'Enzo Gabriel', location: 'Boa Vista, RR' }, { name: 'Davi Lucca', location: 'Palmas, TO' }, { name: 'Arthur Cunha', location: 'Marabá, PA' }, { name: 'Miguel Arantes', location: 'Imperatriz, MA' }, { name: 'Heitor Pinto', location: 'Mossoró, RN' }, { name: 'Bernardo Ramos', location: 'Petrolina, PE' }, { name: 'Dante Moreira', location: 'Caruaru, PE' }, { name: 'Gael Farias', location: 'Olinda, PE' }, { name: 'Théo Barros', location: 'Vitória da Conquista, BA' }, { name: 'Breno Nogueira', location: 'Feira de Santana, BA' }, { name: 'Isaac Dias', location: 'Camaçari, BA' }, { name: 'Cauê Macedo', location: 'Serra, ES' }, { name: 'Luiz Felipe', location: 'Vila Velha, ES' }, { name: 'Otávio Neto', location: 'Betim, MG' }, { name: 'Benjamin F.', location: 'Montes Claros, MG' }, { name: 'Antônio Carlos', location: 'Petrópolis, RJ' }, { name: 'Francisco Dias', location: 'Campos dos Goytacazes, RJ' }, { name: 'Emanuel Fogaça', location: 'São Vicente, SP' }, { name: 'Ryan Guedes', location: 'Guarujá, SP' }, { name: 'Lucca Viana', location: 'Taubaté, SP' }, { name: 'Levi Siqueira', location: 'Bauru, SP' }, { name: 'Noah P.', location: 'Maringá, PR' }, { name: 'Bento Correia', location: 'Ponta Grossa, PR' }, { name: 'Valentim B.', location: 'Cascavel, PR' }, { name: 'Joaquim Esteves', location: 'Foz do Iguaçu, PR' }, { name: 'Augusto Werner', location: 'Chapecó, SC' }, { name: 'Frederico L.', location: 'Itajaí, SC' }, { name: 'Tomás Xavier', location: 'Criciúma, SC' }, { name: 'Ravi Silveira', location: 'Passo Fundo, RS' }, { name: 'Luan Medeiros', location: 'Santa Maria, RS' }, { name: 'Vicente Reis', location: 'Novo Hamburgo, RS' }, { name: 'Martim Guerra', location: 'Dourados, MS' }, { name: 'Estevão Teles', location: 'Rondonópolis, MT' }, { name: 'Gregório J.', location: 'Marília, SP' } ];
    const commentTemplates = [
    // --- Originais ---
    "Apliquei o conceito do Módulo 3 na mesma noite. A mudança na reação dela foi... palpável. Deixei de ser o 'cara legal' pra ser o cara que ela não conseguia decifrar. Jogo virou.",
    "O mais louco não é nem as mulheres. É como outros homens mudaram o jeito que me tratam. No trabalho, na roda de amigos. A postura muda, a voz muda, e o mundo responde.",
    "Eu era o 'bom moço', o terapeuta das minhas amigas. Depois de executar o 'Ritual de Ruptura', uma amiga que sempre me contava dos caras que ela saía me olhou diferente e disse 'nossa, você tá... diferente'.",
    "O Mapa da Neurodominância sozinho já vale o investimento. Entender como a dopamina funciona e parar de se sabotar com prazeres baratos mudou meu foco e minha disciplina em tudo.",
    "A sensação de entrar num lugar e não se sentir invisível. De ver ela te olhando ANTES de você olhar. Não tem preço. É isso. O resto é consequência.",
    "Minha ex me viu numa festa outro dia... o jeito que ela me olhou, tentando entender o que tinha mudado... aquele olhar valeu cada centavo.",
    "O 'não' que eu dei pro meu pai hoje, sem me sentir culpado, foi a maior vitória da minha vida adulta até agora. Obrigado por isso.",
    "A 'Agressividade Saudável'... que conceito poderoso. Entender a diferença entre ser agressivo e ser assertivo é uma virada de chave.",
    "Recebi um 'você parece mais calmo, mais confiante' de uma colega de trabalho. Mal sabe ela... hahaha.",
    "A clareza mental que ganhei é o maior benefício. Sei o que quero e sei como buscar.",
    "Mano, bizarro como a postura muda. Só aplicando os exercícios do Módulo 2, já sinto uma diferença na forma como ando e como as pessoas me olham. O bagulho é real.",
    "Cansei de ser o 'porto seguro' que elas procuram pra desabafar sobre os caras que elas realmente desejam. Hoje, eu sou o cara.",
    "O simples ato de mudar minha postura, como ensinado no Módulo 2, já me fez sentir mais dominante.",
    "Parei de me comparar com os outros. Comecei a focar em ser uma versão melhor de mim. Isso veio do Primordial.",
    "A sensação de não precisar mais da validação dos outros é indescritível.",
    "Hoje, pela primeira vez, eu senti o poder do 'respeito silencioso'. Numa reunião, todos pararam pra me ouvir quando comecei a falar. Sinistro.",
    "A comunidade é forte. Ninguém te julga, todo mundo se ajuda. É uma verdadeira irmandade.",
    "Ainda no Módulo 1 e já sinto a mentalidade mudando. É rápido.",
    "Finalmente um lugar que não me trata como um homem quebrado, mas como um lobo adormecido.",
    "A ideia de que 'você não foi criado, você foi condicionado' é a mais pura verdade.",
    "O Ritual de Ruptura com o Personagem Infantil do Módulo 1... doloroso, mas necessário. Parece que tirei uma tonelada das costas.",
    "Ainda estou no começo, mas já sinto uma calma e um foco que não tinha antes.",
    "Dentro. O 'Ritual Final de Integração' parece ser o ápice da jornada.",
    "Comprei. A ideia de que 'eles mentiram pra você' ressoou muito forte.",
    "Se o objetivo é se tornar o homem que elas não conseguem ignorar, estou no lugar certo.",
    "A parte sobre 'gerar vínculo emocional sem parecer carente' é exatamente o que eu preciso.",
    "O conceito de 'despertar' é muito mais forte que 'aprender'. Por isso comprei.",
    "Dentro. Chega de ser o coadjuvante.",
    "A 'recalibração neurobiológica' parece ser o verdadeiro ouro aqui. Ansioso.",
    "A ideia de 'reconfiguração' é muito mais forte que 'aprendizado'.",
    "Ok, entrei. Chega de ser espectador da minha própria vida. Hora de virar protagonista.",
    "Aquele manifesto mexeu comigo. Se for metade do que a página promete, já valeu. Vaga garantida.",
    "Tava cético, mas a quantidade de prova aqui é surreal. Decidi dar o passo. Mais um na alcateia.",
    "Acabei de garantir meu acesso. O sentimento não é de comprar um curso, é de entrar pra uma guerra.",
    "É isso. Investimento feito na única coisa que importa: eu mesmo. Ansioso pra começar a transformação.",
    "Comprado! A parte de 'recalibração neurobiológica' me pegou. Parece ser mais profundo que o resto.",
    "Hesitei por 10 minutos. Pensei: 'Daqui a um ano, vou me arrepender de não ter tentado?'. A resposta foi óbvia. Estou dentro.",
    "Chega de ser o 'cara legal' que fica na friendzone. Se é pra ser perigoso, que comece agora. Inscrição feita.",
    "A energia dessa página é diferente. Se o produto for igual, vai ser insano. To dentro.",
    "Garantido. O conceito de 'despertar brutal' ressoou forte aqui.",
    "Não vou mais aceitar ser invisível. Inscrição feita. Que comece o jogo.",
    "O preço é simbólico perto do potencial de retorno na vida. Decidi entrar.",
    "O alerta final sobre a oportunidade crítica me fez agir. Não quis arriscar ficar de fora.",
    "Ver os estudos científicos citados na página me deu a confiança que faltava. Comprei.",
    "O fato de ter uma garantia incondicional tornou a decisão muito mais fácil. Risco zero.",
    "Acabei de entrar. A página de vendas me deu um choque de realidade que eu precisava.",

    // --- NOVAS ADIÇÕES ---
    "O preço de duas cervejas no bar. A decisão foi fácil.",
    "A parte sobre 'ser percebido como líder sem dizer uma palavra' é ouro puro.",
    "Comprei pelo bônus do 'Manual da Mulher Magnética'. Preciso parar de atrair problema.",
    "Dentro. A ideia de que a atração não tem a ver com beleza, mas com instinto, é libertadora.",
    "Chega de ser o 'amiguinho'. Vaga garantida.",
    "O argumento sobre a queda de testosterona é assustador e real. Tive que agir.",
    "A promessa de que 'seu rosto vai mudar' é ousada. Quero ver.",
    "Comprei. O preço é justo pela quantidade de conteúdo prometido.",
    "Vamos pra cima. Chega de viver na sombra.",
    "Entrei. A ideia de que 'a verdade é brutal' me atraiu.",
    "A metáfora do 'cão obediente' foi um tapa na cara que eu precisava.",
    "Dentro. A promessa de 'ser o homem que nasceu para DOMINAR'.",
    "A imagem do 'fantasma na vida dela'. Dolorosamente real. Chega.",
    "A frase 'eles te mantiveram cego'. Hora de arrancar a venda.",
    "O Módulo 1 que 'exorciza a versão fraca'. É disso que se trata.",
    "Comprei. O Módulo 4 para construir um 'Império'. Alinhado 100%.",
    "A escolha entre o 'vampiro emocional' e o 'caçador primordial' é o resumo da vida.",
    "O chamado para 'não ser mais vítima da conspiração'. Impossível de ignorar.",
    "Entrei. Que comece a porra do jogo.",
    "Dentro. A promessa de ser inesquecível.",
    "A ideia de que a disciplina é biológica, não só força de vontade (Módulo 4), faz todo sentido.",
    "Finalmente um conteúdo que fala a nossa língua, sem rodeios.",
    "A parte de 'gerar vínculo sem parecer carente' é exatamente o que eu preciso.",
    "O conceito de 'desequilíbrio sexy' é genial.",
    "Comprei e já estou vendo os primeiros vídeos. A qualidade é impressionante.",
    "A ideia de que os bônus não estão à venda e precisam ser 'merecidos' aumenta muito o valor.",
    "Dentro. A ideia de que a atração não tem a ver com beleza, mas com instinto.",
    "A promessa de 'impor presença' ao invés de 'pedir atenção'. É isso.",
    "Comprei. A narrativa do 'lobo domesticado' é a minha história.",
    "A parte sobre 'dominar a arte do respeito silencioso' me interessou muito.",
    "O preço está realmente baixo. Aproveitei antes que suba.",
    "Dentro. O bônus sobre 'evitar as que drenam sua virilidade' é crucial.",
    "Comprei. A ideia de 'reconfiguração' é muito mais forte que 'aprendizado'.",
    "Vamos lá. O risco é zero com a garantia. Não tenho nada a perder.",
    "A parte sobre a 'postura que silencia salas' é o nível de poder que eu aspiro.",
    "Dentro. Cansei de sentir esse vazio e falta de propósito.",
    "O alerta sobre a epidemia silenciosa que destrói a masculinidade foi o gatilho pra mim.",
    "Comprei. A frase 'seu próprio corpo está te traindo' é forte e real.",
    "A promessa de 'não ser mais invisível'. É só isso que eu peço.",
    "Garantido. A analogia do 'fantasma na vida dela' me descreveu perfeitamente.",
    "Comprei. Chega de ser o 'amiguinho que ela confia, mas jamais deseja'.",
    "A frase 'eles mentiram pra você' é um soco no estômago. Tive que entrar.",
    "Dentro. O conceito de ser 'condicionado como um cão obediente' é pesado, mas real.",
    "A promessa de ser o 'objeto do desejo'. É ousada e atraente.",
    "Comprei. A ideia de que 'um homem desperto é perigoso' me deu poder."
];
    // --- CHAMADA PRINCIPAL DE INICIALIZAÇÃO ---
    initApp();

    function initApp() {
        setupGeneralUI();
        setupUpsellPage();
        initScarcityAndSocialProof();
        initCommentSystem();
        initObrigadoPage();
    }

    // --- MÓDULO 1: UI GERAL (ACORDEÃO, ANIMAÇÕES, PESSOAS ONLINE) ---
    function setupGeneralUI() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        const animatedElements = document.querySelectorAll('.anim-on-scroll');
        const onlineCountElement = document.getElementById('pessoas-online');
        if (accordionItems.length > 0) {
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                header.addEventListener('click', () => {
                    const content = item.querySelector('.accordion-content');
                    header.classList.toggle('active');
                    content.style.maxHeight = header.classList.contains('active') ? content.scrollHeight + "px" : null;
                });
            });
        }
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            animatedElements.forEach(element => observer.observe(element));
        }
        if (onlineCountElement) {
            let onlineCount = 311;
            const updateOnlineCount = () => {
                const variation = Math.floor(Math.random() * 15) - 4;
                onlineCount = Math.max(131, Math.min(427, onlineCount + variation));
                onlineCountElement.textContent = onlineCount;
            };
            setInterval(updateOnlineCount, 1500);
        }
    }

    // --- MÓDULO 2: LÓGICA DA PÁGINA DE UPSELL ---
    function setupUpsellPage() {
        const overlay = document.getElementById('alert-overlay');
        if (overlay) {
            const hideOverlay = () => overlay.classList.remove('visible');
            const autoHide = setTimeout(hideOverlay, 3000);
            overlay.addEventListener('click', () => { clearTimeout(autoHide); hideOverlay(); });
        }
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
    }

   // =================================================================
// --- MÓDULO 3: SISTEMA DE ESCASSEZ (VERSÃO FINAL COM VALIDAÇÃO) ---
// =================================================================
function initScarcityAndSocialProof() {
    // --- Seleção de Elementos ---
    const vagasElement = document.getElementById('vagas-restantes-header');
    const progressElement = document.getElementById('progress-bar-inner');
    const notificationElement = document.getElementById('social-proof-notification');
    const activeMembersElement = document.getElementById('active-members-count');
    if (!vagasElement || !progressElement || !notificationElement || !activeMembersElement) return;

    // --- Configurações ---
    const TOTAL_VAGAS = 250, VENDA_A_CADA_X_MINUTOS = 45, VAGAS_INICIAIS_MIN = 55, VAGAS_INICIAIS_MAX = 75, VAGAS_MINIMAS = 7;
    const STORAGE_KEY = 'primordial_scarcity_state';

    // O objeto 'state' será nossa única fonte da verdade
    let state; 

    // --- Funções Auxiliares ---
    const showNotification = (message) => {
        notificationElement.innerHTML = `<p>${message}</p>`;
        notificationElement.classList.add('show');
        setTimeout(() => notificationElement.classList.remove('show'), 5000);
    };
    
    const updateDisplay = () => {
        // Verificação para garantir que não exibimos NaN
        if (isNaN(state.vagasAtuais) || isNaN(state.membrosAtivos)) {
            console.error("ERRO: Tentativa de exibir NaN. Resetando o estado.");
            localStorage.removeItem(STORAGE_KEY); // Limpa o estado corrompido
            location.reload(); // Recarrega a página para um novo começo
            return;
        }
        vagasElement.textContent = state.vagasAtuais;
        const percentual = ((TOTAL_VAGAS - state.vagasAtuais) / TOTAL_VAGAS) * 100;
        progressElement.style.width = percentual + '%';
    };

    const animateCountUp = (element, startValue, finalValue, duration = 1500) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (finalValue - startValue) + startValue);
            element.textContent = `${currentValue}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const simularVenda = () => {
    if (state.vagasAtuais <= VAGAS_MINIMAS) return;
    
    // 1. Atualiza os números no nosso objeto de estado
    state.vagasAtuais--;
    state.membrosAtivos++;
    state.lastUpdate = Date.now();
    
    // 2. Salva o novo estado para persistência
    saveToStorage(STORAGE_KEY, state);

    // 3. Atualiza a exibição de AMBOS os contadores na tela
    updateDisplay(); // Esta função já atualiza as vagas
    activeMembersElement.textContent = `${state.membrosAtivos}`; // <-- CORREÇÃO: Esta linha atualiza os membros a cada venda.

    // 4. Mostra a notificação de compra
    const comprador = compradoresDB[Math.floor(Math.random() * compradoresDB.length)];
    showNotification(`<span class="notification-name">${comprador.name}</span> de ${comprador.location} acaba de garantir sua vaga!`);
};

    // --- Lógica de Inicialização Robusta ---
    const currentState = getFromStorage(STORAGE_KEY);
    
    // Validação: O estado existe e tem as propriedades que esperamos como números?
    if (currentState && typeof currentState.vagasAtuais === 'number' && typeof currentState.membrosAtivos === 'number') {
        // --- LÓGICA PARA USUÁRIO RECORRENTE COM ESTADO VÁLIDO ---
        state = currentState;
        const tempoDecorrido = Date.now() - state.lastUpdate;
        const vendasSimuladas = Math.floor(tempoDecorrido / (1000 * 60 * VENDA_A_CADA_X_MINUTOS));
        
        if (vendasSimuladas > 0) {
            state.vagasAtuais = Math.max(VAGAS_MINIMAS, state.vagasAtuais - vendasSimuladas);
            state.membrosAtivos = TOTAL_VAGAS - state.vagasAtuais + 37; // Recalcula membros com base nas novas vagas
        }
    } else {
        // --- LÓGICA PARA PRIMEIRA VISITA OU ESTADO CORROMPIDO ---
        const vagasIniciais = Math.floor(Math.random() * (VAGAS_INICIAIS_MAX - VAGAS_INICIAIS_MIN + 1)) + VAGAS_INICIAIS_MIN;
        state = {
            vagasAtuais: vagasIniciais,
            membrosAtivos: TOTAL_VAGAS - vagasIniciais + 37,
            lastUpdate: Date.now()
        };
    }
    
    // Anima o contador apenas quando a seção se torna visível
    const communityModule = document.getElementById('community-module');
    if (communityModule) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const startValue = parseInt(activeMembersElement.textContent.replace('+', '')) || state.membrosAtivos - 10; // Valor inicial seguro
                    animateCountUp(activeMembersElement, startValue, state.membrosAtivos);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(communityModule);
    }
    
    // Atualiza a UI e salva o estado inicial/calculado
    updateDisplay();
    state.lastUpdate = Date.now();
    saveToStorage(STORAGE_KEY, state);

    // Agenda vendas futuras
    const scheduleNextSale = () => {
        const randomDelay = Math.random() * (35000 - 20000) + 20000;
        setTimeout(() => {
            simularVenda();
            scheduleNextSale();
        }, randomDelay);
    };
    
    setTimeout(scheduleNextSale, 15000);
}

    // --- MÓDULO 4: SISTEMA DE COMENTÁRIOS COM FILTRO ---
    function initCommentSystem() {
        const listElement = document.getElementById('primordial-comments-list');
        const template = document.getElementById('comment-template');
        const filterContainer = document.getElementById('comment-filter-container');
        const notificationElement = document.getElementById('social-proof-notification');
        if (!listElement || !template || !filterContainer || !notificationElement) return;

        const SEEN_KEY = 'primordial_seen_comments', LIKED_KEY = 'primordial_liked_comments', CACHE_KEY = 'primordial_likes_cache', VISIT_KEY = 'primordial_last_visit';
        let activeFilter = 'recentes';

        const generateUsername = (name) => {
    // Função auxiliar para remover acentos e caracteres especiais
    const slugify = (text) => {
        return text.toString().toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove acentos
    };

    const parts = name.split(' ');
    const firstName = slugify(parts[0]);
    const lastName = parts.length > 1 ? slugify(parts[parts.length - 1]) : '';

    // Define diferentes padrões de username
    const patterns = [
        // Padrão 1: joao.p
        (f, l) => l ? `${f}.${l.charAt(0)}` : f,
        // Padrão 2: joaopaulo
        (f, l) => `${f}${l}`,
        // Padrão 3: j_paulo
        (f, l) => l ? `${f.charAt(0)}_${l}` : f,
        // Padrão 4: joao_78
        (f, l) => `${f}_${Math.floor(Math.random() * 90) + 10}`,
        // Padrão 5: JP_Oficial
        (f, l) => l ? `${f.charAt(0).toUpperCase()}${l.charAt(0).toUpperCase()}_Oficial` : f.toUpperCase(),
        // Padrão 6: Apenas o primeiro nome, capitalizado
        (f, l) => f.charAt(0).toUpperCase() + f.slice(1)
    ];

    // Escolhe um padrão aleatoriamente e o aplica
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    return randomPattern(firstName, lastName);
};
        
        const allCommentsData = compradoresDB.map((comprador, index) => ({
            id: 101 + index,
            username: generateUsername(comprador.name),
            text: commentTemplates[index % commentTemplates.length],
            originalTimestamp: new Date(Date.now() - ((2 + (index % 28)) * 24 * 3600 * 1000) - (Math.random() * 12 * 3600 * 1000)).toISOString(),
            initialLikes: 15 + Math.floor(Math.random() * 200)
        }));
        
        const staticComments = allCommentsData.slice(0, 30);
        const dynamicCommentPool = allCommentsData.slice(30);

        const simulateLikes = (base, ts) => {
            const hoursSincePost = (Date.now() - new Date(ts).getTime()) / (1000 * 3600);
            if (hoursSincePost < 24) {
                return Math.floor(hoursSincePost * (Math.random() * 5 + 1));
            }
            return base + Math.floor(hoursSincePost * (Math.random() * 0.5 + 0.1));
        };
        const formatTime = (ts) => {
            const seconds = Math.round((Date.now() - new Date(ts).getTime()) / 1000);
            if (seconds < 5) return 'agora mesmo';
            const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
            const intervals = [{ u: 'year', v: 31536000 }, { u: 'month', v: 2592000 }, { u: 'day', v: 86400 }, { u: 'hour', v: 3600 }, { u: 'minute', v: 60 }, { u: 'second', v: 1 }];
            for (const i of intervals) {
                const amount = Math.floor(seconds / i.v);
                if (amount >= 1) return rtf.format(-amount, i.u);
            }
            return 'há poucos segundos';
        };

        const createCommentEl = (comment) => {
            const el = template.content.cloneNode(true).querySelector('.mural-post');
            const liked = (getFromStorage(LIKED_KEY) || {})[comment.id];
            const likesCache = getFromStorage(CACHE_KEY) || {};
            let likeCount = likesCache[comment.id] || simulateLikes(comment.initialLikes, comment.timestamp);
            if (liked && !likesCache[comment.id]) likeCount++;
            likesCache[comment.id] = likeCount;
            el.dataset.id = comment.id;
            el.querySelector('.post-username').textContent = comment.username;
            el.querySelector('.post-body p').textContent = `"${comment.text}"`;
            el.querySelector('.post-timestamp').textContent = formatTime(comment.timestamp);
            el.querySelector('.post-like-button .like-count').textContent = likeCount;
            if (liked) el.querySelector('.post-like-button').classList.add('is-liked');
            el.querySelector('.post-avatar').innerHTML = `<img src="https://i.pravatar.cc/50/50?u=${comment.id}" alt="Avatar">`;
            saveToStorage(CACHE_KEY, likesCache);
            return el;
        };

        const renderMural = (filter) => {
            listElement.innerHTML = '';
            const seen = getFromStorage(SEEN_KEY) || {};
            let commentsToDisplay;

            if (filter === 'relevantes') {
                commentsToDisplay = staticComments.map(c => ({
                    ...c,
                    timestamp: c.originalTimestamp,
                    likeCount: (getFromStorage(CACHE_KEY) || {})[c.id] || simulateLikes(c.initialLikes, c.originalTimestamp)
                })).sort((a, b) => b.likeCount - a.likeCount);
            } else { // 'recentes'
                const impulseToRender = dynamicCommentPool
                    .filter(c => seen[c.id])
                    .map(c => ({...c, timestamp: seen[c.id]}));
                
                commentsToDisplay = impulseToRender
                    .map(c => ({ ...c, likeCount: (getFromStorage(CACHE_KEY) || {})[c.id] || simulateLikes(c.initialLikes, c.timestamp) }))
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            }

            if(commentsToDisplay.length === 0) {
                const message = filter === 'relevantes' ? "Nenhum testemunho encontrado." : "Nenhum comentário adicionado ainda. Fique de olho!";
                listElement.innerHTML = `<p class="no-comments-message">${message}</p>`;
            } else {
                commentsToDisplay.forEach(c => {
                    const el = createCommentEl(c);
                    listElement.appendChild(el);
                    setTimeout(() => el.classList.add('is-visible'), 50);
                });
            }
        };

        const handleLike = ({target}) => {
            const btn = target.closest('.post-like-button');
            if(!btn) return;
            const post = btn.closest('.mural-post');
            const id = post.dataset.id;
            const countEl = btn.querySelector('.like-count');
            let count = parseInt(countEl.textContent);
            const liked = getFromStorage(LIKED_KEY) || {};
            if(liked[id]){ delete liked[id]; btn.classList.remove('is-liked'); countEl.textContent = --count; }
            else { liked[id] = true; btn.classList.add('is-liked'); countEl.textContent = ++count; }
            saveToStorage(LIKED_KEY, liked);
        };

        const handleFilter = ({target}) => {
            const btn = target.closest('.filter-button');
            if(!btn || btn.classList.contains('active')) return;
            activeFilter = btn.dataset.filter;
            filterContainer.querySelector('.active').classList.remove('active');
            btn.classList.add('active');
            renderMural(activeFilter);
        };

        const showNewCommentNotification = (comment) => {
            const truncateText = (text, maxLength = 60) => text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
            notificationElement.innerHTML = `<p><span class="notification-name">${comment.username}</span> comentou: "${truncateText(comment.text)}"</p>`;
            notificationElement.classList.add('show');
            setTimeout(() => notificationElement.classList.remove('show'), 5000);
        };
        
        const showNewDynamicComment = (comment) => {
            showNewCommentNotification(comment);
            setTimeout(() => {
                const currentSeen = getFromStorage(SEEN_KEY) || {};
                currentSeen[comment.id] = Date.now();
                saveToStorage(SEEN_KEY, currentSeen);
                renderMural(activeFilter);
            }, 1000);
        };

        const scheduleNewComments = () => {
            const seen = getFromStorage(SEEN_KEY) || {};
            const unseen = dynamicCommentPool.filter(c => !seen[c.id]);
            if(unseen.length === 0) return;

            const toShow = unseen.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);
            let delay = 20000;
            toShow.forEach(comment => {
                setTimeout(() => showNewDynamicComment(comment), delay);
                delay += Math.random() * (40000 - 20000) + 20000;
            });
        };
        
        const seedRecentComments = () => {
            let seen = getFromStorage(SEEN_KEY);
            if (seen) return;
            
            seen = {};
            const amountToSeed = Math.floor(Math.random() * (12 - 5 + 1)) + 5;
            const commentsToSeed = dynamicCommentPool.sort(() => 0.5 - Math.random()).slice(0, amountToSeed);
            
            commentsToSeed.forEach(comment => {
                const randomTimeInPast24h = Date.now() - Math.floor(Math.random() * 23 * 3600 * 1000);
                seen[comment.id] = randomTimeInPast24h;
            });
            saveToStorage(SEEN_KEY, seen);
        };

        seedRecentComments();
        renderMural(activeFilter);
        scheduleNewComments();
        listElement.addEventListener('click', handleLike);
        filterContainer.addEventListener('click', handleFilter);
        saveToStorage(VISIT_KEY, Date.now());
    }
});

// Adicione esta nova função ao seu script.js

function initObrigadoPage() {
    const feedbackForm = document.getElementById('feedback-form');
    if (!feedbackForm) return; // Só executa se o formulário existir na página

    const formContainer = document.getElementById('feedback-form-container');
    const successMessage = document.getElementById('form-success-message');
    const nameInput = document.getElementById('feedback-name');
    const textInput = document.getElementById('feedback-text');

    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const userName = nameInput.value.trim();
        const userText = textInput.value.trim();

        if (userName === '' || userText === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Cria o objeto do comentário do usuário
        const userComment = {
            id: 'user_' + Date.now(), // ID único para o comentário do usuário
            username: userName,
            text: userText,
            type: 'impulso', // Classifica como um comentário de impulso
            isUserComment: true // Um marcador para identificar facilmente este comentário
        };

        // Salva o comentário no localStorage para uso futuro na página de vendas
        saveToStorage('primordial_user_comment', userComment);

        // Fornece o feedback visual
        formContainer.style.display = 'none';
        successMessage.style.display = 'block';
    });
}
