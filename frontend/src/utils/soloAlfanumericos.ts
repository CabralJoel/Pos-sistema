import type React from "react";

export const handleAlfanumerico = {
    onKeyDown:(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==" "){
            e.preventDefault();
            return;
        }

        if (!/^[A-Za-z0-9]$/.test(e.key)) {
            if (e.key.length === 1) e.preventDefault();
        }
    },

    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text");
        if (!/^[A-Za-z0-9]*$/.test(pasted)) {
            e.preventDefault();
        }
    }
}