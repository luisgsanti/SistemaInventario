import React, { useState, useEffect } from "react";  
import { motion } from "framer-motion";  
import { Calendar, Download, Search } from "lucide-react";  
import { getHistory, generateInventoryPDF, getConfig } from "../utils/localStorage";  
import { format, parseISO, isWithinInterval } from "date-fns";  

// Note: For history PDF, we can add a similar function or reuse adapted  
const generateHistoryPDF = (filteredHistory, config, filename = "historial.pdf") => {  
    const doc = new jsPDF();  
    const pageWidth = doc.internal.pageSize.getWidth();  
    let y = 20;  

    if (config.logo) {  
        try {  
            doc.addImage(config.logo, 'PNG', 10, y, 30, 15);  
            y += 20;  
        } catch (e) {}  
    }  

    doc.setFontSize(16);  
    doc.text(`${config.title || "DotaciónPro"} - Historial`, pageWidth / 2, y, { align: "center" });  
    y += 15;  
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: "center" });  
    y += 20;  

    doc.setFontSize(10);  
    filteredHistory.forEach((mov) => {  
        if (y > 250) {  
            doc.addPage();  
            y = 20;  
        }  
        const typeText = mov.type === "entrada" ? "Entrada" : "Salida";  
        const text = `${format(parseISO(mov.date), "dd/MM/yyyy HH:mm")} - ${typeText} - ${mov.item} - Talla: ${mov.talla} - Cantidad: ${mov.cantidad} - Usuario: ${mov.user}`;  
        const splitText = doc.splitTextToSize(text, pageWidth - 20);  
        doc.text(splitText, 10, y);  
        y += splitText.length * 5;  
    });  

    doc.save(filename);  
};  

const Historial = () => {  
    const [history, setHistory] = useState([]);  
    const [startDate, setStartDate] = useState("");  
    const [endDate, setEndDate] = useState("");  
    const [searchTerm, setSearchTerm] = useState("");  
    const [filteredHistory, setFilteredHistory] = useState([]);  
    const config = getConfig();  

    useEffect(() => {  
        const hist = getHistory();  
        setHistory(hist);  
        setFilteredHistory(hist);  
    }, []);  

    useEffect(() => {  
        let filtered = history;  

        // Filtro por fechas  
        if (startDate && endDate) {  
            const start = parseISO(startDate);  
            const end = parseISO(endDate);  
            filtered = filtered.filter((mov) =>  
                isWithinInterval(parseISO(mov.date), { start, end })  
            );  
        }  

        // Filtro por búsqueda  
        if (searchTerm) {  
            const lowerSearch = searchTerm.toLowerCase();  
            filtered = filtered.filter((mov) =>  
                mov.item.toLowerCase().includes(lowerSearch) ||  
                mov.talla.toLowerCase().includes(lowerSearch) ||  
                mov.user.toLowerCase().includes(lowerSearch)  
            );  
        }  

        setFilteredHistory(filtered);  
    }, [startDate, endDate, searchTerm, history]);  

    const handleExportPDF = () => {  
        generateHistoryPDF(filteredHistory, config);  
    };  

    return (  
        <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>  
            <div className="flex justify-between items-center mb-6">  
                <h2 className="text-3xl font-bold text-gray-800">Historial de Movimientos</h2>  
                <motion.button  
                    onClick={handleExportPDF}  
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"  
                    whileHover={{ scale: 1.05 }}  
                >  
                    <Download className="w-4 h-4" />  
                    PDF  
                </motion.button>  
            </div>  
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">  
                <div className="grid md:grid-cols-3 gap-4">  
                    <div className="relative">  
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />  
                        <input  
                            type="text"  
                            value={searchTerm}  
                            onChange={(e) => setSearchTerm(e.target.value)}  
                            placeholder="Buscar por item, talla o usuario..."  
                            className="pl-10 p-3 border rounded-xl w-full"  
                        />  
                    </div>  
                    <input  
                        type="date"  
                        value={startDate}  
                        onChange={(e) => setStartDate(e.target.value)}  
                        className="p-3 border rounded-xl"  
                    />  
                    <input  
                        type="date"  
                        value={endDate}  
                        onChange={(e) => setEndDate(e.target.value)}  
                        className="p-3 border rounded-xl"  
                    />  
                </div>  
            </div>  
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">  
                <table className="w-full">  
                    <thead className="bg-gray-50">  
                        <tr>  
                            <th className="p-4 text-left font-semibold">Fecha</th>  
                            <th className="p-4 text-left font-semibold">Tipo</th>  
                            <th className="p-4 text-left font-semibold">Item</th>  
                            <th className="p-4 text-left font-semibold">Talla</th>  
                            <th className="p-4 text-left font-semibold">Cantidad</th>  
                            <th className="p-4 text-left font-semibold">Usuario</th>  
                            <th className="p-4 text-left font-semibold">Observaciones</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        {filteredHistory.map((mov) => (  
                            <tr key={mov.id} className="border-t">  
                                <td className="p-4">{format(parseISO(mov.date), "dd/MM/yyyy HH:mm")}</td>  
                                <td className={`p-4 font-medium ${mov.type === "entrada" ? "text-green-600" : "text-red-600"}`}>  
                                    {mov.type === "entrada" ? "Entrada" : "Salida"}  
                                </td>  
                                <td className="p-4">{mov.item}</td>  
                                <td className="p-4">{mov.talla}</td>  
                                <td className="p-4">{mov.cantidad}</td>  
                                <td className="p-4">{mov.user}</td>  
                                <td className="p-4 text-sm italic">{mov.observations || "-"}</td>  
                            </tr>  
                        ))}  
                    </tbody>  
                </table>  
                {filteredHistory.length === 0 && (  
                    <p className="p-8 text-center text-gray-500">No hay movimientos que coincidan.</p>  
                )}  
            </div>  
        </motion.div>  
    );  
};  

export default Historial;