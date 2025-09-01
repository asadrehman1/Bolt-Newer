import { codeGenerationSession } from "@/configs/ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();
  try {
    const result = await codeGenerationSession.sendMessage(prompt);
    const aiResponse = result.response.text();
    return NextResponse.json(JSON.parse(aiResponse));
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}