import{useNavigate} from "react-router-dom";

type NavButton = {
    text : string;
    to: string;
};

export default function NavButton({text, to}: NavButton){

    const navigate = useNavigate();

    return(
        <button
        onClick={()=>navigate(to)}
        >
            {text}
        </button>
    );
} 