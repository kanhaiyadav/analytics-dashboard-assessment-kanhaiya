import React, { useState } from "react";
import SelectColumn from "./Select";
import { useEVDashboard } from "@/hooks/useEVDashboard";
import { EVData } from "@/lib/dataAnalysis";
import DataTable from "./DataTable";
import { Skeleton } from "../ui/skeleton";
import Stats from "./Stats";
import { StatsProps } from "./Stats";

interface EVFilters {
    vin?: string;
    county?: string;
    city?: string;
    make?: string;
    model?: string;
    electricVehicleType?: string;
    cafvEligibility?: string;
    rangeMin?: number;
    rangeMax?: number;
    electricUtility?: string;
}

const dropdowns = [
    {
        name: "county",
        options: [
            "King",
            "Snohomish",
            "Kitsap",
            "Thurston",
            "Yakima",
            "Island",
            "Chelan",
            "Skagit",
            "Spokane",
            "Walla Walla",
            "Grant",
            "Stevens",
            "Whitman",
            "Kittitas",
            "Pend Oreille",
            "Clark",
            "Cowlitz",
            "Jefferson",
            "Clallam",
            "Klickitat",
        ],
    },
    {
        name: "city",
        options: [
            "Seattle",
            "Bothell",
            "Issaquah",
            "Suquamish",
            "Yelm",
            "Yakima",
            "Port Orchard",
            "Auburn",
            "Bainbridge Island",
            "Lynnwood",
            "Olympia",
            "Renton",
            "Tenino",
            "Lacey",
            "Brier",
            "Shoreline",
            "Rochester",
            "Coupeville",
            "Marysville",
            "Pacific",
            "Everett",
            "Edmonds",
            "Wenatchee",
            "Kingston",
            "Mukilteo",
            "Anacortes",
            "Bremerton",
            "Snohomish",
            "Spokane",
            "Oak Harbor",
            "Walla Walla",
            "Mill Creek",
            "Moses Lake",
            "Ephrata",
            "Monroe",
            "Moxee",
            "Olalla",
            "Chewelah",
            "Freeland",
            "Pullman",
            "Ellensburg",
            "Naches",
            "Kettle Falls",
            "Chelan",
            "Quincy",
            "Clinton",
            "Burien",
            "Cashmere",
            "Poulsbo",
            "Vashon",
            "Langley",
            "Newport",
            "Ravensdale",
            "Cle Elum",
            "Redmond",
            "Mount Vernon",
            "Kent",
            "Vancouver",
            "Bellevue",
            "Kirkland",
            "Tukwila",
            "Federal Way",
            "Seabeck",
            "North Bend",
            "Duvall",
            "Woodinville",
            "Sammamish",
            "Brush Prairie",
            "Castle Rock",
            "La Center",
            "Camas",
            "Silverdale",
            "Yacolt",
            "Rainier",
            "Newcastle",
            "Normandy Park",
            "Seatac",
            "Medina",
            "Kenmore",
            "Kelso",
            "Clyde Hill",
            "Lake Stevens",
            "Longview",
            "Lake Forest Park",
            "Arlington",
            "Port Hadlock",
            "Port Townsend",
            "Colville",
            "Ariel",
            "Port Ludlow",
            "Washougal",
            "Des Moines",
            "Kalama",
            "Battle Ground",
            "Camano Island",
            "Woodway",
            "Sequim",
            "Ridgefield",
            "Beaux Arts",
            "Selah",
            "Woodland",
            "Algona",
            "Brinnon",
            "Maple Valley",
            "Enumclaw",
            "Tumwater",
            "Mercer Island",
            "Sunnyside",
            "Nine Mile Falls",
            "Grandview",
            "Zillah",
            "Sultan",
            "Covington",
            "Nordland",
            "Port Angeles",
            "Mountlake Terrace",
            "Toppenish",
            "Bucoda",
            "Silverlake",
            "Goldendale",
            "Indianola",
            "Skykomish",
            "Quilcene",
            "Granger",
            "Cowiche",
            "Granite Falls",
            "Mabton",
            "Stanwood",
            "White Salmon",
            "Wapato",
            "Forks",
            "Black Diamond",
            "Darrington",
            "Tieton",
            "Bingen",
            "Tulalip",
            "Gold Bar",
            "Snoqualmie",
            "Carnation",
            "Keyport",
            "Amboy",
            "Centralia",
            "Union Gap",
            "Milton",
            "Chimacum",
            "Hunts Point",
            "Hansville",
            "Yarrow Point",
            "Outlook",
            "Gig Harbor",
            "Index",
            "Toutle",
        ],
    },
    {
        name: "make",
        options: [
            "TESLA",
            "FORD",
            "NISSAN",
            "KIA",
            "BMW",
            "CHEVROLET",
            "AUDI",
            "SMART",
            "VOLKSWAGEN",
            "TOYOTA",
            "RIVIAN",
            "JEEP",
            "HYUNDAI",
            "FIAT",
            "PORSCHE",
            "CHRYSLER",
            "HONDA",
            "MITSUBISHI",
            "LEXUS",
            "VOLVO",
            "DODGE",
            "MERCEDES-BENZ",
            "SUBARU",
            "JAGUAR",
            "POLESTAR",
            "MINI",
            "LUCID",
            "LAND ROVER",
            "CADILLAC",
            "ALFA ROMEO",
            "FISKER",
            "MAZDA",
            "LINCOLN",
            "GENESIS",
            "TH!NK",
            "GMC",
            "BENTLEY",
            "AZURE DYNAMICS",
        ],
    },
    {
        name: "model",
        options: [
            "MODEL Y",
            "MODEL S",
            "FUSION",
            "LEAF",
            "OPTIMA",
            "X5",
            "I3",
            "BOLT EV",
            "Q5 E",
            "MODEL 3",
            "C-MAX",
            "NIRO",
            "E-TRON",
            "SOUL EV",
            "I8",
            "EV9",
            "FORTWO",
            "SORENTO",
            "E-GOLF",
            "PRIUS PRIME",
            "R1T",
            "RAV4",
            "WRANGLER",
            "KONA",
            "X3",
            "SOUL",
            "MODEL X",
            "500",
            "RAV4 PRIME",
            "IONIQ",
            "ESCAPE",
            "CAYENNE",
            "R1S",
            "VOLT",
            "SANTA FE",
            "330E",
            "F-150",
            "SPARK",
            "TUCSON",
            "PACIFICA",
            "CLARITY",
            "A3",
            "OUTLANDER",
            "NX",
            "EQ FORTWO",
            "MUSTANG MACH-E",
            "ID.4",
            "EDV",
            "XC40",
            "HORNET",
            "SPORTAGE",
            "XC60",
            "EQS-CLASS SUV",
            "PRIUS PLUG-IN",
            "SOLTERRA",
            "EV6",
            "GLE-CLASS",
            "I4",
            "BOLT EUV",
            "Q4",
            "XC90",
            "KONA ELECTRIC",
            "I-PACE",
            "PS2",
            "IONIQ 5",
            "TAYCAN",
            "HARDTOP",
            "GRAND CHEROKEE",
            "AIR",
            "GLC-CLASS",
            "I-MIEV",
            "RANGE ROVER SPORT",
            "IONIQ 6",
            "PRIUS",
            "BZ4X",
            "EQS-CLASS SEDAN",
            "C40",
            "E-TRON SPORTBACK",
            "LYRIQ",
            "TONALE",
            "I5",
            "530E",
            "ARIYA",
            "EQE-CLASS SUV",
            "IX",
            "CROSSTREK",
            "745E",
            "RS E-TRON GT",
            "OCEAN",
            "Q5",
            "FOCUS",
            "EQB-CLASS",
            "ACCORD",
            "V60",
            "CX-90",
            "TRANSIT",
            "E-TRON GT",
            "S60",
            "B-CLASS",
            "COUNTRYMAN",
            "KARMA",
            "BLAZER EV",
            "Q8",
            "RZ 450E",
            "AVIATOR",
            "GV60",
            "ELR",
            "PANAMERA",
            "CITY",
            "740E",
            "EQE-CLASS SEDAN",
            "SILVERADO EV",
            "FORTWO ELECTRIC DRIVE",
            "CORSAIR",
            "HUMMER EV PICKUP",
            "RANGE ROVER",
            "GV70",
            "RANGER",
            "ROADSTER",
            "I7",
            "G80",
            "C-CLASS",
            "S90",
            "SONATA",
            "A7",
            "FLYING SPUR",
            "A8 E",
            "XM",
            "MX-30",
            "S-CLASS",
            "TRANSIT CONNECT ELECTRIC",
            "CT6",
        ],
    },
    {
        name: "electricVehicleType",
        options: [
            "Battery Electric Vehicle (BEV)",
            "Plug-in Hybrid Electric Vehicle (PHEV)",
        ],
    },
    {
        name: "cafvEligibility",
        options: [
            "Clean Alternative Fuel Vehicle Eligible",
            "Eligibility unknown as battery range has not been researched",
            "Not eligible due to low battery range",
        ],
    },
    {
        name: "electricUtility",
        options: [
            "CITY OF SEATTLE - (WA)",
            "PUGET SOUND ENERGY INC",
            "PACIFICORP",
            "PUD NO 1 OF CHELAN COUNTY",
            "MODERN ELECTRIC WATER COMPANY",
            "PUD NO 2 OF GRANT COUNTY",
            "AVISTA CORP",
            "PUD NO 1 OF PEND OREILLE COUNTY",
            "PUD NO 1 OF CLARK COUNTY - (WA)",
            "BONNEVILLE POWER ADMINISTRATION",
            "PUD NO 1 OF COWLITZ COUNTY",
            "PUD 1 OF SNOHOMISH COUNTY",
            "PUD NO 1 OF JEFFERSON COUNTY",
            "NO KNOWN ELECTRIC UTILITY SERVICE",
            "PUD NO 1 OF MASON COUNTY",
            "BENTON RURAL ELECTRIC ASSN",
            "PUD NO 1 OF CLALLAM COUNTY",
            "PUD NO 1 OF KLICKITAT COUNTY",
            "CITY OF PORT ANGELES - (WA)",
            "TANNER ELECTRIC COOP",
            "CITY OF MILTON - (WA)",
            "PENINSULA LIGHT COMPANY",
        ],
    },
];

const columns = [
    "VIN (1-10)",
    "County",
    "City",
    "State",
    "Postal Code",
    "Model Year",
    "Make",
    "Model",
    "Electric Vehicle Type",
    "Clean Alternative Fuel Vehicle (CAFV) Eligibility",
    "Electric Range",
    "Base MSRP",
    "Legislative District",
    "DOL Vehicle ID",
    "Vehicle Location",
    "Electric Utility",
    "2020 Census Tract",
];

function calculateEVStatistics(filteredData: EVData[]) {
    const totalVehicles = filteredData.length;
    let totalRange = 0;
    let validRangeCount = 0;

    let bevVehicles = 0;
    let bevTotalRange = 0;
    let bevValidRangeCount = 0;

    let phevVehicles = 0;
    let phevTotalRange = 0;
    let phevValidRangeCount = 0;

    let cafvEligibleCount = 0;
    let cafvNonEligibleCount = 0;

    filteredData.forEach((vehicle: EVData) => {
        const range = parseInt(vehicle["Electric Range"]) || 0;
        const vehicleType = vehicle["Electric Vehicle Type"];
        const cafvStatus =
            vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];

        if (cafvStatus.includes("Eligible")) {
            cafvEligibleCount++;
        } else {
            cafvNonEligibleCount++;
        }

        if (range > 0) {
            totalRange += range;
            validRangeCount++;
        }

        if (vehicleType === "Battery Electric Vehicle (BEV)") {
            bevVehicles++;
            if (range > 0) {
                bevTotalRange += range;
                bevValidRangeCount++;
            }
        }

        if (vehicleType === "Plug-in Hybrid Electric Vehicle (PHEV)") {
            phevVehicles++;
            if (range > 0) {
                phevTotalRange += range;
                phevValidRangeCount++;
            }
        }
    });

    const averageRange = validRangeCount > 0 ? totalRange / validRangeCount : 0;
    const averageBEVRange =
        bevValidRangeCount > 0 ? bevTotalRange / bevValidRangeCount : 0;
    const averagePHEVRange =
        phevValidRangeCount > 0 ? phevTotalRange / phevValidRangeCount : 0;

    return {
        totalVehicles,
        averageRange: parseFloat(averageRange.toFixed(1)),
        bevStatistics: {
            totalVehicles: bevVehicles,
            averageRange: parseFloat(averageBEVRange.toFixed(1)),
        },
        phevStatistics: {
            totalVehicles: phevVehicles,
            averageRange: parseFloat(averagePHEVRange.toFixed(1)),
        },
        cafvStatistics: {
            eligibleCount: cafvEligibleCount,
            nonEligibleCount: cafvNonEligibleCount,
            eligibilityRate:
                totalVehicles > 0
                    ? parseFloat(
                          ((cafvEligibleCount / totalVehicles) * 100).toFixed(1)
                      )
                    : 0,
        },
    };
}

const Overview = () => {
    const { loading, analytics } = useEVDashboard();
    const [records, setRecords] = useState<EVData[]>();
    const [stats, setStats] = useState<StatsProps>();

    const [filter, setFilter] = React.useState<EVFilters>({} as EVFilters);

    const changeFilter = (key: string, value: string) => {
        const filter = { [key]: value };
        setFilter((prev) => ({ ...prev, ...filter }));
    };

    React.useEffect(() => {
        if (analytics && analytics.filterEVData) {
            const filteredRecords = analytics.filterEVData(filter);
            setRecords(filteredRecords);
            const result = calculateEVStatistics(filteredRecords);
            setStats(result);
        }
    }, [filter, analytics]);

    return (
        <div className="p-2 pt-8 sm:p-8 grow min-w-0">
            <div className="flex flex-wrap justify-center items-center gap-4 w-full mb-8">
                {dropdowns.map((dropdown) => (
                    <SelectColumn
                        key={dropdown.name}
                        options={dropdown.options}
                        setOption={changeFilter}
                        placeholder={dropdown.name}
                    />
                ))}
                <form
                    className="flex flex-col gap-2 form glass"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        changeFilter(
                            "rangeMin",
                            (form.elements[0] as HTMLInputElement).value
                        );
                    }}
                >
                    <input
                        type={"number"}
                        placeholder="Range Min"
                        className="input"
                    />
                </form>
                <form
                    className="flex flex-col gap-2 form glass"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        changeFilter(
                            "rangeMax",
                            (form.elements[0] as HTMLInputElement).value
                        );
                    }}
                >
                    <input
                        type={"number"}
                        placeholder="Range Max"
                        className="input"
                    />
                </form>
                <form
                    className="flex flex-col gap-2 form glass"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        changeFilter(
                            "vin",
                            (form.elements[0] as HTMLInputElement).value
                        );
                    }}
                >
                    <input
                        type={"text"}
                        placeholder="VIN (1-10)"
                        className="input"
                    />
                </form>

                <button
                    className="glass px-9 py-1"
                    onClick={() => {
                        setFilter({} as EVFilters);
                        setRecords([]);
                        setStats(undefined);
                    }}
                >
                    Reset
                </button>
            </div>
            {loading ? (
                <div className="max-h-[60vh] overflow-y-auto w-full overflow-x-auto styled-scrollbar px-4 sm:px-0">
                    <div className="flex flex-col gap-1 w-full">
                        <Skeleton className="h-12 w-full mb-1 sm:mb-3 bg-accent/50" />
                        {Array.from({ length: 20 }, (_, index) => (
                            <Skeleton
                                key={index}
                                className="h-10 w-full sm:mb-1 bg-accent/40"
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="max-h-[60vh] overflow-y-auto w-full overflow-x-auto styled-scrollbar px-4 sm:px-0">
                    <DataTable columns={columns} records={records || []} />
                </div>
            )}

            <Stats loading={loading} stats={stats} />
        </div>
    );
};

export default Overview;
