import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center"
    >
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-slate-700 dark:text-slate-400 mb-4">
        {message}
      </p>
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg
                   hover:bg-red-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};