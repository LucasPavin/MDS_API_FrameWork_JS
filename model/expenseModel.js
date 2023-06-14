const mongoose = require('mongoose');

/**
 * Model des dépenses qui va permettre de choisir un nom de la dépense 
 * et du montant et dans quelle catégorie elle se situe
 */
const expenseSchema = mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('Expense', expenseSchema);
