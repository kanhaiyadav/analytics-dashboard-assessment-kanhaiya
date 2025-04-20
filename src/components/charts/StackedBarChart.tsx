import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    eligibleCount: {
        label: "Eligible",
    },
    nonEligibleCount: {
        label: "Non Eligible",
    },
} satisfies ChartConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function StackedBarChart({ data }: { data: any[] }) {
    return (
        <div className="flex flex-col gap-3 grow">
            <h2 className="font-semibold">
                Cafv Eligibility Distribution By Make
            </h2>
            <div className="flex flex-col gap-4 h-[430px] w-full glass p-2">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart accessibilityLayer data={data}>
                        <XAxis
                            dataKey="make"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={true}
                            angle={-45}
                            textAnchor="end"
                            interval={0}
                            height={55}
                        />
                        <YAxis width={40} />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent className="bg-[#261e35] text-foreground" />
                            }
                        />
                        <ChartLegend
                            content={
                                <ChartLegendContent />
                            }
                            className="relative left-[-35px] bottom-[-5px]"
                        />
                        <Bar
                            dataKey="nonEligibleCount"
                            stackId="a"
                            fill="var(--chart-8)"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="eligibleCount"
                            stackId="a"
                            fill="var(--chart-7)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
}
