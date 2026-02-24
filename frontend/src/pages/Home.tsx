import { useState } from "react";
import { toast } from "react-toastify";

import homeStyle from "../styles/Home.module.css"
import { FaUserPen } from "react-icons/fa6";
import type { usuarioLocal } from "../types/ventas";

interface UserForm{
    nombre:string,
    password:string
}

export default function Home(){
    const [error,setError] = useState("");
    const [formData,setFormData] = useState<UserForm>({
        nombre: "",
        password: "",
    });
    const [usuario,setUsuario] = useState<usuarioLocal|null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const loginUsuario = async() => {
        if(formData.nombre === "" || formData.password === ""){
            toast.error("Complete los campos faltantes");
            return;}

        try{
            const response = await fetch("http://localhost:8080/usuario/login/turno",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            });
            if(!response.ok){
                const errorMsg = await response.json();
                toast.error(errorMsg.error);
                return;
            }
            const user = await response.json();
            setUsuario(user);
            setFormData({
                nombre: "",
                password: "",
            })

            console.log(user);//temporal
        }
        catch(error){
            setError("Hubo un error inesperado");
        }
    }

    const toCaja = () => {
        if(usuario===null){
            toast.error("No hay usuario logueado, vuelva a iniciar sesión")
            return;
        }
        window.electronAPI.loginSuccess(usuario);
    }

    const toGestion = () => {
        if(usuario?.rol==="CAJERO"){
            setError("Solo un administrador puede entrar a esta sección");
            setTimeout(()=>{
                setError("");
            },2500);
            return;
        }

        window.electronAPI.loginToAdmin(usuario);
    }

    return(
        <div className={homeStyle.homeContainer}>
            {usuario===null && (
                <div className={homeStyle.loginContainer}>
                    <h1>Inicio de sesion de caja</h1>
                        <form className={homeStyle.loginForm} onSubmit={(e)=>{
                            e.preventDefault();
                            loginUsuario();
                        }}>
                            <input name="nombre" value={formData?.nombre} onChange={handleChange} type="text" placeholder="Usuario"/>
                            <input name="password" value={formData?.password} onChange={handleChange} type="password" placeholder="Contraseña"/>
                            <button type="submit">Loguear Admin</button>
                        </form>
                </div>
            )}
            {usuario && (
                <div className={homeStyle.routeContainer}>
                    <div className={homeStyle.userContainer}>
                        <button title="Cambiar Usuario" onClick={()=>setUsuario(null)}><FaUserPen size={23}/></button>
                        <span>Usuario: {usuario.nombre.toUpperCase()}</span>
                    </div>
                    <div className={homeStyle.buttonContainer}>
                        <button onClick={toCaja}>Caja</button>
                        <button onClick={toGestion}>Administración</button>
                    </div>
                    {error!=="" && (
                        <p style={{position:"absolute",top:"100%",color:"rgb(209, 43, 43)"}}>{error}</p>
                    )}
                </div>
            )}
            
        </div>
    )
}