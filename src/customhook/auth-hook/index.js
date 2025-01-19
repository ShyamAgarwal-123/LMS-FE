import { useRecoilState } from "recoil";
import { signInService, signUpService, getUserService } from "@/service";
import {
  signInAtom,
  signInDefault,
  signUpAtom,
  signUpDefault,
  userAtom,
  userDefault,
} from "@/store/Auth";
import { useEffect } from "react";

export const useSignIn = () => {
  const [signInData, setSignInData] = useRecoilState(signInAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = await signInService(signInData);
    if (data.success) {
      setUser({
        authenticate: true,
        user: data.data,
      });
    } else {
      setUser(userDefault);
    }
    setSignInData(signInDefault);
    console.log(data);
  };

  return [signInData, setSignInData, handleSignIn];
};

export const useSignUp = () => {
  const [signUpData, setSignUpData] = useRecoilState(signUpAtom);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = await signUpService(signUpData);
    setSignUpData(signUpDefault);
    console.log(data);
  };

  return [signUpData, setSignUpData, handleSignUp];
};

export const useCheckAuthUser = () => {
  const [user, setUser] = useRecoilState(userAtom);

  async function checkAuthUser() {
    const data = await getUserService();
    console.log(data);
    if (data.sucess)
      setUser({
        authenticate: true,
        user: data.data,
      });
    else setUser(userDefault);
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return user.user;
};
