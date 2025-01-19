import mongoose from "mongoose";

const userVerificationSchema = mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    verificationcode:{
        type:String
    },
    verificationstatus:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    expireAt: { 
        type: Date,
        default: () => Date.now() + 5 * 60 * 1000 
    } 
})

const UserVerification = mongoose.models.UserVerification || mongoose.model('UserVerification', userVerificationSchema);

export default UserVerification