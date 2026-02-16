import { useEffect } from "react";

type UseClickOutsideOptions = {
    enabled?: boolean;
}

export function useClickOutside(
    ref: React.RefObject<HTMLElement|null>,
    onOutsideClick: () => void,
    options?: UseClickOutsideOptions
){
    const enabled = options?.enabled ?? true;
    
    useEffect(()=>{
        if(!enabled){return;}

        function handleClick(event:MouseEvent){
            const e = ref.current;
            if(!e)return;

            if(!e.contains(event.target as Node)){
                onOutsideClick();
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    },[ref,onOutsideClick,enabled]);
}