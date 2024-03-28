import { useEffect, useState } from "react"
import useProtask from "../hooks/useProtask"
import { useParams } from "react-router-dom";

export default function NuevoColaborador() {
  const params = useParams();
  const {id} = params
  const {buscarColaborador, añadirColaborador,colaborador, setAlerta, alerta, obtenerProyecto, proyecto} = useProtask()
  const [email,setEmail]=useState('')

  useEffect(()=>{
    obtenerProyecto(id)
    setAlerta({})
  },[])

  const handleBuscarColaborador=(e)=>{
    e.preventDefault()

    if (!email) {
      setAlerta({msg:"el campo es obligatorio",value:true, error: true})
      return
    }
    buscarColaborador({email: email})
  }

  return (
    <div>
      <h1 className="font-bold lg:text-2xl text-indigo-500">Añadir Colaborador al Proyecto : <span className="font-black text-black">{proyecto?.proyecto.nombre}</span> </h1>
        <form action="" className="bg-white p-5 my-5 rounded-md flex flex-col gap-3"
        onSubmit={handleBuscarColaborador}
        >
          {alerta.value && (<h1 className={` ${ alerta.error ? "text-red-500" : "text-blue-500"} text-center`}>{alerta.msg}</h1>)}
            <div >
              <label htmlFor="email" className="w-full my-2 font-semibold">Email</label>
              <input type="text" id="email" className="w-full border rounded border-blue-200" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <input type="submit" value="BUSCAR COLABORADOR" className="bg-indigo-500 text-white p-2 w-full font-bold rounded" />
        </form>
        {colaborador.nombre && (
          <div className="">
            <h1 className="text-center my-2 font-bold">COLABORADOR ENCONTRADO</h1>
            <div className="bg-white p-5 flex justify-between items-center">
              <div>
                <p className="font-bold">{colaborador.nombre}</p>
                <p>{colaborador.email}</p>
              </div>
              <div>
                <button className="bg-indigo-500 p-2 rounded-md text-white" type="button"
                onClick={()=>añadirColaborador({
                  email: colaborador.email,
                  proyecto: proyecto.proyecto._id
                })}
                >Agregar</button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
