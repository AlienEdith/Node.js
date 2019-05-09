var express = require("express");
var router = express.Router({mergeParams: true});
const auth_check = require("../middleware/check-auth");

const OrdersController = require('../controllers/orders');
// INDEX
router.get("/", auth_check, OrdersController.orders_get_all);
// CREATE
router.post("/", auth_check, OrdersController.orders_create_order);
// SHOW
router.get("/:orderId", auth_check, OrdersController.orders_show_order);
// DESTORY
router.delete("/:orderId", auth_check, OrdersController.orders_delete_order);

module.exports = router;