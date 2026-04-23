"use client";
import { useState } from "react";
import loginImage2 from "@/public/images/auth-image-2.png";
import mainLogo from "@/public/images/main-logo.png";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState("employee");
    const [agreed, setAgreed] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="flex h-screen w-full bg-gray-50 font-sans">
            {/* Left Side — Image */}
            <div className="hidden lg:flex w-1/2 p-6 items-stretch">
                <div className="relative w-full rounded-2xl overflow-hidden bg-gray-200">
                    <Image
                        src={loginImage2}
                        alt="Login Image"
                        fill
                        sizes="50vw"
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Right Side — Sign Up Form */}
            <div
                className="flex flex-1 flex-col items-center justify-center px-8"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, #e8f6ff 0%, #d8effc 20%, #e4f3fb 45%, #eff8fd 65%, #f5fafd 85%, #f8fbfe 100%)",
                }}
            >
                <div className="w-full max-w-lg">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-6">
                        <Image
                            src={mainLogo}
                            alt="Main Logo"
                            width={240}
                            height={240}
                        />
                    </div>

                    {/* Heading */}
                    <h1 className="text-center text-2xl font-semibold text-gray-800 mb-1">
                        Create your free account
                    </h1>
                    <p className="text-center text-sm text-gray-500 mb-5">
                        Tell us who you are:
                    </p>

                    {/* Role Toggle */}
                    <div className="flex rounded-lg border border-gray-200 bg-white overflow-hidden mb-5 shadow-sm">
                        <button
                            type="button"
                            onClick={() => setRole("employee")}
                            className={`flex-1 py-2.5 text-sm font-semibold transition ${role === "employee"
                                ? "bg-blue-900 text-white"
                                : "bg-white text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            Employee
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("company")}
                            className={`flex-1 py-2.5 text-sm font-semibold transition ${role === "company"
                                ? "bg-blue-900 text-white"
                                : "bg-white text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            Company
                        </button>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address here"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Enter your password again"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                            >
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start gap-2 mb-5">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-orange-500 cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-500 cursor-pointer">
                            By continuing, I agree to the{" "}
                            <span className="text-gray-700 underline cursor-pointer hover:text-orange-500 transition">
                                Terms &amp; Conditions
                            </span>{" "}
                            and{" "}
                            <span className="text-gray-700 underline cursor-pointer hover:text-orange-500 transition">
                                Privacy Policy
                            </span>
                        </label>
                    </div>

                    {/* Sign Up Button */}
                    <Link href="/sign-up/verify-email">
                        <button className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm transition shadow-sm cursor-pointer">
                            Sign Up
                        </button>
                    </Link>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="text-xs text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    {/* Sign In */}
                    <p className="text-center text-sm text-gray-500 mb-3">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-blue-600 hover:text-orange-500 transition cursor-pointer">
                            Sign in
                        </Link>
                    </p>

                    {/* Google */}
                    <button className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-700 font-medium transition shadow-sm cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                            <path fill="#4285F4" d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h13.1c-.6 3-2.3 5.5-4.8 7.2v6h7.7c4.5-4.2 7.1-10.3 7.1-17.5z" />
                            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.3 0-11.6-4.2-13.5-9.9H2.5v6.2C6.5 42.8 14.7 48 24 48z" />
                            <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6v-6.2H2.5C.9 16.4 0 20.1 0 24s.9 7.6 2.5 10.8l8-6.2z" />
                            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.5 0 24 0 14.7 0 6.5 5.2 2.5 13.2l8 6.2C12.4 13.7 17.7 9.5 24 9.5z" />
                        </svg>
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
}