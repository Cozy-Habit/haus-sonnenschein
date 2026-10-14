import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// Allow testing via browser GET request, and webhooks via POST
export async function GET(request: NextRequest) {
  return handleRevalidation(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidation(request);
}

async function handleRevalidation(request: NextRequest) {
  try {
    // Revalidate your content cache tag
    revalidateTag("sanity-content", "max");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Cache revalidated successfully!",
    });
  } catch (err: any) {
    return NextResponse.json(
      { revalidated: false, error: err.message },
      { status: 500 },
    );
  }
}
