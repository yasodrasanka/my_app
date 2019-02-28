const express = require('express');
const router = express.Router();
//const MongoClient = require('mongodb').MongoClient;
const Product = require('../models/Product');
const Order = require('../models/Order');
var ObjectId = require('mongoose').Types.ObjectId;

//test
router.post('/', function(req, res) {

    Product.find({}, function(err, result) {
        if (err) throw err;
        res.send(result);
    });

    //res.redirect('/')

});


//edit order details(add product or edit details of a product)
router.post('/order/edit', function(req, res) {
    if(req.body.productID !=null){
        //console.log('old product');
        console.log('old product',req.body.productID);
        Order.update( { id:req.body.id, _id: new ObjectId(req.body._id), "products._id": new ObjectId(req.body.productID)}, 
        { '$set': {"products.$.quantity":req.body.quantity }},


    
            function(err,result) {
                if (err) throw err;
            //console.log(result);
             
            res.send(req.body.productID);
        });
    }
    else{
        
        req.body.product._id=new ObjectId();
        console.log('new product',req.body.product._id);
        Order.update( { id:req.body.id, _id: new ObjectId(req.body._id)}, 
        { '$push': {"products":req.body.product }},
        function(err,result) {
            if (err) throw err;
        //console.log(result);
        res.send(req.body.product._id);
    });
        console.log('else function');

    }

});

//remove an order
router.post('/order/remove', function(req, res) {
    //console.log(req.body);
    Order.remove( { id:req.body.id, _id: new ObjectId(req.body._id)}, 
    
        function(err,result) {
            if (err) throw err;
        //console.log(result);
        
        
        res.send(result);
    });


});

//add a new order
router.post('/order/add', function(req, res) {
    //console.log(req.body);
    let currentdate = new Date(); 
    let datetime = "Order - " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    let order = new Order({
        id: req.body.id,
        name: datetime,
        total: 0,
        products: [],
        image: 'https://www.datiopos.com/assets/img/freeze/Slides/apple_ipad_datio_pos_printer.gif',
    
    });

    order.save();
    //res.send(order);

    



});

//search new order details
router.post('/neworder', function(req, res) {

    Order.find({id:req.body.id}, function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result[result.length-1]);
        
    });
    //res.redirect('/')

});

//save the order total
router.post('/order/total', function(req, res) {
    console.log("inside order total backend")
    Order.updateMany( { id:req.body.id, _id: new ObjectId(req.body._id)}, 
    { '$set': {"total":req.body.total }},


        function(err,result) {
            if (err) throw err;
        //console.log(result);
        
        
        res.send(result);
    });


});

//remove an exsisting product
router.post('/product/remove', function(req, res) {
    //console.log(req.body);
    Order.update( { id:req.body.id, _id: new ObjectId(req.body._id)}, 
    { '$pull': {"products":{_id:new ObjectId(req.body.productId)}}},


        
        // { id:req.body.id, _id:req.body._id},{
        //  $pull: {"products": req.body.productID }
    
    
    //'products.Object._id':req.body.prodcutID

    // },//{$set:{"products.name":"ras"}},
        function(err,result) {
            if (err) throw err;
        //console.log(result);
        
        
        res.send(result);
    });


});

//find the all orders under user id
router.post('/order', function(req, res) {

    Order.find({id:req.body.id}, function(err, result) {
        if (err) throw err;
   
        res.send(result);
    });

    //res.redirect('/')

});

// find the order details of individual order
router.post('/individual', function(req, res) {

    Order.find({
        id:req.body.id, 
        _id:req.body._id
    
    }, 
    function(err, result) {
        if (err) throw err;
   
        res.send(result);
    });

    //res.redirect('/')

});


module.exports = router;



