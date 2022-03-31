const _QuestionAnswersManagementCluster  = require('../models/QuestionsAnswerManagement');

const AddQuestionsForExams = async (req, res) => {
    try {
        const Questions = req.body;
        Questions.forEach(async (KeyPair) => {
            const DocToSave = new _QuestionAnswersManagementCluster({
                Questions:KeyPair
            })
            await DocToSave.save();
        })
        res.json({
            Message:'All Questions Saved',
            Data:true,
            Result:true
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}

const GetAllQuestionsAnswers = async (req, res) => {
    try {
        const GetAllDocs = await _QuestionAnswersManagementCluster.find().lean();
        res.json({
            Message:'Data Found Successfuly',
            Data:true,
            Result:GetAllDocs
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}

module.exports = {
    AddQuestionsForExams,
    GetAllQuestionsAnswers
}