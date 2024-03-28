/* eslint-disable react/prop-types */
import { Switch } from '@headlessui/react'
import { useEffect, useState } from "react"
import useProtask from '../hooks/useProtask'
import { formatearFecha } from '../helpers/formatearFecha'
import useAuth from '../hooks/useAuth'


export default function Tarea({i,setEditarTarea,setModal}) {
    const {comprobarAdmin} = useAuth('guest')
    const {obtenerTarea,cambiarEstado,eliminarTarea,proyecto,isAdmin} = useProtask()
    const [enabled, setEnabled] = useState(false)

    
    useEffect(()=>{ 
        const tareaFiltrada = proyecto.tareas.filter(tarea=> tarea._id == i._id)[0]
        setEnabled(tareaFiltrada.estado)
        comprobarAdmin()
    },[proyecto])

    const handleCompletar = async (id,proyecto)=>{
            cambiarEstado(id,proyecto)
            setEnabled(!enabled)
    }

    const handleEditar =()=>{
        setModal(true)
        setEditarTarea(i)
    }

    const handleEliminar=(id, idProyecto)=>{
        const res = confirm('seguro que quieres borrar esta tarea')
        if (res) {
            eliminarTarea(id,idProyecto)
        }
    }

  return (
    <div className="bg-white flex items-center justify-between my-2 p-2 border">
        <div className="flex flex-col gap-2">
            <p className="lg:text-xl uppercase font-bold">{i.nombre}</p>
            <p className="text-gray-500 text-xs lg:text-md">{i.descripcion}</p>
            <p className='text-xs lg:text-md'>Prioridad: <span className="font-bold ">{i.prioridad}</span></p>
            <p className='text-xs lg:text-md '>Entrega: <span className='font-bold'>{formatearFecha(i.fechaEntrega)}</span></p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-10">
            <div className=" font-bold flex items-center gap-2">
                <label className='hidden lg:block text-xs' htmlFor="completada">Completada: </label>
                <div className="">
                    <Switch
                        checked={enabled }
                        onChange={()=> {
                            obtenerTarea(i._id)

                            handleCompletar(i._id,i.proyecto)
                        }}
                        className={`${enabled ? 'bg-indigo-500' : 'bg-gray-700'}
                        relative inline-flex h-[20px] w-[54px] lg:h-[38px] lg:w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                    >
                        <span
                        aria-hidden="true"
                        className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                            pointer-events-none inline-block h-[16px] w-[16px] lg:h-[34px] lg:w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                    </div>
                </div>
            {isAdmin && (
                <>
                <div className="rounded-md  p-1 lg:p-2 bg-blue-500 text-center text-xs lg:text-md text-white">
                <button type="button" onClick={handleEditar}>Editar</button>
            </div>
            <div className="p-1 lg:p-2 rounded-md text-xs lg:text-md bg-red-500 text-white">
                <button  type="button" onClick={()=>handleEliminar(i._id,i.proyecto)}>Eliminar</button>
            </div>
                </>
            )}
            
        </div>
    </div>
  )
}
