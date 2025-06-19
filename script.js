document.addEventListener('DOMContentLoaded', () => {

    // --- FUNÇÃO DO ACORDEÃO ---
    const accordionItems = document.querySelectorAll('.accordion-item');
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

    // --- FUNÇÃO PARA ANIMAÇÕES AO ROLAR A PÁGINA ---
    const animatedElements = document.querySelectorAll('.anim-on-scroll');
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

    // ==========================================================
    // --- SISTEMA DINÂMICO DE PROVA SOCIAL E ESCASSEZ (VERSÃO CORRIGIDA) ---
    // ==========================================================

    const onlineCountElement = document.getElementById('pessoas-online');
    const vagasHeaderElement = document.getElementById('vagas-restantes-header');
    const notificationElement = document.getElementById('social-proof-notification');
    const progressBar = document.getElementById('progress-bar-inner');

    // Verifica se TODOS os elementos necessários existem antes de rodar a lógica
    if (onlineCountElement && vagasHeaderElement && notificationElement && progressBar) {

        // --- LÓGICA DO CONTADOR DE PESSOAS ONLINE ---
        let onlineCount = 137;
        function updateOnlineCount() {
            const variation = Math.floor(Math.random() * 7) - 3;
            onlineCount += variation;
            if (onlineCount < 110) onlineCount = 110;
            if (onlineCount > 190) onlineCount = 190;
            onlineCountElement.textContent = onlineCount;
        }
        setInterval(updateOnlineCount, 2500);
        
        // --- LÓGICA DAS VAGAS E NOTIFICAÇÕES ---
        // Banco de dados FAKE de compras (versão com 100 entradas)
const fakePurchases = [
    // Seus 20 originais
    { name: 'João Paulo', location: 'São Paulo, SP' },
    { name: 'Lucas Gonçalves', location: 'João Monlevade, MG' },
    { name: 'Matheus Francisco', location: 'Caxias do Sul, RS' },
    { name: 'Guilherme Toscano', location: 'Curitiba, PR' },
    { name: 'Ricardo Alexandre', location: 'Salvador, BA' },
    { name: 'Fernando Maciel', location: 'Juazeiro, BA' },
    { name: 'Vinícius Cordeiro', location: 'Fortaleza, CE' },
    { name: 'Diego Lopes', location: 'Manaus, AM' },
    { name: 'Daniel Ribeiro', location: 'Goiânia, GO' },
    { name: 'Marcelo Veiga', location: 'Belém, PA' },
    { name: 'André Bittencourt', location: 'Rio das Ostras, RJ' },
    { name: 'Fábio Santos', location: 'Florianópolis, SC' },
    { name: 'Rodrigo Oliveira', location: 'Vitória, ES' },
    { name: 'Alexandre Juarez', location: 'São Luís, MA' },
    { name: 'Leandro Dionatas', location: 'Campina Grande, PB' },
    { name: 'Sérgio K.', location: 'Limeira, SP' },
    { name: 'Reinivaldo Cerqueira', location: 'Natal, RN' },
    { name: 'Roberto Almeida', location: 'João Pessoa, PB' },
    { name: 'Caio Garcez', location: 'Lauro de Freitas, BA' },
    { name: 'Igor Venancio', location: 'Lagarto, SE' },
    // 80 novas entradas
    { name: 'Bruno Costa', location: 'Niterói, RJ' },
    { name: 'Pedro Henrique', location: 'Uberlândia, MG' },
    { name: 'Rafael Almeida', location: 'Campinas, SP' },
    { name: 'Thiago Lima', location: 'Maceió, AL' },
    { name: 'Davi Martins', location: 'Teresina, PI' },
    { name: 'Gabriel Pereira', location: 'Aracaju, SE' },
    { name: 'Felipe Rocha', location: 'Duque de Caxias, RJ' },
    { name: 'Gustavo Ribeiro', location: 'São José dos Campos, SP' },
    { name: 'Eduardo Carvalho', location: 'Ribeirão Preto, SP' },
    { name: 'Leonardo F.', location: 'Sorocaba, SP' },
    { name: 'Carlos Eduardo', location: 'Contagem, MG' },
    { name: 'Vitor Hugo', location: 'Juiz de Fora, MG' },
    { name: 'Samuel Alves', location: 'Londrina, PR' },
    { name: 'Júlio César', location: 'Joinville, SC' },
    { name: 'Márcio Dutra', location: 'Blumenau, SC' },
    { name: 'Elias V.', location: 'Pelotas, RS' },
    { name: 'Renato Mendes', location: 'Canoas, RS' },
    { name: 'Alan Soares', location: 'Campo Grande, MS' },
    { name: 'David Teixeira', location: 'Cuiabá, MT' },
    { name: 'Sandro Pires', location: 'Várzea Grande, MT' },
    { name: 'Wesley Neves', location: 'Aparecida de Goiânia, GO' },
    { name: 'Otávio Barbosa', location: 'Anápolis, GO' },
    { name: 'Benício M.', location: 'Porto Velho, RO' },
    { name: 'Cauã Castro', location: 'Rio Branco, AC' },
    { name: 'Erick Matos', location: 'Macapá, AP' },
    { name: 'Enzo Gabriel', location: 'Boa Vista, RR' },
    { name: 'Davi Lucca', location: 'Palmas, TO' },
    { name: 'Arthur Cunha', location: 'Marabá, PA' },
    { name: 'Miguel Arantes', location: 'Imperatriz, MA' },
    { name: 'Heitor Pinto', location: 'Mossoró, RN' },
    { name: 'Bernardo Ramos', location: 'Petrolina, PE' },
    { name: 'Dante Moreira', location: 'Caruaru, PE' },
    { name: 'Gael Farias', location: 'Olinda, PE' },
    { name: 'Théo Barros', location: 'Vitória da Conquista, BA' },
    { name: 'Breno Nogueira', location: 'Feira de Santana, BA' },
    { name: 'Isaac Dias', location: 'Camaçari, BA' },
    { name: 'Cauê Macedo', location: 'Serra, ES' },
    { name: 'Luiz Felipe', location: 'Vila Velha, ES' },
    { name: 'Otávio Neto', location: 'Betim, MG' },
    { name: 'Benjamin F.', location: 'Montes Claros, MG' },
    { name: 'Antônio Carlos', location: 'Petrópolis, RJ' },
    { name: 'Francisco Dias', location: 'Campos dos Goytacazes, RJ' },
    { name: 'Emanuel Fogaça', location: 'São Vicente, SP' },
    { name: 'Ryan Guedes', location: 'Guarujá, SP' },
    { name: 'Lucca Viana', location: 'Taubaté, SP' },
    { name: 'Levi Siqueira', location: 'Bauru, SP' },
    { name: 'Noah P.', location: 'Maringá, PR' },
    { name: 'Bento Correia', location: 'Ponta Grossa, PR' },
    { name: 'Valentim B.', location: 'Cascavel, PR' },
    { name: 'Joaquim Esteves', location: 'Foz do Iguaçu, PR' },
    { name: 'Augusto Werner', location: 'Chapecó, SC' },
    { name: 'Frederico L.', location: 'Itajaí, SC' },
    { name: 'Tomás Xavier', location: 'Criciúma, SC' },
    { name: 'Ravi Silveira', location: 'Passo Fundo, RS' },
    { name: 'Luan Medeiros', location: 'Santa Maria, RS' },
    { name: 'Vicente Reis', location: 'Novo Hamburgo, RS' },
    { name: 'Martim Guerra', location: 'Dourados, MS' },
    { name: 'Estevão Teles', location: 'Rondonópolis, MT' },
    { name: 'Gregório J.', location: 'Marília, SP' },
    { name: 'Abelardo Nunes', location: 'Piracicaba, SP' },
    { name: 'Américo Brandão', location: 'Franca, SP' },
    { name: 'César Quintela', location: 'Araraquara, SP' },
    { name: 'Dinis Pimentel', location: 'Volta Redonda, RJ' },
    { name: 'Eliseu Frota', location: 'Governador Valadares, MG' },
    { name: 'Gaspar Diniz', location: 'Ipatinga, MG' },
    { name: 'Ícaro Portela', location: 'Sete Lagoas, MG' },
    { name: 'Jacinto Almeida', location: 'Divinópolis, MG' },
    { name: 'Lauro Gusmão', location: 'Poços de Caldas, MG' },
    { name: 'Moisés Guedes', location: 'Pouso Alegre, MG' },
    { name: 'Nataniel Chaves', location: 'Barueri, SP' },
    { name: 'Osvaldo Queiroz', location: 'Embu das Artes, SP' },
    { name: 'Plínio Salgado', location: 'Itapecerica da Serra, SP' },
    { name: 'Rômulo T.', location: 'Santana de Parnaíba, SP' },
    { name: 'Telmo Castilho', location: 'Jundiaí, SP' },
    { name: 'Ulisses Mourão', location: 'Indaiatuba, SP' },
    { name: 'Valdemar Rios', location: 'Cotia, SP' },
    { name: 'Xavier Padrão', location: 'Suzano, SP' }
];

        const totalVagas = 50;
        let vagasAtuais = Math.floor(Math.random() * (24 - 12 + 1)) + 12;

        function updateVagasDisplay() {
            vagasHeaderElement.textContent = vagasAtuais;
            const vagasPreenchidas = totalVagas - vagasAtuais;
            const percentualPreenchido = (vagasPreenchidas / totalVagas) * 100;
            progressBar.style.width = percentualPreenchido + '%';
        }

        // Define o estado inicial assim que a página carrega
        updateVagasDisplay();

        function showNotification() {
            if (vagasAtuais <= 3) return;

            const randomIndex = Math.floor(Math.random() * fakePurchases.length);
            const purchase = fakePurchases[randomIndex];
            
            notificationElement.innerHTML = `<p><span class="notification-name">${purchase.name}</span> de ${purchase.location} acaba de garantir sua vaga na Irmandade Primordial.</p>`;
            notificationElement.classList.add('show');

            vagasAtuais--;
            updateVagasDisplay(); // Atualiza tanto o número quanto a barra

            setTimeout(() => {
                notificationElement.classList.remove('show');
            }, 5000);
            
            scheduleNextNotification();
        }

        function scheduleNextNotification() {
            const randomDelay = Math.random() * (25000 - 8000) + 8000;
            setTimeout(showNotification, randomDelay);
        }

        setTimeout(scheduleNextNotification, 8000);
    }
});
