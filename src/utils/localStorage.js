import { initialInventory, initialHistory } from "../mock/inventory";  
import jsPDF from "jspdf";  

const INVENTORY_KEY = "dotacion_inventory";  
const HISTORY_KEY = "dotacion_history";  
const CONFIG_KEY = "dotacion_config";  
const ALLOW_NEGATIVES_KEY = "dotacion_allow_negatives";  
const PENDING_ENTRADAS_KEY = "dotacion_pending_entradas";  
const PENDING_SALIDAS_KEY = "dotacion_pending_salidas";  

export const getInventory = () => {  
    const stored = localStorage.getItem(INVENTORY_KEY);  
    return stored ? JSON.parse(stored) : initialInventory;  
};  

export const setInventory = (inventory) => {  
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));  
};  

export const resetInventory = () => {  
    Object.keys(initialInventory).forEach(item => {  
        Object.keys(initialInventory[item].tallas).forEach(talla => {  
            initialInventory[item].tallas[talla] = 0;  
        });  
    });  
    setInventory(initialInventory);  
};  

export const getHistory = () => {  
    const stored = localStorage.getItem(HISTORY_KEY);  
    return stored ? JSON.parse(stored) : initialHistory;  
};  

export const setHistory = (history) => {  
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));  
};  

export const addToHistory = (movement) => {  
    const history = getHistory();  
    history.unshift(movement);  
    setHistory(history);  
};  

export const getConfig = () => {  
    const stored = localStorage.getItem(CONFIG_KEY);  
    return stored ? JSON.parse(stored) : {  
        title: "DotaciónPro",  
        logo: "",  
        password: ""  
    };  
};  

export const setConfig = (config) => {  
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));  
};  

export const getAllowNegatives = () => {  
    return localStorage.getItem(ALLOW_NEGATIVES_KEY) === "true";  
};  

export const setAllowNegatives = (allow) => {  
    localStorage.setItem(ALLOW_NEGATIVES_KEY, allow.toString());  
};  

export const getPendingMovements = (type) => { // type: 'entradas' or 'salidas'  
    const key = type === 'entradas' ? PENDING_ENTRADAS_KEY : PENDING_SALIDAS_KEY;  
    const stored = localStorage.getItem(key);  
    return stored ? JSON.parse(stored) : [];  
};  

export const setPendingMovements = (movements, type) => {  
    const key = type === 'entradas' ? PENDING_ENTRADAS_KEY : PENDING_SALIDAS_KEY;  
    localStorage.setItem(key, JSON.stringify(movements));  
};  

export const clearPendingMovements = (type) => {  
    const key = type === 'entradas' ? PENDING_ENTRADAS_KEY : PENDING_SALIDAS_KEY;  
    localStorage.removeItem(key);  
};  

export const handleLogoUpload = (event, setLogo) => {  
    const file = event.target.files[0];  
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {  
        const reader = new FileReader();  
        reader.onload = (e) => {  
            setLogo(e.target.result);  
        };  
        reader.readAsDataURL(file);  
    } else {  
        alert("Solo PNG o JPG, por favor");  
    }  
};  

export const generateInventoryPDF = (inventory, config, filename = "inventario.pdf") => {  
    const doc = new jsPDF();  
    const pageWidth = doc.internal.pageSize.getWidth();  
    let y = 20;  

    // Logo  
    if (config.logo) {  
        try {  
            doc.addImage(config.logo, 'PNG', 10, y, 30, 15);  
            y += 20;  
        } catch (e) {}  
    }  

    // Título  
    doc.setFontSize(16);  
    doc.text(config.title || "Inventario", pageWidth / 2, y, { align: "center" });  
    y += 15;  
    doc.setFontSize(12);  
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: "center" });  
    y += 20;  

    // Items  
    Object.entries(inventory).forEach(([item, data]) => {  
        if (y > 250) {  
            doc.addPage();  
            y = 20;  
        }  
        doc.setFontSize(14);  
        doc.text(item, 10, y);  
        y += 10;  
        doc.setFontSize(10);  
        let tallaText = Object.entries(data.tallas).map(([talla, cant]) => `${talla}: ${cant}`).join(" | ");  
        doc.text(tallaText, 10, y);  
        y += 10;  
    });  

    doc.save(filename);  
};  

export const generateMovementPDF = (movements, config, type, observations = "", filename = "movimiento.pdf") => {  
    const doc = new jsPDF();  
    const pageWidth = doc.internal.pageSize.getWidth();  
    let y = 20;  

    // Logo  
    if (config.logo) {  
        try {  
            doc.addImage(config.logo, 'PNG', 10, y, 30, 15);  
            y += 20;  
        } catch (e) {}  
    }  

    // Título  
    doc.setFontSize(16);  
    const action = type === "entrada" ? "Ingreso" : "Salida";  
    doc.text(`${config.title || "DotaciónPro"} - ${action} de Items`, pageWidth / 2, y, { align: "center" });  
    y += 10;  
    doc.text(`Fecha: ${new Date().toLocaleString()}`, pageWidth / 2, y, { align: "center" });  
    y += 20;  

    // Lista de movimientos  
    doc.setFontSize(12);  
    movements.forEach((mov, index) => {  
        if (y > 250) {  
            doc.addPage();  
            y = 20;  
        }  
        doc.text(`${index + 1}. ${mov.item} - Talla: ${mov.talla} - Cantidad: ${mov.cantidad}`, 10, y);  
        y += 8;  
    });  

    // Observaciones  
    if (observations) {  
        y += 10;  
        doc.setFontSize(12);  
        doc.text("Observaciones:", 10, y);  
        y += 8;  
        const splitObs = doc.splitTextToSize(observations, pageWidth - 20);  
        doc.text(splitObs, 10, y);  
        y += splitObs.length * 5;  
    }  

    doc.save(filename);  
};