"use client";

import { Bell, Users, Briefcase, DollarSign, UserCog } from "lucide-react";

const statsData = [
    {
        icon: Bell,
        value: "1320",
        label: "Active Users Today",
        iconColor: "text-[#22C55E]",
    },
    {
        icon: UserCog,
        value: "8",
        label: "New Users (Last 7 Days)",
        iconColor: "text-[#F59E0B]",
    },
    {
        icon: Users,
        value: "41",
        label: "Total Company",
        iconColor: "text-[#2563EB]",
    },
    {
        icon: Briefcase,
        value: "41",
        label: "Total Paying Company",
        iconColor: "text-[#F59E0B]",
    },
    {
        icon: DollarSign,
        value: "$500",
        label: "Monthly Revenue",
        iconColor: "text-[#F59E0B]",
    },
];

export default function CompanyHomePage() {
    return (
        <div className="min-h-screen bg-[#EFE2DF] p-4 md:p-6">
            {/* Greeting Section */}
            <div className="mb-4 rounded-2xl bg-[#F3F4F6] p-4 md:p-6">
                <p className="mb-1 text-xs text-gray-600">Hi, 👋 Good Morning</p>
                <h1 className="text-xl font-bold text-gray-900">Moni Roy</h1>
            </div>

            {/* User's Overview Section */}
            <div className="rounded-2xl bg-[#F8FAFC] p-4 md:p-6">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">User&apos;s Overview</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-[#E5E7EB] p-6"
                        >
                            <stat.icon className={`mb-5 h-7 w-7 ${stat.iconColor}`} />
                            <div className="mb-1 text-3xl font-bold text-gray-800">{stat.value}</div>
                            <div className="text-lg text-gray-700">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}