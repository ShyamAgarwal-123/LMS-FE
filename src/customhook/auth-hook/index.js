import { getUserService } from "@/service";
import { userDefault, useUserState } from "@/store/user";
import { useEffect } from "react";

export const useCheckAuthUser = () => {
  const [userState, setUserState] = useUserState();

  async function checkAuthUser() {
    const data = await getUserService();
    console.log(data);
    if (data.sucess)
      setUserState({
        authenticated: true,
        user: data.data.user,
      });
    else setUserState(userDefault);
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return { userState };
};
