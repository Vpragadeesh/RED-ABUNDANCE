"use client"

import { forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageBubble } from "@/components/message-bubble"
import { TypingIndicator } from "@/components/typing-indicator"
import type { Message } from "@/types/chat"

interface ChatContainerProps {
  messages: Message[]
  isLoading: boolean
}

export const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(({ messages, isLoading }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 overflow-hidden mb-6"
    >
      <div
        ref={ref}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent hover:scrollbar-thumb-red-300 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500"
      >
        <div className="space-y-4 p-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                <MessageBubble message={message} />
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <TypingIndicator />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
})

ChatContainer.displayName = "ChatContainer"
