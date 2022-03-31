const _ExamSubscriptionPlanModel = require('../models/ExamSubscriptionManagementModel');

const CreateExamSubscriptionPlan = async (req, res) => {
    try {
        const {ExamPlan,Price,TotalQuestions} = req.body;
        const _FindTotalExams =  await _ExamSubscriptionPlanModel.find();
        const _FindAlreadyExistExamPlan = await _ExamSubscriptionPlanModel.findOne(
            {ExamPlan:ExamPlan}
        )
        if(_FindTotalExams.length >=5 ){
            return res.json({
                Message:'You can Only Add 5 Exams Plan',
                Data:false,
                Result:null
            })
        }
        if(_FindAlreadyExistExamPlan !== null){
            return res.json({
                Message:`Warning ! Plan already exist with this ${ExamPlan}`,
                Data:true,
                Result:true,
                Status:1 
            })
        }

        const _CreateSubscription = new _ExamSubscriptionPlanModel({
            ExamPlan:ExamPlan,
            Price:Price,
            TotalQuestions:TotalQuestions
        });
        const _SaveDataTODatabase = await _CreateSubscription.save();
         res.json({
             Message:'ExamSubscitpionPlan has Created Successfuly',
             Data:true,
             Result:_SaveDataTODatabase,
             Status:2
         })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}


const GetAllExamSubscriptionPlan = async (req, res) => {
    try {
        const _GetAllExamSubscriptionPlan = await _ExamSubscriptionPlanModel.find();
        res.json({
            Message:'All Exams Found Successfuly',
            Data:true,
            Result:_GetAllExamSubscriptionPlan
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}

const DeleteExamSubscriptionPlan = async (req, res) => {
    try {
        const {_UserId} = req.params;
        const ExamToDelete = await _ExamSubscriptionPlanModel.deleteOne(
            {_id:_UserId}
        )
        res.json({
            Message:'User Deleted Successfuly',
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

const GetExamSubscriptionbyPlanName = async (req, res) => {
    try {
        const  ExamPlan  = req.body;
        const GetExamByName = await _ExamSubscriptionPlanModel.find(
            {ExamPlan:ExamPlan},
            {TotalQuestions:1}
        )
        res.json({
            Message:'Data Found Successfuly',
            Data:true,
            Result:GetExamByName
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}

const UpdateExamSubscriptionQuestionLimitByName = async (req, res) => {
    try {
        const  { ExamPlan,TotalQuestions }  = req.body;
        const DocToUpdate = await _ExamSubscriptionPlanModel.updateOne(
            {ExamPlan:ExamPlan},
            {Status:1,TotalQuestions:TotalQuestions}
            )
            res.json({
                Message:'Updated Successfuly',
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

module.exports = { 
    CreateExamSubscriptionPlan, 
    GetAllExamSubscriptionPlan,
    DeleteExamSubscriptionPlan,
    GetExamSubscriptionbyPlanName,
    UpdateExamSubscriptionQuestionLimitByName
 }