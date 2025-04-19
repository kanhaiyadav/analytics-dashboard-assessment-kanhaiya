import { useMemo } from "react";

interface EVData {
    "VIN (1-10)": string;
    County: string;
    City: string;
    State: string;
    "Postal Code": string;
    "Model Year": string;
    Make: string;
    Model: string;
    "Electric Vehicle Type": string;
    "Clean Alternative Fuel Vehicle (CAFV) Eligibility": string;
    "Electric Range": string;
    "Base MSRP": string;
    "Legislative District": string;
    "DOL Vehicle ID": string;
    "Vehicle Location": string;
    "Electric Utility": string;
    "2020 Census Tract": string;
    [key: string]: string;
}

export function useEVAnalytics(data: EVData[]) {
    return useMemo(() => {
        if (!data || data.length === 0) {
            return {
                isReady: false,
            };
        }

        const vehicleTypeCounts = data.reduce((acc, vehicle) => {
            const type = vehicle["Electric Vehicle Type"];
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        const vehicleTypeData = Object.entries(vehicleTypeCounts).map(
            ([name, value], index) => ({
                label: name,
                name,
                value,
                percentage: ((value / data.length) * 100).toFixed(1) + "%",
                fill: `var(--chart-${(index % 8) + 1})`,
            })
        );



        const makeData = data.reduce((acc, vehicle) => {
            const make = vehicle.Make;
            acc[make] = (acc[make] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const makeDistribution = Object.entries(makeData)
            .map(([name, value]) => ({
                name,
                value,
                percentage: ((value / data.length) * 100).toFixed(1) + "%",
            }))
            .sort((a, b) => b.value - a.value);
        
        

        const modelData = data.reduce((acc, vehicle) => {
            const model = `${vehicle.Make} ${vehicle.Model}`;
            acc[model] = (acc[model] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const modelDistribution = Object.entries(modelData)
            .map(([name, value], index) => ({
                label: name,
                name,
                value,
                percentage: ((value / data.length) * 100).toFixed(1) + "%",
                fill: `var(--chart-${(index % 8) + 1})`,
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
        
        

        const validRangeData = data
            .filter(
                (vehicle) =>
                    vehicle["Electric Range"] &&
                    !isNaN(parseInt(vehicle["Electric Range"]))
            )
            .map((vehicle) => ({
                make: vehicle.Make,
                model: vehicle.Model,
                year: parseInt(vehicle["Model Year"]),
                range: parseInt(vehicle["Electric Range"]),
            }));

        const averageRange =
            validRangeData.length > 0
                ? validRangeData.reduce(
                      (sum, vehicle) => sum + vehicle.range,
                      0
                  ) / validRangeData.length
                : 0;
        
        
        const rangeBuckets = [0, 50, 100, 150, 200, 250, 300, 350, 400];
        const rangeDistribution = rangeBuckets.reduce((acc, _, index) => {
            if (index === rangeBuckets.length - 1) return acc;

            const min = rangeBuckets[index];
            const max = rangeBuckets[index + 1];
            const count = validRangeData.filter(
                (v) => v.range >= min && v.range < max
            ).length;

            acc.push({
                range: `${min}-${max}`,
                label: `${min} - ${max}`,
                count,
                percentage:
                    ((count / validRangeData.length) * 100).toFixed(1) + "%",
                fill: `var(--chart-${(index % 8) + 1})`,
            });

            return acc;
        }, [] as Array<{ range: string; label: string; count: number; percentage: string, fill: string}>);


        
        
        const yearData = data.reduce((acc, vehicle) => {
            const year = vehicle["Model Year"];
            if (year && !isNaN(parseInt(year))) {
                acc[year] = (acc[year] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const yearDistribution = Object.entries(yearData)
            .map(([year, count]) => ({
                year: parseInt(year),
                count,
                percentage: ((count / data.length) * 100).toFixed(1) + "%",
            }))
            .sort((a, b) => a.year - b.year);

            
            
            
            
        const cafvData = data.reduce((acc, vehicle) => {
            const status =
                vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const cafvDistribution = Object.entries(cafvData).map(
            ([status, count], index) => ({
                label: status,
                status,
                count,
                percentage: ((count / data.length) * 100).toFixed(1) + "%",
                fill: `var(--chart-${(index % 8) + 1})`,
            })
        );


        
        
        
        const countyData = data.reduce((acc, vehicle) => {
            const county = vehicle.County;
            acc[county] = (acc[county] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const countyDistribution = Object.entries(countyData)
            .map(([county, count], index) => ({
                county,
                label: 'county',
                count,
                percentage: ((count / data.length) * 100).toFixed(1) + "%",
                fill: `var(--chart-${(index % 8) + 1})`,
            }))
            .sort((a, b) => b.count - a.count);


            
            
            

        const utilityData = data.reduce((acc, vehicle) => {
            const utilities = vehicle["Electric Utility"]?.split("|") || [
                "Unknown",
            ];

            utilities.forEach((util) => {
                const cleanUtil = util.trim();
                if (cleanUtil) {
                    acc[cleanUtil] = (acc[cleanUtil] || 0) + 1;
                }
            });

            return acc;
        }, {} as Record<string, number>);

        const utilityDistribution = Object.entries(utilityData)
            .map(([utility, count], index) => ({
                label: utility,
                utility,
                count,
                percentage: ((count / data.length) * 100).toFixed(1) + "%",
                fill: `var(--chart-${(index % 8) + 1})`,
            }))
            .sort((a, b) => b.count - a.count);
        
        
        
        
        

        const makeModelYearData = data.reduce((acc, vehicle) => {
            const make = vehicle.Make;
            const year = vehicle["Model Year"];

            if (!acc[make]) acc[make] = {};
            acc[make][year] = (acc[make][year] || 0) + 1;

            return acc;
        }, {} as Record<string, Record<string, number>>);

        const rangeByMake = validRangeData.reduce((acc, vehicle) => {
            if (!acc[vehicle.make]) {
                acc[vehicle.make] = { count: 0, totalRange: 0 };
            }

            acc[vehicle.make].count += 1;
            acc[vehicle.make].totalRange += vehicle.range;

            return acc;
        }, {} as Record<string, { count: number; totalRange: number }>);

        const averageRangeByMake = Object.entries(rangeByMake)
            .map(([make, data]) => ({
                make,
                averageRange: Math.round(data.totalRange / data.count),
                count: data.count,
            }))
            .sort((a, b) => b.averageRange - a.averageRange);


            
            
            
            
        const bevs = validRangeData.filter((v) =>
            data.find(
                (d) =>
                    d.Make === v.make &&
                    d.Model === v.model &&
                    d["Electric Vehicle Type"].includes("Battery Electric")
            )
        );

        const phevs = validRangeData.filter((v) =>
            data.find(
                (d) =>
                    d.Make === v.make &&
                    d.Model === v.model &&
                    d["Electric Vehicle Type"].includes("Plug-in Hybrid")
            )
        );

        const bevAvgRange = bevs.length
            ? bevs.reduce((sum, v) => sum + v.range, 0) / bevs.length
            : 0;

        const phevAvgRange = phevs.length
            ? phevs.reduce((sum, v) => sum + v.range, 0) / phevs.length
            : 0;


            
            
        const keyInsights = [
            `${
                makeDistribution[0]?.name || "Unknown"
            } is the most popular EV manufacturer with ${
                makeDistribution[0]?.percentage || "0%"
            } market share.`,
            `${
                modelDistribution[0]?.name || "Unknown"
            } is the most common EV model.`,
            `The average electric range is ${Math.round(averageRange)} miles.`,
            `Battery Electric Vehicles average ${Math.round(
                bevAvgRange
            )} miles of range, while PHEVs average ${Math.round(
                phevAvgRange
            )} miles.`,
            `${
                cafvDistribution.find((d) => d.status.includes("Eligible"))
                    ?.percentage || "0%"
            } of vehicles are eligible for Clean Alternative Fuel Vehicle benefits.`,
            `${
                countyDistribution[0]?.county || "Unknown"
            } County has the highest EV concentration with ${
                countyDistribution[0]?.percentage || "0%"
            } of all EVs.`,
            `${
                yearDistribution[yearDistribution.length - 1]?.count || 0
            } new EVs were registered in ${
                yearDistribution[yearDistribution.length - 1]?.year ||
                "the most recent year"
            }.`,
        ];

        
        
        return {
            isReady: true,
            totalVehicles: data.length,
            vehicleTypeData,
            makeDistribution,
            modelDistribution,
            rangeDistribution,
            averageRange: Math.round(averageRange),
            yearDistribution,
            cafvDistribution,
            countyDistribution,
            utilityDistribution,
            makeModelYearData,
            averageRangeByMake,
            vehicleTypeRangeComparison: {
                bev: Math.round(bevAvgRange),
                phev: Math.round(phevAvgRange),
            },
            keyInsights,
        };
    }, [data]);
}
