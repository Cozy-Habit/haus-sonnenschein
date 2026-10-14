import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { isValidSignature } from "@sanity/webhook";

// This must match the raw body parser requirement or be read as text
const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text();
    const signature = request.headers.get("sanity-signature") || "";

    // If a secret is defined, verify the signature
    if (secret) {
      const isValid = isValidSignature(bodyText, signature, secret);
      if (!isValid) {
        return NextResponse.json(
          { success: false, message: "Invalid signature" },
          { status: 401 },
        );
      }
    }

    // In Next.js 16, revalidateTag requires a cacheLife profile as the second argument
    revalidateTag("sanity-content", { expire: 0 });

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json(
      { revalidated: false, error: err.message },
      { status: 500 },
    );
  }
}
