var categoryService = require('./categories')
var categoryModel = require('../models/categoryModel')
var productModel = require('../models/productModel')

exports.getListProducts = async function getListProducts() {
  let products = await productModel.find().populate('idCategory')
  return products
}

exports.addNew = async function addNewProduct(product) {
  const s = new productModel(product)
  await s.save()
}

exports.getProductByID = async function getProductByID(id) {
  return await productModel.findById(id)
}

exports.edit = async function editProduct(product) {

  let pro = await productModel.findById(product.id)
  if (pro) {
    pro.nameProduct = product.nameProduct
    pro.price = product.price
    pro.number = product.number
    pro.dateSell = product.dateSell
    pro.description = product.description
    pro.idCategory = product.idCategory
    if (product.img) {
      pro.img = product.img
    }
    await pro.save()
  }

}

exports.remove = async function removeProduct(id) {
  await productModel.remove({ _id: id })
}

exports.searchByName = async function searchByName(keyword) {
  return await productModel.find({ nameProduct: { $regex: `.*(?i)${keyword}.*` } }).populate('idCategory')
}