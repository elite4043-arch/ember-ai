"use client";

const COLOURS = {
  yellow: "#FDE047", amber: "#F59E0B", orange: "#EA580C",
  red: "#EF4444", pink: "#FB7185",
};

const emailValid = (email: string) =>
  /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);

type SignupModalProps = {
  show:           boolean;
  onClose:        () => void;
  signupEmail:    string;
  setSignupEmail: (email: string) => void;
  signupTrigger:  string;
  signupStatus:   "idle" | "loading" | "success" | "error";
  onSubmit:       () => void;
};

export default function SignupModal({
  show, onClose, signupEmail, setSignupEmail, signupTrigger, signupStatus, onSubmit,
}: SignupModalProps) {
  if (!show) return null;

  return (
    <div
      onClick={() => signupStatus !== "loading" && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(0,0,0,0.38)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.18s ease forwards"
      }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "420px",
          background: "rgba(255,255,255,0.97)",
          borderRadius: "28px", padding: "36px 32px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
          border: "1px solid rgba(0,0,0,0.06)",
          animation: "fadeUp 0.25s ease forwards"
        }}>
        <div style={{
          marginBottom: "8px", fontSize: "13px", fontWeight: 700,
          color: "#9a3412", letterSpacing: "0.07em", textTransform: "uppercase"
        }}>
          Early access
        </div>
        <div style={{
          fontWeight: 800, fontSize: "24px", color: "#111827",
          marginBottom: "8px", letterSpacing: "-0.03em"
        }}>
          {signupTrigger === "unlock"
            ? "Unlock the full store"
            : signupTrigger === "plan"
            ? "Build your business plan"
            : "Join Ember"}
        </div>
        <div style={{
          color: "#6b7280", fontSize: "14px",
          lineHeight: 1.65, marginBottom: "28px"
        }}>
          {signupTrigger === "unlock"
            ? "Enter your email to continue building your store. We'll save your work automatically."
            : signupTrigger === "plan"
            ? "Enter your email and we'll generate your full 3-month business plan, store, and sales playbook — all saved to your account."
            : "Join thousands building their business with Ember."}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onSubmit(); }}
            autoFocus
            style={{
              width: "100%", padding: "14px 16px",
              borderRadius: "14px", boxSizing: "border-box",
              border: "1.5px solid rgba(0,0,0,0.12)",
              fontSize: "15px", color: "#111827",
              outline: "none", background: "#fafafa",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = COLOURS.orange; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; }}
          />
          <button
            onClick={onSubmit}
            disabled={signupStatus === "loading" || !emailValid(signupEmail)}
            style={{
              width: "100%", padding: "14px",
              borderRadius: "14px", border: "none",
              background: emailValid(signupEmail)
                ? `linear-gradient(135deg,${COLOURS.amber} 0%,${COLOURS.orange} 55%,${COLOURS.pink} 100%)`
                : "#e5e7eb",
              color: emailValid(signupEmail) ? "white" : "#9ca3af",
              fontWeight: 700, fontSize: "15px",
              cursor: emailValid(signupEmail) ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
              boxShadow: emailValid(signupEmail) ? "0 8px 24px rgba(234,88,12,0.28)" : "none"
            }}>
            {signupStatus === "loading" ? "One sec..." : "Continue 🔥"}
          </button>
          {signupStatus === "error" && (
            <div style={{ fontSize: "13px", color: "#ef4444", textAlign: "center" }}>
              Something went wrong — try again.
            </div>
          )}
          <div style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", marginTop: "4px" }}>
            No spam. Unsubscribe any time.
          </div>
        </div>
      </div>
    </div>
  );
}