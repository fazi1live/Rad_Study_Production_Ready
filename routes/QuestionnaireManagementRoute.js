//Depnedemcies and Initialization
const express = require('express');
const Router = express.Router();
//Depnedemcies and Initialization


//Start Block Accessing The Library Files
//End Block Accessing The Library Files


//Start Block For Accessing The Controlers
const { 
    CreateQuestionnaire,
    GetAllQuestionnaires,
    DeleteFullQuestionnaire,
    GetQuestionnaireById,
    GetQuestionnaireByName
 } = require('../controllers/QuestionnaireManagementController');
//End Block For Accessing The Controlers


//Start Block For Joining Controllers to your Routes
Router.post('/CreateQuestionnaire',CreateQuestionnaire);
Router.get('/GetAllQuestionnaires',GetAllQuestionnaires);
Router.post('/DeleteFullQuestionnaire',DeleteFullQuestionnaire);
Router.get('/GetQuestionnaireById/:_QuestionnaireId',GetQuestionnaireById);
Router.post('/GetQuestionnaireByName',GetQuestionnaireByName);
//End Block For Joining Controllers to your Routes

module.exports = Router;