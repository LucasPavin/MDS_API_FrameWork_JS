const mongoose = require('mongoose');

// Model des catégories, nous retrouvons un et l'utilsateur connecté afin de les associés
const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
});

module.exports = mongoose.model('category', categorySchema);