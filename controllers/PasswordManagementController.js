const _UserManagementModel = require('../models/UserManagementModel');
const _PasswordManagementModel = require('../models/PasswordManagementModel');
const { SendEmailUsingNodeMailer } = require('../libraryfiles/SendEmailForPasswordReset');

const ForgetPasswordRequest = async (req, res) => {
    //From Here User Will Send His Email after validation We Will Send Him Email with a Magic Link
    try {
        const { Email } = req.body;
        const _EmailToValidate = await _UserManagementModel.findOne(
            {Email:Email}
        )
        if(!_EmailToValidate){
            return res.json({
                Message:`This Email ${Email} has Not Registered`,
                Data:false,
                Result:null
            })
        }
        res.json({
            Message:`We have Sent an Email To ${Email} With a Magic Link`,
            Data:true,
            EmailResponse:true,
            Result:true 
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:false
        })
    }
}

const ValidateUserForTokken = async (req, res) => {
    try {
       
    } catch (error) {
        
    }
}

const ForgetPasswordResponse = async (req, res) => {
    //Once he Clicked the Magic Link from The Email He will send Token and New Password which will come here in this Api
    try {
       
    } catch (error) {
       

    }
}

module.exports = { ForgetPasswordRequest, ForgetPasswordResponse, ValidateUserForTokken }