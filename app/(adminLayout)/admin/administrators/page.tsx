"use client";
import { useState } from "react";

interface Admin {
    id: string;
    name: string;
    email: string;
    accessLevel: "Super Admin" | "Admin";
}

const initialAdmins: Admin[] = [
    { id: "#1233", name: "Kathryn Murp", email: "bockely@att.com", accessLevel: "Super Admin" },
    { id: "#1233", name: "Devon Lane", email: "csilvers@rizon.com", accessLevel: "Admin" },
    { id: "#1233", name: "Foysal Rahman", email: "qamaho@mail.com", accessLevel: "Admin" },
    { id: "#1233", name: "Hari Danang", email: "xterris@gmail.com", accessLevel: "Admin" },
    { id: "#1233", name: "Floyd Miles", email: "xterris@gmail.com", accessLevel: "Admin" },
    { id: "#1233", name: "Eleanor Pena", email: "xterris@gmail.com", accessLevel: "Admin" },
    { id: "#1233", name: "Devon Lane", email: "xterris@gmail.com", accessLevel: "Admin" },
    { id: "#1233", name: "Hari Danang", email: "xterris@gmail.com", accessLevel: "Admin" },
    { id: "#1233", name: "Hari Danang", email: "xterris@gmail.com", accessLevel: "Admin" },
];

export default function AdminTable() {
    const [admins, setAdmins] = useState<Admin[]>(initialAdmins);

    const handleDelete = (index: number) => {
        setAdmins((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEdit = (index: number) => {
        alert(`Edit admin: ${admins[index].name}`);
    };

    return (
        <div className="min-h-screen bg-[#fff0ec] p-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
                {/* Invite Button */}
                <div className="mb-6">
                    <button className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
                        <span className="text-lg leading-none">+</span>
                        Invite new admin
                    </button>
                </div>

                {/* Table */}
                <table className="w-full">
                    <thead>
                        <tr className="text-left">
                            <th className="text-sm font-semibold text-gray-800 pb-4 w-40">SL no.</th>
                            <th className="text-sm font-semibold text-gray-800 pb-4 w-56">Name</th>
                            <th className="text-sm font-semibold text-gray-800 pb-4 w-64">Email</th>
                            <th className="text-sm font-semibold text-gray-800 pb-4 text-center w-48">Has Access to</th>
                            <th className="text-sm font-semibold text-gray-800 pb-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={index} className="border-t border-gray-100">
                                <td className="py-4 text-sm text-gray-500">{admin.id}</td>
                                <td className="py-4 text-sm text-gray-800">{admin.name}</td>
                                <td className="py-4 text-sm text-gray-500">{admin.email}</td>
                                <td className="py-4 text-sm text-gray-800 text-center">{admin.accessLevel}</td>
                                <td className="py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="w-9 h-9 flex items-center justify-center bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </button>
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="w-9 h-9 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                <path d="M10 11v6" />
                                                <path d="M14 11v6" />
                                                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}