import { getBeatById, getBeatsByProjectId, createBeat } from "@/db/queries/beats";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { sequence_no, title, description, projectId } = await req.json();
    
        if (!sequence_no || !title || !projectId) {
        return NextResponse.json({ message: "Please provide all the required fields", status: 400 });
        }
    
        const data = {
        sequence_no,
        title,
        description,
        projectId,
        };
        await createBeat(data);
        return NextResponse.json({ message: "Beat created" });
    } catch (e) {
        console.log("Catched Error: ", e);
        return NextResponse.json({ message: "Error creating beat, check the logs!", status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { id, projectId } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Please provide beat id", status: 400 });
        } else if (!projectId) {
            return NextResponse.json({ message: "Please provide project id", status: 400 });
        }
        const _id = parseInt(id);
        const _projectId = parseInt(projectId);
        if (_id < 0) {
            return NextResponse.json({ message: "Invalid beat id", status: 400 });
        }

        const beat = id && !projectId ? await getBeatById(_id): await getBeatsByProjectId(_projectId);
        return NextResponse.json(beat);
    } catch (error) {
        console.log("Catched Error: ", error);
        return NextResponse.json({ message: "Error fetching beat, check the logs!", status: 500 });
    }
}