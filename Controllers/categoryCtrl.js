// categoryCtrl.js

const express = require('express');
const Category = require('../model/categoryModel');
const categoryValidation = require('../validation/categoryValidation');


exports.createCategory = (req, res) => {
  const { body, user } = req;

  const { error } = categoryValidation(body);
  if (error) return res.status(400).json(error.details[0].message);

  const category = new Category({ ...body, user: user._id });

  category
    .save()
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((error) => res.status(500).json(error));
};

exports.getCategory = (req, res) => {
  const { user } = req;

  Category.find({ user: user._id })
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => res.status(500).json(error));
};

exports.updateCategory = (req, res) => {
  const { body, params, user } = req;

  const { error } = categoryValidation(body);
  if (error) return res.status(400).json(error.details[0].message);

  Category.findOneAndUpdate({ _id: params.id, user: user._id }, body, { new: true })
    .then((category) => {
      if (!category) return res.status(404).json({ msg: 'Catégorie non trouvée' });

      res.status(200).json(category);
    })
    .catch((error) => res.status(500).json(error));
};

exports.deleteCategory = (req, res) => {
  const { params, user } = req;

  Category.findOneAndDelete({ _id: params.id, user: user._id })
    .then((category) => {
      if (!category) return res.status(404).json({ msg: 'Catégorie non trouvée' });

      res.status(200).json({ msg: 'Catégorie supprimée avec succès' });
    })
    .catch((error) => res.status(500).json(error));
};

exports.getTest = (req, res) => {
    const { params, user } = req;
    console.log('getCategory called');
    console.log(params); // Assurez-vous que ce message s'affiche dans la console
    // Votre code de récupération des données de catégorie ici
  };
  