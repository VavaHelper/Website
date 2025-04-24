"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export interface CardProps {
    imagePath: string;
    title: string;
    information: string;
    informationText: string;
    width?: string;
}

export function Card({ imagePath, title, width, information, informationText}: CardProps) {
    const [hovering, setHovering] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="flex items-center transition-all duration-300"
            animate={{ width: hovering ? 550 : 300 }}
            style={{
                overflow: "hidden",
                height: "400px",
                border: "2px solid rgba(0, 0, 0, 0)",
                cursor: "pointer",
            }}
        >
            {/* Card principal */}
            <motion.div
                whileHover={{
                    scale: 1.05
                }}
                transition={{ duration: 0.2 }}
                className="flex justify-center items-center h-full"
                style={{
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${imagePath})`,
                    backgroundPosition: "center",
                    width: "300px",
                }}
            >
                <p
                    className="text-6xl text-[#FF5252] font-['Jersey_10']"
                    style={{
                        transition: "color 0.2s ease-in-out",
                        color: hovering ? "#FF5252" : "white",
                    }}
                >
                    {title}
                </p>
            </motion.div>

            {/* Painel lateral animado */}
            <AnimatePresence>
                {hovering && (
                    <motion.div
                        key="sidepanel"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full w-[250px] bg-[#2F2F2F] rounded-r shadow-lg p-4 flex flex-col justify-center"
                    >
                        <AnimatePresence>
                            <motion.div
                                key="panel-content"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                            >
                                <h2 className="text-sm font-bold text-[#FF5252] mb-2">
                                    {information}
                                </h2>
                                <p className="text-[#FFF] text-sm">
                                    {informationText}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}