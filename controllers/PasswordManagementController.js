const _UserManagementModel = require('../models/UserManagementModel');
const _PasswordManagementModel = require('../models/PasswordManagementModel');
const SECRET_KEY = 'super secret';
const jwt = require('jsonwebtoken');
const { SendEmailUsingNodeMailer } = require('../libraryfiles/SendEmailForPasswordReset');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const SaltRounds = 10;

const ForgotPasswordMechanism = async (req, res) => {
    try {
        let _EmailResponse;
        const { Email } = req.body;
        const _FindUserRegisterEmail = await _UserManagementModel.findOne(
            { Email: Email }
        );
        const _FindUserInPasswordManagement = await _PasswordManagementModel.findOne(
            {UserId:_FindUserRegisterEmail._id}
            );
        if (_FindUserRegisterEmail === null) {
            return res.json({
                Message: `This Email ${Email} Has not Registered`,
                Data: false,
                Result: null
            })
        }
        if(_FindUserInPasswordManagement===null){
            const _ResetToken = new _PasswordManagementModel({
                UserId:_FindUserRegisterEmail._id,
                ResetToken:crypto.randomBytes(16).toString('hex')
            })
            const _ResetTokenSaved = await _ResetToken.save();
            _EmailResponse = await SendEmailUsingNodeMailer(Email, _ResetTokenSaved.ResetToken);
        }else{
            await _PasswordManagementModel.updateOne(
                {_id:_FindUserInPasswordManagement._id},
                {$set:{ResetToken:crypto.randomBytes(16).toString('hex')}}
            );
            const _FindUpdatedToken = await _PasswordManagementModel.findOne(
                {UserId:_FindUserRegisterEmail._id}
            )
            _EmailResponse = await SendEmailUsingNodeMailer(Email, _FindUpdatedToken.ResetToken);
        }
        
        res.json({
            Message: `We Have Sennt an Email to ${Email}`,
            Data: true,
            Result: true,
            Email:_EmailResponse
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const ValidatePasswordToken = async (req, res) => {
    try {
        const {PasswordToken} = req.body;
        const _GetUserForPasswordToken = await _PasswordManagementModel.findOne(
            {ResetToken:PasswordToken}
        )
        if(!_GetUserForPasswordToken){
            return res.json({
                Message:'Invalid Token',
                Data:false,
                Result:null
            })
        }
        res.json({
            Message:'Token Verified Successfully',
            Data:true,
            Result:_GetUserForPasswordToken
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const ResetPassword = async (req, res) => {
    try {
        const { PasswordToken, NewPassword } = req.body;
        const _ValidateUserToken = await _PasswordManagementModel.findOne(
            {ResetToken:PasswordToken}
        );
        if(!_ValidateUserToken){
            return res.json({
                Message:'Invalid Token or Token Has Expired',
                Data:false,
                Result:null
            })
        }

        const _GetVerifiedUser = await _UserManagementModel.findOne(
            {_id:_ValidateUserToken.UserId}
        );
        if(!_GetVerifiedUser){
            return res.json({
                Message:'UnAuthorized Verification',
                Data:false,
                Result:null
            })
        }
        // let _UpdatedPassword = NewPassword;
        // bcrypt.hash(_UpdatedPassword,SaltRounds,(err,hash)=>{
        //     _UpdatedPassword=hash;
        // });
        let pass = await bcrypt.hash(NewPassword,SaltRounds);
        // const _UpdatedPassword = bcrypt.hash(NewPassword,SaltRounds);
        const _UpdatedPasswrod = await _UserManagementModel.updateOne(
            {_id:_GetVerifiedUser._id},
            { $set: {Password:pass, RealPassword:NewPassword} }
        )
        res.json({
            Message:'Password Has Updated Successfuly',
            Data:true,
            Result:_UpdatedPasswrod
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

module.exports = { ForgotPasswordMechanism, ResetPassword, ValidatePasswordToken }