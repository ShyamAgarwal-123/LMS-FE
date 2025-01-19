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
    const { data } = await axiosInstance.post(`/user/signin`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    if (data.success) {
      const { token } = data.data;
      sessionStorage.setItem("accessToken", JSON.stringify(token.accessToken));
      sessionStorage.setItem(
        "refreshToken",
        JSON.stringify(token.refreshToken)
      );
    }
    return data;
  } catch ({ response }) {
    return response.data;
  }
};

export const getUserService = async () => {
  try {
    const response = await axiosInstance.get(`/user/getUser`);
    return response.data;
  } catch ({ response }) {
    sessionStorage.removeItem("accessToken");
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshToken"));
    if (refreshToken) {
      const data = await refreshAccessToken(refreshToken);
      return data;
    }
    return response.data;
  }
};
export const refreshAccessToken = async (token) => {
  try {
    const { data } = await axiosInstance.get("/user/refreshAccessToken", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
    }
  } catch ({ response }) {
    console.log(response);
    sessionStorage.clear();
    return response.data;
  }
};
