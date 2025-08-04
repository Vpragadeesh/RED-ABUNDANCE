"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ModernHeader } from "@/components/modern-header"
import { ChatContainer } from "@/components/chat-container"
import { VoiceInput } from "@/components/voice-input"
import { WelcomeScreen } from "@/components/welcome-screen"
import { EmergencyModal } from "@/components/emergency-modal"
import { SettingsModal } from "@/components/settings-modal"
import { useChat } from "@/hooks/use-chat"
import { Toaster } from "@/components/ui/toaster"

export default function ChatPage() {
  const [showEmergency, setShowEmergency] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const { messages, addMessage, isLoading } = useChat()
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message immediately
    await addMessage(message, "user")

    try {
      // Send message to backend
      const response = await fetch("http://0.0.0.0:8000/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      })

      if (response.ok) {
        const data = await response.json()
        await addMessage(data.response || "I'm here to help with your Thalassemia questions.", "assistant")
      } else {
        await addMessage("I'm sorry, I'm having trouble connecting right now. Please try again.", "assistant")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      await addMessage("I'm here to help with your Thalassemia questions. How can I assist you today?", "assistant")
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-red-50 via-white to-red-50"
      }`}
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23b30000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <ModernHeader
        onEmergencyClick={() => setShowEmergency(true)}
        onSettingsClick={() => setShowSettings(true)}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-[calc(100vh-8rem)] flex flex-col"
        >
          {messages.length === 0 ? (
            <WelcomeScreen onQuickAction={handleSendMessage} />
          ) : (
            <ChatContainer ref={chatContainerRef} messages={messages} isLoading={isLoading} />
          )}

          <VoiceInput onSendMessage={handleSendMessage} />
        </motion.div>
      </main>

      <AnimatePresence>
        {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} />}
        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            isDarkMode={isDarkMode}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          />
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  )
}
