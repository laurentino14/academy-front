import { useState } from "react";
import { motion } from 'framer-motion';
import { Workout } from '@/models/workout';
import { ChevronDownIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { SetModel } from '@/models/set';
import clsx from 'clsx';
import Link from "next/link";
import { env } from "@/utils/env";
import cookies from 'js-cookie';




export function WorkoutCard({ workout }: { workout: Workout}) {
    const [open, setOpen] = useState(false);
    const [workouts, setWorkouts] = useState<Workout[]>();
    console.log(workout, "workout");

    const handleRemove = async (id: string) => {
      const at = cookies.get("at");
  
      await fetch(env.api + `/workout/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${at}`,
        },
      }).finally(async () => {
        await fetch(env.api + `/workout`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${at}`,
          },
        })
          .then((res) => res.json())
          .then((res: { data: Workout[] }) =>
            setWorkouts(res.data.filter((e) => !e.deletedAt))
          );
      });
    };

    return (
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : "4rem",
        }}
        className="w-full  overflow-hidden bg-dark/70 rounded-md "
      >
        <div className="w-full flex px-4 bg-dark items-center justify-between h-[4rem]">
          <Link href={`/app/workouts/edit/${workout.id}`}><Pencil2Icon/></Link>
          <button
          onClick={(e) => {
            e.preventDefault();
            handleRemove(workout.id);
          }}
          className=" flex justify-center items-center w-fit p-1   rounded-md "
        >
          <TrashIcon color="#EB1D63" className=" w-5 h-5" />{" "}
        </button>
          <h1 className="font-medium">{workout.name}</h1>
          <div className="flex gap-5">
            <div className="text-sm text-end flex flex-col">
              <h1 className="font-medium">
                Professor: {workout.instructor.name}
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
        <div className="flex w-full py-4 justify-center gap-10 px-4">
          {/* 'BACK' | 'CHEST' | 'LEGS' | 'SHOULDERS' | 'ARMS' | 'ABS'; */}
          <div className="w-full  flex  items-center gap-2 ">
            <ul className="flex h-full w-full flex-col gap-5   flex-1  ">
              <ul className="space-y-2 flex flex-col">
                <h1 className="font-medium text-sm  w-full  text-opacity-70 ">
                  Domingo
                </h1>
                <div className="flex gap-5 flex-wrap  ">
                  {workout?.sets
                    ?.sort((a, b) => b.type.length - a.type.length)
                    .map((set, i) => {
                      if (set.day === "SUNDAY") {
                        return <SetLi key={i} set={set} />;
                      }
                    })}
                </div>
              </ul>
              <ul className="space-y-2 flex  flex-col">
                <h1 className="font-medium text-sm  w-full text-opacity-70 ">
                  Segunda
                </h1>
                <div className="flex gap-5 flex-wrap  ">
                  {workout?.sets
                    ?.sort((a, b) => b.type.length - a.type.length)
                    .map((set, i) => {
                      if (set.day === "MONDAY") {
                        return <SetLi key={i} set={set} />;
                      }
                    })}
                </div>
              </ul>
              <ul className="space-y-2 flex  flex-col">
                <h1 className="font-medium text-sm  w-full text-opacity-70 ">
                  Terça
                </h1>
                <div className="flex gap-5 flex-wrap  ">
                  {workout?.sets
                    ?.sort((a, b) => b.type.length - a.type.length)
                    .map((set, i) => {
                      if (set.day === "TUESDAY") {
                        return <SetLi key={i} set={set} />;
                      }
                    })}
                </div>
              </ul>
              <ul className="space-y-2 flex  flex-col">
                <h1 className="font-medium text-sm  w-full text-opacity-70 ">
                  Quarta
                </h1>
                <div className="flex gap-5 flex-wrap  ">
                  {workout?.sets
                    ?.sort((a, b) => b.type.length - a.type.length)
                    .map((set, i) => {
                      if (set.day === "WEDNESDAY") {
                        return <SetLi key={i} set={set} />;
                      }
                    })}
                </div>
              </ul>
  
              <ul className="space-y-2 flex  flex-col">
                <h1 className="font-medium text-sm  w-full text-opacity-70 ">
                  Quinta
                </h1>
                <div className="flex gap-5 flex-wrap  ">
                  {workout?.sets
                    ?.sort((a, b) => b.type.length - a.type.length)
                    .map((set, i) => {
                      if (set.day === "THURSDAY") {
                        return <SetLi key={i} set={set} />;
                      }
                    })}
                </div>
              </ul>
              <ul className="space-y-2 flex  flex-col">
                <h1 className="font-medium text-sm  w-full text-opacity-70 ">
                  Sexta
                </h1>
                <div className="flex gap-5 flex-wrap  ">
                  {workout?.sets
                    ?.sort((a, b) => b.type.length - a.type.length)
                    .map((set, i) => {
                      if (set.day === "FRIDAY") {
                        return <SetLi key={i} set={set} />;
                      }
                    })}
                </div>
              </ul>
              <ul className="space-y-2 flex  flex-col">
                <h1 className="font-medium text-sm  w-full text-opacity-70 ">
                  Sábado
                </h1>
                <div className="flex gap-5 flex-wrap  ">
                  {workout?.sets
                    ?.sort((a, b) => b.type.length - a.type.length)
                    .map((set, i) => {
                      if (set.day === "SATURDAY") {
                        return <SetLi key={i} set={set} />;
                      }
                    })}
                </div>
              </ul>
            </ul>
          </div>
        </div>
      </motion.div>
    );


    function SetLi({ set }: { set: SetModel }) {
        return (
          <li className="flex max-w-xs w-fit rounded-md  h-10 bg-black/20 px-4 items-center gap-2 justify-between text-sm">
            <div className="flex items-center  gap-5">
              <h2 className="font-medium ">{set.exercise.name}</h2>
              <span
                className={clsx("text-xs font-semibold  px-2 py-[2px] rounded-md", {
                  "text-red-500 bg-black/50": set.type === "ARMS",
                  "text-blue-500 bg-black/50": set.type === "BACK",
                  "text-green-500 bg-black/50": set.type === "LEGS",
                  "text-yellow-500 bg-black/50": set.type === "SHOULDERS",
                  "text-primary bg-black/50 ": set.type === "CHEST",
                  "text-purple-500 bg-black/50": set.type === "ABS",
                })}
              >
                {set.type === "ABS"
                  ? "Abdominal".toUpperCase()
                  : set.type === "ARMS"
                  ? "Braço".toUpperCase()
                  : set.type === "BACK"
                  ? "Costas".toUpperCase()
                  : set.type === "CHEST"
                  ? "Peito".toUpperCase()
                  : set.type === "LEGS"
                  ? "Perna".toUpperCase()
                  : set.type === "SHOULDERS"
                  ? "Ombro".toUpperCase()
                  : "N/A"}
              </span>
            </div>
          </li>
        );
      }
      

  }