"use client";
import { useState } from "react";

type Plan = "Free" | "Monthly" | "Yearly";
type Status = "Paid" | "Active" | "Failed";
type SortKey = "By date" | "By plan" | "By status" | "By amount";

interface Payment {
  date: string;
  userEmail: string;
  plan: Plan;
  amount: number;
  status: Status;
  paymentMethod: number;
}

const mockPayments: Payment[] = [
  { date: "22 Nov 2022", userEmail: "bockely@att.com", plan: "Monthly", amount: 450, status: "Paid", paymentMethod: 450 },
  { date: "22 Nov 2022", userEmail: "csilvers@rizon.com", plan: "Free", amount: 450, status: "Active", paymentMethod: 450 },
  { date: "22 Nov 2022", userEmail: "qamaho@mail.com", plan: "Monthly", amount: 450, status: "Active", paymentMethod: 450 },
  { date: "22 Nov 2022", userEmail: "xterris@gmail.com", plan: "Yearly", amount: 450, status: "Failed", paymentMethod: 450 },
  { date: "22 Nov 2022", userEmail: "xterris@gmail.com", plan: "Yearly", amount: 450, status: "Failed", paymentMethod: 450 },
  { date: "22 Nov 2022", userEmail: "xterris@gmail.com", plan: "Free", amount: 450, status: "Active", paymentMethod: 450 },
  { date: "22 Nov 2022", userEmail: "xterris@gmail.com", plan: "Free", amount: 450, status: "Active", paymentMethod: 450 },
  { date: "22 Nov 2022", userEmail: "xterris@gmail.com", plan: "Free", amount: 450, status: "Active", paymentMethod: 450 },
  { date: "22 Nov 2022", userEmail: "xterris@gmail.com", plan: "Monthly", amount: 450, status: "Active", paymentMethod: 450 },
  { date: "22 Nov 2022", userEmail: "xterris@gmail.com", plan: "Yearly", amount: 450, status: "Failed", paymentMethod: 450 },
];

const statusBadge: Record<Status, string> = {
  Paid: "bg-green-100 text-green-600 border border-green-200",
  Active: "bg-green-100 text-green-600 border border-green-200",
  Failed: "bg-red-100 text-red-400 border border-red-200",
};

const sortOptions: SortKey[] = ["By date", "By plan", "By status", "By amount"];

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function PaymentHistoryTable() {
  const [sortKey, setSortKey] = useState<SortKey>("By date");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sorted = [...mockPayments].sort((a, b) => {
    if (sortKey === "By plan") return a.plan.localeCompare(b.plan);
    if (sortKey === "By status") return a.status.localeCompare(b.status);
    if (sortKey === "By amount") return a.amount - b.amount;
    return a.date.localeCompare(b.date);
  });

  const handleExportCSV = () => {
    const headers = ["Date", "User Email", "Plan", "Amount", "Status", "Payment Method"];
    const rows = sorted.map((p) => [
      p.date,
      p.userEmail,
      p.plan,
      `$${p.amount}`,
      p.status,
      `$${p.paymentMethod}`,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#fff0ec] flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-sm w-full p-6 relative">

        {/* Sort Dropdown */}
        <div className="flex justify-end mb-6 relative">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150 min-w-[130px] justify-between"
            >
              <span>{sortKey}</span>
              <ChevronIcon />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-10 min-w-[140px] overflow-hidden">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSortKey(opt);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 ${sortKey === opt
                      ? "bg-orange-50 text-orange-500 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {["Date", "User Email", "Plan", "Amount", "Status", "Payment method"].map((col) => (
                <th key={col} className="text-left text-sm font-bold text-gray-800 pb-3 pr-4">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((payment, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-50 hover:bg-orange-50 transition-colors duration-100"
              >
                <td className="py-4 pr-4 text-sm text-gray-500">{payment.date}</td>
                <td className="py-4 pr-4 text-sm text-gray-600">{payment.userEmail}</td>
                <td className="py-4 pr-4 text-sm text-gray-600">{payment.plan}</td>
                <td className="py-4 pr-4 text-sm text-gray-600">${payment.amount}</td>
                <td className="py-4 pr-4">
                  <span
                    className={`inline-block px-5 py-1.5 rounded-lg text-sm font-medium ${statusBadge[payment.status]}`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="py-4 text-sm text-gray-600">${payment.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Export CSV */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-12 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors duration-150"
          >
            <UploadIcon />
            Export CSV
          </button>
        </div>

      </div>
    </div>
  );
}