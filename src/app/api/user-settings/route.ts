import { createUserSettings, getUserSettingsByUserId, updateUserSettings } from '@/db/queries/userSettings';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest){
  try{
    const { userId, theme, fontSize, fontFamily, notifications_enabled } = await req.json();

    if(!userId || !theme || !fontSize || !notifications_enabled || fontFamily){
      return NextResponse.json({ message: "Please provide all the required fields", status: 400});
    }

    const response = await createUserSettings({ userId, theme, font_size: fontSize, font_family: fontFamily, notifications_enabled });
    
    return NextResponse.json({message: "User settings created successfully", response, status: 200});
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500});
  }
}

export async function GET(req: NextRequest){
  try{
    const { userId } = await req.json();
    if(!userId){
      return NextResponse.json({ message: "Please provide the user id", status: 400});
    }
    const _userId = parseInt(userId);
    if(userId < 0){
      return NextResponse.json({ message: "Invalid user id", status: 400});
    }
    const response = await getUserSettingsByUserId(_userId);
    return NextResponse.json(response);
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500});
  }
}

export async function PUT(req: NextRequest){
  try{
    const { userId, theme, fontSize, notificationsEnabled } = await req.json();
    if(!userId || !theme || !fontSize || !notificationsEnabled){
      return NextResponse.json({ message: "Please provide all the required fields", status: 400});
    }

    const notifications_enabled = notificationsEnabled === 'true';

    const user_id = parseInt(userId);
    const response = await updateUserSettings(user_id, { theme, font_size: fontSize, notifications_enabled });
    return NextResponse.json({message: "User settings updated successfully", response, status: 200});
  } catch (error) {
    console.log("Catched Error: ", error);
    return NextResponse.json({message: "Unexpected error occurred, please check the logs!", status: 500});
  }
  }
