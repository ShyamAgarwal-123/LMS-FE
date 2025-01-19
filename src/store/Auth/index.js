import { atom } from "recoil";

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

export const userDefault = {
  authenticate: false,
  user: null,
};

export const userAtom = atom({
  key: "userAtom",
  default: userDefault,
});
