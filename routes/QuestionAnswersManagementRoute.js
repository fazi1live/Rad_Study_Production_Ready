const express = require('express');
const Router = express.Router();

const { 
    AddQuestionsForExams,
    GetAllQuestionsAnswers
} = require('../controllers/QuestionAnswersManagementController');

Router.post('/AddQuestionsForExams',AddQuestionsForExams);
Router.get('/GetAllQuestionsAnswers',GetAllQuestionsAnswers);


module.exports = Router;
