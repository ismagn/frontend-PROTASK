import { useEffect,useState } from "react";
import useProtask from "../hooks/useProtask"
import { Link, useNavigate, useParams } from "react-router-dom"
import ModalFormularioTarea from "./ModalFormularioTarea";
import MostrarTareas from "./MostrarTareas";
import MostrarColaboradores from "./MostrarColaboradores";
import useAuth from "../hooks/useAuth";
import {Fade} from "react-reveal";



export default function InfoProyecto() {
    const navigate = useNavigate()
    const params = useParams();
    const {id} = params
    const {proyecto, obtenerProyecto, eliminarProyecto, modal, setModal, isAdmin, cargando} = useProtask()
    const {user,comprobarAdmin} = useAuth('guest')
    const [editarTarea, setEditarTarea] = useState({})
    
    

    useEffect(()=>{
        obtenerProyecto(id)
    },[modal,user])
    
    comprobarAdmin()
    
    const handleEliminarProyecto =()=>{
        eliminarProyecto(id)

        navigate('/proyectos')
    }

    if (cargando) {
        return <h1 className="text-2xl font-bold animate-pulse ">Cargando...</h1>
    }
  return (
    <Fade>
    <>
    
    <div className="flex justify-between items-center">
        <h1 className=" text-2xl lg:text-4xl font-black">{proyecto?.proyecto?.nombre}</h1>
        {isAdmin && (<Link to={`/proyectos/editar/${id}`} className="bg-indigo-500 p-1 rounded-md text-white text-sm lg:text-md">Editar</Link>)}
    </div>

    <div>
        <div className="lg:mt-5">
            <p className="font-bold lg:text-2xl text-gray-500">Descripcion del proyecto</p>
        </div>
        <div className="bg-white p-2 my-2">
            <p>{proyecto?.proyecto?.descripcion}</p>
        </div>
    </div>
    

    {isAdmin && (
    <div>
        <button className="bg-green-500 p-2 text-white text-xs lg:text-md mt-2 lg:mt-5 rounded-md" type="button"
        onClick={()=>setModal(true)}
        >
            Añadir Tarea
        </button>
    </div>
    )}

    <div className="mt-3 lg:mt-5">
        <h1 className="font-bold lg:text-2xl text-gray-500">Tareas del Proyecto</h1>
    </div>
    <div className="  my-2 shadow-lg">
        <MostrarTareas
        setEditarTarea={setEditarTarea}
        setModal={setModal}
        id={id}
        />
    </div>

    {isAdmin && (
    <>
    <div className="mt-5 flex justify-between">
        <h1 className="font-bold lg:text-2xl text-gray-500">Colaboradores del Proyecto</h1>
        <Link to={`/proyectos/nuevo-colaborador/${id}`} className="bg-indigo-500 pb-1 px-2 lg:p-1  rounded-md text-white text-sm lg:text-md">Agregar</Link>
    </div>
    <div className="bg-white p-4 my-2 shadow-lg">
        <MostrarColaboradores/>
    </div>
    
    <button type="button" className="bg-red-500 mt-10 w-full lg:w-1/4 p-2 text-white font-bold lg:text-xl rounded-md" 
        onClick={handleEliminarProyecto}
        >Eliminar Proyecto
    </button>

    </>
    )}

    <ModalFormularioTarea
        modal={modal}
        setModal={setModal}
        id={id}
        editarTarea={editarTarea}
        setEditarTarea={setEditarTarea}
        />
       
    </>
    </Fade>
  )
}
