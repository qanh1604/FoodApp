const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    nameProduct: { type: String },
    price: { type: Number },
    number: { type: Number },
    dateSell: { type: Date},
    description: { type: String},
    idCategory: { type: Schema.Types.ObjectId, ref: 'Category'},
    img: { type: String },
    
})

module.exports = mongoose.model('Product', productSchema)