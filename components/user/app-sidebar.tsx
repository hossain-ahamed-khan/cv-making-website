"use client";
import Link from "next/link";
import Image from "next/image";
import mainLogo2 from "@/public/images/main-logo-2.png";
import {
    BriefcaseBusiness,
    ChevronDown,
    Crosshair,
    Settings,
    User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
    {
        title: "Profile",
        url: "/user/profile",
        icon: User,
    },
    {
        title: "Explore Jobs",
        url: "/user/explore-jobs",
        icon: BriefcaseBusiness,
    },
    {
        title: "Job Tracker",
        url: "/user/job-tracker",
        icon: Crosshair,
    },
] as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar
            {...props}
            className="border-r-0 bg-transparent p-3"
            style={{ backgroundColor: "transparent" }}
        >
            <div className="flex h-full flex-col rounded-2xl border border-[#3a3d46] bg-[#25272d] text-[#f3f4f6]">
                <SidebarHeader className="px-6 py-8">
                    <div className="flex flex-col items-center">
                        <Image
                            src={mainLogo2}
                            alt="Commi"
                            width={120}
                            height={40}
                            className="h-auto w-[120px]"
                            priority
                        />
                    </div>
                </SidebarHeader>

                <SidebarContent className="px-4 pb-4">
                    <SidebarMenu className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.url;
                            const Icon = item.icon;

                            return (
                                <SidebarMenuItem key={item.title} className="relative overflow-visible">
                                    <Link
                                        href={item.url}
                                        className={`flex items-center gap-3 rounded-md px-4 py-3 text-base leading-none transition-colors ${isActive
                                            ? "bg-[#2f323b] text-white"
                                            : "text-[#f3f4f6] hover:bg-[#2f323b]"
                                            }`}
                                        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                                    >
                                        <Icon className="h-5 w-5 shrink-0" strokeWidth={2.2} />
                                        <span className="font-medium">{item.title}</span>
                                    </Link>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter className="mt-auto px-4 pb-4">
                    <button
                        type="button"
                        className="mb-3 w-full rounded-md border border-[#8b8d93] px-4 py-2 text-left text-base font-medium text-[#f3f4f6] transition-colors hover:bg-[#2f323b]"
                    >
                        <span className="inline-flex items-center gap-3">
                            <Settings className="h-4 w-4" strokeWidth={2.2} />
                            Settings
                        </span>
                    </button>

                    <button
                        type="button"
                        className="w-full rounded-lg border border-[#50545e] px-3 py-2 text-left transition-colors hover:bg-[#2f323b]"
                    >
                        <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#f59f84] to-[#8a5fe2] text-xs font-semibold text-white">
                                MR
                            </span>
                            <span className="flex flex-1 flex-col">
                                <span className="text-sm font-semibold leading-tight">Moni Roy</span>
                                <span className="text-xs leading-tight text-[#c4c7ce]">User</span>
                            </span>
                            <ChevronDown className="h-4 w-4 text-[#d8d9de]" strokeWidth={2.2} />
                        </span>
                    </button>
                </SidebarFooter>
            </div>

            <SidebarRail />
        </Sidebar>
    );
}
