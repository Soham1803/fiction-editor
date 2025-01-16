import { updateSynopsis, deleteSynopsis } from "@/db/queries/synopsis";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, params: {id: string}){
    try {
        const _id = params.id;

        const data = await req.json();

        if(data.content || data.projectId){
            return NextResponse.json({ message: "Please provide all the required fields", status: 400});
        }

        const response = await updateSynopsis(_id, data);

        return NextResponse.json({message: "Synopsis updated successfully", response, status: 200})
    } catch (error) {
        console.log("Catched Error: ", error);
        return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500})
    } 
}

export async function DELETE(req: NextResponse, params: {id: string}) {
    try {
        const _id = params.id;
        const response = await deleteSynopsis(_id);

        return NextResponse.json({message: "Synopsis deleted successfully", response, status: 200})
    } catch (error) {
        console.log("Catched Error: ", error);
        return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500})
    }
}