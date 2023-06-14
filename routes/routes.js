const { Router } = require('express');
const passport = require('passport');
const { inscription, connexion } = require('../Controllers/ctrl');
const { createCategory, getCategory, updateCategory, deleteCategory, getTest } = require('../Controllers/categoryCtrl');
const { createExpense, getExpensesByCategory, getExpense, updateExpense, deleteExpense } = require('../Controllers/expenseCtrl');

const router = Router();

router.post('/inscription', inscription);
router.post('/connexion', connexion);

router.get('/', (req, res) => {
  res.send('ROUTE PAS TROP PROTÉGÉ');
});

// Toutes les routes ci-dessous seront protégées. Un JsonWebToken sera demandé.
router.use(passport.authenticate('jwt', { session: false }));

// Toutes les catégories sont protégées afin de garder la discretion des données
router.post('/categorie', createCategory);
router.get('/categorie', getCategory);
router.put('/categorie/:id', updateCategory);
router.delete('/categorie/:id', deleteCategory);

// Toutes les dépenses sont protégées afin de garder la discretion des données
router.post('/categories/:categoryId/depenses', createExpense);
router.get('/categories/:categoryId/depenses', getExpensesByCategory);
router.get('/depenses/:id', getExpense);
router.put('/depenses/:id', updateExpense);
router.delete('/depenses/:id', deleteExpense);

module.exports = router;
