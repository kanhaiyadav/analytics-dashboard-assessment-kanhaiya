import React from "react";
import { SquareKanban, LayoutDashboard, Settings } from "lucide-react";

const sidebarItems = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Overview",
        icon: SquareKanban,
    },
    {
        label: "Settings",
        icon: Settings,
    },
]

const Sidebar = () => {

    const [active, setActive] = React.useState(0);
    const handleClick = (index: number) => {
        setActive(index);
    }
    
    return (
        <div className="flex flex-col gap-8 items-center border-r-2 border-muted">
            <div className="p-4">
                <img
                    src="/me.png"
                    alt=""
                    width={40}
                    className="border-2 border-foreground rounded-full"
                />
            </div>
            <div className="p-2 flex flex-col gap-3">
                {sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        className={`p-3 hover:bg-accent w-fit rounded-lg relative group ${index === active ? "bg-accent" : ""}`}
                        onClick={() => handleClick(index)}
                    >
                        <item.icon className="text-foreground cursor-pointer" />

                        <p className="p-2 rounded-lg hidden group-hover:block bg-accent absolute left-[70px] top-[50%] -translate-y-1/2 text-foreground">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
