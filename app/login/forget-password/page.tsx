"use client";
import { useState } from "react";
import loginImage3 from "@/public/images/auth-image-3.png";
import mainLogo from "@/public/images/main-logo.png";
import Image from "next/image";
import Link from "next/link";

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState("");

    return (
        <div className="flex h-screen w-full bg-gray-50 font-sans">
            {/* Left Side — Image */}
            <div className="hidden lg:flex w-1/2 p-6 items-stretch">
                <div className="relative w-full rounded-2xl overflow-hidden bg-gray-200">
                    <Image
                        src={loginImage3}
                        alt="Login Image"
                        fill
                        sizes="50vw"
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Right Side — Login Form */}
            <div
                className="flex flex-1 flex-col items-center justify-center px-8"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, #e8f6ff 0%, #d8effc 20%, #e4f3fb 45%, #eff8fd 65%, #f5fafd 85%, #f8fbfe 100%)",
                }}
            >
                <div className="w-full max-w-lg">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="mb-2">
                            <Image
                                src={mainLogo}
                                alt="Main Logo"
                                width={240}
                                height={240}
                            />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-center text-xl font-semibold text-gray-800 mb-6">
                        Reset your password
                    </h1>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    <Link href="/login/forget-password/verify-otp">
                        <button className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm transition shadow-sm cursor-pointer mt-8">
                            Request Password Change
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}