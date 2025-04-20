export interface StatsProps {
    totalVehicles: number;
    averageRange: number;
    bevStatistics: {
        totalVehicles: number;
        averageRange: number;
    };
    phevStatistics: {
        totalVehicles: number;
        averageRange: number;
    };
    cafvStatistics: {
        eligibleCount: number;
        nonEligibleCount: number;
        eligibilityRate: number;
    };
}

const Stats = ({
    stats,
    loading,
}: {
    stats: StatsProps | undefined;
    loading: boolean;
}) => {
    return (
        <div className="flex gap-4 justify-evenly mt-[30px]">
            <div className="flex flex-col gap-1 glass p-4">
                <h2 className="text-lg font-medium text-muted-foreground">
                    Total EVs
                </h2>
                {loading ? (
                    <p className="text-2xl font-bold">Calculating...</p>
                ) : (
                    <p className="text-2xl font-bold">{stats?.totalVehicles}</p>
                )}
            </div>
            <div className="flex flex-col gap-1 glass p-4">
                <h2 className="text-lg font-medium text-muted-foreground">
                    Average Range
                </h2>
                {loading ? (
                    <p className="text-2xl font-bold">Calculating...</p>
                ) : (
                    <p className="text-2xl font-bold">
                        {stats?.averageRange} miles
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1 glass p-4">
                <h2 className="text-lg font-medium text-muted-foreground">
                    BEV Range
                </h2>
                {loading ? (
                    <p className="text-2xl font-bold">Calculating...</p>
                ) : (
                    <p className="text-2xl font-bold">
                        {stats?.bevStatistics.averageRange} miles
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1 glass p-4">
                <h2 className="text-lg font-medium text-muted-foreground">
                    PHEV Range
                </h2>
                {loading ? (
                    <p className="text-2xl font-bold">Calculating...</p>
                ) : (
                    <p className="text-2xl font-bold">
                        {stats?.phevStatistics.averageRange} miles
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1 glass p-4">
                <h2 className="text-lg font-medium text-muted-foreground">
                    CAFV eligible
                </h2>
                {loading ? (
                    <p className="text-2xl font-bold">Calculating...</p>
                ) : (
                    <p className="text-2xl font-bold">
                        {stats?.cafvStatistics.eligibleCount}{" "}
                        <span className="font-normal text-sm">EVs</span>
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1 glass p-4">
                <h2 className="text-lg font-medium text-muted-foreground">
                    CAFV Non-Eligible
                </h2>
                {loading ? (
                    <p className="text-2xl font-bold">Calculating...</p>
                ) : (
                    <p className="text-2xl font-bold">
                        {stats?.cafvStatistics.nonEligibleCount}{" "}
                        <span className="font-normal text-sm">EVs</span>
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1 glass p-4">
                <h2 className="text-lg font-medium text-muted-foreground">
                    CAFV Eligibility Rate
                </h2>
                {loading ? (
                    <p className="text-2xl font-bold">Calculating...</p>
                ) : (
                    <p className="text-2xl font-bold">
                        {stats?.cafvStatistics.eligibilityRate} %
                    </p>
                )}
            </div>
        </div>
    );
};

export default Stats;
