"use client";
import { User } from "@/models/user";
import { env } from "@/utils/env";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";
export type ISignUpData = {
  role: "ADMIN" | "INSTRUCTOR" | "USER";
  doc: string;
  name: string;
  email: string;
  birthdate: string;
  password: string;
};
export type IAuthContext = {
  user: User | undefined;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: ISignUpData) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User>();

  async function signIn(data: { email: string; password: string }) {
    try {
      await fetch(env.api + "/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 400 || res.statusCode === 500) {
            throw new Error("Usuário ou senha incorretos");
          }
          setUser(res.data.user);
          cookies.set("rt", res.data.refreshToken, {
            expires: 60 * 60 * 24 * 7,
          });
          cookies.set("at", res.data.accessToken, { expires: 60 * 60 });
          router.push("/app");
        });
    } catch (err) {
      console.log(err);
    }
  }

  async function refreshToken() {
    const rt = cookies.get("rt");
    const at = cookies.get("at");

    if (!rt || !at) router.push("/");

    try {
      await fetch(env.api + "/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${rt}`,
          "access-control-allow-origin": "*",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          cookies.set("rt", res.data.refreshToken, {
            expires: 60 * 60 * 24 * 7,
          });
          cookies.set("at", res.data.accessToken, { expires: 60 * 60 });
          setUser(res.data.user);
        });
    } catch (err) {
      console.log(err, "err");
    }
  }

  async function signOut() {
    setUser(undefined);
    cookies.remove("rt");
    cookies.remove("at");
    router.push("/");
  }

  async function signUp(data: ISignUpData) {
    try {
      await fetch(env.api + "/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 400 || res.statusCode === 500) {
            cookies.remove("rt");
            cookies.remove("at");
          }
          if (res.statusCode === 400 || res.statusCode === 500) {
            throw new Error(res.data);
          }

          console.log(res.statusCode);
          console.log(res.data);
          setUser(res.data.user);

          cookies.set("rt", res.data.refreshToken, {
            expires: 60 * 60 * 24 * 7,
          });
          cookies.set("at", res.data.accessToken, { expires: 60 * 60 });
          router.push("/app");
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(
    () => {
      async function t() {
        const rt = cookies.get("rt");
        const at = cookies.get("at");
        if (rt && at) {
          await refreshToken();
        }
      }
      t();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
