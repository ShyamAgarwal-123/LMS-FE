import { axiosInstanceWithAuth } from "@/api/axiosInstance.js";

export const signUpService = async (formData) => {
  try {
    const response = await axiosInstanceWithAuth.post(`/user/signup`, formData);
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};

export const signInService = async (formData) => {
  try {
    const { data } = await axiosInstanceWithAuth.post(
      `/user/signin`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    return data;
  } catch ({ response }) {
    return response.data;
  }
};

export const getUserService = async () => {
  try {
    const response = await axiosInstanceWithAuth.get(`/user/getUser`);
    return response.data;
  } catch ({ response: { data } }) {
    const refreshData = await refreshAccessToken();
    return refreshData;
  }
};

export const refreshAccessToken = async () => {
  try {
    const { data } = await axiosInstanceWithAuth.get(
      "/user/refreshAccessToken"
    );
    return data;
  } catch ({ response }) {
    return response.data;
  }
};
