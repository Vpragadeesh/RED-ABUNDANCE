"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Menu, X, Settings, AlertTriangle, Moon, Sun, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ModernHeaderProps {
  onEmergencyClick?: () => void
  onSettingsClick?: () => void
  isDarkMode?: boolean
  onThemeToggle?: () => void
}

export function ModernHeader({ onEmergencyClick, onSettingsClick, isDarkMode, onThemeToggle }: ModernHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/"

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-red-100"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/">
            <motion.div className="flex items-center space-x-3 cursor-pointer" whileHover={{ scale: 1.02 }}>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="relative"
              >
                <Heart className="w-8 h-8 text-red-600 fill-current" />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 w-8 h-8 text-red-400 fill-current"
                >
                  <Heart className="w-8 h-8" />
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  RED‑ABUNDANCE
                </h1>
                <p className="text-xs text-gray-600">Thalassemia Support Platform</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isHomePage && (
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            )}

            {onThemeToggle && (
              <Button variant="ghost" size="sm" onClick={onThemeToggle} className="text-gray-600 hover:text-red-600">
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            )}

            {onSettingsClick && (
              <Button variant="ghost" size="sm" onClick={onSettingsClick} className="text-gray-600 hover:text-red-600">
                <Settings className="w-4 h-4" />
              </Button>
            )}

            {onEmergencyClick ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={onEmergencyClick}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency
                </Button>
              </motion.div>
            ) : (
              <Link href="/emergency">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Emergency
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-red-100 py-4"
          >
            <div className="flex flex-col space-y-3">
              {!isHomePage && (
                <Link href="/">
                  <Button variant="ghost" className="justify-start text-gray-600 hover:text-red-600 w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
              )}

              {onThemeToggle && (
                <Button
                  variant="ghost"
                  onClick={onThemeToggle}
                  className="justify-start text-gray-600 hover:text-red-600"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Button>
              )}

              {onSettingsClick && (
                <Button
                  variant="ghost"
                  onClick={onSettingsClick}
                  className="justify-start text-gray-600 hover:text-red-600"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              )}

              {onEmergencyClick ? (
                <Button
                  onClick={onEmergencyClick}
                  className="justify-start bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency Help
                </Button>
              ) : (
                <Link href="/emergency">
                  <Button className="justify-start bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white w-full">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Emergency Help
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
