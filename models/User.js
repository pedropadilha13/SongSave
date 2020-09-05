// Como sempre, importamos o que vamos usar no arquivo aqui em cima:
const mongoose = require('mongoose');
const { Schema } = mongoose;
// BCRYPT é o pacote que vamos usar para criptografar as senhas dos nossos usuários
const bcrypt = require('bcrypt');

// Criamos um Schema da seguinte maneira:
const UserSchema = new Schema({
  // Colocamos as propriedades que vamos armazenar,
  // e fazemos algumas configurações básicas:
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

// Podemos adicionar métidos estáticos direto no Schema assim:
UserSchema.static('findByEmail', async function (email) {
  return await this.findOne({ email });
});

// Temos também a possibilidade de adicionar 'hooks' aos Schemas
// Por exemplo, a função a seguir será executada logo antes que um save()
UserSchema.pre('save', function (next) {
  this.updated = Date.now();
  return next;
});

// Podemos também adicionar métodos aos Schemas
// O método a seguir compara uma senha fornecida com a senha do usuário, e retorna o resultado da comparação:
UserSchema.method('verifyPassword', function (password) {
  return new Promise(async resolve => {
    const passwordIsCorrect = await bcrypt.compare(password, this.password);
    resolve(passwordIsCorrect);
  });
});

// Já o próximo atualiza a senha do usuário:
UserSchema.method('updatePassword', function (newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      this.password = hashedPassword;
      this.save();
      resolve(this);
    } catch (err) {
      reject(err);
    }
  });
});

// Podemos ter métodos que fazem ações simples, como juntar o nome e sobrenome para formar o nome completo do usuário:
UserSchema.method('getName', function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);
