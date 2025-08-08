import { logoutService } from "@/service";
import { userDefault, useUserState } from "@/store/user";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { X } from "lucide-react";

function UserProfile({ setState }) {
  const [user, setUser] = useUserState();
  const handleLogOut = async () => {
    const data = await logoutService();
    if (data.success) {
      setUser(userDefault);
      alert("Successfully Logout");
    } else {
      alert("unable to Logout");
    }
  };

  return (
    <Card className="absolute top-16 right-8 p-3 flex-col justify-center items-center z-50 space-y-2">
      <div className="flex justify-end">
        <X
          onClick={() => setState((prev) => !prev)}
          className="cursor-pointer"
        />
      </div>
      <Button onClick={handleLogOut}>Logout</Button>
    </Card>
  );
}

export default UserProfile;
