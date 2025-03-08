import User from "@/app/models/user";
import Exc from "@/app/models/excersise";
import connectMongo from "@/lib/dbConnect";
import { cookies } from 'next/headers';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
    try {
        const form = await request.json()
        const cookieStore = await cookies()
        await connectMongo()

        const userEmailCookie = cookieStore.get('userEmail');
        const user = await User.findOne({email:userEmailCookie.value}).populate({
          path: 'exercises', 
          select: 'name createdAt sets',  
        });
          const createduser= {
            height:user.height,
            weight:user.weight,
            username:user.username,
            goal:user.typebody
          }

          if (user) {
            const exerciseDetails = user.exercises.map(exercise => ({
                name: exercise.name,
                sets: exercise.sets.map(set => ({
                    repetitions: set.reps,
                    weight: set.weight
                }))
            }));
        
            // console.log(JSON.stringify(exerciseDetails, null, 2));
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `${form.userPrompt} 
            Please provide key insights in a concise manner and short one. based on this one ${JSON.stringify(exerciseDetails)} ${JSON.stringify(createduser)}`;
            
        
            const result = await model.generateContent(prompt);
            const replyone=result.response.text()
            
            return new Response(JSON.stringify({ message: "it worked",replyone }), { status: 200 });
        }
    } 
    catch (error) {
      console.log(error)
        return new Response(JSON.stringify({ message: "something went wrong" }), { status: 500 });
    }
}
