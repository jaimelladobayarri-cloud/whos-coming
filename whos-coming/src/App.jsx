import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";

const CATEGORIES = [
  { label: "Returning Guest", color: "#C9A96E" },
  { label: "Big Spender",     color: "#4A90A4" },
  { label: "House Guest",     color: "#8B2252" },
  { label: "VIP Agency",      color: "#2C5F5D" },
  { label: "Celebrity",       color: "#7B5EA7" },
  { label: "Corporate",       color: "#3A5A40" },
];
const HOTELS      = ["Mondrian Ibiza", "Hyde Ibiza"];
const RESTAURANTS = ["Niko al Fresco","Sonrojo","Cuyo","Bungalow","Sun n Moon"];
const DAYS        = ["S","M","T","W","T","F","S"];
const MONTHS      = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MS          = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FONT        = "'Georgia', serif";
const BG          = "#0E0E0E";

const COUNTRIES = [
  {flag:"🇦🇫",name:"Afghanistan"},{flag:"🇦🇱",name:"Albania"},{flag:"🇩🇿",name:"Algeria"},{flag:"🇦🇩",name:"Andorra"},{flag:"🇦🇴",name:"Angola"},
  {flag:"🇦🇬",name:"Antigua & Barbuda"},{flag:"🇦🇷",name:"Argentina"},{flag:"🇦🇲",name:"Armenia"},{flag:"🇦🇺",name:"Australia"},{flag:"🇦🇹",name:"Austria"},
  {flag:"🇦🇿",name:"Azerbaijan"},{flag:"🇧🇸",name:"Bahamas"},{flag:"🇧🇭",name:"Bahrain"},{flag:"🇧🇩",name:"Bangladesh"},{flag:"🇧🇧",name:"Barbados"},
  {flag:"🇧🇾",name:"Belarus"},{flag:"🇧🇪",name:"Belgium"},{flag:"🇧🇿",name:"Belize"},{flag:"🇧🇯",name:"Benin"},{flag:"🇧🇹",name:"Bhutan"},
  {flag:"🇧🇴",name:"Bolivia"},{flag:"🇧🇦",name:"Bosnia & Herzegovina"},{flag:"🇧🇼",name:"Botswana"},{flag:"🇧🇷",name:"Brazil"},{flag:"🇧🇳",name:"Brunei"},
  {flag:"🇧🇬",name:"Bulgaria"},{flag:"🇨🇻",name:"Cabo Verde"},{flag:"🇰🇭",name:"Cambodia"},{flag:"🇨🇲",name:"Cameroon"},{flag:"🇨🇦",name:"Canada"},
  {flag:"🇨🇱",name:"Chile"},{flag:"🇨🇳",name:"China"},{flag:"🇨🇴",name:"Colombia"},{flag:"🇨🇷",name:"Costa Rica"},{flag:"🇭🇷",name:"Croatia"},
  {flag:"🇨🇺",name:"Cuba"},{flag:"🇨🇾",name:"Cyprus"},{flag:"🇨🇿",name:"Czech Republic"},{flag:"🇩🇰",name:"Denmark"},{flag:"🇩🇴",name:"Dominican Republic"},
  {flag:"🇪🇨",name:"Ecuador"},{flag:"🇪🇬",name:"Egypt"},{flag:"🇸🇻",name:"El Salvador"},{flag:"🇪🇪",name:"Estonia"},{flag:"🇪🇹",name:"Ethiopia"},
  {flag:"🇫🇯",name:"Fiji"},{flag:"🇫🇮",name:"Finland"},{flag:"🇫🇷",name:"France"},{flag:"🇬🇦",name:"Gabon"},{flag:"🇬🇲",name:"Gambia"},
  {flag:"🇬🇪",name:"Georgia"},{flag:"🇩🇪",name:"Germany"},{flag:"🇬🇭",name:"Ghana"},{flag:"🇬🇷",name:"Greece"},{flag:"🇬🇹",name:"Guatemala"},
  {flag:"🇬🇳",name:"Guinea"},{flag:"🇭🇹",name:"Haiti"},{flag:"🇭🇳",name:"Honduras"},{flag:"🇭🇺",name:"Hungary"},{flag:"🇮🇸",name:"Iceland"},
  {flag:"🇮🇳",name:"India"},{flag:"🇮🇩",name:"Indonesia"},{flag:"🇮🇷",name:"Iran"},{flag:"🇮🇶",name:"Iraq"},{flag:"🇮🇪",name:"Ireland"},
  {flag:"🇮🇱",name:"Israel"},{flag:"🇮🇹",name:"Italy"},{flag:"🇯🇲",name:"Jamaica"},{flag:"🇯🇵",name:"Japan"},{flag:"🇯🇴",name:"Jordan"},
  {flag:"🇰🇿",name:"Kazakhstan"},{flag:"🇰🇪",name:"Kenya"},{flag:"🇰🇼",name:"Kuwait"},{flag:"🇰🇬",name:"Kyrgyzstan"},{flag:"🇱🇦",name:"Laos"},
  {flag:"🇱🇻",name:"Latvia"},{flag:"🇱🇧",name:"Lebanon"},{flag:"🇱🇾",name:"Libya"},{flag:"🇱🇮",name:"Liechtenstein"},{flag:"🇱🇹",name:"Lithuania"},
  {flag:"🇱🇺",name:"Luxembourg"},{flag:"🇲🇬",name:"Madagascar"},{flag:"🇲🇾",name:"Malaysia"},{flag:"🇲🇻",name:"Maldives"},{flag:"🇲🇱",name:"Mali"},
  {flag:"🇲🇹",name:"Malta"},{flag:"🇲🇦",name:"Morocco"},{flag:"🇲🇽",name:"Mexico"},{flag:"🇲🇩",name:"Moldova"},{flag:"🇲🇨",name:"Monaco"},
  {flag:"🇲🇳",name:"Mongolia"},{flag:"🇲🇪",name:"Montenegro"},{flag:"🇲🇿",name:"Mozambique"},{flag:"🇲🇲",name:"Myanmar"},{flag:"🇳🇦",name:"Namibia"},
  {flag:"🇳🇵",name:"Nepal"},{flag:"🇳🇱",name:"Netherlands"},{flag:"🇳🇿",name:"New Zealand"},{flag:"🇳🇮",name:"Nicaragua"},{flag:"🇳🇬",name:"Nigeria"},
  {flag:"🇲🇰",name:"North Macedonia"},{flag:"🇳🇴",name:"Norway"},{flag:"🇴🇲",name:"Oman"},{flag:"🇵🇰",name:"Pakistan"},{flag:"🇵🇦",name:"Panama"},
  {flag:"🇵🇾",name:"Paraguay"},{flag:"🇵🇪",name:"Peru"},{flag:"🇵🇭",name:"Philippines"},{flag:"🇵🇱",name:"Poland"},{flag:"🇵🇹",name:"Portugal"},
  {flag:"🇶🇦",name:"Qatar"},{flag:"🇷🇴",name:"Romania"},{flag:"🇷🇺",name:"Russia"},{flag:"🇷🇼",name:"Rwanda"},{flag:"🇸🇦",name:"Saudi Arabia"},
  {flag:"🇸🇳",name:"Senegal"},{flag:"🇷🇸",name:"Serbia"},{flag:"🇸🇬",name:"Singapore"},{flag:"🇸🇰",name:"Slovakia"},{flag:"🇸🇮",name:"Slovenia"},
  {flag:"🇸🇴",name:"Somalia"},{flag:"🇿🇦",name:"South Africa"},{flag:"🇰🇷",name:"South Korea"},{flag:"🇸🇸",name:"South Sudan"},{flag:"🇪🇸",name:"Spain"},
  {flag:"🇱🇰",name:"Sri Lanka"},{flag:"🇸🇩",name:"Sudan"},{flag:"🇸🇪",name:"Sweden"},{flag:"🇨🇭",name:"Switzerland"},{flag:"🇸🇾",name:"Syria"},
  {flag:"🇹🇼",name:"Taiwan"},{flag:"🇹🇿",name:"Tanzania"},{flag:"🇹🇭",name:"Thailand"},{flag:"🇹🇳",name:"Tunisia"},{flag:"🇹🇷",name:"Turkey"},
  {flag:"🇹🇲",name:"Turkmenistan"},{flag:"🇺🇬",name:"Uganda"},{flag:"🇺🇦",name:"Ukraine"},{flag:"🇦🇪",name:"UAE"},{flag:"🇬🇧",name:"United Kingdom"},
  {flag:"🇺🇸",name:"United States"},{flag:"🇺🇾",name:"Uruguay"},{flag:"🇺🇿",name:"Uzbekistan"},{flag:"🇻🇪",name:"Venezuela"},{flag:"🇻🇳",name:"Vietnam"},
  {flag:"🇾🇪",name:"Yemen"},{flag:"🇿🇲",name:"Zambia"},{flag:"🇿🇼",name:"Zimbabwe"},
];

function CountryPicker({value, onChange}) {
  const [open,   setOpen]   = useState(false);
  const [search, setSearch] = useState("");
  const selected = COUNTRIES.find(c=>c.flag===value);
  const filtered = search ? COUNTRIES.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())) : COUNTRIES;
  return (
    <div style={{position:"relative"}}>
      <button onClick={()=>{setOpen(o=>!o);setSearch("");}} style={{
        width:"100%",display:"flex",alignItems:"center",gap:10,
        background:"#1A1A1A",border:"1px solid #2A2A2A",borderRadius:8,
        padding:"10px 12px",cursor:"pointer",fontFamily:FONT,
      }}>
        <span style={{fontSize:22}}>{selected?selected.flag:"🏳️"}</span>
        <span style={{fontSize:14,color:selected?"#F5F0E8":"#555",flex:1,textAlign:"left"}}>{selected?selected.name:"Select country"}</span>
        <span style={{fontSize:12,color:"#555"}}>▾</span>
      </button>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#1A1A1A",border:"1px solid #333",borderRadius:8,zIndex:200,maxHeight:220,overflowY:"auto"}}>
          <div style={{padding:"8px 10px",borderBottom:"1px solid #222",position:"sticky",top:0,background:"#1A1A1A"}}>
            <input autoFocus placeholder="Search country…" value={search} onChange={e=>setSearch(e.target.value)}
              style={{width:"100%",background:"#111",border:"1px solid #333",color:"#F5F0E8",padding:"7px 10px",fontSize:13,fontFamily:FONT,borderRadius:6,outline:"none",boxSizing:"border-box"}}/>
          </div>
          {filtered.length===0&&<div style={{padding:"12px",fontSize:12,color:"#444",fontStyle:"italic"}}>No results</div>}
          {filtered.map(c=>(
            <button key={c.flag} onClick={()=>{onChange(c.flag);setOpen(false);setSearch("");}} style={{
              width:"100%",display:"flex",alignItems:"center",gap:10,padding:"9px 14px",
              background:value===c.flag?"#C9A96E22":"transparent",border:"none",cursor:"pointer",
              fontFamily:FONT,borderBottom:"1px solid #1E1E1E",
            }}>
              <span style={{fontSize:20}}>{c.flag}</span>
              <span style={{fontSize:13,color:value===c.flag?"#C9A96E":"#CCC"}}>{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const BLANK     = { name:"", nationality:"", category:"Returning Guest", hotel:HOTELS[0], checkIn:"", checkOut:"", checkInTime:"15:00", checkOutTime:"12:00", room:"", companions:"", notes:"" };
const BLANK_RES = { restaurant:RESTAURANTS[0], date:"", time:"21:00", pax:"2", comments:"" };

const VIPS0 = [
  { id:1, name:"Alexandra Fontaine", nationality:"🇫🇷", category:"Returning Guest", categoryColor:"#C9A96E", hotel:"Mondrian Ibiza", checkIn:"2026-04-19", checkOut:"2026-04-23", checkInTime:"15:00", checkOutTime:"12:00", room:"Suite 801",           companions:"Mr. Jean Fontaine",          notes:"10th anniversary. Champagne on arrival, hypoallergenic pillows.", reservations:[] },
  { id:2, name:"Marcus Eldridge",    nationality:"🇬🇧", category:"Big Spender",    categoryColor:"#4A90A4", hotel:"Hyde Ibiza",     checkIn:"2026-04-20", checkOut:"2026-04-22", checkInTime:"18:00", checkOutTime:"11:00", room:"Presidential Suite",  companions:"Assistant + 2 guests",       notes:"Tech CEO. Avg spend 12k EUR. Rooftop buyout for dinner.",       reservations:[] },
  { id:3, name:"Sofia Reyes-Castro", nationality:"🇪🇸", category:"House Guest",    categoryColor:"#8B2252", hotel:"Mondrian Ibiza", checkIn:"2026-04-21", checkOut:"2026-04-25", checkInTime:"14:00", checkOutTime:"13:00", room:"Junior Suite 602",    companions:"Solo",                       notes:"Complimentary stay. 2.4M followers. Do not publicize.",         reservations:[] },
  { id:4, name:"Hiroshi Tanaka",     nationality:"🇯🇵", category:"Returning Guest", categoryColor:"#C9A96E", hotel:"Hyde Ibiza",     checkIn:"2026-04-22", checkOut:"2026-04-28", checkInTime:"20:00", checkOutTime:"12:00", room:"Deluxe Sea View 504", companions:"Wife + 2 children (7&9)",    notes:"4th consecutive April. Welcome amenity for kids.",             reservations:[] },
  { id:5, name:"Valentina Moreau",   nationality:"🇮🇹", category:"VIP Agency",     categoryColor:"#2C5F5D", hotel:"Mondrian Ibiza", checkIn:"2026-04-24", checkOut:"2026-04-26", checkInTime:"16:00", checkOutTime:"10:00", room:"Suite 703",           companions:"Mr. Luca Moreau",            notes:"Quintessentially referral. Vegan, no gluten.",                 reservations:[] },
];

function cd(d)          { return new Date(d.getFullYear(),d.getMonth(),d.getDate()); }
function pd(s)          { const[y,m,d]=s.split("-").map(Number); return new Date(y,m-1,d); }
function sd(a,b)        { return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate(); }
function inR(d,ci,co)   { return d>=pd(ci)&&d<=pd(co); }
function ini(n)         { return n.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase(); }
function fmt(d)         { return `${d.getDate()} ${MS[d.getMonth()]} ${d.getFullYear()}`; }
function ds(d)          { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function dim(y,m)       { return new Date(y,m+1,0).getDate(); }
function fd(y,m)        { return new Date(y,m,1).getDay(); }
function nights(ci,co)  { if(!ci||!co) return "—"; const n=Math.round((pd(co)-pd(ci))/(864e5)); return n>0?`${n} night${n===1?"":"s"}`:"—"; }

// Resize image to max 300px and return base64
function resizeImage(file, maxSize=300) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(maxSize/img.width, maxSize/img.height, 1);
        canvas.width  = Math.round(img.width  * ratio);
        canvas.height = Math.round(img.height * ratio);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function Avatar({vip, size=40, fontSize=12}) {
  if (vip.photo) {
    return <img src={vip.photo} alt={vip.name} style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",flexShrink:0,border:`2px solid ${vip.categoryColor}44`}}/>;
  }
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:vip.categoryColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize,color:"#F5F0E8",flexShrink:0,fontFamily:"'Georgia',serif"}}>
      {vip.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
    </div>
  );
}

export default function App() {
  const today = cd(new Date());

  const [vips,        setVips]        = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [tab,         setTab]         = useState("calendar");
  const [year,        setYear]        = useState(today.getFullYear());
  const [month,       setMonth]       = useState(today.getMonth());
  const [calView,     setCalView]     = useState("month");
  const [anchor,      setAnchor]      = useState(today);
  const [hotel,       setHotel]       = useState("all");
  const [selDay,      setSelDay]      = useState(null);
  const [selVIP,      setSelVIP]      = useState(null);
  const [editMode,    setEditMode]    = useState(false);
  const [editForm,    setEditForm]    = useState({});
  const [editErr,     setEditErr]     = useState({});
  const [addForm,     setAddForm]     = useState(BLANK);
  const [addErr,      setAddErr]      = useState({});
  const [toast,       setToast]       = useState("");
  const [showRes,     setShowRes]     = useState(false);
  const [resForm,     setResForm]     = useState(BLANK_RES);
  const [resErr,      setResErr]      = useState({});
  const [panel,       setPanel]       = useState(null);
  const [showPDF,     setShowPDF]     = useState(false);
  const [pdfFrom,     setPdfFrom]     = useState("");
  const [pdfTo,       setPdfTo]       = useState("");

  // Load VIPs from Supabase on mount
  useEffect(() => {
    const fetchVips = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('vips')
        .select('*')
        .order('check_in', { ascending: true });
      if (error) {
        console.error('Error loading VIPs:', error);
        setVips(VIPS0); // fallback to sample data
      } else if (data && data.length > 0) {
        setVips(data.map(row => ({
          ...row.data,
          id: row.id,
        })));
      } else {
        // First time — seed with sample data
        for (const v of VIPS0) {
          await supabase.from('vips').insert({ id: v.id, check_in: v.checkIn, check_out: v.checkOut, data: v });
        }
        setVips(VIPS0);
      }
      setLoading(false);
    };
    fetchVips();
  }, []);

  // Save a single VIP to Supabase
  const saveVip = async (v) => {
    await supabase.from('vips').upsert({ id: v.id, check_in: v.checkIn, check_out: v.checkOut, data: v });
  };

  // Delete a VIP from Supabase
  const deleteVip = async (id) => {
    await supabase.from('vips').delete().eq('id', id);
  };

  const fv = hotel==="all" ? vips : vips.filter(v=>v.hotel===hotel);

  const DIM = dim(year,month);
  const FD  = fd(year,month);

  const vipsFor = (d) => { const dd=cd(d); return fv.filter(v=>inR(dd,v.checkIn,v.checkOut)); };
  const resFor  = (d) => { const s=ds(d); return fv.flatMap(v=>(v.reservations||[]).filter(r=>r.date===s).map(r=>({...r,vip:v}))).sort((a,b)=>a.time>b.time?1:-1); };

  const activeDay  = selDay ? cd(selDay) : today;
  const isToday2   = sd(activeDay,today);
  const adVIPs     = vipsFor(activeDay);
  const adCI       = adVIPs.filter(v=>sd(activeDay,pd(v.checkIn)));
  const adCO       = adVIPs.filter(v=>sd(activeDay,pd(v.checkOut)));
  const adIH       = adVIPs.filter(v=>{ const ci=pd(v.checkIn),co=pd(v.checkOut); return ci<activeDay&&co>activeDay; });
  const adRes      = resFor(activeDay);

  const nDays    = calView==="week"?7:calView==="15days"?15:DIM;
  const viewDates = calView==="month"
    ? Array.from({length:DIM},(_,i)=>new Date(year,month,i+1))
    : Array.from({length:nDays},(_,i)=>new Date(anchor.getFullYear(),anchor.getMonth(),anchor.getDate()+i));

  const navLabel = () => {
    if(calView==="month") return `${MONTHS[month]} ${year}`;
    const e=viewDates[viewDates.length-1];
    return `${viewDates[0].getDate()} ${MS[viewDates[0].getMonth()]} – ${e.getDate()} ${MS[e.getMonth()]}`;
  };

  const goBack = () => {
    if(calView==="month"){ if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); }
    else { const d=new Date(anchor); d.setDate(d.getDate()-nDays); setAnchor(cd(d)); setYear(d.getFullYear()); setMonth(d.getMonth()); }
  };
  const goNext = () => {
    if(calView==="month"){ if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); }
    else { const d=new Date(anchor); d.setDate(d.getDate()+nDays); setAnchor(cd(d)); setYear(d.getFullYear()); setMonth(d.getMonth()); }
  };

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""),3000); };

  const setAF = (k,v) => { setAddForm(f=>({...f,[k]:v})); setAddErr(e=>({...e,[k]:null})); };
  const handleAdd = async () => {
    const e={};
    if(!addForm.name.trim()) e.name="Required";
    if(!addForm.checkIn)     e.checkIn="Required";
    if(!addForm.checkOut)    e.checkOut="Required";
    if(addForm.checkIn&&addForm.checkOut&&addForm.checkIn>=addForm.checkOut) e.checkOut="Must be after check-in";
    if(!addForm.room.trim()) e.room="Required";
    if(Object.keys(e).length){setAddErr(e);return;}
    const cat=CATEGORIES.find(c=>c.label===addForm.category);
    const newVip={...addForm,id:Date.now(),categoryColor:cat?.color||"#C9A96E",reservations:[]};
    setVips(p=>[...p,newVip]);
    await saveVip(newVip);
    showToast(`${addForm.name} added`);
    setAddForm(BLANK); setAddErr({}); setTab("calendar");
  };

  const setEF = (k,v) => { setEditForm(f=>({...f,[k]:v})); setEditErr(e=>({...e,[k]:null})); };
  const handleUpdate = async () => {
    const e={};
    if(!editForm.name?.trim()) e.name="Required";
    if(!editForm.checkIn)      e.checkIn="Required";
    if(!editForm.checkOut)     e.checkOut="Required";
    if(editForm.checkIn&&editForm.checkOut&&editForm.checkIn>=editForm.checkOut) e.checkOut="Must be after check-in";
    if(!editForm.room?.trim()) e.room="Required";
    if(Object.keys(e).length){setEditErr(e);return;}
    const cat=CATEGORIES.find(c=>c.label===editForm.category);
    const upd={...editForm,categoryColor:cat?.color||editForm.categoryColor};
    setVips(p=>p.map(v=>v.id===upd.id?upd:v));
    setSelVIP(upd); setEditMode(false);
    await saveVip(upd);
    showToast(`${upd.name} updated`);
  };

  const setRF = (k,v) => { setResForm(f=>({...f,[k]:v})); setResErr(e=>({...e,[k]:null})); };
  const handleAddRes = async () => {
    const e={};
    if(!resForm.date) e.date="Required";
    if(Object.keys(e).length){setResErr(e);return;}
    const upd={...selVIP,reservations:[...(selVIP.reservations||[]),{...resForm,id:Date.now()}]};
    setVips(p=>p.map(v=>v.id===upd.id?upd:v));
    setSelVIP(upd); setShowRes(false); setResForm(BLANK_RES);
    await saveVip(upd);
    showToast(`${resForm.restaurant} added`);
  };

  const delRes = async (rid) => {
    const upd={...selVIP,reservations:(selVIP.reservations||[]).filter(r=>r.id!==rid)};
    setVips(p=>p.map(v=>v.id===upd.id?upd:v));
    setSelVIP(upd);
    await saveVip(upd);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await resizeImage(file, 300);
      const upd = {...selVIP, photo: base64};
      setVips(p=>p.map(v=>v.id===upd.id?upd:v));
      setSelVIP(upd);
      await saveVip(upd);
      showToast("Photo updated");
    } catch(err) {
      showToast("Could not load photo");
    }
  };

  const iSt = (err) => ({width:"100%",background:"#1A1A1A",border:`1px solid ${err?"#8B2252":"#2A2A2A"}`,color:"#F5F0E8",padding:"10px 12px",fontSize:15,fontFamily:FONT,boxSizing:"border-box",outline:"none",borderRadius:8});
  const eSt = (err) => ({width:"100%",background:"#1E1E1E",border:`1px solid ${err?"#8B2252":"#333"}`,color:"#F5F0E8",padding:"9px 12px",fontSize:14,fontFamily:FONT,boxSizing:"border-box",outline:"none",borderRadius:7});

  const generatePDF = () => {
    if(!pdfFrom||!pdfTo||pdfFrom>pdfTo) return;
    const from=pd(pdfFrom), to=pd(pdfTo);
    const days=[]; const cur=new Date(from);
    while(cur<=to){ days.push(new Date(cur)); cur.setDate(cur.getDate()+1); }
    const dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Who's Coming</title>
    <style>body{font-family:Georgia,serif;color:#1a1a1a;max-width:800px;margin:0 auto;padding:32px}h1{font-size:28px;font-style:italic}
    .meta{font-size:12px;color:#666;margin-bottom:24px;border-bottom:1px solid #eee;padding-bottom:12px}
    .day{margin-bottom:24px}.dh{font-size:12px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;color:#888;border-bottom:2px solid #1a1a1a;padding-bottom:4px;margin-bottom:10px}
    .vip{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #f0f0f0}
    .av{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:bold;flex-shrink:0}
    .vn{font-size:15px;font-style:italic;margin-bottom:3px}.vm{font-size:11px;color:#666;margin-bottom:2px}
    .ci{display:inline-block;font-size:9px;letter-spacing:.12em;text-transform:uppercase;border:1px solid #C9A96E;padding:1px 6px;border-radius:3px;color:#C9A96E}
    .co{display:inline-block;font-size:9px;letter-spacing:.12em;text-transform:uppercase;border:1px solid #E07A5F;padding:1px 6px;border-radius:3px;color:#E07A5F}
    .ih{display:inline-block;font-size:9px;letter-spacing:.12em;text-transform:uppercase;border:1px solid #4CAF82;padding:1px 6px;border-radius:3px;color:#4CAF82}
    .res{background:#fafaf5;border-left:3px solid #C9A96E;padding:5px 10px;margin:5px 0 0 46px;border-radius:3px;font-size:11px}
    @media print{body{padding:16px}}</style></head><body>
    <h1>Who's Coming?</h1>
    <div class="meta">Period: ${pdfFrom} → ${pdfTo} &nbsp;·&nbsp; Hotel: ${hotel==="all"?"All Hotels":hotel} &nbsp;·&nbsp; Generated: ${fmt(today)}</div>`;

    days.forEach(date=>{
      const dStr=ds(date);
      const dVIPs=fv.filter(v=>inR(date,v.checkIn,v.checkOut));
      const dRes=fv.flatMap(v=>(v.reservations||[]).filter(r=>r.date===dStr).map(r=>({...r,vip:v}))).sort((a,b)=>a.time>b.time?1:-1);
      html+=`<div class="day"><div class="dh">${dayNames[date.getDay()]} ${date.getDate()} ${MS[date.getMonth()]} ${date.getFullYear()}</div>`;
      if(!dVIPs.length&&!dRes.length){ html+=`<div style="font-size:13px;color:#ccc;font-style:italic">No VIP activity</div>`; }
      else {
        dVIPs.forEach(v=>{
          const isCi=dStr===v.checkIn, isCo=dStr===v.checkOut;
          const badge=isCi?'<span class="ci">Check-in</span>':isCo?'<span class="co">Check-out</span>':'<span class="ih">In House</span>';
          const vRes=(v.reservations||[]).filter(r=>r.date===dStr);
          html+=`<div class="vip"><div class="av" style="background:${v.categoryColor}">${ini(v.name)}</div><div style="flex:1">
            <div class="vn">${v.nationality||""} ${v.name}</div>
            <div class="vm">${v.hotel} · ${v.room} · ${nights(v.checkIn,v.checkOut)}</div>
            <div class="vm">CI: ${v.checkIn} ${v.checkInTime} → CO: ${v.checkOut} ${v.checkOutTime}</div>
            ${v.companions?`<div class="vm">With: ${v.companions}</div>`:""}
            ${v.notes?`<div class="vm" style="color:#999;font-style:italic">"${v.notes}"</div>`:""}
            ${badge}
            ${vRes.map(r=>`<div class="res">🍽 <b>${r.restaurant}</b> · ${r.time} · ${r.pax} pax${r.comments?` · <i>"${r.comments}"</i>`:""}</div>`).join("")}
          </div></div>`;
        });
      }
      html+=`</div>`;
    });
    html+=`</body></html>`;
    const w=window.open("","_blank");
    if(w){ w.document.write(html); w.document.close(); setTimeout(()=>w.print(),500); }
    setShowPDF(false);
  };

  const toggleDay = (date) => {
    const d=cd(date);
    setSelDay(prev=>prev&&sd(prev,d)?null:d);
    setPanel(null);
  };

  // ── RENDER ──
  if (loading) return (
    <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:FONT,flexDirection:"column",gap:16}}>
      <div style={{fontSize:24,fontStyle:"italic",color:"#F5F0E8"}}>Who's Coming?</div>
      <div style={{fontSize:12,color:"#555",letterSpacing:"0.2em",textTransform:"uppercase"}}>Loading…</div>
    </div>
  );
  return (
    <div style={{minHeight:"100vh",background:BG,fontFamily:FONT,color:"#F5F0E8",display:"flex",flexDirection:"column"}}>

      {/* HEADER */}
      <div style={{background:BG,padding:"12px 16px 10px",borderBottom:"1px solid #1A1A1A",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <div>
            <div style={{fontSize:20,fontStyle:"italic",letterSpacing:"0.05em"}}>Who's Coming?</div>
            <div style={{fontSize:9,color:"#C9A96E",letterSpacing:"0.2em",textTransform:"uppercase",marginTop:1}}>VIP Intelligence</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:9,color:"#555",letterSpacing:"0.1em",textTransform:"uppercase"}}>Today</div>
            <div style={{fontSize:12,color:"#C9A96E"}}>{fmt(today)}</div>
            {!isToday2&&<>
              <div style={{fontSize:9,color:"#444",letterSpacing:"0.1em",textTransform:"uppercase",marginTop:2}}>Viewing</div>
              <div style={{fontSize:12,color:"#F5F0E8"}}>{fmt(activeDay)}</div>
            </>}
          </div>
        </div>

        {/* Day summary counters */}
        <div style={{background:"#111",borderRadius:10,padding:"7px 10px",marginBottom:8}}>
          <div style={{display:"flex",gap:4,alignItems:"center"}}>
            <div style={{fontSize:9,color:"#333",textTransform:"uppercase",letterSpacing:"0.08em",marginRight:4,flexShrink:0}}>{isToday2?"Today":fmt(activeDay).slice(0,6)}</div>
            {[
              {id:"inhouse",    label:"In House",  val:adIH.length,   color:"#4CAF82"},
              {id:"checkout",   label:"Check-out", val:adCO.length,   color:"#E07A5F"},
              {id:"arriving",   label:"Arriving",  val:adCI.length,   color:"#C9A96E"},
              {id:"restaurants",label:"Dining",    val:adRes.length,  color:"#7B5EA7"},
              {id:"total",      label:"Total",     val:adVIPs.length, color:"#666"},
            ].map((s,i)=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:4,flex:1}}>
                {i>0&&<div style={{width:1,height:24,background:"#222",flexShrink:0}}/>}
                <button onClick={()=>setPanel(panel===s.id?null:s.id)} style={{textAlign:"center",flex:1,background:"none",border:"none",cursor:"pointer",padding:"2px 0",borderRadius:6}}>
                  <div style={{fontSize:7,color:panel===s.id?s.color:s.color+"99",letterSpacing:"0.08em",textTransform:"uppercase"}}>{s.label}</div>
                  <div style={{fontSize:16,color:panel===s.id?s.color:s.val>0?s.color:s.color+"44",lineHeight:1.1}}>{s.val}</div>
                </button>
              </div>
            ))}
            {!isToday2&&<button onClick={()=>{setSelDay(null);setPanel(null);}} style={{background:"none",border:"none",color:"#444",fontSize:14,cursor:"pointer",padding:"0 2px",flexShrink:0}}>✕</button>}
          </div>

          {/* Dropdown panel */}
          {panel&&(()=>{
            const list = panel==="inhouse"?"ih":panel==="checkout"?"co":panel==="arriving"?"ci":panel==="total"?"all":null;
            const pVIPs = list==="ih"?adIH:list==="co"?adCO:list==="ci"?adCI:list==="all"?adVIPs:[];
            const isResPanel = panel==="restaurants";
            return (
              <div style={{marginTop:8,borderTop:"1px solid #1A1A1A",paddingTop:8}}>
                {!isResPanel&&(pVIPs.length===0
                  ?<div style={{fontSize:11,color:"#333",fontStyle:"italic",padding:"4px 0"}}>None</div>
                  :pVIPs.map(v=>(
                    <div key={v.id} onClick={()=>{setSelVIP(v);setEditMode(false);setPanel(null);}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #1A1A1A",cursor:"pointer"}}>
                      <Avatar vip={v} size={30} fontSize={9}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,color:"#E0D9CD",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.nationality} {v.name}</div>
                        <div style={{fontSize:10,color:"#555"}}>{v.room} · {v.hotel}</div>
                      </div>
                      <div style={{fontSize:14,color:"#333"}}>›</div>
                    </div>
                  ))
                )}
                {isResPanel&&(adRes.length===0
                  ?<div style={{fontSize:11,color:"#333",fontStyle:"italic",padding:"4px 0"}}>No restaurant reservations</div>
                  :adRes.map(r=>(
                    <div key={r.id} onClick={()=>{setSelVIP(r.vip);setEditMode(false);setPanel(null);}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #1A1A1A",cursor:"pointer"}}>
                      <div style={{fontSize:20,flexShrink:0}}>🍽</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,color:"#E0D9CD",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.vip.nationality} {r.vip.name}</div>
                        <div style={{fontSize:10,color:"#888"}}>{r.restaurant} · {r.time} · {r.pax} pax</div>
                        {r.comments&&<div style={{fontSize:10,color:"#555",fontStyle:"italic"}}>"{r.comments}"</div>}
                      </div>
                      <div style={{fontSize:14,color:"#333"}}>›</div>
                    </div>
                  ))
                )}
              </div>
            );
          })()}
        </div>

        {/* Hotel filter */}
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {[{id:"all",label:"All"},{id:"Mondrian Ibiza",label:"Mondrian"},{id:"Hyde Ibiza",label:"Hyde"}].map(h=>(
            <button key={h.id} onClick={()=>setHotel(h.id)} style={{padding:"5px 14px",borderRadius:20,border:"none",fontSize:12,fontFamily:FONT,cursor:"pointer",background:hotel===h.id?"#C9A96E":"#1A1A1A",color:hotel===h.id?"#0E0E0E":"#666",fontWeight:hotel===h.id?"bold":"normal"}}>
              {h.label}
            </button>
          ))}
          <button onClick={async ()=>{if(window.confirm("Delete all sample data?")){ await supabase.from('vips').delete().neq('id',0); setVips([]); }}} style={{marginLeft:"auto",padding:"5px 10px",borderRadius:20,border:"1px solid #2A2A2A",fontSize:10,fontFamily:FONT,cursor:"pointer",background:"transparent",color:"#333"}}>Clear samples</button>
        </div>
      </div>

      {/* TOAST */}
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#C9A96E",color:"#0E0E0E",padding:"10px 20px",borderRadius:10,fontSize:13,zIndex:600,fontWeight:"bold",whiteSpace:"nowrap"}}>✓ {toast}</div>}

      {/* CONTENT */}
      <div style={{flex:1,overflowY:"auto",background:BG}}>

        {/* ── CALENDAR ── */}
        {tab==="calendar"&&(
          <div style={{padding:16}}>
            {/* view switcher */}
            <div style={{display:"flex",background:"#111",borderRadius:10,padding:3,marginBottom:12,gap:2}}>
              {[{id:"week",l:"Week"},{id:"15days",l:"15 Days"},{id:"month",l:"Month"}].map(v=>(
                <button key={v.id} onClick={()=>{setCalView(v.id);if(v.id!=="month"){setAnchor(today);setYear(today.getFullYear());setMonth(today.getMonth());}}} style={{flex:1,padding:"8px 4px",borderRadius:8,border:"none",background:calView===v.id?"#C9A96E":"transparent",color:calView===v.id?"#0E0E0E":"#555",fontSize:13,fontFamily:FONT,fontWeight:calView===v.id?"bold":"normal",cursor:"pointer"}}>
                  {v.l}
                </button>
              ))}
            </div>

            {/* nav */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <button onClick={goBack} style={{background:"none",border:"none",color:"#C9A96E",fontSize:26,cursor:"pointer",padding:"4px 12px"}}>‹</button>
              <div style={{fontSize:16,fontStyle:"italic",letterSpacing:"0.05em"}}>{navLabel()}</div>
              <button onClick={goNext} style={{background:"none",border:"none",color:"#C9A96E",fontSize:26,cursor:"pointer",padding:"4px 12px"}}>›</button>
            </div>

            {/* MONTH VIEW */}
            {calView==="month"&&(
              <>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:4}}>
                  {DAYS.map((d,i)=><div key={i} style={{textAlign:"center",fontSize:11,color:"#C9A96E",letterSpacing:"0.1em",padding:"3px 0"}}>{d}</div>)}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
                  {Array.from({length:FD}).map((_,i)=><div key={`e${i}`} style={{minHeight:76}}/>)}
                  {viewDates.map(date=>{
                    const dVIPs=vipsFor(date), dRes=resFor(date);
                    const isTod=sd(date,today), isSel=selDay&&sd(date,selDay);
                    return (
                      <div key={ds(date)} onClick={()=>toggleDay(date)} style={{minHeight:76,background:isSel?"#1A1200":isTod?"#1A1500":"#111",borderRadius:8,padding:"4px 3px",cursor:"pointer",border:isSel?"1px solid #C9A96E":isTod?"1px solid #C9A96E55":"1px solid transparent"}}>
                        <div style={{fontSize:12,color:isSel||isTod?"#C9A96E":"#3A3A3A",textAlign:"center",marginBottom:3,fontWeight:isSel||isTod?"bold":"normal"}}>{date.getDate()}</div>
                        <div style={{display:"flex",flexDirection:"column",gap:2}}>
                          {dVIPs.slice(0,2).map(v=>{
                            const ci=sd(date,pd(v.checkIn)),co=sd(date,pd(v.checkOut));
                            return <div key={v.id} onClick={e=>{e.stopPropagation();setSelVIP(v);setEditMode(false);}} style={{borderRadius:3,background:v.categoryColor+(ci||co?"33":"18"),borderLeft:`2px solid ${v.categoryColor}`,cursor:"pointer",padding:"2px 3px"}}>
                              <div style={{fontSize:8,color:v.categoryColor,lineHeight:1}}>🛏 {ci?"↓":co?"↑":"·"}</div>
                              <div style={{fontSize:8,color:"#D8D0C4",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.name.split(" ")[0]}</div>
                            </div>;
                          })}
                          {dRes.slice(0,1).map(r=>(
                            <div key={r.id} onClick={e=>{e.stopPropagation();setSelVIP(r.vip);setEditMode(false);}} style={{borderRadius:3,background:"#2A2A0A",borderLeft:"2px solid #C9A96E88",cursor:"pointer",padding:"2px 3px"}}>
                              <div style={{fontSize:8,color:"#C9A96E",lineHeight:1}}>🍽 {r.time}</div>
                              <div style={{fontSize:8,color:"#D8D0C4",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.vip.name.split(" ")[0]}</div>
                            </div>
                          ))}
                          {(dVIPs.length+dRes.length)>3&&<div style={{fontSize:8,color:"#C9A96E",textAlign:"center"}}>+{dVIPs.length+dRes.length-3}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* WEEK / 15-DAY VIEW */}
            {(calView==="week"||calView==="15days")&&(
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                {viewDates.map(date=>{
                  const dVIPs=vipsFor(date), dRes=resFor(date);
                  const isTod=sd(date,today), isSel=selDay&&sd(date,selDay);
                  const dn=DAYS[date.getDay()];
                  return (
                    <div key={ds(date)} onClick={()=>toggleDay(date)} style={{display:"flex",gap:10,alignItems:"flex-start",background:isSel?"#1A1200":isTod?"#1A1500":(dVIPs.length||dRes.length)?"#111":"#0D0D0D",borderRadius:10,padding:"10px",cursor:"pointer",border:isSel?"1px solid #C9A96E":isTod?"1px solid #C9A96E44":"1px solid transparent",minHeight:48}}>
                      <div style={{width:38,flexShrink:0,textAlign:"center"}}>
                        <div style={{fontSize:10,color:isSel||isTod?"#C9A96E":"#444",textTransform:"uppercase"}}>{dn}</div>
                        <div style={{fontSize:20,color:isSel||isTod?"#C9A96E":(dVIPs.length||dRes.length)?"#E0D9CD":"#2A2A2A",lineHeight:1.2}}>{date.getDate()}</div>
                        <div style={{fontSize:10,color:"#333"}}>{MS[date.getMonth()]}</div>
                      </div>
                      <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
                        {!dVIPs.length&&!dRes.length&&<div style={{fontSize:12,color:"#252525",paddingTop:4}}>—</div>}
                        {dVIPs.map(v=>{
                          const ci=sd(date,pd(v.checkIn)),co=sd(date,pd(v.checkOut));
                          return <div key={v.id} onClick={e=>{e.stopPropagation();setSelVIP(v);setEditMode(false);}} style={{display:"flex",alignItems:"center",gap:8,background:v.categoryColor+"18",borderLeft:`3px solid ${v.categoryColor}`,borderRadius:6,padding:"7px 10px",cursor:"pointer"}}>
                            <div style={{fontSize:13,color:v.categoryColor,flexShrink:0}}>🛏 {ci?"↓":co?"↑":"·"}</div>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:14,color:"#E0D9CD",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.nationality} {v.name}</div>
                              <div style={{fontSize:11,color:"#555",marginTop:1}}>{ci?`CI ${v.checkInTime}`:co?`CO ${v.checkOutTime}`:"In house"} · {v.room}</div>
                            </div>
                          </div>;
                        })}
                        {dRes.map(r=>(
                          <div key={r.id} onClick={e=>{e.stopPropagation();setSelVIP(r.vip);setEditMode(false);}} style={{display:"flex",alignItems:"center",gap:8,background:"#2A2A0A",borderLeft:"3px solid #C9A96E88",borderRadius:6,padding:"7px 10px",cursor:"pointer"}}>
                            <div style={{fontSize:13,color:"#C9A96E",flexShrink:0}}>🍽</div>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:14,color:"#E0D9CD",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.vip.nationality} {r.vip.name}</div>
                              <div style={{fontSize:11,color:"#888",marginTop:1}}>{r.restaurant} · {r.time} · {r.pax} pax</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Arrivals list */}
            <div style={{marginTop:20}}>
              <div style={{fontSize:10,letterSpacing:"0.2em",color:"#C9A96E",textTransform:"uppercase",marginBottom:10}}>Arrivals · {calView==="month"?MS[month]:`${viewDates[0].getDate()} ${MS[viewDates[0].getMonth()]}–${viewDates[viewDates.length-1].getDate()} ${MS[viewDates[viewDates.length-1].getMonth()]}`}</div>
              {fv.filter(v=>{const d=pd(v.checkIn);return d>=viewDates[0]&&d<=viewDates[viewDates.length-1];}).sort((a,b)=>pd(a.checkIn)-pd(b.checkIn)).map(v=>(
                <div key={v.id} onClick={()=>{setSelVIP(v);setEditMode(false);}} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid #161616",cursor:"pointer"}}>
                  <Avatar vip={v} size={36} fontSize={11}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,color:"#E0D9CD",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.nationality} {v.name}</div>
                    <div style={{fontSize:11,color:"#555",marginTop:2}}>{v.checkIn} → {v.checkOut} · {v.room}</div>
                  </div>
                  <div style={{fontSize:10,color:v.categoryColor,border:`1px solid ${v.categoryColor}44`,padding:"2px 8px",borderRadius:4,flexShrink:0}}>{v.category.split(" ")[0]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LIST ── */}
        {tab==="list"&&(()=>{
          const tds=cd(today);
          const checkingOut  = fv.filter(v=>sd(tds,pd(v.checkOut))&&!sd(tds,pd(v.checkIn)));
          const arrivingNow  = fv.filter(v=>sd(tds,pd(v.checkIn)));
          const inHouseNow   = fv.filter(v=>{ const ci=pd(v.checkIn),co=pd(v.checkOut); return ci<tds&&co>tds; });
          const upcomingList = fv.filter(v=>pd(v.checkIn)>tds).sort((a,b)=>pd(a.checkIn)-pd(b.checkIn));

          const SH=({label,color,count})=>(
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,marginTop:4}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0}}/>
              <div style={{fontSize:11,letterSpacing:"0.2em",color,textTransform:"uppercase"}}>{label}</div>
              <div style={{fontSize:11,color:"#333",marginLeft:"auto"}}>{count}</div>
            </div>
          );
          const Card=({v,accent,sub,badge,badgeColor})=>(
            <div onClick={()=>{setSelVIP(v);setEditMode(false);}} style={{display:"flex",alignItems:"center",gap:12,padding:"12px",background:accent+"0D",borderRadius:10,marginBottom:8,cursor:"pointer",border:`1px solid ${accent}22`,borderLeft:`3px solid ${accent}`}}>
              <Avatar vip={v} size={42} fontSize={12}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}>
                  <div style={{fontSize:15,color:"#F5F0E8",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.nationality} {v.name}</div>
                  {badge&&<div style={{fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",color:badgeColor,border:`1px solid ${badgeColor}`,padding:"1px 6px",borderRadius:4,flexShrink:0}}>{badge}</div>}
                </div>
                <div style={{fontSize:12,color:"#555"}}>{sub}</div>
              </div>
              <div style={{fontSize:18,color:"#333"}}>›</div>
            </div>
          );
          return (
            <div style={{padding:16}}>
              {checkingOut.length>0&&<div style={{marginBottom:20}}><SH label="Checking Out Today" color="#E07A5F" count={checkingOut.length}/>{checkingOut.map(v=><Card key={v.id} v={v} accent="#E07A5F" badge="CO" badgeColor="#E07A5F" sub={`↑ ${v.checkOutTime} · ${v.room} · ${v.hotel}`}/>)}</div>}
              {inHouseNow.length>0&&<div style={{marginBottom:20}}><SH label="In House" color="#4CAF82" count={inHouseNow.length}/>{inHouseNow.map(v=><Card key={v.id} v={v} accent="#4CAF82" sub={`CO: ${v.checkOut} ${v.checkOutTime} · ${v.room} · ${v.hotel}`}/>)}</div>}
              {arrivingNow.length>0&&<div style={{marginBottom:20}}><SH label="Arriving Today" color="#C9A96E" count={arrivingNow.length}/>{arrivingNow.map(v=><Card key={v.id} v={v} accent="#C9A96E" badge="CI" badgeColor="#C9A96E" sub={`↓ ${v.checkInTime} · ${v.room} · ${v.hotel}`}/>)}</div>}
              <div style={{marginBottom:20}}>
                <SH label="Upcoming" color="#555" count={upcomingList.length}/>
                {upcomingList.length===0&&<div style={{fontSize:13,color:"#2A2A2A",fontStyle:"italic",paddingLeft:16}}>No upcoming VIPs</div>}
                {upcomingList.map(v=><Card key={v.id} v={v} accent="#333" sub={`CI: ${v.checkIn} ${v.checkInTime} · ${v.room} · ${v.hotel}`}/>)}
              </div>
            </div>
          );
        })()}

        {/* ── ADD ── */}
        {tab==="add"&&(
          <div style={{padding:"16px 16px 40px"}}>
            <div style={{fontSize:18,fontStyle:"italic",marginBottom:4}}>Add New VIP</div>
            <div style={{fontSize:12,color:"#444",marginBottom:18}}>* Required</div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 72px",gap:10,marginBottom:14}}>
              <div>
                <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Guest Name *</div>
                <input style={iSt(addErr.name)} placeholder="Full name" value={addForm.name} onChange={e=>setAF("name",e.target.value)}/>
                {addErr.name&&<div style={{fontSize:11,color:"#8B2252",marginTop:2}}>{addErr.name}</div>}
              </div>
              <div>
                <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Flag</div>
                <div style={{width:72,height:46,background:"#1A1A1A",border:"1px solid #2A2A2A",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>
                  {COUNTRIES.find(c=>c.flag===addForm.nationality)?.flag||"🏳️"}
                </div>
              </div>
            </div>

            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Nationality</div>
              <CountryPicker value={addForm.nationality} onChange={v=>setAF("nationality",v)}/>
            </div>

            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:7}}>Category *</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {CATEGORIES.map(cat=><button key={cat.label} onClick={()=>setAF("category",cat.label)} style={{padding:"7px 13px",fontSize:12,borderRadius:7,border:`1px solid ${addForm.category===cat.label?cat.color:"#2A2A2A"}`,background:addForm.category===cat.label?cat.color+"22":"transparent",color:addForm.category===cat.label?cat.color:"#555",cursor:"pointer",fontFamily:FONT}}>{cat.label}</button>)}
              </div>
            </div>

            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:7}}>Hotel *</div>
              <div style={{display:"flex",gap:8}}>
                {HOTELS.map(h=><button key={h} onClick={()=>setAF("hotel",h)} style={{flex:1,padding:"10px",fontSize:13,borderRadius:8,border:`1px solid ${addForm.hotel===h?"#C9A96E":"#2A2A2A"}`,background:addForm.hotel===h?"#C9A96E22":"transparent",color:addForm.hotel===h?"#C9A96E":"#555",cursor:"pointer",fontFamily:FONT}}>{h}</button>)}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div>
                <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Check-in *</div>
                <input type="date" style={iSt(addErr.checkIn)} value={addForm.checkIn} onChange={e=>setAF("checkIn",e.target.value)}/>
                {addErr.checkIn&&<div style={{fontSize:11,color:"#8B2252",marginTop:2}}>{addErr.checkIn}</div>}
              </div>
              <div>
                <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Check-out *</div>
                <input type="date" style={iSt(addErr.checkOut)} value={addForm.checkOut} onChange={e=>setAF("checkOut",e.target.value)}/>
                {addErr.checkOut&&<div style={{fontSize:11,color:"#8B2252",marginTop:2}}>{addErr.checkOut}</div>}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div>
                <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>CI Time</div>
                <input type="time" style={iSt(false)} value={addForm.checkInTime} onChange={e=>setAF("checkInTime",e.target.value)}/>
              </div>
              <div>
                <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>CO Time</div>
                <input type="time" style={iSt(false)} value={addForm.checkOutTime} onChange={e=>setAF("checkOutTime",e.target.value)}/>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div>
                <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Room *</div>
                <input style={iSt(addErr.room)} placeholder="Suite 801" value={addForm.room} onChange={e=>setAF("room",e.target.value)}/>
                {addErr.room&&<div style={{fontSize:11,color:"#8B2252",marginTop:2}}>{addErr.room}</div>}
              </div>
              <div>
                <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Companions</div>
                <input style={iSt(false)} placeholder="Solo / Spouse…" value={addForm.companions} onChange={e=>setAF("companions",e.target.value)}/>
              </div>
            </div>

            <div style={{marginBottom:24}}>
              <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Notes & Preferences</div>
              <textarea style={{...iSt(false),height:90,resize:"none",lineHeight:1.6}} placeholder="Preferences, history, special requests…" value={addForm.notes} onChange={e=>setAF("notes",e.target.value)}/>
            </div>

            <button onClick={handleAdd} style={{width:"100%",padding:"14px",background:"#C9A96E",border:"none",color:"#0E0E0E",fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",fontFamily:FONT,fontWeight:"bold",borderRadius:10}}>Save VIP</button>
            <button onClick={()=>{setTab("calendar");setAddForm(BLANK);setAddErr({});}} style={{width:"100%",padding:"12px",background:"none",border:"1px solid #222",color:"#555",fontSize:13,cursor:"pointer",fontFamily:FONT,borderRadius:10,marginTop:8}}>Cancel</button>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{height:72,background:"#0A0A0A",borderTop:"1px solid #1A1A1A",display:"flex",alignItems:"center",justifyContent:"space-around",flexShrink:0,paddingBottom:8}}>
        {[{id:"calendar",icon:"📅",label:"Calendar"},{id:"list",icon:"👤",label:"VIP List"},{id:"add",icon:"＋",label:"Add VIP"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 16px"}}>
            <span style={{fontSize:t.id==="add"?24:22,opacity:tab===t.id?1:0.35}}>{t.icon}</span>
            <span style={{fontSize:10,color:tab===t.id?"#C9A96E":"#444",letterSpacing:"0.1em",textTransform:"uppercase"}}>{t.label}</span>
          </button>
        ))}
        <button onClick={()=>{
          const f=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
          const from=new Date(today); const to=new Date(today); to.setDate(today.getDate()+7);
          setPdfFrom(f(from)); setPdfTo(f(to)); setShowPDF(true);
        }} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 12px"}}>
          <span style={{fontSize:22,opacity:0.6}}>📄</span>
          <span style={{fontSize:10,color:"#444",letterSpacing:"0.1em",textTransform:"uppercase"}}>Export</span>
        </button>
      </div>

      {/* PDF MODAL */}
      {showPDF&&(
        <div onClick={()=>setShowPDF(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:400,background:"#141414",borderRadius:20,padding:"24px 20px",border:"1px solid #2A2A2A",maxHeight:"85vh",overflowY:"auto"}}>
            <div style={{fontSize:18,fontStyle:"italic",marginBottom:4}}>Export PDF</div>
            <div style={{fontSize:12,color:"#555",marginBottom:20}}>Choose the period to include</div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div>
                <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>From</div>
                <input type="date" value={pdfFrom} onChange={e=>setPdfFrom(e.target.value)} style={{width:"100%",background:"#1A1A1A",border:"1px solid #333",color:"#F5F0E8",padding:"10px 12px",fontSize:14,fontFamily:FONT,boxSizing:"border-box",outline:"none",borderRadius:8}}/>
              </div>
              <div>
                <div style={{fontSize:10,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>To</div>
                <input type="date" value={pdfTo} onChange={e=>setPdfTo(e.target.value)} style={{width:"100%",background:"#1A1A1A",border:"1px solid #333",color:"#F5F0E8",padding:"10px 12px",fontSize:14,fontFamily:FONT,boxSizing:"border-box",outline:"none",borderRadius:8}}/>
              </div>
            </div>

            <div style={{fontSize:10,color:"#555",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Quick select</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:20}}>
              {[{label:"Next 7 days",d:7},{label:"Next 15 days",d:15},{label:"Next 30 days",d:30},{label:"This week",d:null}].map(p=>(
                <button key={p.label} onClick={()=>{
                  const f=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
                  if(p.d===null){
                    const mon=new Date(today); mon.setDate(today.getDate()-today.getDay()+1);
                    const sun=new Date(mon); sun.setDate(mon.getDate()+6);
                    setPdfFrom(f(mon)); setPdfTo(f(sun));
                  } else {
                    const from=new Date(today); const to=new Date(today); to.setDate(today.getDate()+p.d);
                    setPdfFrom(f(from)); setPdfTo(f(to));
                  }
                }} style={{padding:"7px 13px",borderRadius:20,border:"1px solid #2A2A2A",background:"#1A1A1A",color:"#888",fontSize:12,cursor:"pointer",fontFamily:FONT}}>
                  {p.label}
                </button>
              ))}
            </div>

            <div style={{fontSize:11,color:"#444",marginBottom:18}}>Hotel: <span style={{color:"#C9A96E"}}>{hotel==="all"?"All Hotels":hotel}</span></div>

            <button onClick={generatePDF} disabled={!pdfFrom||!pdfTo||pdfFrom>pdfTo} style={{width:"100%",padding:"14px",background:(!pdfFrom||!pdfTo||pdfFrom>pdfTo)?"#222":"#C9A96E",border:"none",color:(!pdfFrom||!pdfTo||pdfFrom>pdfTo)?"#444":"#0E0E0E",fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",cursor:(!pdfFrom||!pdfTo||pdfFrom>pdfTo)?"not-allowed":"pointer",fontFamily:FONT,fontWeight:"bold",borderRadius:10,marginBottom:8}}>
              Generate &amp; Print
            </button>
            <button onClick={()=>setShowPDF(false)} style={{width:"100%",padding:"12px",background:"none",border:"1px solid #222",color:"#555",fontSize:13,cursor:"pointer",fontFamily:FONT,borderRadius:10}}>Cancel</button>
          </div>
        </div>
      )}

      {/* VIP DETAIL SHEET */}
      {selVIP&&(
        <div onClick={()=>{setSelVIP(null);setEditMode(false);setShowRes(false);}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:400}}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:600,background:"#141414",borderRadius:"20px 20px 0 0",padding:"20px 24px 40px",border:"1px solid #2A2A2A",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{width:36,height:4,background:"#333",borderRadius:2,margin:"0 auto 16px"}}/>

            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {/* Avatar with photo upload */}
                <label style={{cursor:"pointer",position:"relative",flexShrink:0}}>
                  <Avatar vip={selVIP} size={54} fontSize={14}/>
                  <div style={{position:"absolute",bottom:0,right:0,width:18,height:18,background:"#C9A96E",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#0E0E0E",border:"2px solid #141414"}}>+</div>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={handlePhotoUpload}/>
                </label>
                <div>
                  <div style={{fontSize:17,fontStyle:"italic"}}>{selVIP.nationality} {selVIP.name}</div>
                  <div style={{display:"inline-block",marginTop:4,fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",color:selVIP.categoryColor,border:`1px solid ${selVIP.categoryColor}`,padding:"2px 7px",borderRadius:4}}>{selVIP.category}</div>
                </div>
              </div>
              <button onClick={()=>{setEditMode(!editMode);setEditForm({...selVIP});setEditErr({});}} style={{background:editMode?"#2A2A2A":"#C9A96E22",border:`1px solid ${editMode?"#333":"#C9A96E"}`,color:editMode?"#666":"#C9A96E",padding:"7px 16px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:FONT,letterSpacing:"0.1em"}}>{editMode?"Cancel":"Edit"}</button>
            </div>

            {/* VIEW MODE */}
            {!editMode&&(
              <>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:18}}>
                  {[
                    {l:"Hotel",     v:selVIP.hotel||"—"},
                    {l:"Room",      v:selVIP.room},
                    {l:"Nights",    v:nights(selVIP.checkIn,selVIP.checkOut)},
                    {l:"Companions",v:selVIP.companions||"—"},
                    {l:"Check-in",  v:`${selVIP.checkIn} · ${selVIP.checkInTime}`},
                    {l:"Check-out", v:`${selVIP.checkOut} · ${selVIP.checkOutTime}`},
                  ].map(f=>(
                    <div key={f.l}>
                      <div style={{fontSize:9,letterSpacing:"0.15em",color:"#C9A96E",textTransform:"uppercase",marginBottom:4}}>{f.l}</div>
                      <div style={{fontSize:13,color:"#E0D9CD"}}>{f.v}</div>
                    </div>
                  ))}
                </div>

                {selVIP.notes&&(
                  <div style={{background:"#1A1A1A",borderRadius:10,padding:"12px",borderLeft:`3px solid ${selVIP.categoryColor}`,marginBottom:18}}>
                    <div style={{fontSize:9,letterSpacing:"0.15em",color:"#C9A96E",textTransform:"uppercase",marginBottom:6}}>Notes</div>
                    <p style={{fontSize:13,color:"#888",lineHeight:1.7,margin:0,fontStyle:"italic"}}>"{selVIP.notes}"</p>
                  </div>
                )}

                {/* Restaurant reservations */}
                <div style={{marginBottom:18}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                    <div style={{fontSize:10,letterSpacing:"0.15em",color:"#C9A96E",textTransform:"uppercase"}}>🍽 Restaurant Reservations</div>
                    <button onClick={()=>{setShowRes(!showRes);setResForm({...BLANK_RES,date:selVIP.checkIn});setResErr({});}} style={{background:"#C9A96E22",border:"1px solid #C9A96E",color:"#C9A96E",padding:"5px 12px",borderRadius:6,fontSize:11,cursor:"pointer",fontFamily:FONT}}>{showRes?"Cancel":"+ Add"}</button>
                  </div>

                  {showRes&&(
                    <div style={{background:"#1A1A1A",borderRadius:10,padding:"14px",marginBottom:10,border:"1px solid #2A2A2A"}}>
                      <div style={{marginBottom:10}}>
                        <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>Restaurant</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                          {RESTAURANTS.map(r=><button key={r} onClick={()=>setRF("restaurant",r)} style={{padding:"6px 10px",fontSize:11,borderRadius:6,border:`1px solid ${resForm.restaurant===r?"#C9A96E":"#333"}`,background:resForm.restaurant===r?"#C9A96E22":"transparent",color:resForm.restaurant===r?"#C9A96E":"#555",cursor:"pointer",fontFamily:FONT}}>{r}</button>)}
                        </div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 60px",gap:8,marginBottom:10}}>
                        <div>
                          <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:4}}>Date *</div>
                          <input type="date" style={eSt(resErr.date)} value={resForm.date} min={selVIP.checkIn} max={selVIP.checkOut} onChange={e=>setRF("date",e.target.value)}/>
                          {resErr.date&&<div style={{fontSize:10,color:"#8B2252",marginTop:2}}>{resErr.date}</div>}
                        </div>
                        <div>
                          <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:4}}>Time</div>
                          <input type="time" style={eSt(false)} value={resForm.time} onChange={e=>setRF("time",e.target.value)}/>
                        </div>
                        <div>
                          <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:4}}>Pax</div>
                          <input type="number" min="1" max="20" style={eSt(false)} value={resForm.pax} onChange={e=>setRF("pax",e.target.value)}/>
                        </div>
                      </div>
                      <div style={{marginBottom:10}}>
                        <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:4}}>Comments</div>
                        <textarea style={{...eSt(false),height:55,resize:"none",lineHeight:1.5}} placeholder="Allergies, occasion, special requests…" value={resForm.comments} onChange={e=>setRF("comments",e.target.value)}/>
                      </div>
                      <button onClick={handleAddRes} style={{width:"100%",padding:"11px",background:"#C9A96E",border:"none",color:"#0E0E0E",fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",fontFamily:FONT,fontWeight:"bold",borderRadius:8}}>Save Reservation</button>
                    </div>
                  )}

                  {!(selVIP.reservations||[]).length&&!showRes&&<div style={{fontSize:12,color:"#2A2A2A",fontStyle:"italic"}}>No restaurant reservations yet</div>}
                  {(selVIP.reservations||[]).sort((a,b)=>a.date>b.date?1:-1).map(r=>(
                    <div key={r.id} style={{display:"flex",alignItems:"flex-start",gap:10,background:"#1A1A1A",borderRadius:8,padding:"10px",marginBottom:6,borderLeft:"3px solid #C9A96E55"}}>
                      <div style={{fontSize:18,flexShrink:0}}>🍽</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:14,color:"#E0D9CD",fontWeight:"bold"}}>{r.restaurant}</div>
                        <div style={{fontSize:11,color:"#888",marginTop:2}}>{r.date} · {r.time} · {r.pax} pax</div>
                        {r.comments&&<div style={{fontSize:11,color:"#666",marginTop:3,fontStyle:"italic"}}>"{r.comments}"</div>}
                      </div>
                      <button onClick={()=>delRes(r.id)} style={{background:"none",border:"none",color:"#444",fontSize:18,cursor:"pointer",padding:"0 2px",flexShrink:0}}>×</button>
                    </div>
                  ))}
                </div>

                <button onClick={()=>{setSelVIP(null);setEditMode(false);setShowRes(false);}} style={{width:"100%",padding:"13px",background:"#1A1A1A",border:"1px solid #2A2A2A",color:"#555",fontSize:14,cursor:"pointer",fontFamily:FONT,borderRadius:10}}>Close</button>
              </>
            )}

            {/* EDIT MODE */}
            {editMode&&(
              <div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 66px",gap:8,marginBottom:12}}>
                  <div>
                    <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Name *</div>
                    <input style={eSt(editErr.name)} value={editForm.name||""} onChange={e=>setEF("name",e.target.value)}/>
                    {editErr.name&&<div style={{fontSize:10,color:"#8B2252",marginTop:2}}>{editErr.name}</div>}
                  </div>
                  <div>
                    <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Flag</div>
                    <div style={{width:66,height:44,background:"#1E1E1E",border:"1px solid #333",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>
                      {COUNTRIES.find(c=>c.flag===editForm.nationality)?.flag||"🏳️"}
                    </div>
                  </div>
                </div>

                <div style={{marginBottom:12}}>
                  <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Nationality</div>
                  <CountryPicker value={editForm.nationality||""} onChange={v=>setEF("nationality",v)}/>
                </div>

                <div style={{marginBottom:12}}>
                  <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>Category</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {CATEGORIES.map(cat=><button key={cat.label} onClick={()=>setEF("category",cat.label)} style={{padding:"5px 10px",fontSize:11,borderRadius:6,border:`1px solid ${editForm.category===cat.label?cat.color:"#2A2A2A"}`,background:editForm.category===cat.label?cat.color+"22":"transparent",color:editForm.category===cat.label?cat.color:"#555",cursor:"pointer",fontFamily:FONT}}>{cat.label}</button>)}
                  </div>
                </div>

                <div style={{marginBottom:12}}>
                  <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>Hotel</div>
                  <div style={{display:"flex",gap:7}}>
                    {HOTELS.map(h=><button key={h} onClick={()=>setEF("hotel",h)} style={{flex:1,padding:"9px",fontSize:12,borderRadius:7,border:`1px solid ${editForm.hotel===h?"#C9A96E":"#2A2A2A"}`,background:editForm.hotel===h?"#C9A96E22":"transparent",color:editForm.hotel===h?"#C9A96E":"#555",cursor:"pointer",fontFamily:FONT}}>{h}</button>)}
                  </div>
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                  <div>
                    <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Check-in *</div>
                    <input type="date" style={eSt(editErr.checkIn)} value={editForm.checkIn||""} onChange={e=>setEF("checkIn",e.target.value)}/>
                    {editErr.checkIn&&<div style={{fontSize:10,color:"#8B2252",marginTop:2}}>{editErr.checkIn}</div>}
                  </div>
                  <div>
                    <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Check-out *</div>
                    <input type="date" style={eSt(editErr.checkOut)} value={editForm.checkOut||""} onChange={e=>setEF("checkOut",e.target.value)}/>
                    {editErr.checkOut&&<div style={{fontSize:10,color:"#8B2252",marginTop:2}}>{editErr.checkOut}</div>}
                  </div>
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                  <div>
                    <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>CI Time</div>
                    <input type="time" style={eSt(false)} value={editForm.checkInTime||""} onChange={e=>setEF("checkInTime",e.target.value)}/>
                  </div>
                  <div>
                    <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>CO Time</div>
                    <input type="time" style={eSt(false)} value={editForm.checkOutTime||""} onChange={e=>setEF("checkOutTime",e.target.value)}/>
                  </div>
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                  <div>
                    <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Room *</div>
                    <input style={eSt(editErr.room)} value={editForm.room||""} onChange={e=>setEF("room",e.target.value)}/>
                    {editErr.room&&<div style={{fontSize:10,color:"#8B2252",marginTop:2}}>{editErr.room}</div>}
                  </div>
                  <div>
                    <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Companions</div>
                    <input style={eSt(false)} value={editForm.companions||""} onChange={e=>setEF("companions",e.target.value)}/>
                  </div>
                </div>

                <div style={{marginBottom:16}}>
                  <div style={{fontSize:9,color:"#888",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Notes</div>
                  <textarea style={{...eSt(false),height:80,resize:"none",lineHeight:1.6}} value={editForm.notes||""} onChange={e=>setEF("notes",e.target.value)}/>
                </div>

                <button onClick={handleUpdate} style={{width:"100%",padding:"14px",background:"#C9A96E",border:"none",color:"#0E0E0E",fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",fontFamily:FONT,fontWeight:"bold",borderRadius:10}}>Save Changes</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
