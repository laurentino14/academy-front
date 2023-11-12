"use client";
import { AuthContext } from "@/contexts/auth";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext, useState } from "react";
import { Button } from "./button";

export const Header = () => {
  const { user, signOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ height: "3.5rem", width: "100%" }}
      layoutRoot
      animate={{
        height: open ? "100vh" : "3.5rem",
        overflow: "hidden",
        width: "100%",
      }}
      transition={{
        duration: 0.3,
        type: "tween",
      }}
      className="flex  px-4 flex-col bg-dark fixed w-full z-10 top-0 md:hidden"
    >
      <div className="py-3 w-full flex justify-between">
        <Link href="/app">
          <div className="w-20 h-8 bg-cover bg-no-repeat  bg-[url(/assets/logo-wo-name.png)] bg-center " />
        </Link>
        <button
          className="mr-2"
          onClick={(e) => {
            e.preventDefault();

            setOpen(!open);
          }}
        >
          <HamburgerMenuIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col w-full mt-10 space-y-5 h-full overflow-scroll">
        {user?.role === "USER" && (
          <>
            <Link passHref href="/app/workouts">
              <Button
                onClick={(e) => setOpen(!open)}
                className="w-full !bg-gray1 text-white hover:bg-opacity-80 "
              >
                Meus treinos
              </Button>
            </Link>
            <Link passHref href="/app/profile">
              <Button
                onClick={(e) => setOpen(!open)}
                className="w-full !bg-gray1 text-white hover:bg-opacity-80 "
              >
                Editar perfil
              </Button>
            </Link>
          </>
        )}
      </div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
          className="w-full mb-5"
          intent="primary"
        >
          Sair
        </Button>
      </motion.div>
    </motion.header>
  );
};
