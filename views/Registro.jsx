import { Link } from "react-router-dom"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import useProtask from "../hooks/useProtask"


export default function Registro() {
    const {setAlerta,alerta} = useProtask()
    const { registro} = useAuth({middleware: 'resgistro', url:'/'})

    const [nombre,setNombre]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [repetirPassword,setRepetirPassword]=useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault()

        if (!nombre || !email || !password || !repetirPassword) {
            setAlerta({msg:"todos los campos son obligatorios",value:true, error: true})
            return
        }
        if (password !== repetirPassword) {
            setAlerta({msg:"las contraseñas no son iguales",value:true,error: true})
            return
        }
        if (password < 6) {
            setAlerta({msg:"la contraseña es muy corta, agrega minimo 6 caracteres",value:true,error: true})
            return
        } 
            
        setAlerta({msg:"",value:false,})

        const objRegistro = {
            nombre: nombre,
            email: email,
            password: password
        }
        
        registro(objRegistro)
        
        
    }

  return (
<div className="w-full lg:w-2/5  mx-auto p-3">
        <div className=" my-5 text-4xl font-black">
            <h1 className="text-indigo-500 capitalize">crea tu cuenta y administra tus <span className="text-gray-600">proyectos</span></h1>
        </div>
        <form action="" className="flex flex-col gap-4 bg-white p-4 rounded"
        onSubmit={handleSubmit}
        >
            {alerta.value && (<h1 className={` ${ alerta.error ? "text-red-500" : "text-blue-500"} text-center`}>{alerta.msg}</h1>)}
            <div>
                <label htmlFor="nombre" className="w-full my-2 font-semibold">Nombre</label>
                <input type="text" id="nombre" className="w-full border rounded border-blue-200" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="email" className="w-full my-2 font-semibold">Correo Electronico</label>
                <input type="email" id="email" className="w-full border border-blue-200 rounded" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password" className="w-full my-2 font-semibold">Contraseña</label>
                <input type="password" id="password" className="w-full border border-blue-200 rounded" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="repetir_password" className="w-full my-2 font-semibold">Repetir Contraseña</label>
                <input type="password" id="repetir_password" className="w-full border border-blue-200 rounded" value={repetirPassword} onChange={(e)=>setRepetirPassword(e.target.value)}/>
            </div>
            
            <input type="submit" value="CREAR CUENTA" className="from-indigo-300 to-indigo-600 bg-gradient-to-tr text-white p-2 w-full font-bold rounded" />
        </form>
        <nav className="text-xs flex justify-between mt-5">
            <Link to="/" className=" border border-indigo-300 p-2 font-semibold w-full text-center hover:bg-indigo-300">¿Ya tienes cuenta? inicia sesion</Link>
        </nav>
    </div>
  )
}
