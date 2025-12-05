
type NavButton = {
    icon?:string;
    text : string;
    to: string;
};

export default function NavButton({text, to}: NavButton){

    const openNew = () => {
  console.log("Botón clickeado:", to);
  window.electronAPI.openWindow(to);
};


    return(
        <button
        style={{background: "#3996f3ff"}}//cambiar color de botones
        onClick={openNew}
        >
            {text}
        </button>
    );
} 