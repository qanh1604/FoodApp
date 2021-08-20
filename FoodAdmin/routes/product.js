var express = require('express');
var router = express.Router();
var checkLogin = require('../commons/authenticate')
var upload = require('../commons/upload')
var productController = require('../controller/products')
var categoryController = require('../controller/categories')

/* GET home page. */
router.get('/', checkLogin.check, async function (req, res, next) {
  let list = await productController.getListProducts()
  res.render('product', { list });
});
/* GET add new page. */
router.get('/add-product', async function (req, res, next) {
  let list = await categoryController.getListCategories()
  res.render('new-product', { list });
});

var middleAddProduct = [checkLogin.check, upload.single('img')]

router.post('/add-product', middleAddProduct, async function (req, res, next) {
  let { body } = req
  if (req.file) {
    let imgURL = req.file.originalname
    body = { ...body, img: imgURL }
  }

  await productController.addNew(body)
  res.redirect('/product')
});

/* Edit */
router.get('/edit-product/:id', async function (req, res, next) {

  let product = await productController.getProductByID(req.params)
  let list = await categoryController.getListCategories();

  res.render('edit-product', { product, list });
});

router.post('/edit-product/:id', middleAddProduct, async function (req, res, next) {

  let { params, body } = req
  if (req.file) {
    let imgURL = req.file.originalname
    body = { ...req.body, img: imgURL }
  }
  await productController.edit(params, body)

  res.redirect('/product')
});

router.delete('/delete/:id', checkLogin.check, async function (req, res, next) {

  let { params } = req
  await productController.remove(params)

  res.json({ res: true })

});

router.get('/category', checkLogin.check, async function (req, res, next) {
  let list = await categoryController.getListCategories()
  res.render('category', { list });
});

router.get('/category/add-category', checkLogin.check, function (req, res, next) {
  res.render('new-category');
});

router.post('/category/add-category', checkLogin.check, async function (req, res, next) {

  let { body } = req
  if (req.file) {
    let iconURL = req.file.originalname
    body = { ...body, icon: iconURL }
  }

  await categoryController.addNew(req.body)
  res.redirect('/product/category')
});

router.get('/category/edit-category/:id', checkLogin.check, async function (req, res, next) {

  let category = await categoryController.getCategoryByID(req.params)

  res.render('edit-category', { category });
});

router.post('/category/edit-category/:id', checkLogin.check, async function (req, res, next) {

  let { params, body } = req
  await categoryController.edit(params, body)

  res.redirect('/product/category')
});

router.delete('/category/delete/:id', checkLogin.check, async function (req, res, next) {

  let { params } = req
  await categoryController.remove(params)

  res.json({ res: true })

});

router.get('/autocomplete/', function (req, res, next) {

  var regex = new RegExp(req.query["term"], 'i');

  var productFilter = productController.find({ nameProduct: regex }, { 'nameProduct': 1 }).sort({ "updated_at": -1 }).sort({ "created_at": -1 }).limit(20);
  productFilter.exec(function (err, data) {
    console.log(data);
    var result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(user => {
          let obj = {
            id: user._id,
            label: user.nameProduct,
          };
          result.push(obj);
        });
      }
      res.json(result);
    }
  });

});

router.post('/search', async function (req, res) {
  let name = req.body.product
  let arr = await productController.searchByName(name)
  res.json({ success: true, data: arr })
})

module.exports = router;
