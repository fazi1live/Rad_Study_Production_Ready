//Depnedemcies and Initialization
const express = require('express');
const Router = express.Router();
//Depnedemcies and Initialization


//Start Block Accessing The Library Files And Routes
const { 
    UserLogin,
    UserRegister
} = require('../controllers/UserManagementController')
//End Block Accessing The Library Files And Routes


//Start Block For Accessing The Controlers
Router.post('/UserLogin',UserLogin);
Router.post('/UserRegister',UserRegister);
//End Block For Accessing The Controlers


module.exports = Router;