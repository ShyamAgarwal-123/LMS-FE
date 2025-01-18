import { useRecoilState } from "recoil";
import { signInService, signUpService } from "@/service";
import {
  signInAtom,
  signInDefault,
  signUpAtom,
  signUpDefault,
} from "@/store/Auth";

export const useSignIn = () => {
  const [signInData, setSignInData] = useRecoilState(signInAtom);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = await signInService(signInData);
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
