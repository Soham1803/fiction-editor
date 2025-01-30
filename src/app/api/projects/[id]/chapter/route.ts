import { getChaptersByProjectId } from "@/db/queries/chapter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const req_url = await req.url;
    console.log("Request URL: ", req_url);
    const project_id = req_url.split("/")[req_url.split("/").length - 2];
    if (!project_id) {
      return NextResponse.json({ message: "Project Id not provided or incorrect!", status: 400 });
    }
    const _id = parseInt(project_id);
    if (_id < 0) {
      return NextResponse.json({ message: "Invalid project id", status: 400 });
    }
    const chapters = await getChaptersByProjectId(_id);
    return NextResponse.json(chapters);
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({ message: "Error fetching chapters, check the logs!", status: 500 });
  }
}