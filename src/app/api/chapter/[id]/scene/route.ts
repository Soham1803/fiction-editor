import { getScenesByChapterId } from "@/db/queries/scene";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const req_url = await req.url;
    console.log("Request URL: ", req_url);
    const chapter_id = req_url.split("/")[req_url.split("/").length - 2];
    if (!chapter_id) {
      return NextResponse.json({ message: "Chapter Id not provided or incorrect!", status: 400 });
    }
    const _id = parseInt(chapter_id);
    if (_id < 0) {
      return NextResponse.json({ message: "Invalid chapter id", status: 400 });
    }
    const scenes = await getScenesByChapterId(_id);
    return NextResponse.json(scenes);
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({ message: "Error fetching scenes, check the logs!", status: 500 });
  }
}