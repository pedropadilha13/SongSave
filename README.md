# SongSave

Repositório para estudar os principais aspectos de Node.js e um pouco mais :)

## Índice

- [Instalação](#instalação)

- [npm](#npm)

- [O que faremos?](#o-que-faremos)

- [Criando a estrutura do projeto](#criando-a-estrutura-do-projeto)

- [Vamos entender melhor o que ele criou:](#vamos-entender-melhor-o-que-ele-criou)

- [Instalando as dependências](#instalando-as-dependências)

- [Rodando o nosso projeto](#rodando-o-nosso-projeto)

- [O que são rotas?](#o-que-são-rotas)

- [Nodemon](#nodemon)

- [app.js](#appjs)

- [Bootstrap](#bootstrap)

- [Interpolando valores na página](#interpolando-valores-na-página)

- [Criando um Banco de Dados](#criando-um-banco-de-dados)

- [Mongoose](#mongoose)

- [db.js](#dbjs)

- [.env](#env)

- [Schemas](#schemas)

- [Recapitulando...](#recapitulando)

- [Página de Login... Ou apenas uma Partial?](#página-de-login-ou-apenas-uma-partial)

- [O que é uma Partial View?](#o-que-é-uma-partial-view)

- [Estilos e Scripts dinâmicos](#estilos-e-Scripts-dinâmicos)

- [Login](#login)

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

_É importante observar que arquivos com a extensão JSON devem, **obrigatoriamente**, conter chaves e valores envolvidos com **aspas duplas (")**._

Se executarmos agora `npm run watch`, veremos que o servidor é reiniciado toda vez que um arquivo é atualizado, fazendo com que sempre tenhamos a versão mais recente do nosso programa sendo executada sem a necessidade de fazer todo o processo de reinicialização manualmente.

## [app.js](/app.js)

☝️ Clique aqui para abrir o arquivo, nele estão alguns comentários :)

## Bootstrap

Para deixarmos nosso sistema visualmente apresentável, vamos usar [Bootstrap](https://getbootstrap.com/). Como o foco aqui é mais backend e não o design da aplicação em si, não focaremos muito em CSS e estilização em geral.

Podemos usar o [template](https://getbootstrap.com/docs/4.5/getting-started/introduction/#starter-template) para começar o nosso desenvolvimento.

## Interpolando valores na página

Em [views](/views), vamos criar um novo arquivo chamado [main.ejs](views/main.ejs) e colar o template nele. Podemos testar que está funcionando apenas mudando o arquivo que é renderizado em [routes/index.js](routes/index.js) e atualizando a página em nosso navegador:

![res.render('main');](/assets/images/render-main.PNG)

![Hello World](/assets/images/hello-world.PNG)

Está tudo funcionando, ótimo! Msa não queremos sempre mostrar uma mensagem "Hello World" para os visitantes do site. Já vimos que podemos passar informações do nosso servidor direto para a página apenas adicionando um objeto depois do nome da _view_ que queremos renderizar. Vamos relembrar! No nosso render, vamos adicionar um objeto que contém um nome:

![res.render('main', { name: 'Joãozinho' });](/assets/images/render-with-name.PNG)

Na nossa _view_, podemos adicionar `<% name %>` para interpolar o valor da nossa variável!

![Hello, <% name %>!](/assets/images/hello-name.PNG)

Pronto! Agora se atualizarmos o navegador veremos a mensagem nova:

![Hello, Joãozinho!](/assets/images/hello-joaozinho.PNG)

Podemos passar quantos atributos quisermos para a _view_, e vimos que é bem simples exibir os valores. Mais para frente veremos que também é possível, por exemplo, iterar todos os itens de um Array passado para uma _view_ e exibir todos os valores de forma fácil e elegante.

## Criando um Banco de Dados

Para a nossa aplicação, vamos usar o MongoDB. Para isso, precisamos ter uma conta no [Atlas](https://cloud.mongodb.com/) (não se preocupe, é de graça). Para criar _Projects_, precisamos antes ter uma _Organization_ criada. Basta seguir os passos que o próprio site mostra para fazer isso de forma extremamente fácil. Com uma _Organization_ criada, podemos criar um novo Projeto Clicando em "_+ New Project_". Chamei o meu de SongSave, mas você pode chamar o seu do nome que quiser!

Depois de criarmos o projeto, devemos criar um _Cluster_. Para isso, basta clicar no botão "_Build a Cluster_", selecionar a primeira alternativa (free), e clicar em "_Create a Cluster_". É possível também dar um nome ao seu Cluster (o padrão é "Cluster0", que pode causar confusão). Vou nomear o meu "songsave", para ficar fácil. O processo de criação não demora mais que 5 minutos, e enquanto ele é executado, já podemos criar nosso usuário para acessar o banco. Clique em "Database Access" no menu lateral, e em seguida "Add New Database User". Temos que dar um nome e uma senha ao usuário. Darei novamente o nome de "songsave", apenas para ficar fácil de lembrar. Clicando em "Autogenerate Secure Password", uma senha será gerada. Lembre-se de copiar a senha e guardá-la em um local seguro, porque não é possível visualizá-la depois. (Podemos sempre criar uma senha nova, mas em seguida vamos conectar o nosso servidor ao Mongo, e não precisaremos mais nos preocupar com a senha)

Para fazermos a conexão, precisamos de algumas informações importantes, como o usuário e senha que criamos, nome do banco e o local do servidor. Tudo isso pode ser encontrado no que chamamos de _connection string_, que pode ser obtida clicando em _CONNECT_ no nosso Cluster.

Você deverá liberar o seu IP para acessar o banco, pois o servidor só aceita conexões de clientes que estão presentes em uma whitelist. Você pode liberar todos os IPs, embora não seja recomendado por questões de segurança. Depois disso, escolha o método que permite conectar a sua aplicação e copie a _connection string_ fornecida. Note que nela há um espaço onde está o texto `<password>`. Você deverá substituí-lo pela sua senha para que a conexão seja realizada. Você deve, também, substituir `<dbname>` pelo nome do seu banco. No meu caso, chamei o banco de `dev` (estamos em um ambiente de desenvolvimento, por isso o nosso banco será dev. Quando fizermos o deploy do nosso sistema, vamos trocar o banco para `prod`, garantindo assim que não haverá interferência de um ambiente no outro).

## Mongoose

Para conectar o nosso servidor ao banco, vamos usar um pacote chamado [Mongoose](https://mongoosejs.com/). Para instalá-lo, simplesmente executamos `npm install mongoose` no nosso terminal:

![npm install mongoose](/assets/images/npm-install-mongoose.PNG)

## [db.js](/services/db.js)

Para organizar melhor os serviços do nosso sistema, vamos criar uma pasta [services](/services). Agora, dentro dela, vamos criar um arquivo [db.js](services/db.js) para conectar o nosso servidor ao banco. Nele, devemos importar o **mongoose** com a seguinte instrução:

```javascript
const mongoose = require('mongoose');
```

Depois, criamos uma função chamada connectDB, nela inserimos um bloco try/catch. Dentro dele, tentaremos iniciar a conexão com o banco. Note que aqui devemos inserir a nossa _connection string_ completa:

```javascript
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://songsave:gxgDJWcvHrMmCn65@cluster0.ky6xj.mongodb.net/dev?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
};
```

(Caso haja dúvidas a respeito da sintaxe utilizada, você pode ler um pouco mais aqui: [Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions))

Finalmente, exportamos a nossa função no fim do arquivo:

```javascript
module.exports = connectDB;
```

Voltando ao [app.js](app.js), importamos e logo abaixo já invocamos a nossa função:

```javascript
const connectDB = require('./services/db');

connectDB();
```

Se tudo der certo, a mensagem "MongoDB connected" aparecerá no console:

![MongoDB connected](/assets/images/mongodb-connected.PNG)

Caso um erro ocorra, certifique-se de que:

- seu nome de usuário e senha estão corretos
- seu IP atual está com acesso liberado no Atlas
- a senha **não** está com os caracteres '<' e '>' em volta

## .env

Por motivos de segurança, **nunca** deixamos dados sensíveis no nosso código. Um exemplo é a nossa _connection string_. Ela dá acesso ao nosso banco de dados, então não faz sentido deixar qualquer pessoa ter acesso a ela. Para isso, vamos utilizar **Variáveis de Ambiente**. Vamos criar um arquivo [.env](.env), e nele adicionar as nossas informações secretas. Logicamente, arquivos .env também nunca fazem parte do nosso controle de versão (ou seja, não vamos subir para o repositório). Além de ser muito fácil, essa abordagem que vamos utilizar vai facilitar a nossa vida mais para frente!

No nosso [.env](.env), devemos simplesmente colocar `chave=valor`, sem nenhum tipo de notação complicada:

```
MONGO_URI=mongodb+srv://songsave:gxgDJWcvHrMmCn65@cluster0.ky6xj.mongodb.net/dev?retryWrites=true&w=majority
```

O nosso servidor não sabe que queremos usar essas Variáveis de Ambiente, então temos que explicar isso para ele! Faremos isso usando o pacote [dotenv](https://www.npmjs.com/package/dotenv):

![npm install dotenv](assets/images/npm-install-dotenv.PNG)

Agora fazemos a inicialização no topo do nosso [app.js](app.js):

```javascript
require('dotenv').config();
```

Agora, em [db.js](services/db.js) fazemos a seguinte chamada:

```javascript
const conn = await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

Pronto! Se rodarmos o nosso script `watch` novamente, vamos ver que tudo está funcionando ainda, e não temos que nos preocupar com pessoas erradas tendo acesso ao nosso banco, chaves de APIs, ou qualquer informação coisa privada.

![MongoDB connected](assets/images/dotenv-ok.PNG)

## Schemas

Agora que temos a nossa conexão funcionando normalmente, podemos começar a pensar nas Entidades que nosso sistema vai ter. Temos que ter um Schema para guardar nosso usuários e outro para guardar as playlists que eles vão criar. Vou criar um diretório [models/](/models), e nele criaremos os seguintes arquivos:

- [User.js](models/User.js)
- [Link.js](models/Link.js)
- [Playlist.js](models/Playlist.js)

Em [User.js](models/User.js), fazemos uso do módulo `bcrypt`, então não devemos nos esquecer de executar o comando `npm install bcrypt` no terminal.

Agora, no [app.js](app.js), devemos importar os 3 arquivos criados. Vamos fazer isso logo antes de conectarmos ao banco:

```javascript
const connectDB = require('./services/db');
require('./models/User');
require('./models/Link');
require('./models/Playlist');

connectDB();
```

Com as mudanças que fizemos, agora já podemos começar a desenvolver nosso sistema de verdade!

## Recapitulando...

Vamos lembrar, de forma geral, o que fizemos até agora:

- Criamos o projeto usando o template do [Express.js](https://expressjs.com/)
- Criamos um Banco de Dados no [Atlas](https://cloud.mongodb.com/)
- Conectamos nossa aplicação ao Banco
- Criamos Schemas para armazenar dados

Agora vamos começar a desenvolver nossa primeira tela!

## Página de Login... Ou apenas uma Partial?

Para identificarmos quem é quem no nosso sistema, vamos implementar as funções de **Cadastro** e **Login**. Poderíamos fazer uma página para cada, e depois uma página diferente para as áreas restritas do site, mas vamos fazer diferente: teremos uma página "master", e vamos inserir outras páginas menores dentro dela. Faremos isso usando _Partial Views_.

##### O que é uma Partial View?

É, de forma simplificada, uma _View_ que é encaixada dentro de outra. Lembra quando inserimos "Joãozinho" na nossa página pelo `render`? Faremos a mesma coisa agora, mas inserindo outras páginas e componentes em vez de texto apenas.

Dentro de [views](/views), vamos criar o diretório [shared](/views/shared) para guardar os pedaços que vamos compartilhar entre as diferentes páginas.

Já temos o arquivo [views/main.ejs](/views/main.ejs), e vamos usá-lo como "master". Podemos fazer alguns refatoramentos para facilitar não só uma possível manutenção futura, mas também nosso entendimento agora.

Podemos separar as principais áreas do [main.ejs](views/main.ejs) atual em pedaços menores, e depois incluí-los de volta:

- [\_header.ejs](views/shared/_header.ejs)
- [\_scripts.ejs](views/shared/scripts.ejs)

Depois, basta incluir os fragmentos da seguinte forma: `<% include caminho/para/partial %>`

![main.ejs](/assets/images/main-ejs-refactor.png)

Veja como nosso arquivo [main.ejs](views/main.ejs) ficou muito menor e fácil de entender. Quando separamos nossas diferentes partes do sistema em pedaços menores, fica muito mais fácil adicionar novas funcionalidades, modificar as que já existem e principalmente resolver potenciais erros que seu sistema possa apresentar, tanto em desenvolvimento quanto em produção.

Agora, vamos criar uma página de **Login** e inserí-la na nossa view principal:

[/views/login.ejs](/views/login.ejs)

E inserimos `<% include login %>` na _view_ principal.

Um teste rápido mostra que estamos inserindo corretamente:

![Login](/assets/images/include-login.png)

Vamos mover "Hello, Joãozinho!" para uma nova partial, [index.ejs](views/index.ejs) e tirar o último include que fizemos para testar.

Para renderizar uma página específica, vamos passar o argumento `page` no segundo argumento de `render`. Recebemos isso no nosso [main.ejs](views/main.ejs) assim:

![include(locals.page || 'index')](/assets/images/include-page-or-index.png)

`locals` é onde recebemos os argumentos na _view_. Como vimos, podemos usar apenas o nome de algum argumento, mas se ele não existir um erro acontece. Usando `locals`, evitamos esse comportamento.

Perceba que não estamos apenas incluindo uma página, mas fazemos um teste lógico também: Se locals.page existir, ele será usado, mas caso o valor dele seja `falsy`, a _view_ `index` será incluída por padrão. Um valor é `falsy` quando é considerado `false` em uma situação de comparação lógica. São eles:

```javascript
undefined, null, NaN, 0, '' e false
```

Com isso, podemos fazer um teste e verificar que tudo está funcionando como esperado, basta fazer uma pequena modificação na nossa rota principal:

```javascript
router.get('/', function (req, res, next) {
  res.render('main', { page: 'login' });
});
```

![Login](/assets/images/render-page-login.png)

Agora que já temos como escolher qual página vamos mostrar de forma simples, vamos começar a separar melhor as nossas rotas:

Vou criar um arquivo novo para armazenar todas as nossas rotas relacionadas a **autenticação**, [auth.js](/routes/auth.js). Vamos começar com uma rota básica:

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('main', {
    page: 'login'
  });
});

module.exports = router;
```

Podemos apagar a rota que veio configurada, [users.js](/routes/users.js), não esquecendo de apagar o `require` e o `use` no [app.js](app.js).

No lugar dele, vamos incluir nossa authRoute e usá-la:

```javascript
[...]

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

[...]

app.use('/', indexRouter);
app.use('/auth', authRouter);

[...]
```

Agora, se navegarmos até [http://localhost:3000/auth](http://localhost:3000/auth), vamos ver que a página certa apareceu:

![localhost:3000/auth Login](assets/images/localhost-auth.png)

Perceba que o título da página é sempre o mesmo, "Hello, world!". Podemos usar a mesma técnica para mudar o título de acordo com a página que estamos renderizando. Em [\_header.ejs](/views/shared/_header.ejs), vamos mudar a tag `<title>`:

![<%= locals.title || "SongSave" %>](/assets/images/locals-title.png)

Assim, podemos sempre escolher qual será o título da página, e garantimos que "SongSave" aparecerá quando não especificarmos nada.

## Estilos e Scripts dinâmicos

Outra mudança interessante que faremos é adicionar a possibiidade de carregar arquivos **css** e **js** direto do `render`, que é útil para arquivos que só serão usados em algumas páginas específicas:

Vamos criar uma nova _Partial View_ chamada [\_styles.ejs](/views/shared/_styles.ejs):

```
<% locals.styles && styles.forEach(style => {
    if (style.substr(0, 4) !== "http") { %>
        <link rel="stylesheet"
            href="/assets/css/<%= style.match(/[a-z0-9]{0,}\.css$/gi) ? style : `${style}.css?version=${parseInt(Math.random() * 10000000)}` %>" />
    <% } else { %>
        <link rel="stylesheet" href="<%= style %>" />
    <% } %>
<% }); %>
```

Pode parecer meio complicado, mas na verdade tudo que fazemos aqui é iterar por todos os `styles` fornecidos, e para cada um fazemos um pequeno teste: se ele não começar com 'http', ou seja, se não for um link externo, incluímos o arquivo do diretório `/assets/css/`, e caso o caminho seja um link, incluímos normalmente.

Não podemos nos esquecer de incluir a nossa nova partial em [\_header.ejs](/views/shared/_header.ejs)

<% include \_styles %>

Faremos a mesma coisa para arquivos JS em [\_scripts.ejs](/views/shared/_scripts.ejs).

```ejs
[...]
<% locals.scripts && scripts.forEach(script => { %>
<script
  src="/assets/js/<%= script.match(/[a-z0-9]{0,}\.js$/gi) ? script : `${script}.js?version=${parseInt(Math.random() * 10000000)}` %>"></script>
<% }); %>
```

Agora, se adicionarmos `styles: ['login']` ao nosso render, vamos ver que o arquivo _login.css_ vai ser carregado pela nossa página:

![login.css](/assets/images/login-network.png]

Podemos então criar estilos específicos para algumas páginas, e não ter apenas um arquivo gigante com todo o estilo do site inteiro. Mais uma vez, facilitando o entendimento e evitando erros.

## Login

Agora já temos tudo para criar nosso layout de Login!

[login.ejs](views/_login.ejs)

[login.css](public/assets/css/login.css)

Se tentarmos enviar o formulário, vamos ver que recebemos um erro 404 de volta. Isso acontece porque o navegador tenta fazer um POST em /auth, mas ainda não implementamos o método POST em [auth.js](/routes/auth.js). Vamos fazer isso agora!
