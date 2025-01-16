import { getInspirationById, getInspirationsByProjectId, createInspiration } from "@/db/queries/inspirations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { title, insights, projectId } = await req.json();
    
        if (!title || !projectId) {
        return NextResponse.json({ message: "Please provide all the required fields", status: 400 });
        }
    
        const data = {
        title,
        insights,
        projectId,
        };
        await createInspiration(data);
        return NextResponse.json({ message: "Inspiration created" });
    } catch (e) {
        console.log("Catched Error: ", e);
        return NextResponse.json({ message: "Error creating inspiration, check the logs!", status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { id, projectId } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Please provide inspiration id", status: 400 });
        } else if (!projectId) {
            return NextResponse.json({ message: "Please provide project id", status: 400 });
        }
        const _id = parseInt(id);
        const _projectId = parseInt(projectId);
        if (_id < 0) {
            return NextResponse.json({ message: "Invalid inspiration id", status: 400 });
        }

        const inspiration = id && !projectId ? await getInspirationById(_id): await getInspirationsByProjectId(_projectId);
        return NextResponse.json(inspiration);
    } catch (error) {
        console.log("Catched Error: ", error);
        return NextResponse.json({ message: "Error fetching inspiration, check the logs!", status: 500 });
    }
}
