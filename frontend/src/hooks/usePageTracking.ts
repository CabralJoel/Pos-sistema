import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
        window.electronAPI.setCurrentPage(location.pathname);
    }, [location.pathname]);
}
