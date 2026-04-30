import { AppSidebar } from "@/components/company/app-sidebar"
import { AdminBreadcrumb } from "@/components/company/admin-breadcrumb"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { Inter } from "next/font/google"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

const inter = Inter({ subsets: ["latin"] })


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={inter.className}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-20 shrink-0 items-center justify-between border-b bg-[#F3F4F6] px-4 md:px-8">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <AdminBreadcrumb />
                        </div>

                        <div className="hidden items-center gap-4 rounded-xl border border-gray-200 bg-[#F1F2F4] px-4 py-1 my-1 sm:flex">
                            <Image
                                src="/images/auth-image-1.png"
                                alt="Moni Roy"
                                width={44}
                                height={44}
                                className="h-11 w-11 rounded-full object-cover"
                            />
                            <div className="leading-tight">
                                <p className="text-lg font-semibold text-gray-700">Moni Roy</p>
                                <p className="text-base text-gray-500">Super Admin</p>
                            </div>
                            <button
                                type="button"
                                aria-label="Open profile menu"
                                className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-500"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    </header>
                    <main className="flex-1 w-full">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default AdminLayout;