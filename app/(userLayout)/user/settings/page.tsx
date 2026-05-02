"use client";
import { JSX, useState } from "react";

type Tab = "feedback" | "support" | "account" | "delete";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<Tab>("feedback");
    const [feedbackText, setFeedbackText] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [deleteEnabled, setDeleteEnabled] = useState(false);
    const [copied, setCopied] = useState(false);

    const supportEmail = "ovie@gmail.com";
    const accountEmail = "lucas@kokgespot.nl";

    const handleCopy = () => {
        navigator.clipboard.writeText(supportEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const navItems: { id: Tab; label: string; icon: JSX.Element }[] = [
        {
            id: "feedback",
            label: "Give feedback",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            id: "support",
            label: "Support",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            id: "account",
            label: "Account details",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            id: "delete",
            label: "Delete account",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center py-10 px-4">
            <div className="flex gap-4 w-full">
                {/* Sidebar */}
                <div className="bg-white rounded-2xl shadow-sm p-3 w-52 flex-shrink-0 h-fit">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors text-left ${activeTab === item.id
                                ? "bg-gray-100 text-blue-900 font-semibold"
                                : "text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            <span className={activeTab === item.id ? "text-blue-900" : "text-gray-400"}>
                                {item.icon}
                            </span>
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Give Feedback */}
                    {activeTab === "feedback" && (
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-lg font-bold text-gray-900">Give Feedback</h2>
                            <p className="text-sm text-gray-500 mt-1 mb-6">
                                Help us improve your experience by sharing your thoughts.
                            </p>
                            <hr className="border-gray-100 mb-6" />
                            <label className="block text-sm font-semibold text-gray-800 mb-3">
                                Your Feedback
                            </label>
                            <textarea
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                placeholder="Write your feedback here..."
                                rows={3}
                                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none resize-none focus:ring-2 focus:ring-orange-200"
                            />
                            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
                                Submit Feedback
                            </button>
                        </div>
                    )}

                    {/* Support */}
                    {activeTab === "support" && (
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-lg font-bold text-gray-900">Request contact</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Need help? We&apos;re here for you. You can contact on{" "}
                                <a
                                    href={`mailto:${supportEmail}`}
                                    className="text-blue-700 font-semibold hover:underline"
                                >
                                    {supportEmail}
                                </a>
                                .{" "}
                                <button
                                    onClick={handleCopy}
                                    title="Copy email"
                                    className="inline-flex items-center ml-1 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {copied ? (
                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </p>
                        </div>
                    )}

                    {/* Account Details */}
                    {activeTab === "account" && (
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-lg font-bold text-gray-900">Email & Password</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Your account email:{" "}
                                <span className="text-blue-700 font-semibold">{accountEmail}</span>
                            </p>
                            <div className="flex gap-3 mt-4 mb-8">
                                <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                                    Change Email
                                </button>
                                <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                                    Connect With Google
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Enter your current password"
                                        className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter your new password"
                                        className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-200"
                                    />
                                </div>
                            </div>

                            <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
                                Update password
                            </button>
                        </div>
                    )}

                    {/* Delete Account */}
                    {activeTab === "delete" && (
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Delete Account</h2>
                                    <p className="text-sm text-gray-500 mt-1 mb-6">
                                        Deleting your account is permanent. All your data will be removed and cannot be recovered.
                                    </p>
                                    <button
                                        disabled={!deleteEnabled}
                                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete Account
                                    </button>
                                </div>
                                {/* Toggle */}
                                <button
                                    onClick={() => setDeleteEnabled(!deleteEnabled)}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors flex-shrink-0 ${deleteEnabled ? "bg-blue-900" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${deleteEnabled ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}