"use client";
import { Exercise } from "@/models/exercise";
import { env } from "@/utils/env";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const [exercise, setExercise] = useState<Exercise>();

  const router = useRouter();

  async function updateExercise() {
    await fetch(env.api + "/exercises/" + params.id, {
      method: "PUT",
      body: JSON.stringify(exercise),
    }).then(() => router.push("/app/exercises"));
  }

  useEffect(() => {
    async function getExercise() {
      await fetch(env.api + "/exercises/" + params.id, { method: "GET" })
        .then((res) => res.json())
        .then((res) => setExercise(res.data));
    }

    getExercise();
  }, [params.id]);
  return <div className="text-9xl">{params.id}</div>;
}
