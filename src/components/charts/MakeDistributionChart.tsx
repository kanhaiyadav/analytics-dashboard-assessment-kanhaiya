interface MakeDistributionChartProps {
    data: Array<{
        label: string;
    }>;
    xDataKey: string;
    yDataKey: string;
    formatter?: (value: number) => string;
    labelFormatter?: (label: string) => string;
    interval?: number;
    title: string;
    loading: boolean;
}

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export function MakeDistributionChart({
    data,
    xDataKey,
    yDataKey,
    formatter,
    labelFormatter,
    interval,
    title,
    loading,
}: MakeDistributionChartProps) {
    const chartConfig = data.reduce((config, item, index) => {
        config[item.label] = {
            label: item.label,
            color: `oklch(var(--chart-${(index % 8) + 1}))`,
        };
        return config;
    }, {} as ChartConfig);

    console.log("RangeDistributionChart data", data);

    return (
        <div className="flex flex-col gap-3 grow">
            <h2 className="font-semibold">{title}</h2>
            <div className="flex flex-col gap-4 h-[300px] w-full max-w-[450px] glass p-4">
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
                        <BarChart accessibilityLayer data={data}>
                            <XAxis
                                dataKey={xDataKey}
                                tickLine={false}
                                tickMargin={5}
                                axisLine={true}
                                interval={interval}
                            />
                            <YAxis width={40} />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent className="bg-[#261e35] text-foreground" />
                                }
                                formatter={formatter}
                                labelFormatter={labelFormatter}
                            />
                            <Bar dataKey={yDataKey} radius={8}>
                                <LabelList
                                    dataKey="percentage"
                                    position="top"
                                    className="fill-white"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                )}
            </div>
        </div>
    );
}
