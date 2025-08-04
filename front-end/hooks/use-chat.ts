"use client"

import { useState, useCallback } from "react"
import type { Message } from "@/types/chat"

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addMessage = useCallback(async (content: string, role: "user" | "assistant") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])

    if (role === "user") {
      setIsLoading(true)
      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isLoading,
    addMessage,
    clearMessages,
  }
}
