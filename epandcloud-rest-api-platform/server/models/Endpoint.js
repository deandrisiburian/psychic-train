const mongoose = require('mongoose');

const EndpointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  method: { type: String, enum: ['GET', 'POST'], default: 'GET' },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Endpoint', EndpointSchema);
