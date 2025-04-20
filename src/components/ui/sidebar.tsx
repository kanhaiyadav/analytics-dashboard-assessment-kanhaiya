import { SquareKanban, LayoutDashboard, Settings } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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
];

const Sidebar = ({
    active,
    setActive,
}: {
    active: number;
    setActive: (index: number) => void;
}) => {
    const handleClick = (index: number) => {
        setActive(index);
    };

    return (
        <div className="flex flex-col gap-8 items-center border-r-2 border-muted  z-[1000]">
            <Dialog>
                <DialogTrigger>
                    <div className="p-4">
                        <img
                            src="/me.png"
                            alt=""
                            width={40}
                            className="border-2 border-foreground rounded-full"
                        />
                    </div>
                </DialogTrigger>
                <DialogContent className="glass flex flex-col items-center w-[450px]">
                    <img
                        src="/me.png"
                        alt=""
                        width={200}
                        className="border-2 border-foreground rounded-full"
                    />
                    <DialogHeader>
                        <DialogTitle>
                            <div className="text-center">
                                <p className="text-normal text-[16px] mb-1">
                                    Hey there, I am
                                </p>
                                <h1 className="text-2xl font-semibold text-center">
                                    Kanhaiya Yadav
                                </h1>
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            <p className="text-center">
                                I am the one who created this dashboard, for the
                                first round assessment of Summer Internship at
                                Jadavpur University.
                            </p>
                            <div className="flex flex-col items-center mt-2">
                                <p>
                                    Contact no:{" "}
                                    <span className="text-white">
                                        7439466535
                                    </span>
                                </p>
                                <p>
                                    Personal Email:{" "}
                                    <span className="underline underline-offset-2 text-blue-300">
                                        kanhaiyadav.me@gmail.com
                                    </span>
                                </p>
                                <p>
                                    Portfolio:{" "}
                                    <a
                                        href="/https://kanhaiya.me"
                                        className="underline underline-offset-2 text-blue-300"
                                    >
                                        https://kanhaiya.me
                                    </a>
                                </p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className="p-2 flex flex-col gap-3">
                {sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        className={`p-3 hover:bg-accent w-fit rounded-lg relative group ${
                            index === active ? "bg-accent" : ""
                        }`}
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
