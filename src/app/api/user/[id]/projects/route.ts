import { getProjectsByUserId } from "@/db/queries/project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const req_url = await req.url;
    console.log("Request URL: ", req_url);
    const user_id = req_url.split("/")[req_url.split("/").length - 2];
    if (!user_id) {
      return NextResponse.json({ message: "User Id not provided or incorrect!", status: 400 });
    }
    const _id = parseInt(user_id);
    if (_id < 0) {
      return NextResponse.json({ message: "Invalid project id", status: 400 });
    }
    const project = await getProjectsByUserId(_id);
    return NextResponse.json(project);
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({ message: "Error fetching project, check the logs!", status: 500 });
  }
}