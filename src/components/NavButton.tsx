import { FC } from "react";
import { Button } from "./ui/button";

interface NavButtonProps {}

const NavButton: FC<NavButtonProps> = ({}) => {
  return (
    <div className="space-x-2">
      <Button
        variant="outline"
        className="bg-white text-indigo-600 hover:bg-indigo-50"
      >
        Add new movie
      </Button>
      <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
        Add new review
      </Button>
    </div>
  );
};

export default NavButton;
