import React, { useState, useEffect } from "react";  
import { motion } from "framer-motion";  
import { Settings, Lock, Upload, RefreshCw, Check } from "lucide-react";  
import { getConfig, setConfig, resetInventory, setAllowNegatives, handleLogoUpload, getAllowNegatives } from "../utils/localStorage";  

const Config = () => {  
    const [password, setPassword] = useState("");  
    const [config, setLocalConfig] = useState({ title: "", logo: "", pwd: "" });  
    const [showPasswordInput, setShowPasswordInput] = useState(true);  
    const [allowNegatives, setLocalAllowNegatives] = useState(false);  

    useEffect(() => {  
        const conf = getConfig();  
        setLocalConfig(conf);  
        const negatives = getAllowNegatives();  
        setLocalAllowNegatives(negatives);  
        if (conf.password) {  
            setShowPasswordInput(true);  
        } else {  
            setShowPasswordInput(false);  
        }  
    }, []);  

    const handlePasswordCheck = () => {  
        if (password === config.pwd) {  
            setShowPasswordInput(false);  
        } else {  
            alert("Contraseña incorrecta");  
        }  
    };  

    const handleSave = () => {  
        const newConfig = { ...config, pwd: config.pwd };  
        setConfig(newConfig);  
        setAllowNegatives(allowNegatives);  
        setLocalAllowNegatives(allowNegatives);  
        alert("Configuración guardada");  
    };  

    const handleReset = () => {  
        if (window.confirm("¿Seguro? Esto borrará todo el stock a cero.")) {  
            resetInventory();  
            alert("Inventario reseteado");  
        }  
    };  

    if (showPasswordInput && config.password) {  
        return (  
            <motion.div className="p-8 flex items-center justify-center h-96" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>  
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center">  
                    <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />  
                    <h2 className="text-xl font-bold mb-4">Acceso Restringido</h2>  
                    <input  
                        type="password"  
                        value={password}  
                        onChange={(e) => setPassword(e.target.value)}  
                        placeholder="Ingresa la contraseña"  
                        className="p-3 border rounded-xl w-full mb-4"  
                    />  
                    <motion.button  
                        onClick={handlePasswordCheck}  
                        className="px-6 py-3 bg-blue-500 text-white rounded-xl"  
                        whileHover={{ scale: 1.05 }}  
                    >  
                        Entrar  
                    </motion.button>  
                </div>  
            </motion.div>  
        );  
    }  

    return (  
        <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>  
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Configuración</h2>  
            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">  
                <div>  
                    <label className="block text-sm font-medium mb-2">Título de la empresa</label>  
                    <input  
                        type="text"  
                        value={config.title}  
                        onChange={(e) => setLocalConfig({ ...config, title: e.target.value })}  
                        className="p-3 border rounded-xl w-full"  
                    />  
                </div>  
                <div>  
                    <label className="block text-sm font-medium mb-2">Subir Logo (PNG/JPG)</label>  
                    <div className="flex items-center gap-4">  
                        <input  
                            type="file"  
                            accept="image/png,image/jpeg"  
                            onChange={(e) => handleLogoUpload(e, (newLogo) => setLocalConfig({ ...config, logo: newLogo }))}  
                            className="p-3 border rounded-xl"  
                        />  
                        {config.logo && <Check className="w-5 h-5 text-green-500" />}  
                    </div>  
                    {config.logo && (  
                        <img src={config.logo} alt="Logo" className="w-16 h-16 mt-2 rounded" />  
                    )}  
                </div>  
                <div className="flex items-center gap-4">  
                    <label className="text-sm font-medium">Permitir cantidades negativas:</label>  
                    <input  
                        type="checkbox"  
                        checked={allowNegatives}  
                        onChange={(e) => setLocalAllowNegatives(e.target.checked)}  
                        className="w-5 h-5"  
                    />  
                </div>  
                <div>  
                    <label className="block text-sm font-medium mb-2">Contraseña para config (opcional)</label>  
                    <input  
                        type="password"  
                        value={config.pwd}  
                        onChange={(e) => setLocalConfig({ ...config, pwd: e.target.value })}  
                        className="p-3 border rounded-xl w-full"  
                    />  
                </div>  
                <motion.button  
                    onClick={handleSave}  
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold mr-4"  
                    whileHover={{ scale: 1.05 }}  
                >  
                    <Settings className="w-5 h-5" />  
                    Guardar  
                </motion.button>  
                <motion.button  
                    onClick={handleReset}  
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold"  
                    whileHover={{ scale: 1.05 }}  
                >  
                    <RefreshCw className="w-5 h-5" />  
                    Reiniciar Inventario  
                </motion.button>  
            </div>  
        </motion.div>  
    );  
};  

export default Config;