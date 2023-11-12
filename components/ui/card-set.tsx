"use client";
import { SetModel } from "@/models/set";
import { env } from "@/utils/env";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import cookies from "js-cookie";
import { useState } from "react";
import { Button } from "./button";
export function CardSet({
  finished,
  set,
}: {
  finished?: boolean;
  set: SetModel;
}) {
  const handleSet = async () => {
    const at = cookies.get("at");
    await fetch(env.api + `/history`, {
      method: "POST",
      body: JSON.stringify({ setId: set.id, userId: set.userId }),
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        authorization: `Bearer ${at}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 201) {
        }
      });
  };

  const [mFinished, setMFinished] = useState(finished);

  return (
    <div
      className={clsx(
        " rounded-md w-60 h-60 flex flex-col items-center justify-between p-2 transition-all duration-1000",
        {
          "bg-gray1": !mFinished,
          "bg-dark/90": mFinished,
        }
      )}
    >
      <h1
        className={clsx("font-medium text-xl ", {
          "text-white": !mFinished,
          "text-primary": mFinished,
        })}
      >
        {set.exercise.name}
      </h1>
      <AnimatePresence mode="wait">
        {mFinished && (
          <CheckCircledIcon className="text-primary accent-primary stroke-primary stroke-1 fill-primary w-24 h-24" />
        )}
        {mFinished && <div></div>}
        {!mFinished && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <p className="text-gray-400 text-sm">
                {set.series}x{set.reps}
              </p>
              {set.weight && (
                <p className="text-gray-400 text-sm">
                  ${set.weight.toFixed(1)}kg
                </p>
              )}
            </motion.div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleSet();
                setMFinished(true);
              }}
              intent="white"
              className="w-full"
            >
              Finalizar
            </Button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
