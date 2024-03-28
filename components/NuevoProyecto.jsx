import { useState } from "react"
import useAuth from "../hooks/useAuth"
import useProtask from "../hooks/useProtask"
import { useNavigate } from "react-router-dom"
import {Fade} from 'react-reveal'


export default function NuevoProyecto() {
    const {user} = useAuth('guest')
    const {crearProyecto,alerta, setAlerta} = useProtask()
    const navigate = useNavigate()

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if (!nombre || !descripcion || !fechaEntrega || !cliente) {
            setAlerta({msg:"todos los campos son obligatorios",value:true, error: true})
            return
        }

        const objCrearProyecto = {
            nombre: nombre,
            descripcion: descripcion,
            fechaEntrega: fechaEntrega,
            cliente: cliente,
            creador: user._id
        }

        await crearProyecto(objCrearProyecto)

        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')

        navigate('/proyectos')
    }
  return (
    <Fade>
    <div>
        <div className="">
            <h1 className="uppercase font-black text-indigo-500 text-xl lg:text-4xl">Crear nuevo <span className="text-black">proyecto</span></h1>
        </div>

        <form action="" className="bg-white p-5 my-5 rounded-md flex flex-col gap-3"
        onSubmit={handleSubmit}
        >   
            {alerta.value && (<h1 className={` ${ alerta.error ? "text-red-500" : "text-blue-500"} text-center`}>{alerta.msg}</h1>)}
            <div>
                <label htmlFor="nombre" className="w-full my-2 font-semibold">Nombre</label>
                <input type="text" id="nombre" className="w-full border rounded border-blue-200" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="descripcion" className="w-full my-2 font-semibold">Descripcion</label>
                <textarea  id="descripcion" className="w-full border border-blue-200 rounded" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="fechaEntrega" className="w-full my-2 font-semibold">Fecha Entrega</label>
                <input type="date" id="fechaEntrega" className="w-full border border-blue-200 rounded" value={fechaEntrega} onChange={(e)=>setFechaEntrega(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="cliente" className="w-full my-2 font-semibold">Cliente</label>
                <input type="text" id="cliente" className="w-full border border-blue-200 rounded" value={cliente} onChange={(e)=>setCliente(e.target.value)}/>
            </div>
                <input type="submit" value="CREAR PROYECTO" className="bg-indigo-500 text-white p-2 w-full font-bold rounded" />
            
        </form>
    </div>
    </Fade>
  )
}
