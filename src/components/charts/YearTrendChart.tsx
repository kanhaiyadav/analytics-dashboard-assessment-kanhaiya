// // src/components/charts/YearTrendChart.tsx
// import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";

// export function YearTrendChart({ data }) {
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>EV Adoption Trend by Year</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <LineChart data={data}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="year" />
//                             <YAxis />
//                             <Tooltip
//                                 formatter={(value) => [
//                                     `${value} vehicles`,
//                                     "Count",
//                                 ]}
//                                 labelFormatter={(label) => `Year: ${label}`}
//                             />
//                             <Line
//                                 type="monotone"
//                                 dataKey="count"
//                                 stroke="#8884d8"
//                                 activeDot={{ r: 8 }}
//                             />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>
//                 <div className="mt-4 text-sm text-muted-foreground">
//                     <p>
//                         Trend shows{" "}
//                         {data[data.length - 1]?.count >
//                         data[data.length - 2]?.count
//                             ? "growth"
//                             : "decline"}{" "}
//                         in recent years, with{" "}
//                         {data[data.length - 1]?.count || 0} vehicles in{" "}
//                         {data[data.length - 1]?.year || "the latest year"}.
//                     </p>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }
