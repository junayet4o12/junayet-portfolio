import Sidebar from "@/components/dashboard/sidebar";
import { ReactNode } from "react";


export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex gap-5">
            <Sidebar />
          <div>
                <header>Navbar</header>
                {children}
                <footer>footer</footer>
          </div>
        </div>
    );
}