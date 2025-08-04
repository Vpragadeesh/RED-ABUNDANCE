"use client"

import { motion } from "framer-motion"
import { Heart, MessageCircle, Phone, BookOpen, Users, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ModernHeader } from "@/components/modern-header"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Support",
      description: "Get personalized Thalassemia guidance",
      href: "/chat",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Phone,
      title: "Emergency Help",
      description: "Quick access to emergency services",
      href: "/emergency",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "Learn about Thalassemia management",
      href: "/resources",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with other patients",
      href: "/community",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Settings,
      title: "Health Tracking",
      description: "Monitor your health metrics",
      href: "/tracking",
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23b30000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <ModernHeader />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative mb-8">
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
              <Heart className="w-20 h-20 text-red-500 fill-current mx-auto" />
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
              <Heart className="w-20 h-20 text-red-300 fill-current" />
            </motion.div>
          </div>

          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              RED‑ABUNDANCE
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Your comprehensive AI-powered Thalassemia support platform with voice-enabled assistance
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Get personalized support, track your health, access educational resources, and connect with a community of
            patients and healthcare professionals.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={feature.href}>
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border-red-100 bg-white/70 backdrop-blur-sm h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 flex-grow">{feature.description}</p>
                    <Button className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Start Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-red-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Begin your journey with our AI-powered chat assistant for immediate Thalassemia support
          </p>
          <Link href="/chat">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chatting Now
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
