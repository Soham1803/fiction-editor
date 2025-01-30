import { createEntity, getEntityById } from "@/db/queries/entity";
import { InsertEntity } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const { id } = await req.json();
        const entity = await getEntityById(id);
        return NextResponse.json(entity);
    } catch (error) {
        console.log("Catched Error: ", error);
        return NextResponse.json({ message: "Error fetching entity, check the logs!", status: 500 });
    }
}

export async function POST(req: NextRequest){
    try {
        const data : InsertEntity = await req.json();
        if(data.name || data.type ){
            return NextResponse.json({ message: "Please provide all the required fields", status: 400});
        }
        const response = await createEntity(data);
        return NextResponse.json({message: "Entity created successfully", response, status: 200})
    } catch (error) {
        console.log("Catched Error: ", error);
        return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500})
    }
}