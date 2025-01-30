import { createEntityMention } from "@/db/queries/entity_mentions"; 
import { InsertEntityMentions } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const data : InsertEntityMentions = await req.json();
        if(data.entityId || data.location || data.context_type){
            return NextResponse.json({ message: "Please provide all the required fields", status: 400});
        }
        const response = await createEntityMention(data);
        return NextResponse.json({message: "Entity Mention created successfully", response, status: 200})
    } catch (error) {
        console.log("Catched Error: ", error);
        return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500})
    }
}