// Disease Reversal page content, shared by both design versions of the page.
import {
  Activity,
  Brain,
  ClipboardList,
  Droplet,
  Dumbbell,
  HeartPulse,
  Leaf,
  MessageCircle,
  Moon,
  Stethoscope,
  Users,
  Utensils,
  Video,
} from 'lucide-react'

export const badges = [
  { icon: Users, text: '10,000+ patients helped' },
  { icon: Stethoscope, text: 'Doctor-guided' },
  { icon: Leaf, text: '100% natural methods' },
]

export const approach = [
  {
    title: 'No Starvation or Fad Diets',
    text: 'Practical, home-cooked meals tailored to your regional food habits, work schedule and preferences.',
  },
  {
    title: 'Data-Driven Precision',
    text: 'We pair your blood diagnostics and Continuous Glucose Monitoring (CGM) trends with targeted nutritional protocols so you see real-time progress.',
  },
  {
    title: 'Doctor-Aligned Care',
    text: 'As your metabolic markers stabilize, we provide clear progress reports to help your physician safely reduce medication dosages where clinically appropriate.',
  },
]

export const programs = [
  { icon: Droplet, tone: 'accent', title: 'Type 2 Diabetes & Prediabetes', text: 'Lower HbA1c, eliminate post-meal sugar spikes and restore natural insulin sensitivity.' },
  { icon: HeartPulse, tone: 'accent', title: 'Hypertension (High BP)', text: 'Balance sodium-potassium ratios, reduce vascular inflammation and stabilize blood pressure naturally.' },
  { icon: Activity, title: 'High Cholesterol & Triglycerides', text: 'Improve HDL/LDL balance and clear excess triglycerides through therapeutic fats and fiber protocols.' },
  { icon: Dumbbell, tone: 'teal', title: 'Obesity & Stubborn Visceral Fat', text: 'Lose inches safely while preserving lean muscle mass and boosting metabolic rate.' },
  { icon: Leaf, tone: 'teal', title: 'Fatty Liver (Grades 1 to 3)', text: 'De-fat the liver and normalize SGOT/SGPT levels through targeted liver-supportive nutrition.' },
]

export const features = [
  { icon: ClipboardList, title: 'Root-Cause Nutrition Audit', text: 'Complete review of your blood work, medical history, gut health and current eating patterns.' },
  { icon: Utensils, title: 'Custom Therapeutic Meal Plans', text: 'Weekly updated diet plans built around familiar, easy-to-prepare foods, with no exotic ingredients required.' },
  { icon: Activity, title: 'CGM & Glucose Mapping', text: 'Real-time tracking to identify your exact food triggers and build a personalized glucose-friendly plate.' },
  { icon: Video, title: 'Weekly 1:1 Consultations', text: 'Dedicated video or phone sessions with your assigned nutritionist to review progress and overcome plateaus.' },
  { icon: MessageCircle, title: 'Daily WhatsApp Support', text: 'Quick meal feedback, dining-out guidance and instant answers between sessions.' },
  { icon: Moon, title: 'Fitness & Habit Coaching', text: 'Simple, sustainable movement, sleep and stress routines to accelerate metabolic recovery.' },
]

export const steps = [
  { title: 'Assess & Map', text: 'Share your recent lab reports and lifestyle details for a deep-dive metabolic assessment.' },
  { title: 'Personalized Coaching', text: 'Receive your tailored nutrition protocol, supplement guidance (if needed) and CGM/tracking setup.' },
  { title: 'Track & Optimize', text: 'Follow your plan with daily WhatsApp check-ins and weekly 1:1 nutritionist adjustments.' },
  { title: 'Sustain for Life', text: 'Graduate with a long-term maintenance blueprint so your numbers stay healthy permanently.' },
]

export const connected = [
  { icon: Activity, title: 'Tracked in HealthOS', text: 'Your reports, readings and trends in one dashboard, so you can see every improvement.' },
  { icon: Stethoscope, tone: 'accent', title: 'Doctor-supervised', text: 'Every change to your medicines is made by a doctor, never by an app.' },
  { icon: Brain, tone: 'teal', title: 'Behavior first', text: 'Food, movement, sleep and stress coaching that fits real life, not crash diets.' },
]
