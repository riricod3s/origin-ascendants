import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeInternalPath } from "@/lib/supabase/redirect";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const nextPath = safeInternalPath(request.nextUrl.searchParams.get("next"), request.nextUrl.origin);
  const supabase = await createClient();

  if (!supabase || !code) {
    return NextResponse.redirect(new URL("/login?error=verification", request.url));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/login?error=verification", request.url));
  }

  return NextResponse.redirect(new URL(nextPath, request.url));
}
