const _UserManagementModel = require('../models/UserManagementModel');
const _PasswordManagementModel = require('../models/PasswordManagementModel');
const SECRET_KEY = 'super secret';
const jwt = require('jsonwebtoken');
const { SendEmailUsingNodeMailer } = require('../libraryfiles/SendEmailForPasswordReset');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const SaltRounds = 10;

const ForgetPasswordRequest = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const ValidateUserForTokken = async (req, res) => {
    try {
       
    } catch (error) {
        
    }
}

const ForgetPasswordResponse = async (req, res) => {
    try {
       
    } catch (error) {
       

    }
}

module.exports = { ForgetPasswordRequest, ForgetPasswordResponse, ValidateUserForTokken }