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

        // Prova Social e Escassez Dinâmica
        if (onlineCountElement && vagasHeaderElement && notificationElement && progressBar) {
            let onlineCount = 157;
            function updateOnlineCount() {
                const variation = Math.floor(Math.random() * 7) - 3;
                onlineCount += variation;
                if (onlineCount < 110) onlineCount = 110;
                if (onlineCount > 190) onlineCount = 190;
                onlineCountElement.textContent = onlineCount;
            }
            setInterval(updateOnlineCount, 2500);
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
    { name: 'Xavier Padrão', location: 'Suzano, SP' },
    { name: 'Aarão Bentes', location: 'Santarém, PA' },
    { name: 'Adriano Peixoto', location: 'Ananindeua, PA' },
    { name: 'Afonso Mourão', location: 'Caucaia, CE' },
    { name: 'Alcides Varela', location: 'Maracanaú, CE' },
    { name: 'Amadeu Benites', location: 'Jaboatão dos Guararapes, PE' },
    { name: 'Aníbal Silveira', location: 'Paulista, PE' },
    { name: 'Anselmo Tavares', location: 'Arapiraca, AL' },
    { name: 'Bartolomeu R.', location: 'Parnamirim, RN' },
    { name: 'Bento Guerra', location: 'Maranguape, CE' },
    { name: 'Caetano Veloso', location: 'Santo Amaro, BA' },
    { name: 'Casimiro Arruda', location: 'Itabuna, BA' },
    { name: 'Ciro Pimentel', location: 'Ilhéus, BA' },
    { name: 'Cláudio Dantas', 'location': 'Porto Seguro, BA' },
    { name: 'Cornélio Furtado', location: 'Juazeiro do Norte, CE' },
    { name: 'Cosme Távora', location: 'Sobral, CE' },
    { name: 'Damião Pires', location: 'Campina Grande, PB' },
    { name: 'Delfim Moreira', location: 'Timon, MA' },
    { name: 'Demétrio Lins', location: 'Caxias, MA' },
    { name: 'Dilan P.', location: 'Crato, CE' },
    { name: 'Dino Siqueira', location: 'Iguatu, CE' },
    { name: 'Domênico Queirós', location: 'Garanhuns, PE' },
    { name: 'Donato Parente', location: 'Barreiras, BA' },
    { name: 'Edgar Moura', location: 'Jequié, BA' },
    { name: 'Edmundo Caldeira', location: 'Alagoinhas, BA' },
    { name: 'Eleutério V.', location: 'Simões Filho, BA' },
    { name: 'Eliseu Castelo', location: 'Paulo Afonso, BA' },
    { name: 'Eliézer Fontes', location: 'Arcoverde, PE' },
    { name: 'Elton Fogaça', location: 'Santa Cruz do Capibaribe, PE' },
    { name: 'Ezequiel Dorneles', location: 'Gravatá, PE' },
    { name: 'Fagundes Gusmão', location: 'Teixeira de Freitas, BA' },
    { name: 'Felício Farias', location: 'Eunápolis, BA' },
    { name: 'Felisberto Paiva', location: 'Irecê, BA' },
    { name: 'Firmino Quintão', location: 'Jacobina, BA' },
    { name: 'Flávio Bezerra', location: 'Serrinha, BA' },
    { name: 'Fortunato Bicalho', location: 'Ribeira do Pombal, BA' },
    { name: 'Galdino Rabelo', location: 'Euclides da Cunha, BA' },
    { name: 'Genaro Dorneles', location: 'Itapetinga, BA' },
    { name: 'Geraldo Guedes', location: 'Valença, BA' },
    { name: 'Gerson Castanheda', location: 'Canavieiras, BA' },
    { name: 'Getúlio Sampaio', location: 'Bom Jesus da Lapa, BA' },
    { name: 'Gildo Ximenes', location: 'Guanambi, BA' },
    { name: 'Glauco Avelar', location: 'Caetité, BA' },
    { name: 'Hilário Valadares', location: 'Brumado, BA' },
    { name: 'Honorato Aragão', location: 'Macaúbas, BA' },
    { name: 'Horácio Lacerda', location: 'Livramento de Nossa Senhora, BA' },
    { name: 'Hugo Assunção', location: 'Seabra, BA' },
    { name: 'Humberto G.', location: 'Barra, BA' },
    { name: 'Inácio Penteado', location: 'Xique-Xique, BA' },
    { name: 'Irineu Ramires', location: 'Remanso, BA' },
    { name: 'Isidoro Galvão', location: 'Casa Nova, BA' },
    { name: 'Jader Pinheiro', location: 'Senhor do Bonfim, BA' },
    { name: 'Jair Nogueira', location: 'Campo Formoso, BA' },
    { name: 'Jasmim Furtado', location: 'Capim Grosso, BA' },
    { name: 'Jeremias Barreto', location: 'Ipirá, BA' },
    { name: 'Jofre Salgado', location: 'Itaberaba, BA' },
    { name: 'Josué Teles', location: 'Cruz das Almas, BA' },
    { name: 'Judas Tadeu', location: 'Santo Antônio de Jesus, BA' },
    { name: 'Leônidas Queiroz', location: 'Amargosa, BA' },
    { name: 'Leopoldo Rios', location: 'Jaguarari, BA' },
    { name: 'Líbero Castilho', location: 'Poções, BA' },
    { name: 'Lino Padrão', location: 'Itamaraju, BA' },
    { name: 'Loreno Mourão', location: 'Medeiros Neto, BA' },
    { name: 'Lótus Guterres', location: 'Mucuri, BA' },
    { name: 'Martiniano S.', location: 'Prado, BA' },
    { name: 'Maurílio Saraiva', location: 'Caravelas, BA' },
    { name: 'Maximiano Brito', location: 'Alcobaça, BA' },
    { name: 'Melquisedeque L.', location: 'Nova Viçosa, BA' },
    { name: 'Mílton Saldaña', location: 'Itanhém, BA' },
    { name: 'Nabor Pimentel', location: 'Mundo Novo, BA' },
    { name: 'Nadir Siqueira', location: 'Morro do Chapéu, BA' },
    { name: 'Napoleão Bentes', location: 'Palmeiras, BA' },
    { name: 'Nazaré Benites', location: 'Lençóis, BA' },
    { name: 'Nélson Varela', location: 'Andaraí, BA' },
    { name: 'Nestor Arruda', location: 'Mucugê, BA' },
    { name: 'Nicanor F.', location: 'Ibicoara, BA' },
    { name: 'Nilo Castanheda', location: 'Ituaçu, BA' },
    { name: 'Oceano Guedes', location: 'Tanhaçu, BA' },
    { name: 'Olavo Rabelo', location: 'Barra da Estiva, BA' },
    { name: 'Orfeu Bicalho', location: 'Piatã, BA' },
    { name: 'Oto Gusmão', location: 'Abaíra, BA' },
    { name: 'Patrício Dorneles', location: 'Jussiape, BA' },
    { name: 'Peniel Fogaça', location: 'Rio de Contas, BA' },
    { name: 'Percival Farias', location: 'Érico Cardoso, BA' },
    { name: 'Querubim Paiva', location: 'Caturama, BA' },
    { name: 'Quintino Quintão', location: 'Botuporã, BA' },
    { name: 'Rael Teles', location: 'Paramirim, BA' },
    { name: 'Rameses Pires', location: 'Caetanos, BA' },
    { name: 'Reginaldo Salgado', location: 'Contendas do Sincorá, BA' },
    { name: 'Remo Guterres', location: 'Manoel Vitorino, BA' },
    { name: 'Salomão Mourão', location: 'Boa Nova, BA' },
    { name: 'Serafim Padrão', location: 'Dário Meira, BA' },
    { name: 'Severino Castilho', location: 'Itagi, BA' },
    { name: 'Silas Rios', location: 'Jitaúna, BA' },
    { name: 'Simplício Queiroz', location: 'Aiquara, BA' },
    { name: 'Tarcísio Brito', location: 'Apuarema, BA' },
    { name: 'Teobaldo Saraiva', location: 'Ipiaú, BA' },
    { name: 'Teodoro S.', location: 'Ibirataia, BA' },
    { name: 'Ubiratã Saldaña', location: 'Ubatã, BA' },
    { name: 'Urbano Pimentel', location: 'Gongogi, BA' },
    { name: 'Venceslau L.', location: 'Itagibá, BA' },
    { name: 'Veríssimo Bentes', location: 'Barra do Rocha, BA' },
    { name: 'Zacarias Varela', location: 'Ibirapitanga, BA' },
    { name: 'Zélio Benites', location: 'Ubaitaba, BA' },
    { name: 'Adalberto Arruda', location: 'Aurelino Leal, BA' },
    { name: 'Ademar Castanheda', location: 'Maraú, BA' },
    { name: 'Adolfo Guedes', location: 'Itacaré, BA' },
    { name: 'Agenor Rabelo', location: 'Uruçuca, BA' },
    { name: 'Alarico Bicalho', location: 'Coaraci, BA' },
    { name: 'Alcebíades G.', location: 'Almadina, BA' },
    { name: 'Altino Gusmão', location: 'Itapitanga, BA' },
    { name: 'Ambrósio Dorneles', location: 'Floresta Azul, BA' },
    { name: 'Anacleto Fogaça', location: 'Ibicaraí, BA' },
    { name: 'Anaximandro F.', location: 'Santa Cruz da Vitória, BA' },
    { name: 'Aparício Farias', location: 'Itaju do Colônia, BA' },
    { name: 'Aquiles Paiva', location: 'Firmino Alves, BA' },
    { name: 'Arcanjo Quintão', location: 'Santa Luzia, BA' },
    { name: 'Aristides Pires', location: 'Mascote, BA' },
    { name: 'Armando Salgado', location: 'Camacan, BA' },
    { name: 'Balduíno Teles', location: 'Pau Brasil, BA' },
    { name: 'Belarmino Guterres', location: 'Arataca, BA' },
    { name: 'Cândido Mourão', location: 'Jussari, BA' },
    { name: 'Crispim Padrão', location: 'São José da Vitória, BA' },
    { name: 'Deodato Castilho', location: 'Buerarema, BA' },
    { name: 'Diógenes Rios', location: 'Una, BA' },
    { name: 'Efigênio Queiroz', location: 'Canavieiras, BA' },
    { name: 'Esdras Brito', location: 'Belmonte, BA' },
    { name: 'Eufrásio Saraiva', location: 'Santa Cruz Cabrália, BA' },
    { name: 'Eusébio S.', location: 'Itabela, BA' },
    { name: 'Félix Saldaña', location: 'Guaratinga, BA' },
    { name: 'Fidélis Pimentel', location: 'Itagimirim, BA' },
    { name: 'Galileu L.', location: 'Itapebi, BA' },
    { name: 'Gedeão Bentes', location: 'Itarantim, BA' },
    { name: 'Glicério Varela', location: 'Potiraguá, BA' },
    { name: 'Godofredo Benites', location: 'Iguaí, BA' },
    { name: 'Graciliano Arruda', location: 'Nova Canaã, BA' },
    { name: 'Heráclito C.', location: 'Poções, BA' },
    { name: 'Hermes Castanheda', location: 'Planalto, BA' },
    { name: 'Hildebrando G.', location: 'Barra do Choça, BA' },
    { name: 'Iberê Guedes', location: 'Itambé, BA' },
    { name: 'Ítalo Rabelo', location: 'Itapetinga, BA' },
    { name: 'Juvêncio Bicalho', location: 'Caatiba, BA' },
    { name: 'Ladislau Gusmão', location: 'Encruzilhada, BA' },
    { name: 'Laércio Dorneles', location: 'Ribeirão do Largo, BA' },
    { name: 'Marílio Fogaça', location: 'Cândido Sales, BA' },
    { name: 'Menandro Farias', location: 'Belo Campo, BA' },
    { name: 'Nereu Paiva', location: 'Tremedal, BA' },
    { name: 'Odilon Quintão', location: 'Piripá, BA' },
    { name: 'Orestes Pires', location: 'Cordeiros, BA' },
    { name: 'Péricles Salgado', location: 'Anagé, BA' },
    { name: 'Petrônio Teles', location: 'Caraíbas, BA' },
    { name: 'Porfírio Guterres', location: 'Maetinga, BA' },
    { name: 'Querino Mourão', location: 'Presidente Jânio Quadros, BA' },
    { name: 'Radamés Padrão', location: 'Aracatu, BA' },
    { name: 'Sandoval Castilho', location: 'Malhada de Pedras, BA' },
    { name: 'Túlio Rios', location: 'Guajeru, BA' },
    { name: 'Valério Queiroz', location: 'Rio do Antônio, BA' },
    { name: 'Virgílio Brito', location: 'Ibiassucê, BA' },
    { name: 'Abraão Saraiva', location: 'Caculé, BA' },
    { name: 'Aquino S.', location: 'Licínio de Almeida, BA' },
    { name: 'Bonaventura S.', location: 'Jacaraci, BA' },
    { name: 'Celestino Saldaña', location: 'Mortugaba, BA' },
    { name: 'Clodomiro P.', location: 'Urandi, BA' },
    { name: 'Demócrito L.', location: 'Pindaí, BA' },
    { name: 'Diocleciano B.', location: 'Sebastião Laranjeiras, BA' },
    { name: 'Ezequias Varela', location: 'Palmas de Monte Alto, BA' },
    { name: 'Gedeão Benites', location: 'Iuiú, BA' },
    { name: 'Hélio Arruda', location: 'Malhada, BA' },
    { name: 'Hermínio Castanheda', location: 'Carinhanha, BA' },
    { name: 'Irineu Guedes', location: 'Feira da Mata, BA' },
    { name: 'Juvêncio Rabelo', location: 'Cocos, BA' },
    { name: 'Leovigildo Bicalho', location: 'Coribe, BA' },
    { name: 'Malaquias Gusmão', location: 'Jaborandi, BA' },
    { name: 'Nicodemos D.', location: 'Correntina, BA' },
    { name: 'Odisséu Fogaça', location: 'Santa Maria da Vitória, BA' },
    { name: 'Páris Farias', location: 'São Félix do Coribe, BA' },
    { name: 'Rurique Paiva', location: 'Santana, BA' },
    { name: 'Sócrates Quintão', location: 'Serra Dourada, BA' },
    { name: 'Telemaco Pires', location: 'Brejolândia, BA' },
    { name: 'Uriel Salgado', location: 'Tabocas do Brejo Velho, BA' },
    { name: 'Viriato Teles', location: 'Canápolis, BA' },
    { name: 'Washington G.', location: 'Serra do Ramalho, BA' },
    { name: 'Zenon Guterres', location: 'Sítio do Mato, BA' },
    { name: 'Álvaro Mourão', location: 'Oliveira dos Brejinhos, BA' },
    { name: 'Coriolano Padrão', location: 'Boquira, BA' },
    { name: 'Epaminondas C.', location: 'Macaúbas, BA' },
    { name: 'Filemon Rios', location: 'Botuporã, BA' },
    { name: 'Gedeão Queiroz', location: 'Tanque Novo, BA' },
    { name: 'Hipólito Brito', location: 'Paramirim, BA' },
    { name: 'Ismael Saraiva', location: 'Caturama, BA' },
    { name: 'Jônatas S.', location: 'Érico Cardoso, BA' },
    { name: 'Leôncio Saldaña', location: 'Rio do Pires, BA' },
    { name: 'Nestor Pimentel', location: 'Abaíra, BA' },
    { name: 'Otoniel L.', location: 'Piatã, BA' },
    { name: 'Príamo Bentes', location: 'Jussiape, BA' },
    { name: 'Rômulo Varela', location: 'Contendas do Sincorá, BA' },
    { name: 'Tibúrcio Benites', location: 'Barra da Estiva, BA' },
    { name: 'Vivaldo Arruda', location: 'Ituaçu, BA' }
];

        const totalVagas = 50;
            let vagasAtuais = Math.floor(Math.random() * (24 - 12 + 1)) + 12;

            function updateVagasDisplay() {
                vagasHeaderElement.textContent = vagasAtuais;
                const vagasPreenchidas = totalVagas - vagasAtuais;
                const percentualPreenchido = (vagasPreenchidas / totalVagas) * 100;
                progressBar.style.width = percentualPreenchido + '%';
            }

            updateVagasDisplay();

            function showNotification() {
                if (vagasAtuais <= 3) return;
                const randomIndex = Math.floor(Math.random() * fakePurchases.length);
                const purchase = fakePurchases[randomIndex];
                notificationElement.innerHTML = `<p><span class="notification-name">${purchase.name}</span> de ${purchase.location} acaba de garantir sua vaga na Irmandade Primordial.</p>`;
                notificationElement.classList.add('show');
                vagasAtuais--;
                updateVagasDisplay();
                setTimeout(() => {
                    notificationElement.classList.remove('show');
                }, 5000);
                scheduleNextNotification();
            }

            function scheduleNextNotification() {
                const randomDelay = Math.random() * (30000 - 8000) + 8000;
                setTimeout(showNotification, randomDelay);
            }

            setTimeout(scheduleNextNotification, 8000);
        }
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
// --- SISTEMA DE COMENTÁRIOS PERSISTENTE (VERSÃO 2.0) ---
// ==========================================================
function initCommentSystem() {
    const commentListElement = document.getElementById('primordial-comments-list');
    const commentTemplate = document.getElementById('comment-template');
    const notificationElement = document.getElementById('social-proof-notification');

    if (!commentListElement || !commentTemplate || !notificationElement) {
        return;
    }
    
    const LOCAL_STORAGE_KEY = 'primordial_seen_comments';

    // --- BASE DE DADOS DE COMENTÁRIOS ---
    const staticComments = [
        // Seus 10 comentários estáticos permanecem os mesmos...
        { id: 101, username: 'Ricardo.M', text: 'Mudei completamente a forma como me apresento. As pessoas notam. Chega de ser o "bonzinho".', originalTimestamp: '2025-06-28T10:00:00Z' },
        { id: 102, username: 'F_Guimarães', text: 'O módulo 2 foi um soco no estômago. Percebi o quanto eu estava me sabotando. Recomendo.', originalTimestamp: '2025-06-27T18:30:00Z' },
        { id: 103, username: 'Vitor_S', text: 'Finalmente entendi a diferença entre ser agressivo e ser um babaca. O Primordial te ensina a ser perigoso, não tóxico.', originalTimestamp: '2025-06-27T11:45:00Z' },
        { id: 104, username: 'Leo_Costa', text: 'A chave virou. Não peço mais desculpas por querer mais da vida. Energia renovada.', originalTimestamp: '2025-06-26T22:10:00Z' },
        { id: 105, username: 'Danilo.Ribeiro', text: 'Impressionante. O conteúdo sobre linguagem corporal silenciosa já valeu o investimento todo.', originalTimestamp: '2025-06-26T15:00:00Z' },
        { id: 106, username: 'G_Alves', text: 'Parei de buscar validação e comecei a construir meu próprio valor. Isso muda o jogo.', originalTimestamp: '2025-06-25T20:05:00Z' },
        { id: 107, username: 'Marcos.P', text: 'Não é mágica, é protocolo. Segui os passos e a mudança na minha rotina foi brutal.', originalTimestamp: '2025-06-25T09:00:00Z' },
        { id: 108, username: 'Thiago.Nunes', text: 'O acesso à "Irmandade" é o maior bônus. Trocar ideia com outros homens na mesma jornada não tem preço.', originalTimestamp: '2025-06-24T19:20:00Z' },
        { id: 109, username: 'Caio.F', text: 'Sentia que algo estava errado, mas não sabia o quê. O Primordial deu nome ao problema e entregou a solução.', originalTimestamp: '2025-06-24T14:15:00Z' },
        { id: 110, username: 'Bruno.Siqueira', text: 'Nunca mais serei o mesmo. E agradeço por isso. Recomendo a todos que sentem que podem ser mais.', originalTimestamp: '2025-06-23T23:55:00Z' }
    ];

    // Pool de comentários dinâmicos com textos mais engajadores
    const dynamicCommentPool = [
        { id: 201, username: 'Lucas.G', text: 'Ok, entrei. Chega de ser espectador da minha própria vida. Hora de virar protagonista.' },
        { id: 202, username: 'Rafael.O', text: 'Aquele manifesto mexeu comigo. Se for metade do que a página promete, já valeu. Vaga garantida.' },
        { id: 203, username: 'Matheus.C', text: 'Tava cético, mas a quantidade de prova aqui é surreal. Decidi dar o passo. Mais um na alcateia.' },
        { id: 204, username: 'Guilherme.T', text: 'Acabei de garantir meu acesso. O sentimento não é de comprar um curso, é de entrar pra uma guerra.' },
        { id: 205, username: 'Felipe.A', text: 'É isso. Investimento feito na única coisa que importa: eu mesmo. Ansioso pra começar a transformação.' },
        { id: 206, username: 'Rodrigo.V', text: 'Comprado! A parte de "recalibração neurobiológica" me pegou. Parece ser mais profundo que o resto.' },
        { id: 207, username: 'Eduardo.P', text: 'Hesitei por 10 minutos. Pensei: "Daqui a um ano, vou me arrepender de não ter tentado?". A resposta foi óbvia. Estou dentro.' },
        { id: 208, username: 'Sérgio.L', text: 'Chega de ser o "cara legal" que fica na friendzone. Se é pra ser perigoso, que comece agora. Inscrição feita.' }
    ];

    // --- FUNÇÕES HELPER ---

    function formatTimeAgo(date) {
        const now = new Date();
        const seconds = Math.round((now - new Date(date)) / 1000);

        if (seconds < 5) return 'agora mesmo';

        const intervals = [
            { value: 31536000, unit: 'year' }, { value: 2592000, unit: 'month' },
            { value: 86400, unit: 'day' }, { value: 3600, unit: 'hour' },
            { value: 60, unit: 'minute' }, { value: 1, unit: 'second' }
        ];
        const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });

        for (const interval of intervals) {
            const amount = Math.floor(seconds / interval.value);
            if (amount >= 1) return rtf.format(-amount, interval.unit);
        }
        return 'há poucos segundos';
    }

    function getSeenCommentsData() {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    }

    function setSeenCommentsData(data) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
    
    /** Trunca o texto para a notificação */
    function truncateText(text, maxLength = 60) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    function renderComment(commentData, timestamp, isNew = false) {
        const commentElement = commentTemplate.content.cloneNode(true).querySelector('.mural-post');
        
        const avatarImg = document.createElement('img');
        avatarImg.src = `https://i.pravatar.cc/50?u=${commentData.id}`;
        avatarImg.alt = `Avatar de ${commentData.username}`;
        commentElement.querySelector('.post-avatar').appendChild(avatarImg);
        
        commentElement.querySelector('.post-username').textContent = commentData.username;
        commentElement.querySelector('.post-body p').textContent = commentData.text;
        commentElement.querySelector('.post-timestamp').textContent = formatTimeAgo(timestamp);
        
        // Se for um comentário novo, adiciona a classe de destaque
        if (isNew) {
            commentElement.classList.add('mural-post--new');
        }

        commentListElement.prepend(commentElement);
        void commentElement.offsetWidth; 
        commentElement.classList.add('is-visible');
    }

    // --- LÓGICA PRINCIPAL ---

    // Renderiza comentários estáticos e os já vistos
    const seenComments = getSeenCommentsData();
    const allCommentsToRender = [
        ...staticComments.map(c => ({...c, timestamp: c.originalTimestamp})),
        ...Object.keys(seenComments).map(id => {
            const comment = dynamicCommentPool.find(c => c.id === parseInt(id));
            return comment ? { ...comment, timestamp: seenComments[id] } : null;
        }).filter(Boolean) // Remove nulos se um comentário for removido do pool
    ];
    
    // Ordena por timestamp para renderizar na ordem correta
    allCommentsToRender.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    allCommentsToRender.forEach(comment => {
        renderComment(comment, comment.timestamp, false);
    });


    function scheduleNewComments() {
        const seenCommentIds = Object.keys(getSeenCommentsData()).map(Number);
        const unseenComments = dynamicCommentPool.filter(c => !seenCommentIds.includes(c.id));
        
        if (unseenComments.length === 0) return;

        const numberOfCommentsToShow = Math.floor(Math.random() * 3) + 3;
        const commentsToShow = unseenComments.sort(() => 0.5 - Math.random()).slice(0, numberOfCommentsToShow);

        let initialDelay = 8000;
        commentsToShow.forEach(comment => {
            const randomInterval = Math.random() * (25000 - 10000) + 10000;
            setTimeout(() => showNewDynamicComment(comment), initialDelay);
            initialDelay += randomInterval;
        });
    }

    function showNewDynamicComment(comment) {
        // ATUALIZAÇÃO DA NOTIFICAÇÃO
        const truncatedText = truncateText(comment.text);
        notificationElement.innerHTML = `<p><span class="notification-name">${comment.username}</span> comentou: "${truncatedText}"</p>`;
        notificationElement.classList.add('show');
        
        setTimeout(() => notificationElement.classList.remove('show'), 5000);

        setTimeout(() => {
            const now = Date.now();
            // Passa 'true' para indicar que é um novo comentário a ser destacado
            renderComment(comment, now, true); 

            const currentData = getSeenCommentsData();
            currentData[comment.id] = now;
            setSeenCommentsData(currentData);
        }, 1000);
    }
    
    scheduleNewComments();
}
    // --- EXECUTA AS FUNÇÕES DE INICIALIZAÇÃO ---
    // Cada função verifica internamente se os elementos de sua página existem
    setupSalesPage();
    initCommentSystem();
    setupUpsellPage();
});
