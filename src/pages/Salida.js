import React, { useState, useEffect } from "react";  
import { motion } from "framer-motion";  
import { Minus, Check, Trash2, Download } from "lucide-react";  
import { getInventory, setInventory, addToHistory, generateMovementPDF, getConfig, getAllowNegatives, getPendingMovements, setPendingMovements, clearPendingMovements } from "../utils/localStorage";  

const Salida = () => {  
    const allowNegatives = getAllowNegatives();  
    const [inventory, setInventory] = useState({});  
    const [items, setItems] = useState([]);  
    const [movements, setMovements] = useState([]);  
    const [selectedItem, setSelectedItem] = useState("");  
    const [selectedTalla, setSelectedTalla] = useState("");  
    const [cantidad, setCantidad] = useState(1);  
    const [observations, setObservations] = useState("");  
    const [generatePDF, setGeneratePDF] = useState(false);  
    const config = getConfig();  

    useEffect(() => {  
        const inv = getInventory();  
        setInventory(inv);  
        setItems(Object.keys(inv));  

        // Cargar movimientos pendientes  
        const pending = getPendingMovements('salidas');  
        setMovements(pending);  
        setObservations(pending.observations || "");  
    }, []);  

    const getTallasForItem = (item) => {  
        if (!item || !inventory[item]) return [];  
        return Object.keys(inventory[item].tallas);  
    };  

    const getAvailable = (item, talla) => {  
        return inventory[item]?.tallas[talla] || 0;  
    };  

    const addToMovements = (e) => {  
        e.preventDefault();  
        if (!selectedItem || !selectedTalla || cantidad <= 0) return;  
        const available = getAvailable(selectedItem, selectedTalla);  
        if (!allowNegatives && cantidad > available) {  
            alert("Cantidad excede stock disponible");  
            return;  
        }  
        const newMov = { item: selectedItem, talla: selectedTalla, cantidad };  
        const updatedMovements = [...movements, newMov];  
        setMovements(updatedMovements);  
        setPendingMovements(updatedMovements, 'salidas');  
        setSelectedItem("");  
        setSelectedTalla("");  
        setCantidad(1);  
    };  

    const removeMovement = (index) => {  
        const updatedMovements = movements.filter((_, i) => i !== index);  
        setMovements(updatedMovements);  
        setPendingMovements(updatedMovements, 'salidas');  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        if (movements.length === 0) return;  

        const newInv = { ...inventory };  
        movements.forEach(mov => {  
            newInv[mov.item].tallas[mov.talla] -= parseInt(mov.cantidad);  
        });  
        setInventory(newInv);  

        movements.forEach(mov => {  
            addToHistory({  
                id: Date.now().toString() + Math.random(),  
                date: new Date().toISOString(),  
                type: "salida",  
                item: mov.item,  
                talla: mov.talla,  
                cantidad: mov.cantidad,  
                user: "Usuario",  
                observations  
            });  
        });  

        if (generatePDF) {  
            generateMovementPDF(movements, config, "salida", observations);  
        }  

        // Limpiar pendientes  
        clearPendingMovements('salidas');  
        setMovements([]);  
        setObservations("");  
        setGeneratePDF(false);  
        alert("¡Salida procesada! PDF generado si lo seleccionaste.");  
    };  

    return (  
        <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>  
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dar Salida</h2>  
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">  
                <h3 className="text-lg font-semibold mb-4">Agregar Item</h3>  
                <form onSubmit={addToMovements} className="grid md:grid-cols-3 gap-4 mb-4">  
                    <select  
                        value={selectedItem}  
                        onChange={(e) => setSelectedItem(e.target.value)}  
                        className="p-3 border rounded-xl"  
                    >  
                        <option value="">Seleccionar Item</option>  
                        {items.map((item) => (  
                            <option key={item} value={item}>{item}</option>  
                        ))}  
                    </select>  
                    <select  
                        value={selectedTalla}  
                        onChange={(e) => setSelectedTalla(e.target.value)}  
                        className="p-3 border rounded-xl"  
                        disabled={!selectedItem}  
                    >  
                        <option value="">Seleccionar Talla</option>  
                        {getTallasForItem(selectedItem).map((talla) => (  
                            <option key={talla} value={talla}>{talla}</option>  
                        ))}  
                    </select>  
                    <div className="flex gap-2">  
                        <input  
                            type="number"  
                            value={cantidad}  
                            onChange={(e) => setCantidad(parseInt(e.target.value) || 0)}  
                            min="1"  
                            max={allowNegatives ? undefined : getAvailable(selectedItem, selectedTalla)}  
                            className="p-3 border rounded-xl flex-1"  
                            placeholder="Cantidad"  
                        />  
                        {selectedItem && selectedTalla && (  
                            <span className="p-3 bg-gray-100 rounded-xl">Stock: {getAvailable(selectedItem, selectedTalla)}</span>  
                        )}  
                    </div>  
                    <motion.button  
                        type="submit"  
                        className="md:col-span-3 flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold"  
                        whileHover={{ scale: 1.05 }}  
                    >  
                        <Minus className="w-5 h-5" />  
                        Agregar a Lista  
                    </motion.button>  
                </form>  
            </div>  

            {movements.length > 0 && (  
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">  
                    <h3 className="text-lg font-semibold mb-4">Lista de Salidas ({movements.length})</h3>  
                    <div className="space-y-2 mb-4">  
                        {movements.map((mov, index) => (  
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">  
                                <span>{mov.item} - {mov.talla}: {mov.cantidad} ({getAvailable(mov.item, mov.talla) - mov.cantidad} restante)</span>  
                                <motion.button  
                                    onClick={() => removeMovement(index)}  
                                    className="text-red-500 hover:text-red-700"  
                                    whileHover={{ scale: 1.1 }}  
                                >  
                                    <Trash2 className="w-4 h-4" />  
                                </motion.button>  
                            </div>  
                        ))}  
                    </div>  
                    <textarea  
                        value={observations}  
                        onChange={(e) => setObservations(e.target.value)}  
                        placeholder="Observaciones (opcional)"  
                        className="w-full p-3 border rounded-xl mb-4"  
                        rows={3}  
                    />  
                    <label className="flex items-center gap-2 mb-4">  
                        <input  
                            type="checkbox"  
                            checked={generatePDF}  
                            onChange={(e) => setGeneratePDF(e.target.checked)}  
                            className="w-5 h-5"  
                        />  
                        ¿Generar PDF del movimiento?  
                    </label>  
                    <motion.button  
                        onClick={handleSubmit}  
                        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold"  
                        whileHover={{ scale: 1.05 }}  
                    >  
                        <Check className="w-5 h-5" />  
                        Confirmar Salida  
                    </motion.button>  
                </div>  
            )}  
        </motion.div>  
    );  
};  

export default Salida;