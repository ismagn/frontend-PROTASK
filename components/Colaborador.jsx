import useProtask from "../hooks/useProtask"

/* eslint-disable react/prop-types */

export default function Colaborador({i}) {
    const {eliminarColaborador, proyecto} = useProtask()

  return (
    <div className="flex justify-between items-center">
        <div>
            <p className="uppercase font-bold">{i.nombre}</p>
            <p className="text-sm">{i.email}</p>
        </div>
        <div>
            <button type="button" className="bg-red-500 p-1 lg:p-2 rounded-md text-white text-xs lg:text-md"
            onClick={()=>eliminarColaborador({
                id:i._id,
                proyecto:proyecto.proyecto._id
            })}
            >Eliminar</button>
        </div>
    </div>
  )
}
