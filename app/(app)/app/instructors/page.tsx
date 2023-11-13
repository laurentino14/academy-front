import { User } from "@/models/user";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center w-full gap-10 justify-center">
        <CardInstructors />
        <CardInstructors />
        <CardInstructors />
      </div>
    </div>
  );
}

export const CardInstructors = ({ instructor }: { instructor?: User }) => {
  return (
    <div className=" h-20 w-[9.375rem] bg-dark rounded-md flex justify-center flex-col">
      <h1 className="w-full text-center">Lucas Laurentino Cazemiro</h1>
    </div>
  );
};
