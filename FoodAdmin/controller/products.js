var productService = require('../services/products')

exports.getListProducts = async function getListProducts() {
    return await productService.getListProducts()
}

exports.addNew = async function addNewProduct(params) {
    let { nameProduct, price, number, dateSell, description, img, idCategory } = params
    let product = {
        nameProduct: nameProduct,
        price: price,
        number: number,
        dateSell: dateSell,
        description: description,
        img: img,
        idCategory: idCategory,
    }
    await productService.addNew(product)
}

exports.getProductByID = async function getProductByID(params) {
    let { id } = params
    let product = await productService.getProductByID(id)
    return product
}

exports.edit = async function editProduct(params, body) {
    let { id } = params
    let { nameProduct, price, number, dateSell, description, img, idCategory } = body
    let product = { id, nameProduct, price, number, dateSell, description, img, idCategory }
    await productService.edit(product)
}

exports.remove = async function removeProduct(params) {
    let { id } = params
    await productService.remove(id)
}

exports.searchByName = async function searchByName(keyword) {
    return await productService.searchByName(keyword)
}