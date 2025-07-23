import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("id", { ascending: true})

  if (error) {
    return NextResponse.json(
      {
        type: "error",
        message: `Failed to fetch users: ${error.message}`
      },
      { status: 500 }
    )
  }

  return NextResponse.json(
    {
      type: "success",
      message: "Users fetched successfully!",
      data
    },
    { status: 200 }
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, desc, address } = body;

    const supabase = createClient();
    const { error } = await supabase
      .from("users")
      .insert([
        { name, desc, address }
      ]);

    if (error) {
      return NextResponse.json(
        {
          type: "error",
          message: `Failed to create new user ${error}`
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      {
        type: "success",
        message: "Input received at server!"
      },
      { status: 200 }
    );

  } catch (error) {

    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { 
        type: "error",
        message: "Server error."
      },
      { status: 500 }
    );

  }
}
