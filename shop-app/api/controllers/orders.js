const mongoose  =   require("mongoose");
const Product   =   require("../models/product");
const Order   =   require("../models/order");

exports.orders_get_all = (req, res, next) => {
                            Order
                                .find()
                                .select("product quantity _id")
                                .populate("product", "name price")
                                .exec()
                                .then(orders => {
                                    res.status(200).json({
                                        count: orders.length,
                                        orders: orders.map(order => {
                                            return {
                                                product: order.product,
                                                quantity: order.quantity,
                                                request: {
                                                    type: "GET",
                                                    url: "http://localhost:3000/orders/" + order._id
                                                }
                                            }
                                        }),
                                    });
                                })
                                .catch(error => {
                                    res.status(500).json({
                                        message: error
                                    })
                                })
                            };

exports.orders_create_order = (req, res, next)=>{
                            Product
                                .findById(req.body.productId)
                                .exec()
                                .then(product => {
                                    if(!product){
                                        return res.status(404).json({
                                            message: "No such product"
                                        })
                                    }
                                    var order = new Order({
                                        product: req.body.productId,
                                        quantity: req.body.quantity
                                    });
                                    return order.save();
                                })
                                .then(order => {
                                    console.log(order)
                                    res.status(201).json({
                                        message: "Orders were created",
                                        product: order
                                    });
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        message: "Product not found",
                                        error: err
                                    })
                                })
                        }                  

exports.orders_show_order = (req, res, next)=>{
    Order
        .findById(req.params.orderId)
        .select("product quantity _id")
        .populate("product", "name price")
        .exec()
        .then(Order => {
        if(!Order){
            res.status(404).json({message: "The Order does not exist"});
        } else {
            res.status(200).json({
                order: Order,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/Orders/"
                }
            });
        }   
    })
    .catch(err => { 
        console.log(err);
        res.status(500).json({error: err})
    })
}      

exports.orders_delete_order = (req, res, next)=>{
    Order
        .remove({ _id: req.params.orderId })
        .exec()
        .then(info => {
            console.log(info);
            res.status(200).json({
                message: "delete Order",
                info: info,
                request: {
                    type: "DELETE",
                    url: "http://localhost:3000/orders/",
                }
            }); 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })  
}