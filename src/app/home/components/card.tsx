import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CardSkeleton } from './cardSkeleton';

export interface CardProps {
  imagePath: string;
  placeholderPath?: string;
  title: string;
  informationText?: string | React.ReactNode;
  loading?: boolean;
  disableAnim?: boolean;
}

export function Card({
  imagePath,
  placeholderPath,
  title,
  informationText,
  loading = false,
  disableAnim = false,
}: CardProps) {
  const [hovering, setHovering] = useState(false);

  // Variante sem animação (modo skeleton)
  if (disableAnim) {
    const imgSrc = loading && placeholderPath ? placeholderPath : imagePath;
    return (
      <div className="mx-auto rounded-lg shadow-md overflow-hidden flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md">
        {/* Mostra placeholder durante loading ou imagePath após */}
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-48 object-cover bg-gray-50"
        />
        <div className="p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          {loading ? <CardSkeleton /> : <div className="text-white">{informationText}</div>}
          <p className="text-white mt-2">
            Sejam Bem Vindos ao <span className="text-[#FF5252] font-bold">VavaHelper</span>!
          </p>
        </div>
      </div>
    );
  }

  // Variante animada (após skeleton)
  const displayImage = loading && placeholderPath ? placeholderPath : imagePath;
  return (
    <motion.div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="mx-auto flex items-center transition-all duration-300 cursor-pointer"
      style={{ overflow: 'hidden', height: '350px', paddingLeft:"50px" }}
    >
      {/* Imagem e título */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="relative flex justify-center items-center h-full w-[230px]"
      >
        <img
          src={displayImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover bg-gray-50"
          style={{
            filter: hovering ? 'none' : 'grayscale(100%) brightness(0.7)',
            transition: 'filter 0.3s ease-in-out',
          }}
        />
        <p
          className="text-6xl font-['Jersey_10'] z-10"
          style={{
            transition: 'color 0.2s ease-in-out',
            color: hovering ? 'white' : '#FF5252',
          }}
        >
          {title}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {hovering && (
          <motion.div
            key="sidepanel"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="h-full w-[250px] bg-[#2F2F2F] rounded-r shadow-lg p-4 flex flex-col justify-center"
          >
            <motion.div
              key="panel-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03, duration: 0.2 }}
            >
              {loading ? <CardSkeleton /> : <p className="text-white text-sm">{informationText}</p>}
              <br />
              <p className="text-white text-sm">
                Sejam Bem Vindos ao <span className="text-[#FF5252] font-bold">VavaHelper</span>!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}