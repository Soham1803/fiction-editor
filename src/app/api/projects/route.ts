import { getProjectById, createProject, updateProject, deleteProject } from '@/db/queries/project'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest){
  try{
    const {title, description, userId} = await req.json();

    if(!title || !description || !userId){
      return NextResponse.json({ message: "Please provide all the required fields", status: 400});
    }

    const data = {
      title,
      description,
      userId
    }
    await createProject(data);
    return NextResponse.json({ message: "Project created" });
  } catch(e){
    console.log("Catched Error: ", e);
    return NextResponse.json({ message: "Error creating project, check the logs!", status: 500});
  }
}

export async function GET(req: NextRequest){
  try {
    const {id} = await req.json();
    if(!id){
      return NextResponse.json({ message: "Please provide project id", status: 400});
    }
    const _id = parseInt(id);
    if(_id < 0){
      return NextResponse.json({ message: "Invalid project id", status: 400});
    }
    const project = await getProjectById(_id);
    return NextResponse.json(project);
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({ message: "Error fetching project, check the logs!", status: 500});
  }
}
