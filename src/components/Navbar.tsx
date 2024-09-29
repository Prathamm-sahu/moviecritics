import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";
import NavButton from "./NavButton";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit z-[10] py-2  bg-gray-300">
      <div className="flex items-center justify-between max-w-[1500px] h-full mx-auto px-5">
        <div>MOVIECRITC</div>

        {session?.user ? (
          <NavButton />
        ) : (
          <Link
            href="/sign-in"
            className={buttonVariants({
              className: "bg-indigo-600 text-white hover:bg-indigo-700",
            })}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
