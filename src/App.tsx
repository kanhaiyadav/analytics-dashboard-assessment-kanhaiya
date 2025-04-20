import React from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import Sidebar from "./components/ui/sidebar";
import Overview from "./components/overview/Overview";

export function App() {

    const [active, setActive] = React.useState(0);
    
    return (
        <>
            <Sidebar active={active} setActive={setActive} />
            {
                active === 0 && <Dashboard />
            }
            {
                active === 1 && <Overview />
            }
            {
                active === 2 && <div>Settings</div>
            }
        </>
    );
}
