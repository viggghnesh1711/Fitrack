import connectMongo from "@/lib/dbConnect"
import Exc from "@/app/models/excersise"
import { cookies } from 'next/headers'
import User from "@/app/models/user"

export async function POST(request){
    try{
        const form = await request.json()
        const cookieStore = await cookies()
        await connectMongo()

        const userEmailCookie = cookieStore.get('userEmail');
        const user = await User.findOne({email:userEmailCookie.value})

        const excersise = await Exc.create({
            createdAt:form.dateone,
            name:form.nameone,
            userId:user._id
        })

        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id }, 
            { $push: { exercises: excersise._id } },
            { new: true } 
          )

        return new Response(JSON.stringify({message:"excersise created"}),{
            status:200
        })
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify({message:"seomthing went wrong"}),{
            status:500
        })
    }
}