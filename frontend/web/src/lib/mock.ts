export type StageStatus = "green" | "yellow" | "red" | "muted";

export type PipelineStage =
  | "camera"
  | "mediapipe"
  | "recognition"
  | "llm"
  | "tts"
  | "stt"
  | "backend"
  | "gpu";

export interface StageInfo {
  key: PipelineStage;
  label: string;
  status: StageStatus;
  detail?: string;
}

export interface GlossToken {
  gloss: string;
  confidence: number;
}

export interface Turn {
  id: string;
  role: "self" | "other";
  text: string;
  confidence?: number;
  at: number;
}

export interface Conversation {
  id: string;
  title: string;
  mode: "sign-speech" | "speech-sign";
  createdAt: number;
  durationSec: number;
  turns: Turn[];
  favorite?: boolean;
}

export interface PipelineStageDef {
  id: string;
  label: string;
}

export interface TopPrediction {
  gloss: string;
  confidence: number;
}

/* ------------------------------------------------------------------ */
/* Mock data                                                            */
/* ------------------------------------------------------------------ */

export const MOCK_SIGNS: GlossToken[] = [
  { gloss: "HELLO", confidence: 0.97 },
  { gloss: "THANK", confidence: 0.94 },
  { gloss: "PLEASE", confidence: 0.91 },
  { gloss: "HOW", confidence: 0.88 },
  { gloss: "ARE", confidence: 0.84 },
  { gloss: "YOU", confidence: 0.86 },
  { gloss: "TODAY", confidence: 0.9 },
  { gloss: "GOOD", confidence: 0.93 },
  { gloss: "MORNING", confidence: 0.89 },
  { gloss: "NICE", confidence: 0.87 },
  { gloss: "MEET", confidence: 0.85 },
  { gloss: "FRIEND", confidence: 0.92 },
  { gloss: "FAMILY", confidence: 0.9 },
  { gloss: "WORK", confidence: 0.88 },
  { gloss: "HELP", confidence: 0.95 },
  { gloss: "SIGN", confidence: 0.91 },
  { gloss: "SPEAK", confidence: 0.86 },
  { gloss: "DEAF", confidence: 0.93 },
  { gloss: "HEARING", confidence: 0.9 },
  { gloss: "WELCOME", confidence: 0.94 },
];

export const MOCK_SENTENCES = [
  "Hello! How are you today?",
  "It's really nice to meet you.",
  "Could you please help me?",
  "Thank you so much for your time.",
  "Good morning, everyone!",
  "My family is visiting this weekend.",
  "I work at the city hospital.",
  "Welcome to the meeting.",
  "Please take a seat.",
  "That sounds wonderful.",
  "I completely understand.",
  "Let's start now.",
];

export const MOCK_SUBTITLES = [
  "Good morning! Thank you for coming in today.",
  "My name is Sarah and I'll be helping you with the forms.",
  "Please take a seat and make yourself comfortable.",
  "Could you confirm your phone number for me?",
  "I just need one more piece of identification.",
  "All set — I'll send a confirmation to your email.",
  "Is there anything else I can help you with?",
  "Have a wonderful day, and take care!",
];

export const INITIAL_HEARING_TURNS: Turn[] = [
  {
    id: "t1",
    role: "self",
    text: "Hello! How are you today?",
    confidence: 0.96,
    at: Date.now() - 1000 * 60 * 6,
  },
  {
    id: "t2",
    role: "other",
    text: "I'm doing great, thanks for asking!",
    at: Date.now() - 1000 * 60 * 5,
  },
  {
    id: "t3",
    role: "self",
    text: "Thank you so much for meeting with me.",
    confidence: 0.91,
    at: Date.now() - 1000 * 60 * 4,
  },
];

export const INITIAL_DEAF_TURNS: Turn[] = [
  {
    id: "d1",
    role: "other",
    text: "Good morning! How can I help you?",
    at: Date.now() - 1000 * 60 * 8,
  },
  {
    id: "d2",
    role: "self",
    text: "Hi! I have a question about my account.",
    at: Date.now() - 1000 * 60 * 7,
  },
  {
    id: "d3",
    role: "other",
    text: "Of course, let me pull up your records.",
    at: Date.now() - 1000 * 60 * 6,
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    title: "Doctor's visit",
    mode: "sign-speech",
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    durationSec: 12 * 60 + 4,
    turns: [
      { id: "c1t1", role: "self", text: "Hello! How are you today?", confidence: 0.96, at: Date.now() - 1000 * 60 * 60 * 26 },
      { id: "c1t2", role: "other", text: "Good morning, I'm fine, thank you.", at: Date.now() - 1000 * 60 * 60 * 25 },
    ],
  },
  {
    id: "c2",
    title: "Team standup",
    mode: "speech-sign",
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
    durationSec: 8 * 60 + 31,
    turns: [
      { id: "c2t1", role: "other", text: "Let's start with the status updates.", at: Date.now() - 1000 * 60 * 60 * 50 },
      { id: "c2t2", role: "self", text: "I've finished the design review.", at: Date.now() - 1000 * 60 * 60 * 49 },
    ],
  },
  {
    id: "c3",
    title: "Coffee with Maya",
    mode: "sign-speech",
    createdAt: Date.now() - 1000 * 60 * 60 * 74,
    durationSec: 5 * 60 + 2,
    turns: [
      { id: "c3t1", role: "self", text: "It's really nice to meet you.", confidence: 0.92, at: Date.now() - 1000 * 60 * 60 * 74 },
      { id: "c3t2", role: "other", text: "Likewise! How was your trip?", at: Date.now() - 1000 * 60 * 60 * 73 },
    ],
  },
  {
    id: "c4",
    title: "Bank appointment",
    mode: "speech-sign",
    createdAt: Date.now() - 1000 * 60 * 60 * 98,
    durationSec: 15 * 60 + 12,
    turns: [
      { id: "c4t1", role: "other", text: "Welcome to the bank, how can I assist?", at: Date.now() - 1000 * 60 * 60 * 98 },
      { id: "c4t2", role: "self", text: "I'd like to open a savings account.", at: Date.now() - 1000 * 60 * 60 * 97 },
    ],
  },
  {
    id: "c5",
    title: "Airport check-in",
    mode: "speech-sign",
    createdAt: Date.now() - 1000 * 60 * 60 * 122,
    durationSec: 7 * 60 + 45,
    turns: [
      { id: "c5t1", role: "other", text: "Can I see your passport and ticket?", at: Date.now() - 1000 * 60 * 60 * 122 },
    ],
  },
  {
    id: "c6",
    title: "Restaurant order",
    mode: "sign-speech",
    createdAt: Date.now() - 1000 * 60 * 60 * 146,
    durationSec: 6 * 60 + 20,
    turns: [
      { id: "c6t1", role: "self", text: "Please take a seat.", confidence: 0.88, at: Date.now() - 1000 * 60 * 60 * 146 },
      { id: "c6t2", role: "other", text: "Could I get a menu in large print?", at: Date.now() - 1000 * 60 * 60 * 145 },
    ],
  },
  {
    id: "c7",
    title: "Workshop intro",
    mode: "sign-speech",
    createdAt: Date.now() - 1000 * 60 * 60 * 170,
    durationSec: 22 * 60 + 40,
    turns: [
      { id: "c7t1", role: "self", text: "Welcome to the workshop, everyone!", confidence: 0.94, at: Date.now() - 1000 * 60 * 60 * 170 },
    ],
  },
  {
    id: "c8",
    title: "Pharmacy pickup",
    mode: "speech-sign",
    createdAt: Date.now() - 1000 * 60 * 60 * 194,
    durationSec: 4 * 60 + 10,
    turns: [
      { id: "c8t1", role: "other", text: "Your prescription is ready for pickup.", at: Date.now() - 1000 * 60 * 60 * 194 },
      { id: "c8t2", role: "self", text: "Thank you so much!", at: Date.now() - 1000 * 60 * 60 * 193 },
    ],
  },
];

export function mockPipeline(): StageInfo[] {
  return [
    { key: "mediapipe", label: "MediaPipe", status: "green", detail: "Hand tracking running at 48 FPS" },
    { key: "recognition", label: "Recognition", status: "green", detail: "Gloss model v2 loaded" },
    { key: "llm", label: "LLM", status: "green", detail: "Connected · 240ms latency" },
    { key: "tts", label: "Speech", status: "green", detail: "Voice engine ready" },
    { key: "camera", label: "Camera", status: "green", detail: "Built-in webcam connected" },
    { key: "backend", label: "Backend", status: "green", detail: "API healthy" },
    { key: "gpu", label: "GPU", status: "yellow", detail: "WebGL · software fallback available" },
    { key: "stt", label: "Speech-to-Text", status: "green", detail: "Listening for speech" },
  ];
}

export const MODELS = [
  { name: "SignBridge Gloss v2", dataset: "ASL-500 · 12k clips", detail: "Real-time gloss classification" },
  { name: "SignBridge Gloss v1", dataset: "ASL-200 · 4k clips", detail: "Legacy · slower, lower accuracy" },
  { name: "MediaPipe Hands", dataset: "Hand landmarks", detail: "Pose & hand landmark tracking" },
];

export const DATASETS = [
  { name: "ASL-500", samples: 12000, glosses: 500, license: "CC BY-SA 4.0" },
  { name: "ASL-200", samples: 4000, glosses: 200, license: "CC BY 4.0" },
];

export const VOICES = [
  { id: "en-us-sarah", name: "Sarah (US English)" },
  { id: "en-gb-james", name: "James (UK English)" },
  { id: "en-au-mia", name: "Mia (AU English)" },
  { id: "es-mx-luis", name: "Luis (Spanish)" },
];

export const TEAM = [
  { name: "Alex Rivera", role: "Founder · Product" },
  { name: "Priya Sharma", role: "ML Engineer" },
  { name: "Jonas Weber", role: "Frontend Architect" },
  { name: "Emi Tanaka", role: "Accessibility Lead" },
];
