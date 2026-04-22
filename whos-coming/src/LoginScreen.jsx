import { useState } from "react";
import { supabase } from "./supabase.js";

const FONT = "'Georgia', serif";
const BG   = "#0E0E0E";

export default function LoginScreen({ onLogin }) {
  const [mode,     setMode]     = useState("login"); // login | forgot
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState("");

  const iSt = {
    width:"100%", background:"#111", border:"1px solid #2A2A2A",
    color:"#F5F0E8", padding:"14px 16px", fontSize:16, fontFamily:FONT,
    boxSizing:"border-box", outline:"none", borderRadius:10,
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) { setError("Please enter your email and password."); return; }
    setLoading(true); setError("");
    const { data, error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (err) { setError("Incorrect email or password."); return; }
    onLogin(data.user);
  };

  const handleForgot = async () => {
    if (!email.trim()) { setError("Enter your email address first."); return; }
    setLoading(true); setError("");
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim());
    setLoading(false);
    if (err) { setError("Could not send reset email. Try again."); return; }
    setSuccess("Check your email for the reset link.");
  };

  return (
    <div style={{
      minHeight:"100vh", background:BG, display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", fontFamily:FONT, padding:24,
    }}>
      {/* Background decoration */}
      <div style={{
        position:"fixed", top:-100, right:-100,
        width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle, #C9A96E08 0%, transparent 70%)",
        pointerEvents:"none",
      }}/>
      <div style={{
        position:"fixed", bottom:-150, left:-150,
        width:500, height:500, borderRadius:"50%",
        background:"radial-gradient(circle, #C9A96E05 0%, transparent 70%)",
        pointerEvents:"none",
      }}/>

      <div style={{ width:"100%", maxWidth:380 }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{
            fontSize:36, fontStyle:"italic", letterSpacing:"0.06em",
            color:"#F5F0E8", marginBottom:8,
          }}>
            Who's Coming?
          </div>
          <div style={{
            fontSize:10, letterSpacing:"0.35em", color:"#C9A96E",
            textTransform:"uppercase",
          }}>
            VIP Intelligence
          </div>
          <div style={{
            width:40, height:1, background:"#C9A96E44",
            margin:"16px auto 0",
          }}/>
        </div>

        {/* Card */}
        <div style={{
          background:"#111", borderRadius:20, padding:28,
          border:"1px solid #1E1E1E",
        }}>
          <div style={{
            fontSize:13, letterSpacing:"0.2em", color:"#555",
            textTransform:"uppercase", marginBottom:24, textAlign:"center",
          }}>
            {mode==="login" ? "Sign In" : "Reset Password"}
          </div>

          {/* Email */}
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, color:"#666", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:6 }}>Email</div>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e=>{setEmail(e.target.value);setError("");}}
              onKeyDown={e=>e.key==="Enter"&&(mode==="login"?handleLogin():handleForgot())}
              style={iSt}
            />
          </div>

          {/* Password */}
          {mode==="login"&&(
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:10, color:"#666", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:6 }}>Password</div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e=>{setPassword(e.target.value);setError("");}}
                onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                style={iSt}
              />
            </div>
          )}

          {/* Error / Success */}
          {error&&<div style={{ fontSize:12, color:"#E07A5F", marginBottom:14, textAlign:"center", lineHeight:1.5 }}>{error}</div>}
          {success&&<div style={{ fontSize:12, color:"#4CAF82", marginBottom:14, textAlign:"center", lineHeight:1.5 }}>{success}</div>}

          {/* Button */}
          <button
            onClick={mode==="login"?handleLogin:handleForgot}
            disabled={loading}
            style={{
              width:"100%", padding:"14px",
              background:loading?"#2A2A2A":"linear-gradient(135deg, #C9A96E, #B8945A)",
              border:"none", borderRadius:10,
              color:loading?"#555":"#0E0E0E",
              fontSize:12, letterSpacing:"0.2em", textTransform:"uppercase",
              cursor:loading?"not-allowed":"pointer",
              fontFamily:FONT, fontWeight:"bold",
              transition:"opacity 0.2s",
            }}
          >
            {loading ? "Please wait…" : mode==="login" ? "Sign In" : "Send Reset Link"}
          </button>

          {/* Forgot password toggle */}
          <div style={{ textAlign:"center", marginTop:16 }}>
            <button
              onClick={()=>{setMode(m=>m==="login"?"forgot":"login");setError("");setSuccess("");}}
              style={{
                background:"none", border:"none", color:"#555",
                fontSize:12, cursor:"pointer", fontFamily:FONT,
                letterSpacing:"0.05em", textDecoration:"underline",
              }}
            >
              {mode==="login" ? "Forgot password?" : "Back to sign in"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign:"center", marginTop:24, fontSize:10, color:"#333", letterSpacing:"0.1em" }}>
          Mondrian Ibiza · Hyde Ibiza
        </div>
      </div>
    </div>
  );
}
