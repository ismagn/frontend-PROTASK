import { Link } from "react-router-dom"

export default function Sidebar() {

  return (
    <div className=" p-2 text-center">
        <nav className="flex flex-col gap-3">
            <Link className="block p-2  rounded-md bg-indigo-500 text-white uppercase font-bold" to="/proyectos/nuevo-proyecto">Nuevo Proyecto</Link>
            <Link className="block p-2 rounded-md bg-indigo-500 text-white uppercase font-bold" to="/Proyectos">Proyectos</Link>
        </nav>
    </div>
  )
}
