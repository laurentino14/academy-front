"use client";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { env } from "@/utils/env";
import { AnimatePresence } from "framer-motion";
import cookies from "js-cookie";
import { FormProvider, useForm } from "react-hook-form";
type IForm = {
  name: string;
};

export default function Page() {
  const methods = useForm<IForm>({
    mode: "onChange",
  });

  const submit = async (data: IForm) => {
    const cookie = cookies.get("at");
    await fetch(env.api + `/machine`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        authorization: `Bearer ${cookie}`,
      },
    })
      .then((res) => res.json())
      .then(() => methods.reset({ name: "" }));
  };

  return (
    <div className="min-h-screen px-4 w-full flex items-center justify-center">
      <div className="max-w-md w-full flex items-center flex-col bg-dark rounded-md py-4 px-5 ">
        <div className="w-full flex flex-nowrap">
          <div className="w-full relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false} presenceAffectsLayout>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(submit)}
                  className="flex  w-full space-y-4  flex-col"
                >
                  <div className="space-x-4 w-full">
                    <InputForm
                      className="w-full"
                      placeholder="Digite o nome do equipamento"
                      name="name"
                      type="text"
                    />
                  </div>

                  <Button intent="primary" type="submit">
                    Adicionar equipamento
                  </Button>
                </form>
              </FormProvider>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
