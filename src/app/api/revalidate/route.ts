import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Record<string, unknown>).path !== "string" ||
    typeof (body as Record<string, unknown>).secret !== "string"
  ) {
    return NextResponse.json(
      { error: "Missing required fields: path and secret" },
      { status: 400 }
    );
  }

  const { path, secret } = body as { path: string; secret: string };

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  revalidatePath(path);

  return NextResponse.json({ revalidated: true, path });
}
