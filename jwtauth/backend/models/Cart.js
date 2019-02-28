const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarttSchema = new Schema({
    username: String,
    poducts:{},
    total: Number
});

module.exports = mongoose.model('Cart', CartSchema);