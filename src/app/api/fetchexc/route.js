import connectMongo from "@/lib/dbConnect";
import Exc from "@/app/models/excersise";
import { cookies } from 'next/headers'
import User from "@/app/models/user"

export async function GET(request){
    try{
        const cookieStore = await cookies()
        await connectMongo()

        const userEmailCookie = cookieStore.get('userEmail');
        const user = await User.findOne({email:userEmailCookie.value})

        const excs = await Exc.find({userId:user._id})
        console.log("ans:",excs)
        return new Response(JSON.stringify({message:"it is working",excs}),{
            status:200
        })
    }
    catch(error){
       console.log("add",error)
        return new Response(JSON.stringify({message:"seomthing went wrong"}),{
            status:500
        })
    }
}