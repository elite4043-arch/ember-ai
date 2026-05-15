"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const GRAD = `linear-gradient(135deg,#FDE047,#F59E0B,#EA580C,#EF4444,#FB7185)`;
const C = { orange: "#EA580C", amber: "#F59E0B" };

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    await signIn("email", { email, callbackUrl: "/" });
    setEmailSent(true);
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#fef3e2 0%,#fde8c8 30%,#fddfc0 60%,#fde4cc 80%,#fef3e2 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      padding: "24px",
    }}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .signin-card { animation: fadeInUp 0.4s ease both; }
        .btn-hover:hover { opacity: 0.92; transform: translateY(-1px); }
        .btn-hover { transition: all 0.2s ease; }
      `}</style>

      {/* Card */}
      <div className="signin-card" style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        padding: "40px 36px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)",
        position: "relative" as const,
      }}>

        {/* Close button */}
        <a href="/" style={{
          position: "absolute" as const, top: "16px", right: "16px",
          width: "32px", height: "32px", borderRadius: "50%",
          background: "rgba(0,0,0,0.05)", display: "flex",
          alignItems: "center", justifyContent: "center",
          textDecoration: "none", color: "#6b7280", fontSize: "18px",
          transition: "background 0.2s",
        }}>×</a>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <img src="/favicon.svg" alt="Ember" style={{ width: "36px", height: "36px" }} />
          <span style={{ fontWeight: 800, fontSize: "18px", letterSpacing: "-0.03em", color: "#111827" }}>Ember</span>
        </div>

        {/* Title */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "15px", color: "#6b7280", marginBottom: "4px" }}>Start building.</div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em" }}>
            Log in to your account
          </div>
        </div>

        {emailSent ? (
          <div style={{ textAlign: "center" as const, padding: "20px 0" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>📧</div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>Check your email</div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>We sent a sign in link to {email}</div>
          </div>
        ) : (
          <>
            {/* Google */}
            <button
              className="btn-hover"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              style={{
                width: "100%", padding: "13px 16px",
                borderRadius: "12px", border: "1.5px solid rgba(0,0,0,0.12)",
                background: "white", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                fontSize: "15px", fontWeight: 600, color: "#111827",
                marginBottom: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "16px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>OR</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
            </div>

            {/* Email */}
            <form onSubmit={handleEmailSignIn}>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%", padding: "13px 16px",
                  borderRadius: "12px", border: "1.5px solid rgba(0,0,0,0.12)",
                  fontSize: "15px", color: "#111827", background: "white",
                  outline: "none", marginBottom: "10px",
                  boxSizing: "border-box" as const,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.target.style.borderColor = C.orange; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.12)"; }}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-hover"
                style={{
                  width: "100%", padding: "13px 16px",
                  borderRadius: "12px", border: "none",
                  background: "#111827", color: "white",
                  fontSize: "15px", fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}>
                {loading ? "Sending..." : "Continue with email"}
              </button>
            </form>

            {/* Terms */}
            <div style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center" as const, marginTop: "20px", lineHeight: 1.6 }}>
              By continuing you agree to our{" "}
              <a href="/terms" style={{ color: C.orange, textDecoration: "none" }}>Terms</a>
              {" "}and{" "}
              <a href="/privacy" style={{ color: C.orange, textDecoration: "none" }}>Privacy Policy</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}