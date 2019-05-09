var express     =   require("express");
var router      =   express.Router({mergeParams: true});

// Multer: upload files
var multer      =   require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')  //Store the data uploaded by multer
      },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      }    
})

const fileFilter = (req, file, cb) => {    
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true);     //accept a file
    } else {
        cb(new Error("Wrong format"), false);    //reject a file
    }    
}

var upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5,
    },
    fileFilter: fileFilter
});

const auth_check = require("../middleware/check-auth");
const ProductsController = require('../controllers/products');

// INDEX
router.get("/", ProductsController.products_get_all);
// CREATE
router.post("/", auth_check, upload.single('productImage'), ProductsController.products_create_product);
// SHOW
router.get("/:productId", ProductsController.products_show_product);
// UPDATE
router.patch("/:productId", auth_check, ProductsController.products_update_product);
// DESTORY
router.delete("/:productId", auth_check, ProductsController.products_delete_product);

module.exports = router;