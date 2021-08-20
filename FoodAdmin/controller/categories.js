var categoryServices = require('../services/categories')

exports.getListCategories = async function getListCategories() {
    return await categoryServices.getListCategories()
}

exports.addNew = async function addNewCategory(params) {
    let { name, icon } = params
    let category = {
        name: name,
        icon: icon,
    }
    await categoryServices.addNew(category)
}

exports.getCategoryByID = async function getCategoryByID(params) {
    let { id } = params
    return await categoryServices.getCategoryByID(id)
}

exports.edit = async function editCategory(params, body) {
    let { id } = params
    let { name, icon } = body
    let category = { id, name, icon }
    await categoryServices.edit(category)
}

exports.remove = async function removeCategory(params) {
    let { id } = params
    await categoryServices.remove(id)
}