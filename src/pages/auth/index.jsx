import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { SignInForm, SignUpForm } from "@/components/form";
import { useCheckAuthUser } from "@/customhook/auth-hook";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const user = useCheckAuthUser();
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Tabs
        value={activeTab}
        defaultValue="signin"
        onValueChange={(e) => setActiveTab(e)}
        className="w-full max-w-md"
      >
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPage;
