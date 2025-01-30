import { getSceneById, createScene } from "@/db/queries/scene";
import { InsertScene } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: {id: string}) {
  try {
    const _id = parseInt(params.id);
    const scene = await getSceneById(_id);
    return NextResponse.json(scene);
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({ message: "Error fetching scene, check the logs!", status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data : InsertScene = await req.json();
    if(data.title || data.content|| data.summary ||data.chapterId){
      return NextResponse.json({ message: "Please provide all the required fields", status: 400});
    }
    const response = await createScene(data);
    return NextResponse.json({message: "Scene created successfully", response, status: 200})
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500})
  }
}