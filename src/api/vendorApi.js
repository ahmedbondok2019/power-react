import apiClient from './client';
import { ENDPOINTS } from './endpoints';

/**
 * Fetch complete vendor page content (hero, benefits, criteria, helpdesk, options)
 * GET /api/v1/vendors/page
 */
export const getVendorPage = async () => {
  const response = await apiClient.get(ENDPOINTS.VENDOR_PAGE);
  return response;
};

/**
 * Fetch vendor form dropdown options (countries, position_titles, available_services)
 * GET /api/v1/vendors/options
 */
export const getVendorOptions = async () => {
  const response = await apiClient.get(ENDPOINTS.VENDOR_OPTIONS);
  return response;
};

/**
 * Check vendor application status by reference number
 * GET /api/v1/vendors/{reference_no}/status
 * @param {string} referenceNo - e.g. "VEN-754774"
 */
export const checkVendorStatus = async (referenceNo) => {
  const response = await apiClient.get(ENDPOINTS.VENDOR_STATUS(referenceNo));
  return response;
};

/**
 * Submit vendor registration form
 * POST /api/v1/vendors/register
 * @param {FormData} formDataPayload
 */
export const registerVendor = async (formDataPayload) => {
  const isFormData = formDataPayload instanceof FormData;

  try {
    const response = await apiClient.post(
      ENDPOINTS.VENDOR_REGISTER,
      formDataPayload,
      isFormData
        ? {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        : undefined
    );
    return response;
  } catch (error) {
    console.warn("Vendor registration request sent:", error);
    throw error;
  }
};
