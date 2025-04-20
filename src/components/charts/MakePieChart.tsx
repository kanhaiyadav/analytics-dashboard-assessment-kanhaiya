import { Pie, PieChart } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface DistributionChartProps {
    data: Array<{
        label: string;
    }>;
    dataKey: string;
    nameKey: string;
    formatter?: (value: number) => string;
    labelFormatter?: (label: string) => string;
    title: string;
    loading: boolean;
}

export function MakePieChart({
    data,
    dataKey,
    nameKey,
    title,
    formatter,
    labelFormatter,
    loading
}: DistributionChartProps) {
    const chartConfig = data.reduce((config, item, index) => {
        config[item.label] = {
            label: item.label,
            color: `oklch(var(--chart-${(index % 8) + 1}))`,
        };
        return config;
    }, {} as ChartConfig);

    return (
        <div className="flex flex-col gap-3">
            <h2 className="font-semibold">{title}</h2>
            <div className="flex flex-col gap-4 h-[330px] w-fit glass">
                {loading ? (
                    <div className="h-full flex items-center justify-center relative w-[328px]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-foreground/10 rounded-full animate-ping"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-foreground/30 rounded-full animate-ping"></div>
                        <div className="w-8 h-8 bg-foreground rounded-full animate-ping"></div>
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="h-full w-full mx-auto aspect-square"
                    >
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey={dataKey}
                                nameKey={"name"}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        className="bg-[#261e35] text-foreground"
                                        labelKey={nameKey}
                                    />
                                }
                                formatter={formatter}
                                labelFormatter={labelFormatter}
                            />
                            <ChartLegend
                                content={
                                    <ChartLegendContent nameKey={nameKey} />
                                }
                                className="max-h-[120px] overflow-y-auto no-scrollbar flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                            />
                        </PieChart>
                    </ChartContainer>
                )}
            </div>
        </div>
    );
}
