import { env } from '@/utils/env';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import cookies from 'js-cookie'

export default function CardExercise(){

    const handleRemove = async ( id: string) => {
        
        await fetch(env.api + ` /exercise/${id} `, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${cookies}` 
            }
        })
        .then( )
    }


  return (
        <div className="w-32 h-24 flex flex-col gap-1 rounded-md p-2 bg-dark">
            <div className="flex flex-col space-y-1 ">
                <h1 className="w-full  font-medium rounded-md text-white text-center">{data.name}</h1>
                <p className="w-full h-6 font-light text-sm  text-white/50 text-center  " >{data.description}</p>
            </div>
            <div className="w-full flex justify-around  pb-4 text-center ">
                <button className=" flex justify-center items-center w-fit p-1 hover:bg-opacity-80  rounded-md "><Pencil2Icon  color="#EB1D63" className=" w-5 h-5"/></button>
                <button onClik={handleRemove} className=" flex justify-center items-center w-fit p-1   rounded-md "><TrashIcon color="#EB1D63"  className=" w-5 h-5" /> </button>
            </div>
        </div>   
  );
}
