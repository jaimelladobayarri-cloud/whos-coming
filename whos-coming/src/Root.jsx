import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";
import LoginScreen from "./LoginScreen.jsx";
import App from "./App.jsx";

const FONT = "'Georgia', serif";
const BG   = "#0E0E0E";

// Your admin email — change this to your email
const ADMIN_EMAIL = "jaimelladobayarri@gmail.com";

export default function Root() {
  const [session,  setSession]  = useState(null);
  const [profile,  setProfile]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [blocked,  setBlocked]  = useState(false);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadProfile(session.user);
      else setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) loadProfile(session.user);
      else { setProfile(null); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (user) => {
    setLoading(true);

    // Upsert profile
    const role = user.email === ADMIN_EMAIL ? "admin" : "user";
    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email.split("@")[0],
        role,
        last_seen: new Date().toISOString(),
      }, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("Profile error:", error);
      setLoading(false);
      return;
    }

    // Check if user is active
    if (data.active === false) {
      await supabase.auth.signOut();
      setBlocked(true);
      setLoading(false);
      return;
    }

    setProfile(data);
    setLoading(false);
  };

  if (loading) return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FONT, flexDirection:"column", gap:16 }}>
      <div style={{ fontSize:24, fontStyle:"italic", color:"#F5F0E8" }}>Who's Coming?</div>
      <div style={{ fontSize:12, color:"#555", letterSpacing:"0.2em", textTransform:"uppercase" }}>Loading…</div>
    </div>
  );

  if (blocked) return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FONT, flexDirection:"column", gap:16, padding:24 }}>
      <div style={{ fontSize:24, fontStyle:"italic", color:"#F5F0E8", marginBottom:8 }}>Who's Coming?</div>
      <div style={{ background:"#111", borderRadius:16, padding:24, border:"1px solid #2A2A2A", textAlign:"center", maxWidth:320 }}>
        <div style={{ fontSize:20, marginBottom:8 }}>🔒</div>
        <div style={{ fontSize:15, color:"#F5F0E8", marginBottom:8 }}>Access Deactivated</div>
        <div style={{ fontSize:13, color:"#555", lineHeight:1.6 }}>Your access has been deactivated. Please contact the administrator.</div>
      </div>
    </div>
  );

  if (!session) return <LoginScreen onLogin={() => {}} />;

  return <App currentUser={profile} />;
}
