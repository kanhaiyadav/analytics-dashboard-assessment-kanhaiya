"use client";
// // src/components/charts/MakeDistributionChart.tsx
// import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";

// // Define the props type for type safety

// export function MakeDistributionChart({ data }: MakeDistributionChartProps) {
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Top Manufacturers</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <BarChart
//                             data={data}
//                             layout="vertical"
//                             margin={{
//                                 top: 5,
//                                 right: 30,
//                                 left: 60,
//                                 bottom: 5,
//                             }}
//                         >
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis type="number" />
//                             <YAxis
//                                 dataKey="name"
//                                 type="category"
//                                 width={80}
//                                 tick={{ fontSize: 14 }}
//                             />
//                             <Tooltip
//                                 formatter={(value) => [
//                                     `${value} vehicles`,
//                                     "Count",
//                                 ]}
//                                 labelFormatter={(label) => `Make: ${label}`}
//                             />
//                             <Bar
//                                 dataKey="value"
//                                 fill="#4f46e5"
//                                 radius={[0, 4, 4, 0]}
//                                 label={{
//                                     position: "right",
//                                     formatter: (item) => item.percentage,
//                                     fontSize: 12,
//                                 }}
//                             />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//                 <div className="mt-4 text-sm text-muted-foreground">
//                     <p>
//                         {data[0]?.name || "Unknown"} is the leading manufacturer
//                         with {data[0]?.percentage || "0%"} market share.
//                     </p>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

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
}

export function MakeVerticalDistributionChart({ data }: MakeDistributionChartProps) {
    console.log("MakeDistributionChart data", data);

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

    return (
        <div className="flex flex-col gap-3">
            <h2 className="font-semibold">Top Manufacturers</h2>
            <div className="flex flex-col gap-4 h-[300px] w-[420px] glass p-4">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
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
            </div>
        </div>
    );
}
