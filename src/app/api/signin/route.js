import connectMongo from "@/lib/dbConnect";
import User from "@/app/models/user";
import bcrypt from 'bcryptjs';
import { creatingcookie } from "@/utils/creatingcookie";

export async function POST(request){
    try{
        const form = await request.json()
        console.log(form.email)
        await connectMongo()

        const usercheck = await User.findOne({email:form.email})
        if(!usercheck){
            return new Response(JSON.stringify({message:"User does not exists",stat:false}),{
                status:200
            })
        }
        else{
            const isPasswordCorrect = await bcrypt.compare(form.password, usercheck.password);

            if (!isPasswordCorrect) {
              return new Response(
                JSON.stringify({ message: "Incorrect password",stat:false }),
                { status: 401 }
              );
            }
            await creatingcookie({ email: form.email })
            return new Response(
              JSON.stringify({ message: "Logged in successfully",stat:true}),
              { status: 200 }
            )
        }
    }
    catch(error){
        console.log("error",error)
        return new Response(JSON.stringify({message:"Something went wrong...."}),{
            status:500
        })
    }
}