const express = require('express');
const Router = express.Router();

const {
    PlaceOrder
} = require('../controllers/OrderManagementController');

Router.post('/PlaceOrder',PlaceOrder);

module.exports = Router;