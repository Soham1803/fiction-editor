import { getLoreById, getLoreByProjectId, createLore } from "@/db/queries/lore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { title, description, projectId } = await req.json();
    
        if (!title || !description || !projectId) {
        return NextResponse.json({ message: "Please provide all the required fields", status: 400 });
        }
    
        const data = {
        title,
        description,
        projectId,
        };
        await createLore(data);
        return NextResponse.json({ message: "Lore created" });
    } catch (e) {
        console.log("Catched Error: ", e);
        return NextResponse.json({ message: "Error creating lore, check the logs!", status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { id, projectId } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Please provide lore id", status: 400 });
        } else if (!projectId) {
            return NextResponse.json({ message: "Please provide project id", status: 400 });
        }
        const _id = parseInt(id);
        const _projectId = parseInt(projectId);
        if (_id < 0) {
            return NextResponse.json({ message: "Invalid lore id", status: 400 });
        }

        const lore = id && !projectId ? await getLoreById(_id): await getLoreByProjectId(_projectId);
        return NextResponse.json(lore);
    } catch (error) {
        console.log("Catched Error: ", error);
        return NextResponse.json({ message: "Error fetching lore, check the logs!", status: 500 });
    }
}