import { updateEntity, deleteEntity } from "@/db/queries/entity";
import { InsertEntity } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, params: {id: string}) {
  try {
    const data : InsertEntity = await req.json();
    const _id = parseInt(params.id);
    if(data.name || data.type ){
      return NextResponse.json({ message: "Please provide all the required fields", status: 400});
    }
    const response = await updateEntity(_id, data);
    return NextResponse.json({message: "Entity updated successfully", response, status: 200})
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500})
  }
}

export async function DELETE(req: NextRequest, params: {id: string}) {
  try {
    const _id = parseInt(params.id);
    const response = await deleteEntity(_id);
    return NextResponse.json({message: "Entity deleted successfully", response, status: 200})
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500})
  }
}