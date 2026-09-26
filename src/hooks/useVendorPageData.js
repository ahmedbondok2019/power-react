import { useQuery } from '@tanstack/react-query';
import { getVendorPage } from '../api/vendorApi';
import { useLanguage } from '../contexts/LanguageContext';

export const VENDOR_PAGE_QUERY_KEY = (lang = 'ar') => ['vendor-page', lang];

export const useVendorPageData = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: VENDOR_PAGE_QUERY_KEY(lang),
    queryFn: getVendorPage,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export default useVendorPageData;
