import { getUserService } from "@/service";
import { userDefault, useUserState } from "@/store/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckAuthUser = () => {
  const [userState, setUserState] = useUserState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function checkAuthUser() {
    try {
      setLoading(true);
      const data = await getUserService();
      console.log(data);
      if (data?.success) {
        setUserState({
          authenticated: true,
          user: data.data,
        });
      } else setUserState(userDefault);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return { userState, loading };
};
