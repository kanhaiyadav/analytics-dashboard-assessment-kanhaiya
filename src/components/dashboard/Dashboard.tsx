// src/components/dashboard/Dashboard.tsx
// import { FactoryIcon } from "lucide-react";
import { useEVDashboard } from "../../hooks/useEVDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { MakePieChart } from "../charts/MakePieChart";
import { MakeDistributionChart } from "../charts/MakeDistributionChart";
import { MakeVerticalDistributionChart } from "../charts/MakeVerticalDistributionChart";
import StatsCard from "./StatsCard";
import { BatteryIcon, BoltIcon, CarIcon, FactoryIcon } from "lucide-react";
// import { YearTrendChart } from "../charts/YearTrendChart";
import { MakeMultipleBarChart } from "../charts/MakeMultipleBarChart";
import { StackedAreaChart } from "../charts/StackedAreaChart";
import { StackedBarChart } from "../charts/StackedBarChart";
// Import your chart components

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
                        value={`${analytics.vehicleTypeRangeComparison?.bev} miles`}
                        icon={
                            <BoltIcon className="text-xl text-muted-foreground" />
                        }
                    />
                    <StatsCard
                        title="Top Manufacturer"
                        value={analytics.makeDistribution?.[0]?.name || "N/A"}
                        icon={
                            <FactoryIcon className="text-xl text-muted-foreground" />
                        }
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <MakeDistributionChart
                        title="County Distribution"
                        data={analytics.countyDistribution?.slice(0, 7) || []}
                        xDataKey="county"
                        yDataKey="count"
                        formatter={(value) => `${value} vehicles`}
                        labelFormatter={(label) => `County: ${label}`}
                        interval={0}
                    />
                    <MakeVerticalDistributionChart
                        data={analytics.makeDistribution?.slice(0, 10) || []}
                    />
                    <MakeDistributionChart
                        title="Battery Range Distribution"
                        data={analytics.rangeDistribution || []}
                        xDataKey="range"
                        yDataKey="count"
                        formatter={(value) => `${value} vehicles`}
                        interval={1}
                        labelFormatter={(label) => `Range: ${label} miles`}
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                    <MakePieChart
                        data={analytics.vehicleTypeData || []}
                        nameKey="name"
                        dataKey="value"
                        title="Vehicle Type Distribution"
                        formatter={(value) => `Count: ${value} vehicles`}
                        labelFormatter={(label) => `Vehicle Type: ${label}`}
                    />
                    <MakePieChart
                        data={analytics.modelDistribution || []}
                        nameKey="name"
                        dataKey="value"
                        title="Make-model Distribution"
                        formatter={(value) => `Count: ${value} vehicles`}
                        labelFormatter={(label) => `${label}`}
                    />
                    <MakePieChart
                        data={analytics.cafvDistribution || []}
                        nameKey="status"
                        dataKey="count"
                        title="csfv Distribution"
                        formatter={(value) => `Count: ${value} vehicles`}
                        labelFormatter={(label) => `Status: ${label}`}
                    />
                    <MakePieChart
                        data={analytics.utilityDistribution || []}
                        nameKey="utility"
                        dataKey="count"
                        title="Utility Distribution"
                        formatter={(value) => `Count: ${value} vehicles`}
                        labelFormatter={(label) => `Utility: ${label}`}
                    />
                </div>

                <div className="flex gap-6">
                    <MakeMultipleBarChart
                        data={analytics.vehicleTypeRangeDistribution || []}
                        title="Vehicle Type Range Comparison"
                        dataKey1="bev"
                        dataKey2="phev"
                        nameKey="range"
                    />
                    <StackedAreaChart
                        data={analytics.vehicleTypeYearDistribution || []}
                        title="Vehicle Type Year Distribution"
                        dataKey1="bev"
                        dataKey2="phev"
                        nameKey="year"
                    />
                </div>
                <div className="flex">
                    <MakeMultipleBarChart
                        data={analytics.utilityVehicleTypeDistribution || []}
                        title="Vehicle Type Range Comparison"
                        dataKey1="bev"
                        dataKey2="phev"
                        nameKey="name"
                        color1="var(--chart-1)"
                        color2="var(--chart-8)"
                    />
                </div>

                <div className="flex">
                    <StackedBarChart
                        data={analytics.cafvDistributionByMake || []}
                    />
                </div>

                {/* Key Insights */}
                <Card>
                    <CardHeader>
                        <CardTitle>Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {analytics.keyInsights?.map((insight, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="mr-2 mt-1 text-primary">
                                        •
                                    </span>
                                    <span>{insight}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* <div className="grid gap-6 md:grid-cols-2">
                    <YearTrendChart data={analytics.yearDistribution} />
                </div> */}
            </div>
        </div>
    );
}
