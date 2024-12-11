import { createChapter, getChapterById } from "@/db/queries/chapter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  try {
    const {id} = await req.json();

    if(!id){
      return NextResponse.json({ message: "Please provide the chapter id", status: 400});
    }

    const _id = parseInt(id);

    if(id < 0){
      return NextResponse.json({ message: "Invalid chapter id", status: 400});
    }

    const response = await getChapterById(_id);

    return NextResponse.json(response);
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500})
  }
}

export async function POST(req: NextRequest){
  try {
    const { title, content, projectId } = await req.json();

    if(!title || !content || !projectId){
      return NextResponse.json({ message: "Please provide all the required fields", status: 400});
    }

    const response = await createChapter({ title, content, projectId });

    return NextResponse.json({message: "Chapter created successfully", response, status: 200})
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500});
  }
}


