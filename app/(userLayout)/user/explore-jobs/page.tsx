"use client";
import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const jobs = [
    {
        id: 1,
        title: "Chef de Parties",
        company: "Cafe Yummy",
        location: "Remote",
        posted: "2 days ago",
        type: "Remote",
        salary: "$120k - $160k",
        avatar: "G",
        avatarColor: "bg-gradient-to-br from-indigo-500 to-purple-600",
    },
    {
        id: 2,
        title: "Chef de Parties",
        company: "Cafe Yummy",
        location: "New York, NY",
        posted: "1 day ago",
        type: "Full-time",
        salary: "$130k - $170k",
        avatar: "M",
        avatarColor: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
        id: 3,
        title: "Chef de Parties",
        company: "Cafe Yummy",
        location: "New York, NY",
        posted: "1 day ago",
        type: "Full-time",
        salary: "$130k - $170k",
        avatar: "M",
        avatarColor: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
        id: 4,
        title: "Chef de Parties",
        company: "Cafe Yummy",
        location: "New York, NY",
        posted: "1 day ago",
        type: "Full-time",
        salary: "$130k - $170k",
        avatar: "M",
        avatarColor: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
];

const typeTagStyle: Record<string, string> = {
    Remote: "bg-green-100 text-green-700",
    "Full-time": "bg-blue-100 text-blue-700",
    "Part-time": "bg-purple-100 text-purple-700",
};

export default function JobSearch() {
    const [activeFilter, setActiveFilter] = useState("All Jobs");
    const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
    const [searchValue, setSearchValue] = useState("");

    const filters = ["All Jobs", "Full-time", "Part-time"];

    const toggleBookmark = (id: number) => {
        setBookmarked((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <div className={`min-h-screen bg-gray-100 p-6 ${inter.className}`}>
            {/* Search Bar */}
            <div className="flex items-center gap-3 mb-5">
                <input
                    type="text"
                    placeholder="Search job"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm shadow-sm outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400"
                />
                <button className="bg-[#FF6041] hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer">
                    Search
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-3 mb-6">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${activeFilter === f
                            ? "bg-[#FF6041] text-white border-[#FF6041]"
                            : "bg-white text-gray-600 border-gray-300 hover:border-orange-400 hover:text-[#FF6041]"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Section Title */}
            <h2 className="text-base font-bold text-gray-900 mb-4">Explore Jobs</h2>

            {/* Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${job.avatarColor}`}
                                >
                                    {job.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                                        {job.title}
                                    </p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <svg
                                            className="w-3 h-3 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v1H4V4zM2 7h16v9a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" />
                                        </svg>
                                        <span className="text-xs text-gray-400">{job.company}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleBookmark(job.id)}
                                className="text-gray-300 hover:text-orange-400 transition-colors mt-0.5 cursor-pointer"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill={bookmarked.has(job.id) ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                </svg>
                                {job.posted}
                            </span>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-auto pt-1">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeTagStyle[job.type] ?? "bg-gray-100 text-gray-600"}`}
                                >
                                    {job.type}
                                </span>
                                <span className="text-xs font-semibold text-gray-700">
                                    {job.salary}
                                </span>
                            </div>
                            <button className="bg-[#FF6041] hover:bg-orange-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer">
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}