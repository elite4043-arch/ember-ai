// app/api/check-plan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_EMAILS = ["elite4043@gmail.com"];

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ isPro: false });

    if (ADMIN_EMAILS.includes(email)) {
      return NextResponse.json({ isPro: true, plan: "pro" });
    }

    const { data } = await supabase
      .from("users")
      .select("plan, plan_status")
      .eq("email", email)
      .single();

    const isPro =
      data?.plan === "pro" &&
      (data?.plan_status === "active" || data?.plan_status === "trialing");

    return NextResponse.json({ isPro, plan: data?.plan || "free" });
  } catch {
    return NextResponse.json({ isPro: false });
  }
}