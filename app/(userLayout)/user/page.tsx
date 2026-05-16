"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiGlobe,
  FiUser,
  FiUsers,
  FiClipboard,
  FiCamera,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { TbGridDots } from "react-icons/tb";

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

interface Certificate {
  id: string;
  name: string;
  institute: string;
}

interface Language {
  id: string;
  lang: string;
  level: string;
}

interface Reference {
  id: string;
  name: string;
  jobTitle: string;
  organization: string;
  email: string;
  phone: string;
}

interface CVData {
  firstName: string;
  lastName: string;
  dob: string;
  zipcode: string;
  professionalTitle: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  instagram: string;
  photo: string | null;
  // Profile & Preferences
  roles: string[];
  companyTypes: string[];
  niveaus: string[];
  styles: string[];
  cuisineConcepts: string[];
  guestVolume: string;
  teamSize: string;
  contractType: string;
  salaryRange: string;
  availability: string;
  hoursPerWeek: string;
  flexibility: string;
  selectedDays: string[];
  // Sections
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  languages: Language[];
  references: Reference[];
}

// ─── Options ──────────────────────────────────────────────────────────────────

const ROLE_OPTIONS = ["Executive Chef", "Head Chef", "Executive Sous", "Sous Chef", "Chef de parties", "Demi Chef", "Commis Chef", "Trainee", "Pizzaolo", "Sushi Chef", "Breakfast Chef"];
const COMPANY_TYPES = ["Restaurant", "Hotel", "Catering & Events", "Lunchrooms", "Bar/Café", "Beachclub", "Canteen & Corporate", "Open to all"];
const NIVEAU_OPTIONS = ["Fast/Casual", "Casual Dining", "Fine Dining", "Bib Gourmand", "Michelin", "Open to all"];
const STYLE_OPTIONS = ["Modern", "Classic", "Fusion", "French", "Asian", "Mediterranean", "Italian", "Spanish", "Carribean", "Open to all"];
const CUISINE_OPTIONS = ["À la carte", "Fixed menu", "Buffet", "Events/Groups", "Room Service", "Open to all"];
const GUEST_VOLUMES = ["0 - 30", "30 – 50", "50 – 100", "100 - 200", "200+"];
const TEAM_SIZES = ["1 - 3", "4 – 8", "8 - 15", "15+"];
const CONTRACT_TYPES = ["Freelance", "Contract"];
const SALARY_RANGES = ["€2.100 - €2.400", "€2.500 - €2.700", "€2.800 - €3.000", "€3.100 - €3.400", "€3.500 - €3.800", "€3.900 - €4.100", "€4.200 - €4.500", "€4.500 - €4.900", "€5.000+"];
const AVAILABILITY_OPTIONS = ["Immediately", "Notice period"];
const HOURS_OPTIONS = ["32 - 38 hours", "16 - 32 hours", "0 - 16 hours"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const JOB_TITLES = ["Executive Chef", "Head Chef", "Executive Sous Chef", "Sous Chef", "Chef de Parties", "Demi Chef", "Commis Chef", "Trainee", "Pizzaiolo", "Sushi Chef", "Breakfast Chef"];
const LANGUAGE_OPTIONS = ["Dutch", "English", "French", "German", "Spanish", "Italian", "Portuguese", "Arabic", "Mandarin", "Japanese"];
const LANGUAGE_LEVELS = ["Beginner", "Elementary", "Intermediate", "Upper Intermediate", "Advanced", "Fluent", "Native/Bilingual"];

// ─── Initial Data ─────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 8);

const initialData: CVData = {
  firstName: "Niels",
  lastName: "",
  dob: "",
  zipcode: "",
  professionalTitle: "CDP | Sous JR",
  location: "Amsterdam",
  email: "ovierahaman1@gmail.com",
  phone: "+8801731049538",
  linkedin: "",
  instagram: "",
  photo: null,
  roles: ["Executive Chef"],
  companyTypes: ["Catering & Events"],
  niveaus: ["Fast/Casual"],
  styles: ["Modern"],
  cuisineConcepts: ["À la carte"],
  guestVolume: "0 - 30",
  teamSize: "1 - 3",
  contractType: "Freelance",
  salaryRange: "€2.500 - €2.700",
  availability: "Immediately",
  hoursPerWeek: "32 - 38 hours",
  flexibility: "flexible",
  selectedDays: [],
  experience: [
    { id: "1", company: "Hotel Okura", title: "Chef de partie", startDate: "11/2024", endDate: "Present", location: "Amsterdam" },
    { id: "2", company: "Restaurant Tante Koosje *", title: "Chef de partie", startDate: "01/2024", endDate: "11/2024", location: "Utrecht" },
  ],
  education: [
    { id: "1", field: "Sterklas", institute: "ROC van Amsterdam", startDate: "09/2022", endDate: "09/2024", location: "Amsterdam" },
  ],
  certificates: [
    { id: "1", name: "SVH Leermeester", institute: "Creative IT Institute" },
    { id: "2", name: "SVH HACCP", institute: "Creative IT Institute" },
  ],
  languages: [
    { id: "1", lang: "Dutch", level: "Native/Bilingual" },
    { id: "2", lang: "English", level: "Fluent" },
  ],
  references: [],
};

// ─── Shared UI ────────────────────────────────────────────────────────────────

const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white outline-none focus:border-[#e8623a] focus:ring-2 focus:ring-[#e8623a]/10 transition placeholder:text-gray-400";
const labelCls = "block text-sm text-gray-500 mb-1.5 font-medium";

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} appearance-none pr-10 cursor-pointer`}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function ChipGroup({ label, options, selected, multi = false, onToggle }: { label: string; options: string[]; selected: string | string[]; multi?: boolean; onToggle: (v: string) => void }) {
  const isSelected = (o: string) => Array.isArray(selected) ? selected.includes(o) : selected === o;
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <div className="flex flex-wrap gap-2 mt-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${isSelected(o) ? "bg-[#e8623a] text-white border-[#e8623a]" : "bg-white text-gray-700 border-gray-200 hover:border-[#e8623a]/40"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function DoneButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
      <button onClick={onClick} className="px-6 py-2.5 bg-[#e8623a] text-white rounded-xl text-sm font-semibold hover:bg-[#d4562f] transition cursor-pointer">Done</button>
    </div>
  );
}

function SectionCard({ icon, label, active, onClick, children }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void; children?: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border transition-all ${active ? "bg-orange-50 border-[#e8623a]/30" : "bg-white border-gray-200"}`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <span className={`flex items-center gap-3 text-sm font-semibold ${active ? "text-[#e8623a]" : "text-gray-700"}`}>
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${active ? "bg-[#e8623a]/10 text-[#e8623a]" : "bg-gray-100 text-gray-500"}`}>{icon}</span>
          {label}
        </span>
        {active ? <FiChevronUp className="text-[#e8623a]" /> : <FiChevronDown className="text-gray-400" />}
      </button>
      {active && (
        <div className="bg-white border-t border-[#e8623a]/10 rounded-b-2xl px-5 pb-5">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Section Panels ───────────────────────────────────────────────────────────

type UpdateCV = <K extends keyof CVData>(field: K, value: CVData[K]) => void;

function PersonalPanel({ cv, update, fileInputRef, handlePhoto, onDone }: { cv: CVData; update: UpdateCV; fileInputRef: React.RefObject<HTMLInputElement | null>; handlePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void; onDone: () => void }) {
  return (
    <div className="pt-5 flex flex-col gap-4">
      {/* Name + Photo row */}
      <div className="flex gap-4 items-start">
        <div className="flex-1 flex flex-col gap-4">
          <Field label="First Name" value={cv.firstName} onChange={(v) => update("firstName", v)} placeholder="Enter your Title, first - and last name" />
          <Field label="Professional title" value={cv.professionalTitle} onChange={(v) => update("professionalTitle", v)} placeholder="Target position or current role" />
        </div>
        {/* Photo Upload */}
        <div className="flex-shrink-0 mt-1">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#e8623a] transition-colors overflow-hidden bg-gray-50"
          >
            {cv.photo ? (
              <Image src={cv.photo} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1 text-gray-400">
                <FiCamera className="text-xl" />
                <span className="text-[10px] font-semibold tracking-wide uppercase">Upload Photo</span>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
        </div>
      </div>
      {/* DOB */}
      <Field label="Date of Birth" value={cv.dob} onChange={(v) => update("dob", v)} placeholder="MM/YY" type="text" />
      {/* Zipcode + Location */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Zipcode" value={cv.zipcode} onChange={(v) => update("zipcode", v)} placeholder="Zip Code" />
        <Field label="Location" value={cv.location} onChange={(v) => update("location", v)} placeholder="City, Country" />
      </div>
      <Field label="Email" value={cv.email} onChange={(v) => update("email", v)} type="email" placeholder="Enter email" />
      <Field label="Phone Number" value={cv.phone} onChange={(v) => update("phone", v)} placeholder="Enter phone number" />
      <Field label="LinkedIn URL (Optional)" value={cv.linkedin} onChange={(v) => update("linkedin", v)} placeholder="Enter LinkedIn" />
      <Field label="Instagram URL (Optional)" value={cv.instagram} onChange={(v) => update("instagram", v)} placeholder="Enter Instagram" />
      <DoneButton onClick={onDone} />
    </div>
  );
}

function ProfilePanel({ cv, update, onDone }: { cv: CVData; update: UpdateCV; onDone: () => void }) {
  const toggle = (field: keyof CVData, val: string) => {
    const cur = cv[field] as string[];
    update(field, cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val]);
  };

  return (
    <div className="pt-5 flex flex-col gap-5">
      <ChipGroup label="Role/Position" options={ROLE_OPTIONS} selected={cv.roles} multi onToggle={(v) => toggle("roles", v)} />
      <ChipGroup label="Company Type" options={COMPANY_TYPES} selected={cv.companyTypes} multi onToggle={(v) => toggle("companyTypes", v)} />
      <ChipGroup label="Niveau" options={NIVEAU_OPTIONS} selected={cv.niveaus} multi onToggle={(v) => toggle("niveaus", v)} />
      <ChipGroup label="Style" options={STYLE_OPTIONS} selected={cv.styles} multi onToggle={(v) => toggle("styles", v)} />
      <ChipGroup label="Cuisine Concept" options={CUISINE_OPTIONS} selected={cv.cuisineConcepts} multi onToggle={(v) => toggle("cuisineConcepts", v)} />
      <ChipGroup label="What guest volume do you prefer?" options={GUEST_VOLUMES} selected={cv.guestVolume} onToggle={(v) => update("guestVolume", v)} />
      <ChipGroup label="Preferred team size" options={TEAM_SIZES} selected={cv.teamSize} onToggle={(v) => update("teamSize", v)} />
      <ChipGroup label="Contract Type" options={CONTRACT_TYPES} selected={cv.contractType} onToggle={(v) => update("contractType", v)} />

      {/* Salary */}
      <div>
        <p className={labelCls}>Salary indication <span className="text-xs text-gray-400">(Based on bruto fulltime per month)</span></p>
        <div className="flex flex-wrap gap-2 mt-1">
          {SALARY_RANGES.map((r) => (
            <button key={r} onClick={() => update("salaryRange", r)}
              className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${cv.salaryRange === r ? "bg-[#e8623a] text-white border-[#e8623a]" : "bg-white text-gray-700 border-gray-200 hover:border-[#e8623a]/40"}`}>{r}</button>
          ))}
        </div>
      </div>

      <ChipGroup label="Availability" options={AVAILABILITY_OPTIONS} selected={cv.availability} onToggle={(v) => update("availability", v)} />
      <ChipGroup label="How many hours do you want to work?" options={HOURS_OPTIONS} selected={cv.hoursPerWeek} onToggle={(v) => update("hoursPerWeek", v)} />

      {/* Flexibility */}
      <div>
        <p className={labelCls}>Flexibility (multiple answers)</p>
        <div className="flex flex-col gap-3 mt-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="flex" checked={cv.flexibility === "flexible"} onChange={() => update("flexibility", "flexible")} className="w-4 h-4 accent-[#e8623a]" />
            <span className="text-sm text-gray-700">I am Flexible</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="flex" checked={cv.flexibility === "days"} onChange={() => update("flexibility", "days")} className="w-4 h-4 accent-[#e8623a]" />
            <span className="text-sm text-gray-700">Select Days</span>
          </label>
          {cv.flexibility === "days" && (
            <div className="ml-7 grid grid-cols-2 gap-2">
              {DAYS.map((d) => (
                <label key={d} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cv.selectedDays.includes(d)}
                    onChange={() => {
                      const cur = cv.selectedDays;
                      update("selectedDays", cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]);
                    }}
                    className="w-4 h-4 rounded accent-[#e8623a]"
                  />
                  <span className="text-sm text-gray-700">{d}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <DoneButton onClick={onDone} />
    </div>
  );
}

function CardList<T extends { id: string }>({
  items,
  expanded,
  setExpanded,
  onDelete,
  onAdd,
  addLabel,
  getTitle,
  getSub,
  renderForm,
}: {
  items: T[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  addLabel: string;
  getTitle: (item: T) => string;
  getSub: (item: T) => string;
  renderForm: (item: T) => React.ReactNode;
}) {
  return (
    <div className="pt-4 flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-2xl overflow-hidden">
          <div
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors ${expanded === item.id ? "bg-orange-50/50" : "bg-white hover:bg-gray-50"}`}
          >
            <TbGridDots className="text-gray-300 text-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-800 truncate">{getTitle(item) || "Untitled"}</div>
              <div className="text-xs text-gray-400 mt-0.5 truncate">{getSub(item)}</div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-400 transition cursor-pointer text-gray-400">
              <FiTrash2 className="text-sm" />
            </button>
            {expanded === item.id ? <FiChevronUp className="text-[#e8623a] text-sm" /> : <FiChevronDown className="text-gray-400 text-sm" />}
          </div>
          {expanded === item.id && (
            <div className="border-t border-gray-100 px-4 pt-4 pb-3 flex flex-col gap-3 bg-white">
              {renderForm(item)}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 py-3.5 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-500 font-medium hover:border-[#e8623a]/40 hover:text-[#e8623a] transition cursor-pointer"
      >
        <FiPlus /> {addLabel}
      </button>
    </div>
  );
}

function ExperiencePanel({ cv, update, onDone }: { cv: CVData; update: UpdateCV; onDone: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const updateExp = (id: string, field: keyof Experience, value: string) =>
    update("experience", cv.experience.map((e) => e.id === id ? { ...e, [field]: value } : e));

  return (
    <>
      <CardList
        items={cv.experience}
        expanded={expanded}
        setExpanded={setExpanded}
        onDelete={(id) => update("experience", cv.experience.filter((e) => e.id !== id))}
        onAdd={() => { const id = uid(); update("experience", [...cv.experience, { id, company: "", title: "", startDate: "", endDate: "", location: "" }]); setExpanded(id); }}
        addLabel="Add Entry"
        getTitle={(e) => e.title}
        getSub={(e) => `${e.company}${e.startDate ? ` • ${e.startDate} - ${e.endDate || "Present"}` : ""}`}
        renderForm={(exp) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <SelectField label="Job Title" value={exp.title} onChange={(v) => updateExp(exp.id, "title", v)} options={JOB_TITLES} placeholder="Chef de Parties" />
              <Field label="Company" value={exp.company} onChange={(v) => updateExp(exp.id, "company", v)} placeholder="Company Name" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Start Date</label>
                <div className="relative">
                  <input value={exp.startDate} onChange={(e) => updateExp(exp.id, "startDate", e.target.value)} placeholder="MM/YY" className={`${inputCls} pr-8`} />
                  {exp.startDate && <button onClick={() => updateExp(exp.id, "startDate", "")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><FiX className="text-xs" /></button>}
                </div>
              </div>
              <div>
                <label className={labelCls}>End Date</label>
                <div className="relative">
                  <input value={exp.endDate} onChange={(e) => updateExp(exp.id, "endDate", e.target.value)} placeholder="MM/YY" className={`${inputCls} pr-8`} />
                  {exp.endDate && <button onClick={() => updateExp(exp.id, "endDate", "")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><FiX className="text-xs" /></button>}
                </div>
              </div>
              <div>
                <label className={labelCls}>Location</label>
                <div className="relative">
                  <input value={exp.location} onChange={(e) => updateExp(exp.id, "location", e.target.value)} placeholder="City, Country" className={`${inputCls} pr-8`} />
                  {exp.location && <button onClick={() => updateExp(exp.id, "location", "")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><FiX className="text-xs" /></button>}
                </div>
              </div>
            </div>
          </>
        )}
      />
      <DoneButton onClick={onDone} />
    </>
  );
}

function EducationPanel({ cv, update, onDone }: { cv: CVData; update: UpdateCV; onDone: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const updateEdu = (id: string, field: keyof Education, value: string) =>
    update("education", cv.education.map((e) => e.id === id ? { ...e, [field]: value } : e));

  return (
    <>
      <CardList
        items={cv.education}
        expanded={expanded}
        setExpanded={setExpanded}
        onDelete={(id) => update("education", cv.education.filter((e) => e.id !== id))}
        onAdd={() => { const id = uid(); update("education", [...cv.education, { id, field: "", institute: "", startDate: "", endDate: "", location: "" }]); setExpanded(id); }}
        addLabel="Add Entry"
        getTitle={(e) => e.institute || e.field}
        getSub={(e) => `${e.field}${e.startDate ? ` • ${e.startDate} - ${e.endDate}` : ""}`}
        renderForm={(edu) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Degree" value={edu.field} onChange={(v) => updateEdu(edu.id, "field", v)} placeholder="Enter Degree / field of study" />
              <Field label="School" value={edu.institute} onChange={(v) => updateEdu(edu.id, "institute", v)} placeholder="Enter school / university" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Start Date</label>
                <div className="relative">
                  <input value={edu.startDate} onChange={(e) => updateEdu(edu.id, "startDate", e.target.value)} placeholder="MM/YY" className={`${inputCls} pr-8`} />
                  {edu.startDate && <button onClick={() => updateEdu(edu.id, "startDate", "")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"><FiX className="text-xs" /></button>}
                </div>
              </div>
              <div>
                <label className={labelCls}>End Date</label>
                <div className="relative">
                  <input value={edu.endDate} onChange={(e) => updateEdu(edu.id, "endDate", e.target.value)} placeholder="MM/YY" className={`${inputCls} pr-8`} />
                  {edu.endDate && <button onClick={() => updateEdu(edu.id, "endDate", "")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"><FiX className="text-xs" /></button>}
                </div>
              </div>
              <div>
                <label className={labelCls}>Location</label>
                <div className="relative">
                  <input value={edu.location} onChange={(e) => updateEdu(edu.id, "location", e.target.value)} placeholder="City, Country" className={`${inputCls} pr-8`} />
                  {edu.location && <button onClick={() => updateEdu(edu.id, "location", "")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"><FiX className="text-xs" /></button>}
                </div>
              </div>
            </div>
          </>
        )}
      />
      <DoneButton onClick={onDone} />
    </>
  );
}

function CertPanel({ cv, update, onDone }: { cv: CVData; update: UpdateCV; onDone: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const updateCert = (id: string, field: keyof Certificate, value: string) =>
    update("certificates", cv.certificates.map((c) => c.id === id ? { ...c, [field]: value } : c));

  return (
    <>
      <CardList
        items={cv.certificates}
        expanded={expanded}
        setExpanded={setExpanded}
        onDelete={(id) => update("certificates", cv.certificates.filter((c) => c.id !== id))}
        onAdd={() => { const id = uid(); update("certificates", [...cv.certificates, { id, name: "", institute: "" }]); setExpanded(id); }}
        addLabel="Add Entry"
        getTitle={(c) => c.name}
        getSub={(c) => c.institute}
        renderForm={(cert) => (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Certificate/Course" value={cert.name} onChange={(v) => updateCert(cert.id, "name", v)} placeholder="Enter Certificates" />
            <Field label="Institute" value={cert.institute} onChange={(v) => updateCert(cert.id, "institute", v)} placeholder="Enter institute name" />
          </div>
        )}
      />
      <DoneButton onClick={onDone} />
    </>
  );
}

function LangPanel({ cv, update, onDone }: { cv: CVData; update: UpdateCV; onDone: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const updateLang = (id: string, field: keyof Language, value: string) =>
    update("languages", cv.languages.map((l) => l.id === id ? { ...l, [field]: value } : l));

  return (
    <>
      <CardList
        items={cv.languages}
        expanded={expanded}
        setExpanded={setExpanded}
        onDelete={(id) => update("languages", cv.languages.filter((l) => l.id !== id))}
        onAdd={() => { const id = uid(); update("languages", [...cv.languages, { id, lang: "", level: "" }]); setExpanded(id); }}
        addLabel="Add Entry"
        getTitle={(l) => l.lang}
        getSub={(l) => l.level}
        renderForm={(lang) => (
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Language" value={lang.lang} onChange={(v) => updateLang(lang.id, "lang", v)} options={LANGUAGE_OPTIONS} placeholder="Enter Language" />
            <SelectField label="Level" value={lang.level} onChange={(v) => updateLang(lang.id, "level", v)} options={LANGUAGE_LEVELS} placeholder="Select Language Level" />
          </div>
        )}
      />
      <DoneButton onClick={onDone} />
    </>
  );
}

function ReferencesPanel({ cv, update, onDone }: { cv: CVData; update: UpdateCV; onDone: () => void }) {
  const updateRef = (id: string, field: keyof Reference, value: string) =>
    update("references", cv.references.map((r) => r.id === id ? { ...r, [field]: value } : r));

  // References panel shows all as always-expanded form style (as per design image 11)
  return (
    <div className="pt-4 flex flex-col gap-4">
      {cv.references.map((ref) => (
        <div key={ref.id} className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">{ref.name || "Reference"}</span>
            <button onClick={() => update("references", cv.references.filter((r) => r.id !== ref.id))} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-400 transition cursor-pointer text-gray-400">
              <FiTrash2 className="text-sm" />
            </button>
          </div>
          <Field label="Name" value={ref.name} onChange={(v) => updateRef(ref.id, "name", v)} placeholder="Enter the full name" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Job Title" value={ref.jobTitle} onChange={(v) => updateRef(ref.id, "jobTitle", v)} placeholder="Enter job title" />
            <Field label="Organization" value={ref.organization} onChange={(v) => updateRef(ref.id, "organization", v)} placeholder="Enter organization" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email" value={ref.email} onChange={(v) => updateRef(ref.id, "email", v)} placeholder="Enter email" type="email" />
            <Field label="Phone Number" value={ref.phone} onChange={(v) => updateRef(ref.id, "phone", v)} placeholder="Enter phone number" />
          </div>
        </div>
      ))}
      {/* Add References button (matches design image 11) */}
      <button
        onClick={() => update("references", [...cv.references, { id: uid(), name: "", jobTitle: "", organization: "", email: "", phone: "" }])}
        className="flex items-center justify-center gap-2 py-3.5 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-500 font-medium hover:border-[#e8623a]/40 hover:text-[#e8623a] transition cursor-pointer"
      >
        <FiPlus /> Add References
      </button>
      <DoneButton onClick={onDone} />
    </div>
  );
}

// ─── CV Preview ───────────────────────────────────────────────────────────────

function Preview({ cv, fileInputRef }: { cv: CVData; fileInputRef: React.RefObject<HTMLInputElement | null> }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 min-h-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex gap-5 items-center mb-7">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer flex items-center justify-center"
        >
          {cv.photo ? <Image src={cv.photo} alt="profile" className="w-full h-full object-cover" /> : <span className="text-3xl text-gray-300">👤</span>}
        </div>
        <div>
          <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {cv.firstName} {cv.lastName}
            {cv.dob && <span className="text-sm font-normal text-gray-400 ml-2">| {cv.dob}</span>}
          </div>
          <div className="text-sm text-gray-500 mt-0.5">{cv.professionalTitle}</div>
          <div className="text-xs text-gray-400 mt-1">📍 {cv.location}</div>
        </div>
      </div>

      {[
        {
          title: "Profile", icon: <FiClipboard />,
          content: (
            <div className="text-sm text-gray-600 space-y-1">
              {cv.roles.length > 0 && <div><b>Positions:</b> {cv.roles.join(" | ")}</div>}
              {cv.salaryRange && <div><b>Salary:</b> {cv.salaryRange} / month</div>}
              {cv.availability && <div><b>Availability:</b> {cv.availability}</div>}
            </div>
          ),
        },
        {
          title: "Professional Experience", icon: <FiBriefcase />,
          content: (
            <div className="flex flex-col gap-2">
              {cv.experience.map((e) => (
                <div key={e.id} className="flex justify-between text-sm items-baseline">
                  <span><b>{e.company}</b>, {e.title}</span>
                  <span className="text-[#e8623a] whitespace-nowrap ml-2 text-xs">{e.startDate} – {e.endDate} | {e.location}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          title: "Education", icon: <FiBookOpen />,
          content: (
            <div className="flex flex-col gap-2">
              {cv.education.map((e) => (
                <div key={e.id} className="flex justify-between text-sm items-baseline">
                  <span><b>{e.field}</b>, {e.institute}</span>
                  <span className="text-[#e8623a] whitespace-nowrap ml-2 text-xs">{e.startDate} – {e.endDate} | {e.location}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          title: "Certificates", icon: <FiAward />,
          content: (
            <div className="flex flex-wrap gap-2">
              {cv.certificates.map((c) => (
                <span key={c.id} className="bg-[#e8623a] text-white text-xs px-3 py-1 rounded-full font-semibold">{c.name}</span>
              ))}
            </div>
          ),
        },
        {
          title: "Languages", icon: <FiGlobe />,
          content: (
            <div className="flex gap-6 flex-wrap">
              {cv.languages.map((l) => (
                <span key={l.id} className="text-sm"><b>{l.lang}</b> — {l.level}</span>
              ))}
            </div>
          ),
        },
        ...(cv.references.length > 0 ? [{
          title: "References", icon: <FiUsers />,
          content: (
            <div className="flex flex-col gap-2">
              {cv.references.map((r) => (
                <div key={r.id} className="text-sm">
                  <b>{r.name}</b>{r.jobTitle ? `, ${r.jobTitle}` : ""}{r.organization ? ` @ ${r.organization}` : ""}
                </div>
              ))}
            </div>
          ),
        }] : []),
      ].map(({ title, icon, content }) => (
        <div key={title} className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-orange-100" />
            <span className="text-xs font-bold text-[#e8623a] whitespace-nowrap flex items-center gap-1.5">
              <span className="text-sm">{icon}</span>{title}
            </span>
            <div className="flex-1 h-px bg-orange-100" />
          </div>
          {content}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CVEditor() {
  const [cv, setCV] = useState<CVData>(initialData);
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof CVData>(field: K, value: CVData[K]) => setCV((p) => ({ ...p, [field]: value }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update("photo", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const toggle = (s: string) => setActiveSection((p) => (p === s ? "" : s));
  const closeSection = () => setActiveSection("");

  const sections = [
    {
      id: "personal", icon: <FiUser />, label: "Personal Details",
      panel: <PersonalPanel cv={cv} update={update} fileInputRef={fileInputRef} handlePhoto={handlePhoto} onDone={closeSection} />,
    },
    {
      id: "profile", icon: <FiClipboard />, label: "Profile & Preferences",
      panel: <ProfilePanel cv={cv} update={update} onDone={closeSection} />,
    },
    {
      id: "experience", icon: <FiBriefcase />, label: "Professional Experience",
      panel: <ExperiencePanel cv={cv} update={update} onDone={closeSection} />,
    },
    {
      id: "education", icon: <FiBookOpen />, label: "Education",
      panel: <EducationPanel cv={cv} update={update} onDone={closeSection} />,
    },
    {
      id: "certificates", icon: <FiAward />, label: "Certificates & Courses",
      panel: <CertPanel cv={cv} update={update} onDone={closeSection} />,
    },
    {
      id: "languages", icon: <FiGlobe />, label: "Language",
      panel: <LangPanel cv={cv} update={update} onDone={closeSection} />,
    },
    {
      id: "references", icon: <FiUsers />, label: "References",
      panel: <ReferencesPanel cv={cv} update={update} onDone={closeSection} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f4f2]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

        /* Allow pinch-zoom and touch pan on mobile */
        .mobile-scroll-zone {
          -webkit-overflow-scrolling: touch;
          overflow: auto;
          touch-action: pan-x pan-y pinch-zoom;
        }

        /* Mobile tab bar */
        @media (max-width: 767px) {
          .desktop-layout { display: none !important; }
          .mobile-layout { display: flex !important; }
        }
        @media (min-width: 768px) {
          .desktop-layout { display: grid !important; }
          .mobile-layout { display: none !important; }
        }
      `}</style>

      {/* ── DESKTOP layout (≥768px): unchanged two-column grid ── */}
      <div
        className="desktop-layout grid-cols-2 gap-8 px-8 py-6 w-full"
        style={{ display: "grid" }}
      >
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 mb-5 tracking-tight">Edit CV</h1>
          <div className="flex flex-col gap-2">
            {sections.map(({ id, icon, label, panel }) => (
              <SectionCard key={id} icon={icon} label={label} active={activeSection === id} onClick={() => toggle(id)}>
                {panel}
              </SectionCard>
            ))}
          </div>
        </div>
        <div className="sticky top-6 self-start">
          <h2 className="text-xl font-extrabold text-gray-900 mb-5 tracking-tight">Preview</h2>
          <Preview cv={cv} fileInputRef={fileInputRef} />
        </div>
      </div>

      {/* ── MOBILE layout (<768px): tab switcher + horizontally scrollable panels ── */}
      <div
        className="mobile-layout flex-col"
        style={{ display: "none", minHeight: "100dvh" }}
      >
        {/* Sticky tab bar */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "#f5f4f2",
            borderBottom: "1px solid #e8e8e8",
            display: "flex",
            padding: "10px 16px 0",
            gap: 8,
          }}
        >
          {(["edit", "preview"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              style={{
                flex: 1,
                padding: "10px 0",
                borderRadius: "12px 12px 0 0",
                border: "none",
                background: mobileTab === tab ? "#fff" : "transparent",
                color: mobileTab === tab ? "#e8623a" : "#888",
                fontWeight: 700,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                boxShadow: mobileTab === tab ? "0 -2px 0 #e8623a inset" : "none",
                transition: "all 0.2s",
                textTransform: "capitalize",
              }}
            >
              {tab === "edit" ? "✏️ Edit CV" : "👁 Preview"}
            </button>
          ))}
        </div>

        {/* Scrollable content area — full natural width, user can scroll & pinch-zoom */}
        <div
          className="mobile-scroll-zone"
          style={{
            flex: 1,
            overflowX: "auto",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {mobileTab === "edit" ? (
            /* Edit panel — min 360px natural width, scrolls horizontally if content wider */
            <div style={{ minWidth: 360, padding: "16px 16px 32px" }}>
              <h1 style={{ fontSize: 21, fontWeight: 800, color: "#1a1a1a", marginBottom: 16, letterSpacing: "-0.02em" }}>Edit CV</h1>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sections.map(({ id, icon, label, panel }) => (
                  <SectionCard key={id} icon={icon} label={label} active={activeSection === id} onClick={() => toggle(id)}>
                    {panel}
                  </SectionCard>
                ))}
              </div>
            </div>
          ) : (
            /* Preview panel — rendered at full 800px width, horizontally scrollable */
            <div
              style={{
                minWidth: 800,
                padding: "16px 16px 32px",
              }}
            >
              <h2 style={{ fontSize: 21, fontWeight: 800, color: "#1a1a1a", marginBottom: 16, letterSpacing: "-0.02em" }}>Preview</h2>
              <Preview cv={cv} fileInputRef={fileInputRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}