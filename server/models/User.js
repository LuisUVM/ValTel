const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Metodo para comparar contraseñas
userSchema.methods.comparePassword = function(password) {
  const bcrypt = require('bcrypt');
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);