// ==========================================================
// ARQUIVO SCRIPT.JS COMPLETO E INTEGRADO (VERSÃO 10.0 - FINAL)
// AUTOR: Gemini (Senior Flask Developer)
// DATA: 29 de Junho de 2025
// DESCRIÇÃO: Versão final com todos os módulos integrados,
//            carregando com o filtro "Recentes" por padrão.
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------------
    // --- BANCO DE DADOS CENTRALIZADO E FUNÇÕES GLOBAIS DE APOIO ---
    // -------------------------------------------------------------------

    const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) || null;
    const saveToStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    // FONTE DE DADOS ÚNICA PARA CONSISTÊNCIA
    const compradoresDB = [
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


    const commentTemplates = [
    "Apliquei o conceito do Módulo 3 na mesma noite. A mudança na reação dela foi... palpável. Deixei de ser o 'cara legal' pra ser o cara que ela não conseguia decifrar. Jogo virou.",
    "Aquele 'nó na garganta' que eu sentia antes de abordar uma mulher? Sumiu. Não sei explicar. É como se o medo da rejeição simplesmente se tornasse irrelevante.",
    "O mais louco não é nem as mulheres. É como outros homens mudaram o jeito que me tratam. No trabalho, na roda de amigos. A postura muda, a voz muda, e o mundo responde.",
    "Alerta de resultado: 3 semanas no Primordial. Tinha uma conversa empacada no WhatsApp. Usei o princípio da 'imprevisibilidade' do módulo 3. A conversa que tava morta virou um encontro marcado pra sexta.",
    "Eu era o 'bom moço'. O terapeuta das minhas amigas. Depois de executar o 'Ritual de Ruptura', uma amiga que sempre me contava dos caras que ela saía me olhou diferente e disse 'nossa, você tá... diferente'.",
    "Pra quem tá na dúvida: o dinheiro que eu gastava com bebida no fim de semana pra tentar 'criar coragem' já pagou o Primordial. Só que a coragem que eu tenho agora não passa na segunda-feira.",
    "O bônus do 'Mapa da Neurodominância' sozinho já vale o investimento. Entender o ciclo da dopamina e como o celular e a pornografia estavam me transformando num zumbi apático... abriu meus olhos.",
    "O 'não' que eu dei pro meu pai hoje, sem me sentir culpado, foi a maior vitória da minha vida adulta até agora. Obrigado por isso.",
    "O Mapa da Neurodominância sozinho já vale o investimento. Entender como a dopamina funciona e parar de se sabotar com prazeres baratos mudou meu foco e minha disciplina em tudo.",
    "A sensação de entrar num lugar e não se sentir invisível. De ver ela te olhando ANTES de você olhar. Não tem preço. É isso. O resto é consequência.",
    "Cansei de ser o 'porto seguro' que elas procuram pra desabafar sobre os caras que elas realmente desejam. Hoje, eu sou o cara.",
    "O mais louco é que funciona com todas as idades. Apliquei os princípios com mulheres mais novas e mais velhas. É biologia, não tem como argumentar.",
    "Minha ex me viu numa festa outro dia... o jeito que ela me olhou, tentando entender o que tinha mudado... aquele olhar valeu cada centavo.",
    "Ok, entrei. Chega de ser espectador da minha própria vida. Hora de virar protagonista.",
    "Aquele manifesto mexeu comigo. Se for metade do que a página promete, já valeu. Vaga garantida.",
    "Tava cético, mas a quantidade de prova aqui é surreal. Decidi dar o passo. Mais um na alcateia.",
    "Acabei de garantir meu acesso. O sentimento não é de comprar um curso, é de entrar pra uma guerra.",
    "É isso. Investimento feito na única coisa que importa: eu mesmo. Ansioso pra começar a transformação.",
    "Comprado! A parte de 'recalibração neurobiológica' me pegou. Parece ser mais profundo que o resto.",
    "Hesitei por 10 minutos. Pensei: 'Daqui a um ano, vou me arrepender de não ter tentado?'. A resposta foi óbvia. Estou dentro.",
    "Chega de ser o 'cara legal' que fica na friendzone. Se é pra ser perigoso, que comece agora. Inscrição feita.",
    "Minha vaga está confirmada. Vamos ver se é tudo isso mesmo. A expectativa é alta.",
    "Decidido. Cansei da mediocridade. Hora de buscar a versão primordial.",
    "A energia dessa página é diferente. Se o produto for igual, vai ser insano. To dentro.",
    "Garantido. O conceito de 'despertar brutal' ressoou forte aqui.",
    "Mais um para a irmandade. O preço está muito acessível pela promessa.",
    "Entrei. A abordagem baseada em neurociência parece ser o diferencial.",
    "Não vou mais aceitar ser invisível. Inscrição feita. Que comece o jogo.",
    "Mano, bizarro como a postura muda. Só aplicando os exercícios do Módulo 2, já sinto uma diferença na forma como ando e como as pessoas me olham. O bagulho é real.",
    "A parte sobre 'Incoerência Estrutural Crônica' da página de vendas... aquilo me descreveu perfeitamente. Acabei de comprar por isso.",
    "O que me pegou foi a parte científica. A explicação sobre o sequestro do sistema de dopamina faz todo sentido com o que eu sentia. Acabei de entrar, mas entrei pela lógica.",
    "É isso, caralho. A página de vendas já é uma aula. Se o conteúdo for 10% disso, já pagou. Vaga garantida. Vamos pra dentro.",
    "Minha produtividade no trabalho aumentou. O 'Foco Laser' do Módulo 2 não é brincadeira.",
    "Recebi um 'você parece mais calmo, mais confiante' de uma colega de trabalho. Mal sabe ela... hahaha.",
    "O Ritual de Ruptura com o Personagem Infantil do Módulo 1... doloroso, mas necessário. Parece que tirei uma tonelada das costas.",
    "Entrei agora. A sensação é de finalmente ter encontrado o manual que não veio com a gente quando nascemos.",
    "Comprado. A promessa de reconfigurar o instinto é forte demais pra ignorar.",
    "Acabei de entrar. A comunidade nos comentários aqui já mostra que o ambiente é outro. Chega de lobo solitário.",
    "Parei de pedir desculpa por tudo. Só essa pequena mudança, sugerida no início, já mudou meu dia a dia.",
    "A 'Agressividade Saudável'... que conceito poderoso. Entender a diferença entre ser agressivo e ser assertivo é uma virada de chave.",
    "Garantido. Cansado de ser o bonzinho que se ferra. Hora de aprender as regras do jogo de verdade.",
    "Módulo 3 é basicamente um curso de psicologia sombria na prática. Pesado e eficiente.",
    "A forma como a gente aprende a ler os sinais subconscientes é bizarra. É como se eu tivesse ganhado um novo sentido.",
    "Entrei. O preço de uma pizza por mês pra mudar de vida? A escolha é óbvia.",
    "Ver os estudos científicos citados na página me deu a confiança que faltava. Comprei.",
    "Acabei de maratonar o Módulo 1. Minha cabeça tá explodindo. Muita coisa fazendo sentido agora.",
    "A ideia de que a disciplina é biológica, não só força de vontade (Módulo 4), faz todo sentido. Isso tira um peso.",
    "Comprei. Foda-se. Cansei de ser o mesmo de sempre.",
    "O 'Manual da Mulher Magnética' é um bônus que poderia ser vendido por um valor bem mais alto. Dica.",
    "Finalmente entendi porque eu atraía o mesmo tipo de mulher 'complicada'. O problema não era elas. Era o que eu sinalizava.",
    "Dentro. Vamos ver qual é a desse 'despertar brutal'.",
    "A discussão sobre testosterona na página de vendas foi o que me convenceu. É um problema real que ninguém fala.",
    "Acabei de comprar. Ansioso para o 'Ritual Final de Integração'. O nome já é foda.",
    "A parte sobre 'vampiro emocional' me pegou de um jeito... foi um soco no estômago. Tive que entrar.",
    "Confirmado. A analogia do 'leão que não precisa rugir' é a meta.",
    "O suporte no Telegram já valeu a pena. A galera se ajuda de verdade.",
    "Módulo 4, sobre posicionamento estratégico, abriu minha mente pra negócios, não só pra relacionamentos.",
    "O simples ato de mudar minha postura, como ensinado no Módulo 2, já me fez sentir mais dominante.",
    "Entrei. Se eu não investir em mim, quem vai?",
    "A 'Fórmula da Atração Biológica' deveria ser matéria de escola.",
    "Comprado. A promessa de engrossar a voz me deixou curioso pra caralho.",
    "Parei de me comparar com os outros. Comecei a focar em ser uma versão melhor de mim. Isso veio do Primordial.",
    "Entrei. O alerta sobre a queda de testosterona me assustou. É hora de agir.",
    "A sensação de não precisar mais da validação dos outros é indescritível.",
    "Cada módulo é um soco na cara da nossa programação antiga. Necessário.",
    "Comprado. Hora de parar de viver no modo automático.",
    "Estou aplicando o pilar do 'Foco Laser' e minha capacidade de trabalho dobrou.",
    "A explicação sobre o cérebro reptiliano feminino é uma arma.",
    "Só de ler a página e os comentários, já me senti parte de algo. Decidi entrar.",
    "Garantido. O conceito de 'Império Masculino' é o que eu tava buscando.",
    "Aprender a gerar 'escassez' e 'imprevisibilidade' mudou completamente o jogo pra mim.",
    "Acabei de entrar. Que comece a desconstrução.",
    "Hoje, pela primeira vez, eu senti o poder do 'respeito silencioso'. Numa reunião, todos pararam pra me ouvir quando comecei a falar. Sinistro.",
    "O bônus 'Mapa da Neurodominância' é um guia prático pra sair da mediocridade mental.",
    "A parte sobre a heurística da autoridade fez todo sentido. É ciência, não achismo. Por isso comprei.",
    "Entrei. A promessa de 'parar de pedir permissão' foi o que me vendeu.",
    "Ainda no Módulo 1 e já sinto a mentalidade mudando. É rápido.",
    "A forma como o curso explica a 'castração emocional' é brutalmente honesta.",
    "Dentro. O preço de duas cervejas no bar. A decisão foi fácil.",
    "O conceito de 'desequilíbrio sexy' é genial.",
    "Parei de ser o 'ombro amigo'. Agora eu sou o desejo.",
    "Comprei e já estou vendo os primeiros vídeos. A qualidade é impressionante.",
    "A ideia de construir uma 'identidade que causa inveja' é poderosa.",
    "Garantido. Vamos ver se eu saio desse platô.",
    "A analogia do 'arquiteto vs. pedreiro' na página de vendas me ganhou.",
    "Finalmente um conteúdo que fala a nossa língua, sem rodeios.",
    "Dentro da alcateia. Urrando já.",
    "O alerta final sobre a oportunidade crítica me fez agir. Não quis arriscar.",
    "O simples exercício de respiração do bônus já diminuiu minha ansiedade social.",
    "Entrei. A promessa de não ser mais ignorado é tudo que eu preciso.",
    "A copy da página é tão boa que eu comprei pra ver se o produto era do mesmo nível. E é.",
    "O conceito de 'Dominus' é exatamente o que eu busco. Maestria.",
    "Comprado. Hora de quebrar o DNA do homem domesticado.",
    "A discussão sobre o sistema límbico e o julgamento em 0.2 segundos... aquilo foi um soco.",
    "Entrei. Cansei de ser o plano B.",
    "O 'Ritual de Ruptura'... pesado, mas transformador. Recomendo.",
    "Ainda estou no começo, mas já sinto uma calma e um foco que não tinha antes.",
    "Garantido. A promessa de se tornar 'o maldito padrão' é ambiciosa. Gosto disso.",
    "Entrei. Se não funcionar, tem a garantia. Risco zero.",
    "A forma como se fala de 'agressividade saudável' é muito madura e necessária.",
    "Comprei. O marketing é agressivo, mas a lógica por trás é sólida.",
    "Ver que não sou o único que se sente um 'fantasma' na vida dos outros me deu força pra comprar.",
    "É isso. Chega de viver na defensiva. Hora de atacar.",
    "Acesso liberado. A interface da área de membros é limpa e direta. Gostei.",
    "Entrei. O preço é simbólico perto do potencial de retorno na vida.",
    "A promessa de 'sentir o gosto de ser o escolhido' é forte. Vamos buscar.",
    "Finalmente um lugar que não me trata como um homem quebrado, mas como um lobo adormecido.",
    "Dentro. A abordagem biológica e evolucionista me convenceu.",
    "A ficha caiu hard na parte da dopamina. Eu estava vivendo de migalhas. Chega.",
    "Comprado. Vamos ver se o 'Império Masculino' começa a ser construído.",
    "A sensação de não estar mais sozinho nessa jornada já paga o curso.",
    "Entrei. A copy da página já me fez sentir mais poderoso. Imagina o curso.",
    "A parte sobre 'gerar vínculo emocional sem parecer carente' é exatamente o que eu preciso.",
    "O conceito de 'despertar' é muito mais forte que 'aprender'. Por isso comprei.",
    "Vamos pra dentro. Chega de ser o coadjuvante.",
    "A 'recalibração neurobiológica' parece ser o verdadeiro ouro aqui. Ansioso.",
    "Entrei. A ideia de que 'eles mentiram pra você' ressoou muito forte.",
    "Se o objetivo é se tornar o homem que elas não conseguem ignorar, estou no lugar certo.",
    "O preço de um lanche ruim pra ter acesso a isso? Decisão óbvia.",
    "Garantido. A promessa de mudança na voz e postura me pegou.",
    "A abordagem de 'parar de se desculpar por existir' é o primeiro passo.",
    "Entrei. A narrativa da página é foda. Espero o mesmo do conteúdo.",
    "Comprei. O inimigo não é externo, é a nossa própria programação. Faz todo sentido.",
    "Ver o tanto de gente entrando me deu o empurrão final. To dentro.",
    "A explicação sobre o cérebro reptiliano foi uma aula. Tive que comprar.",
    "Dentro. O 'chamado de sangue' foi mais forte.",
    "A ideia de 'conquistar o direito de entrar' é poderosa. Me senti escolhido.",
    "Vamos lá. O investimento é baixo, o potencial de retorno é a vida toda.",
    "Comprei. A parte de 'ser o desequilíbrio sexy' me deixou muito curioso.",
    "Entrei agora. O design da área de membros é muito profissional.",
    "A 'seleção' e as vagas limitadas me fizeram agir rápido. Não queria ficar de fora.",
    "Acabei de entrar. A promessa de se tornar a 'referência' é o que busco na minha carreira e vida.",
    "Dentro! O conceito de 'vampiro emocional' me descreveu perfeitamente.",
    "A parte de 'ser percebido como líder sem dizer uma palavra' é ouro puro.",
    "Comprei pelo bônus do 'Manual da Mulher Magnética'. Preciso parar de atrair problema.",
    "Entrei. A ideia de que a atração não tem a ver com beleza, mas com instinto, é libertadora.",
    "Chega de ser o 'amiguinho'. Vaga garantida.",
    "O argumento sobre a queda de testosterona é assustador e real. Tive que agir.",
    "Acabei de comprar e já assisti à introdução. A pegada é diferente de tudo que já vi.",
    "Dentro. O lema 'impor presença' é o que eu preciso aprender.",
    "Se é pra ser perigoso, que seja com método. Comprei.",
    "A energia dos comentários me convenceu. Faço parte da alcateia agora.",
    "O conceito de 'disciplina biológica' do Módulo 4 mudou minha perspectiva sobre esforço.",
    "Entrei. Cansei de ser o homem que elas elogiam, mas nunca escolhem.",
    "A promessa de que 'seu rosto vai mudar' é ousada. Quero ver.",
    "Comprei. O preço é justo pela quantidade de conteúdo prometido.",
    "Vamos pra cima. Chega de viver na sombra.",
    "A parte sobre 'ativar o estado Alfa cerebral' parece promissora. Ansioso.",
    "Entrei. A ideia de que 'a verdade é brutal' me atraiu.",
    "O fato de ter uma garantia incondicional tornou a decisão muito mais fácil. Risco zero.",
    "Comprei. A metáfora do 'cão obediente' foi um tapa na cara que eu precisava.",
    "Dentro. A ideia de 'reconfigurar o instinto' é exatamente o que eu sinto que preciso.",
    "A promessa de 'ver elas disputando o seu olhar'. É audaciosa. Paguei pra ver.",
    "Acabei de entrar. Se for pra errar, que seja por tentar algo novo. Chega de repetir os mesmos erros.",
    "Garantido. O alerta final sobre a oportunidade crítica funcionou. Cede à pressão hahaha.",
    "Entrei. O conceito de 'homem desperto' é o que eu quero pra mim.",
    "O preço de R$99 pra nunca mais ser ignorado. A conta fecha. Comprado.",
    "A promessa de que 'não há mais volta' depois do método é o que eu preciso. Um caminho sem retorno.",
    "Dentro. Vamos ver se o 'desejo bruto' se manifesta.",
    "O Módulo 1 sobre desconstrução parece ser a base de tudo. Começando agora.",
    "Comprei. A ideia de que eu fui 'condicionado' e não 'criado' é muito forte.",
    "A analogia do 'caçador' vs 'vampiro emocional' foi o que me fez clicar em comprar.",
    "Entrei. A abordagem de 'parar de buscar aprovação' é o cerne da questão.",
    "Se o objetivo é 'dominar', estou no lugar certo. Vaga garantida.",
    "A parte sobre a 'mecânica da tensão sexual' é o que mais me interessa. Dentro.",
    "Comprei. A ideia de construir um 'posicionamento estratégico' vai além dos relacionamentos.",
    "Entrei. A frase 'você não foi criado, você foi condicionado' é a mais pura verdade.",
    "Vamos lá. O investimento em mim mesmo é sempre o mais importante.",
    "A promessa de 'sentir a confiança pulsando nas veias' é irresistível. Dentro.",
    "Comprei agora. A estrutura dos módulos parece muito bem pensada.",
    "O conceito de 'psicologia sombria da sedução' é intrigante. To dentro.",
    "Entrei. Se é pra ser um 'lobo', preciso aprender com o alfa da alcateia.",
    "A parte de 'ler os sinais subconscientes das mulheres' é uma habilidade que vale ouro.",
    "Garantido. O preço de hoje é uma piada perto do valor prometido.",
    "Comprei. A promessa de que 'o mundo inteiro cheira sua insegurança' é uma verdade dolorosa.",
    "Entrei. Hora de desligar o 'piloto automático' da mediocridade.",
    "A abordagem de 'curar a incoerência estrutural' é genial. Por isso comprei.",
    "Dentro. Chega de aceitar migalhas como se fosse tudo que eu mereço.",
    "O 'Ritual Final de Integração' soa como algo épico. Ansioso pra chegar lá.",
    "Comprei. A ideia de que 'elas leem seu instinto' é a chave de tudo.",
    "Entrei. A promessa de sair 'desbloqueado, livre e perigoso' é tudo.",
    "A ficha caiu na parte que diz que um homem de 30 hoje tem a testo de um de 50 de 1980.",
    "Dentro. O 'despertar brutal' é exatamente o que eu preciso.",
    "Comprei pelo bônus 'A Fórmula da Atração Biológica'. Parece ser muito denso.",
    "A parte de 'gerar vínculo sem parecer carente' é o meu maior desafio. Por isso entrei.",
    "Vamos pra cima! Chega de ser o 'seguro' e o 'previsível'.",
    "Comprei. A ideia de que minha força não é tóxica, mas necessária, me validou.",
    "Entrei. O preço de um combo no cinema. A decisão é fácil.",
    "O conceito de 'ativar o cérebro reptiliano feminino' é uma aula de biologia aplicada.",
    "A promessa de 'impor presença' ao invés de 'pedir atenção'. É isso.",
    "Comprei. A página de vendas é um manifesto. Se o curso seguir a linha, é revolucionário.",
    "Dentro. Chega de ser o 'homem que elas elogiam, mas nunca escolhem'.",
    "A ideia de que 'o desejo nasce no desequilíbrio' faz muito sentido.",
    "Garantido. A promessa de 'não ter mais volta' é o que eu busco. Uma mudança definitiva.",
    "Comprei. A narrativa do 'lobo domesticado' é a minha história.",
    "Entrei. Hora de aprender a ser o 'desequilíbrio sexy'.",
    "A parte sobre 'dominar a arte do respeito silencioso' me interessou muito.",
    "O preço está realmente baixo. Aproveitei antes que suba.",
    "Comprei. O conceito de 'Império Masculino' ressoou com meus objetivos de vida.",
    "Dentro. O bônus sobre 'evitar as que drenam sua virilidade' é crucial.",
    "A promessa de que 'outros homens vão tentar imitar sua energia'. Quero chegar nesse nível.",
    "Comprei. A ideia de 'reconfiguração' é muito mais forte que 'aprendizado'.",
    "Vamos lá. O risco é zero com a garantia. Não tenho nada a perder.",
    "A parte sobre a 'postura que silencia salas' é o nível de poder que eu aspiro.",
    "Dentro. Cansei de sentir esse vazio e falta de propósito.",
    "O alerta sobre a epidemia silenciosa que destrói a masculinidade foi o gatilho pra mim.",
    "Comprei. A frase 'seu próprio corpo está te traindo' é forte e real.",
    "Entrei. A ideia de que fui 'treinado para ser assim' tira a culpa e me dá a responsabilidade.",
    "A promessa de 'não ser mais invisível'. É só isso que eu peço.",
    "Garantido. A analogia do 'fantasma na vida dela' me descreveu perfeitamente.",
    "Comprei. Chega de ser o 'amiguinho que ela confia, mas jamais deseja'.",
    "A frase 'eles mentiram pra você' é um soco no estômago. Tive que entrar.",
    "Dentro. O conceito de ser 'condicionado como um cão obediente' é pesado, mas real.",
    "A promessa de ser o 'objeto do desejo'. É ousada e atraente.",
    "Comprei. A ideia de que 'um homem desperto é perigoso' me deu poder.",
    "A narrativa do 'vampiro emocional' vs 'caçador primordial' é genial.",
    "Entrei. A urgência criada no final da página funcionou. Não quis pagar pra ver.",
    "O preço de R$99 como uma 'prova de comprometimento' faz sentido. É um filtro.",
    "Garantido. A ideia de que minha biologia está sendo sabotada me fez agir agora.",
    "Comprei. A escolha entre 'rastejar por migalhas' ou 'dominar' é óbvia.",
    "Dentro. O 'chamado de sangue' foi atendido.",
    "A promessa de 'ser o homem que entra e o ambiente muda'. É disso que se trata.",
    "Comprei. A ideia de 'conquistar o direito de entrar' e não apenas 'comprar' muda tudo.",
    "Entrei. O alerta de que 'a porta se fecha sem aviso' me fez decidir na hora.",
    "A frase 'ressuscita o seu instinto' é muito mais poderosa que 'ensina truques'.",
    "Garantido. A ideia de que eu estou sendo vítima de uma 'conspiração' contra minha biologia é um chamado à ação.",
    "Comprei. O convite para 'provar que sou um dos poucos que nasceram para dominar' foi irrecusável.",
    "Dentro. Chega de ser o 'segredo mais bem guardado do mercado'.",
    "A parte sobre a 'microexpressão de desinteresse' que 'atravessa a alma'... nunca li algo tão real.",
    "Entrei. Se é pra ser um 'lobo', melhor aprender com a alcateia.",
    "O conceito de que 'atenção é commodity, autoridade é ativo' me fez pensar. Por isso entrei.",
    "Comprei. A promessa de uma 'recalibração neurobiológica' é o que diferencia este produto.",
    "A estrutura dos 4 módulos (Desconstrução, Reinstalação, Desejo, Império) parece uma jornada completa.",
    "Dentro. O 'Ritual de Ruptura' do Módulo 1 soa como algo que eu preciso desesperadamente.",
    "A promessa de 'sentir a confiança pulsando nas veias' no Módulo 2 é tudo que eu quero.",
    "Comprei pelo Módulo 3. A 'psicologia sombria da sedução' é um conhecimento perigoso e necessário.",
    "A ideia de 'consolidar a masculinidade inabalável' no Módulo 4 é o objetivo final.",
    "Entrei. Os bônus parecem cursos completos por si só.",
    "O bônus 'Fórmula da Atração Biológica' parece ser a ciência por trás de tudo. Essencial.",
    "A promessa de 'decodificar as leituras faciais e olfativas' é de outro nível.",
    "Comprei. O 'Mapa da Neurodominância' para eliminar o vício em dopamina lixo é uma questão de saúde mental.",
    "O bônus 'Manual da Mulher Magnética' para identificar mulheres de alta energia... crucial.",
    "Dentro. A promessa de gerar 'conexão emocional e sexual profunda' é o que falta hoje em dia.",
    "A ideia de que o Primordial é um 'sistema fechado' o torna mais exclusivo e desejável.",
    "Comprei. A frase 'descobrir quem você é quando para de pedir permissão' é o resumo de tudo.",
    "A escolha entre o 'vampiro' e o 'caçador'. A copy te força a escolher um lado. Escolhi o meu.",
    "Entrei. A descrição do segundo tipo de homem, aquele que 'irradia energia', é a minha meta.",
    "A promessa de 'impor respeito' em vez de 'implorar por aceitação'. É por isso que estou aqui.",
    "Comprei. O alerta final sobre a oportunidade desaparecendo é um gatilho poderoso.",
    "A ideia de que o preço é um 'filtro para quem tem coragem' me fez querer provar que eu tenho.",
    "Dentro. A frase 'sua testosterona continua despencando' me deu um senso de urgência biológica.",
    "O chamado para 'não ser mais vítima da conspiração'. Impossível de ignorar.",
    "Comprei. O último parágrafo, com a escolha final, é uma obra de arte da persuasão.",
    "Entrei. Que comece a porra do jogo.",
    "Garantido. Hora de acordar o animal.",
    "Dentro. A promessa de ser inesquecível.",
    "Comprei. Cansado de ser mediano.",
    "O conceito de 'agressividade saudável' me pegou. Preciso aprender isso.",
    "Entrei. Se metade do que é prometido for verdade, minha vida muda.",
    "Vamos lá. O investimento é irrisório perto da transformação.",
    "A parte de 'posicionamento estratégico' do Módulo 4 vai me ajudar na carreira também.",
    "Comprei. A honestidade brutal da página me ganhou.",
    "Dentro. A ideia de 'exorcizar a versão fraca' é o que eu preciso.",
    "A promessa de 'não mais agir como um homem forte, mas SER um' é o ponto.",
    "Garantido. A parte sobre 'desestabilizar a lógica emocional delas' é genial.",
    "Comprei. A mecânica da tensão sexual é o conhecimento que faltava.",
    "Entrei. O 'Ritual Final de Integração' parece ser o ápice da jornada.",
    "A ideia de que os bônus não estão à venda e precisam ser 'merecidos' aumenta muito o valor.",
    "A promessa de 'decodificar as leituras energéticas' é profunda. Dentro.",
    "Comprei. A parte de 'ativar a dopamina produtiva' é uma necessidade hoje em dia.",
    "O Manual para 'evitar as que drenam sua virilidade' é uma questão de autopreservação.",
    "Dentro. A ideia de gerar um 'vínculo que a faça querer mais' é o objetivo.",
    "Comprei porque cansei de ser o homem que 'acha que nasceu pra ser ignorado'.",
    "A descrição do homem que 'fala pouco, mas todo mundo ouve'. É essa a meta.",
    "Entrei. O conceito de 'não buscar, mas atrair' é uma mudança de paradigma.",
    "A promessa de ser um 'farol de testosterona e confiança'. Poético e poderoso.",
    "Comprei. A ideia de que o preço de R$99 é o custo de 'uma noite de humilhação' é muito real.",
    "A frase 'reescrever sua história'. É exatamente isso que eu quero.",
    "Dentro. A escassez de 'apenas 50 vagas' me fez agir sem pensar duas vezes.",
    "Comprei. A ideia de que 'a cada novo ciclo, o processo fica mais exigente' cria uma urgência enorme.",
    "A frase 'saiu desta página? acabou.' é um ultimato. Eu aceitei.",
    "Garantido. A ideia de 'ressuscitar o instinto' é muito mais forte que qualquer 'dica'.",
    "Comprei. O preço como 'prova de comprometimento' é uma ótima forma de enquadrar.",
    "A urgência de que 'seu cérebro está sendo reconfigurado para a mediocridade'. Tive que agir.",
    "Entrei. A escolha final entre 'rastejar por migalhas' ou 'dominar' é fácil.",
    "A promessa de 'ser o homem que nasceu para DOMINAR'. É isso. Comprado.",
    "Dentro. O 'alerta silencioso' do título já me fisgou.",
    "A ideia de ser um 'fantasma na vida dela' foi dolorosamente precisa.",
    "Comprei. A estatística sobre a queda da testosterona é um fato inegável.",
    "A frase 'o mundo inteiro cheira sua insegurança' foi um tapa na cara.",
    "Entrei. A ideia de que fui 'treinado' para ser fraco me deu raiva e motivação.",
    "A promessa de 'despertar o homem que elas não conseguem ignorar'. É o que eu busco.",
    "Comprei porque me identifiquei com a história do 'cara legal' que coleciona fracassos.",
    "A ideia de um 'código secreto' que os outros sabem e eu não. Preciso desse código.",
    "Dentro. A frase 'quanto mais você se anulava, mais elas te esqueciam' é a minha biografia.",
    "O grito de 'CHEGA.' no meio da página. Eu gritei junto. Comprado.",
    "A ideia de que 'Eles Mentiram Pra Você' cria uma revolta necessária.",
    "Comprei. A acusação de ter sido 'condicionado' me libertou da culpa.",
    "A 'Grande Revelação' com os estudos científicos dá uma credibilidade absurda.",
    "Entrei. A prova da Universidade de Chicago sobre testosterona e dominância foi o fator decisivo.",
    "O experimento da Universidade da Califórnia sobre o cérebro feminino... chocante e revelador.",
    "Comprei. O estudo do Journal of Neuroscience sobre dopamina e esforço mudou minha visão.",
    "A frase 'eles te mantiveram cego para que você continuasse dócil'. Não mais.",
    "Dentro. A solução como uma 'arma forjada pra rasgar o verniz social'. Perfeito.",
    "A promessa de 'libertar o animal que ainda vive em você'. É disso que eu preciso.",
    "Comprei. A ideia de 'impor presença' é um superpoder.",
    "A frase 'você precisa se lembrar, não aprender'. É profunda.",
    "A visão do futuro de 'ver elas disputando o seu olhar'. É uma motivação poderosa.",
    "Entrei. A promessa de que 'sua voz vai engrossar'. Veremos.",
    "A ideia de ser 'o maldito padrão que ninguém consegue alcançar'. É a ambição em pessoa.",
    "Comprei. A promessa de 'reconfigurar o instinto' é o que diferencia de todos os outros.",
    "O Módulo 1 que 'exorciza a versão fraca'. Preciso desse exorcismo.",
    "Dentro. O Módulo 2 que 'instala um novo sistema operacional'. Formatação já!",
    "O Módulo 3 sobre os '3 gatilhos da obsessão primitiva'. Conhecimento proibido.",
    "Comprei. O Módulo 4 para construir um 'Império Masculino'. Começa hoje.",
    "A forma como os bônus são apresentados, como algo que precisa ser 'provado que merece', é genial.",
    "Entrei pelo bônus da 'Fórmula da Atração Biológica'. A ciência da sedução.",
    "A promessa de 'decodificar as leituras energéticas'. Parece esotérico, mas faz sentido.",
    "Comprei. O 'Mapa da Neurodominância' pra reprogramar o cérebro é o que há de mais moderno.",
    "O bônus 'Manual da Mulher Magnética' é uma necessidade. Chega de atrair problemas.",
    "Dentro. A promessa de gerar um 'vínculo profundo sem parecer carente' é a habilidade que falta.",
    "A ideia de que 'só existe um jeito de entrar: provar que está pronto'. Me senti desafiado.",
    "Comprei. A escolha entre o 'vampiro emocional' e o 'caçador primordial' é o resumo da vida.",
    "A descrição do homem que 'acorda cansado e se desculpa por existir'. Era eu até agora.",
    "Entrei. A descrição do homem que 'entra em um ambiente e o silêncio muda'. Serei eu.",
    "A promessa de 'não buscar, mas atrair'. Uma mudança de 180 graus.",
    "Comprei. A ideia de que o 'preço de R$99 é o preço de uma única noite de humilhação' é genial.",
    "A escassez das '50 vagas' me fez decidir agora. Não vou arriscar ficar de fora.",
    "Dentro. A ideia de que 'a cada novo ciclo, o processo fica mais exigente' me deu o empurrão final.",
    "A frase 'Não tem replay. Não tem segunda chance.' é um ultimato. Aceito.",
    "Comprei. A ideia de que o Primordial 'ressuscita o instinto' é o que eu acredito.",
    "O preço como um 'filtro para eliminar os curiosos'. Gosto da exclusividade.",
    "Entrei. A urgência biológica de que 'minha testosterona está despencando'.",
    "A escolha final entre 'rastejar por migalhas' ou 'dominar'. A decisão foi tomada.",
    "Comprei. A promessa de 'ser o homem que nasceu para DOMINAR'. É um contrato que assino agora.",
    "Dentro. O 'alerta silencioso' me fisgou desde o início.",
    "A imagem do 'fantasma na vida dela'. Dolorosamente real. Chega.",
    "A estatística da testosterona é um soco de realidade. Comprei.",
    "A frase 'o mundo inteiro cheira sua insegurança'. Preciso mudar isso urgentemente.",
    "Entrei. A ideia de que fui 'treinado' para ser assim me deu raiva pra mudar.",
    "Comprei. A promessa de 'despertar o homem que elas não conseguem ignorar' é a meta.",
    "Me identifiquei totalmente com a história do 'cara legal' que só se ferra. Dentro.",
    "A ideia do 'código secreto' que os outros têm... eu quero acesso a esse cofre.",
    "Dentro. A frase 'quanto mais você se anulava, mais elas te esqueciam'. Minha vida.",
    "O 'CHEGA.' no meio do texto. Foi um grito que eu dei junto. Comprei.",
    "A ideia de que 'Eles Mentiram Pra Você' cria um senso de revolta e propósito.",
    "Comprei. A acusação de ter sido 'condicionado' é libertadora.",
    "A 'Grande Revelação' com as provas científicas me deu a segurança que eu precisava.",
    "Entrei. O estudo da Universidade de Chicago foi o argumento final pra mim.",
    "O experimento do cérebro feminino... me fez entender muita coisa. Comprado.",
    "Comprei. O estudo sobre dopamina e esforço é a chave pra sair da procrastinação.",
    "A frase 'eles te mantiveram cego'. Hora de arrancar a venda.",
    "Dentro. A solução como uma 'arma forjada'. É exatamente o que eu preciso.",
    "A promessa de 'libertar o animal'. Estou pronto.",
    "Comprei. O conceito de 'impor presença' é uma virada de chave.",
    "A frase 'você precisa se lembrar, não aprender'. Profundo.",
    "A visão do futuro de 'ver elas disputando o seu olhar'. É a motivação que faltava.",
    "Entrei. A promessa de 'sua voz vai engrossar' é intrigante.",
    "A ideia de ser 'o maldito padrão'. É a mentalidade que eu quero adotar.",
    "Comprei. A promessa de 'reconfigurar o instinto' é única no mercado.",
    "O Módulo 1 que 'exorciza a versão fraca'. É disso que se trata.",
    "Dentro. O Módulo 2 que 'instala um novo sistema operacional' na mente.",
    "O Módulo 3 sobre os 'gatilhos da obsessão primitiva'. Quero esse conhecimento.",
    "Comprei. O Módulo 4 para construir um 'Império Masculino'. Alinhado com meus objetivos.",
    "A forma como os bônus são apresentados como um 'mérito'. Genial.",
    "Entrei pelo bônus da 'Fórmula da Atração Biológica'. Parece ser o núcleo de tudo.",
    "A promessa de 'decodificar as leituras energéticas'. É outro nível de percepção.",
    "Comprei. O 'Mapa da Neurodominância' para curar o vício em dopamina barata é essencial.",
    "O bônus 'Manual da Mulher Magnética' para identificar parceiras de alto valor. Necessário.",
    "Dentro. A promessa de gerar um 'vínculo profundo' é o que realmente importa.",
    "A ideia de 'provar que está pronto' para entrar... desafio aceito.",
    "Comprei. A dicotomia 'vampiro emocional' vs 'caçador primordial' é poderosa.",
    "A descrição do homem que 'se desculpa por existir'. Era eu. Não mais.",
    "Entrei. A descrição do homem que 'irradia energia'. Serei eu.",
    "A promessa de 'não buscar, mas atrair'. É a inversão do polo.",
    "Comprei. A ancoragem do preço com 'uma noite de humilhação' é muito eficaz.",
    "A escassez das '50 vagas'. Não ia arriscar.",
    "Dentro. A ideia de que 'o processo fica mais exigente' a cada ciclo cria uma urgência real.",
    "A frase 'Não tem replay'. É um ultimato que te força a decidir.",
    "Comprei. A ideia de 'ressuscitar o instinto' é o que eu busco.",
    "O preço como um 'filtro'. Me senti qualificado para passar por ele.",
    "Entrei. A urgência biológica da 'testosterona despencando'.",
    "A escolha final entre 'rastejar' e 'dominar'. A escolha foi feita.",
    "Comprei. A promessa de 'ser o homem que nasceu para DOMINAR'. Assino embaixo.",
    "Dentro. O 'alerta silencioso' do título foi um ótimo gancho.",
    "A imagem do 'fantasma na vida dela'. Foi um soco no estômago.",
    "Comprei. A estatística da testosterona é irrefutável.",
    "A frase 'o mundo inteiro cheira sua insegurança'. Uma verdade dura.",
    "Entrei. A ideia de que fui 'treinado' me deu um inimigo para lutar contra.",
    "Comprei. A promessa de 'despertar o homem que elas não conseguem ignorar'.",
    "Me identifiquei com a história do 'cara legal' que sempre perde. Chega.",
    "A ideia de um 'código secreto'... preciso decifrar isso. Dentro.",
    "Dentro. A frase 'quanto mais você se anulava, mais elas te esqueciam'. Minha história.",
    "O 'CHEGA.' no meio da página foi um grito de guerra. Comprado.",
    "A ideia de que 'Eles Mentiram Pra Você' me deu um propósito.",
    "Comprei. A acusação de ter sido 'condicionado' me deu clareza.",
    "A 'Grande Revelação' com a ciência por trás me deu segurança.",
    "Entrei. O estudo da Universidade de Chicago foi o ponto final.",
    "O experimento do cérebro feminino... abriu meus olhos. Comprado.",
    "Comprei. O estudo sobre dopamina é a chave para a produtividade.",
    "A frase 'eles te mantiveram cego'. Hora de enxergar.",
    "Dentro. A solução como uma 'arma forjada'. É o que eu preciso.",
    "A promessa de 'libertar o animal'. Estou pronto pra isso.",
    "Comprei. O conceito de 'impor presença' é uma virada de chave total.",
    "A frase 'você precisa se lembrar'. É mais profundo do que aprender.",
    "A visão do futuro... me vendeu a transformação, não o curso.",
    "Entrei. A promessa de 'sua voz vai engrossar'. Intrigante.",
    "A ideia de ser 'o maldito padrão'. É a mentalidade que busco.",
    "Comprei. 'Reconfigurar o instinto' é a única promessa que importa.",
    "O Módulo 1 que 'exorciza a versão fraca'. Necessário.",
    "Dentro. O Módulo 2 que 'instala um novo sistema operacional'.",
    "O Módulo 3 sobre os 'gatilhos da obsessão'. Conhecimento de elite.",
    "Comprei. O Módulo 4 para construir um 'Império'. Alinhado 100%.",
    "A forma como os bônus são apresentados. Genial. Entrei.",
    "Entrei pelo bônus da 'Atração Biológica'. Parece ser a base de tudo.",
    "A promessa de 'decodificar as leituras energéticas'. Outro nível.",
    "Comprei. O 'Mapa da Neurodominância' para curar o cérebro.",
    "O bônus do 'Manual da Mulher Magnética'. Essencial.",
    "Dentro. A promessa de 'vínculo profundo'. É o que falta.",
    "A ideia de 'provar que está pronto'. Desafio aceito.",
    "Comprei. A dicotomia 'vampiro' vs 'caçador' é poderosa.",
    "A descrição do homem que 'se desculpa por existir'. Fim dessa era.",
    "Entrei. A descrição do homem que 'irradia energia'. A meta.",
    "A promessa de 'não buscar, mas atrair'. O objetivo final.",
    "Comprei. A ancoragem do preço com a 'noite de humilhação' é real.",
    "A escassez das '50 vagas' me fez decidir.",
    "Dentro. A ideia de que 'o processo fica mais exigente' é um gatilho forte.",
    "A frase 'Não tem replay'. É um ultimato.",
    "Comprei. A ideia de 'ressuscitar o instinto'.",
    "O preço como um 'filtro'. Me senti parte da elite.",
    "Entrei. A urgência da 'testosterona'.",
    "A escolha entre 'rastejar' e 'dominar'. Fácil.",
    "Comprei. A promessa de 'DOMINAR'.",
    "Dentro. O título me pegou.",
    "A imagem do 'fantasma'. Dolorosa.",
    "Comprei. A estatística da testo.",
    "A frase da 'insegurança'. Tapa na cara.",
    "Entrei. Fui 'treinado' pra isso.",
    "Comprei. A promessa de 'despertar'.",
    "Me identifiquei com o 'cara legal'. Chega.",
    "O 'código secreto'. Quero ele.",
    "Dentro. 'Se anular' é meu nome do meio.",
    "O 'CHEGA.'. Foi pra mim.",
    "A ideia de que 'mentiram'. Faz sentido.",
    "Comprei. 'Condicionado' me descreve.",
    "A 'Grande Revelação'. Me convenceu.",
    "Entrei. O estudo de Chicago.",
    "O experimento do cérebro. Chocante.",
    "Comprei. O estudo da dopamina.",
    "A frase 'eles te mantiveram cego'. Real.",
    "Dentro. A 'arma forjada'.",
    "A promessa de 'libertar o animal'.",
    "Comprei. 'Impor presença'.",
    "A frase 'você precisa se lembrar'.",
    "A visão do futuro. Me ganhou.",
    "Entrei. A 'voz engrossar'.",
    "A ideia de ser 'o padrão'.",
    "Comprei. 'Reconfigurar o instinto'.",
    "O Módulo 1. Exorcismo.",
    "Dentro. Módulo 2. Instalação.",
    "O Módulo 3. Gatilhos.",
    "Comprei. Módulo 4. Império.",
    "Os bônus. Genial.",
    "Entrei pelo bônus da Atração.",
    "A promessa das 'leituras energéticas'.",
    "Comprei. O Mapa da Neurodominância.",
    "O Manual da Mulher Magnética.",
    "Dentro. O 'vínculo profundo'.",
    "A ideia de 'provar'. Desafiador.",
    "Comprei. Vampiro vs Caçador.",
    "Se desculpar por existir. Nunca mais.",
    "Entrei. Irradiar energia.",
    "Não buscar, mas atrair.",

];

    // --- CHAMADA PRINCIPAL DE INICIALIZAÇÃO ---
    initApp();

    function initApp() {
        const systems = [
            setupGeneralUI,
            setupUpsellPage,
            initScarcityAndSocialProof,
            initCommentSystem
        ];
        systems.forEach(system => system());
    }

    // -------------------------------------------------------------------
    // --- MÓDULO 1: UI GERAL (ACORDEÃO, ANIMAÇÕES, PESSOAS ONLINE) ---
    // -------------------------------------------------------------------
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
                    if (header.classList.contains('active')) {
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.style.paddingTop = "20px";
                        content.style.paddingBottom = "20px";
                    } else {
                        content.style.maxHeight = null;
                        content.style.paddingTop = "0";
                        content.style.paddingBottom = "0";
                    }
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
            let onlineCount = 157;
            const updateOnlineCount = () => {
                const variation = Math.floor(Math.random() * 7) - 3;
                onlineCount = Math.max(110, Math.min(190, onlineCount + variation));
                onlineCountElement.textContent = onlineCount;
            };
            setInterval(updateOnlineCount, 2500);
        }
    }

    // -------------------------------------------------------------------
    // --- MÓDULO 2: LÓGICA DA PÁGINA DE UPSELL ---
    // -------------------------------------------------------------------
    function setupUpsellPage() {
        const overlay = document.getElementById('alert-overlay');
        if (overlay) {
            const hideOverlay = () => overlay.classList.remove('visible');
            const autoHide = setTimeout(hideOverlay, 3000);
            overlay.addEventListener('click', () => {
                clearTimeout(autoHide);
                hideOverlay();
            });
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

    // -------------------------------------------------------------------
    // --- MÓDULO 3: SISTEMA DE ESCASSEZ E PROVA SOCIAL (FASE 2 ATIVA) ---
    // -------------------------------------------------------------------
    function initScarcityAndSocialProof() {
        const vagasElement = document.getElementById('vagas-restantes-header');
        const progressElement = document.getElementById('progress-bar-inner');
        const notificationElement = document.getElementById('social-proof-notification');
        const activeMembersElement = document.querySelector('.live-stats .stat-item:first-child strong');
        if (!vagasElement || !progressElement || !notificationElement || !activeMembersElement) return;

        const TOTAL_VAGAS = 250, VENDA_A_CADA_X_MINUTOS = 45, VAGAS_INICIAIS_MIN = 55, VAGAS_INICIAIS_MAX = 75, VAGAS_MINIMAS = 7;
        const STORAGE_KEY = 'primordial_scarcity_state';
        let vagasAtuais;
        let activeMembersCount = 0;

        const showNotification = (message, duration = 5000) => {
            notificationElement.innerHTML = `<p>${message}</p>`;
            notificationElement.classList.add('show');
            setTimeout(() => notificationElement.classList.remove('show'), duration);
        };
        
        const simularVenda = () => {
            if (vagasAtuais <= VAGAS_MINIMAS) return;
            vagasAtuais--;
            updateVagasDisplay();

            const comprador = compradoresDB[Math.floor(Math.random() * compradoresDB.length)];
            showNotification(`<span class="notification-name">${comprador.name}</span> de ${comprador.location} acaba de garantir sua vaga no PRIMORDIAL!`);

            setTimeout(() => {
                activeMembersCount++;
                activeMembersElement.textContent = `+${activeMembersCount}`;
                const username = comprador.name.split(' ')[0] + '.' + (comprador.name.split(' ')[1] ? comprador.name.split(' ')[1].charAt(0) : '');
                showNotification(`<span class="notification-name">${username}</span> está ativo na comunidade.`);
            }, Math.random() * (15000 - 8000) + 8000);
        };
        
        const updateVagasDisplay = () => {
            vagasElement.textContent = vagasAtuais;
            const percentual = ((TOTAL_VAGAS - vagasAtuais) / TOTAL_VAGAS) * 100;
            progressElement.style.width = percentual + '%';
        };

        let state = getFromStorage(STORAGE_KEY);
        if (state) {
            const tempoDecorrido = Date.now() - state.timestamp;
            const vendasSimuladas = Math.floor(tempoDecorrido / (1000 * 60 * VENDA_A_CADA_X_MINUTOS));
            vagasAtuais = Math.max(VAGAS_MINIMAS, Math.min(state.lastSeenVagas, state.initialVagas - vendasSimuladas));
        } else {
            vagasAtuais = Math.floor(Math.random() * (VAGAS_INICIAIS_MAX - VAGAS_INICIAIS_MIN + 1)) + VAGAS_INICIAIS_MIN;
            state = { initialVagas: vagasAtuais, timestamp: Date.now(), lastSeenVagas: vagasAtuais };
        }
        activeMembersCount = TOTAL_VAGAS - vagasAtuais + 37;
        activeMembersElement.textContent = `+${activeMembersCount}`;
        saveToStorage(STORAGE_KEY, state);
        updateVagasDisplay();

        window.addEventListener('beforeunload', () => {
            state.lastSeenVagas = vagasAtuais;
            saveToStorage(STORAGE_KEY, state);
        });

        const scheduleNextSale = () => {
            const randomDelay = Math.random() * (75000 - 40000) + 40000;
            setTimeout(() => {
                simularVenda();
                scheduleNextSale();
            }, randomDelay);
        };
        
        setTimeout(scheduleNextSale, 20000);
    }

    // -------------------------------------------------------------------
    // --- MÓDULO 4: SISTEMA DE COMENTÁRIOS COM FILTRO ---
    // -------------------------------------------------------------------
    function initCommentSystem() {
        const listElement = document.getElementById('primordial-comments-list');
        const template = document.getElementById('comment-template');
        const filterContainer = document.getElementById('comment-filter-container');
        const notificationElement = document.getElementById('social-proof-notification');
        const recentCommentsCountElement = document.getElementById('recent-comments-count');
        if (!listElement || !template || !filterContainer || !notificationElement || !recentCommentsCountElement) return;

        const SEEN_KEY = 'primordial_seen_comments', LIKED_KEY = 'primordial_liked_comments', CACHE_KEY = 'primordial_likes_cache', VISIT_KEY = 'primordial_last_visit';
        const MIN_TIME_NEW = 4 * 3600 * 1000;
        // ALTERAÇÃO PRINCIPAL: Carregar com o filtro "Recentes"
        let activeFilter = 'recentes';

        const generateUsername = (name) => {
            const parts = name.split(' ');
            return parts.length > 1 ? `${parts[0]}.${parts[1].charAt(0)}` : parts[0];
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

        const simulateLikes = (base, ts) => base + Math.floor((Date.now() - new Date(ts).getTime()) / (1000 * 3600) * (Math.random() * 0.5 + 0.1));
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
            el.querySelector('.post-avatar').innerHTML = `<img src="https://i.pravatar.cc/50?u=${comment.id}" alt="Avatar">`;
            
            saveToStorage(CACHE_KEY, likesCache);
            return el;
        };

        const renderMural = (filter) => {
            listElement.innerHTML = '';
            const seen = getFromStorage(SEEN_KEY) || {};
            let comments = [...staticComments, ...dynamicCommentPool.filter(c => seen[c.id])].map(c => ({
                ...c,
                timestamp: seen[c.id] || c.originalTimestamp,
                likeCount: (getFromStorage(CACHE_KEY) || {})[c.id] || simulateLikes(c.initialLikes, seen[c.id] || c.originalTimestamp)
            }));
            
            const oneDayAgo = Date.now() - (24 * 3600 * 1000);
            const recentCount = comments.filter(c => new Date(c.timestamp).getTime() > oneDayAgo).length;
            recentCommentsCountElement.textContent = `+${recentCount}`;

            if (filter === 'relevantes') {
                comments.sort((a, b) => b.likeCount - a.likeCount);
            } else {
                comments = comments.filter(c => new Date(c.timestamp).getTime() > oneDayAgo).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            }

            if(comments.length === 0 && filter === 'recentes') listElement.innerHTML = `<p class="no-comments-message">Nenhum comentário nas últimas 24 horas.</p>`;
            else comments.forEach(c => {
                const el = createCommentEl(c);
                listElement.appendChild(el);
                setTimeout(() => el.classList.add('is-visible'), 50);
            });
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

        const scheduleNewComments = (timeSince) => {
            if(timeSince < MIN_TIME_NEW) return;
            const seen = getFromStorage(SEEN_KEY) || {};
            const unseen = dynamicCommentPool.filter(c => !seen[c.id]);
            if(unseen.length === 0) return;

            const toShow = unseen.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);
            let delay = 15000;
            toShow.forEach(comment => {
                setTimeout(() => {
                    const currentSeen = getFromStorage(SEEN_KEY) || {};
                    currentSeen[comment.id] = Date.now();
                    saveToStorage(SEEN_KEY, currentSeen);
                    showNewCommentNotification(comment);
                    renderMural(activeFilter);
                }, delay);
                delay += Math.random() * (30000 - 15000) + 15000;
            });
        };
        
        const lastVisit = getFromStorage(VISIT_KEY);
        renderMural(activeFilter);
        scheduleNewComments(Date.now() - (lastVisit || 0));
        listElement.addEventListener('click', handleLike);
        filterContainer.addEventListener('click', handleFilter);
        saveToStorage(VISIT_KEY, Date.now());
    }
});
