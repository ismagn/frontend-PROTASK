import { useEffect } from "react"
import useProtask from "./useProtask"
import axios from "axios"
import useSWR from 'swr';
import { useNavigate } from "react-router-dom";


const useAuth = ({middleware,url}) => {
    const token = localStorage.getItem('PROTASK-TOKEN')
    const navigate = useNavigate()
    const {setAlerta, setIsAdmin, proyecto, obtenerProyectos} = useProtask()

    
    const {data: user, error, mutate, isLoading} = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`, ()=>
        axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        
        .catch(error =>{
            throw Error(error?.response?.data?.errors)
        })
    )

    const comprobarAdmin =()=>{
        
        if (user?._id === proyecto?.proyecto?.creador) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
        
    }

    const registro = async (datos)=>{
        const {nombre,email,password} = datos
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, {nombre, email, password} )
            setAlerta({msg:data.msg,value:true,error:false})
            await mutate()
        } catch (error) {
            console.log(error.response);
            setAlerta({msg:error.response.data.msg,value:true,error:true})
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    const login = async (datos)=>{
        const {email,password} = datos
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`, { email, password} )
            setAlerta({msg:data.msg,value:true,error:false})
            localStorage.setItem('PROTASK-TOKEN', data.token)
            await mutate()
        } catch (error) {
            console.log(error.response);
            setAlerta({msg:error.response.data.msg,value:true,error:true})
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
        
    } 

    const logout = () => {
        const res = confirm("¿Seguro que quieres cerrar session?")
        if (res) {
            localStorage.removeItem('PROTASK-TOKEN')
            window.location.reload()
        }
        
        
    }

    const confirmarCuenta = async (id)=>{
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${id}`
                const {data} = await axios(url)
    
                setAlerta({msg:data.msg, value:true, error:false })
                console.log(data);
    
            }catch (error) {
                setAlerta({msg:error.response.data.msg, value:true, error:true })
                console.log(error);
            }
            setTimeout(()=>{
                setAlerta({})
            },5000)
    }

    const olvidoPassword = async (email)=>{
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvido-password`, {email} )
            setAlerta({msg:data.msg,value:true,error:false})
        } catch (error) {
            console.log(error.response);
            setAlerta({msg:error.response.data.msg,value:true,error:true})
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    const nuevoPassword = async (password, id)=>{
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvido-password/${id}`, {password} )
            setAlerta({msg:data.msg,value:true,error:false})
        } catch (error) {
            console.log(error.response);
            setAlerta({msg:error.response.data.msg,value:true,error:true})
        }
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    useEffect(()=>{
        if (middleware==='guest' && user) {
            navigate('/proyectos')   
        }

        if (middleware==='guest' && !user) {
            navigate('/')   
        }
        if (middleware==='resgistro' && url && !user) {
            navigate('/registrar')   
        }
        if (middleware==='olvide-pass' && url && !user) {
            navigate('/olvido-password')   
        }
        obtenerProyectos()
    },[user,error])

    return {
        registro,
        login,
        logout,
        confirmarCuenta,
        olvidoPassword,
        nuevoPassword,
        user,
        error,
        isLoading,
        token,
        comprobarAdmin
    }
}

export default useAuth