
import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProtask from "../hooks/useProtask";



function Login() {
    const {login,isLoading} = useAuth({middleware: 'guest'})
    const {setAlerta,alerta} = useProtask()

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    

    const handleSubmit = async (e)=>{
        e.preventDefault()

        if ( !email || !password ) {
            setAlerta({msg:"todos los campos son obligatorios",value:true, error: true})
            return
        }
            
        setAlerta({msg:"",value:false,})
        
        const objLogin = {
            email: email,
            password: password
        }

        login(objLogin)
        console.log(isLoading);
    }


    return (
    
    <div className="w-full lg:w-2/5 mx-auto p-3 ">
        <div className=" my-5 text-4xl font-black">
            <h1 className="text-indigo-500">Inicia Sesión y Administra Tus <span className="text-gray-600">Proyectos</span></h1>
        </div>
        <form action="" className="bg-white p-5 rounded flex flex-col gap-3"
        onSubmit={handleSubmit}
        >   
            {alerta.value && (<h1 className={` ${ alerta.error ? "text-red-500" : "text-blue-500"} text-center`}>{alerta.msg}</h1>)}
            <div>
                <label htmlFor="email" className="w-full my-2 font-semibold">Correo Electronico</label>
                <input type="email" id="email" className="w-full border border-blue-200 rounded" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password" className="w-full my-2 font-semibold">Contraseña</label>
                <input type="password" id="password" className="w-full border border-blue-200 rounded" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            {isLoading ? (
                <p></p>
            ): (
                <input type="submit" value="INICIAR SESION" className="bg-indigo-500 text-white p-2 w-full font-bold rounded" />
            )}
            
        </form>
        <nav className="text-xs flex flex-col gap-2 my-2 text-center">
            <Link to="/registrar" className=" border border-indigo-300  p-2 font-semibold hover:bg-indigo-300  ">¿No tienes cuenta? Registrate Aqui</Link>
            <Link to="/olvido-password" className="border border-indigo-300 p-2 font-semibold hover:bg-indigo-300">¿Olvidaste tu contraseña?</Link>
        </nav>
    </div>
    
    )
}

export default Login
