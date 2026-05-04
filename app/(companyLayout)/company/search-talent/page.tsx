"use client";
import { useState } from "react";

const Eye = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const UserPlus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h12m0 0l-5-5m5 5l-5 5" />
    </svg>
);

const employees = [
    { id: 1, name: "Kathryn Murp", designation: "Chef de parties", address: "London", employer: "Pizzaburg London" },
    { id: 2, name: "Devon Lane", designation: "Chef de parties", address: "New York", employer: "Pizzaburg London" },
    { id: 3, name: "Foysal Rahman", designation: "Chef de parties", address: "Amsterdam", employer: "Pizzaburg London" },
    { id: 4, name: "Hari Danang", designation: "Chef", address: "Jhonson", employer: "Pizzaburg London" },
    { id: 5, name: "Floyd Miles", designation: "Chef de parties", address: "Los Angels", employer: "Pizzaburg London" },
    { id: 6, name: "Eleanor Pena", designation: "Chef de parties", address: "Bali, Pattaya", employer: "Pizzaburg London" },
    { id: 7, name: "Devon Lane", designation: "Chef de parties", address: "USA", employer: "Pluto House" },
    { id: 8, name: "Hari Danang", designation: "Chef de parties", address: "California", employer: "Pluto House" },
    { id: 9, name: "Devon Lane", designation: "Chef de parties", address: "US", employer: "Pluto House" },
    { id: 10, name: "Hari Danang", designation: "Chef de parties", address: "California", employer: "Pluto House" },
    { id: 11, name: "Alice Kim", designation: "Sous Chef", address: "Paris", employer: "Pizzaburg London" },
    { id: 12, name: "Marco Rossi", designation: "Chef de parties", address: "Rome", employer: "Pluto House" },
    { id: 13, name: "Sara Ahmed", designation: "Pastry Chef", address: "Dubai", employer: "Pizzaburg London" },
    { id: 14, name: "James Cooper", designation: "Chef de parties", address: "Sydney", employer: "Pluto House" },
    { id: 15, name: "Lena Meyer", designation: "Chef", address: "Berlin", employer: "Pizzaburg London" },
    { id: 16, name: "Carlos Diaz", designation: "Chef de parties", address: "Madrid", employer: "Pluto House" },
    { id: 17, name: "Yuki Tanaka", designation: "Chef de parties", address: "Tokyo", employer: "Pizzaburg London" },
    { id: 18, name: "Priya Sharma", designation: "Sous Chef", address: "Mumbai", employer: "Pluto House" },
    { id: 19, name: "Tom Bakker", designation: "Chef de parties", address: "Amsterdam", employer: "Pizzaburg London" },
    { id: 20, name: "Nina Petrov", designation: "Chef", address: "Moscow", employer: "Pluto House" },
];

const PAGE_SIZE = 10;

export default function EmployeeTable() {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const filtered = employees.filter(
        (e) =>
            e.name.toLowerCase().includes(query.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleSearch = () => {
        setQuery(search);
        setPage(1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="min-h-screen bg-[#fff0ec] w-full p-6">
            <div className="bg-white rounded-2xl shadow-sm w-full p-6">
                {/* Search Bar */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2.5">
                        <input
                            type="text"
                            placeholder="Search by email or name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-[#FF6041] hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-md transition"
                    >
                        Search
                    </button>
                </div>

                {/* Table */}
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-800 font-semibold border-b border-gray-200">
                            <th className="pb-3 pr-4">Full Name</th>
                            <th className="pb-3 pr-4">Designation</th>
                            <th className="pb-3 pr-4">Address</th>
                            <th className="pb-3 pr-4">Current Employee</th>
                            <th className="pb-3 pr-4">Profile</th>
                            <th className="pb-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-400 py-10">
                                    No results found.
                                </td>
                            </tr>
                        ) : (
                            paginated.map((emp) => (
                                <tr key={emp.id} className="border-b border-gray-100 last:border-0">
                                    <td className="py-3.5 pr-4 text-gray-700">{emp.name}</td>
                                    <td className="py-3.5 pr-4 text-gray-500">{emp.designation}</td>
                                    <td className="py-3.5 pr-4 text-gray-500">{emp.address}</td>
                                    <td className="py-3.5 pr-4 text-gray-500">{emp.employer}</td>
                                    <td className="py-3.5 pr-4">
                                        <button className="inline-flex items-center gap-2 bg-rose-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-md hover:bg-rose-200 transition">
                                            <Eye />
                                            View Details
                                        </button>
                                    </td>
                                    <td className="py-3.5">
                                        <button className="inline-flex items-center gap-2 bg-green-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-md hover:bg-green-200 transition">
                                            Save to Talent Pool
                                            <ArrowRight />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="bg-[#FF6041] hover:bg-orange-600 disabled:opacity-40 text-white text-sm font-medium px-4 py-2 rounded-md transition"
                    >
                        &lt; Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-9 h-9 rounded-md text-sm font-medium transition ${p === page
                                ? "bg-[#FF6041] text-white"
                                : "border border-orange-300 text-orange-600 hover:bg-orange-50"
                                }`}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="bg-[#FF6041] hover:bg-orange-600 disabled:opacity-40 text-white text-sm font-medium px-4 py-2 rounded-md transition"
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}