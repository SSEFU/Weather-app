import React from 'react';
import { Cloud, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const WelcomeScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <motion.div
        className="mb-8"
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Cloud className="w-20 h-20 text-blue-400 mx-auto" />
      </motion.div>
      
      <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
        Weather Dashboard
      </h1>
      
      <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-md mx-auto">
        Get detailed weather information and forecasts for any city around the world.
      </p>
      
      <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">
          Search for a city or use your current location to get started
        </span>
      </div>
    </motion.div>
  );
};