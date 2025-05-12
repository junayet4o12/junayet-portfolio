import Sidebar from "@/components/dashboard/sidebar";
import { ReactNode } from "react";


export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
          <div className="px-8 py-8 flex-1">
                {children}
          </div>
        </div>
    );
}