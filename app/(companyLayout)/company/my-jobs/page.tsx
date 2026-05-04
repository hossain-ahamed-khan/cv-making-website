"use client";
import Link from "next/link";
import { useState } from "react";

interface Job {
    id: number;
    title: string;
    company: string;
    type: string;
    location: string;
    postedAgo: string;
    salaryMin: string;
    salaryMax: string;
    logo: string;
}

const jobs: Job[] = [
    {
        id: 1,
        title: "Cheft de Parties",
        company: "PizzaBurg",
        type: "Full-time",
        location: "Russia",
        postedAgo: "1 day ago",
        salaryMin: "$130k",
        salaryMax: "$170k",
        logo: "M",
    },
    {
        id: 2,
        title: "Cheft de Parties",
        company: "PizzaBurg",
        type: "Full-time",
        location: "Russia",
        postedAgo: "1 day ago",
        salaryMin: "$130k",
        salaryMax: "$170k",
        logo: "M",
    },
];

export default function MyJobs() {
    const [search, setSearch] = useState("");

    const filtered = jobs.filter(
        (j) =>
            j.title.toLowerCase().includes(search.toLowerCase()) ||
            j.company.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-xl font-bold text-gray-900 mb-4">My Jobs</h1>

            {/* Search Bar */}
            <div className="flex gap-3 mb-6 bg-white rounded-lg shadow-sm px-4 py-2 items-center">
                <input
                    type="text"
                    placeholder="Search job"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 text-sm text-gray-500 outline-none bg-transparent py-2"
                />
                <button className="bg-[#FF6041] hover:bg-orange-500 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
                    Search
                </button>
            </div>

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((job) => (
                    <Link
                        key={job.id}
                        href="/company/my-jobs/job-details"
                        className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3 transition-shadow hover:shadow-md"
                        aria-label={`View ${job.title} job details`}
                    >
                        {/* Top Row */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                {/* Logo */}
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {job.logo}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{job.title}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {job.company}
                                    </div>
                                </div>
                            </div>
                            {/* Badge */}
                            <span className="bg-blue-100 text-blue-500 text-xs font-medium px-2.5 py-1 rounded-full">
                                {job.type}
                            </span>
                        </div>

                        {/* Location & Time */}
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {job.postedAgo}
                            </div>
                        </div>

                        {/* Salary & View */}
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-semibold text-gray-800">
                                {job.salaryMin} - {job.salaryMax}
                            </span>
                            <span className="bg-[#FF6041] hover:bg-orange-500 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors">
                                View
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}