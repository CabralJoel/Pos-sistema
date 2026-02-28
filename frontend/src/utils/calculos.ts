export const redondear = (n:number)=>Number(n.toFixed(2));//redondea a 2 digitos despues de la coma

export const calcularGanancia = (precio:number,costoUnidad:number)=>{//calcula ganancia en base al precio ingresado y costo unitario
    return redondear(((precio-costoUnidad)/costoUnidad)*100);
}

export const calcularPrecio = (ganancia:number, costoUnitario:number)=>{//calcula precio en base al precio ingresado y costo unitario
    return redondear(costoUnitario*(1 + ganancia/100));
}