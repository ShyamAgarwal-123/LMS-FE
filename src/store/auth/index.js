import { atom, useRecoilState } from "recoil";
import { signInService, signUpService } from "@/service";
import { useUserState, userDefault } from "../user";
export const signInDefault = {
  email: "",
  password: "",
};

export const signInAtom = atom({
  key: "signInAtom",
  default: signInDefault,
});

export const signUpDefault = {
  username: "",
  email: "",
  password: "",
  role: "user",
};

export const signUpAtom = atom({
  key: "signUpAtom",
  default: signUpDefault,
});

export const useSignIn = () => {
  const [signInData, setSignInData] = useRecoilState(signInAtom);
  const [userState, setUserState] = useUserState();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = await signInService(signInData);
    console.log(userState);

    if (data.success) {
      setUserState({
        authenticated: true,
        user: data.data.user,
      });
    } else {
      setUserState(userDefault);
    }
    setSignInData(signInDefault);
  };

  return [signInData, setSignInData, handleSignIn];
};

export const useSignUp = () => {
  const [signUpData, setSignUpData] = useRecoilState(signUpAtom);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = await signUpService(signUpData);
    setSignUpData(signUpDefault);
  };

  return [signUpData, setSignUpData, handleSignUp];
};
