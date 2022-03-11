const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SaltRounds = 10;

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const UserRegisterSchema = mongoose.Schema({
    Name: { type: String, required: true, unique:true},
    Email: { type: String, required: true, unique:true},
    Password: { type: String, required: true },
    CourseName: { 
        type: [{
            CName:{ type:String },
        }], required: true},
    SaltString:{type:String},
    Status:{type:Number, default:0},
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}`,
    }
},{ timestamps: true })

UserRegisterSchema.pre('save', function(next){
    bcrypt.genSalt(SaltRounds,(error,salt)=>{
        if(salt){
            this.SaltString=salt;
            bcrypt.hash(this.Password,salt,(err,hash)=>{
                this.Password=hash;
                next();
            })
        }else{
            res.json({
                Error:error.message
            })
        }
    })
});

module.exports = mongoose.model('UserRegisterCollection',UserRegisterSchema);