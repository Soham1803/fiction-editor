import { getEntityMentionsByEntityId } from "@/db/queries/entity_mentions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const req_url = await req.url;
    console.log("Request URL: ", req_url);
    const entity_id = req_url.split("/")[req_url.split("/").length - 2];
    if (!entity_id) {
      return NextResponse.json({ message: "Entity Id not provided or incorrect!", status: 400 });
    }
    const _id = parseInt(entity_id);
    if (_id < 0) {
      return NextResponse.json({ message: "Invalid entity id", status: 400 });
    }
    const entity_mentions = await getEntityMentionsByEntityId(_id);
    return NextResponse.json(entity_mentions);
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({ message: "Error fetching entity mentions, check the logs!", status: 500 });
  }
}