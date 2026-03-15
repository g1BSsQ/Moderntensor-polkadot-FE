import { useContext } from 'react';
import { DataBridgeContext } from '../context/DataBridgeContext';

/**
 * Hook to access the data bridge context.
 * Returns { data, loading, error, refresh } from the DataBridgeProvider.
 */
export function useDataBridge() {
  const context = useContext(DataBridgeContext);
  if (!context) {
    throw new Error('useDataBridge must be used within a DataBridgeProvider');
  }
  return context;
}
