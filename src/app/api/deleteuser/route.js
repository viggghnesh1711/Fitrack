import Exc from "@/app/models/excersise";
import User from "@/app/models/user";
import connectMongo from "@/lib/dbConnect";
import { cookies } from "next/headers";


export async function POST(request){
    try{
        const form = await request.json();
        
        const cookieStore = await cookies();
        const userEmailCookie = cookieStore.get('userEmail');
        if (!userEmailCookie) {    
          return new Response(JSON.stringify({ message: "No userEmail cookie found" }), { status: 400 });
        }
       
        if( userEmailCookie.value == form.email){
            const user = await User.findOne({ email: userEmailCookie.value });
            console.log(user)
            await Exc.deleteMany({ _id: { $in: user.exercises } });

            await User.deleteOne({ _id: user._id });
            return new Response(JSON.stringify({message:"user deleted sucessfully",stat:true}),{
                status:200
            })
        }
        else{
            
            return new Response(JSON.stringify({message:"Invalid email address",stat:false}),{
                status:200
            })
        }
  

    }
    catch{
        return new Response(JSON.stringify({message:"something went wrong"}),{
            status:500
        })
    }
}