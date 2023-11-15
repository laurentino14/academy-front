"use client";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { env } from "@/utils/env";
import clsx from "clsx";
import cookies from "js-cookie";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
type IForm = {
  name: string;
  description?: string;
};
export default function Page() {
  const methods = useForm<IForm>({
    mode: "onChange",
  });

  const submit = async (data: IForm) => {

    try{
        const payload: IForm = {
          name: data.name,
        description: data.description,
      };
      const cookie = cookies.get("at");
      await fetch(env.api + "/exercise", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie}`,
        },
      })
      .then((res) => res.json())
      .then((res) => { 
        if(res.data.statusCode !== 201) throw new Error ("Erro na requisiçao") 
        methods.reset({ name: "", description: "" })
      })
    } catch(err){
    toast.error("Erro ao cadastrar o exercício!")
  }
   
  };

  return (
    <div className="min-h-screen w-full px-4 flex items-center justify-center">
      <div className="max-w-md w-full flex items-center flex-col border border-black/20 shadow drop-shadow-md  bg-dark rounded-md py-4 px-5 ">
        <div className="w-full">
          <h1
            className={clsx(
              " text-center bg-white  text-gray  w-full font-medium px-3 py-3 rounded-md"
            )}
          >
            Novo exercício
          </h1>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(submit)}
              className="flex  w-full space-y-4 mt-10 flex-col"
            >
              <div className="space-x-4 w-full">
                <InputForm
                  className="w-full"
                  placeholder="Nome do exercício"
                  name="name"
                  type="text"
                />
              </div>
              <InputForm
                placeholder="Descrição"
                name="description"
                type="text"
              />
              <Button intent="primary" type="submit">
                Cadastrar
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
