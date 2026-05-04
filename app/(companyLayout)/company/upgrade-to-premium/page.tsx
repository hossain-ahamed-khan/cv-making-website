"use client";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Free",
        description: "Perfect for creating your first professional CV.",
        price: "$0",
        period: null,
        features: [
            "Get up to 3 CVs",
            "Basic candidate access",
            "Standard profile view",
            "Limited search access",
        ],
        cta: "Start for free",
        popular: false,
        dark: false,
    },
    {
        name: "Pro",
        description: "Advanced features for serious Users.",
        price: "$9",
        period: "/mo",
        features: [
            "Get up to 100 CVs",
            "Access to Top-rated candidates",
            "Filter by experience & skills",
            "Priority listing in search",
            "Email support",
        ],
        cta: "Get Pro",
        popular: true,
        dark: true,
    },
    {
        name: "Premium",
        description: "AI-powered tools to land your dream job faster.",
        price: "$19",
        period: "/mo",
        features: [
            "Get up to 1000 CVs",
            "Access to market-standard professionals",
            "Advanced filters",
            "Dedicated support",
            "Early access to new candidates",
        ],
        cta: "Get Premium",
        popular: false,
        dark: false,
    },
];

export default function PricingSection() {
    return (
        <section className="min-h-screen bg-[#fff0ec] flex flex-col items-center px-6 py-20">
            {/* Header */}
            <div className="text-center mb-14">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                    Simple, transparent pricing
                </h1>
                <p className="text-gray-500 text-lg">
                    Start for free, upgrade when you need more power. No hidden fees.
                </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-5xl">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative flex flex-col rounded-3xl p-6 w-full max-w-xs min-h-120 h-full shadow-md ${plan.dark
                            ? "bg-[#2b2b2b] text-white"
                            : "bg-white text-gray-900"
                            }`}
                    >
                        {/* Most Popular Badge */}
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <span className="bg-orange-400 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        {/* Plan Name & Description */}
                        <h2
                            className={`text-2xl font-bold mb-2 ${plan.dark ? "text-white" : "text-gray-900"
                                }`}
                        >
                            {plan.name}
                        </h2>
                        <p
                            className={`text-sm mb-6 ${plan.dark ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            {plan.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-end gap-1 mb-6">
                            <span
                                className={`text-5xl font-extrabold leading-none ${plan.dark ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                {plan.price}
                            </span>
                            {plan.period && (
                                <span
                                    className={`text-base mb-2 ${plan.dark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    {plan.period}
                                </span>
                            )}
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3">
                                    <Check
                                        className={`w-4 h-4 flex-shrink-0 ${plan.dark ? "text-orange-400" : "text-orange-400"
                                            }`}
                                        strokeWidth={3}
                                    />
                                    <span
                                        className={`text-sm ${plan.dark ? "text-gray-300" : "text-gray-600"
                                            }`}
                                    >
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                            className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${plan.popular
                                ? "bg-[#f05a3a] hover:bg-[#e04a2a] text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-[#f05a3a]"
                                }`}
                        >
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}