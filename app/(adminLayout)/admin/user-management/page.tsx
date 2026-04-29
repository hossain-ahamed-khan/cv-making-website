"use client";
import { useState } from "react";

type Plan = "Free" | "Monthly" | "Yearly";
type Tab = "Users" | "Company";

interface User {
  id: string;
  fullName: string;
  email: string;
  currentPlan: Plan;
  registrationDate: string;
}

const mockUsers: User[] = [
  { id: "#1233", fullName: "Kathryn Murp", email: "bockely@att.com", currentPlan: "Monthly", registrationDate: "22 Nov 2022" },
  { id: "#1234", fullName: "Devon Lane", email: "csilvers@rizon.com", currentPlan: "Free", registrationDate: "22 Nov 2022" },
  { id: "#1235", fullName: "Foysal Rahman", email: "qamaho@mail.com", currentPlan: "Monthly", registrationDate: "22 Nov 2022" },
  { id: "#1236", fullName: "Hari Danang", email: "xterris@gmail.com", currentPlan: "Yearly", registrationDate: "22 Nov 2022" },
  { id: "#1237", fullName: "Floyd Miles", email: "xterris@gmail.com", currentPlan: "Yearly", registrationDate: "22 Nov 2022" },
  { id: "#1238", fullName: "Eleanor Pena", email: "xterris@gmail.com", currentPlan: "Free", registrationDate: "22 Nov 2022" },
  { id: "#1239", fullName: "Devon Lane", email: "xterris@gmail.com", currentPlan: "Free", registrationDate: "22 Nov 2022" },
  { id: "#1240", fullName: "Hari Danang", email: "xterris@gmail.com", currentPlan: "Free", registrationDate: "22 Nov 2022" },
  { id: "#1241", fullName: "Devon Lane", email: "xterris@gmail.com", currentPlan: "Monthly", registrationDate: "22 Nov 2022" },
  { id: "#1242", fullName: "Hari Danang", email: "xterris@gmail.com", currentPlan: "Yearly", registrationDate: "22 Nov 2022" },
  { id: "#1243", fullName: "Marcus Bell", email: "mbell@outlook.com", currentPlan: "Monthly", registrationDate: "15 Dec 2022" },
  { id: "#1244", fullName: "Sophia Chen", email: "sophiac@gmail.com", currentPlan: "Yearly", registrationDate: "30 Jan 2023" },
];

const ITEMS_PER_PAGE = 10;

const planBadge: Record<Plan, string> = {
  Monthly: "bg-orange-100 text-orange-500",
  Yearly: "bg-green-100 text-green-600",
  Free: "bg-gray-100 text-gray-500",
};

export default function UserManagementTable() {
  const [activeTab, setActiveTab] = useState<Tab>("Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    setSearchQuery(inputValue);
    setCurrentPage(1);
  };

  const filtered = mockUsers.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-5xl p-6">

        {/* Tabs */}
        <div className="flex gap-3 mb-5">
          {(["Users", "Company"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-orange-50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by email or name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-2.5 rounded-lg bg-gray-100 text-sm text-gray-500 outline-none placeholder-gray-400"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors duration-150"
          >
            Search
          </button>
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {["SL no.", "Full Name", "Email", "Current Plan", "Registration Date", "View"].map((col) => (
                <th key={col} className="text-left text-sm font-bold text-gray-800 pb-3 pr-4">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((user, idx) => (
              <tr
                key={user.id + idx}
                className="border-b border-gray-50 hover:bg-orange-50 transition-colors duration-100"
              >
                <td className="py-3.5 pr-4 text-sm text-gray-500">{user.id}</td>
                <td className="py-3.5 pr-4 text-sm text-gray-700 font-medium">{user.fullName}</td>
                <td className="py-3.5 pr-4 text-sm text-gray-500">{user.email}</td>
                <td className="py-3.5 pr-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-md ${planBadge[user.currentPlan]}`}>
                    {user.currentPlan}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-sm text-gray-500">{user.registrationDate}</td>
                <td className="py-3.5">
                  <button className="px-4 py-1.5 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 text-xs font-semibold transition-colors duration-150">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-sm text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
          >
            &lt; Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium border transition-all duration-150 ${page === currentPage
                  ? "bg-orange-500 text-white border-orange-500 font-bold"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Next &gt;
          </button>
        </div>

      </div>
    </div>
  );
}