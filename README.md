# Node-Starter

Repositório para estudar os principais aspectos de Node.js e um pouco mais :)

## Instalação

Para instalar o Node, baixe o instalador no [site oficial](https://nodejs.org/).

Podemos confirmar que a instação foi concluída com sucesso executando o comando `node -v`:
![node -v: v14.9.0](assets/images/node-version.PNG)

## npm

**npm** (Node Package Manager), como o próprio nome já diz, é o gerenciador de pacotes do Node. Quando instalamos o Node, o **npm** já vem junto. Podemos confirmar usando o comando `npm -v`:
![node -v: v6.14.8](assets/images/npm-version.PNG)

## O que faremos?

Para aprender os conceitos básicos de Node.js e algumas das principais tecnologias que estão à sua volta, vamos construir um sistema simples onde poderemos cadastrar usuários e suas músicas favoritas. Vamos lá!

## Criando a estrutura do projeto

Para fazer o nosso sistema, vamos usar o framework [Express.js](https://expressjs.com/). Ele é muito todo usado no mundo e extremamente simples de aprender! Para facilitar a nossa vida, o Express já tem uma ferramenta que cria uma estrutura de arquivos simples para nós. Para isso, temos que instalar o Express na nossa máquina.
Fazemos isso com o comando `npm install -g express`:
![instalação do express](assets/images/express-install.PNG)

`install`: instrução que queremos executar
`express`: Nome do pacote que queremos instalar
`-g`: Instala o pacote globalmente

Podemos confirmar que a instalação funcionu corretamente checando a versão do express (como fizemos anteriormente) utilizando o comando `express --version`:
![express --version: 4.16.0](assets/images/express-version.PNG)

Agora podemos criar o nosso projeto! Em um diretório vazio (chamei o meu de node-starter, mas você pode escolher o nome que quiser), vamos executar o comando `express . --view=ejs`.
![criação do template do projeto](assets/images/express-create.PNG)

O meu diretório já tinha alguns arquivos, como [README.md]() e [LICENCE](), por isso tive que confirmar que queria criar o projeto lá mesmo.

###### Vamos entender melhor o que ele criou:

- [public](/public): diretório de onde serão servidos recursos estáticos (ex. imagens, css, js)
- [routes](/routes): diretório onde vamos colocar todas as nossas rotas
- [views](/views): diretório que conterá nossas views e partials
- [bin](/bin): diretório que contém o arquivo de inicialização do nosso servidor
- [app.js](app.js): nosso arquivo "principal", onde concentraremos todas as nossas configurações
- [package.json](package.json): arquivo que contém todas as nossas dependências, scripts e detalhes importantes sobre o nosso projeto

## Instalando as dependências

Para instalar todas as dependências do projeto (especificadas no arquivo [package.json](package.json)), usamos o comando `npm install`, ou simplesmente `npm i`:
![npm install](assets/images/npm-install.PNG)

Podemos ver que um diretório chamado **node_modules** foi criado. É nele que todas as dependências de um projeto ficam, seja em um ambiente de desenvolvimento (como o nosso) ou um de produção (servidor). É comum e boa prática ignorar o **node_modules** inteiro em ferramentas de controle de versão (como o GitHub). Fazemos isso criando um arquivo chamado [.gitignore](.gitignore) e adicionando "node_modules/" a ele. No meu caso, quando criei o repositório no GitHub já selecionei um modelo de arquivo .gitignore feito para Node.js, que contém as configurações mais comuns para este tipo de projeto. (Há vários tipos, você pode ver todos os templates em [New Repository](https://github.com/new)).

## Rodando o nosso projeto

Chegou a hora de ver se tudo até agora funcionou! Quando o arquivo [package.json](package.json) foi criado, um script chamado "start" foi criado junto. Ele é uma maneira mais fácil que utilizaremos para inicializar o nosso servidor. Podemos ver que ele é simplesmente um atalho que executa o comando `node ./bin/www`, ou seja, roda com `node` o arquivo [www](www) no diretório [bin](/bin). Para executar um script, utilizamos o comando `npm run <script>`, então no nosso caso fazemos `npm run start`:
![npm run start](assets/images/npm-run-start.PNG)

Por padrão, o servidor roda na porta 3000. Podemos então acessar a página [http://localhost:3000]() para ver se tudo deu certo:
![Welcome to Express](assets/images/welcome-to-express.png)

Oba! Tudo funcionou corretamente e estamos vendo a página padrão do Express sendo renderizada na raiz do site.

## O que são rotas?

Rotas são os caminhos que configuramos para que os serviços que a nossa aplicação vai disponibilizar sejam acessados. No nosso caso, por exemplo, criaremos uma rota para manipularmos os usuários e suas músicas preferidas. Os diferentes "caminhos" de uma API são chamados de **endpoints**.

---

Você pode perceber que o nosso modelo de projeto já veio com duas rotas configuradas, que são os arquivos em [routes/](/routes). Se abrirmos o arquivo [routes/index.js](/routes/index.js), veremos que há apenas um endpoint configurado. O método definido foi GET, no caminho '/' e a função executada quando o endpoint é acessado renderiza a **view** [views/index.ejs](/views/index.ejs), passando um parâmetro chamado _title_ com o valor _Express_. Se trocarmos este valor:

![title: node](/assets/images/title-node.png)

e acessarmos novamente a página em [http://localhost:3000](), veremos que o texto... Continua o mesmo! Por que será? 🤔

Há alguns minutos, nós iniciamos o nosso servidor, e em não fizemos nenhum tipo de atualização nele. Em outras palavras, ele não tem a menor ideia de que nós mudamos alguma coisa no nosso código. Para que as nossas mudanças façam efeito, devemos parar a execução do servidor, e depois iniciá-la novamente. Paramos a execução de algum processo com o comando `Ctrl+C`, e depois usamos o mesmo comando de antes:

![restart server](/assets/images/restart-server.png)

Se acessarmos a página novamente, poderemos ver que a nossa mudança fez efeito!

![Welcome to Node](/assets/images/welcome-to-node.png)

## Nodemon

Como você pode imaginar, é muito trabalhoso e nem um pouco eficiente ter que ir para o terminal, parar o servidor e iniciá-lo novamente a cada mudança que fazemos no nosso código. Para a nossa comodidade, existe um pacote que faz exatamente isso para nós! Para instalar, basta executar o comando `npm install -g nodemon`. Depois de instalado, podemos verificar que está tudo certo usando o comando `nodemon -v`, que mostra a versão do nodemon instalada:

![nodemon -v: 2.0.4](/assets/images/nodemon-version.png)

No arquivo [package.json](/package.json), vamos criar um novo script para que o servidor se reinicie automaticamente. Em `"scripts"`, vamos adicionar mais uma entrada. Vou chamar o meu de `watch`, mas não é obrigatório que ele seja chamado assim.

!["watch": "nodemon ./bin/www"](/assets/images/watch-script.png)
**É importante observar que arquivos com a extensão JSON devem, **obrigatoriamente**, conter chaves e valores envolvidos com **aspas duplas (")\*_._

Se executarmos agora `npm run watch`, veremos que o servidor é reiniciado toda vez que um arquivo é atualizado, fazendo com que sempre tenhamos a versão mais recente do nosso programa sendo executada sem a necessidade de fazer todo o processo de reinicialização manualmente.
