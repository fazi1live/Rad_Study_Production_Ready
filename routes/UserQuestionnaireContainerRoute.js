//Depnedemcies and Initialization
const express = require('express');
const Router = express.Router();
//Depnedemcies and Initialization

//Start Block Accessing The Library Files And Routes
const { 
    UpdateUserQuestionnaireContainerByQuestions,
    AddUserQuestionnaireResult
 } = require('../controllers/UserQuestionnaireContainerController');
//End Block Accessing The Library Files And Routes


//Start Block For Accessing The Controlers
Router.post('/UpdateQuestions',UpdateUserQuestionnaireContainerByQuestions);
Router.post('/AddUserQuestionnaireResult',AddUserQuestionnaireResult);
//End Block For Accessing The Controlers


module.exports = Router;