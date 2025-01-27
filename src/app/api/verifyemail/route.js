import connectMongo from "@/lib/dbConnect"
import User from "@/app/models/user"
import UserVerification from "@/app/models/userVerification"
import { creatingcookie } from "@/utils/creatingcookie"
import bcrypt from 'bcryptjs'; 

export async function POST(request){
    try{
        const form = await request.json()
        console.log(form.email)
        
        await connectMongo()

        const checkuser = await UserVerification.findOne({email:form.email})
        console.log(checkuser.verificationcode)
        console.log(form.code)
        if(!checkuser){
            return new Response(JSON.stringify({message:"Invalid email",stat:false}),{
                status:200
            })
        }
        else{
            if(checkuser.verificationcode !== form.code){
                return new Response(JSON.stringify({message:"Invalid OTP",stat:false}),{
                    status:200
                })
            }
            else{
                const currentTime = new Date();
                if (currentTime > checkuser.expireAt) {
                    return new Response(JSON.stringify({ message: "OTP has expired." ,stat:false}), {
                        status: 200,
                    });
                }
                else{
                    const hashedPassword = await bcrypt.hash(checkuser.password, 10); 
                    const newUser = await User.create({
                        email: checkuser.email,
                        password: hashedPassword,
                    });
                    console.log("before",newUser.email)
                    await creatingcookie({ email: newUser.email })
                    await UserVerification.deleteOne({ email: form.email });
            
                    return new Response(JSON.stringify({ message: "User created successfully.",stat:true }), {
                        status: 201,
                    });
                }
            }
        }
    }
    catch(error){
        return new Response(JSON.stringify({message:"something went wrong..."}),{
            status:500
        })
    }
}