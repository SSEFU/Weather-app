import React from "react";
import { Cloud, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const WelcomeScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center py-24 px-4 sm:px-8"
    >
      {/* Animated Icon */}
      <motion.div
        animate={{
          rotate: [0, 8, -8, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-8"
      >
        <Cloud className="w-24 h-24 text-blue-500 drop-shadow-md mx-auto" />
      </motion.div>

      {/* Heading */}
      <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-4">
        Welcome to Weather Dashboard
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
        Check current conditions and 7-day forecasts for cities worldwide. Stay
        informed with interactive charts, dark mode, and more.
      </p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-base"
      >
        <MapPin className="w-5 h-5 animate-bounce" />
        <span>Start by searching a city or using your location</span>
      </motion.div>
    </motion.div>
  );
};
