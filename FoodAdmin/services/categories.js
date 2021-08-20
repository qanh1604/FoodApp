var categoryModel = require('../models/categoryModel')
var productModel = require('../models/productModel')

exports.getListCategories = async function getListCategories() {
    return await categoryModel.find()
}

exports.addNew = async function addNewCategory(category) {
    const s = new categoryModel(category)
    await s.save()
}

exports.getCategoryByID = async function getCategoryByID(id) {
    return await categoryModel.findById(id)
}

exports.edit = async function editCategory(category) {
    let cate = await categoryModel.findById(category.id)
    if (cate) {
        cate.name = category.name
        if (category.icon) {
            cate.icon = category.icon
        }
        await cate.save()
    }

}

exports.remove = async function removeCategory(id) {
    await categoryModel.remove({ _id: id })
}