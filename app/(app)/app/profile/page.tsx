"use client";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth";
import { env } from "@/utils/env";
import cookies from "js-cookie";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
type IForm = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  birthdate?: string;
  gender?: string;
};
export default function Page() {
  const { user, setUser } = useContext(AuthContext);
  const methods = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      gender: undefined,
      birthdate: undefined,
      password: undefined,
    },
  });

  const submit = async (data: IForm) => {
    const payload: IForm = {
      id: user!.id,
      name: data.name !== "" ? data.name : undefined,
      email: data.email !== "" ? data.email : undefined,
      password: data.password !== "" ? data.password : undefined,
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
      .then((res) => setUser(res.data));
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-md w-full flex items-center flex-col bg-dark rounded-md py-4 px-5 ">
        <h1 className="text-white text-2xl font-medium">Editar perfil</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(submit)}
            className="flex w-full space-y-4 mt-10 flex-col"
          >
            <div className="space-x-4 w-full">
              <InputForm
                className="w-full"
                placeholder={user?.name}
                name="name"
                type="text"
              />
            </div>
            <InputForm placeholder={user?.email} name="email" type="email" />
            <div className="space-x-4 flex flex-row flex-nowrap">
              <InputForm
                className="w-full"
                name="password"
                placeholder="Senha"
                type="password"
              />
            </div>
            <h2 className="text-sm text-primary w-full space-x-2">
              <sup className="animate-pulse">*</sup>
              <span className="text-primary font-medium">
                Digite somente os campos que deseja alterar!
              </span>
            </h2>
            <Button intent="primary" type="submit">
              Alterar informações
            </Button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
