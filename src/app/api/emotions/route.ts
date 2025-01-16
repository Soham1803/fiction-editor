import { getEmotionById, getEmotionsByProjectId, createEmotion } from "@/db/queries/emotions";
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
        await createEmotion(data);
        return NextResponse.json({ message: "Emotion created" });
    } catch (e) {
        console.log("Catched Error: ", e);
        return NextResponse.json({ message: "Error creating emotion, check the logs!", status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { id, projectId } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Please provide emotion id", status: 400 });
        } else if (!projectId) {
            return NextResponse.json({ message: "Please provide project id", status: 400 });
        }
        const _id = parseInt(id);
        const _projectId = parseInt(projectId);
        if (_id < 0) {
            return NextResponse.json({ message: "Invalid emotion id", status: 400 });
        }

        const emotion = id && !projectId ? await getEmotionById(_id): await getEmotionsByProjectId(_projectId);
        return NextResponse.json(emotion);
    }
    catch (error) {
        console.log("Catched Error: ", error);
        return NextResponse.json({ message: "Error fetching emotion, check the logs!", status: 500 });
    }
}