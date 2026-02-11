import { useState } from "react";
import NavButton from "../components/NavButton";
import { toast } from "react-toastify";
import type { usuarioLocal } from "../types/ventas";

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

    const crearUser = async() => {
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
        <div >
            <div>
                <h1>Home</h1>
                <NavButton text="Carga Productos" to="/carga"/>
                <NavButton text="Caja" to="/caja"/>
            </div>
            <div>
                <input style={{backgroundColor:"yellow"}} name="nombre" value={formData?.nombre} onChange={handleChange} type="text" placeholder="nombre usuario"/>
                <input style={{backgroundColor:"yellow"}} name="password" value={formData?.password} onChange={handleChange} type="password" placeholder="contraseña"/>
                <button onClick={crearUser}>Loguear Admin</button>
            </div>

        </div>
    )
    
}