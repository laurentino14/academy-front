"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/auth";
import { Set } from "@/models/set";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
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
    </div>
  );
}

function CardSet({ finished, set }: { finished?: boolean; set?: Set }) {
  return (
    <div
      className={clsx(
        " rounded-md w-60 h-60 flex flex-col items-center justify-between p-2",
        {
          "bg-gray1": !finished,
          "bg-dark/90": finished,
        }
      )}
    >
      <h1
        className={clsx("font-medium text-xl ", {
          "text-white": !finished,
          "text-primary": finished,
        })}
      >
        Remada
      </h1>
      {finished && (
        <CheckCircledIcon className="text-primary accent-primary stroke-primary stroke-1 fill-primary w-24 h-24" />
      )}
      {finished && <div></div>}
      {!finished && (
        <>
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm">3x12</p>
            <p className="text-gray-400 text-sm">20,0kg</p>
          </div>
          <Button intent="white" className="w-full">
            Finalizar
          </Button>
        </>
      )}
    </div>
  );
}
