import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = createClient();

    const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", Number(id))
        .select();

    if (error) {
        return NextResponse.json(
            {
                type: "error",
                message: `Failed to delete: ${error.message}`
            },
            { status: 500 }
        )
    }

    if (!data || data.length < 1) {
        return NextResponse.json(
            {
                type: "error",
                message: "User doesn't exist."
            }
        )
    }

    return NextResponse.json(
        {
            type: "success",
            message: `User with ID ${id} deleted successfully!`
        }
    )
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const supabase = createClient();
  const body = await req.json();

  // Only include fields that are non-empty (non-null and non-undefined)
  const fieldsToUpdate: Record<string, string> = {};
  if (body.name?.trim()) fieldsToUpdate.name = body.name.trim();
  if (body.desc?.trim()) fieldsToUpdate.desc = body.desc.trim();
  if (body.address?.trim()) fieldsToUpdate.address = body.address.trim();

  if (Object.keys(fieldsToUpdate).length === 0) {
    return NextResponse.json(
      { type: "error", message: "No valid fields provided for update." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("users")
    .update(fieldsToUpdate)
    .eq("id", Number(id))
    .select();

  if (error) {
    return NextResponse.json(
      { type: "error", message: `Update failed: ${error.message}` },
      { status: 500 }
    );
  }

  if (!data || data.length < 1) {
    return NextResponse.json(
        {
            type: "error",
            message: "User doesn't exist."
        },
        { status: 404 }
    )
  }

  return NextResponse.json(
    { type: "success", message: "User updated successfully." },
    { status: 200 }
  );
}
