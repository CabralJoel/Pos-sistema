import { useLocation } from "react-router-dom";

type NavButtonProps = {
    icon?:string;
    text: string;
    to: string;
};

export default function NavButton({text, to = "single"}: NavButtonProps){

    const location = useLocation();

    const handleClick = () => {
        window.electronAPI.navigate({
            route: to,
            from: location.pathname,
        });
    };


    return(
        <button style={{background: "#3996f3ff"}} onClick={handleClick}>{text}</button>
    );
} 