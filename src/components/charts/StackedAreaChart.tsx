import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface StackedAreaChartProps {
    data: Array<{
        label: string;
    }>;
    title: string;
    dataKey1: string;
    dataKey2: string;
    nameKey: string;
}

const chartConfig = {
    bev: {
        label: "BEV",
    },
    phev: {
        label: "PHEV",
    },
} satisfies ChartConfig;

export function StackedAreaChart({
    data,
    title,
    dataKey1,
    dataKey2,
    nameKey,
}: StackedAreaChartProps) {
    return (
        <div className="flex flex-col gap-3 grow">
            <h2 className="font-semibold">{title}</h2>
            <div className="flex flex-col gap-4 h-[330px] w-full glass p-2">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <XAxis
                            dataKey={nameKey}
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                        />
                        <YAxis width={40} />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent className="bg-[#261e35] text-foreground" />
                            }
                        />
                        <defs>
                            <linearGradient
                                id="fillArea1"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--chart-2)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--chart-2)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillArea2"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--chart-5)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--chart-5)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey={dataKey1}
                            type="natural"
                            fill="url(#fillArea2)"
                            fillOpacity={0.4}
                            stroke="var(--chart-5)"
                            stackId="a"
                        />
                        <Area
                            dataKey={dataKey2}
                            type="natural"
                            fill="url(#fillArea1)"
                            fillOpacity={0.4}
                            stroke="var(--chart-2)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </div>
        </div>
    );
}
