import mongoose from "mongoose";

const connectMongo = async () =>{
    try{
        if(mongoose.connection.readyState === 1){
            return;
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected....")
    }
    catch(error){
        console.log("Error in Connecting Database....",error)
    }
}

export default connectMongo