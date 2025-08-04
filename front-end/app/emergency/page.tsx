"use client"

import { motion } from "framer-motion"
import { Phone, MapPin, AlertTriangle, Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModernHeader } from "@/components/modern-header"
import Link from "next/link"

export default function EmergencyPage() {
  const emergencyContacts = [
    {
      name: "Emergency Services",
      number: "911",
      description: "Immediate medical emergency",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Thalassemia Foundation",
      number: "1-800-THAL-123",
      description: "24/7 Thalassemia support hotline",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Your Hematologist",
      number: "Contact your doctor",
      description: "Your primary care specialist",
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <ModernHeader />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <Card className="border-red-200">
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6" />
                <CardTitle className="text-xl">Emergency Support</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="text-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart className="w-16 h-16 text-red-500 fill-current mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Need Immediate Help?</h2>
                <p className="text-gray-600">
                  If you're experiencing a medical emergency, please contact emergency services immediately.
                </p>
              </div>

              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <motion.div
                    key={contact.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-lg">{contact.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                            <p className="text-lg font-mono text-gray-800">{contact.number}</p>
                          </div>
                          <Button
                            className={`bg-gradient-to-r ${contact.color} hover:opacity-90 text-white ml-4`}
                            onClick={() => window.open(`tel:${contact.number}`)}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-red-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800 mb-2">Find Nearby Hospitals</h4>
                    <p className="text-sm text-red-600 mb-3">
                      Use your phone's map app to find the nearest hospital with Thalassemia treatment capabilities.
                    </p>
                    <Button
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                      onClick={() => window.open("https://maps.google.com/search/hospitals+near+me")}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Find Hospitals
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
