const express = require("express");
const router = express.Router();
const controllerOrder = require("../controller/order-co.js");

router.post("/addorder", controllerOrder.addOrder);
router.get("/listorder", controllerOrder.listOrder);
router.get("/topmap", controllerOrder.topMap);

module.exports = router;
