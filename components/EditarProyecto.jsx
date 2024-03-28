import { useEffect, useState } from "react";
import useProtask from "../hooks/useProtask"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function EditarProyecto() {

    const params = useParams();
    const {id} = params
    const {proyecto, obtenerProyecto, alerta, setAlerta, actualizarProyecto} = useProtask()
    const navigate = useNavigate()

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    useEffect(()=>{
        if (id) {
            obtenerProyecto(id)
            setNombre(proyecto?.proyecto.nombre)
            setDescripcion(proyecto?.proyecto.descripcion)
            setFechaEntrega(proyecto?.proyecto.fechaEntrega.split("T")[0])
            setCliente(proyecto?.proyecto.cliente)
        }
        

        console.log(proyecto);
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if (!nombre || !descripcion || !fechaEntrega || !cliente) {
            setAlerta({msg:"todos los campos son obligatorios",value:true, error: true})
            return
        }

        const objActualizarProyecto = {
            nombre: nombre,
            descripcion: descripcion,
            fechaEntrega: fechaEntrega,
            cliente: cliente,
        }

        actualizarProyecto(id, objActualizarProyecto)

        navigate('/proyectos')
    }

  return (
    <div>
        <div>
            <h1 className="text-center text-indigo-500 font-bold">Editar Proyecto: <span className="font-bold text-black">{nombre}</span> </h1>
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
                <input type="submit" value="ACTUALIZAR PROYECTO" className="bg-indigo-500 text-white p-2 w-full font-bold rounded" />
            
        </form>
    </div>
  )
}
