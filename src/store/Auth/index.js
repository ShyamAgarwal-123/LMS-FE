import { atom } from "recoil";

export const signInDefault = {
  email: "",
  password: "",
  role: "user",
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
