import type React from "react";
import { useLocation } from "react-router-dom";

type NavButtonProps = {
    icon?:React.ReactNode;
    text?: string;
    tooltip?: string;
    to: string;
};

export default function NavButton({icon,tooltip,text, to = "single"}: NavButtonProps){

    const location = useLocation();

    const handleClick = () => {
        window.electronAPI.navigate({
            route: to,
            from: location.pathname,
        });
    };


    return(
        <button style={{background: "#3996f3ff"}} onClick={handleClick} title={tooltip}>
            {icon}
            {text && <span>{text}</span>}
            </button>
    );
} 