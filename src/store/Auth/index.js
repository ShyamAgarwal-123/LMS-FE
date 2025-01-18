import { atom, useRecoilState } from "recoil";

export const signInAtom = atom({
  key: "signInAtom",
  default: {},
});

export const useSignIn = () => useRecoilState(signInAtom);
