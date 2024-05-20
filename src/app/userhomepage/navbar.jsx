"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

function NavList() {
  const router = useRouter();
  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        router.push("/"); 
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link href="/userhomepage">
        <Typography
          as="li"
          variant="medium"
          color="blue-gray"
          className="p-1 font-medium hover:text-light-blue-500"
        >
          Home
        </Typography>
      </Link>
      <Button color='light-blue' onClick={handleLogout}>
        Logout &nbsp;
      </Button>
    </ul>
  );
}

export default function NavbarComponent() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 bg-blue-gray-50">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center">
          <Link href="/userhomepage">
            <Image
            src="/VibeCap_Logo_User.png"
            width={100}
            height={100}
            alt="Logo"
          />
          </Link>
        </div>

        <div className="hidden lg:block">
          <NavList />
        </div>
        
      </div>
    </Navbar>
  );
}