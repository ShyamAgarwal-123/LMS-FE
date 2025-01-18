import axios from "axios";

export const signUpService = async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/${formData.role}s/signup`,
      formData
    );
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};

export const signInService = async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/${formData.role}s/signin`,
      formData
    );
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};
