import React, { useState, useEffect } from "react";  
import { motion } from "framer-motion";  
import { Download } from "lucide-react";  
import InventoryTable from "../components/InventoryTable";  
import { getInventory, generateInventoryPDF, getConfig } from "../utils/localStorage";  

const Inventory = () => {  
    const [inventory, setInventory] = useState({});  
    const config = getConfig();  

    useEffect(() => {  
        setInventory(getInventory());  
    }, []);  

    const handleExportPDF = () => {  
        generateInventoryPDF(inventory, config);  
    };  

    return (  
        <motion.div  
            className="p-8"  
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
        >  
            <div className="flex justify-between items-center mb-6">  
                <h2 className="text-3xl font-bold text-gray-800">Inventario</h2>  
                <motion.button  
                    onClick={handleExportPDF}  
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"  
                    whileHover={{ scale: 1.05 }}  
                >  
                    <Download className="w-4 h-4" />  
                    PDF  
                </motion.button>  
            </div>  
            <InventoryTable inventory={inventory} />  
        </motion.div>  
    );  
};  

export default Inventory;