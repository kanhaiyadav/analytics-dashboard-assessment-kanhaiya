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

const Sidebar = ({ active, setActive }: {
    active: number;
    setActive: (index: number) => void;
}) => {

    const handleClick = (index: number) => {
        setActive(index);
    }
    
    return (
        <div className="flex flex-col gap-8 items-center border-r-2 border-muted  z-[1000]">
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

                        <p className="p-2 rounded-lg hidden group-hover:block bg-[#261e35] border-1 border-foreground absolute left-[70px] top-[50%] -translate-y-1/2 text-foreground shadow-[0_0_10px_0_rgba(0,0,0,0.7)]">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
