import apiClient from './client';
import { ENDPOINTS } from './endpoints';

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
