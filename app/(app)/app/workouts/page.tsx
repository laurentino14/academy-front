"use client";

import { AuthContext } from "@/contexts/auth";
import { Set } from "@/models/set";
import { Workout } from "@/models/workout";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";

export default function Page() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col w-full pt-20 px-20">
      <h1 className="text-2xl ">Meus treinos</h1>
      <motion.div layout className="mt-10 space-y-5">
        <AnimatePresence mode="popLayout">
          {user &&
            user.workouts.map((workout, i) => {
              return <>{workout.id}</>;
            })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function WorkoutCard({ workout }: { workout: Workout }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={false}
      animate={{
        height: open ? "auto" : "4rem",
      }}
      className="w-full  overflow-hidden bg-dark/70 rounded-md "
    >
      <div className="w-full flex px-4 bg-dark items-center justify-between h-[4rem]">
        <h1 className="font-medium">{workout?.name}Perda de peso</h1>
        <div className="flex gap-5">
          <div className="text-sm text-end flex flex-col">
            <h1 className="font-medium">
              Professor: {workout?.instructor?.name}Lucas
            </h1>
            <h2 className="font-medium text-xs">
              Criado em{" "}
              {workout
                ? new Date(workout?.createdAt).toLocaleDateString("pt-BR")
                : new Date().toLocaleDateString("pt-BR")}
            </h2>
          </div>
          <button onClick={(e) => setOpen(!open)}>
            <ChevronDownIcon className="scale-150" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-10 px-4">
        {/* 'BACK' | 'CHEST' | 'LEGS' | 'SHOULDERS' | 'ARMS' | 'ABS'; */}
        <div className="w-full flex flex-col gap-2 ">
          <h1 className="w-full mt-4 font-medium rounded-md bg-gray py-3 text-center">
            Peito
          </h1>
          <ul className="flex flex-col ">
            {workout?.sets?.map((set, i) => {
              if (set.type === "CHEST") {
                return <SetLi key={i} set={set} />;
              }
            })}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="w-full mt-4 font-medium rounded-md bg-gray py-3 text-center">
            Costas
          </h1>
          <ul className="flex flex-col ">
            {workout?.sets?.map((set, i) => {
              if (set.type === "BACK") {
                return <SetLi key={i} set={set} />;
              }
            })}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <h1 className="w-full mt-4 font-medium rounded-md bg-gray py-3 text-center">
            Pernas
          </h1>
          <ul className="flex flex-col ">
            {workout?.sets?.map((set, i) => {
              if (set.type === "LEGS") {
                return <SetLi key={i} set={set} />;
              }
            })}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="w-full mt-4 font-medium rounded-md bg-gray py-3 text-center">
            Ombros
          </h1>
          <ul className="flex flex-col ">
            {workout?.sets?.map((set, i) => {
              if (set.type === "SHOULDERS") {
                return <SetLi key={i} set={set} />;
              }
            })}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <h1 className="w-full mt-4 font-medium rounded-md bg-gray py-3 text-center">
            Bracos
          </h1>
          <ul className="flex flex-col ">
            {workout?.sets?.map((set, i) => {
              if (set.type === "ARMS") {
                return <SetLi key={i} set={set} />;
              }
            })}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="w-full mt-4 font-medium rounded-md bg-gray py-3 text-center">
            Abdomen
          </h1>
          <ul className="flex flex-col ">
            {workout?.sets?.map((set, i) => {
              if (set.type === "ABS") {
                return <SetLi key={i} set={set} />;
              }
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function SetLi({ set }: { set: Set }) {
  return (
    <li className="flex justify-between text-sm">
      <h2 className="font-medium">{set.Exercise.name}</h2>
      <div className="space-x-2">
        <span className="text-sm">
          {3}x{set.reps}
        </span>
        <span>
          {set.weight}
          {set.weight && "kg"}
        </span>
      </div>
    </li>
  );
}
