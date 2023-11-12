"use client";
import { AuthContext } from "@/contexts/auth";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Button } from "./button";

export function Sidebar() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <aside className="bg-dark h-screen overflow-y-auto  hidden md:flex flex-col items-center justify-between sticky top-0  w-full max-w-xs">
      <div className="w-full flex  flex-col">
        <Link href="/app">
          <Image src="/assets/logo.png" alt="" width={500} height={500} />
        </Link>
        <h1 className="w-full text-center">
          Bem vindo{" "}
          <span className="font-medium text-primary">{user?.name}</span>!{" "}
        </h1>

        <div className="w-full   overflow-y-auto px-4 space-y-4 mt-20">
          {user?.role === "USER" && (
            <div className="flex    flex-col space-y-4">
              <Link passHref href="/app/workouts">
                <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                  Meus treinos
                </Button>
              </Link>
              <Link passHref href="/app/profile">
                <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                  Editar perfil
                </Button>
              </Link>
            </div>
          )}
          {user?.role === "ADMIN" && (
            <>
              <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                123
              </Button>
              <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                123
              </Button>
              <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                123
              </Button>
              <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                123
              </Button>
            </>
          )}
          {user?.role === "INSTRUCTOR" && (
            <div className="flex flex-col space-y-4">
              <Link passHref href="/app/exercises">
                <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                  Exercicios
                </Button>
              </Link>
              <Link passHref href="/app/exercises/new">
                <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                  Cadastrar exercicios
                </Button>
              </Link>
              <Link passHref href="/app/exercises/listing">
                <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                  Listagem de exercicios
                </Button>
              </Link>
              <Link passHref href="/app/workouts/new">
                <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                  Cadastro de treino
                </Button>
              </Link>
              <Link passHref href="/app/exercises/list-training-all">
                <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                  Listar todos os treinos
                </Button>
              </Link>
              <Link passHref href="/app/profile">
                <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                  Editar perfil
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="w-full   p-4">
        {user?.role === "USER" && (
          <>
            <p className="mt-2 text-primary font-medium w-full text-center">
              {user?.hash}
            </p>
            <p className="my-2 text-xs opacity-50 font-medium w-4/5 mx-auto text-center">
              Ao solicitar um treino, voce deve informar este número ao
              instrutor.
            </p>
          </>
        )}
        <Button
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
          className="w-full"
          intent="primary"
        >
          Sair
        </Button>
      </div>
    </aside>
  );
}
