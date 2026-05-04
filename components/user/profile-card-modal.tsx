"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, X } from "lucide-react";

type ProfileCardModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function ProfileCardModal({ isOpen, onClose }: ProfileCardModalProps) {

    const [activeView, setActiveView] = useState<
        "menu" | "account" | "password"
    >("menu");

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            role="dialog"
            aria-modal="true"
            aria-label={
                activeView === "account"
                    ? "Account settings"
                    : activeView === "password"
                        ? "Password change"
                        : "Profile menu"
            }
        >
            {activeView === "account" ? (
                <AccountSettingModal
                    onBack={() => setActiveView("menu")}
                    onClose={onClose}
                />
            ) : activeView === "password" ? (
                <PasswordChangeModal
                    onBack={() => setActiveView("menu")}
                    onClose={onClose}
                />
            ) : (
                <div className="relative w-full max-w-[680px] rounded-2xl bg-white px-10 py-8 shadow-md">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" strokeWidth={2} />
                    </button>

                    <div className="mb-6 flex items-center gap-4">
                        <Image
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="Ovie Rahaman"
                            width={80}
                            height={80}
                            className="h-20 w-20 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-2">
                            <span className="text-2xl font-bold text-gray-900">Ovie Rahaman</span>
                            <span className="w-fit rounded-full bg-[#FF6041] px-4 py-1 text-sm font-medium text-white">
                                User
                            </span>
                        </div>
                    </div>

                    <hr className="mb-2 border-gray-200" />

                    <div className="flex flex-col divide-y divide-gray-100">
                        <button
                            type="button"
                            onClick={() => setActiveView("account")}
                            className="flex w-full items-center justify-between py-5 text-left cursor-pointer"
                        >
                            <span className="text-lg font-bold text-gray-900">Profile</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveView("password")}
                            className="flex w-full items-center justify-between py-5 text-left cursor-pointer"
                        >
                            <span className="text-lg font-bold text-gray-900">Change Password</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="flex w-full items-center justify-between py-5 text-left cursor-pointer"
                        >
                            <span className="text-lg font-bold text-gray-900">My Jobs</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="mt-4 w-full rounded-full bg-[#FF6041] py-4 text-lg font-semibold text-white transition-colors hover:bg-orange-500"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

type AccountSettingModalProps = {
    onClose?: () => void;
    onBack?: () => void;
    onSave?: (data: AccountSettingFormData) => void;
};

type AccountSettingFormData = {
    name: string;
    email: string;
    phone: string;
    role: string;
    image: File | null;
};

function AccountSettingModal({ onBack, onClose, onSave }: AccountSettingModalProps) {
    const [formData, setFormData] = useState<AccountSettingFormData>({
        name: "Ovie Rahaman Sheikh",
        email: "ovierahaman1@gmail.com",
        phone: "+88084454556444",
        role: "Admin",
        image: null,
    });

    const [imageName, setImageName] = useState("Choose image");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, image: file }));
        setImageName(file ? file.name : "Choose image");
    };

    const handleSave = () => {
        onSave?.(formData);
    };

    return (
        <div className="relative w-[660px] rounded-2xl bg-white px-10 py-8 shadow-md">
            <div className="absolute left-4 top-4 flex items-center gap-2">
                <button
                    onClick={onBack}
                    className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100"
                    type="button"
                    aria-label="Back"
                >
                    <ArrowLeft className="h-5 w-5" strokeWidth={2} />
                </button>
            </div>
            <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                type="button"
                aria-label="Close"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.293 13.293a1 1 0 01-1.414 1.414L12 13.414l-2.879 2.893a1 1 0 01-1.414-1.414L10.586 12 7.707 9.121a1 1 0 011.414-1.414L12 10.586l2.879-2.879a1 1 0 011.414 1.414L13.414 12l2.879 2.893z" />
                </svg>
            </button>

            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
                Account Setting
            </h2>

            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                    <label className="w-24 shrink-0 text-base font-bold text-gray-900">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none focus:ring-2 focus:ring-[#FF6041]"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-24 shrink-0 text-base font-bold text-gray-900">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none focus:ring-2 focus:ring-[#FF6041]"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-24 shrink-0 text-base font-bold text-gray-900">
                        Phone
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none focus:ring-2 focus:ring-[#FF6041]"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-24 shrink-0 text-base font-bold text-gray-900">
                        Role
                    </label>
                    <div className="relative flex-1">
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-400 outline-none focus:ring-2 focus:ring-[#FF6041]"
                        >
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                            <option value="Manager">Manager</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-24 shrink-0 text-base font-bold text-[#FF6041]">
                        Image
                    </label>
                    <div className="flex flex-1 items-center overflow-hidden rounded-lg border border-gray-300">
                        <span className="flex-1 truncate px-4 py-3 text-base text-gray-400">
                            {imageName}
                        </span>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-gray-200 px-5 py-3 text-base font-bold text-gray-900 transition-colors hover:bg-gray-300"
                            type="button"
                        >
                            Choose
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 flex gap-4">
                <button
                    onClick={onClose}
                    className="flex-1 rounded-lg border border-[#FF6041] py-4 text-base font-semibold text-[#FF6041] transition-colors hover:bg-orange-50"
                    type="button"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="flex-1 rounded-lg bg-[#FF6041] py-4 text-base font-semibold text-white transition-colors hover:bg-orange-500"
                    type="button"
                >
                    Save
                </button>
            </div>
        </div>
    );
}

type PasswordChangeModalProps = {
    onClose?: () => void;
    onBack?: () => void;
    onUpdate?: (data: {
        oldPassword: string;
        newPassword: string;
        reTypeNewPassword: string;
    }) => void;
};

function PasswordChangeModal({ onBack, onClose, onUpdate }: PasswordChangeModalProps) {
    const [formData, setFormData] = useState({
        oldPassword: "123ADMIN@#@",
        newPassword: "",
        reTypeNewPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        onUpdate?.(formData);
    };

    return (
        <div className="relative w-[620px] rounded-2xl bg-white px-10 py-8 shadow-md">
            <div className="absolute left-4 top-4 flex items-center gap-2">
                <button
                    onClick={onBack}
                    className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100"
                    type="button"
                    aria-label="Back"
                >
                    <ArrowLeft className="h-5 w-5" strokeWidth={2} />
                </button>
            </div>
            <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                type="button"
                aria-label="Close"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.293 13.293a1 1 0 01-1.414 1.414L12 13.414l-2.879 2.893a1 1 0 01-1.414-1.414L10.586 12 7.707 9.121a1 1 0 011.414-1.414L12 10.586l2.879-2.879a1 1 0 011.414 1.414L13.414 12l2.879 2.893z" />
                </svg>
            </button>

            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
                Password Change
            </h2>

            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                    <label className="w-44 shrink-0 text-base font-bold text-gray-900">
                        Old Password
                    </label>
                    <input
                        type="text"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none focus:ring-2 focus:ring-[#FF6041]"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-44 shrink-0 text-base font-bold text-gray-900">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="* * * * * * * * *"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none placeholder:tracking-widest placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF6041]"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-44 shrink-0 text-base font-bold text-gray-900">
                        Re Type New Password
                    </label>
                    <input
                        type="password"
                        name="reTypeNewPassword"
                        value={formData.reTypeNewPassword}
                        onChange={handleChange}
                        placeholder="* * * * * * * * *"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none placeholder:tracking-widest placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF6041]"
                    />
                </div>
            </div>

            <div className="mt-8 flex gap-4">
                <button
                    onClick={onClose}
                    className="flex-1 rounded-lg border border-[#FF6041] py-4 text-base font-semibold text-[#FF6041] transition-colors hover:bg-orange-50"
                    type="button"
                >
                    Cancel
                </button>
                <button
                    onClick={handleUpdate}
                    className="flex-1 rounded-lg bg-[#FF6041] py-4 text-base font-semibold text-white transition-colors hover:bg-orange-500"
                    type="button"
                >
                    Update
                </button>
            </div>
        </div>
    );
}
