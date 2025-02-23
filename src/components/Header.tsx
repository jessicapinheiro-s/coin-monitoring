import { Menu } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openMenu = (event: any) => {
        event.preventDefault();
        setIsOpen((prev) => !prev);
    }
    return (
        <>
            <div className="w-full flex flex-row items-center justify-center border-b rounded-l-xl rounded-r-xl">
                <div className="w-[80%] flex flex-row items-center justify-end py-4">
                    <div className="rounded-3xl bg-yellow-300 w-10 h-10 p-2" >
                        <Menu onClick={(e) => openMenu(e)} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <motion.div
                    initial={{ x: "-100%" }}  // Inicia o menu fora da tela
                    animate={{ x: isOpen ? 0 : "-100%" }} // Anima para dentro ou fora da tela
                    exit={{ x: "-100%" }}  // Sai da tela
                    transition={{ type: "spring", stiffness: 300, damping: 30 }} // Controle da animação
                    className="bg-gray-800 text-white fixed top-0 left-0 h-full w-64 p-4 z-10"
                >
                    <h2 className="text-2xl mb-4">Menu</h2>
                    <ul>
                        <li className="py-4"><Link to="/All-Coins">All Coins</Link></li>
                        <li className="py-4"><Link to="/About">About</Link></li>
                    </ul>
                </motion.div>
            )}
        </>
    )
}
