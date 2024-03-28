/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth"
import MenuMovil from "./MenuMovil"

export default function Header({user}) {
  const {logout} = useAuth('guest')
  return (
    <div className="bg-white flex justify-between items-center p-2">
        <div>
            <h1 className="text-indigo-500 text-3xl font-black">ProTask</h1>
        </div>
        <div className=" lg:hidden">
            <MenuMovil/>
        </div>
        <div className=" hidden lg:flex gap-2 items-center">
            <p className="hidden lg:block font-bold uppercase">{user?.nombre}</p>
            <button type="button" className=" bg-indigo-500 text-white p-2 rounded-md"
            onClick={logout}
            >CERRAR SESION</button>
        </div>
    </div>
  )
}
