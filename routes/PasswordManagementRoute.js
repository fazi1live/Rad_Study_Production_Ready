//Dependencies
const express = require('express');
const Router = express.Router();
//Dependencies

//Calling Controllers
const {
    ForgotPasswordMechanism,
    ResetPassword
} = require('../controllers/PasswordManagementController');
//Calling Controllers

//Joining Routes to Controllers Via Http
Router.post('/ForgotPasswordMechanism',ForgotPasswordMechanism);
Router.post('/ResetPassword/:_Id/:_Token',ResetPassword);
//Joining Routes to Controllers Via Http

module.exports = Router;