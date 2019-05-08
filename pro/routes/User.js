var express = require('express');
var router = express.Router();
var $ = require('../Controllers/UserController')

/* GET users listing. */
router.get("/",$.get)
    .post('/',$.add)
    .get("/hot",$.getHot)
    .get("/search",$.search)
    .get("/order",$.getOrder)
    .post("/order",$.delete)
    .post("/order/add",$.addOrder)
module.exports = router;
