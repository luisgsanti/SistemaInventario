export const initialInventory = {  
    "BLUSA VERDE ALOJAMIENTO": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "blusa"  
    },  
    "BLUSA VERDE ALOJAMIENTO SEGURIDAD": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "blusa"  
    },  
    "BLUSA VERDE ALOJAMIENTO EMBARAZADA": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "blusa"  
    },  
    "CAMISA AMARILLA ADM HOMBRE": {  
        tallas: { XS: 5, S: 3, M: 8, L: 2, XL: 1 },  
        tipo: "camisa"  
    },  
    "CAMISA AMARILLA ADM DAMA": {  
        tallas: { XS: 4, S: 6, M: 5, L: 3, XL: 2 },  
        tipo: "camisa"  
    },  
    "CAMISA AMARILLA RECEPCIÓN (GLOBO)": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "camisa"  
    },  
    "SUETER AMARILLO ADM DAMA": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "sueter"  
    },  
    "SUETER AMARILLO ADM HOMBRE": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "sueter"  
    },  
    "BUZO AMARILLO AMBIENTAL": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "buzo"  
    },  
    "SUETER VERDE MANGA CORTA": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "sueter"  
    },  
    "SUETER VERDE MANGA CORTA SEGURIDAD": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "sueter"  
    },  
    "BUZO VERDE SEGURIDAD (MANITOS)": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "buzo"  
    },  
    "BUZO VERDE SEGURIDAD APROVECHAMIENTO": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "buzo"  
    },  
    "CAMISA JEAN HOMBRE OPERATIVO (ALOJAMIENTO/AMBIENTAL)": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "camisa"  
    },  
    "SUETER RECREACIÓN": {  
        tallas: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },  
        tipo: "sueter"  
    },  
    "PANTALON ADM DAMA": {  
        tallas: { "4": 2, "6": 1, "8": 3, "10": 0, "12": 0, "14": 0, "16": 0, "18": 0 },  
        tipo: "pantalon"  
    },  
    "PANTALON ADM HOMBRE": {  
        tallas: { "28": 4, "30": 5, "32": 6, "34": 2, "36": 1, "38": 0, "40": 0 },  
        tipo: "pantalon"  
    },  
    "PANTALON OPERATIVO DAMA (CAMARERA)": {  
        tallas: { "4": 0, "6": 0, "8": 0, "10": 0, "12": 0, "14": 0, "16": 0, "18": 0 },  
        tipo: "pantalon"  
    },  
    "PANTALON JEAN OPERATIVO HOMBRE (ALOJAMIENTO/AMBIENTAL)": {  
        tallas: { "28": 0, "30": 0, "32": 0, "34": 0, "36": 0, "38": 0, "40": 0 },  
        tipo: "pantalon"  
    },  
    "SUDADERA RECREACIÓN": {  
        tallas: { "28": 0, "30": 0, "32": 0, "34": 0, "36": 0, "38": 0, "40": 0 },  
        tipo: "sudadera"  
    },  
    "BOTAS OPERATIVAS": {  
        tallas: { "35": 3, "36": 2, "37": 1, "38": 4, "39": 0, "40": 0, "41": 0, "42": 0, "43": 0, "44": 0, "45": 0 },  
        tipo: "botas"  
    },  
    "BOTAS ADMINISTRATIVAS": {  
        tallas: { "35": 0, "36": 0, "37": 0, "38": 0, "39": 0, "40": 0, "41": 0, "42": 0, "43": 0, "44": 0, "45": 0 },  
        tipo: "botas"  
    },  
    "BOTAS CAÑA ALTA": {  
        tallas: { "35": 0, "36": 0, "37": 0, "38": 0, "39": 0, "40": 0, "41": 0, "42": 0, "43": 0, "44": 0, "45": 0 },  
        tipo: "botas"  
    }  
};  

export const initialHistory = [  
    {  
        id: "1",  
        date: new Date("2024-01-15").toISOString(),  
        type: "entrada",  
        item: "CAMISA AMARILLA ADM HOMBRE",  
        talla: "M",  
        cantidad: 8,  
        user: "Admin",  
        observations: "Lote inicial"  
    },  
    {  
        id: "2",  
        date: new Date("2024-01-14").toISOString(),  
        type: "salida",  
        item: "PANTALON ADM HOMBRE",  
        talla: "32",  
        cantidad: 2,  
        user: "Admin",  
        observations: "Entrega equipo"  
    }  
];