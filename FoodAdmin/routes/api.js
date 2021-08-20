var express = require('express');
var router = express.Router();
var productController = require('../controller/products')
var categoryController = require('../controller/categories')

router.get('/product', async function (req, res, next) {
  let listProduct = await productController.getListProducts();
  res.json(listProduct);
});

router.get('/product/:id', async function(req, res, next) {
  let product = await productController.getProductByID(req.params);
  res.json(product);
});

router.get('/category', async function (req, res, next) {
  let listCategory = await categoryController.getListCategories();
  res.json(listCategory);
});

router.get('/category/:id', async function(req, res, next) {
  let category = await categoryController.getCategoryByID(req.params);
  res.json(category);
});

module.exports = router;
