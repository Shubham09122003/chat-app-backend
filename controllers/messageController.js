const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const message = await Message.create({ sender, receiver, content });
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    const messages = await Message.find({ sender, receiver }).sort({ createdAt: 'asc' });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
