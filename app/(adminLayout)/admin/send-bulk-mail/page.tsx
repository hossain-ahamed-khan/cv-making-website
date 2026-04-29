"use client";
import { useState } from "react";

const users = [
    { id: 1, name: "Kathryn Murp", email: "bockely@att.com", position: "Chef", checked: true },
    { id: 2, name: "Devon Lane", email: "csilvers@rizon.com", position: "Chef", checked: true },
    { id: 3, name: "Foysal Rahman", email: "qamaho@mail.com", position: "Head Chef", checked: true },
    { id: 4, name: "Hari Danang", email: "xterris@gmail.com", position: "Head Chef", checked: true },
    { id: 5, name: "Floyd Miles", email: "xterris@gmail.com", position: "Head Chef", checked: true },
    { id: 6, name: "Eleanor Pena", email: "xterris@gmail.com", position: "Head Chef", checked: true },
    { id: 7, name: "Devon Lane", email: "xterris@gmail.com", position: "Chef", checked: true },
    { id: 8, name: "Hari Danang", email: "xterris@gmail.com", position: "Chef", checked: true },
    { id: 9, name: "Devon Lane", email: "xterris@gmail.com", position: "Chef", checked: true },
    { id: 10, name: "Hari Danang", email: "xterris@gmail.com", position: "Chef", checked: false },
];

const companies = [
    { id: 1, name: "Kathryn Murp", email: "bockely@att.com", plan: "Monthly" },
    { id: 2, name: "Devon Lane", email: "csilvers@rizon.com", plan: "Free" },
    { id: 3, name: "Foysal Rahman", email: "qamaho@mail.com", plan: "Monthly" },
    { id: 4, name: "Hari Danang", email: "xterris@gmail.com", plan: "Yearly" },
    { id: 5, name: "Floyd Miles", email: "xterris@gmail.com", plan: "Yearly" },
    { id: 6, name: "Eleanor Pena", email: "xterris@gmail.com", plan: "Free" },
    { id: 7, name: "Devon Lane", email: "xterris@gmail.com", plan: "Free" },
    { id: 8, name: "Hari Danang", email: "xterris@gmail.com", plan: "Free" },
    { id: 9, name: "Devon Lane", email: "xterris@gmail.com", plan: "Monthly" },
    { id: 10, name: "Hari Danang", email: "xterris@gmail.com", plan: "Yearly" },
];

export default function UserCompanyTabs() {
    const [activeTab, setActiveTab] = useState<"users" | "company">("users");
    const [checkedUsers, setCheckedUsers] = useState<Record<number, boolean>>(
        Object.fromEntries(users.map((u) => [u.id, u.checked]))
    );

    const allChecked = users.every((u) => checkedUsers[u.id]);
    const someChecked = users.some((u) => checkedUsers[u.id]);

    const handleSelectAll = () => {
        const next = !allChecked;
        setCheckedUsers(Object.fromEntries(users.map((u) => [u.id, next])));
    };

    const handleCheck = (id: number) => {
        setCheckedUsers((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="min-h-screen bg-[#fff0ec] flex justify-center p-6">
            <div className="bg-white rounded-2xl shadow-sm w-full p-6">
                {/* Tab Buttons */}
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === "users"
                            ? "bg-red-400 text-white"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab("company")}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === "company"
                            ? "bg-red-400 text-white"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                    >
                        Company
                    </button>
                </div>

                {/* Users Tab */}
                {activeTab === "users" && (
                    <>
                        <table className="w-full border-separate border-spacing-0">
                            <thead>
                                <tr className="text-left text-sm font-semibold text-gray-800">
                                    <th className="pb-3 w-40">
                                        <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-600">
                                            <input
                                                type="checkbox"
                                                checked={allChecked}
                                                ref={(el) => {
                                                    if (el) el.indeterminate = someChecked && !allChecked;
                                                }}
                                                onChange={handleSelectAll}
                                                className="w-4 h-4 rounded border-gray-300 accent-red-500 cursor-pointer"
                                            />
                                            <span>Select All</span>
                                        </label>
                                    </th>
                                    <th className="pb-3">Full Name</th>
                                    <th className="pb-3">Email</th>
                                    <th className="pb-3">Position</th>
                                    <th className="pb-3 text-right">CV</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={`border-t border-gray-100 ${index % 2 === 0 ? "bg-gray-50/60" : "bg-white"}`}
                                    >
                                        <td className="py-3.5 w-40">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={!!checkedUsers[user.id]}
                                                    onChange={() => handleCheck(user.id)}
                                                    className="w-4 h-4 rounded border-gray-300 accent-red-500 cursor-pointer"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-3.5 text-sm font-medium text-gray-800">{user.name}</td>
                                        <td className="py-3.5 text-sm text-gray-600">{user.email}</td>
                                        <td className="py-3.5 text-sm text-gray-600">{user.position}</td>
                                        <td className="py-3.5 text-right">
                                            <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-100 hover:bg-emerald-100 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-6">
                            <button className="px-8 py-2.5 bg-red-400 text-white text-sm font-semibold rounded-lg hover:bg-red-500 transition-colors">
                                Next &gt;
                            </button>
                        </div>
                    </>
                )}

                {/* Company Tab */}
                {activeTab === "company" && (
                    <>
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm font-semibold text-gray-800">
                                    <th className="pb-4 w-64">Company Name</th>
                                    <th className="pb-4">Email</th>
                                    <th className="pb-4">Plan</th>
                                    <th className="pb-4 text-right">Sent All 378 CV To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((company) => (
                                    <tr key={company.id} className="border-t border-gray-100">
                                        <td className="py-3.5 text-sm text-gray-700">{company.name}</td>
                                        <td className="py-3.5 text-sm text-gray-700">{company.email}</td>
                                        <td className="py-3.5 text-sm text-gray-700">{company.plan}</td>
                                        <td className="py-3.5 text-right">
                                            <button className="text-gray-800 hover:text-red-400 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-6">
                            <button className="px-8 py-2.5 bg-red-400 text-white text-sm font-semibold rounded-lg hover:bg-red-500 transition-colors">
                                Next &gt;
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}