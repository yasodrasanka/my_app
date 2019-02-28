const express = require('express');
const router = express.Router();
//const faker = require('faker');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

router.get('/', function (req, res,next) {
    let products=[];
    let total=0;
    for (let i = 0; i < 3; i++) {
        let product = new Product({
            name : 'product'+i,
            price : i*100,
            info : 'product',
            image: "https://www.datiopos.com/assets/img/freeze/Slides/apple_ipad_datio_pos_printer.gif",
            quantity:1
        });
       //console.log(product[price]);
        total+=product.price;
        product.save();
        products.push(product);
    }

    let currentdate = new Date(); 
    let datetime = "Order - " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    let order = new Order({
        id: '5c653e943eb3ac44c07c4c4c',
        name: datetime,
        total: total,
        products: products,
        image: 'https://www.datiopos.com/assets/img/freeze/Slides/apple_ipad_datio_pos_printer.gif',
    
    });

    order.save();
    res.redirect('/');
   
    
});

module.exports = router
