# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript + Tailwind CSS (deployed to Vercel)

## Users

People navigating dating and relationship conversations who need help crafting better message replies. Primary scenario: receiving a text message and wanting to respond with the right tone, whether that's flirty, confident, supportive, or playful.

## Product Purpose

Tone-Reply helps people communicate better in relationships by analyzing conversation context and generating reply suggestions in different styles. The app removes the anxiety of "what do I say next?" by providing AI-powered suggestions tailored to the user's desired tone and goal.

## Positioning

Unlike generic AI chatbots, Tone-Reply is purpose-built for relationship communication with 17 conversation goals, 5 reply styles, and context-aware generation that understands dating dynamics. The backend uses Supabase for user data and Tokenthon LLM for intelligent reply generation.

## Capabilities

- Analyze incoming messages for tone, intent, and sentiment
- Generate reply suggestions across 17 goals (Flirt, Comfort, Support, Apologize, etc.)
- 5 reply styles: Confident, Witty, Romantic, Playful, Supportive
- Rewrite existing drafts in a different style
- Save favorites and create custom presets
- User authentication with JWT
- 5-tab navigation: Generate, Rewrite, Coach, Saved, Profile

## Constraints

- Backend API at tone-reply-api.onrender.com
- Supabase PostgreSQL database
- Tokenthon LLM for reply generation
- Free tier hosting (Vercel frontend, Render backend)
- Must work on mobile browsers (responsive)

## Voice

Warm, confident, approachable. Not clinical or robotic. The app should feel like a friend giving you good advice.

## Brand

- App name: Tone-Reply
- Domain: tonereply.vercel.app
- Color accent: Indigo (#6366f1)
