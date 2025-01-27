import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
    weight:{
        type:Number,
    },
    reps:{
        type:Number,
    }
})

const excersiseSchema = new mongoose.Schema({
    createdAt:{
        type:String,
    },
    name:{
        type:String,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    sets:[setSchema]
    
})
const Exc = mongoose.models.Exc || mongoose.model('Exc',excersiseSchema)

export default Exc