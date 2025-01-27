import {cookies} from 'next/headers'
export async function creatingcookie({email}){
    const cookiestore = await cookies()
    console.log(email)
    cookiestore.set('userEmail',email),{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'Lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, 
    }

console.log("cookie craeting ....")
}