const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    id:String,
    name: String,
    total: Number,
    products: [],
    image: String,
});

module.exports = mongoose.model('Order', OrderSchema);