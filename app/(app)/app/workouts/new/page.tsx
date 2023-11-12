"use client";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { Set } from "@/models/set";
import { env } from "@/utils/env";
import clsx from "clsx";
import cookies from "js-cookie";
import { useContext } from "react";
import { FormProvider, set, useFieldArray, useForm } from "react-hook-form";
import { AuthContext } from '../../../../../contexts/auth';
import { TrashIcon} from '@radix-ui/react-icons'
type IForm = {
  name: string;
  active?: boolean;
  sets: Set[];
  userId: string;
  instructorId: string;
};

export default function Page() {
  const {user} = useContext(AuthContext)
  const methods = useForm<IForm>({
    mode: "onChange",
    defaultValues: {active: true, instructorId: user?.id},
  
  });

  const submit = async (data: IForm) => {
    const payload: IForm = {
      name: data.name,
      active: data.active,
      sets: data.sets,
      userId: data.userId,
      instructorId: data.instructorId
    };

    const cookie = cookies.get("at");
    await fetch(env.api + "/workouts", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie}`,
      },
    })
      .then((res) => res.json())
      .then( () => methods.reset({ })) 
  };

  const { append, fields, remove  } = useFieldArray({ control: methods.control, name: "sets" })

  return (
    <div className="min-h-screen w-full px-4 flex items-center justify-center">
      <div className="max-w-md w-full flex items-center flex-col bg-dark rounded-md py-4 px-5 ">
        <div className="w-full">
            <h1 className={clsx(" text-center bg-white  text-gray  w-full font-medium px-3 py-3 rounded-md")}>
                Novo treino
            </h1>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(submit)}
                className="flex   w-full space-y-4 mt-10 flex-col"
              >
                <InputForm className="w-full" type="text" name="userId" placeholder="Hash do usuário" />
                <div className="space-x-4  w-full">
                  <InputForm
                    className="w-full"
                    placeholder="Nome do treino"
                    name="name"
                    type="text"
                  />
                </div>
                <InputForm
                  placeholder="Descrição"
                  name="descrição"
                  type="text"
                />
                {fields.map((fields, i) => {
                  return <div className="flex flex-col p-2 border border-gray rounded-md" key={i}>
                    <div className="flex mb-4 justify-between">
                      <h2 className="font-bold">Exercicio {i+1}</h2>
                      <button onClick={e => {
                        e.preventDefault()
                        remove(i)
                      }}>
                         <TrashIcon className=" w-6 h-6" />
                      </button>
                    </div>
                    <div className="space-y-5">
                      <div className="w-full flex gap-4 justify-between"> 
                        <select className="w-1/2 text-center h-8 appearance-none px-4 rounded-md bg-primary" defaultValue={"MONDAY"} {...methods.register(`sets.${i}.day`)} >
                          <option className="text-center hover:text-center"  value="SUNDAY">Sunday</option>
                          <option className="text-center"  value="MONDAY">Monday</option>
                          <option className="text-center"  value="TUESDAY">Tuesday</option>
                          <option className="text-center"  value="WEDNESDAY">Wednesday</option>
                          <option className="text-center"  value="THURSDAY">Thursday</option>
                          <option className="text-center"  value="FRIDAY">Friday</option>
                          <option className="text-center"  value="SATURDAY">Saturday</option>
                        </select> 
                        <select className="w-1/2 text-center h-8 appearance-none px-4 rounded-md bg-primary" defaultValue={"CHEST"} {...methods.register(`sets.${i}.type`)} >
                          <option className="text-center"  value="CHEST">Peito</option>
                          <option className="text-center"  value="BACK">Costa</option>
                          <option className="text-center"  value="LEGS">Perna</option> 
                          <option className="text-center"  value="SHOULDERS">Ombro</option>
                          <option className="text-center"  value="ARMS">Braço</option>
                          <option className="text-center"  value="ABS">Abdômen</option>
                        </select> 
                      </div>
                      <div className="w-full flex gap-4 justify-between">
                        <select className="w-1/2 text-center h-8 appearance-none px-4 rounded-md bg-primary" defaultValue={"SUPINO"} {...methods.register(`sets.${i}.exerciseId`)} >
                          <option className="text-center"  value="SUPINO">Supino reto</option>
                          <option className="text-center"  value="SUPI">Supino inclinado</option>
                          <option className="text-center"  value="CRUR">Crucifixo Reto</option>
                          <option className="text-center"  value="CRUnC">Crucifixo no Cross</option>
                          <option className="text-center"  value="VOADOR">Voador</option>
                        </select> 
                        <select className=" text-center w-1/2 h-8 appearance-none px-4 rounded-md bg-primary" defaultValue={"id1"} {...methods.register(`sets.${i}.machineId`)} >
                          <option className="text-center"  value="LIVRE">Livre</option>
                          <option className="text-center"  value="HALTER">Halter</option>
                          <option className="text-center"  value="BW-01">BW-01</option>
                          <option className="text-center"  value="BW-02">BW-02</option>
                          <option className="text-center"  value="BW-03">BW-03</option>
                          <option className="text-center"  value="BW-04">BW-04</option>
                          <option className="text-center"  value="BW-05">BW-05</option>
                          <option className="text-center"  value="BW-06">BW-06</option>
                          <option className="text-center"  value="BW-07">BW-07</option>
                          <option className="text-center"  value="BW-08">BW-08</option>
                          <option className="text-center"  value="BW-09">BW-09</option>
                          <option className="text-center"  value="BW-10">BW-10</option>
                          <option className="text-center"  value="BW-11">BW-11</option>
                          <option className="text-center"  value="BW-12">BW-12</option>
                          <option className="text-center"  value="BW-13">BW-13</option>
                          <option className="text-center"  value="BW-14">BW-14</option>
                          <option className="text-center"  value="BW-15">BW-15</option>
                        </select> 
                      </div>
                      <div className="w-full flex justify-between gap-4">
                        <InputForm name={`sets.${i}.series`} className=" text-center w-full rounded-md bg-primary" type="number"  />
                        <InputForm name={`sets.${i}.reps`} className=" text-center w-full rounded-md bg-primary" type="number"  />
                      </div>
                    </div>
                  </div>
                })}
                <Button onClick={ e => {
                  e.preventDefault()
                  append({day:"MONDAY", machineId: 'id1', type: "CHEST", exerciseId:'SUPINO', reps: 0,  series: 0, })
                }} className={clsx(" text-center !bg-gray1 text-white  hover:bg-opacity-80 w-full font-medium px-3 py-3 rounded-md")} type="submit">
                  Adicionar exercicio
                </Button>
                <Button intent="primary" type="submit">
                  Cadastrar Treino
                </Button>
              </form>
            </FormProvider>
        </div>
      </div>
    </div>
  );
}
