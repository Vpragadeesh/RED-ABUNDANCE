"use client"

import { motion } from "framer-motion"

interface VoiceVisualizerProps {
  isListening: boolean
  isProcessing: boolean
  audioLevel: number
}

export function VoiceVisualizer({ isListening, isProcessing, audioLevel }: VoiceVisualizerProps) {
  const bars = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="flex items-center justify-center space-x-1 h-16 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-4">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-1 bg-gradient-to-t from-red-400 to-red-600 rounded-full"
          animate={{
            height: isListening ? [4, Math.random() * 40 + 10, 4] : isProcessing ? [4, 20, 4] : 4,
            opacity: isListening || isProcessing ? [0.4, 1, 0.4] : 0.3,
          }}
          transition={{
            duration: isListening ? 0.5 + Math.random() * 0.5 : 1,
            repeat: isListening || isProcessing ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
            delay: bar * 0.05,
          }}
        />
      ))}
    </div>
  )
}
