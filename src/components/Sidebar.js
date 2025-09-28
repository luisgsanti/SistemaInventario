import React from "react";  
import { motion } from "framer-motion";  
import { LayoutDashboard, Package, Plus, Minus, Settings } from "lucide-react";  
import { useLocation, Link } from "react-router-dom";  

const Sidebar = () => {  
    const location = useLocation();  
    const menuItems = [  
        { path: "/inventory", icon: Package, label: "Inventario" },  
        { path: "/ingresar", icon: Plus, label: "Ingresar Items" },  
        { path: "/salida", icon: Minus, label: "Dar Salida" },  
        { path: "/historial", icon: LayoutDashboard, label: "Historial" },  
        { path: "/config", icon: Settings, label: "Configuración" }  
    ];  

    return (  
        <motion.div  
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50"  
            initial={{ x: -300 }}  
            animate={{ x: 0 }}  
            transition={{ duration: 0.5 }}  
        >  
            <div className="p-6">  
                <h1 className="text-2xl font-bold text-gray-800">DotaciónPro</h1>  
            </div>  
            <nav className="p-4">  
                {menuItems.map((item, index) => (  
                    <motion.div  
                        key={item.path}  
                        initial={{ opacity: 0, y: 20 }}  
                        animate={{ opacity: 1, y: 0 }}  
                        transition={{ delay: index * 0.1 }}  
                    >  
                        <Link  
                            to={item.path}  
                            className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 w-full ${  
                                location.pathname === item.path  
                                    ? "bg-blue-500 text-white"  
                                    : "text-gray-600 hover:bg-gray-100"  
                            }`}  
                        >  
                            <item.icon className="w-5 h-5" />  
                            <span>{item.label}</span>  
                        </Link>  
                    </motion.div>  
                ))}  
            </nav>  
        </motion.div>  
    );  
};  

export default Sidebar;