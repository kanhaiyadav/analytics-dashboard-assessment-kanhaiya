import { useState, useEffect } from "react";
import { EVData } from "@/lib/dataAnalysis";
import Papa from "papaparse";
export function useEVData() {
    const [data, setData] = useState<EVData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/data.csv")
            .then((response) => response.text())
            .then((csvString) => {
                const result = Papa.parse(csvString, { header: true });
                setData(result.data as EVData[]);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
}
