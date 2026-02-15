'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Heart, Shield, Smartphone, Watch, Sparkles, MessageCircle, Lock, Timer, Users, ChevronDown, Play, Pause, Settings, Volume2, Activity, Zap, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'

// Floating Hearts Background Component
const FloatingHearts = () => {
  const hearts = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 15 + Math.random() * 10,
    size: 16 + Math.random() * 24,
    opacity: 0.2 + Math.random() * 0.4
  })), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity
          }}
        >
          💕
        </div>
      ))}
    </div>
  )
}

// Heart Rate ECG Data Generator
const generateECGData = () => {
  const data: { time: number; value: number }[] = []
  for (let i = 0; i < 50; i++) {
    let value = 0
    const phase = i % 10
    if (phase === 0) value = 0
    else if (phase === 2) value = 0.2
    else if (phase === 3) value = 1
    else if (phase === 4) value = -0.3
    else if (phase === 5) value = 0.5
    else if (phase === 6) value = 0.1
    else value = 0

    data.push({
      time: i,
      value: value + (Math.random() * 0.1 - 0.05)
    })
  }
  return data
}

// Voice Analysis Data Generator
const generateVoiceData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    pitch: 150 + Math.sin(i * 0.5) * 30 + Math.random() * 20,
    tone: 0.5 + Math.sin(i * 0.3) * 0.3 + Math.random() * 0.1,
    rate: 120 + Math.cos(i * 0.4) * 20 + Math.random() * 10
  }))
}

// Emotion Types
interface Emotion {
  name: string
  emoji: string
  color: string
  description: string
}

const emotions: Emotion[] = [
  { name: "Hidden Excitement", emoji: "💕", color: "#FF6B9D", description: "A subtle joy waiting to be shared" },
  { name: "Unspoken Affection", emoji: "💗", color: "#FF8FB1", description: "Warm feelings beneath the surface" },
  { name: "Suppressed Anxiety", emoji: "💭", color: "#E8B4B8", description: "Nervous energy seeking release" },
  { name: "Quiet Vulnerability", emoji: "🌸", color: "#FFA07A", description: "Openness waiting to emerge" },
  { name: "Tender Longing", emoji: "🌹", color: "#8B2252", description: "A deep yearning in your heart" },
]

// Prompt Categories
interface Prompt {
  text: string
  category: string
}

const romanticPrompts: Prompt[] = [
  { text: "Your heart just skipped—want to tell them what's making it race? 💓", category: "deep" },
  { text: "I sense something beautiful you're holding back… whisper it now? 😊", category: "playful" },
  { text: "The air feels heavier… ready to lighten it with what's really on your mind? 🌹", category: "romantic" },
  { text: "Your pulse suggests excitement… care to share the reason? ✨", category: "deep" },
  { text: "Words unsaid carry the most weight… shall we lift one together? 💫", category: "romantic" },
  { text: "I detect a flutter in your heart… is there something sweet you'd like to confess? 💌", category: "playful" },
  { text: "Silence can be a canvas… what emotion would you paint? 🎨", category: "deep" },
  { text: "Your heartbeat tells a story… want to read me a chapter? 📖", category: "romantic" },
]

// Connection Modes
interface ConnectionMode {
  id: string
  name: string
  emoji: string
  description: string
  features: string[]
}

const connectionModes: ConnectionMode[] = [
  {
    id: "date-night",
    name: "Date Night Mode",
    emoji: "💑",
    description: "Syncs during dinners/walks, suggests vulnerability prompts",
    features: ["Ambient emotion sensing", "Subtle haptic feedback", "Perfect moment detection"]
  },
  {
    id: "long-distance",
    name: "Long-Distance Mode",
    emoji: "💫",
    description: "Shares anonymized 'emotion pulses' across distance",
    features: ["Synced heartbeats", "Emotion matching", "Virtual presence feel"]
  },
  {
    id: "friendship",
    name: "Friendship Edition",
    emoji: "🤝",
    description: "Supportive, non-romantic prompts",
    features: ["Empathy boosters", "Support detection", "Care moment suggestions"]
  },
  {
    id: "reflection",
    name: "Post-Conversation Reflection",
    emoji: "📝",
    description: "Private journal of emotions",
    features: ["Emotion timeline", "Private insights", "Growth tracking"]
  }
]

// Main Page Component
export default function Home() {
  // State management
  const [heartRate, setHeartRate] = useState(72)
  const [ecgData, setEcgData] = useState(generateECGData())
  const [voiceData, setVoiceData] = useState(generateVoiceData())
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(emotions[0])
  const [detectionAccuracy, setDetectionAccuracy] = useState(87)
  const [currentPrompt, setCurrentPrompt] = useState<Prompt>(romanticPrompts[0])
  const [promptCategory, setPromptCategory] = useState('all')
  const [selectedMode, setSelectedMode] = useState<string>('date-night')
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [mutualConsent, setMutualConsent] = useState(false)
  const [isPaired, setIsPaired] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptStyle, setPromptStyle] = useState<'gentle' | 'bold' | 'poetic'>('gentle')

  // Simulate real-time heart rate
  useEffect(() => {
    if (!isSessionActive) return
    
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const change = Math.random() * 10 - 5
        const newRate = Math.max(60, Math.min(120, prev + change))
        return Math.round(newRate)
      })
      setEcgData(generateECGData())
      setVoiceData(generateVoiceData())
      
      // Randomly change emotion
      if (Math.random() > 0.7) {
        setCurrentEmotion(emotions[Math.floor(Math.random() * emotions.length)])
        setDetectionAccuracy(80 + Math.floor(Math.random() * 15))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isSessionActive])

  // Session timer
  useEffect(() => {
    if (!isSessionActive) return
    
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isSessionActive])

  // Show prompts periodically
  useEffect(() => {
    if (!isSessionActive) return
    
    const interval = setInterval(() => {
      const filteredPrompts = promptCategory === 'all' 
        ? romanticPrompts 
        : romanticPrompts.filter(p => p.category === promptCategory)
      setCurrentPrompt(filteredPrompts[Math.floor(Math.random() * filteredPrompts.length)])
      setShowPrompt(true)
      setTimeout(() => setShowPrompt(false), 5000)
    }, 8000)

    return () => clearInterval(interval)
  }, [isSessionActive, promptCategory])

  // Pairing simulation
  const handlePairing = useCallback(() => {
    setIsPaired(false)
    setTimeout(() => setIsPaired(true), 2000)
  }, [])

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Filter prompts by category
  const filteredPrompts = useMemo(() => {
    if (promptCategory === 'all') return romanticPrompts
    return romanticPrompts.filter(p => p.category === promptCategory)
  }, [promptCategory])

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <FloatingHearts />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#FFF8F0] via-[#FCE4EC] to-[#FF8FB1]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMy4zMTQgMC02IDMuNjg2LTYgNiAwIDMuMzEzIDMuNjg2IDYgNiA2czYtMi42ODcgNi02YzAtMy4zMTQtMi42ODYtNi02LTZ6IiBmaWxsPSIjRkY2QjlEIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB1] shadow-lg animate-heartbeat">
              <Heart className="w-12 h-12 text-white fill-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#8B2252] via-[#FF6B9D] to-[#FF8FB1] bg-clip-text text-transparent"
          >
            HeartWhisper
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-[#8B2252] mb-4 font-medium"
          >
            Bridging Silent Emotions
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg text-[#4A2C40]/70 mb-12 max-w-2xl mx-auto"
          >
            A privacy-first, real-time system that gently uncovers and helps express 
            unspoken emotions hiding beneath everyday conversations.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB1] hover:from-[#FF8FB1] hover:to-[#FF6B9D] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#FF6B9D] text-[#FF6B9D] hover:bg-[#FF6B9D]/10 px-8 py-6 text-lg rounded-full"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 h-5 w-5" />
              Try Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-[#FF6B9D] animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Emotion Detection Dashboard */}
      <section id="dashboard" className="py-20 px-4 bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#8B2252] mb-4">
              Emotion Detection Dashboard
            </h2>
            <p className="text-lg text-[#4A2C40]/70 max-w-2xl mx-auto">
              Real-time emotional insights powered by advanced AI analysis
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Heart Rate Monitor */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="glass-card border-[#FF6B9D]/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#8B2252]">
                    <Heart className="w-5 h-5 text-[#FF6B9D] animate-heartbeat" />
                    Heart Rate Monitor
                  </CardTitle>
                  <CardDescription>Real-time cardiac rhythm analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <span className="text-5xl font-bold text-[#FF6B9D]">{heartRate}</span>
                    <span className="text-lg text-[#8B2252] ml-2">BPM</span>
                  </div>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ecgData}>
                        <defs>
                          <linearGradient id="ecgGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF6B9D" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#FF6B9D" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="value" stroke="#FF6B9D" strokeWidth={2} fill="url(#ecgGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between text-sm text-[#4A2C40]/60 mt-2">
                    <span>Min: 60</span>
                    <span>Max: 120</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Voice Analysis Panel */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="glass-card border-[#FF8FB1]/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#8B2252]">
                    <Volume2 className="w-5 h-5 text-[#FF8FB1]" />
                    Voice Analysis
                  </CardTitle>
                  <CardDescription>Vocal characteristics breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={voiceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E8B4B8" />
                        <XAxis dataKey="time" hide />
                        <YAxis hide />
                        <Tooltip />
                        <Line type="monotone" dataKey="pitch" stroke="#FF8FB1" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-[#FCE4EC] rounded-lg p-2">
                      <div className="text-lg font-bold text-[#FF6B9D]">~165</div>
                      <div className="text-xs text-[#8B2252]">Hz Pitch</div>
                    </div>
                    <div className="bg-[#FCE4EC] rounded-lg p-2">
                      <div className="text-lg font-bold text-[#FF8FB1]">0.6</div>
                      <div className="text-xs text-[#8B2252]">Tone</div>
                    </div>
                    <div className="bg-[#FCE4EC] rounded-lg p-2">
                      <div className="text-lg font-bold text-[#E8B4B8]">125</div>
                      <div className="text-xs text-[#8B2252]">WPM</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Emotion Classification */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card className="glass-card border-[#E8B4B8]/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#8B2252]">
                    <Activity className="w-5 h-5 text-[#E8B4B8]" />
                    Emotion Classification
                  </CardTitle>
                  <CardDescription>Detected emotional state</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentEmotion.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-4"
                    >
                      <div className="text-6xl mb-4">{currentEmotion.emoji}</div>
                      <div className="text-xl font-semibold text-[#8B2252] mb-2">
                        {currentEmotion.name}
                      </div>
                      <div className="text-sm text-[#4A2C40]/70">
                        {currentEmotion.description}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div className="mt-4 pt-4 border-t border-[#E8B4B8]/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#4A2C40]">Detection Accuracy</span>
                      <span className="text-sm font-bold text-[#FF6B9D]">{detectionAccuracy}%</span>
                    </div>
                    <Progress value={detectionAccuracy} className="h-2 bg-[#FCE4EC]" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gentle Romantic Prompting System */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#FCE4EC]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#8B2252] mb-4">
              Gentle Romantic Prompting
            </h2>
            <p className="text-lg text-[#4A2C40]/70 max-w-2xl mx-auto">
              Thoughtfully crafted prompts to help express what words sometimes cannot
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['all', 'deep', 'playful', 'romantic'].map((cat) => (
              <Button
                key={cat}
                variant={promptCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPromptCategory(cat)}
                className={promptCategory === cat 
                  ? 'bg-[#FF6B9D] hover:bg-[#FF8FB1] text-white rounded-full' 
                  : 'border-[#FF6B9D] text-[#FF6B9D] rounded-full'
                }
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredPrompts.map((prompt, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className={`glass-card hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 ${
                  prompt.category === 'deep' ? 'border-l-[#8B2252]' :
                  prompt.category === 'playful' ? 'border-l-[#FF6B9D]' :
                  'border-l-[#FF8FB1]'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-[#FF6B9D] mt-1 shrink-0" />
                      <p className="text-[#4A2C40] leading-relaxed">{prompt.text}</p>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Badge variant="secondary" className="bg-[#FCE4EC] text-[#8B2252]">
                        {prompt.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12"
          >
            <Card className="glass-card border-[#FF6B9D]/30">
              <CardHeader>
                <CardTitle className="text-[#8B2252] flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#FF6B9D]" />
                  Prompt Style Preference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'gentle', label: 'Gentle & Subtle', emoji: '🌸' },
                    { id: 'bold', label: 'Bold & Direct', emoji: '💫' },
                    { id: 'poetic', label: 'Poetic & Dreamy', emoji: '✨' }
                  ].map((style) => (
                    <Button
                      key={style.id}
                      variant={promptStyle === style.id ? 'default' : 'outline'}
                      onClick={() => setPromptStyle(style.id as 'gentle' | 'bold' | 'poetic')}
                      className={promptStyle === style.id 
                        ? 'bg-[#FF6B9D] hover:bg-[#FF8FB1] text-white rounded-full' 
                        : 'border-[#E8B4B8] text-[#4A2C40] rounded-full hover:bg-[#FCE4EC]'
                      }
                    >
                      <span className="mr-2">{style.emoji}</span>
                      {style.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Privacy & Consent Management */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#FCE4EC] to-[#FFF8F0]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#8B2252] mb-4">
              Privacy Fortress
            </h2>
            <p className="text-lg text-[#4A2C40]/70 max-w-2xl mx-auto">
              Your emotional data is sacred. We treat it that way.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* On-Device Processing */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="glass-card text-center h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB1] flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#8B2252] mb-2">100% Edge AI</h3>
                  <p className="text-sm text-[#4A2C40]/70 mb-4">
                    Your data never leaves your device
                  </p>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mutual Consent */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="glass-card text-center h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF8FB1] to-[#E8B4B8] flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#8B2252] mb-2">Mutual Consent</h3>
                  <p className="text-sm text-[#4A2C40]/70 mb-4">
                    Both parties must opt-in
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Switch
                      checked={mutualConsent}
                      onCheckedChange={setMutualConsent}
                      className="data-[state=checked]:bg-[#FF6B9D]"
                    />
                    <span className="text-sm text-[#4A2C40]">
                      {mutualConsent ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Session Timer */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="glass-card text-center h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#E8B4B8] to-[#FFA07A] flex items-center justify-center">
                    <Timer className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#8B2252] mb-2">Session Timer</h3>
                  <p className="text-sm text-[#4A2C40]/70 mb-4">
                    Ephemeral data countdown
                  </p>
                  <div className="text-2xl font-mono font-bold text-[#FF6B9D]">
                    {formatTime(sessionTime)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Safe Word */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="glass-card text-center h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8B2252] to-[#C71585] flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#8B2252] mb-2">Safe Word</h3>
                  <p className="text-sm text-[#4A2C40]/70 mb-4">
                    Quick disable button
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#8B2252] text-[#8B2252] hover:bg-[#8B2252] hover:text-white rounded-full"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Emergency Stop
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12"
          >
            <Card className="glass-card border-[#FF6B9D]/30">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-[#FF6B9D]" />
                    <div>
                      <h4 className="font-semibold text-[#8B2252]">Privacy Shield Active</h4>
                      <p className="text-sm text-[#4A2C40]/70">All data encrypted end-to-end</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['🔒', '🛡️', '✅'].map((emoji, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-sm">
                          {emoji}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-[#4A2C40]">Trust Badges</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Connection Deepening Modes */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#8B2252] mb-4">
              Connection Deepening Modes
            </h2>
            <p className="text-lg text-[#4A2C40]/70 max-w-2xl mx-auto">
              Choose your connection style for the perfect emotional journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {connectionModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card 
                  className={`glass-card cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedMode === mode.id 
                      ? 'ring-2 ring-[#FF6B9D] border-[#FF6B9D]' 
                      : 'border-[#E8B4B8]/30'
                  }`}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{mode.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#8B2252] text-lg mb-2">
                          {mode.name}
                        </h3>
                        <p className="text-sm text-[#4A2C40]/70 mb-4">
                          {mode.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {mode.features.map((feature, i) => (
                            <Badge key={i} variant="secondary" className="bg-[#FCE4EC] text-[#8B2252] text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {selectedMode === mode.id && (
                        <CheckCircle2 className="w-6 h-6 text-[#FF6B9D]" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Device Pairing Simulation */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#FCE4EC]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#8B2252] mb-4">
              Device Pairing
            </h2>
            <p className="text-lg text-[#4A2C40]/70 max-w-2xl mx-auto">
              Connect your devices for a seamless emotional connection experience
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="glass-card border-[#FF6B9D]/30">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  {/* Smartphone */}
                  <div className="relative">
                    <motion.div
                      animate={isPaired ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-2 shadow-xl"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB1] rounded-2xl flex items-center justify-center">
                        <Smartphone className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>
                    <div className="text-center mt-2 text-sm text-[#4A2C40]">Your Phone</div>
                  </div>

                  {/* Connection Animation */}
                  <div className="flex items-center gap-4">
                    <AnimatePresence>
                      {isPaired && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center"
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                delay: i * 0.2 
                              }}
                              className="w-3 h-3 rounded-full bg-[#FF6B9D] mx-1"
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Smartwatch */}
                  <div className="relative">
                    <motion.div
                      animate={isPaired ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="w-20 h-24 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-2 shadow-xl"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-[#FF8FB1] to-[#E8B4B8] rounded-xl flex items-center justify-center">
                        <Watch className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                    <div className="text-center mt-2 text-sm text-[#4A2C40]">Smart Watch</div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button
                    onClick={handlePairing}
                    className="bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB1] hover:from-[#FF8FB1] hover:to-[#FF6B9D] text-white rounded-full px-8"
                  >
                    {isPaired ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Paired Successfully
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Pair Devices
                      </>
                    )}
                  </Button>
                  
                  {isPaired && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <Activity className="w-3 h-3 mr-1" />
                        Session Active
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 px-4 bg-gradient-to-b from-[#FCE4EC] to-[#FFF8F0]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#8B2252] mb-4">
              Interactive Demo
            </h2>
            <p className="text-lg text-[#4A2C40]/70 max-w-2xl mx-auto">
              Experience HeartWhisper in action - simulate an emotion detection session
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="glass-card border-[#FF6B9D]/30">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Heart className={`w-6 h-6 ${isSessionActive ? 'text-[#FF6B9D] animate-heartbeat' : 'text-gray-400'}`} />
                    <span className="font-semibold text-[#8B2252]">
                      {isSessionActive ? 'Session Active' : 'Session Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#4A2C40]/70">Session Time:</span>
                    <span className="font-mono text-lg font-bold text-[#FF6B9D]">
                      {formatTime(sessionTime)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mb-8">
                  <Button
                    size="lg"
                    onClick={() => {
                      setIsSessionActive(!isSessionActive)
                      if (!isSessionActive) {
                        setSessionTime(0)
                      }
                    }}
                    className={`rounded-full px-12 ${
                      isSessionActive 
                        ? 'bg-[#8B2252] hover:bg-[#C71585] text-white' 
                        : 'bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB1] hover:from-[#FF8FB1] hover:to-[#FF6B9D] text-white'
                    }`}
                  >
                    {isSessionActive ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Stop Session
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Start Session
                      </>
                    )}
                  </Button>
                </div>

                {/* Live Prompt Display */}
                <AnimatePresence>
                  {showPrompt && isSessionActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative mb-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B9D]/20 to-[#FF8FB1]/20 rounded-2xl blur-xl" />
                      <Card className="relative bg-white/80 border-[#FF6B9D]/30 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB1] flex items-center justify-center shrink-0">
                              <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="text-sm text-[#FF6B9D] font-medium mb-1">
                                Whisper Detected
                              </div>
                              <p className="text-[#4A2C40] text-lg">
                                {currentPrompt.text}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Emotion Triggers */}
                <div className="border-t border-[#E8B4B8]/30 pt-6">
                  <h4 className="font-semibold text-[#8B2252] mb-4 text-center">
                    Trigger Emotional States
                  </h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {emotions.map((emotion) => (
                      <Button
                        key={emotion.name}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentEmotion(emotion)
                          setShowPrompt(true)
                          setTimeout(() => setShowPrompt(false), 3000)
                        }}
                        className="rounded-full border-[#E8B4B8] hover:bg-[#FCE4EC] hover:border-[#FF6B9D]"
                      >
                        <span className="mr-2">{emotion.emoji}</span>
                        {emotion.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-b from-[#FFF8F0] to-[#FCE4EC]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB1] shadow-lg mb-4">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#8B2252] mb-2">HeartWhisper</h3>
            <p className="text-[#4A2C40]/70">Bridging Silent Emotions</p>
          </motion.div>

          <div className="flex justify-center gap-6 mb-8">
            <Badge variant="secondary" className="bg-white/50 text-[#8B2252] border-[#E8B4B8]">
              <Lock className="w-3 h-3 mr-1" />
              Privacy First
            </Badge>
            <Badge variant="secondary" className="bg-white/50 text-[#8B2252] border-[#E8B4B8]">
              <Shield className="w-3 h-3 mr-1" />
              End-to-End Encrypted
            </Badge>
            <Badge variant="secondary" className="bg-white/50 text-[#8B2252] border-[#E8B4B8]">
              <Heart className="w-3 h-3 mr-1" />
              Made with Love
            </Badge>
          </div>

          <p className="text-sm text-[#4A2C40]/50">
            © 2024 HeartWhisper. All emotions are valid. 💕
          </p>
        </div>
      </footer>
    </div>
  )
}
