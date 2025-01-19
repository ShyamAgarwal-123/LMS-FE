import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSignUp } from "@/store/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SignUpForm() {
  const [signUpData, setSignUpData, handelSignUp] = useSignUp();

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Sign up to your account</CardTitle>
        <CardDescription>Enter your details to create account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handelSignUp} className="flex flex-col gap-3">
          <div>
            <Label htmlFor={"username"}>Username</Label>
            <Input
              placeholder={"Enter Username"}
              id={"username"}
              type={"text"}
              value={signUpData.username}
              onChange={(e) =>
                setSignUpData({ ...signUpData, username: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor={"email"}>User Email</Label>
            <Input
              placeholder={"Enter Your Email"}
              id={"email"}
              type={"email"}
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor={"password"}>Password</Label>
            <Input
              placeholder={"Enter Your Password"}
              id={"password"}
              type={"password"}
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row-reverse items-center gap-2">
            <Label htmlFor={"role"}>Sign up as Admin</Label>
            <Input
              type={"checkbox"}
              className="h-3 w-3"
              checked={signUpData.role === "admin"}
              onChange={(e) => {
                if (e.target.checked) {
                  setSignUpData({ ...signUpData, role: "admin" });
                } else {
                  setSignUpData({ ...signUpData, role: "user" });
                }
              }}
            />
          </div>
          <Button type="submit">Sign up</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignUpForm;
