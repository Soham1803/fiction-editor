import { updateScene, deleteScene } from "@/db/queries/scene";
import { InsertScene } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, params: {id: string}) {
  try {
    const data : InsertScene = await req.json();
    const _id = parseInt(params.id);
    if(data.title || data.content || data.summary || data.chapterId){
      return NextResponse.json({ message: "Please provide all the required fields", status: 400});
    }
    const response = await updateScene(_id, data);
    return NextResponse.json({message: "Scene updated successfully", response, status: 200})
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500})
  }
}

export async function DELETE(req: NextRequest, params: {id: string}) {
  try {
    const _id = parseInt(params.id);
    const response = await deleteScene(_id);
    return NextResponse.json({message: "Scene deleted successfully", response, status: 200})
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500})
  }
}