const _QuestionnaireCluster = require('../models/QuestionnaireManagementModel');

const CreateQuestionnaire = async (req, res) => {
    try {
        const { ExamPlan, Price, QuestionsArray } = req.body;
        const _CheckExamPlanFromDataBase = await _QuestionnaireCluster.find({ ExamPlan: ExamPlan }).lean();
        if (_CheckExamPlanFromDataBase.length >= 1) {
            const _AddMoreQuestionsToExam = await _QuestionnaireCluster.updateOne(
                { _id: _CheckExamPlanFromDataBase[0]._id }, //filter
                { $push: { Questions: QuestionsArray } } //operations
            );
            res.json({
                Message: `Questions Has Added Successfuly To Already Exists Exam Plan ${ExamPlan}`,
                Data: true,
                Result: _AddMoreQuestionsToExam,
                Status:1
            })
        } else {
            const _CreateExam = new _QuestionnaireCluster({
                ExamPlan: ExamPlan,
                Price: Price,
                Questions: QuestionsArray
            });
            const _AddExam = await _CreateExam.save();
            res.json({
                Message: `ExamPlan and Question Added Successfuly`,
                Data: true,
                Result: _AddExam,
                Status:2
            })
        }
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetAllQuestionnaires = async (req, res) => {
    try {
        const _GetAllQuestionnaires = await _QuestionnaireCluster.find().lean();
        res.json({
            Message:'All Exams Found Successfuly',
            Data:true,
            Result:_GetAllQuestionnaires
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}

const GetQuestionnaireById = async (req, res) => {
    try {
        const _QuestionnaireId = req.params._QuestionnaireId;
        const _GetQuestionnaireById = await _QuestionnaireCluster.findOne(
            {_id:_QuestionnaireId}
        ).lean();
        res.json({
            Message:'Questionnaire Found Successfully',
            Data:true,
            Result:_GetQuestionnaireById
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}

const DeleteFullQuestionnaire = async(req, res) =>{
    try {
        const _GetIdFromParams = req.params.ExamId;
        const _DeleteExam = await _QuestionnaireCluster.remove({_id:_GetIdFromParams});
        res.json({
            Message:'Exam Has Deleted Successfuly',
            Data:true,
            Result:_DeleteExam
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}

// const DeleteQuestionnaireSpecificQuestion = async(req, res) => {
//     try {
//         const _GetExamId = req.body.ExamId;
//         const _GetQuestionnaireId = req.body.QuesstionnaireId;
//         const _UpdateExam = await _QuestionnaireCluster.updateOne(
//             {_id:_GetExamId },
//             { $set: { ExamPlan:"Testing"} },
//             { new: true }
//             );
//             // const _UpdateExamQuestionNumber = await _QuestionnaireCluster.updateMany(
//             //     {_id:_GetExamId},
//             //     {Question, $inc: {QuestionNo:1}},
//             //     )
//             res.json({
//                 Message:'Exam Questionnaire has Updated Successfuly',
//                 Data:true,
//                 UpdateQuestionNo:_UpdateExamQuestionNumber
//             })
//     } catch (error) {
//         res.json({
//             Message:error.message,
//             Data:false,
//             Result:null
//         })
//     }
// }


module.exports = { CreateQuestionnaire, GetAllQuestionnaires, DeleteFullQuestionnaire, GetQuestionnaireById }