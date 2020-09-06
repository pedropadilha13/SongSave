const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

/*

  Até agora, só importamos o que vamos usar neste arquivo.
  
  Para usar uma Strategy, simplesmente criamos uma instância dela
  e passamos como parâmetro para a função passport.use().

  Na instanciação da Strategy, passamos como parâmetro uma função
  assíncrona (Mais informações em https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
  que recebe 3 argumentos: username, password e done.

  username é que utilizaremos para identificar o usuário (no nosso caso, será o e-mail dele)
  password é a senha que ele digitou. Caso um usuário com o username fornecido exista,
    temos que verificar se a senha informada é compatível com a que está gravada

  E finalmente temos done, que é uma função. Passaremos 2 parâmetros para ela, que são erro e user.
  Caso não haja erro, passaremos null como primeiro parâmetro.
  Se houver um usuário, passamos como segundo parâmetro.
  Caso não haja nenhum usuário cadastrado com o email/senha fornecidos, passamos false 

  Precisamos também criar duas funções de serialização e desserialização dos usuários, que o passport
  usa internamente. Começaremos por isso:

*/

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) =>
  User.findById(id).then(user => done(null, user))
);

// Aqui faremos o setup da Strategy
passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email'
    },
    async (req, username, password, done) => {
      try {
        const existingUser = await User.findOne({ email: username });

        console.log(existingUser);

        if (!existingUser) {
          // Email não cadastrado, retornamos null e false
          req.session.messages = [
            {
              variant: 'danger',
              content: 'Usuário/Senha inválidos'
            }
          ];
          return done(null, false);
        }

        const passwordIsCorrect = await existingUser.verifyPassword(password);

        if (passwordIsCorrect) {
          // Usuário existe e senha correta, retornamos null e o usuário
          return done(null, existingUser);
        }

        req.session.messages = [
          {
            variant: 'danger',
            content: 'Usuário/Senha inválidos'
          }
        ];
        // Senha incorreta, retornamos null e false
        return done(null, false);
      } catch (error) {
        // Se um problema ocorrer no bloco try, capturamos aqui e retornamos o erro e false
        console.error(error);
        req.session.messages = [
          {
            variant: 'danger',
            content: 'Erro ao fazer login. Por favor, tente mais tarde.'
          }
        ];
        return done(error, false);
      }
    }
  )
);
