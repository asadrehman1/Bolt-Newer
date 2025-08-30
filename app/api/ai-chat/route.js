import { genai } from "@/configs/ai";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { prompt } = await req.json();
  try {
    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(response.text);
    return NextResponse.json({ result: response.text  });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}