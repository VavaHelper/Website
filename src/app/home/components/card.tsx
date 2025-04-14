"use client"

import { motion } from "motion/react";
import { useState } from "react";

export interface CardProps {
    imagePath: string;
    title: string;
    width?: string;
}

export function Card({ imagePath, title, width }: CardProps) {
    const [hovering, setHovering] = useState(false);

    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(255, 82, 82, 0.5)",
                border: "2px solid #FF5252",
            }}
            transition={{ duration: 0.2 }}
            className="flex justify-center items-center w-full h-[400px]"
            style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${imagePath})`,
                backgroundPosition: "center",
                width: width ? width : "100%",
                border: "2px solid rgba(0, 0, 0, 0)",
                cursor: "pointer",
            }}
            onHoverStart={() => setHovering(true)}
            onHoverEnd={() => setHovering(false)}
        >
            <p
                className="text-6xl text-[#FF5252] font-['Jersey_10']"
                style={{
                    transition: "color 0.2s ease-in-out",
                    color: hovering ? "#FF5252" : "white",
                }}
            >{title}</p>
        </motion.div>
    )
}