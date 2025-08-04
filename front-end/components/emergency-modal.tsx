"use client"

import { motion } from "framer-motion"
import { X, Phone, MapPin, AlertTriangle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EmergencyModalProps {
  onClose: () => void
}

export function EmergencyModal({ onClose }: EmergencyModalProps) {
  const emergencyContacts = [
    {
      name: "Emergency Services",
      number: "911",
      description: "Immediate medical emergency",
    },
    {
      name: "Thalassemia Foundation",
      number: "1-800-THAL-123",
      description: "24/7 Thalassemia support hotline",
    },
    {
      name: "Your Hematologist",
      number: "Contact your doctor",
      description: "Your primary care specialist",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <CardTitle>Emergency Support</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart className="w-12 h-12 text-red-500 fill-current mx-auto mb-2" />
                </motion.div>
                <p className="text-gray-600 dark:text-gray-300">
                  If you're experiencing a medical emergency, please contact emergency services immediately.
                </p>
              </div>

              {emergencyContacts.map((contact, index) => (
                <motion.div
                  key={contact.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">{contact.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{contact.description}</p>
                        </div>
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => window.open(`tel:${contact.number}`)}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800 dark:text-red-200">Find Nearby Hospitals</h4>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      Use your phone's map app to find the nearest hospital with Thalassemia treatment capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
