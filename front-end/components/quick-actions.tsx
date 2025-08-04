"use client"

import { motion } from "framer-motion"
import { Heart, Pill, Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuickActionsProps {
  onAction: (message: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    {
      icon: Heart,
      label: "Health Check",
      message: "How can I monitor my Thalassemia symptoms today?",
    },
    {
      icon: Pill,
      label: "Medication",
      message: "Tell me about my medication schedule and reminders",
    },
    {
      icon: Calendar,
      label: "Appointments",
      message: "Help me manage my medical appointments",
    },
    {
      icon: Phone,
      label: "Emergency",
      message: "I need emergency assistance for Thalassemia",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap gap-2 mb-4"
    >
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction(action.message)}
            className="flex items-center space-x-2 text-xs bg-white/50 dark:bg-gray-700/50 border-red-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-500"
          >
            <action.icon className="w-3 h-3" />
            <span>{action.label}</span>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
