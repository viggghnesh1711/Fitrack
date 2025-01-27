import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    googleId:{
        type:String
    },
    username:{
        type:String
    },
    weight:{
        type:Number
    },
    height:{
        type:Number
    },
    typebody:{
        type:String
    },
    exercises: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Exc' 
    }]
})

const User = mongoose.models.User || mongoose.model('User',userSchema)

export default User