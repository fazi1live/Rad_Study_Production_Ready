const _UserManagementModel =  require('../models/UserManagementModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserLogin = async(req, res) => {
    try {
        const { Email, Password } = req.body;
        let _UserToAuthenticate = await _UserManagementModel.findOne({ Email: Email });
        if (_UserToAuthenticate === null) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Result: null,
                Data:false
            })
        }

        const _Result = await bcrypt.compare(Password, _UserToAuthenticate.Password);
        if (!_Result) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Result: null,
                Data:false
            })
        }

        // if(_UserToAuthenticate.Status === 0){
        //     return res.json({
        //         Message:"Please Contact Admin For Approval",
        //         Data:false,
        //         Result:null
        //     })
        // }
        const _Token = jwt.sign(
            {
                Email: _UserToAuthenticate.Email,
                UserId: _UserToAuthenticate._id
            },
            'UserLogin',
            { expiresIn: '1h' }
        )

        return res.json({
            Message: 'Authentication SuccessFull',
            Data: true,
            Token: _Token,
            Result: _UserToAuthenticate
        })
   
        

    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

const UserRegister = async(req, res) => {
    try {
        const { Name, Email, Password, CourseName} = req.body;
        console.log(req.body);
        const _GetUserLength = _UserManagementModel.find();
        if (_GetUserLength.length >= 1) {
            res.json({
                Message:`Admin Regesteration is Constraint`,
                Status:null,
                Data:false
            })
        } else {
            const CourseToSave = {CName:CourseName};
            const _RegisterAdmin = new _UserManagementModel({
                Name:Name,
                Email:Email,
                Password:Password,
                RealPassword:Password,
                CourseName:CourseToSave            
            });
            await _RegisterAdmin.save();
            res.json({
                Message:`User Register Successfully`,
                Data:true,
                Result:_RegisterAdmin
            })
        }
    } catch (error) {
        res.json({ Message: error.message, Result: null, Data: false });
    }
}


module.exports= { UserLogin, UserRegister }