import { useEVData } from "./useEVdata";
import { useEVAnalytics } from "@/lib/dataAnalysis";

export function useEVDashboard() {
    const { data, loading, error } = useEVData();
    const analytics = useEVAnalytics(data);

    return {
        data,
        loading,
        error,
        analytics,
        isReady: !loading && !error && analytics.isReady,
    };
}
