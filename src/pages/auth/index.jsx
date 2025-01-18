import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import FormComponent from "@/components/form";
import { signUpFormFields, signInFormFields } from "@/formFields";
import { useSignIn } from "@/store/Auth";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const [signInData, setSignInData] = useSignIn();
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
          <FormComponent
            formFields={signInFormFields}
            formData={signInData}
            setFormData={setSignInData}
            buttonText="SignIn"
          />
        </TabsContent>
        <TabsContent value="signup">
          <FormComponent formFields={signUpFormFields} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPage;
