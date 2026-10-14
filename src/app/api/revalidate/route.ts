import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    revalidateTag("sanity-content", { expire: 0 });

    // Also clear the full route cache for your home page (adjust path as needed)
    revalidatePath("/", "page");
    revalidatePath("/Betreuung", "page");

    console.log("SUCCESS");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json(
      { revalidated: false, error: err.message },
      { status: 500 },
    );
  }
}
