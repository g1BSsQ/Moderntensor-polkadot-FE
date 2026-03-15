import React, { createContext, useState, useEffect, useCallback } from 'react';
import { BridgeData } from '../types';

interface DataBridgeContextValue {
  data: BridgeData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export const DataBridgeContext = createContext<DataBridgeContextValue>({
  data: null,
  loading: true,
  error: null,
  refresh: () => {},
});

export const DataBridgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<BridgeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/data');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const json: BridgeData = await res.json();
      setData(json);
      setError(null);
    } catch (e: any) {
      console.error('Data Bridge fetch error:', e);
      setError(e.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <DataBridgeContext.Provider value={{ data, loading, error, refresh: fetchData }}>
      {children}
    </DataBridgeContext.Provider>
  );
};
