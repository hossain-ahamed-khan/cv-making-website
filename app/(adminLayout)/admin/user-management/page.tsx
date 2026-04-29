"use client";
import { useState } from "react";

type Plan = "Free" | "Monthly" | "Yearly";
type Tab = "Users" | "Company";
type Status = "Active" | "Canceled";

interface User {
  id: string;
  fullName: string;
  email: string;
  currentPlan: Plan;
  status: Status;
  registrationDate: string;
  nextBillingDate: string;
}

const mockUsers: User[] = [
  {
    id: "#1233",
    fullName: "Kathryn Murp",
    email: "bockely@att.com",
    currentPlan: "Monthly",
    status: "Active",
    registrationDate: "22 Nov 2022",
    nextBillingDate: "22 Nov 2022",
  },
  {
    id: "#1234",
    fullName: "Devon Lane",
    email: "csilvers@rizon.com",
    currentPlan: "Free",
    status: "Active",
    registrationDate: "22 Nov 2022",
    nextBillingDate: "22 Nov 2022",
  },
  {
    id: "#1235",
    fullName: "Foysal Rahman",
    email: "qamaho@mail.com",
    currentPlan: "Monthly",
    status: "Active",
    registrationDate: "22 Nov 2022",
    nextBillingDate: "22 Nov 2022",
  },
  {
    id: "#1236",
    fullName: "Hari Danang",
    email: "xterris@gmail.com",
    currentPlan: "Yearly",
    status: "Canceled",
    registrationDate: "22 Nov 2022",
    nextBillingDate: "22 Nov 2022",
  },
  {
    id: "#1237",
    fullName: "Floyd Miles",
    email: "xterris@gmail.com",
    currentPlan: "Yearly",
    status: "Canceled",
    registrationDate: "22 Nov 2022",
    nextBillingDate: "22 Nov 2022",
  },
  {
    id: "#1238",
    fullName: "Eleanor Pena",
    email: "xterris@gmail.com",
    currentPlan: "Free",
    status: "Active",
    registrationDate: "22 Nov 2022",
    nextBillingDate: "22 Nov 2022",
  },
  {
    id: "#1239",
    fullName: "Devon Lane",
    email: "xterris@gmail.com",
    currentPlan: "Free",
    status: "Active",
    registrationDate: "22 Nov 2022",
    nextBillingDate: "22 Nov 2022",
  },
  {
    id: "#1240",
    fullName: "Hari Danang",
    email: "xterris@gmail.com",
    currentPlan: "Free",
    status: "Active",
    registrationDate: "22 Nov 2022",
    nextBillingDate: "22 Nov 2022",
  },
  {
    id: "#1241",
    fullName: "Devon Lane",
    email: "xterris@gmail.com",
    currentPlan: "Monthly",
    status: "Active",
    registrationDate: "22 Nov 2022",
    nextBillingDate: "22 Nov 2022",
  },
  {
    id: "#1242",
    fullName: "Hari Danang",
    email: "xterris@gmail.com",
    currentPlan: "Yearly",
    status: "Canceled",
    registrationDate: "22 Nov 2022",
    nextBillingDate: "22 Nov 2022",
  },
  {
    id: "#1243",
    fullName: "Marcus Bell",
    email: "mbell@outlook.com",
    currentPlan: "Monthly",
    status: "Active",
    registrationDate: "15 Dec 2022",
    nextBillingDate: "15 Jan 2023",
  },
  {
    id: "#1244",
    fullName: "Sophia Chen",
    email: "sophiac@gmail.com",
    currentPlan: "Yearly",
    status: "Active",
    registrationDate: "30 Jan 2023",
    nextBillingDate: "30 Jan 2024",
  },
];

const ITEMS_PER_PAGE = 10;

const statusBadge: Record<Status, string> = {
  Active: "bg-green-100 text-green-700",
  Canceled: "bg-rose-100 text-rose-700",
};

export default function UserManagementTable() {
  const [activeTab, setActiveTab] = useState<Tab>("Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [planFilter, setPlanFilter] = useState<"All" | Plan>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    setSearchQuery(inputValue);
    setCurrentPage(1);
  };

  const isUsersTab = activeTab === "Users";

  const filtered = mockUsers.filter((u) => {
    const matchesQuery =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = isUsersTab
      ? true
      : planFilter === "All"
        ? true
        : u.currentPlan === planFilter;
    return matchesQuery && matchesPlan;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#fff0ec] flex justify-center p-6">
      <div className="bg-white rounded-3xl shadow-sm w-full border border-orange-100 p-6 md:p-8">

        {/* Tabs */}
        <div className="flex gap-3 mb-5">
          {(["Users", "Company"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${activeTab === tab
                ? "bg-orange-500 text-white"
                : "border border-orange-300 text-orange-500 bg-transparent hover:bg-orange-50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-lg bg-gray-100 px-3 py-2">
            <input
              type="text"
              placeholder="Search by email or name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 bg-transparent px-1 text-sm text-gray-600 outline-none placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors duration-150"
            >
              Search
            </button>
          </div>
          {!isUsersTab && (
            <div className="relative">
              <select
                value={planFilter}
                onChange={(e) => {
                  setPlanFilter(e.target.value as "All" | Plan);
                  setCurrentPage(1);
                }}
                className="w-full min-w-[180px] appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-orange-400"
              >
                <option value="All">All Plans</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Free">Free</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                v
              </span>
            </div>
          )}
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {(isUsersTab
                ? [
                  "SL no.",
                  "Full Name",
                  "Email",
                  "Current Plan",
                  "Registration Date",
                  "View",
                ]
                : [
                  "SL no.",
                  "Full Name",
                  "Email",
                  "Current Plan",
                  "Status",
                  "Registration Date",
                  "Next Billing Date",
                  "View",
                ]
              ).map((col) => (
                <th key={col} className="text-left text-xs font-semibold text-gray-500 pb-3 pr-4">
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
                <td className="py-3.5 pr-4 text-sm text-gray-600">{user.id}</td>
                <td className="py-3.5 pr-4 text-sm text-gray-700 font-medium">{user.fullName}</td>
                <td className="py-3.5 pr-4 text-sm text-gray-500">{user.email}</td>
                <td className="py-3.5 pr-4 text-sm text-gray-600">{user.currentPlan}</td>
                {!isUsersTab && (
                  <td className="py-3.5 pr-4">
                    <span className={`text-xs font-medium px-4 py-1.5 rounded-md ${statusBadge[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                )}
                <td className="py-3.5 pr-4 text-sm text-gray-600">{user.registrationDate}</td>
                {!isUsersTab && (
                  <td className="py-3.5 pr-4 text-sm text-gray-600">{user.nextBillingDate}</td>
                )}
                <td className="py-3.5">
                  <button className="px-4 py-1.5 rounded-md bg-green-100 hover:bg-green-200 text-green-700 text-xs font-semibold transition-colors duration-150">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={isUsersTab ? 6 : 8} className="text-center py-10 text-sm text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
          >
            &lt; Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-9 rounded-md text-sm font-semibold border transition-all duration-150 ${page === currentPage
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Next &gt;
          </button>
        </div>

      </div>
    </div>
  );
}