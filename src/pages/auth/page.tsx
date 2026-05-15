import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import gsap from "gsap";
import { seedDemoUser } from "@/mocks/users";

type AuthMode = "login" | "signup" | "forgot";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, resetPassword, isAuthenticated } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const loginBtnRef = useRef<HTMLButtonElement>(null);
  const signupBtnRef = useRef<HTMLButtonElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<AuthMode>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  // Seed demo user on mount
  useEffect(() => {
    seedDemoUser();
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from =
        (location.state as { from?: { pathname: string } })?.from?.pathname ||
        "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  // Entrance animations
  useEffect(() => {
    if (!heroRef.current) return;
    const items = heroRef.current.querySelectorAll(".animate-in");
    gsap.from(items, {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  // Animate form fields when mode changes
  useEffect(() => {
    if (!formRef.current) return;
    const fields = formRef.current.querySelectorAll(".form-field");
    gsap.from(fields, {
      y: 12,
      opacity: 0,
      stagger: 0.04,
      duration: 0.4,
      ease: "power2.out",
    });
    setError("");
    setSuccess("");
  }, [mode]);

  // Position toggle underline on mount and when mode changes (for login/signup only)
  useLayoutEffect(() => {
    if (mode === "forgot" || !toggleRef.current || !underlineRef.current)
      return;

    const targetBtn =
      mode === "login" ? loginBtnRef.current : signupBtnRef.current;
    if (!targetBtn) return;

    const toggleRect = toggleRef.current.getBoundingClientRect();
    const btnRect = targetBtn.getBoundingClientRect();

    gsap.set(underlineRef.current, {
      x: btnRect.left - toggleRect.left,
      width: btnRect.width,
      opacity: 1,
    });
  }, [mode]);

  const handleToggle = (newMode: AuthMode) => {
    if (newMode === mode || newMode === "forgot") return;
    setMode(newMode);

    if (!toggleRef.current || !underlineRef.current) return;
    const activeBtn =
      newMode === "login" ? loginBtnRef.current : signupBtnRef.current;
    if (!activeBtn) return;

    const toggleRect = toggleRef.current.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    gsap.to(underlineRef.current, {
      x: btnRect.left - toggleRect.left,
      width: btnRect.width,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (mode === "forgot") {
      const result = await resetPassword({ email });
      if (result.success) {
        setSuccess("A password reset link has been sent to your email.");
      } else {
        setError(result.error || "Something went wrong.");
      }
      setIsSubmitting(false);
      return;
    }

    if (mode === "signup") {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setIsSubmitting(false);
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        setIsSubmitting(false);
        return;
      }
      const result = await signup({
        email,
        password,
        firstName,
        lastName,
        phone: phone || undefined,
        newsletter,
      });
      if (result.success) {
        setSuccess("Account created successfully. Welcome to Noctēum.");
        setTimeout(() => navigate("/dashboard"), 1200);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } else {
      const result = await login(email, password);
      if (result.success) {
        setSuccess("Welcome back.");
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setError(result.error || "Something went wrong.");
      }
    }
    setIsSubmitting(false);
  };

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";

  return (
    <main
      className="relative min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div ref={heroRef} className="w-full max-w-md mx-auto px-6 py-20">
        {/* Logo */}
        <Link
          to="/"
          className="animate-in flex items-center justify-center gap-3 mb-10 group"
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M8 26V6l8 12 8-12v20"
              stroke="var(--accent)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="font-serif text-lg tracking-wide"
            style={{ color: "var(--text-primary)" }}
          >
            NOCTĒUM
          </span>
        </Link>

        {/* Heading */}
        <h1
          className="animate-in font-serif text-3xl md:text-4xl text-center mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {isForgot ? (
            <>
              Reset{" "}
              <em className="not-italic" style={{ color: "var(--accent)" }}>
                Password
              </em>
            </>
          ) : (
            <>
              Member{" "}
              <em className="not-italic" style={{ color: "var(--accent)" }}>
                Access
              </em>
            </>
          )}
        </h1>
        <p
          className="animate-in font-body text-sm text-center mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          {isForgot
            ? "Enter your email and we will send you a link to reset your password."
            : "Sign in to access your orders, addresses, and member benefits."}
        </p>

        {/* Mode Toggle — hidden in forgot mode */}
        {!isForgot && (
          <div
            ref={toggleRef}
            className="animate-in relative flex items-center justify-center gap-8 mb-10"
          >
            <button
              ref={loginBtnRef}
              data-mode="login"
              onClick={() => handleToggle("login")}
              className="font-mono text-xs tracking-[0.15em] uppercase py-2 transition-colors"
              style={{
                color: isLogin ? "var(--text-primary)" : "var(--text-muted)",
              }}
            >
              Sign In
            </button>
            <button
              ref={signupBtnRef}
              data-mode="signup"
              onClick={() => handleToggle("signup")}
              className="font-mono text-xs tracking-[0.15em] uppercase py-2 transition-colors"
              style={{
                color: isSignup ? "var(--text-primary)" : "var(--text-muted)",
              }}
            >
              Create Account
            </button>
            <div
              ref={underlineRef}
              className="absolute bottom-0 h-px"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </div>
        )}

        {/* Error / Success */}
        {error && (
          <div
            className="animate-in mb-6 p-3 rounded-md text-center font-body text-sm"
            style={{
              backgroundColor: "rgba(239,68,68,0.1)",
              color: "#EF4444",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="animate-in mb-6 p-3 rounded-md text-center font-body text-sm"
            style={{
              backgroundColor: "rgba(16,185,129,0.1)",
              color: "#10B981",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            {success}
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <div className="form-field grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="Elena"
                />
              </div>
              <div>
                <label
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="Voss"
                />
              </div>
            </div>
          )}

          <div className="form-field">
            <label
              className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              placeholder="elena@nocteum.com"
            />
          </div>

          {!isForgot && (
            <div className="form-field">
              <label
                className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder={
                  isSignup ? "Min. 6 characters" : "Enter your password"
                }
              />
            </div>
          )}

          {/* Forgot Password link — only in login mode */}
          {isLogin && (
            <div className="form-field flex justify-end">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="font-mono text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-70"
                style={{ color: "var(--text-secondary)" }}
              >
                Forgot your password?
              </button>
            </div>
          )}

          {isSignup && (
            <>
              <div className="form-field">
                <label
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="Repeat your password"
                />
              </div>

              <div className="form-field">
                <label
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Phone{" "}
                  <span
                    className="normal-case"
                    style={{ color: "var(--text-muted)" }}
                  >
                    (Optional)
                  </span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent border-b pb-2 font-body text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="+33 1 42 60 00 00"
                />
              </div>

              <div className="form-field flex items-center gap-3 py-2">
                <button
                  type="button"
                  onClick={() => setNewsletter(!newsletter)}
                  className="w-4 h-4 rounded-sm border flex items-center justify-center transition-colors"
                  style={{
                    borderColor: newsletter ? "var(--accent)" : "var(--border)",
                    backgroundColor: newsletter
                      ? "var(--accent)"
                      : "transparent",
                  }}
                >
                  {newsletter && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--bg-primary)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
                <label
                  className="font-body text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Subscribe to exclusive member offers and new fragrance
                  launches.
                </label>
              </div>
            </>
          )}

          <div className="form-field pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group disabled:opacity-60"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg-primary)",
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isForgot
                    ? "Sending..."
                    : isSignup
                      ? "Creating Account..."
                      : "Signing In..."}
                </span>
              ) : (
                <>
                  <span className="relative z-10">
                    {isForgot
                      ? "Send Reset Link"
                      : isSignup
                        ? "Create Account"
                        : "Sign In"}
                  </span>
                  <span
                    className="absolute inset-0 origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
                    style={{ backgroundColor: "var(--text-primary)" }}
                  />
                  <span
                    className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                    style={{ color: "var(--bg-primary)" }}
                  >
                    {isForgot
                      ? "Send Reset Link"
                      : isSignup
                        ? "Create Account"
                        : "Sign In"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Back link — shown in forgot mode */}
        {isForgot && (
          <button
            type="button"
            onClick={() => setMode("login")}
            className="animate-in flex items-center justify-center gap-2 mt-8 font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back to Sign In</span>
          </button>
        )}

        {/* Demo hint — hidden in forgot mode */}
        {!isForgot && (
          <p
            className="animate-in text-center mt-8 font-mono text-[10px] tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Demo:{" "}
            <span style={{ color: "var(--text-secondary)" }}>
              demo@nocteum.com
            </span>{" "}
            /{" "}
            <span style={{ color: "var(--text-secondary)" }}>nocteum2026</span>
          </p>
        )}

        {/* Return link — hidden in forgot mode (has its own back link) */}
        {!isForgot && (
          <Link
            to="/"
            className="animate-in flex items-center justify-center gap-2 mt-6 font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Return to Noctēum</span>
          </Link>
        )}
      </div>
    </main>
  );
}
