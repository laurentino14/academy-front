"use client";
import { AuthContext } from "@/contexts/auth";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Button } from "./button";

export function Sidebar() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <aside className="bg-dark min-h-screen hidden md:flex flex-col items-center justify-between sticky top-0  w-full max-w-xs">
      <div className="w-full flex h-full flex-col">
        <Link href="/app">
          <Image src="/assets/logo.png" alt="" width={500} height={500} />
        </Link>
        <h1 className="w-full text-center">
          Bem vindo{" "}
          <span className="font-medium text-primary">{user?.name}</span>!{" "}
        </h1>
        <div className="w-full flex-1 h-full overflow-y-auto px-4 space-y-4 mt-20">
          {user?.role === "USER" && (
            <div className="flex flex-col space-y-4">
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
              <Link passHref href="/app/exercises/register">
                <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                  Cadastrar exercicios
                </Button>
              </Link>
              <Link passHref href="/app/exercises/listing">
                <Button className="w-full !bg-gray1 text-white hover:bg-opacity-80 ">
                  Listagem de exercicios
                </Button>
              </Link>
              <Link passHref href="/app/exercises/training-registration">
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
      <div className="w-full  p-4">
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
