import { useState } from "react";
import NavButton from "../components/NavButton";
import { toast } from "react-toastify";

import homeStyle from "../styles/Home.module.css"

interface UserForm{
    nombre:string,
    password:string
}

export default function Home(){
    const [formData,setFormData] = useState<UserForm>({
        nombre: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const loginEncargado = async() => {
        if(formData.nombre === "" || formData.password === ""){return;}

        try{
            const response = await fetch("http://localhost:8080/usuario/login/turno",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            });
            if(!response.ok){
                const errorMsg = await response.text();
                toast.error(errorMsg);
                return;
            }
            const user = await response.json();
            
            window.electronAPI.loginSuccess(user)
            console.log(user);//temporal

        }
        catch(error){
            toast.error("Hubo un error inesperado");
        }
    }


    return(
        <div className={homeStyle.homeContainer}>
            <h1>Inicio de sesion de caja</h1>
            <div className={homeStyle.loginContainer}>
                <input name="nombre" value={formData?.nombre} onChange={handleChange} type="text" placeholder="Usuario"/>
                <input name="password" value={formData?.password} onChange={handleChange} type="password" placeholder="Contraseña"/>
                <button onClick={loginEncargado}>Loguear Admin</button>
            </div>

        </div>
    )
    
}