// static/js/script.js (VERSÃO FINAL E FUNCIONAL - PRIMORDIAL)

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Função principal que inicializa todas as funcionalidades da página Primordial.
     */
    function setupPrimordialPage() {
        initAccordion();
        initScrollAnimations();
        initDynamicScarcity();
        initCommentSystem(); // <<< Ativa a nova função de comentários
    }

    // --- DEFINIÇÃO DAS FUNÇÕES ---

    function initAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        if (accordionItems.length > 0) {
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                header.addEventListener('click', () => {
                    const content = item.querySelector('.accordion-content');
                    header.classList.toggle('active');
                    content.style.maxHeight = header.classList.contains('active') ? content.scrollHeight + 'px' : null;
                });
            });
        }
    }

    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.anim-on-scroll');
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
    }

    function initDynamicScarcity() {
        const onlineCountElement = document.getElementById('pessoas-online');
        const vagasHeaderElement = document.getElementById('vagas-restantes-header');
        const notificationElement = document.getElementById('social-proof-notification');
        const progressBar = document.getElementById('progress-bar-inner');
        
        if (!onlineCountElement || !vagasHeaderElement || !notificationElement || !progressBar) return;

        let onlineCount = 157;
        function updateOnlineCount() {
            const variation = Math.floor(Math.random() * 7) - 3;
            onlineCount += variation;
            if (onlineCount < 110) onlineCount = 110;
            if (onlineCount > 190) onlineCount = 190;
            onlineCountElement.textContent = onlineCount;
        }
        setInterval(updateOnlineCount, 3000);

        const fakePurchases = [
            { name: 'Juliana R.'}, { name: 'Camila O.'}, { name: 'Beatriz L.'}, { name: 'Fernanda C.'},
            { name: 'Amanda S.'}, { name: 'Letícia M.'}, { name: 'Mariana F.'}, { name: 'Carla B.'}, { name: 'Sofia A.'}
        ];

        let vagasAtuais; 
        const totalVagas = 50;

        function initPersistentScarcity() {
            const vagasSalvas = localStorage.getItem('primordialVagasAtuais');
            if (vagasSalvas && parseInt(vagasSalvas) > 3) {
                vagasAtuais = parseInt(vagasSalvas, 10);
            } else {
                vagasAtuais = Math.floor(Math.random() * (45 - 35 + 1)) + 35;
                localStorage.setItem('primordialVagasAtuais', vagasAtuais);
            }
            updateVagasDisplay();
            scheduleNextPurchase();
        }

        function updateVagasDisplay() {
            vagasHeaderElement.textContent = vagasAtuais;
            const vagasPreenchidas = totalVagas - vagasAtuais;
            const percentualPreenchido = (vagasPreenchidas / totalVagas) * 100;
            progressBar.style.width = percentualPreenchido + '%';
        }

        function showPurchaseNotification() {
            if (vagasAtuais <= 3) return;
            
            const purchase = fakePurchases[Math.floor(Math.random() * fakePurchases.length)];
            notificationElement.innerHTML = `<p><span class="notification-name">✨ ${purchase.name}</span> acaba de conquistar seu lugar na Irmandade Primordial.</p>`;
            notificationElement.classList.add('show');
            
            vagasAtuais--;
            localStorage.setItem('primordialVagasAtuais', vagasAtuais);
            updateVagasDisplay();
            
            setTimeout(() => {
                notificationElement.classList.remove('show');
            }, 5000);
        }

        function scheduleNextPurchase() {
            const randomDelay = Math.random() * (40000 - 20000) + 20000;
            setTimeout(() => {
                showPurchaseNotification();
                scheduleNextPurchase();
            }, randomDelay);
        }
        
        initPersistentScarcity();
    }

    /**
     * Função da Prova Social com Comentários (PRIMORDIAL)
     */
    function initCommentSystem() {
        const commentsList = document.getElementById('primordial-comments-list');
        if (!commentsList) return;

        const allRelatos = [
            { username: 'Ricardo M.', text: "Apliquei o conceito do Módulo 3 na mesma noite. A mudança na reação dela foi... palpável. Deixei de ser o 'cara legal' pra ser o cara que ela não conseguia decifrar. Jogo virou." },
            { username: 'Lobo_Alfa_7', text: "Aquele 'nó na garganta' que eu sentia antes de abordar uma mulher? Sumiu. Não sei explicar. É como se o medo da rejeição simplesmente se tornasse irrelevante. Consegui o número daquela morena da academia hoje." },
            { username: 'Fernando S.', text: "O mais louco não é nem as mulheres. É como outros homens mudaram o jeito que me tratam. No trabalho, na roda de amigos. A postura muda, a voz muda, e o mundo responde." },
            { username: 'Bruno C.', text: "Alerta de resultado: 3 semanas no Primordial. Tinha uma conversa empacada no WhatsApp. Usei o princípio da 'imprevisibilidade' do módulo 3. A conversa que tava morta virou um encontro marcado pra sexta." },
            { username: 'Marcos T.', text: "Eu era o 'bom moço'. O terapeuta das minhas amigas. Depois de executar o 'Ritual de Ruptura', uma amiga que sempre me contava dos caras que ela saía me olhou diferente e disse 'nossa, você tá... diferente'." },
            { username: 'Tiago P.', text: "Pra quem tá na dúvida: o dinheiro que eu gastava com bebida no fim de semana pra tentar 'criar coragem' já pagou o Primordial. Só que a coragem que eu tenho agora não passa na segunda-feira." },
            { username: 'André V.', text: "O bônus do 'Mapa da Neurodominância' sozinho já vale o investimento. Entender o ciclo da dopamina e como o celular e a pornografia estavam me transformando num zumbi apático... abriu meus olhos." },
            { username: 'Caio L.', text: "O 'não' que eu dei pro meu pai hoje, sem me sentir culpado, foi a maior vitória da minha vida adulta até agora. Obrigado por isso." },
            { username: 'Fábio S.', text: 'O Mapa da Neurodominância sozinho já vale o investimento. Entender como a dopamina funciona e parar de se sabotar com prazeres baratos mudou meu foco e minha disciplina em tudo.'},
            { username: 'Marcos P.', text: 'A sensação de entrar num lugar e não se sentir invisível. De ver ela te olhando ANTES de você olhar. Não tem preço. É isso. O resto é consequência.'},
            { username: 'Rafael A.', text: 'Cansei de ser o \'porto seguro\' que elas procuram pra desabafar sobre os caras que elas realmente desejam. Hoje, eu sou o cara.'},
            { username: 'Sérgio K.', text: 'O mais louco é que funciona com todas as idades. Apliquei os princípios com mulheres mais novas e mais velhas. É biologia, não tem como argumentar.'},
            { username: 'Pedro H.', text: 'Minha ex me viu numa festa outro dia... o jeito que ela me olhou, tentando entender o que tinha mudado... aquele olhar valeu cada centavo.'}
        ];

        function generateConsistentDate(name) {
            let hash = 0;
            for (let i = 0; i < name.length; i++) { hash = name.charCodeAt(i) + ((hash << 5) - hash); }
            const daysAgo = (Math.abs(hash) % 25) + 2;
            const date = new Date();
            date.setDate(date.getDate() - daysAgo);
            return date;
        }

        function formatTimeAgo(date) {
            const now = new Date();
            const seconds = Math.floor((now - date) / 1000);
            let interval = seconds / 86400;
            if (interval > 1) return `há ${Math.floor(interval)} dias`;
            interval = seconds / 3600;
            if (interval > 1) return `há ${Math.floor(interval)} horas`;
            return 'há poucos segundos';
        }

        function addPrimordialComment(post, isNew = false) {
            const postDiv = document.createElement('div');
            postDiv.className = 'mural-post';
            const timeAgo = isNew ? formatTimeAgo(new Date()) : formatTimeAgo(generateConsistentDate(post.username));
            postDiv.innerHTML = `
                <div class="post-header">
                    <img src="/static/img/avatar-placeholder.png" alt="Avatar" class="post-avatar">
                    <span class="post-username">${post.username}</span>
                    <span class="post-timestamp">${timeAgo}</span>
                </div>
                <div class="post-body"><p>"${post.text}"</p></div>`;
            if (isNew) {
                commentsList.prepend(postDiv);
            } else {
                commentsList.appendChild(postDiv);
            }
            // Adiciona a classe para a animação de entrada do CSS
            setTimeout(() => postDiv.classList.add('is-visible'), 50);
        }
        
        const initialPosts = allRelatos.slice(0, 10);
        let remainingPosts = allRelatos.slice(10);
        
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(remainingPosts);
        let newPostIndex = 0;

        initialPosts.forEach(post => addPrimordialComment(post, false));

        function scheduleNextPost() {
            const randomDelay = Math.random() * (80000 - 40000) + 40000;
            setTimeout(() => {
                if (newPostIndex < 5 && newPostIndex < remainingPosts.length) {
                    addPrimordialComment(remainingPosts[newPostIndex], true);
                    newPostIndex++;
                    scheduleNextPost();
                }
            }, randomDelay);
        }
        setTimeout(scheduleNextPost, 25000);
    }

    // --- EXECUTA A FUNÇÃO DE INICIALIZAÇÃO DA PÁGINA ---
    initPage();
});
