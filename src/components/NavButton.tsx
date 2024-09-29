"use client"

import { FC } from "react";
import { Button } from "./ui/button";
import AddMovieDialog from "./AddMovieDialog";
import AddReviewDialog from "./AddReviewDialog";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

interface NavButtonProps {}

const NavButton: FC<NavButtonProps> = ({}) => {
  return (
    <div className="space-x-2 flex">
      <AddMovieDialog />
      <AddReviewDialog />
      <Button
        className="bg-white text-indigo-600 hover:bg-indigo-50 rounded border-2 border-indigo-300"
        onClick={() => {
          signOut({
            callbackUrl: `${window.location.origin}/sign-in`,
          });
        }}
      >
        <LogOutIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NavButton;
