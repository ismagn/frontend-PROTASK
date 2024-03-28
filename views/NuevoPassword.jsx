
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


export default function NuevoPassword() {
    const {setAlerta,alerta,nuevoPassword} = useAuth({middleware: 'guest'})
    const [password,setPassword]=useState("")
    
    const params = useParams(); 
    const {id} = params

    
    const handleSubmit = async (e)=>{
        e.preventDefault()

        if (!password) {
            setAlerta({msg:"todos los campos son obligatorios",value:true, error: true})
            return
        }
        if (password < 6) {
            setAlerta({msg:"la contraseña es muy corta, agrega minimo 6 caracteres",value:true,error: true})
            return
        } 
            
        setAlerta({msg:"",value:false,})

        
        nuevoPassword(password,id)
        
    }
  return (
<div className="w-5/6  mx-auto ">
        <div className=" my-5 text-4xl font-black">
            <h1 className="text-indigo-500 capitalize">crea una nueva  <span className="text-gray-600">contraseña</span></h1>
        </div>
        <form action="" className="flex flex-col gap-4 bg-white p-4 rounded"
        onSubmit={handleSubmit}
        >
            {alerta.value && (<h1 className={` ${ alerta.error ? "text-red-500" : "text-blue-500"} text-center`}>{alerta.msg}</h1>)}
            
            {alerta.error ? (
            <>
                <div>
                    <label htmlFor="password" className="w-full my-2 font-semibold">Nueva Contraseña</label>
                    <input type="password" id="password" className="w-full border border-blue-200 rounded" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <input type="submit" value="CONFIRMAR" className="bg-indigo-500 text-white p-2 w-full font-bold rounded" />
            </>
            ) : (
                <div className="w-3/5 bg-indigo-500 text-center mx-auto mt-10 rounded text-white font-bold p-2 ">
                    <Link to="/">Inicia Session Aqui</Link>
                </div>
                
            )}

        </form>
        
    </div>
  )
}
