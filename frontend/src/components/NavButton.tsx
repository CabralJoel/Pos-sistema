
type NavButton = {
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
        onClick={openNew}
        >
            {text}
        </button>
    );
} 