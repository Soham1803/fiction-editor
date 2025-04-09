import { createUser, getUserByEmail, getUserByUsername } from "@/db/queries/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const data = await req.json();
    await createUser(data);
    return NextResponse.json({ message: "User created" });
}

export async function GET(req: NextRequest){
  try{
    const {email, username} = await req.json();

    if(!username && !email) {
      return NextResponse.json({ message: "Please provide username or email", status: 400 });
    }

    let user;

    if(!username){
      user = await getUserByEmail(email);
    } else {
      user = await getUserByUsername(username);
    }

    console.log("User: ", user)

    return NextResponse.json(user);
  } catch(e){
      
    console.log("Error: ", e);
    return NextResponse.json({ message: "An error occured, read the details in the logs!", status: 500 });
  }
}
