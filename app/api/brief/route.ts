import { NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["name", "phone"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} majburiy` },
          { status: 400 }
        );
      }
    }

    await appendToSheet(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sheet error:", err);
    return NextResponse.json(
      { error: "Xatolik yuz berdi, qayta urinib ko'ring" },
      { status: 500 }
    );
  }
}
