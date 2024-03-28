import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Fade} from 'react-reveal'




export default function RutaProtegida() {

const {user} =useAuth({middleware: 'guest'})

  return (
    <Fade>
    <div className="">
        <div className=" bg-gray-100">
            <Header 
            user={user}
            />
        </div>
        <div className=" block lg:flex  h-screen ">
            

            <div className="hidden lg:block lg:w-1/4 lg:h-screen pt-10">   
                <Sidebar/>
            </div>

            <main className="w-full lg:flex-1 h-screen lg:min-h-screen pb-52 px-2 lg:px-5 pt-5 overflow-y-auto">
                <Outlet/>
            </main>
        </div>
    </div>
    </Fade>
  )
}
