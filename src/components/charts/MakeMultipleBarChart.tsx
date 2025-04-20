import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useMediaQuery } from "usehooks-ts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";


interface MultipleBarChartProps {
    data: Array<{
        label: string;
    }>;
    title: string;
    dataKey1: string;
    dataKey2: string;
    nameKey: string;
    color1?: string;
    color2?: string;
}

const chartConfig = {
    bev: {
        label: "BEV",
        color: "oklch(var(--chart-1))",
    },
    phev: {
        label: "PHEV",
        color: "oklch(var(--chart-2))",
    },
} satisfies ChartConfig;


export function MakeMultipleBarChart({data, title, dataKey1, dataKey2, nameKey, color1, color2}: MultipleBarChartProps) {

    const isSmallScreen = useMediaQuery("(max-width: 640px)");

    return (
        <div className="flex flex-col gap-3 grow">
            <h2 className="font-semibold">{title}</h2>
            <div className="flex flex-col gap-4 aspect-video max-h-[380px] xl:max-h-[430px] w-full glass p-2">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart accessibilityLayer data={data}>
                        <XAxis
                            dataKey={nameKey}
                            tickLine={true}
                            tickMargin={10}
                            axisLine={true}
                        />
                        {isSmallScreen ? (
                            <YAxis width={30} />
                        ) : (
                            <YAxis width={40} />
                        )}
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    className="bg-[#261e35] text-foreground"
                                />
                            }
                        />
                        <Bar
                            dataKey={dataKey1}
                            fill={color1 || "var(--chart-5)"}
                            radius={4}
                        />
                        <Bar
                            dataKey={dataKey2}
                            fill={color2 || "var(--chart-2)"}
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
}
