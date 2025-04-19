import { useState, useEffect } from "react";
import Papa from "papaparse";
export function useEVData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/data.csv")
            .then((response) => response.text())
            .then((csvString) => {
                const result = Papa.parse(csvString, { header: true });
                setData(result.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
}
