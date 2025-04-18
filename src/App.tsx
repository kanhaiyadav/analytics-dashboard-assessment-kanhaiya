// Create a hook to load and process CSV data
import { useState, useEffect } from "react";
import Papa from "papaparse";

// Define an interface for your data structure
interface CSVRow {
  [key: string]: string | number | boolean | null;
}

export function App() {
    const [data, setData] = useState<CSVRow[]>([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetch("/data.csv")
            .then((response) => response.text())
            .then((csvString) => {
                const result = Papa.parse(csvString, { header: true });
                console.log(result);
                setData(result.data as CSVRow[]);
                console.log(result.data[324]);
                // Removed console.log(data) to avoid dependency issues
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Hello</h1>
            {loading && <p>Loading...</p>}
            <div className="text-green-500">
                {JSON.stringify(data)}
            </div>
        </div>
    );
}
