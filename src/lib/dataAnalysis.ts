import { useMemo } from "react";

export interface EVData {
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
                type: vehicle["Electric Vehicle Type"],
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
                label: `${min}-${max}`,
                count,
                percentage:
                    ((count / validRangeData.length) * 100).toFixed(1) + "%",
                fill: `var(--chart-${(index % 8) + 1})`,
            });

            return acc;
        }, [] as Array<{ range: string; label: string; count: number; percentage: string; fill: string }>);

        const vehicleTypeRangeDistribution = rangeBuckets.reduce(
            (acc, _, index) => {
                if (index === rangeBuckets.length - 1) return acc;

                const min = rangeBuckets[index];
                const max = rangeBuckets[index + 1];
                const bev = validRangeData.filter(
                    (v) =>
                        v.range >= min &&
                        v.range < max &&
                        v.type.includes("Battery Electric")
                ).length;
                const phev = validRangeData.filter(
                    (v) =>
                        v.range >= min &&
                        v.range < max &&
                        v.type.includes("Plug-in Hybrid")
                ).length;

                acc.push({
                    range: `${min}-${max}`,
                    label: `${min}-${max}`,
                    bev,
                    phev,
                    count: bev + phev,
                });

                return acc;
            },
            [] as Array<{
                range: string;
                label: string;
                bev: number;
                phev: number;
                count: number;
            }>
        );

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

        const yearBuckets = [
            2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
            2021, 2022, 2023, 2024,
        ];
        const vehicleTypeYearDistribution = yearBuckets.reduce(
            (acc, _, index) => {
                if (index === rangeBuckets.length - 1) return acc;

                const year = yearBuckets[index];
                const bev = data.filter(
                    (v) =>
                        v["Model Year"] === year.toString() &&
                        v["Electric Vehicle Type"].includes("Battery Electric")
                ).length;
                const phev = data.filter(
                    (v) =>
                        v["Model Year"] &&
                        v["Electric Vehicle Type"].includes("Plug-in Hybrid")
                ).length;

                acc.push({
                    year: year.toString(),
                    label: year.toString(),
                    bev,
                    phev,
                    count: bev + phev,
                });

                return acc;
            },
            [] as Array<{
                year: string;
                label: string;
                bev: number;
                phev: number;
                count: number;
            }>
        );
        console.log("vehicleTypeYearDistribution", vehicleTypeYearDistribution);

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

        interface MakeStats {
            [make: string]: {
                make: string;
                eligibleCount: number;
                nonEligibleCount: number;
                totalCount: number;
                eligibilityRate: number;
            };
        }

        const makeStats: MakeStats = {};
        data.forEach((vehicle) => {
            const make = vehicle.Make;
            const eligibilityStatus =
                vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];

            if (!makeStats[make]) {
                makeStats[make] = {
                    make,
                    eligibleCount: 0,
                    nonEligibleCount: 0,
                    totalCount: 0,
                    eligibilityRate: 0,
                };
            }

            makeStats[make].totalCount += 1;
            if (
                eligibilityStatus === "Clean Alternative Fuel Vehicle Eligible"
            ) {
                makeStats[make].eligibleCount += 1;
            } else {
                makeStats[make].nonEligibleCount += 1;
            }
        });

        const result = Object.values(makeStats).map((makeStat) => {
            makeStat.eligibilityRate =
                makeStat.totalCount > 0
                    ? makeStat.eligibleCount / makeStat.totalCount
                    : 0;
            return makeStat;
        });

        const cafvDistributionByMake = result.sort(
            (a, b) => b.eligibilityRate - a.eligibilityRate
        );

        const countyData = data.reduce((acc, vehicle) => {
            const county = vehicle.County;
            acc[county] = (acc[county] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const countyDistribution = Object.entries(countyData)
            .map(([county, count], index) => ({
                county,
                label: "county",
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

        interface UtilityVehicleCount {
            name: string;
            label: string;
            bev: number;
            phev: number;
        }

        const utilityVehicleTypeDistribution: UtilityVehicleCount[] = [];

        data.forEach((vehicle) => {
            const utilities = vehicle["Electric Utility"]
                .split(/\|+/)
                .map((util) => util.trim());
            const vehicleType = vehicle["Electric Vehicle Type"];

            utilities.forEach((utility) => {
                if (!utility) return;

                let utilityObj = utilityVehicleTypeDistribution.find(
                    (item) => item.name === utility
                );

                if (!utilityObj) {
                    utilityObj = {
                        name: utility,
                        label: utility,
                        bev: 0,
                        phev: 0,
                    };
                    utilityVehicleTypeDistribution.push(utilityObj);
                }

                if (vehicleType === "Battery Electric Vehicle (BEV)") {
                    utilityObj.bev += 1;
                } else if (
                    vehicleType === "Plug-in Hybrid Electric Vehicle (PHEV)"
                ) {
                    utilityObj.phev += 1;
                }
            });
        });

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
            vehicleTypeRangeDistribution,
            averageRange: Math.round(averageRange),
            yearDistribution,
            vehicleTypeYearDistribution,
            cafvDistribution,
            cafvDistributionByMake,
            countyDistribution,
            utilityDistribution,
            utilityVehicleTypeDistribution,
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
