"use client";
import { useState } from "react";

interface Employee {
    id: number;
    fullName: string;
    designation: string;
    address: string;
    currentEmployee: string;
}

const employees: Employee[] = [
    { id: 1, fullName: "Kathryn Murp", designation: "Chef de parties", address: "London", currentEmployee: "Pizzaburg London" },
    { id: 2, fullName: "Devon Lane", designation: "Chef de parties", address: "New York", currentEmployee: "Pizzaburg London" },
    { id: 3, fullName: "Foysal Rahman", designation: "Chef de parties", address: "Amsterdam", currentEmployee: "Pizzaburg London" },
    { id: 4, fullName: "Hari Danang", designation: "Chef", address: "Jhonson", currentEmployee: "Pizzaburg London" },
    { id: 5, fullName: "Floyd Miles", designation: "Chef de parties", address: "Los Angels", currentEmployee: "Pizzaburg London" },
    { id: 6, fullName: "Eleanor Pena", designation: "Chef de parties", address: "Bali, Pattaya", currentEmployee: "Pizzaburg London" },
    { id: 7, fullName: "Devon Lane", designation: "Chef de parties", address: "USA", currentEmployee: "Pluto House" },
    { id: 8, fullName: "Hari Danang", designation: "Chef de parties", address: "California", currentEmployee: "Pluto House" },
    { id: 9, fullName: "Devon Lane", designation: "Chef de parties", address: "US", currentEmployee: "Pluto House" },
    { id: 10, fullName: "Hari Danang", designation: "Chef de parties", address: "California", currentEmployee: "Pluto House" },
];

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 3;

export default function EmployeeTable() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(3);

    const filtered = employees.filter(
        (e) =>
            e.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#fff0ec] w-full p-6">
            <div className="bg-white rounded-2xl shadow-sm w-full p-6">
                {/* Search Bar */}
                <div className="flex gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Search by email or name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50"
                    />
                    <button className="bg-[#FF6041] hover:bg-orange-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors">
                        Search
                    </button>
                </div>

                {/* Table */}
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left text-sm font-semibold text-gray-800 pb-3 pr-4">Full Name</th>
                            <th className="text-left text-sm font-semibold text-gray-800 pb-3 pr-4">Designation</th>
                            <th className="text-left text-sm font-semibold text-gray-800 pb-3 pr-4">Address</th>
                            <th className="text-left text-sm font-semibold text-gray-800 pb-3 pr-4">Current Employee</th>
                            <th className="text-left text-sm font-semibold text-gray-800 pb-3 pr-4">Profile</th>
                            <th className="text-left text-sm font-semibold text-gray-800 pb-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((employee) => (
                            <tr key={employee.id} className="border-b border-gray-50 last:border-0">
                                <td className="py-4 pr-4 text-sm text-gray-700">{employee.fullName}</td>
                                <td className="py-4 pr-4 text-sm text-gray-500">{employee.designation}</td>
                                <td className="py-4 pr-4 text-sm text-gray-500">{employee.address}</td>
                                <td className="py-4 pr-4 text-sm text-gray-500">{employee.currentEmployee}</td>
                                <td className="py-4 pr-4">
                                    <button className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-600 text-xs font-medium px-3 py-1.5 rounded-full border border-green-100 transition-colors">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View Details
                                    </button>
                                </td>
                                <td className="py-4">
                                    <button className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-600 text-xs font-medium px-3 py-1.5 rounded-full border border-green-100 transition-colors">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                        Invite
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="bg-[#FF6041] hover:bg-orange-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                    >
                        &lt; Prev
                    </button>
                    {[1, 2, 3].map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium border transition-colors ${currentPage === page
                                ? "bg-[#FF6041] text-white border-[#FF6041]"
                                : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                        className="bg-[#FF6041] hover:bg-orange-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}