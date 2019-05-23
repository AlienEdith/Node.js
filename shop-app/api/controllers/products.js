const mongoose  =   require("mongoose");
const Product   =   require("../models/product");

exports.products_get_all = (req, res, next) => {
    Product
        .find()
        .select("name price _id productImage")   //Select specific field
        .exec()
        .then(products => {
            const response = {
                count: products.length,
                //structure the format, add extra info
                // .map() :  get individual data
                products: products.map(product => {
                    return {
                        name: product.name,
                        price: product.price,
                        productImage: "http://localhost:3000/" + product.productImage,
                        _id: product._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + product._id
                        }
                    }
                })
            }
            console.log(products);
            if(products.length > 0){
                res.status(200).json({
                    response: response,
                    message: "Handling GET requests to /products"
                });
            } else {
                res.status(200).json({
                    message: "No products found"
                })
            }
        })
        .catch(err => {
            console.log(products);
            res.status(500).json({error: err});
        })
}

exports.products_create_product = (req, res, next)=>{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    console.log(product);
    // .then() Mongoose Promise
    product
        .save()
        .then(product => {
            console.log(product);
            res.status(201).json({
                message: "Create product successfully",
                product: {
                    name: product.name,
                    price: product.price,
                    _id: product._id,
                    request:{
                        type: "POST",
                        url: "http://localhost:3000/products/" + product._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.products_show_product = (req, res, next)=>{
    /* Two types of error: 
        1. not valid id type for mongoDB => error
        2. valid id but not exists => product: null (not a error)
    */
    Product.findById(req.params.productId)
        .select("name price _id")
        .exec() //True promise
        .then(product => {
            if(!product){
                res.status(404).json({message: "The product does not exist"});
            } else {
                res.status(200).json({
                    product: product,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/"
                    }
                });
            }   
        })
        .catch(err => { 
            console.log(err);
            res.status(500).json({error: err})
        })
}

exports.products_update_product = (req, res, next)=>{
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.key] = ops.value
    }
    console.log(updateOps)
    Product
        .update({ _id: req.params.productId }, { $set: updateOps })
        .exec()
        .then(info => {
            console.log(info);
            res.status(200).json({
                message: "Update Product",
                info: info,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/"
                }
            });  
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
}

exports.products_delete_product = (req, res, next)=>{
    Product
        .remove({ _id: req.params.productId })
        .exec()
        .then(info => {
            console.log(info);
            res.status(200).json({
                message: "delete Product",
                info: info,
                request: {
                    type: "DELETE",
                    url: "http://localhost:3000/products/",
                    body: {name: "String", price: "Number"} 
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

