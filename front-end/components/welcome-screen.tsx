"use client"

import { motion } from "framer-motion"
import { Heart, MessageCircle, Phone, BookOpen, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface WelcomeScreenProps {
  onQuickAction: (message: string) => void
}

export function WelcomeScreen({ onQuickAction }: WelcomeScreenProps) {
  const quickActions = [
    {
      icon: Heart,
      title: "Health Monitoring",
      description: "Track your health metrics",
      message: "Help me track my Thalassemia health metrics",
    },
    {
      icon: MessageCircle,
      title: "Ask Questions",
      description: "Get answers about Thalassemia",
      message: "I have questions about Thalassemia management",
    },
    {
      icon: Phone,
      title: "Emergency Support",
      description: "Get immediate help",
      message: "I need emergency support for Thalassemia",
    },
    {
      icon: BookOpen,
      title: "Learn More",
      description: "Educational resources",
      message: "Show me educational resources about Thalassemia",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col items-center justify-center p-8 text-center"
    >
      {/* Welcome Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative mb-6">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Heart className="w-16 h-16 text-red-500 fill-current mx-auto" />
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Heart className="w-16 h-16 text-red-300 fill-current" />
          </motion.div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome to RED‑ABUNDANCE</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Your AI-powered Thalassemia support companion</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Get personalized support, track your health, and access resources for managing Thalassemia with confidence.
        </p>
      </motion.div>

      {/* Quick Action Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-8"
      >
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-red-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              onClick={() => onQuickAction(action.message)}
            >
              <CardContent className="p-6 text-center">
                <action.icon className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center"
      >
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Start a conversation by typing below or using voice input
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <Users className="w-4 h-4" />
          <span>Trusted by thousands of Thalassemia patients worldwide</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
