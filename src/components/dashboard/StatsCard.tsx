import React from "react";

const StatsCard = ({
    title,
    value,
    icon,
}: {
    title: string;
    value: string;
    icon: React.ReactElement;
}) => {
    return (
        <div>
            <div className="flex items-center justify-between p-4 glass shadow-card">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        {icon}
                        <h3 className="text-lg font-semibold text-muted-foreground">{title}</h3>
                    </div>
                    <p className="font-semibold text-3xl">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
