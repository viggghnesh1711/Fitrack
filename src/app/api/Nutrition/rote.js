export async function GET(request){
    try{
        const form = request.json();

        const API_KEY = 'YOUR_API_KEY';  // Replace with your Nutritionix API Key
        const API_ID = 'YOUR_APP_ID';  // Replace with your Nutritionix App ID
        const apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
        try{
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-app-id': API_ID,
                    'x-app-key': API_KEY,
                },
                body: JSON.stringify({ query: `${quantity} ${food}` }),
            });
    
            const data = await response.json();
            console.log(data)
        }
        catch(error){
            console.log("nitroon eror",error)
            return new Response(JSON.stringify({message:"nutioninx error"}),{
                statu:500
            })
        }

    }
    catch(error){

    }
}