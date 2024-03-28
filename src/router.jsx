import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../views/Login";
import Registro from "../views/Registro";
import OlvidePassword from "../views/OlvidePassword";
import NuevoPassword from "../views/NuevoPassword";
import ConfirmarCuenta from "../views/ConfirmarCuenta";
import Proyectos from "../views/Proyectos";
import RutaProtegida from "../layouts/RutaProtegida";
import NuevoProyecto from "../components/NuevoProyecto";
import InfoProyecto from "../components/InfoProyecto";
import EditarProyecto from "../components/EditarProyecto";
import NuevoColaborador from "../components/NuevoColaborador";




const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout/>, 
        children:[
            {
                index: true,
                element: <Login/>
            },
            {
                path: '/registrar',
                element: <Registro/>
            },
            {
                path: '/olvido-password',
                element: <OlvidePassword/>
            },
            {
                path: '/nuevo-password/:id',
                element: <NuevoPassword/>
            },
            {
                path: '/confirmar-cuenta/:id',
                element: <ConfirmarCuenta/>
            },
        ]
    },

    {
        path: '/proyectos',
        element: <RutaProtegida/>, 
        children:[
            {
                index: true,
                element: <Proyectos/>
            },
            {
                path: 'nuevo-proyecto',
                element: <NuevoProyecto/>
            },
            {
                path: ':id',
                element: <InfoProyecto/>
            },
            {
                path: 'editar/:id',
                element: <EditarProyecto/>
            },
            {
                path: 'nuevo-colaborador/:id',
                element: <NuevoColaborador/>
            },

            
        ]
    }
    
])

export default router