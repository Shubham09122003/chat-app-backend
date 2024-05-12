const mongoos = require('mongoose');

const userSchema = new mongoos.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['AVAILABLE', 'BUSY'], default: 'AVAILABLE' }
});

module.exports = mongoos.model('User', userSchema);