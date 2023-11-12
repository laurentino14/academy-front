"use client";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth";
import { env } from "@/utils/env";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
type IForm = {
  id: string;
  name?: string;
  email?: string;
  password: string;
};

type IFormPassword = {
  id: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
};
export default function Page() {
  const { user, setUser } = useContext(AuthContext);
  const methods = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    },
  });

  const submit = async (data: IForm) => {
    const payload: IForm = {
      id: user!.id,
      name: data.name !== "" ? data.name : undefined,
      email: data.email !== "" ? data.email : undefined,
      password: data.password,
    };
    const cookie = cookies.get("at");
    await fetch(env.api + "/user", {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        authorization: `Bearer ${cookie}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setUser(res.data))
      .then(() => methods.reset({ id: user?.id, password: "" }));
  };
  const methodsPassword = useForm<IFormPassword>({
    mode: "onChange",
    defaultValues: {
      id: user?.id,
    },
  });

  useEffect(() => {
    methodsPassword.reset({
      id: user?.id,
    });
  }, [user, methodsPassword]);

  async function submitPassword(data: IFormPassword) {
    await fetch(env.api + "/user/password", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        authorization: `Bearer ${cookies.get("at")}`,
      },
    })
      .then((res) => res.json())
      .then(() =>
        methodsPassword.reset({
          id: user?.id,
          oldPassword: "",
          password: "",
          passwordConfirmation: "",
        })
      )
      .catch((err) => console.log(err));
  }
  const [active, setActive] = useState(1);

  return (
    <div className="min-h-screen px-4 w-full flex items-center justify-center">
      <div className="max-w-md w-full flex items-center flex-col bg-dark rounded-md py-4 px-5 ">
        <div className="w-full flex flex-nowrap">
          <Button
            onClick={() => setActive(1)}
            className={clsx("  rounded-r-none w-full", {
              "!bg-gray1 text-white/80": active === 2,
            })}
          >
            Editar perfil
          </Button>
          <Button
            onClick={() => setActive(2)}
            className={clsx("  rounded-l-none w-full", {
              "!bg-gray1 text-white/80": active === 1,
            })}
          >
            Alterar senha
          </Button>
        </div>
        <motion.div
          animate={{ height: "auto" }}
          layoutRoot
          className="w-full relative overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false} presenceAffectsLayout>
            <FormProvider {...methods}>
              <motion.form
                animate={{
                  translateX: active === 1 ? 0 : "-100%",
                  opacity: active === 1 ? 1 : 0,
                  position: active === 1 ? "relative" : "absolute",
                  top: 0,
                }}
                transition={{ duration: 0.5, display: { position: 0.5 } }}
                onSubmit={methods.handleSubmit(submit)}
                className="flex  w-full space-y-4 mt-10 flex-col"
              >
                <div className="space-x-4 w-full">
                  <InputForm
                    className="w-full"
                    placeholder={user?.name}
                    name="name"
                    type="text"
                  />
                </div>
                <InputForm
                  placeholder={user?.email}
                  name="email"
                  type="email"
                />
                <div className="space-x-4 flex flex-row flex-nowrap">
                  <InputForm
                    className="w-full"
                    name="password"
                    placeholder="Senha"
                    type="password"
                  />
                </div>

                <Button intent="primary" type="submit">
                  Alterar informações
                </Button>
              </motion.form>
            </FormProvider>
            <FormProvider {...methodsPassword}>
              <motion.form
                animate={{
                  translateX: active === 2 ? 0 : "100%",
                  opacity: active === 2 ? 1 : 0,
                  position: active === 2 ? "relative" : "absolute",
                }}
                transition={{ duration: 0.5, display: { position: 0.5 } }}
                onSubmit={methodsPassword.handleSubmit(submitPassword)}
                className="flex w-full space-y-4 mt-10 flex-col"
              >
                <div className="space-x-4 flex flex-row flex-nowrap">
                  <InputForm
                    className="w-full"
                    name="oldPassword"
                    placeholder="Senha atual"
                    type="password"
                  />
                </div>
                <div className="space-x-4 flex flex-row flex-nowrap">
                  <InputForm
                    className="w-full"
                    name="password"
                    placeholder="Nova senha"
                    type="password"
                  />
                </div>
                <div className="space-x-4 flex flex-row flex-nowrap">
                  <InputForm
                    className="w-full"
                    name="passwordConfirmation"
                    placeholder="Confirme a nova senha"
                    type="password"
                  />
                </div>

                <Button intent="primary" type="submit">
                  Alterar senha
                </Button>
              </motion.form>
            </FormProvider>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
