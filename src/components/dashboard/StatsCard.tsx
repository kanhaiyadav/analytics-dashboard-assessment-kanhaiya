import React from "react";

const StatsCard = ({
    title,
    value,
    icon,
    loading,
}: {
    title: string;
    value: string;
    icon: React.ReactElement;
    loading: boolean;
}) => {
    return (
        <div className="flex flex-col items-center sm:items-start justify-between p-2 sm:p-4 glass">
            <div className="flex items-center gap-2">
                {icon}
                <h3 className="text-sm sm:text-lg font-semibold text-muted-foreground whitespace-nowrap w-full overflow-hidden text-ellipsis">
                    {title}
                </h3>
            </div>
            {loading ? (
                <p className="font-semibold text-lg sm:text-3xl text-muted-foreground">
                    Calculating...
                </p>
            ) : (
                <p className="font-semibold text-2xl sm:text-3xl">{value}</p>
            )}
        </div>
    );
};

export default StatsCard;
