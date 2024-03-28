/* eslint-disable react/prop-types */
import { createContext, useState} from "react"
import axios from "axios";



const ProtaskContext = createContext();

const ProtaskProvider = ({children}) => {
    
    
    const [alerta,setAlerta]=useState({msg: "", value: false, error: true})
    const [proyectos,setProyectos] = useState([])
    const [proyecto,setProyecto] = useState()
    const [tarea,setTarea] = useState()
    const [modal, setModal] = useState(false)
    const [cargando, setCargando]=useState(true)
    const [colaborador,setColaborador] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)
    const [buscar,setBuscar] = useState('')

    const crearProyecto = async(datos)=>{
        const token = localStorage.getItem('PROTASK-TOKEN')
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, datos,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
            setAlerta({msg: "Proyecto Creado Correctamente", value: true, error:false})
        } catch (error) {
            console.log(error);
            setAlerta({msg: "Error al crear el proyecto", value: true, error:true})
            
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    const obtenerProyectos = async()=>{
        const token = localStorage.getItem('PROTASK-TOKEN')
        try {
            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
            setProyectos(data)
        } catch (error) {
            console.log(error);
            
        }
    }
    const obtenerProyecto = async(id)=>{
        setCargando(true)
        const token = localStorage.getItem('PROTASK-TOKEN')
        try {
            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
        setProyecto(data)
        } catch (error) {
            console.log(error);
            
        }
        setCargando(false)
    }

    const actualizarProyecto = async(id,datos)=>{
        const token = localStorage.getItem('PROTASK-TOKEN')
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`,datos,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
            obtenerProyectos()
        } catch (error) {
            console.log(error);
            
        }
    }

    const eliminarProyecto = async(id)=>{
        const token = localStorage.getItem('PROTASK-TOKEN')
        const res = confirm('¿Seguro que quieres eliminar por completo este proyecto?')
        if (res) {
            try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                } )
                obtenerProyectos()
            } catch (error) {
                console.log(error);
                
            }
        }
    }

    //tareas

    const crearTarea = async(datos)=>{
        const token = localStorage.getItem('PROTASK-TOKEN')
        console.log(datos);
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas`, datos,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
            obtenerProyectos()
            setAlerta({msg: "Tarea Creada Correctamente", value: true, error:false})
        } catch (error) {
            console.log(error);
            setAlerta({msg: "Error al crear la tarea", value: true, error:true})
            
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    const obtenerTarea = async(id)=>{
        const token = localStorage.getItem('PROTASK-TOKEN')
        try {
            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
            setTarea(data)
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarTarea = async(datos,id)=>{
        const token = localStorage.getItem('PROTASK-TOKEN')
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${id}`, datos,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
            obtenerProyectos()
            setAlerta({msg: "Tarea Actualizada Correctamente", value: true, error:false})
        } catch (error) {
            console.log(error);
            setAlerta({msg: "Error al Actualizar la tarea", value: true, error:true})
            
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    const cambiarEstado = async(id,proyecto)=>{
        const token = localStorage.getItem('PROTASK-TOKEN')
        setCargando(true)
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/estado/${id}`, {idProyecto: proyecto},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
            obtenerProyectos()
            obtenerProyecto()
            setAlerta({msg: "Tarea Actualizada Correctamente", value: true, error:false})
        } catch (error) {
            console.log(error);
            setAlerta({msg: "Error al Actualizar la tarea", value: true, error:true})
            
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
        setCargando(false)
    }

    const eliminarTarea = async(id, idProyecto)=>{
        const token = localStorage.getItem('PROTASK-TOKEN')
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
            obtenerProyecto(idProyecto)
            setAlerta({msg: "Tarea Eliminada Correctamente", value: true, error:false})
        } catch (error) {
            console.log(error);
            setAlerta({msg: "Error al Eliminar la tarea", value: true, error:true})
            
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    //colaboradores

    const añadirColaborador = async(datos)=>{
        const {proyecto} = datos
        const token = localStorage.getItem('PROTASK-TOKEN')
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores/${proyecto}`, datos,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
            setColaborador({})
            setAlerta({msg: "Colaborador Añadido Correctamente", value: true, error:false})
        } catch (error) {
            console.log(error);
            setAlerta({msg: error.response.data.msg, value: true, error:true})
            
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    const eliminarColaborador = async(datos)=>{
        const {proyecto} = datos
        const token = localStorage.getItem('PROTASK-TOKEN')
        const res = confirm("¿Seguro wue quieres borrar este colaborador del proyecto?")
        if (res) {
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/eliminar-colaborador/${proyecto}`, datos,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                } )
                obtenerProyecto(proyecto)
                setAlerta({msg: "Colaborador Eliminado Correctamente", value: true, error:false})
            } catch (error) {
                console.log(error);
                setAlerta({msg: error.response.data.msg, value: true, error:true})
                
            }
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    const buscarColaborador= async(email)=>{
        const token = localStorage.getItem('PROTASK-TOKEN')
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores`, email,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
            setColaborador(data)
        } catch (error) {
            console.log(error);
            setAlerta({msg: error.response.data.msg, value: true, error:true})
            
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    return (
        <ProtaskContext.Provider
            value={{
                alerta,
                setAlerta,
                crearProyecto,
                proyectos,
                obtenerProyectos,
                obtenerProyecto,
                proyecto,
                setProyecto,
                tarea,
                actualizarProyecto,
                eliminarProyecto,
                modal,
                setModal,
                crearTarea,
                obtenerTarea,
                actualizarTarea,
                cambiarEstado,
                cargando,
                setCargando,
                eliminarTarea,
                añadirColaborador,
                buscarColaborador,
                eliminarColaborador,
                colaborador,
                isAdmin,
                setIsAdmin,
                buscar,
                setBuscar

            }}
        >{children}</ProtaskContext.Provider>
    )
}

export {
    ProtaskProvider
}
export default ProtaskContext