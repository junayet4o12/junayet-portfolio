import { ReactNode } from "react";


export default function DashboardLayout({ children }: {children: ReactNode}) {
    return (
        <div>
            <header>Navbar</header>
            {children}
        </div>
    );
}