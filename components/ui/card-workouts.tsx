import { useEffect, useState, useContext } from 'react';
import cookies from 'js-cookie';
import { env } from "@/utils/env";
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '@/contexts/auth';
import { Workout } from '@/models/workout';

export default function CardWorkouts() {
    const { user } = useContext(AuthContext);
    const [workouts, setWorkouts] = useState<Workout[]>();
  
    useEffect(() => {
      const t = async function () {
        const at = cookies.get("at");
        await fetch(env.api + `/workout/user/${user!.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            authorization: `Bearer ${at}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setWorkouts(res.data);
          });
      };
      if (user && user.role === "USER") t();
    }, [user]);
    return (
      <div className="flex flex-col w-full py-20 lg:px-20 sm:px-10 px-4">
        <h1 className="text-2xl ">Meus treinos</h1>
        <motion.div layout className="mt-10 space-y-5">
          <AnimatePresence mode="popLayout">
            {workouts &&
              workouts.map((workout, i) => {
                return <WorkoutCard key={i} workout={workout} />;
              })}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }