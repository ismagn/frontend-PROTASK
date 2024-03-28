
import { useEffect, useState } from "react"
import Proyecto from "../components/Proyecto"
import useProtask from "../hooks/useProtask"
import useAuth from "../hooks/useAuth"
import {Fade} from 'react-reveal'


export default function Proyectos() {
    const {user} = useAuth('guest')
    const {proyectos, obtenerProyectos,buscar,setBuscar} = useProtask()
    const [proyectoFiltrado,setProyectoFiltrado] = useState([])
    const [proyectosAdmin,setProyectosAdmin] = useState([])
    const [proyectosColaborador,setProyectosColaborador] = useState([])

    useEffect(()=>{
        obtenerProyectos()
        const proColaborador = proyectos.filter(i=> i.colaboradores.includes(user._id))
        const proAdmin = proyectos.filter(i=> i.creador.includes(user._id)) 
        setProyectosAdmin(proAdmin)
        setProyectosColaborador(proColaborador)
    },[])

    useEffect(()=>{
        const busqueda = proyectos.filter(i => i.nombre.toLowerCase().startsWith(buscar.toLowerCase()))
        setProyectoFiltrado(busqueda)
    },[buscar])
    

  return (
    <div >
        <Fade>
        <div className="flex justify-between">
            <p className="text-2xl lg:text-4xl text-indigo-500 font-black uppercase">Proyectos</p>
            <input className="p-1 lg:p-2 rounded-md border-2 border-indigo-500" type="search" name="" id="" placeholder="Buscar Proyecto" 
            onChange={(e)=>setBuscar(e.target.value)}
            value={buscar}
            />
        </div>
        {proyectos.length ? (
            <>
            {buscar ? (
                <>
                {proyectoFiltrado.map(i=>(
                    <Proyecto key={i._id}
                    i={i}
                    />
                ))}
                </>
            ):(
                <>
                <div>
                    <h2 className="text-slate-500 mt-5">Tus Proyectos</h2>
                    {proyectosAdmin.map(i=>(
                    <Proyecto key={i._id}
                    i={i}
                    />
                    ))}
                </div>
                <div>
                    <h2 className="text-slate-500 mt-5">Proyectos que Colaboras</h2>
                    {proyectosColaborador.map(i=>(
                    <Proyecto key={i._id}
                    i={i}
                    />
                    ))}
                </div>
                </>
            )}
            </>
        ) : (
            <p className="bg-white p-4 rounded my-3">no hay Proyectos</p>
        )}
        </Fade>
    </div>
  )
}
