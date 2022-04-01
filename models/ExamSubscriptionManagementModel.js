const mongoose = require('mongoose');

//Date
const today =  new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

//Start Block For Schema Creation
const ExamSubscriptionPlan = mongoose.Schema({
    ExamPlan: { type: String, required: true, unique:true },
    Price: { type: Number, required: true },
    TotalQuestions: {type:Number, required: true },
    Status: { type:Number, default:1 }, 
    CreatedDate:{
        type:String,
        default:`${year}-${month}-${day}`,
    },
    QuestionnaireId: { type:mongoose.Types.ObjectId , ref:'QuestionnaireCollection' }
},{timestamps:true});
//End Block For Schema Creatiion

module.exports = mongoose.model('ExamSubscriptionPlanCollection',ExamSubscriptionPlan);