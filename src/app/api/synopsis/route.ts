import { getSynopsisByProjectId, getSynopsisById, createSynopsis } from "@/db/queries/synopsis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { content, projectId } = await req.json();
    
        if (!content || !projectId) {
        return NextResponse.json({ message: "Please provide all the required fields", status: 400 });
        }
    
        const data = {
        content,
        projectId,
        };
        await createSynopsis(data);
        return NextResponse.json({ message: "Synopsis created" });
    } catch (e) {
        console.log("Catched Error: ", e);
        return NextResponse.json({ message: "Error creating synopsis, check the logs!", status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { id, projectId } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Please provide synopsis id", status: 400 });
        } else if (!projectId) {
            return NextResponse.json({ message: "Please provide project id", status: 400 });
        }
        const _id = parseInt(id);
        const _projectId = parseInt(projectId);
        if (_id < 0) {
            return NextResponse.json({ message: "Invalid synopsis id", status: 400 });
        }

        const synopsis = id && !projectId ? await getSynopsisById(_id): await getSynopsisByProjectId(_projectId);
        return NextResponse.json(synopsis);
    } catch (error) {
        console.log("Catched Error: ", error);
        return NextResponse.json({ message: "Error fetching synopsis, check the logs!", status: 500 });
    }
}
