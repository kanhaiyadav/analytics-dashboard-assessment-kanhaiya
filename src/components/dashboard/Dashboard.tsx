import { useEVDashboard } from "../../hooks/useEVDashboard";
import { Skeleton } from "../ui/skeleton";
import StatsCard from "./StatsCard";
import { BatteryIcon, BoltIcon, CarIcon, FactoryIcon } from "lucide-react";

export function Dashboard() {
    const { loading, error, analytics, isReady } = useEVDashboard();

    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-2">
                {Array(6)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton key={i} className="h-[300px] rounded-lg" />
                    ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500 bg-red-50 rounded-lg">
                Error loading EV data. Please try again later.
            </div>
        );
    }

    if (!isReady) {
        return <div>Processing data...</div>;
    }

    return (
        <div className="grow h-full overflow-y-auto">
            <div className="space-y-6 w-full h-fit p-4 pl-0">
                {/* Key Stats */}
                <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                    <StatsCard
                        title="Total EVs"
                        value={`${analytics.totalVehicles}`}
                        icon={
                            <CarIcon className="text-xl text-muted-foreground" />
                        }
                    />
                    <StatsCard
                        title="Average Range"
                        value={`${analytics.averageRange} miles`}
                        icon={
                            <BatteryIcon className="text-xl text-muted-foreground" />
                        }
                    />
                    <StatsCard
                        title="BEV Range"
                        value={`${analytics.vehicleTypeRangeComparison.bev} miles`}
                        icon={
                            <BoltIcon className="text-xl text-muted-foreground" />
                        }
                    />
                    <StatsCard
                        title="Top Manufacturer"
                        value={analytics.makeDistribution[0]?.name || "N/A"}
                        icon={
                            <FactoryIcon className="text-xl text-muted-foreground" />
                        }
                    />
                </div>

            </div>
        </div>
    );
}
