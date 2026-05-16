import { AppSidebar } from "@/components/user/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="flex-1 w-full">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default AdminLayout;