import connectMongo from "@/lib/dbConnect"
import Exc from "@/app/models/excersise"
import User from "@/app/models/user"

export async function POST(request){
    try{
        await connectMongo()
        const form = await request.json()

        const exercise = await Exc.findById(form.id);
        exercise.sets.push({ weight: Number(form.weight), reps: Number(form.reps) });
        await exercise.save();

        console.log("all done",exercise)

        return new Response(JSON.stringify({message:"data stored"}),{
            status:200
        })
    }
    catch(error){
        console.log("error",error)
        return new Response(JSON.stringify({message:"something went wrong.."}),{
            status:500
        })
    }
}