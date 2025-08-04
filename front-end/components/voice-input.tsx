"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Send, Loader2, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { VoiceVisualizer } from "@/components/voice-visualizer"
import { QuickActions } from "@/components/quick-actions"
import { useToast } from "@/hooks/use-toast"

interface VoiceInputProps {
  onSendMessage: (message: string) => void
}

export function VoiceInput({ onSendMessage }: VoiceInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const { toast } = useToast()

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)

    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        await sendAudioToBackend(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)

      // Simulate audio level for visualization
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 0.8 + 0.2)
      }, 100)

      // Stop after 10 seconds max
      setTimeout(() => {
        if (isRecording) {
          stopRecording()
        }
        clearInterval(interval)
      }, 10000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      toast({
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsProcessing(true)
      setAudioLevel(0)
    }
  }

  const sendAudioToBackend = async (audioBlob: Blob) => {
    try {
      const formData = new FormData()
      formData.append("audio", audioBlob, "recording.wav")

      const response = await fetch("http://0.0.0.0:8000/s2t", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        const transcribedText = data.text || data.transcript || ""

        if (transcribedText.trim()) {
          setMessage(transcribedText)
          // Optionally auto-send the transcribed message
          onSendMessage(transcribedText)
          toast({
            title: "Voice Recognized",
            description: "Your voice has been converted to text successfully!",
          })
        } else {
          toast({
            title: "No Speech Detected",
            description: "Please try speaking more clearly.",
            variant: "destructive",
          })
        }
      } else {
        throw new Error("Failed to transcribe audio")
      }
    } catch (error) {
      console.error("Error sending audio to backend:", error)
      toast({
        title: "Transcription Error",
        description: "Failed to convert speech to text. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleTextToSpeech = async (text: string) => {
    try {
      const response = await fetch("http://0.0.0.0:8000/t2s", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        audio.play()
      } else {
        // Fallback to browser TTS
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(text)
          utterance.rate = 0.9
          utterance.pitch = 1
          speechSynthesis.speak(utterance)
        }
      }
    } catch (error) {
      console.error("Error with text-to-speech:", error)
      // Fallback to browser TTS
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.9
        utterance.pitch = 1
        speechSynthesis.speak(utterance)
      }
    }
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl border border-red-100 shadow-xl p-4"
    >
      {/* Quick Actions */}
      <QuickActions onAction={onSendMessage} />

      {/* Voice Visualizer */}
      <AnimatePresence>
        {(isRecording || isProcessing) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <VoiceVisualizer isListening={isRecording} isProcessing={isProcessing} audioLevel={audioLevel} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="flex items-end space-x-3">
        {/* Voice Recording Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            className={`p-3 rounded-full transition-colors ${
              isRecording
                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200 voice-pulse"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>
        </motion.div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message about Thalassemia support or use voice input..."
            className="min-h-[44px] max-h-[120px] resize-none border-0 bg-gray-50 focus:ring-2 focus:ring-red-500 rounded-xl pr-16"
            rows={1}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">{message.length}/500</div>
        </div>

        {/* Text-to-Speech Button */}
        {message.trim() && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => handleTextToSpeech(message)}
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* Send Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Voice Status */}
      <AnimatePresence>
        {(isRecording || isProcessing) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-3 text-center"
          >
            <p className="text-sm text-gray-600">
              {isProcessing ? "Converting speech to text..." : "Recording... Click to stop"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
