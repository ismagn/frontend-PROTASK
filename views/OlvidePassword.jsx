
import { useState } from "react";
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";


export default function OlvidePassword() {

    const {setAlerta,alerta,olvidoPassword} = useAuth({middleware: 'olvide-pass', url:'/'})

    const [email,setEmail]=useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if ( !email ) {
            setAlerta({msg:"el email es obligatorio",value:true, error: true})
            return
        }

        setAlerta({msg:"",value:false,})

        olvidoPassword(email)
    }

  return (
    <div className="w-full lg:w-1/2 mx-auto p-3">
        <div className=" my-5 text-4xl font-black">
            <h1 className="text-indigo-500 capitalize">Recupera el acceso a tu <span className="text-gray-600">cuenta</span></h1>
        </div>
        <form action="" className="flex flex-col gap-4 bg-white p-4 rounded"
            onSubmit={handleSubmit}
        >
            {alerta?.value && (<h1 className={` ${ alerta.error ? "text-red-500" : "text-blue-500"} text-center`}>{alerta.msg}</h1>)}
            <div>
                <label htmlFor="email" className="w-full my-2 font-semibold">Correo Electronico</label>
                <input type="email" id="email" className="w-full border border-blue-200 rounded" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <input type="submit" value="Recuperar" className="bg-indigo-500 text-white p-2 w-full font-bold rounded" />
        </form>
        <nav className="text-xs text-center flex flex-col gap-2 justify-between mt-2">
            <Link to="/" className="border border-indigo-300 p-2 font-semibold hover:bg-indigo-300">¿Ya tienes cuenta? inicia sesion</Link>
            <Link to="/registrar" className=" border border-indigo-300 p-2 font-semibold hover:bg-indigo-300 ">¿No tienes cuenta? Registrate Aqui</Link>
        </nav>
    </div>
  )
}
