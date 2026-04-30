"use client";
import Link from "next/link";
import Image from "next/image";
import mainLogo2 from "@/public/images/main-logo-2.png";
import {
    Gem,
    Search,
    User,
    Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
    {
        title: "Profile",
        url: "/company",
        icon: User,
    },
    {
        title: "Search Talent",
        url: "/company/search-talent",
        icon: Search,
    },
    {
        title: "Talent pool",
        url: "/company/talent-pool",
        icon: Users,
    },
    {
        title: "Upgrade to Premium",
        url: "/company/upgrade-to-premium",
        icon: Gem,
    },
] as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar
            {...props}
            className="border-r-0 bg-[#25272d]"
            style={{ backgroundColor: "#25272d" }}
        >
            <SidebarHeader className="px-6 py-8 bg-[#25272d]" style={{ backgroundColor: "#25272d" }}>
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

            <SidebarContent className="px-4 pb-6 bg-[#25272d]" style={{ backgroundColor: "#25272d" }}>
                <SidebarMenu className="space-y-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.url;
                        const Icon = item.icon;

                        return (
                            <SidebarMenuItem key={item.title} className="relative overflow-visible">
                                {isActive ? (
                                    <span className="absolute -left-4 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-full bg-[#ff6a3d]" />
                                ) : null}
                                <Link
                                    href={item.url}
                                    className={`flex items-center gap-4 rounded-md px-4 py-3 text-base leading-none transition-colors ${isActive
                                        ? "bg-[#ff5f3b] text-white"
                                        : "text-[#f3f4f6] hover:bg-[#2f323b]"
                                        }`}
                                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                                >
                                    <Icon className="h-5 w-5 shrink-0" strokeWidth={2.2} />
                                    <span className="font-semibold tracking-tight">{item.title}</span>
                                </Link>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
