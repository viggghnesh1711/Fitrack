import connectMongo from "@/lib/dbConnect"
import Exc from "@/app/models/excersise"
import User from "@/app/models/user"
import { FolderMinus } from "lucide-react"

export async function POST(request){

    try{
        await connectMongo()
        const form = await request.json()
        const updatedExercise = await Exc.findByIdAndUpdate(
            {_id:form.exid},
            { $pull: { sets: { _id: form.setid } } }, // Use $pull to remove the set with the specified ID
            { new: true } 
        );

        return new Response(JSON.stringify({message:"delted sucesfully"}),{
            status:200
        })

    }
    catch(error){
        return new Response(JSON.stringify({message:"something went wrong"}),{
            status:500
        })
    }
}