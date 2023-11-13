"use client";
import { CardExercise } from "@/components/ui/card-exercises";
import { Input } from "@/components/ui/input";
import { Exercise } from "@/models/exercise";
import { env } from "@/utils/env";
import cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Page() {
  const [exercise, setExercise] = useState<Exercise[]>();

  useEffect(() => {
    async function t() {
      const at = cookies.get("at");
      await fetch(env.api + "/exercise", {
        method: "GET",
        headers: {
          authorization: "Bearer " + at,
        },
      })
        .then((res) => res.json())
        .then((res) => setExercise(res.data));
    }
    t();
  }, []);

  useEffect(() => {
    console.log(exercise);
  }, [exercise]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center space-y-4  px-4 py-20 ">
      <div className="w-full ">
        <Input placeholder="Filtrar" className="!bg-dark w-full sm:w-auto " />
      </div>
      <div className="w-full flex flex-wrap justify-between sm:justify-normal gap-2 ">
        {exercise &&
          exercise.map((e, i) => {
            return <CardExercise key={i} data={e} />;
          })}
      </div>
    </div>
  );
}
