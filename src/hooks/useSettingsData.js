import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../api/settingsApi';

export const useSettingsData = () => {
  return useQuery({
    queryKey: ['settingsData'],
    queryFn: getSettings,
    staleTime: 60 * 60 * 1000, // Cache for 1 hour since settings rarely change
    retry: 2,
  });
};
