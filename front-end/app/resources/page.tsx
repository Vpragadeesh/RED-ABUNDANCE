"use client"

import { motion } from "framer-motion"
import { BookOpen, FileText, Video, Download, ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModernHeader } from "@/components/modern-header"
import Link from "next/link"

export default function ResourcesPage() {
  const resources = [
    {
      title: "Understanding Thalassemia",
      description: "Comprehensive guide to Thalassemia types, symptoms, and management",
      type: "PDF Guide",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Nutrition Guidelines",
      description: "Dietary recommendations and meal planning for Thalassemia patients",
      type: "Interactive Guide",
      icon: BookOpen,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Exercise & Wellness",
      description: "Safe exercise routines and wellness tips for better health",
      type: "Video Series",
      icon: Video,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Medication Management",
      description: "Complete guide to Thalassemia medications and schedules",
      type: "Downloadable",
      icon: Download,
      color: "from-red-500 to-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <ModernHeader />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">Educational Resources</h1>
            <p className="text-xl text-gray-600">
              Comprehensive information and tools to help you manage Thalassemia effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border-red-100 bg-white/70 backdrop-blur-sm h-full">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${resource.color} flex items-center justify-center mb-4`}
                    >
                      <resource.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-800">{resource.title}</CardTitle>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit">
                      {resource.type}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-red-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Personalized Guidance?</h2>
            <p className="text-gray-600 mb-6">
              Our AI assistant can provide personalized recommendations based on your specific needs and questions.
            </p>
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              >
                Chat with AI Assistant
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
