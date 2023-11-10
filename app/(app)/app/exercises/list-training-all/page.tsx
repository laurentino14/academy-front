"use client";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth";
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
  const { user } = useContext(AuthContext);
  const methods = useForm<IForm>({
    defaultValues: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      gender: undefined,
      birthdate: undefined,
      password: undefined,
    },
  });

  const submit = async (data: IForm) => {};

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-md w-full flex items-center flex-col bg-dark rounded-md py-4 px-5 ">
        <h1 className="text-white text-2xl font-medium">Editar perfil</h1>
        <FormProvider {...methods}>
          <form className="flex w-full space-y-4 mt-10 flex-col">
            <div className="space-x-4 w-full">
              <InputForm
                className="w-full"
                defaultValue={user?.name}
                name="name"
                placeholder="Nome"
                type="text"
              />
            </div>
            <InputForm
              defaultValue={user?.email}
              name="email"
              placeholder="E-mail"
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
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
