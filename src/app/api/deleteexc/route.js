import connectMongo from "@/lib/dbConnect"
import Exc from "@/app/models/excersise"
import User from "@/app/models/user"

export async function POST(request){

    try{
        await connectMongo()
        const form = await request.json()
        const exc = await Exc.findOneAndDelete({_id:form.id})

        const user = await User.findOneAndUpdate(
            { _id:exc.userId }, 
            { $pull: { exercises:form.id } }, 
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