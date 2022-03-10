const _UserManagementModel = require('../models/UserManagementModel');
const SECRET_KEY = 'super secret';
const jwt = require('jsonwebtoken');
const { SendEmailUsingNodeMailer } = require('../libraryfiles/SendEmailForPasswordReset');

const ForgotPasswordMechanism = async (req, res) => {
    try {
        const { Email } = req.body;
        const _FindUserRegisterEmail = await _UserManagementModel.findOne(
            { Email: Email }
        );
        if (_FindUserRegisterEmail === null) {
            return res.json({
                Message: `This Email ${Email} Has not Registered`,
                Data: false,
                Result: null
            })
        }
        //Creating One TIme Link
        const secret = SECRET_KEY + _FindUserRegisterEmail.Password;
        const payload = {
            Email: _FindUserRegisterEmail.Email,
            Id: _FindUserRegisterEmail._id
        }
        const _Token = jwt.sign(payload, secret, { expiresIn: '15m' });
        const _Link = `http://localhost:3636/PasswordManagement/ResetPassword/${_FindUserRegisterEmail._id}/${_Token}`;
        const _EmailResponse = await SendEmailUsingNodeMailer(Email);
        res.json({
            Message: `We Have Sennt an Email to ${Email}`,
            Data: true,
            Result: true,
            Link: _Link,
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

const ResetPassword = async (req, res) => {
    try {
        const { _Id, _Token } = req.params;
        const _FindUserById = await _UserManagementModel.findOne(
            { _id: _Id }
        )
        if (_FindUserById === null) {
            return res.json({
                Message: 'Failed',
                Data: false,
                Result: null
            })
        }
        const secret = SECRET_KEY + _FindUserById.Password;
        const _Payload = jwt.verify(_Token, secret);
        if(!_Payload){
            return res.json({
                Message: 'Failed',
                Data: false,
                Result: null
            })
        }
        res.json({
            Message:'Success',
            Data:true,
            Result:_Payload
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

module.exports = { ForgotPasswordMechanism, ResetPassword }