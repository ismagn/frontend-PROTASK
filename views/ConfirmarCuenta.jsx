
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import useProtask from "../hooks/useProtask";


export default function ConfirmarCuenta() {

    const {alerta} = useProtask()
    const { confirmarCuenta} = useAuth({middleware: 'guest'})

    const params = useParams(); 
    const {id} = params

    useEffect(()=>{
        confirmarCuenta(id)
    },[])

  return (
    <div className="p-4">
        <div className=" my-5 text-4xl font-black">
            <h1 className="text-indigo-500 capitalize">confirma tu <span className="text-gray-600">cuenta</span></h1>
        </div>

        {alerta.value && (<h1 className={` ${ alerta.error ? "text-red-500" : "text-blue-500"} text-center`}>{alerta.msg}</h1>)}

        
        {!alerta.error && (
        <div className="w-2/5 bg-indigo-500 text-center mx-auto mt-10 rounded text-white font-bold p-2 ">
            <Link to="/">Inicia Session Aqui</Link>
        </div>
        ) }

    </div>
  )
}
