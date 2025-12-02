import{useNavigate} from "react-router-dom";
import NavButton from "../components/NavButton";

export default function Home(){
    return(
        <div >
            <h1>Home</h1>
            <NavButton text="Carga Productos" to="/carga"/>
        </div>
    )
    
}