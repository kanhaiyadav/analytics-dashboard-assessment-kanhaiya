import { useEVDashboard } from "../../hooks/useEVDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MakePieChart } from "../charts/MakePieChart";
import { MakeDistributionChart } from "../charts/MakeDistributionChart";
import { MakeVerticalDistributionChart } from "../charts/MakeVerticalDistributionChart";
import StatsCard from "./StatsCard";
import { BatteryIcon, BoltIcon, CarIcon, FactoryIcon } from "lucide-react";
import { MakeMultipleBarChart } from "../charts/MakeMultipleBarChart";
import { StackedAreaChart } from "../charts/StackedAreaChart";
import { StackedBarChart } from "../charts/StackedBarChart";

export function Dashboard() {
    const { loading, analytics } = useEVDashboard();

    return (
        <div className="grow min-h-0 sm:h-full overflow-y-auto">
            <div className="space-y-6 w-full h-fit p-4 sm:pl-0">
                <div className="grid gap-2 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <StatsCard
                        title="Total EVs"
                        value={`${analytics.totalVehicles}`}
                        icon={
                            <CarIcon className="text-xl text-muted-foreground" />
                        }
                        loading={loading}
                    />
                    <StatsCard
                        title="Average Range"
                        value={`${analytics.averageRange} miles`}
                        icon={
                            <BatteryIcon className="text-xl text-muted-foreground" />
                        }
                        loading={loading}
                    />
                    <StatsCard
                        title="Avg. BEV Range"
                        value={`${analytics.vehicleTypeRangeComparison?.bev} miles`}
                        icon={
                            <BoltIcon className="text-xl text-muted-foreground" />
                        }
                        loading={loading}
                    />
                    <StatsCard
                        title="Top Manufacturer"
                        value={analytics.makeDistribution?.[0]?.name || "N/A"}
                        icon={
                            <FactoryIcon className="text-xl text-muted-foreground" />
                        }
                        loading={loading}
                    />
                </div>

                <div className="flex flex-col sm:flex-row w-full gap-4">
                    <MakeDistributionChart
                        title="EV Vehicle Distribution by County"
                        data={analytics.countyDistribution?.slice(0, 7) || []}
                        xDataKey="county"
                        yDataKey="count"
                        formatter={(value) => `${value} vehicles`}
                        labelFormatter={(label) => `County: ${label}`}
                        interval={0}
                        loading={loading}
                    />
                    <MakeVerticalDistributionChart
                        data={analytics.makeDistribution?.slice(0, 10) || []}
                        loading={loading}
                    />
                    <MakeDistributionChart
                        title="EV Distribution by Battery Range"
                        data={analytics.rangeDistribution || []}
                        xDataKey="range"
                        yDataKey="count"
                        formatter={(value) => `${value} vehicles`}
                        interval={1}
                        labelFormatter={(label) => `Range: ${label} miles`}
                        loading={loading}
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                    <MakePieChart
                        data={analytics.vehicleTypeData || []}
                        nameKey="name"
                        dataKey="value"
                        title="EV Distribution by Vehicle Type"
                        formatter={(value) => `Count: ${value} vehicles`}
                        labelFormatter={(label) => `Vehicle Type: ${label}`}
                        loading={loading}
                    />
                    <MakePieChart
                        data={analytics.modelDistribution || []}
                        nameKey="name"
                        dataKey="value"
                        title="EV Distribution by Make and model"
                        formatter={(value) => `Count: ${value} vehicles`}
                        labelFormatter={(label) => `${label}`}
                        loading={loading}
                    />
                    <MakePieChart
                        data={analytics.cafvDistribution || []}
                        nameKey="status"
                        dataKey="count"
                        title="EV Distribution by csfv Eligibility"
                        formatter={(value) => `Count: ${value} vehicles`}
                        labelFormatter={(label) => `Status: ${label}`}
                        loading={loading}
                    />
                    <MakePieChart
                        data={analytics.utilityDistribution || []}
                        nameKey="utility"
                        dataKey="count"
                        title="EV Distribution by Utility Provider"
                        formatter={(value) => `Count: ${value} vehicles`}
                        labelFormatter={(label) => `Utility: ${label}`}
                        loading={loading}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                    <MakeMultipleBarChart
                        data={analytics.vehicleTypeRangeDistribution || []}
                        title="Vehicle Type - Range Comparison"
                        dataKey1="bev"
                        dataKey2="phev"
                        nameKey="range"
                    />
                    <StackedAreaChart
                        data={analytics.vehicleTypeYearDistribution || []}
                        title="Adoption trend for BEV and PHEV"
                        dataKey1="bev"
                        dataKey2="phev"
                        nameKey="year"
                    />
                </div>
                <div className="flex">
                    <MakeMultipleBarChart
                        data={analytics.utilityVehicleTypeDistribution || []}
                        title="Vehicle Type - Range Comparison"
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

                <Card className="glass text-foreground">
                    <CardHeader>
                        <CardTitle>Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {analytics.keyInsights?.map((insight, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="mr-2 mt-1">
                                        •
                                    </span>
                                    <span>{insight}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
