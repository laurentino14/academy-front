"use client";
import { CardInstructors } from "@/components/ui/card-instructors";
import { User } from "@/models/user";
import { env } from "@/utils/env";
import cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Page() {
  const [instructors, setInstructors] = useState<User[]>();

  useEffect(() => {
    async function t() {
      const at = cookies.get("at");
      await fetch(env.api + "/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${at}`,
        },
      })
        .then((res) => res.json())
        .then((res: { data: User[] }) =>
          setInstructors(res.data.filter((e) => e.role === "INSTRUCTOR" && !e.deletedAt))
        );
    }
    t();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center w-full gap-10 justify-center">
        {instructors &&
          instructors.map((e, i) => {
            return (
              <CardInstructors
                data={e}
                key={i}
                setInstructors={setInstructors}
              />
            );
          })}
      </div>
    </div>
  );
}
