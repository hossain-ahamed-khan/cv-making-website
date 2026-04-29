"use client";
import { useState, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface Education {
  id: string;
  field: string;
  institute: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface CVData {
  firstName: string;
  lastName: string;
  age: string;
  titles: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  instagram: string;
  positions: string;
  salary: string;
  availability: string;
  experience: Experience[];
  education: Education[];
  certificates: string[];
  languages: { lang: string; level: string }[];
  photo: string | null;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const initialData: CVData = {
  firstName: "Niels",
  lastName: "",
  age: "23",
  titles: "CDP | Sous JR",
  location: "Amsterdam",
  email: "ovierahaman1@gmail.com",
  phone: "+8801731049538",
  linkedin: "",
  instagram: "",
  positions: "Chef de partie | Sous Jr",
  salary: "€3.000/3.400",
  availability: "Mid November",
  experience: [
    { id: "1", company: "Hotel Okura", title: "Chef de partie", startDate: "11/2024", endDate: "Present", location: "Amsterdam" },
    { id: "2", company: "Restaurant Tante Koosje *", title: "Chef de partie", startDate: "01/2024", endDate: "11/2024", location: "Utrecht" },
    { id: "3", company: "2J Modern Cuisine", title: "Chef de partie", startDate: "08/2023", endDate: "01/2024", location: "Italy" },
    { id: "4", company: "Graphite* by Peter Gast", title: "Chef de partie", startDate: "09/2022", endDate: "07/2023", location: "Amsterdam" },
    { id: "5", company: "Amräth Hotel Lapershoek", title: "Sous Chef", startDate: "09/2021", endDate: "08/2022", location: "Hilversum" },
    { id: "6", company: "De Silveren Spiegel", title: "Commis Chef", startDate: "11/2019", endDate: "08/2021", location: "Amsterdam" },
  ],
  education: [
    { id: "1", field: "Sterklas", institute: "ROC van Amsterdam", startDate: "09/2022", endDate: "09/2024", location: "Amsterdam" },
    { id: "2", field: "Leidinggevende keuken", institute: "Roc van Amsterdam", startDate: "09/2021", endDate: "06/2022", location: "Amsterdam" },
    { id: "3", field: "Basis Kok", institute: "Roc van Amsterdam", startDate: "09/2020", endDate: "09/2021", location: "Amsterdam" },
  ],
  certificates: ["SVH Leermeester", "SVH HACCP", "SVH Sociale Hygiëne", "SVH Wijn diploma", "SVH Gezelmeesterkok", "Patissier certificaat"],
  languages: [
    { lang: "Dutch", level: "Native/Bilingual" },
    { lang: "English", level: "Fluent" },
  ],
  photo: null,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 8);

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 22px",
        background: active ? "#fff5f2" : "#fff",
        border: "1.5px solid",
        borderColor: active ? "#e8623a" : "#ebebeb",
        borderRadius: 14,
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginBottom: 10,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: active ? "#e8623a" : "#2d2d2d" }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        {label}
      </span>
      <span style={{ fontSize: 18, color: active ? "#e8623a" : "#aaa", transform: active ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>⌄</span>
    </button>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#888", letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: "10px 14px",
          border: "1.5px solid #e8e8e8",
          borderRadius: 10,
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          color: "#2d2d2d",
          background: "#fafafa",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#e8623a")}
        onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CVEditor() {
  const [cv, setCV] = useState<CVData>(initialData);
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<string | null>(null);
  const [newCert, setNewCert] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof CVData>(field: K, value: CVData[K]) => setCV((p) => ({ ...p, [field]: value }));

  const updateExp = (id: string, field: keyof Experience, value: string) =>
    update("experience", cv.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const updateEdu = (id: string, field: keyof Education, value: string) =>
    update("education", cv.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update("photo", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const toggle = (s: string) => setActiveSection((p) => (p === s ? "" : s));

  // ── CV Preview ──────────────────────────────────────────────────────────────
  const Preview = () => (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "36px 32px", background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", minHeight: 800 }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24 }}>
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: 80, height: 80, borderRadius: "50%", overflow: "hidden",
            background: "#f0f0f0", flexShrink: 0, cursor: "pointer",
            border: "3px solid #e8623a", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {cv.photo ? (
            <img src={cv.photo} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: 28, color: "#ccc" }}>👤</span>
          )}
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
            {cv.firstName} {cv.lastName}
            {cv.age && <span style={{ fontSize: 13, fontWeight: 400, color: "#888", marginLeft: 10 }}>| {cv.age} Years Old</span>}
          </div>
          <div style={{ fontSize: 14, color: "#555", marginTop: 3 }}>{cv.titles}</div>
          <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>📍 {cv.location}</div>
        </div>
      </div>

      {/* Section divider */}
      {[
        {
          title: "Profile", icon: "👤",
          content: (
            <div style={{ fontSize: 13, color: "#444", lineHeight: 1.8 }}>
              <div><b>Positions:</b> {cv.positions}</div>
              <div><b>Salary indication:</b> {cv.salary}</div>
              <div><b>Availability:</b> {cv.availability}</div>
            </div>
          ),
        },
        {
          title: "Professional Experience", icon: "💼",
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cv.experience.map((e) => (
                <div key={e.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, alignItems: "baseline" }}>
                  <span><b>{e.company}</b>, {e.title}</span>
                  <span style={{ color: "#e8623a", whiteSpace: "nowrap", marginLeft: 8, fontSize: 12 }}>{e.startDate} – {e.endDate} | {e.location}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          title: "Education", icon: "🎓",
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cv.education.map((e) => (
                <div key={e.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, alignItems: "baseline" }}>
                  <span><b>{e.field}</b>, {e.institute}</span>
                  <span style={{ color: "#e8623a", whiteSpace: "nowrap", marginLeft: 8, fontSize: 12 }}>{e.startDate} – {e.endDate} | {e.location}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          title: "Certificates", icon: "🏅",
          content: (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cv.certificates.map((c, i) => (
                <span key={i} style={{ background: "#e8623a", color: "#fff", fontSize: 12, padding: "5px 12px", borderRadius: 20, fontWeight: 600 }}>{c}</span>
              ))}
            </div>
          ),
        },
        {
          title: "Languages", icon: "🌐",
          content: (
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {cv.languages.map((l, i) => (
                <span key={i} style={{ fontSize: 13 }}><b>{l.lang}</b> — {l.level}</span>
              ))}
            </div>
          ),
        },
      ].map(({ title, icon, content }) => (
        <div key={title} style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ flex: 1, height: 1, background: "#f0e6e0" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#e8623a", whiteSpace: "nowrap" }}>{icon} {title}</span>
            <div style={{ flex: 1, height: 1, background: "#f0e6e0" }} />
          </div>
          {content}
        </div>
      ))}
    </div>
  );

  // ── Editor Panels ──────────────────────────────────────────────────────────

  const PersonalPanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "20px 0" }}>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}><Field label="First Name" value={cv.firstName} onChange={(v) => update("firstName", v)} /></div>
        <div style={{ flex: 1 }}><Field label="Last Name" value={cv.lastName} onChange={(v) => update("lastName", v)} /></div>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}><Field label="Age" value={cv.age} onChange={(v) => update("age", v)} placeholder="e.g. 23" /></div>
        <div style={{ flex: 1 }}><Field label="Location" value={cv.location} onChange={(v) => update("location", v)} placeholder="City" /></div>
      </div>
      <Field label="Job Title(s)" value={cv.titles} onChange={(v) => update("titles", v)} placeholder="e.g. CDP | Sous JR" />
      <Field label="Email" value={cv.email} onChange={(v) => update("email", v)} type="email" />
      <Field label="Phone" value={cv.phone} onChange={(v) => update("phone", v)} />
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}><Field label="LinkedIn (optional)" value={cv.linkedin} onChange={(v) => update("linkedin", v)} placeholder="linkedin.com/in/..." /></div>
        <div style={{ flex: 1 }}><Field label="Instagram (optional)" value={cv.instagram} onChange={(v) => update("instagram", v)} placeholder="@username" /></div>
      </div>
      {/* Photo upload */}
      <div>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#888", letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase" }}>Profile Photo</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{ marginTop: 8, padding: "20px", border: "2px dashed #e8e8e8", borderRadius: 12, textAlign: "center", cursor: "pointer", color: "#aaa", fontSize: 13, transition: "border-color 0.2s" }}
          onMouseEnter={(e) => ((e.target as HTMLDivElement).style.borderColor = "#e8623a")}
          onMouseLeave={(e) => ((e.target as HTMLDivElement).style.borderColor = "#e8e8e8")}
        >
          {cv.photo ? "✅ Photo uploaded — click to change" : "📷 Click to upload photo"}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
      </div>
    </div>
  );

  const ProfilePanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "20px 0" }}>
      <Field label="Positions" value={cv.positions} onChange={(v) => update("positions", v)} placeholder="e.g. Chef de partie | Sous Jr" />
      <Field label="Salary Indication" value={cv.salary} onChange={(v) => update("salary", v)} placeholder="e.g. €3.000/3.400" />
      <Field label="Availability" value={cv.availability} onChange={(v) => update("availability", v)} placeholder="e.g. Mid November" />
    </div>
  );

  const ExperiencePanel = () => (
    <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
      {cv.experience.map((exp) => (
        <div key={exp.id} style={{ border: "1.5px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
          <div
            onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", cursor: "pointer", background: expandedExp === exp.id ? "#fff8f6" : "#fff" }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#2d2d2d" }}>{exp.title || "New Role"}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{exp.company} • {exp.startDate} – {exp.endDate}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={(e) => { e.stopPropagation(); update("experience", cv.experience.filter((x) => x.id !== exp.id)); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 16 }}>🗑</button>
              <span style={{ color: "#aaa", transform: expandedExp === exp.id ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.2s", fontSize: 14 }}>⌄</span>
            </div>
          </div>
          {expandedExp === exp.id && (
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 14, borderTop: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}><Field label="Job Title" value={exp.title} onChange={(v) => updateExp(exp.id, "title", v)} /></div>
                <div style={{ flex: 1 }}><Field label="Company" value={exp.company} onChange={(v) => updateExp(exp.id, "company", v)} /></div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}><Field label="Start Date" value={exp.startDate} onChange={(v) => updateExp(exp.id, "startDate", v)} placeholder="MM/YYYY" /></div>
                <div style={{ flex: 1 }}><Field label="End Date" value={exp.endDate} onChange={(v) => updateExp(exp.id, "endDate", v)} placeholder="MM/YYYY or Present" /></div>
                <div style={{ flex: 1 }}><Field label="Location" value={exp.location} onChange={(v) => updateExp(exp.id, "location", v)} /></div>
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => { const id = uid(); update("experience", [...cv.experience, { id, company: "", title: "", startDate: "", endDate: "", location: "" }]); setExpandedExp(id); }}
        style={{ padding: "12px", border: "2px dashed #e8623a", borderRadius: 12, background: "none", color: "#e8623a", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
      >+ Add Experience</button>
    </div>
  );

  const EducationPanel = () => (
    <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
      {cv.education.map((edu) => (
        <div key={edu.id} style={{ border: "1.5px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
          <div
            onClick={() => setExpandedEdu(expandedEdu === edu.id ? null : edu.id)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", cursor: "pointer", background: expandedEdu === edu.id ? "#fff8f6" : "#fff" }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#2d2d2d" }}>{edu.field || "New Education"}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{edu.institute} • {edu.startDate} – {edu.endDate}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={(e) => { e.stopPropagation(); update("education", cv.education.filter((x) => x.id !== edu.id)); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 16 }}>🗑</button>
              <span style={{ color: "#aaa", transform: expandedEdu === edu.id ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.2s", fontSize: 14 }}>⌄</span>
            </div>
          </div>
          {expandedEdu === edu.id && (
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 14, borderTop: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}><Field label="Field of Study" value={edu.field} onChange={(v) => updateEdu(edu.id, "field", v)} /></div>
                <div style={{ flex: 1 }}><Field label="Institute" value={edu.institute} onChange={(v) => updateEdu(edu.id, "institute", v)} /></div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}><Field label="Start Date" value={edu.startDate} onChange={(v) => updateEdu(edu.id, "startDate", v)} placeholder="MM/YYYY" /></div>
                <div style={{ flex: 1 }}><Field label="End Date" value={edu.endDate} onChange={(v) => updateEdu(edu.id, "endDate", v)} placeholder="MM/YYYY" /></div>
                <div style={{ flex: 1 }}><Field label="Location" value={edu.location} onChange={(v) => updateEdu(edu.id, "location", v)} /></div>
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => { const id = uid(); update("education", [...cv.education, { id, field: "", institute: "", startDate: "", endDate: "", location: "" }]); setExpandedEdu(id); }}
        style={{ padding: "12px", border: "2px dashed #e8623a", borderRadius: 12, background: "none", color: "#e8623a", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
      >+ Add Education</button>
    </div>
  );

  const CertPanel = () => (
    <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cv.certificates.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff3f0", border: "1.5px solid #ffd8cc", borderRadius: 20, padding: "5px 12px" }}>
            <span style={{ fontSize: 13, color: "#c94e27", fontWeight: 600 }}>{c}</span>
            <button onClick={() => update("certificates", cv.certificates.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: "#e8623a", fontWeight: 700, fontSize: 15, lineHeight: 1 }}>×</button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={newCert}
          onChange={(e) => setNewCert(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && newCert.trim()) { update("certificates", [...cv.certificates, newCert.trim()]); setNewCert(""); } }}
          placeholder="Add certificate & press Enter"
          style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e8e8e8", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }}
        />
        <button
          onClick={() => { if (newCert.trim()) { update("certificates", [...cv.certificates, newCert.trim()]); setNewCert(""); } }}
          style={{ padding: "10px 18px", background: "#e8623a", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}
        >Add</button>
      </div>
    </div>
  );

  const LangPanel = () => (
    <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
      {cv.languages.map((l, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ flex: 1 }}><Field label="Language" value={l.lang} onChange={(v) => update("languages", cv.languages.map((x, j) => j === i ? { ...x, lang: v } : x))} /></div>
          <div style={{ flex: 1 }}><Field label="Level" value={l.level} onChange={(v) => update("languages", cv.languages.map((x, j) => j === i ? { ...x, level: v } : x))} /></div>
          <button onClick={() => update("languages", cv.languages.filter((_, j) => j !== i))} style={{ marginTop: 20, background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 20 }}>🗑</button>
        </div>
      ))}
      <button
        onClick={() => update("languages", [...cv.languages, { lang: "", level: "" }])}
        style={{ padding: "12px", border: "2px dashed #e8623a", borderRadius: 12, background: "none", color: "#e8623a", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
      >+ Add Language</button>
    </div>
  );

  const sections = [
    { id: "personal", icon: "👤", label: "Personal Details", panel: <PersonalPanel /> },
    { id: "profile", icon: "📋", label: "Profile & Preferences", panel: <ProfilePanel /> },
    { id: "experience", icon: "💼", label: "Professional Experience", panel: <ExperiencePanel /> },
    { id: "education", icon: "🎓", label: "Education", panel: <EducationPanel /> },
    { id: "certificates", icon: "🏅", label: "Certificates & Courses", panel: <CertPanel /> },
    { id: "languages", icon: "🌐", label: "Languages", panel: <LangPanel /> },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f4f2", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`}</style>

      {/* Top Bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #ebebeb", padding: "14px 40px", display: "flex", justifyContent: "flex-end", position: "sticky", top: 0, zIndex: 100 }}>
        <button
          style={{ background: "#e8623a", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8 }}
          onClick={() => window.print()}
        >
          ⬇ Download CV
        </button>
      </div>

      {/* Main Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, padding: "32px 40px", width: "100%" }}>
        {/* Left — Editor */}
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a", marginBottom: 20, letterSpacing: "-0.02em" }}>Edit CV</h1>
          {sections.map(({ id, icon, label, panel }) => (
            <div key={id}>
              <SectionHeader icon={icon} label={label} active={activeSection === id} onClick={() => toggle(id)} />
              {activeSection === id && (
                <div style={{ background: "#fff", border: "1.5px solid #f0f0f0", borderRadius: 14, padding: "0 20px 16px", marginTop: -8, marginBottom: 10, animation: "fadeIn 0.2s ease" }}>
                  {panel}
                  <div style={{ marginTop: 12, textAlign: "right" }}>
                    <button
                      onClick={() => setActiveSection("")}
                      style={{ background: "#e8623a", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                    >✓ Done</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right — Preview */}
        <div style={{ position: "sticky", top: 80, alignSelf: "start" }}>
          <Preview />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        * { box-sizing: border-box; }
        @media print { button { display: none !important; } }
      `}</style>
    </div>
  );
}