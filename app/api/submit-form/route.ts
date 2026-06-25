import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formName, fields, formValues } = body;

    if (!fields?.length || !formValues) {
      return NextResponse.json({ error: "Invalid submission data" }, { status: 400 });
    }

    console.log("Form submitted:", { formName, fields, formValues });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Form submission error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
