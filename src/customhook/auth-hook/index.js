import { getUserService } from "@/service";
import { userDefault, useUserState } from "@/store/user";
import { useEffect, useState } from "react";

export const useCheckAuthUser = () => {
  const [userState, setUserState] = useUserState();
  const [loading, setLoading] = useState(true);

  async function checkAuthUser() {
    try {
      setLoading(true);
      // await new Promise((res) => setTimeout(res, 2000));
      const data = await getUserService();
      if (data?.success)
        setUserState({
          authenticated: true,
          user: data.data,
        });
      else setUserState(userDefault);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return { userState, loading };
};
