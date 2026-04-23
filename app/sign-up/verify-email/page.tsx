"use client";
import { useState } from "react";
import loginImage1 from "@/public/images/auth-image-1.png";
import mainLogo from "@/public/images/main-logo.png";
import Image from "next/image";
import Link from "next/link";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyOTPPage() {
    const [otp, setOtp] = useState("");

    return (
        <div className="flex h-screen w-full bg-gray-50 font-sans">
            {/* Left Side — Image */}
            <div className="hidden lg:flex w-1/2 p-6 items-stretch">
                <div className="relative w-full rounded-2xl overflow-hidden bg-gray-200">
                    <Image
                        src={loginImage1}
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
                        Enter Emailed Verification Code
                    </h1>

                    {/* OTP */}
                    <div className="mb-6">
                        <InputOTP
                            value={otp}
                            onChange={(value) => setOtp(value.replace(/\D/g, "").slice(0, 6))}
                            maxLength={6}
                            pattern="^[0-9]*$"
                            containerClassName="justify-center"
                        >
                            <InputOTPGroup className="gap-3">
                                <InputOTPSlot index={0} className="size-12! rounded-xl border-2 border-gray-400 bg-white text-xl font-semibold text-gray-800 shadow-sm" />
                                <InputOTPSlot index={1} className="size-12! rounded-xl border-2 border-gray-400 bg-white text-xl font-semibold text-gray-800 shadow-sm" />
                                <InputOTPSlot index={2} className="size-12! rounded-xl border-2 border-gray-400 bg-white text-xl font-semibold text-gray-800 shadow-sm" />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup className="gap-3">
                                <InputOTPSlot index={3} className="size-12! rounded-xl border-2 border-gray-400 bg-white text-xl font-semibold text-gray-800 shadow-sm" />
                                <InputOTPSlot index={4} className="size-12! rounded-xl border-2 border-gray-400 bg-white text-xl font-semibold text-gray-800 shadow-sm" />
                                <InputOTPSlot index={5} className="size-12! rounded-xl border-2 border-gray-400 bg-white text-xl font-semibold text-gray-800 shadow-sm" />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <Link href="/">
                        <button className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm transition shadow-sm cursor-pointer mt-8">
                            Submit
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}