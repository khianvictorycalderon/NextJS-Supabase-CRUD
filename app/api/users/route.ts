import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, desc, address } = body;

    console.log(`Received: ${name}, ${desc}, ${address}`);

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
