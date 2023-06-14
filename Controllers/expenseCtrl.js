const Expense = require('../model/expenseModel');

/**
 * Créer une dépense en récupérant l'id de la catégorie passer dans l'url
 * Le nom et le montant seront récupérer dans le body (le json)
 * @param {*} req 
 * @param {*} res 
 */
exports.createExpense = (req, res) => {
  const { name, amount } = req.body;
  const categoryId = req.params.categoryId;

  const newExpense = new Expense({
    name: name,
    amount: amount,
    category: categoryId
  });

  newExpense
    .save()
    .then((expense) => {
      res.status(201).json(expense);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

/**
 * Code permettant d'obtenir toutes les dépenses d'une catégorie
 * dont l'id sera passé dans l'url et récupérer 
 * @param {*} req 
 * @param {*} res 
 */
exports.getExpensesByCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  Expense.find({ category: categoryId })
    .then((expenses) => {
      res.status(200).json(expenses);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

/**
 * Code permettant de récupérer une dépense sans passé par sa catégorie
 * @param {*} req 
 * @param {*} res 
 */
exports.getExpense = (req, res) => {
  const expenseId = req.params.id;

  Expense.findById(expenseId)
    .then((expense) => {
      if (!expense) {
        return res.status(404).json({ message: 'La dépense n\'a été trouvé.' });
      }
      res.status(200).json(expense);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

/**
 * Code permettant de récupérer une dépense afin de modifier 
 * soit son montant soit le nom.
 * @param {*} req 
 * @param {*} res 
 */
exports.updateExpense = (req, res) => {
  const expenseId = req.params.id;
  const { name, amount } = req.body;

  Expense.findByIdAndUpdate(expenseId, { name, amount }, { new: true })
    .then((expense) => {
      if (!expense) {
        return res.status(404).json({ message: 'Dépense introuvable' });
      }
      res.status(200).json(expense);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

/**
 * Code permettant de supprimer directement une dépense
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteExpense = (req, res) => {
  const expenseId = req.params.id;

  Expense.findByIdAndRemove(expenseId)
    .then((expense) => {
      if (!expense) {
        return res.status(404).json({ message: 'La dépense recherché est introuvable' });
      }
      res.status(200).json({ message: 'Dépense supprimée avec succès' });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
