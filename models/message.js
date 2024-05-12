const mongoo = require('mongoose');

const messageSchema = new mongoo.Schema({
  sender: { type: mongoo.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoo.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoo.model('Message', messageSchema);