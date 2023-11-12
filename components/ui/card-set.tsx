import { Set } from "@/models/set";
import { clsx } from "clsx";
import { Button } from "./button";
import { CheckCircledIcon } from "@radix-ui/react-icons";
export function CardSet({ finished, set }: { finished?: boolean; set?: Set }) {
  return (
    <div
      className={clsx(
        " rounded-md w-60 h-60 flex flex-col items-center justify-between p-2",
        {
          "bg-gray1": !finished,
          "bg-dark/90": finished,
        }
      )}
    >
      <h1
        className={clsx("font-medium text-xl ", {
          "text-white": !finished,
          "text-primary": finished,
        })}
      >
        Remada
      </h1>
      {finished && (
        <CheckCircledIcon className="text-primary accent-primary stroke-primary stroke-1 fill-primary w-24 h-24" />
      )}
      {finished && <div></div>}
      {!finished && (
        <>
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm">3x12</p>
            <p className="text-gray-400 text-sm">20,0kg</p>
          </div>
          <Button intent="white" className="w-full">
            Finalizar
          </Button>
        </>
      )}
    </div>
  );
}
