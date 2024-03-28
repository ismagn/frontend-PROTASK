import useProtask from "../hooks/useProtask"
import Colaborador from "./Colaborador"



export default function MostrarColaboradores() {
    const {proyecto} = useProtask()

  return (
    <>
    {proyecto?.proyecto?.colaboradores.length ? (
        <div>
        {proyecto?.proyecto?.colaboradores.map(i=> (
            <div key={i._id}>
                <Colaborador
                i={i}
                />
            </div>
        ))}
    </div>
    ):(
        <p className="text-center">--Aun no hay colaboradores--</p>
    )}
    </>
  )
}
