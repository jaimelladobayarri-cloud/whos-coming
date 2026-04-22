import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";

const FONT = "'Georgia', serif";
const BG   = "#0E0E0E";

export default function SettingsScreen({ currentUser, onBack }) {
  const [users,       setUsers]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName,  setInviteName]  = useState("");
  const [invitePassword, setInvitePassword] = useState("");
  const [inviting,    setInviting]    = useState(false);
  const [toast,       setToast]       = useState("");

  const isAdmin = currentUser?.role === "admin";

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""), 3000); };

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*").order("created_at");
    setUsers(data || []);
    setLoading(false);
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim() || !invitePassword.trim()) return;
    setInviting(true);

    // Sign up the new user
    const { data, error } = await supabase.auth.signUp({
      email: inviteEmail.trim(),
      password: invitePassword.trim(),
      options: {
        data: { name: inviteName.trim() || inviteEmail.split("@")[0] },
        emailRedirectTo: window.location.origin,
      }
    });

    if (error) {
      showToast("Error: " + error.message);
      setInviting(false);
      return;
    }

    showToast(`User ${inviteEmail} created`);
    setInviteEmail(""); setInviteName(""); setInvitePassword("");
    setInviting(false);
    setTimeout(fetchUsers, 1000);
  };

  const toggleActive = async (user) => {
    const { error } = await supabase.from("profiles")
      .update({ active: !user.active })
      .eq("id", user.id);
    if (!error) {
      setUsers(prev => prev.map(u => u.id === user.id ? {...u, active: !u.active} : u));
      showToast(user.active ? `${user.name || user.email} deactivated` : `${user.name || user.email} activated`);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const iSt = {
    width:"100%", background:"#1A1A1A", border:"1px solid #2A2A2A",
    color:"#F5F0E8", padding:"11px 14px", fontSize:14, fontFamily:FONT,
    boxSizing:"border-box", outline:"none", borderRadius:8,
  };

  return (
    <div style={{ minHeight:"100vh", background:BG, fontFamily:FONT, color:"#F5F0E8" }}>

      {/* Header */}
      <div style={{ background:BG, padding:"14px 16px", borderBottom:"1px solid #1A1A1A", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:"#C9A96E", fontSize:22, cursor:"pointer", padding:"4px 8px" }}>‹</button>
        <div>
          <div style={{ fontSize:18, fontStyle:"italic" }}>Settings</div>
          <div style={{ fontSize:9, color:"#C9A96E", letterSpacing:"0.2em", textTransform:"uppercase" }}>Who's Coming?</div>
        </div>
      </div>

      {toast&&<div style={{ position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", background:"#C9A96E", color:"#0E0E0E", padding:"10px 20px", borderRadius:10, fontSize:13, zIndex:600, fontWeight:"bold", whiteSpace:"nowrap" }}>✓ {toast}</div>}

      <div style={{ padding:16, maxWidth:600, margin:"0 auto" }}>

        {/* My account */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:10, letterSpacing:"0.2em", color:"#C9A96E", textTransform:"uppercase", marginBottom:12 }}>My Account</div>
          <div style={{ background:"#111", borderRadius:12, padding:16, border:"1px solid #1A1A1A" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:15, color:"#F5F0E8" }}>{currentUser?.name || currentUser?.email}</div>
                <div style={{ fontSize:12, color:"#555", marginTop:3 }}>{currentUser?.email}</div>
                <div style={{ display:"inline-block", marginTop:6, fontSize:9, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C9A96E", border:"1px solid #C9A96E", padding:"2px 8px", borderRadius:4 }}>
                  {currentUser?.role === "admin" ? "Admin" : "User"}
                </div>
              </div>
              <button onClick={handleSignOut} style={{
                background:"none", border:"1px solid #2A2A2A", color:"#555",
                padding:"8px 14px", borderRadius:8, fontSize:11, cursor:"pointer",
                fontFamily:FONT, letterSpacing:"0.1em",
              }}>Sign Out</button>
            </div>
          </div>
        </div>

        {/* Invite user — admin only */}
        {isAdmin && (
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:10, letterSpacing:"0.2em", color:"#C9A96E", textTransform:"uppercase", marginBottom:12 }}>Invite New User</div>
            <div style={{ background:"#111", borderRadius:12, padding:16, border:"1px solid #1A1A1A" }}>
              <div style={{ marginBottom:10 }}>
                <div style={{ fontSize:10, color:"#666", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:5 }}>Name</div>
                <input style={iSt} placeholder="e.g. Rooms Division" value={inviteName} onChange={e=>setInviteName(e.target.value)}/>
              </div>
              <div style={{ marginBottom:10 }}>
                <div style={{ fontSize:10, color:"#666", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:5 }}>Email *</div>
                <input type="email" style={iSt} placeholder="email@hotel.com" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)}/>
              </div>
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:10, color:"#666", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:5 }}>Temporary Password *</div>
                <input type="text" style={iSt} placeholder="They can change it later" value={invitePassword} onChange={e=>setInvitePassword(e.target.value)}/>
              </div>
              <button onClick={handleInvite} disabled={inviting||!inviteEmail.trim()||!invitePassword.trim()} style={{
                width:"100%", padding:"12px", background:inviting||!inviteEmail.trim()||!invitePassword.trim()?"#1A1A1A":"#C9A96E",
                border:"none", color:inviting||!inviteEmail.trim()||!invitePassword.trim()?"#444":"#0E0E0E",
                fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase",
                cursor:inviting||!inviteEmail.trim()||!invitePassword.trim()?"not-allowed":"pointer",
                fontFamily:FONT, fontWeight:"bold", borderRadius:8,
              }}>
                {inviting ? "Creating…" : "Create User"}
              </button>
            </div>
          </div>
        )}

        {/* User list — admin only */}
        {isAdmin && (
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:10, letterSpacing:"0.2em", color:"#C9A96E", textTransform:"uppercase", marginBottom:12 }}>
              Users · {users.length}
            </div>
            {loading && <div style={{ fontSize:13, color:"#333", fontStyle:"italic" }}>Loading…</div>}
            {users.map(u => (
              <div key={u.id} style={{
                display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                background:"#111", borderRadius:10, marginBottom:6,
                border:`1px solid ${u.active?"#1E1E1E":"#2A1A1A"}`,
                opacity: u.active ? 1 : 0.5,
              }}>
                <div style={{
                  width:38, height:38, borderRadius:"50%", flexShrink:0,
                  background: u.active ? "#C9A96E22" : "#2A2A2A",
                  border:`1px solid ${u.active?"#C9A96E44":"#333"}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:13, color: u.active ? "#C9A96E" : "#444",
                }}>
                  {(u.name||u.email||"?")[0].toUpperCase()}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, color: u.active?"#F5F0E8":"#555", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {u.name || u.email}
                  </div>
                  <div style={{ fontSize:11, color:"#444", marginTop:2 }}>
                    {u.email} · {u.role === "admin" ? "Admin" : "User"}
                  </div>
                  {u.last_seen && (
                    <div style={{ fontSize:10, color:"#333", marginTop:1 }}>
                      Last seen: {new Date(u.last_seen).toLocaleDateString("en-GB", {day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}
                    </div>
                  )}
                </div>
                {/* Don't allow deactivating yourself */}
                {u.id !== currentUser?.id && (
                  <button onClick={()=>toggleActive(u)} style={{
                    background:"none", border:`1px solid ${u.active?"#E07A5F44":"#4CAF8244"}`,
                    color: u.active?"#E07A5F":"#4CAF82",
                    padding:"6px 12px", borderRadius:6, fontSize:10,
                    cursor:"pointer", fontFamily:FONT, letterSpacing:"0.1em", flexShrink:0,
                  }}>
                    {u.active ? "Deactivate" : "Activate"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
