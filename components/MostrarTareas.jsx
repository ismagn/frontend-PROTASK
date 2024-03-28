/* eslint-disable react/prop-types */
import useProtask from "../hooks/useProtask"
import Tarea from "./Tarea"

export default function MostrarTareas({setEditarTarea,setModal,id}) {
    const {proyecto} = useProtask()

  return (
    <>
      {proyecto?.tareas?.length ? (
        <div>
            {proyecto?.tareas.map(i => (
            <div key={i._id}>
                <Tarea
                i={i}
                setEditarTarea={setEditarTarea}
                setModal={setModal}
                idProyecto={id}
                />
            </div>
            ))}
        </div>
      ):(
        <p className="text-center bg-white ">--Aun no hay tareas--</p>
      )}
    </>
  )
}
