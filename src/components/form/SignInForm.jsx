import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSignIn } from "@/hooks/auth-hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SignInForm() {
  const [signInData, setSignInData, handelSignIn] = useSignIn();

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handelSignIn} className="flex flex-col gap-3">
          <div>
            <Label htmlFor={"email"}>User Email</Label>
            <Input
              placeholder={"Enter Your Email"}
              id={"email"}
              type={"email"}
              value={signInData.email}
              onChange={(e) =>
                setSignInData({ ...signInData, email: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor={"password"}>Password</Label>
            <Input
              placeholder={"Enter You Password"}
              id={"password"}
              type={"password"}
              value={signInData.password}
              onChange={(e) =>
                setSignInData({ ...signInData, password: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row-reverse items-center gap-2">
            <Label htmlFor={"role"}>Sign In as Admin</Label>
            <Input
              type={"checkbox"}
              className="h-3 w-3"
              checked={signInData.role === "admin"}
              onChange={(e) => {
                if (e.target.checked) {
                  setSignInData({ ...signInData, role: "admin" });
                } else {
                  setSignInData({ ...signInData, role: "user" });
                }
              }}
            />
          </div>
          <Button type="submit">Sign in</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignInForm;
