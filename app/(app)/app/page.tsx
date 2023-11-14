"use client";

import { CardSet } from "@/components/ui/card-set";
import { AuthContext } from "@/contexts/auth";
import { SetModel } from "@/models/set";
import { env } from "@/utils/env";
import cookies from "js-cookie";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export default function Page() {
  const { user } = useContext(AuthContext);
  const [sets, setSets] = useState<SetModel[]>();
  async function t() {
    const at = cookies.get("at");
    await fetch(env.api + `/set/user/${user!.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        authorization: `Bearer ${at}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setSets(res.data.filter((set: SetModel) => !set.deletedAt));
      });
  }
  useEffect(
    () => {
      if (user && user.role === "USER") t();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  useEffect(() => {
    console.log(sets);
  }, [sets]);

  return (
    <div className="w-full flex-col flex space-y-10 min-h-full py-20 px-10 justify-center">
      {user && user.role === "USER" && (
        <>
          {/*  */}
          <h1 className="w-full  font-medium text-2xl">Exercícios do dia</h1>

          <div className="flex justify-center sm:justify-between lg:justify-normal items-center flex-wrap gap-5 lg:gap-10 ">
            {sets &&
              sets.map((set, i) => {
                console.log(sets);
                const find = user.history.find(
                  (h) =>
                    h.setId === set.id &&
                    new Date(h.createdAt).toDateString() ===
                      new Date(set.createdAt).toDateString()
                );

                if (find) {
                  return <CardSet finished key={i} set={set} />;
                }

                if (set.day === days[new Date().getDay()]) {
                  return <CardSet key={i} set={set} />;
                }
              })}
          </div>
        </>
      )}

      {user?.role === "INSTRUCTOR" && (
        <>
          {/* INSTRUCTOR */}

          <div className="flex flex-col justify-center items-center ">
            <Image
              className="lg:hidden md:hidden"
              src="/assets/logo.png"
              alt="logo"
              width={600}
              height={600}
              quality={100}
            />
            <h1 className="font-bold">Aqui você é a inspiração!</h1>
            <p className="max-w-sm  text-center ">
              Desperte o potencial máximo dos seus alunos e transforme cada
              sessão em uma experiência única e motivadora.
            </p>
          </div>
        </>
      )}

      {user?.role === "ADMIN" && <>{/* ADMIN */}</>}
    </div>
  );
}
