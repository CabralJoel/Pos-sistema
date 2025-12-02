
type NavButton = {
    text : string;
    onClick?: ()=> void;
};

export default function NavButton({text, onClick}: NavButton){
    return(
        <button
        onClick={onClick}>
            {text}
        </button>
    );
} 