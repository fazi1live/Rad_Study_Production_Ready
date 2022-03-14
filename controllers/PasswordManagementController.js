const _UserManagementModel = require('../models/UserManagementModel');
const _PasswordManagementModel = require('../models/PasswordManagementModel');
const { SendEmailUsingNodeMailer } = require('../libraryfiles/SendEmailForPasswordReset');
const JWT_SECRET = 'SuperSecret';
const jwt = require('jsonwebtoken');


const ForgetPasswordRequest = async (req, res) => {
    //From Here User Will Send His Email after validation We Will Send Him Email with a Magic Link
    try {
        const { Email } = req.body;

        //Make sure User Exist in Data Base
        const _EmailToValidate = await _UserManagementModel.findOne(
            { Email: Email }
        )
        console.log(_EmailToValidate);
        if (!_EmailToValidate) {
            return res.json({
                Message: `This Email ${Email} has Not Registered`,
                Data: false,
                Result: _EmailToValidate
            })
        }

        //Make sure User Exist in Data Base

        //Create Magic Link That is One Time which is Valid for 15 Minutes

        const Secret = JWT_SECRET + _EmailToValidate.Password; //NewSecret Will Be Unique for EveryUser as Passwor dis Unique
        const PayLoad = { email: _EmailToValidate.Email, id: _EmailToValidate._id }
        const Token = jwt.sign(PayLoad, Secret, { expiresIn: '1m' });
        const Link = `https://rad-study.herokuapp.com/response-reset-password/${_EmailToValidate._id}/${Token}`;
        const CredentialsObject = { UserId: _EmailToValidate._id, Token: Token }
        //Create Magic Link That is One Time which is Valid for 15 Minutes

        //Now Send The Magic Link To the Specified Email

        const EmailResponse = await SendEmailUsingNodeMailer(Email, Link, CredentialsObject);

        //Now Send The Magic Link To the Specified Email
        res.json({
            Message: `We have Sent an Email To ${Email} With a Magic Link`,
            Data: true,
            EmailResponse: EmailResponse,
            Result: true
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: false
        })
    }
}

const ValidateUserForTokken = async (req, res) => {
    try {
        const { UserId, Token } = req.body;

        //Check User Id and Token and Validate

        const _UserToValidate = await _UserManagementModel.findOne(
            { _id: UserId }
        )

        const _TemporarySecret = JWT_SECRET+_UserToValidate.Password;
        const _ValidateUser = jwt.verify(Token,_TemporarySecret);
        if( _UserToValidate && _ValidateUser ){
            return res.json({
                Message:'Authentication Approved',
                Data:true,
                Result:true,
                Id:_ValidateUser.id
            })
        }

        //Check User Id and Token and Validate

        res.json({
            Message:'Invalid Token',
            Data:false,
            Result:false
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: false
        })
    }
}

const ForgetPasswordResponse = async (req, res) => {
    //Once he Clicked the Magic Link from The Email He will send Token and New Password which will come here in this Api
    try {

    } catch (error) {


    }
}

module.exports = { ForgetPasswordRequest, ForgetPasswordResponse, ValidateUserForTokken }