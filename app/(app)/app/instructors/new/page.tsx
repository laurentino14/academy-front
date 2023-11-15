"use client";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth";
import { env } from "@/utils/env";
import { AnimatePresence } from "framer-motion";
import cookies from "js-cookie";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
type IForm = {
  hash: string;
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
  });

  const submit = async (data: IForm) => {
    const cookie = cookies.get("at");
    await fetch(env.api + `/user/toInstructor/${data.hash}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        authorization: `Bearer ${cookie}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.statusCode !== 200){
          return toast.error("Código do usuario não existe!")
        }else{ toast.success("Instrutor cadastrado!") }
        
        methods.reset({ hash: "" })
      });
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
                      placeholder="Digite o código do usuario"
                      name="hash"
                      type="text"
                    />
                  </div>

                  <Button intent="primary" type="submit">
                    Tornar instrutor
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
