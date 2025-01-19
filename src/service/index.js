import { axiosInstance, axiosInstanceWithAuth } from "@/api/axiosInstance.js";

export const signUpService = async (formData) => {
  try {
    const response = await axiosInstance.post(`/user/signup`, formData);
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};

export const signInService = async (formData) => {
  try {
    const response = await axiosInstance.post(`/user/signin`, formData);
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};

export const getUserService = async () => {
  try {
    const response = await axiosInstanceWithAuth.get(`/user/getUser`);
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};
