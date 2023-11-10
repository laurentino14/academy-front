"use client";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { env } from "@/utils/env";
import cookies from "js-cookie";
import { FormProvider, useForm } from "react-hook-form";
type ExerciseForm = {
  name: string;
  description: string;
};

export default function ExercisePage() {
  const methods = useForm<ExerciseForm>();

  const submitExercise = async (data: ExerciseForm) => {
    console.log(data);
    const token = cookies.get("at");
    await fetch(env.api + "/exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-md w-full flex items-center flex-col bg-dark rounded-md py-4 px-5">
        <h1 className="text-white text-2xl font-medium">
          Cadastro de Exercício
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(submitExercise)}
            className="flex w-full space-y-4 mt-10 flex-col"
          >
            <InputForm
              className="w-full"
              name="name"
              placeholder="Nome"
              type="text"
            />
            <InputForm
              className="w-full"
              name="description"
              placeholder="Descrição"
              type="text"
            />
            <Button intent="primary" type="submit">
              Cadastrar Exercício
            </Button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
