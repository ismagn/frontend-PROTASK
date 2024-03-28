/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import {Fade} from 'react-reveal'


export default function Proyecto({i}) {
  const {user} = useAuth('guest')

  return (
    <Fade>
    <div className="bg-white group  p-4 rounded my-3 flex justify-between items-center font-bold">
        <div>
            <p className="group-hover:text-blue-500 duration-200 text-sm lg:text-lg">{i.nombre} <span className="text-gray-400">{i.cliente}</span></p>
        </div>

        <div className="flex gap-4  ">
        {user?._id !== i.creador ? (
          <div className="hidden lg:block">
            <p className="text-indigo-500 text-sm ">(colaborador)</p>
          </div>
        ):(
          <div className="hidden lg:block">
            <p className="text-green-500 text-sm">(Tu Proyecto)</p>
          </div>
        )}
        <Link to={`${i._id}`} className="hover:text-indigo-800 text-indigo-500 duration-200 text-xs lg:text-md ">Ver Proyecto</Link>
        </div>
        
        
    </div>
    </Fade>
  )
}
