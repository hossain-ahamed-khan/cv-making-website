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
                    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-[#F3F4F6] px-4 md:px-8">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <AdminBreadcrumb />
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