import connectMongo from "@/lib/dbConnect"
import User from "@/app/models/user"
import { cookies } from 'next/headers';


export async function POST(request){
    try{
        const cookieStore =await cookies();
        const userId = cookieStore.get('userEmail');
        await connectMongo()
        const form = await request.json()

        const user = await User.findOneAndUpdate({email:userId.value},
            {
                username:form[0],
                weight:form[1],
                height:form[2],
                typebody:form[3]
            }
        )
            return new Response(JSON.stringify({message:"user saved "}),{
                status:200
            })
        
    }
    catch(error){
        return new Response(JSON.stringify({message:"something went wrong"}),{
            status:500
        })
    }
}