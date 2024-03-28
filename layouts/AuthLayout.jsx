import { Outlet } from "react-router-dom"
import {Fade} from 'react-reveal'

function AuthLayout() {
    return (
    <>
        <div className="w-full lg:mt-16 bg-blue-100 fixed h-screen ">
            <Fade>
                <Outlet/>
            </Fade>
        </div>
    </>
    )
}

export default AuthLayout
