const express = require('express');
const Router = express.Router();

const { 
    AddQuestionsForExams
} = require('../controllers/QuestionAnswersManagementController');

Router.post('/AddQuestionsForExams',AddQuestionsForExams);


module.exports = Router;
