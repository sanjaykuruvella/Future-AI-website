import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api/config';

export function useBackendStatus() {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/`);
                setIsConnected(response.ok);
            } catch (error) {
                setIsConnected(false);
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, []);

    return isConnected;
}
