import { getSynopsisByProjectId } from "@/db/queries/synopsis";
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
    const synopsis = await getSynopsisByProjectId(_id);
    return NextResponse.json(synopsis);
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({ message: "Error fetching synopsis, check the logs!", status: 500 });
  }
}