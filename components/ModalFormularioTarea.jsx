/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useProtask from '../hooks/useProtask'


export default function ModalFormularioTarea({modal, setModal,id, editarTarea, setEditarTarea}) {
    const {crearTarea, actualizarTarea, setAlerta, alerta} = useProtask()

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [prioridad, setPrioridad] = useState('Alta')
    
    function closeModal() {
        setModal(false)
        setEditarTarea({})
    }

    useEffect(()=>{
      if (editarTarea) {
        setNombre(editarTarea.nombre)
        setDescripcion(editarTarea.descripcion)
        setFechaEntrega(editarTarea.fechaEntrega?.split('T')[0])
        setPrioridad(editarTarea.prioridad)
      }
    },[modal])

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if (!nombre || !descripcion || !fechaEntrega || !prioridad) {
            setAlerta({msg:"todos los campos son obligatorios",value:true, error: true})
            return
        }
        const objCrearTarea = {
            nombre: nombre,
            descripcion: descripcion,
            fechaEntrega: fechaEntrega,
            prioridad: prioridad,
        }

        if (editarTarea.nombre) {
          objCrearTarea._id=editarTarea._id
          objCrearTarea.nombre=nombre
          objCrearTarea.descripcion=descripcion
          objCrearTarea.estado=editarTarea.estado
          objCrearTarea.fechaEntrega=fechaEntrega
          objCrearTarea.prioridad=prioridad
          objCrearTarea.proyecto=editarTarea.proyecto

          await actualizarTarea(objCrearTarea,objCrearTarea._id)
        } else {
          objCrearTarea.proyecto = id
          objCrearTarea.estado = true

          await crearTarea(objCrearTarea)
        }
        
        

        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setFechaEntrega('')
        
        setEditarTarea({})

        closeModal()
    }
    

  return (
    <>

      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold my-5 text-gray-900"
                  >
                    Crear Tarea
                  </Dialog.Title>
                <form action=""
                onSubmit={handleSubmit}
                >
                    <div>
                        {alerta.value && (<h1 className={` ${ alerta.error ? "text-red-500" : "text-blue-500"} text-center`}>{alerta.msg}</h1>)}

                        <label htmlFor="nombre" className="w-full my-2 font-semibold">Nombre</label>
                        <input type="text" id="nombre" className="w-full border rounded border-blue-200" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="descripcion" className="w-full my-2 font-semibold">Descripcion</label>
                        <textarea  id="descripcion" className="w-full border border-blue-200 rounded" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
                    </div>
                    
                    <div className='flex justify-between my-2'>
                        <div >
                            <label htmlFor="fechaEntrega" className="w-full font-semibold">Fecha Entrega</label>
                            <input type="date" id="fechaEntrega" className="w-full border border-blue-200 rounded" value={fechaEntrega} onChange={(e)=>setFechaEntrega(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="prioridad" className="w-full block font-semibold">Prioridad</label>
                            <select className='border border-blue-200 rounded-md' name="prioridad" id="prioridad" onChange={(e)=>setPrioridad(e.target.value)}>
                                <option value="">--</option>
                                <option value="Alta">Alta</option>
                                <option value="Media">Media</option>
                                <option value="Baja">Baja</option>
                            </select>
                        </div>
                    </div>
                    {editarTarea._id?(
                      <input type="submit" value="ACTUALIZAR TAREA" className="bg-indigo-500 mt-2 text-white p-2 w-full font-bold rounded" />
                    ) : (
                      
                      <input type="submit" value="CREAR TAREA" className="bg-indigo-500 mt-2 text-white p-2 w-full font-bold rounded" />
                    )}
                </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
