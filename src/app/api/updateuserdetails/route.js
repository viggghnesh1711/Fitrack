import User from "@/app/models/user"
import connectMongo from "@/lib/dbConnect"
import { cookies } from 'next/headers';

export async function POST(request){
    try{
        const form = await request.json()
        const cookieStore = await cookies();
        await connectMongo();
    
        const userEmailCookie = cookieStore.get('userEmail');
        if (!userEmailCookie) {
          return new Response(JSON.stringify({ message: "No userEmail cookie found" }), { status: 400 });
        }
    
        const user = await User.findOneAndUpdate({email: userEmailCookie.value} ,{
            height:form.height,
            weight:form.weight,
            typebody:form.fitnessGoal
        },{ new: true })

        return new Response(JSON.stringify({message:"Data updated"}),{
            status:200
        })

    }
    catch{
        return new Response(JSON.stringify({message:"something went wrong"}),{
            status:200
        })
    }
}