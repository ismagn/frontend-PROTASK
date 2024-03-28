import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function MenuMovil() {
    const {logout} = useAuth('guest')

  return (
    <div className=' '>
    <div className="w-1/8 text-end">
      <Menu as="div" className="">
        <div>
          <Menu.Button className=" w-full  rounded-md bg-indigo-500 p-1  text-xs font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 p-1 flex flex-col gap-1 right-0 mt-2 w-2/5 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black/5 focus:outline-none ">
            <div className="px-1 py-2 text-center border-2 bg-slate-100 focus:bg-indigo-300  rounded">
                <Link className="p-2 text-xs rounded-md text-indigo-500 uppercase font-bold" to="/proyectos/nuevo-proyecto">Nuevo Proyecto</Link>
            </div>
            <div className="px-1 py-2 text-center border-2 bg-slate-100 rounded focus:bg-indigo-300 ">
                <Link className="  p-2 text-xs rounded-md text-indigo-500  uppercase font-bold" to="/Proyectos">Proyectos</Link>
            </div>
            <div className='px-1 py-2 my-3 text-center border rounded bg-indigo-500 focus:bg-indigo-700 '>
            <button type="button" className="text-xs font-bold text-white p-1 "
            onClick={logout}
            >CERRAR SESION</button>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
    </div>
  )
}




