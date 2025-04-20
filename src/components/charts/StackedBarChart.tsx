import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useMediaQuery } from "usehooks-ts";
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
    const isSmallScreen = useMediaQuery("(max-width: 640px)");

    return (
        <div className="flex flex-col gap-3 grow">
            <h2 className="font-semibold">
                Cafv Eligibility Distribution By Make
            </h2>
            <div className="flex flex-col gap-4 aspect-video max-h-[430px] w-full glass p-2">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart accessibilityLayer data={data}>
                        {isSmallScreen ? (
                            <XAxis
                                dataKey="make"
                                tickLine={true}
                                tickMargin={5}
                                axisLine={true}
                                height={5}
                            />
                        ) : (
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
                        )}

                        {isSmallScreen ? (
                            <YAxis width={30} />
                        ) : (
                            <YAxis width={40} />
                        )}
                        <ChartTooltip
                            content={
                                <ChartTooltipContent className="bg-[#261e35] text-foreground" />
                            }
                        />
                        <ChartLegend
                            content={<ChartLegendContent />}
                            className="relative sm:left-[-35px] bottom-[-8px]"
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
