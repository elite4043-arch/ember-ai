import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("WAITLIST: Missing env vars", {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
      });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // ── Parse body ────────────────────────────────────────────
    const body = await req.json();
    const email    = body?.email?.toLowerCase().trim();
    const industry = body?.industry || null;

    console.log("WAITLIST: Received", { email, industry });

    // ── Validate email properly ───────────────────────────────
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    // Block obvious fake/test emails
    const blockedDomains = ["test.com", "fake.com", "example.com", "mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email", "yopmail.com"];
    const domain = email.split("@")[1];
    if (blockedDomains.includes(domain)) {
      return NextResponse.json({ error: "Please use a real email address" }, { status: 400 });
    }

    // ── Create Supabase client ────────────────────────────────
    const supabase = createClient(supabaseUrl, supabaseKey);

    // ── Insert into waitlist ──────────────────────────────────
    const { data, error } = await supabase
      .from("waitlist")
      .insert({ email, industry })
      .select();

    if (error) {
      // Duplicate email — still return success
      if (error.code === "23505") {
        console.log("WAITLIST: Duplicate email", email);
        return NextResponse.json({ success: true, existing: true });
      }
      console.error("WAITLIST: Supabase error", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log("WAITLIST: Saved successfully", data);
    return NextResponse.json({ success: true });

  } catch (e) {
    console.error("WAITLIST: Caught error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}