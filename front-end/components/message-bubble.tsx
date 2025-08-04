"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Volume2, ThumbsUp, ThumbsDown, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { Message } from "@/types/chat"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false)
  const { toast } = useToast()

  const isUser = message.role === "user"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    toast({
      title: "Copied to clipboard",
      description: "Message copied successfully",
    })
  }

  const handleSpeak = async () => {
    try {
      // Try backend TTS first
      const response = await fetch("http://0.0.0.0:8000/t2s", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message.content }),
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        audio.play()
      } else {
        throw new Error("Backend TTS failed")
      }
    } catch (error) {
      // Fallback to browser TTS
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(message.content)
        utterance.rate = 0.9
        utterance.pitch = 1
        speechSynthesis.speak(utterance)
      }
    }
  }

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
      whileHover={{ scale: 1.01 }}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
              : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600"
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </motion.div>

        {/* Message Content */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`relative px-4 py-3 rounded-2xl shadow-sm ${
              isUser
                ? "bg-gradient-to-br from-red-500 to-red-600 text-white rounded-br-md"
                : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>

            {/* Glassmorphism effect for user messages */}
            {isUser && (
              <div className="absolute inset-0 bg-white/10 rounded-2xl rounded-br-md backdrop-blur-sm pointer-events-none" />
            )}
          </motion.div>

          {/* Timestamp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showActions ? 1 : 0.6 }}
            className={`text-xs text-gray-500 mt-1 ${isUser ? "text-right" : "text-left"}`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showActions ? 1 : 0, y: showActions ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center space-x-1 mt-2 ${isUser ? "justify-end" : "justify-start"}`}
          >
            <Button variant="ghost" size="sm" onClick={handleCopy} className="h-6 px-2 text-xs hover:bg-gray-100">
              <Copy className="w-3 h-3" />
            </Button>

            {!isUser && (
              <>
                <Button variant="ghost" size="sm" onClick={handleSpeak} className="h-6 px-2 text-xs hover:bg-gray-100">
                  <Volume2 className="w-3 h-3" />
                </Button>

                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-gray-100">
                  <ThumbsUp className="w-3 h-3" />
                </Button>

                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-gray-100">
                  <ThumbsDown className="w-3 h-3" />
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
