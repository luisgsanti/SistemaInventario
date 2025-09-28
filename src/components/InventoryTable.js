import React from "react";  
import { motion } from "framer-motion";  

const InventoryTable = ({ inventory }) => {  
    if (!inventory || Object.keys(inventory).length === 0) {  
        return (  
            <motion.div  
                className="bg-white rounded-2xl shadow-lg p-8 text-center"  
                initial={{ opacity: 0 }}  
                animate={{ opacity: 1 }}  
            >  
                <p className="text-gray-500">Cargando inventario...</p>  
            </motion.div>  
        );  
    }  

    return (  
        <motion.div  
            className="space-y-4"  
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
        >  
            {Object.entries(inventory).map(([item, data]) => (  
                <motion.div  
                    key={item}  
                    className="bg-white rounded-2xl shadow-lg p-6"  
                    initial={{ y: 20, opacity: 0 }}  
                    animate={{ y: 0, opacity: 1 }}  
                    transition={{ delay: 0.1 }}  
                >  
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{item}</h3>  
                    <div className="flex flex-wrap gap-3">  
                        {Object.entries(data.tallas || {}).map(([talla, cantidad]) => (  
                            <span  
                                key={talla}  
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    cantidad === 0  
                                        ? "bg-red-100 text-red-700 border border-red-200"  
                                        : cantidad < 5  
                                        ? "bg-yellow-100 text-yellow-700 border border-yellow-200"  
                                        : "bg-green-100 text-green-700 border border-green-200"  
                                }`}  
                            >  
                                {talla}: {cantidad}  
                            </span>  
                        ))}  
                    </div>  
                    {Object.values(data.tallas || {}).reduce((a, b) => a + b, 0) === 0 && (  
                        <p className="text-red-500 mt-2 italic">¡Sin stock disponible!</p>  
                    )}  
                </motion.div>  
            ))}  
        </motion.div>  
    );  
};  

export default InventoryTable;