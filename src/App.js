import React from "react";  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import { motion } from "framer-motion";  
import Sidebar from "./components/Sidebar";  
import Inventory from "./pages/Inventory";  
import Ingresar from "./pages/Ingresar";  
import Salida from "./pages/Salida";  
import Historial from "./pages/Historial";  
import Config from "./pages/Config";  
import { getConfig } from "./utils/localStorage";  

function App() {  
    const config = getConfig();  

    return (  
        <Router>  
            <div className="flex min-h-screen bg-gray-50">  
                <Sidebar />  
                <main className="ml-64 flex-1 p-4">  
                    <motion.div  
                        key={window.location.pathname}  
                        initial={{ opacity: 0, x: 20 }}  
                        animate={{ opacity: 1, x: 0 }}  
                        exit={{ opacity: 0, x: -20 }}  
                        transition={{ duration: 0.3 }}  
                    >  
                        <Routes>  
                            <Route path="/inventory" element={<Inventory />} />  
                            <Route path="/ingresar" element={<Ingresar />} />  
                            <Route path="/salida" element={<Salida />} />  
                            <Route path="/historial" element={<Historial />} />  
                            <Route path="/config" element={<Config />} />  
                            <Route path="/" element={<Inventory />} />  
                        </Routes>  
                    </motion.div>  
                </main>  
            </div>  
        </Router>  
    );  
}  

export default App;