import { deleteUser, updateUser } from "@/db/queries/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, params: {id: string}){
    try {
      console.log("Ok till here");
      const {id} = params
      const data = await req.json();
      console.log("Updated Data: ", data);
      const response = await updateUser(id, data);
      return NextResponse.json({message: response, status: 200});
    }
    catch (error) {
      console.log("Catched Error: ", error);
      return NextResponse.json({ message: "Error updating user, check the logs!", status: 500});
    }
}

export async function DELETE(req: NextRequest, params: {id:string}){
    try {
      const {id} = params;
      
      const response = await deleteUser(id);
      return NextResponse.json(response);
    }
    catch (error) {
      console.log("Catched Error: ",error);
      return NextResponse.json({ message: "Error deleting user, check the logs!" });
    }
}
