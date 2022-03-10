//Dependencies
const express = require('express');
const Router = express.Router();
//Dependencies

//Calling Controllers
const {
    ForgotPasswordMechanism, //ResetPassword
    ResetPassword, //NewPassword
    ValidatePasswordToken
} = require('../controllers/PasswordManagementController');
//Calling Controllers

//Joining Routes to Controllers Via Http
Router.post('/ForgotPasswordMechanism',ForgotPasswordMechanism);
Router.post('/ResetPassword',ResetPassword);
Router.post('/ValidatePasswordToken',ValidatePasswordToken);
//Joining Routes to Controllers Via Http

module.exports = Router;