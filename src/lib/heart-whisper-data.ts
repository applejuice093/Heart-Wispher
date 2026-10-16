/**
 * Demo content for HeartWhisper.
 * Emotion labels, romantic prompts, and connection modes are simulated
 * for the Valentine's Day UX — not backed by real biometric models.
 */

export interface Emotion {
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface Prompt {
  text: string;
  category: "deep" | "playful" | "romantic";
}

export interface ConnectionMode {
  id: string;
  name: string;
  emoji: string;
  description: string;
  features: string[];
}

export const emotions: Emotion[] = [
  {
    name: "Hidden Excitement",
    emoji: "💕",
    color: "#FF6B9D",
    description: "A subtle joy waiting to be shared",
  },
  {
    name: "Unspoken Affection",
    emoji: "💗",
    color: "#FF8FB1",
    description: "Warm feelings beneath the surface",
  },
  {
    name: "Suppressed Anxiety",
    emoji: "💭",
    color: "#E8B4B8",
    description: "Nervous energy seeking release",
  },
  {
    name: "Quiet Vulnerability",
    emoji: "🌸",
    color: "#FFA07A",
    description: "Openness waiting to emerge",
  },
  {
    name: "Tender Longing",
    emoji: "🌹",
    color: "#8B2252",
    description: "A deep yearning in your heart",
  },
];

export const romanticPrompts: Prompt[] = [
  {
    text: "Your heart just skipped—want to tell them what's making it race? 💓",
    category: "deep",
  },
  {
    text: "I sense something beautiful you're holding back… whisper it now? 😊",
    category: "playful",
  },
  {
    text: "The air feels heavier… ready to lighten it with what's really on your mind? 🌹",
    category: "romantic",
  },
  {
    text: "Your pulse suggests excitement… care to share the reason? ✨",
    category: "deep",
  },
  {
    text: "Words unsaid carry the most weight… shall we lift one together? 💫",
    category: "romantic",
  },
  {
    text: "I detect a flutter in your heart… is there something sweet you'd like to confess? 💌",
    category: "playful",
  },
  {
    text: "Silence can be a canvas… what emotion would you paint? 🎨",
    category: "deep",
  },
  {
    text: "Your heartbeat tells a story… want to read me a chapter? 📖",
    category: "romantic",
  },
];

export const connectionModes: ConnectionMode[] = [
  {
    id: "date-night",
    name: "Date Night Mode",
    emoji: "💑",
    description: "Syncs during dinners/walks, suggests vulnerability prompts",
    features: [
      "Ambient emotion sensing",
      "Subtle haptic feedback",
      "Perfect moment detection",
    ],
  },
  {
    id: "long-distance",
    name: "Long-Distance Mode",
    emoji: "💫",
    description: "Shares anonymized 'emotion pulses' across distance",
    features: ["Synced heartbeats", "Emotion matching", "Virtual presence feel"],
  },
  {
    id: "friendship",
    name: "Friendship Edition",
    emoji: "🤝",
    description: "Supportive, non-romantic prompts",
    features: [
      "Empathy boosters",
      "Support detection",
      "Care moment suggestions",
    ],
  },
  {
    id: "reflection",
    name: "Post-Conversation Reflection",
    emoji: "📝",
    description: "Private journal of emotions",
    features: ["Emotion timeline", "Private insights", "Growth tracking"],
  },
];

/** Format a session duration in seconds as MM:SS. */
export function formatSessionTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
