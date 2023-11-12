"use client";

import { CardSet } from "@/components/ui/card-set";
import { AuthContext } from "@/contexts/auth";
import { Set } from "@/models/set";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Page() {
  const { user } = useContext(AuthContext);
  const [sets, setSets] = useState<Set[]>([]);
  useEffect(
    () => {
      user?.sets.forEach((set) => {
        setSets([...sets, set]);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return (
    <div className="w-full pt-20 flex-col flex space-y-10 px-20 justify-center">
      {user?.role === "USER" && (
        <>
          {/*  */}
          <h1 className="w-full  font-medium text-2xl">Exercícios do dia</h1>
          {sets.map((set, i) => {
            const find = user?.history.find(
              (h) => h.setId === set.id && h.createdAt === new Date()
            );

            if (find) {
              return <CardSet finished key={i} set={set} />;
            }

            return <CardSet key={i} set={set} />;
          })}

          <div className="grid gap-y-10 grid-cols-4">
            <CardSet finished />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
            <CardSet />
          </div>
        </>
      )}

      {user?.role === "INSTRUCTOR" && (
        <>
          {/* INSTRUCTOR */}

          <div className="flex flex-col  ">
            <Image src="/assets/logo.png" alt="logo" width={100} height={100} />
            <p className="">
              "Bem-vindo à sua plataforma de excelência! Aqui, você, instrutor,
              é a inspiração. Desperte o potencial máximo dos seus alunos e
              transforme cada sessão em uma experiência única e motivadora.
              Vamos construir juntos um caminho de sucesso fitness!"
            </p>
          </div>
        </>
      )}

      {user?.role === "ADMIN" && <>{/* ADMIN */}</>}
    </div>
  );
}
