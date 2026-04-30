"use client";
import { useState } from "react";

// ─── Icons ───────────────────────────────────────────────────────────────────

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg
    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.49 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const LightbulbIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MinusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

// ─── Reusable ────────────────────────────────────────────────────────────────

const ToggleChip = ({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all duration-150 whitespace-nowrap ${active
      ? "bg-[#F26B4E] text-white border-[#F26B4E]"
      : "bg-white text-gray-700 border-gray-200 hover:border-[#F26B4E] hover:text-[#F26B4E]"
      }`}
  >
    {label}
  </button>
);

// ─── Section Accordion ───────────────────────────────────────────────────────

const Section = ({
  icon, title, children, defaultOpen = false,
}: { icon: React.ReactNode; title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[#FDF0EC] flex items-center justify-center text-[#F26B4E]">
            {icon}
          </span>
          <span className="font-semibold text-gray-800 text-base">{title}</span>
        </div>
        <span className="text-gray-400"><ChevronDownIcon open={open} /></span>
      </button>
      {open && <div className="border-t border-gray-100">{children}</div>}
    </div>
  );
};

// ─── File Input ──────────────────────────────────────────────────────────────

const FileInput = ({ label }: { label: string }) => (
  <div>
    {label && <label className="block text-xs text-gray-500 mb-1">{label}</label>}
    <div className="flex border border-gray-200 rounded-lg overflow-hidden">
      <span className="flex-1 px-3 py-2 text-sm text-gray-400 bg-white">Choose File</span>
      <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium border-l border-gray-200 hover:bg-gray-200 transition-colors">
        Choose
      </button>
    </div>
  </div>
);

// ─── Text Input ──────────────────────────────────────────────────────────────

const TextInput = ({ placeholder, label, className = "" }: { placeholder: string; label?: string; className?: string }) => (
  <div className={className}>
    {label && <label className="block text-xs text-gray-500 mb-1">{label}</label>}
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-[#F26B4E] transition-colors"
    />
  </div>
);

// ─── Done Button ─────────────────────────────────────────────────────────────

const DoneButton = () => (
  <div className="flex justify-end pt-4 pb-2 pr-1">
    <button className="flex items-center gap-2 bg-[#F26B4E] hover:bg-[#e05c3f] text-white font-semibold px-5 py-2 rounded-xl transition-colors text-sm shadow-sm">
      <CheckIcon /> Done
    </button>
  </div>
);

// ─── Company Details Panel ────────────────────────────────────────────────────

function useMultiSelect(initial: string[]) {
  const [selected, setSelected] = useState<string[]>(initial);
  const toggle = (v: string) =>
    setSelected((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
  return { selected, toggle };
}

function useSingleSelect(initial: string) {
  const [selected, setSelected] = useState(initial);
  return { selected, select: setSelected };
}

const CompanyDetailsPanel = () => {
  const bedrijf = useMultiSelect(["Restaurant", "Hotel"]);
  const niveau = useSingleSelect("");
  const style = useMultiSelect(["Modern"]);
  const cuisine = useMultiSelect(["À la carte"]);
  const daily = useSingleSelect("0-30");
  const guest = useMultiSelect(["Business"]);
  const kitchen = useSingleSelect("1-3");
  const front = useSingleSelect("1-3");

  const bedrijfOptions = ["Restaurant", "Hotel", "Bar/Café", "Catering & Events", "Beachclub/Resorts", "Lunchrooms", "Corporate/Canteen", "Bakery/Pastry"];
  const niveauOptions = ["Fast Casual", "Casual Dining", "Fine Dining", "Bib Gourmand", "Michelin"];
  const styleOptions = ["Modern", "Classic", "Fusion", "French", "Asian", "Mediterranean", "Italian", "Spanish", "Carribean"];
  const cuisineOptions = ["À la carte", "Fixed menu", "Buffet", "Events/Groups", "Room Service"];
  const dailyOptions = ["0-30", "30-50", "50-100", "100-200", "200+"];
  const guestOptions = ["Business", "Tourists", "Locals", "Hotel Guests", "Mixed", "Nightlife Crowd", "Luxury Guests"];
  const teamOptions = ["1-3", "4-8", "8-15", "15+"];

  return (
    <div className="px-5 py-5 space-y-5">
      {/* Company Logo */}
      <FileInput label="Company logo" />

      {/* Company name + Location */}
      <div className="grid grid-cols-2 gap-3">
        <TextInput label="Company name" placeholder="Niels" />
        <div>
          <label className="block text-xs text-gray-500 mb-1">Location</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. California"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-[#F26B4E] transition-colors"
            />
            <button className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-[#F26B4E] hover:text-[#F26B4E] whitespace-nowrap transition-colors">
              <PlusIcon /> Add More Location
            </button>
          </div>
        </div>
      </div>

      {/* Hiring Manager Row */}
      <div className="grid grid-cols-4 gap-3">
        <TextInput label="Hiring Manager Name" placeholder="e.g. Jhon Doe" />
        <TextInput label="Position" placeholder="Jr. Hiring Manager" />
        <TextInput label="Email account" placeholder="e.g. email@gmail.com" />
        <TextInput label="Phone" placeholder="e.g. +8988805545" />
      </div>

      {/* Add More Company */}
      <button className="w-full border border-dashed border-gray-300 rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm text-gray-500 hover:border-[#F26B4E] hover:text-[#F26B4E] transition-colors">
        <PlusIcon /> Add More Company
      </button>

      {/* Bedrijf/type */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Bedrijf/type</p>
        <div className="flex flex-wrap gap-2">
          {bedrijfOptions.map((o) => <ToggleChip key={o} label={o} active={bedrijf.selected.includes(o)} onClick={() => bedrijf.toggle(o)} />)}
        </div>
      </div>

      {/* Niveau */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Niveau</p>
        <div className="flex flex-wrap gap-2">
          {niveauOptions.map((o) => <ToggleChip key={o} label={o} active={niveau.selected === o} onClick={() => niveau.select(o)} />)}
        </div>
      </div>

      {/* Style */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Style (multiple answers)</p>
        <div className="flex flex-wrap gap-2">
          {styleOptions.map((o) => <ToggleChip key={o} label={o} active={style.selected.includes(o)} onClick={() => style.toggle(o)} />)}
        </div>
      </div>

      {/* Cuisine Concept */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Cuisine Concept (multiple answers)</p>
        <div className="flex flex-wrap gap-2">
          {cuisineOptions.map((o) => <ToggleChip key={o} label={o} active={cuisine.selected.includes(o)} onClick={() => cuisine.toggle(o)} />)}
        </div>
      </div>

      {/* Daily Servings */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Daily servings (Based on a busy day)</p>
        <div className="flex flex-wrap gap-2">
          {dailyOptions.map((o) => <ToggleChip key={o} label={o} active={daily.selected === o} onClick={() => daily.select(o)} />)}
        </div>
      </div>

      {/* Guest Type */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Guest type</p>
        <div className="flex flex-wrap gap-2">
          {guestOptions.map((o) => <ToggleChip key={o} label={o} active={guest.selected.includes(o)} onClick={() => guest.toggle(o)} />)}
        </div>
      </div>

      {/* Back of House */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">Back of House information</p>
        <p className="text-xs text-gray-500 mb-2">Kitchen team size:</p>
        <div className="flex flex-wrap gap-2">
          {teamOptions.map((o) => <ToggleChip key={o} label={o} active={kitchen.selected === o} onClick={() => kitchen.select(o)} />)}
        </div>
      </div>

      {/* Front of House */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">Front of house information</p>
        <p className="text-xs text-gray-500 mb-2">Front of House team size:</p>
        <div className="flex flex-wrap gap-2">
          {teamOptions.map((o) => <ToggleChip key={o} label={o} active={front.selected === o} onClick={() => front.select(o)} />)}
        </div>
      </div>

      {/* Upload Menu */}
      <button className="text-[#F26B4E] text-sm font-medium hover:underline">Upload Menu</button>

      {/* ADD Dishpics */}
      <FileInput label="ADD Dishpics" />

      {/* ADD aesthetics */}
      <FileInput label="ADD aesthetics" />

      <DoneButton />
    </div>
  );
};

// ─── Jobs Panel ───────────────────────────────────────────────────────────────

type Shift = { start: string; end: string };
type DayShifts = { day: string; shifts: Shift[] };

const JobsPanel = () => {
  const jobRoles = useMultiSelect(["Executive Chef"]);
  const availability = useSingleSelect("32 - 38 hours");

  const jobOptions = ["Executive Chef", "Head Chef", "Executive Sous", "Sous Chef", "Chef de partie", "Demi Chef", "Commis Chef", "Pastry Chef", "Breakfast Chef", "Pizzaiolo", "Sushi Chef", "Catering chef", "Trainee", "Dishwasher"];
  const availOptions = ["32 – 38 hours", "16 – 32 hours", "0 – 16 hour"];

  const days: DayShifts[] = [
    { day: "S", shifts: [{ start: "06:00", end: "06:00" }, { start: "06:00", end: "06:00" }] },
    { day: "M", shifts: [] },
    { day: "T", shifts: [] },
    { day: "W", shifts: [] },
    { day: "T", shifts: [] },
    { day: "F", shifts: [] },
    { day: "S", shifts: [] },
  ];

  return (
    <div className="px-5 py-5 space-y-5">
      {/* Open Jobs */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Open jobs</p>
        <div className="flex flex-wrap gap-2">
          {jobOptions.map((o) => <ToggleChip key={o} label={o} active={jobRoles.selected.includes(o)} onClick={() => jobRoles.toggle(o)} />)}
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm border border-dashed border-gray-300 text-gray-500 hover:border-[#F26B4E] hover:text-[#F26B4E] transition-colors">
            <PlusIcon /> Add Job Role
          </button>
        </div>
      </div>

      {/* Salary indication */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Salary indication per job/position (based on Bruto Fulltime per month)</p>
        <div className="flex items-center gap-2">
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-[#F26B4E]">
            <option>Select Position</option>
          </select>
          <input type="text" placeholder="€Min" className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-[#F26B4E]" />
          <span className="text-gray-400">-</span>
          <input type="text" placeholder="€Max" className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-[#F26B4E]" />
          <button className="flex items-center gap-1 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-[#F26B4E] hover:text-[#F26B4E] transition-colors">
            <PlusIcon /> Add Another
          </button>
        </div>
      </div>

      {/* Tips indication */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Tips indication based per month</p>
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-md text-gray-500 hover:border-[#F26B4E]"><MinusIcon /></button>
          <input type="text" placeholder="€Min" className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-[#F26B4E]" />
          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-md text-gray-500 hover:border-[#F26B4E]"><PlusIcon /></button>
          <span className="text-gray-400">-</span>
          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-md text-gray-500 hover:border-[#F26B4E]"><MinusIcon /></button>
          <input type="text" placeholder="€Max" className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-[#F26B4E]" />
          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-md text-gray-500 hover:border-[#F26B4E]"><PlusIcon /></button>
        </div>
      </div>

      {/* Position Availability */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Position Availability</p>
        <div className="flex gap-2">
          {availOptions.map((o) => <ToggleChip key={o} label={o} active={availability.selected === o} onClick={() => availability.select(o)} />)}
        </div>
      </div>

      {/* Shift possibilities */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Shift possibilities</p>
        <div className="space-y-2">
          {days.map((d, di) => (
            <div key={di} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F26B4E] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {d.day}
              </div>
              <div className="flex-1 space-y-1.5">
                {d.shifts.length === 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Open</span>
                    <button className="text-gray-400 hover:text-[#F26B4E]"><PlusCircleIcon /></button>
                  </div>
                ) : (
                  d.shifts.map((sh, si) => (
                    <div key={si} className="flex items-center gap-2">
                      <input defaultValue={sh.start} className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#F26B4E]" />
                      <span className="text-gray-400">-</span>
                      <input defaultValue={sh.end} className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#F26B4E]" />
                      <button className="text-gray-400 hover:text-red-400"><XIcon /></button>
                      <button className="text-gray-400 hover:text-[#F26B4E]"><PlusCircleIcon /></button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Job */}
      <button className="w-full border border-dashed border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 text-sm text-gray-500 hover:border-[#F26B4E] hover:text-[#F26B4E] transition-colors mt-2">
        <PlusIcon /> Add Job
      </button>

      <DoneButton />
    </div>
  );
};

// ─── Perks & Possibilities Panel ─────────────────────────────────────────────

const PerksPanel = () => {
  const workSchedule = useMultiSelect(["4-day work week"]);
  const financial = useMultiSelect(["Salary growth plan (clear steps)"]);
  const travel = useMultiSelect(["Travel allowance"]);
  const housing = useMultiSelect(["Staff housing / accommodation support"]);
  const training = useMultiSelect(["Internal training programs"]);
  const food = useMultiSelect(["Free staff meals"]);
  const culture = useMultiSelect(["Team events / staff parties"]);
  const health = useMultiSelect(["Health insurance contribution"]);

  const perkGroups = [
    {
      label: "Work Schedule & Flexibility",
      options: ["4-day work week", "Fixed off day", "Consecutive days off", "Fixed schedule (2–4 weeks ahead)", "Flexible scheduling", "Part-time possibilities", "No split shifts", "Weekends off", "Day shifts only", "Evening shifts only"],
      state: workSchedule,
    },
    {
      label: "Financial Benefits",
      options: ["Salary growth plan (clear steps)", "13th month salary", "Performance / KPI bonus (management roles)", "Signing bonus", "Referral bonus"],
      state: financial,
    },
    {
      label: "Travel & Practical Benefits",
      options: ["Travel allowance", "Free parking"],
      state: travel,
    },
    {
      label: "Housing & Relocation",
      options: ["Staff housing / accommodation support", "Relocation support", "Visa sponsorship"],
      state: housing,
    },
    {
      label: "Training & Development",
      options: ["Internal training programs", "External training programs", "Management development program", "Cross-training (kitchen ↔ service ↔ bar)", "Language courses", "Fast promotion opportunities"],
      state: training,
    },
    {
      label: "Food, Drinks & Perks",
      options: ["Free staff meals", "Staff discount (F&B)", "After-work drinks", "Menu tastings"],
      state: food,
    },
    {
      label: "Culture & Team",
      options: ["Team events / staff parties", "Annual trips / team outings", "Young & dynamic team", "Family-like culture"],
      state: culture,
    },
    {
      label: "Health & Extras",
      options: ["Health insurance contribution", "Extra sick day support", "Gym membership discount"],
      state: health,
    },
  ];

  return (
    <div className="px-5 py-5 space-y-5">
      {perkGroups.map((g) => (
        <div key={g.label}>
          <p className="text-sm font-semibold text-gray-700 mb-2">{g.label}</p>
          <div className="flex flex-wrap gap-2">
            {g.options.map((o) => (
              <ToggleChip key={o} label={o} active={g.state.selected.includes(o)} onClick={() => g.state.toggle(o)} />
            ))}
          </div>
        </div>
      ))}
      <DoneButton />
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EmployerProfile() {
  return (
    <div className="min-h-screen bg-[#FDF0EC] p-6">
      <div className="w-full mx-auto space-y-3">

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center flex-shrink-0">
              {/* Avatar placeholder */}
              <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" fill="#B3D4E8" />
                <circle cx="32" cy="24" r="10" fill="#6FA8C8" />
                <ellipse cx="32" cy="54" rx="18" ry="12" fill="#4A80A0" />
                <rect x="24" y="18" width="16" height="4" rx="2" fill="#2C5F7A" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-base">Ovie Rahaman Sheikh</p>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5">
                <MailIcon /><span>email@gmail.com</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5">
                <PhoneIcon /><span>email@gmail.com</span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-[#F26B4E] transition-colors"><EditIcon /></button>
        </div>

        {/* Company Details */}
        <Section icon={<BuildingIcon />} title="Company Details">
          <CompanyDetailsPanel />
        </Section>

        {/* Jobs */}
        <Section icon={<BriefcaseIcon />} title="Jobs">
          <JobsPanel />
        </Section>

        {/* Perks & Possibilities */}
        <Section icon={<LightbulbIcon />} title="Perks & Possibilities">
          <PerksPanel />
        </Section>

      </div>
    </div>
  );
}