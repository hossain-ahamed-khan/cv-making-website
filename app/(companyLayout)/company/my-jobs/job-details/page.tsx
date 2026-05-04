"use client";
import React from "react";

const JobListing: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm">
                {/* Banner */}
                <div className="h-32 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />

                {/* Header */}
                <div className="px-6 pb-4 border-b border-gray-100">
                    <div className="flex items-start justify-between -mt-8">
                        <div className="flex items-end gap-4">
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                                JD
                            </div>
                            <div className="pb-1">
                                <h1 className="text-xl font-bold text-gray-900">Cafe de Parties</h1>
                                <div className="flex items-center gap-1 text-gray-500 text-sm mt-0.5">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                                        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeWidth="2" />
                                    </svg>
                                    <span>PizzaBurg</span>
                                </div>
                            </div>
                        </div>
                        <button className="mt-10 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
                            Apply Now
                        </button>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            San Francisco, CA
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            john.doe@email.com
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +1 (555) 123-4567
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            linkedin.com/in/johndoe
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            johndoe.dev
                        </span>
                    </div>
                </div>

                {/* About This Role */}
                <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900 mb-2">About This Role</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        We are looking for an experienced and passionate Head Chef to lead our kitchen operations. You will be responsible for managing the culinary team, maintaining food quality standards, and creating innovative menus that enhance customer satisfaction.
                    </p>
                </div>

                {/* Key Responsibilities */}
                <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900 mb-3">Key Responsibilities</h2>
                    <ul className="space-y-1.5">
                        {[
                            "Oversee daily kitchen operations",
                            "Manage and train kitchen staff",
                            "Design and update menus",
                            "Ensure food quality and presentation standards",
                            "Maintain hygiene and safety regulations",
                            "Control food costs and inventory",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 divide-x divide-gray-100 px-0">
                    {[
                        { label: "Salary & Benefits", value: "€2500 – €2600 per month" },
                        { label: "Working Hours", value: "8–10 hours/day" },
                        { label: "Contract Duration", value: "2 years" },
                        { label: "Weekly Off:", value: "1 day" },
                    ].map((card) => (
                        <div key={card.label} className="px-6 py-5">
                            <p className="text-sm font-semibold text-gray-900 mb-1">{card.label}</p>
                            <p className="text-sm text-gray-500">{card.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobListing;