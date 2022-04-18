const _UserQuestionnaireContainerCluster = require('../models/UserQuestionnaireContainerModel');
const _UserQuestionnaireFinalResultCluster = require('../models/UserQuestionnaireFinalResult');
const ExamModel = require('../models/ExamSubscriptionManagementModel');

const UpdateUserQuestionnaireContainerByQuestions = async (req, res) => {
    try {
        let RequestObject = req.body;
        const QuestionnaireToUpdate = await _UserQuestionnaireContainerCluster.updateOne(
            { UserId: RequestObject.UserId },
            // {$pull:{Questions:{_id:RequestObject.Payload[0]._id}}}
            { $pull: { Questions: { Question: RequestObject.Payload[0].Question } } }
        );
        res.json({
            Message: 'True',
            Data: true,
            Result: true
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: true,
            Result: true
        })
    }
}

const AddUserQuestionnaireResult = async (req, res) => {
    try {
        const { UserId, UserEmail, UserName, FinalResult, ExamPlan } = req.body;

        const FindExamPlanDetails = await ExamModel.findOne(
            {ExamPlan:ExamPlan.PlanSelected}
        )

        let CorrectQuestions = [];
        FinalResult.forEach(Objects => {
            if (Objects.UserAnswer === 'Correct') {
                CorrectQuestions.push(Objects);
            }
        })

        const FindIfUserAlreadyExists = await _UserQuestionnaireFinalResultCluster.findOne({
            UserEmail: UserEmail
        })

        if (FindIfUserAlreadyExists !== null) {
            const UserQuestionnaireFinalResultClusterToUpdate = await _UserQuestionnaireFinalResultCluster.updateOne(
                { UserEmail: UserEmail },
                {
                    Questions: FinalResult,
                    CorrectQuestions: CorrectQuestions,
                    TotalQuestions: FinalResult.length,
                    TotalCorrectQuestions: CorrectQuestions.length
                }
            )
            return res.json({
                Message: 'Result Updated',
                Data: true,
                Result: UserQuestionnaireFinalResultClusterToUpdate
            })
        }

        const DocToSave = new _UserQuestionnaireFinalResultCluster({
            UserId: UserId,
            ExamPlanTotalQuestions:FindExamPlanDetails.TotalQuestions,
            UserName: UserName,
            UserEmail: UserEmail,
            ExamPlan: ExamPlan.PlanSelected,
            Questions: FinalResult,
            CorrectQuestions: CorrectQuestions,
            TotalQuestions: FinalResult.length,
            TotalCorrectQuestions: CorrectQuestions.length
        })

        const Result = await DocToSave.save();
        res.json({
            Message: 'Final Result Saved Successfuly',
            Data: true,
            Result: Result
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: true,
            Result: true
        })
    }
}

const GetFinalResult = async (req, res) => {
    try {
        const  UserEmail  = req.body;
        const DocumentToGet = await _UserQuestionnaireFinalResultCluster.findOne(
            { UserEmail: UserEmail }    
        )
        res.json({
            Message: 'Data Found Successfuly',
            Data: true,
            Result: DocumentToGet
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: true,
            Result: true
        })
    }
}

module.exports = {
    UpdateUserQuestionnaireContainerByQuestions,
    AddUserQuestionnaireResult,
    GetFinalResult
}