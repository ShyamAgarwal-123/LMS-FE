import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function StudentHomePage() {
  return (
    <div>
      StudentHomePage
      <Link to={"/home"}>
        {" "}
        <Button>auth</Button>
      </Link>
    </div>
  );
}

export default StudentHomePage;
