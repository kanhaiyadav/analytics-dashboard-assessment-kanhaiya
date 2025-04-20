import { useMediaQuery } from "usehooks-ts";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface MakeDistributionChartProps {
    data: Array<{
        name: string;
        value: number;
        percentage: string;
    }>;
    loading?: boolean;
}

export function MakeVerticalDistributionChart({
    data,
    loading,
}: MakeDistributionChartProps) {
    const chartData = data.map((item) => ({
        name: item.name,
        value: item.value,
        percentage: item.percentage,
        fill: `var(--chart-${(data.indexOf(item) % 5) + 1})`,
    }));

    const chartConfig = data.reduce((config, item, index) => {
        config[item.name] = {
            label: item.name,
            color: `oklch(var(--chart-${(index % 5) + 1}))`,
        };
        return config;
    }, {} as ChartConfig);

    const isSmallScreen = useMediaQuery("(max-width: 640px)");

    return (
        <div className="flex flex-col gap-3 grow">
            <h2 className="font-semibold">Top Manufacturers</h2>
            <div className="flex flex-col gap-4 aspect-[16/10.5] w-full max-w-[450px] glass p-2 sm:p-4">
                {loading ? (
                    <div className="h-full flex items-center justify-center relative w-[420px]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-foreground/10 rounded-full animate-ping"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-foreground/30 rounded-full animate-ping"></div>
                        <div className="w-8 h-8 bg-foreground rounded-full animate-ping"></div>
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="h-full w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            layout="vertical"
                            margin={{
                                left: 0,
                            }}
                        >
                            {isSmallScreen ? (
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tickLine={false}
                                    width={70}
                                    axisLine={false}
                                    tickFormatter={(value) =>
                                        chartConfig[
                                            value as keyof typeof chartConfig
                                        ]?.label?.toString() || value.toString()
                                    }
                                />
                            ) : (
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tickLine={false}
                                    width={80}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) =>
                                        chartConfig[
                                            value as keyof typeof chartConfig
                                        ]?.label?.toString() || value.toString()
                                    }
                                />
                            )}
                            <XAxis dataKey="value" type="number" hide />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent className="bg-[#261e35] text-foreground" />
                                }
                            />
                            <Bar dataKey="value" layout="vertical" radius={5} />
                        </BarChart>
                    </ChartContainer>
                )}
            </div>
        </div>
    );
}
