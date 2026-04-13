# Lyve Translator - Interview Prep Build Plan

Personal reference for building out the project before the Lyve Chat internship interview.
This file is gitignored and won't be pushed to GitHub.

---

## The Goal

Turn the current static React demo into a real-time chat app with Firebase backend,
working auth, live message input, and real-time translation. This directly maps to
the Lyve Chat job description: "Learn integrations such as Firebase, Stripe, and
live-streaming tools."

---

## Current State (What We Have)

- [x] React 19 app with 3 views (Stream, Dashboard, Business Case)
- [x] 15 simulated chat messages from 12 languages
- [x] MyMemory Translation API integration (free, no key)
- [x] In-memory translation cache
- [x] Language picker with live translation toggle
- [x] Full CSS design system with custom properties
- [x] Accessibility (ARIA roles, keyboard nav, skip links, reduced motion)
- [x] Clean README for interview walkthrough

---

## What's Missing (Mapped to Job Description)

### Phase 1: Firebase Backend (PRIORITY - directly mentioned in job posting)

- [ ] **Firebase project setup**
  - Create project at firebase.google.com (free Spark plan)
  - Enable Firestore Database
  - Enable Anonymous Authentication
  - Copy config to `src/services/firebase.js`

- [ ] **Firebase Auth - anonymous sign-in**
  - Auto sign-in on app load (no login form needed)
  - Generate random username + country flag on first visit
  - Show "You" indicator on own messages
  - Store user info in React context

- [ ] **Firestore real-time chat**
  - Collection: `messages` with fields: `text`, `lang`, `userId`, `username`, `avatar`, `timestamp`
  - Replace the `setInterval` simulation with `onSnapshot` listener
  - Messages sync in real-time across multiple browser tabs/devices
  - Order by timestamp, limit to last 50 messages

- [ ] **Working chat input**
  - Remove `readOnly` from the chat input
  - Detect user's browser language via `navigator.language`
  - On send: write message to Firestore with detected language
  - Other users see it appear in real-time + translated if they have translation on

### Phase 2: Polish (Makes it interview-ready)

- [ ] **Loading states**
  - Show skeleton/spinner while translations are in progress
  - Show "Translating..." indicator per message
  - Use the existing `.translating-indicator` CSS (it's already in ChatMessage.css)

- [ ] **Error handling for translation API**
  - Show "Translation unavailable" instead of silently failing
  - Rate limit indicator if MyMemory daily limit is hit
  - Retry logic with exponential backoff (1 retry max)

- [ ] **More target languages in the dropdown**
  - Currently only English and Amharic
  - Add: Spanish, Portuguese, French, Japanese, Korean, Arabic, German, Hindi
  - Auto-detect what languages are in the chat and surface those first

- [ ] **Message language auto-detection**
  - Use MyMemory's language detection endpoint instead of hardcoded `lang` field
  - Falls back to `navigator.language` for user's own messages

### Phase 3: Nice-to-Haves (If time permits)

- [ ] **Dark mode toggle**
  - CSS variables are already set up for this
  - Add a second set of token values in a `[data-theme="dark"]` selector
  - Toggle button in the header or settings

- [ ] **Basic Stripe integration** (mentioned in job description)
  - "Gift" button triggers a Stripe Checkout session
  - Even a mock/test-mode integration shows you know the API
  - Use Stripe test keys (no real charges)

- [ ] **Simple test suite**
  - Job description mentions "feature testing, QA"
  - Add 3-5 tests with React Testing Library
  - Test: message renders, translation shows when language selected, chat input works
  - Run with `npm test`

- [ ] **Deploy to Vercel or Firebase Hosting**
  - Live URL to include in resume/cover letter
  - Shows the app actually works, not just code on GitHub

---

## Firebase Setup Steps (Reference)

1. Go to https://console.firebase.google.com
2. Create new project (name: "lyve-translator" or similar)
3. Skip Google Analytics (not needed)
4. Go to Build > Firestore Database > Create Database > Start in test mode
5. Go to Build > Authentication > Get Started > Enable "Anonymous" provider
6. Go to Project Settings > General > scroll to "Your apps" > click web icon (</>)
7. Register app, copy the `firebaseConfig` object
8. We'll put that config in `src/services/firebase.js`

---

## Files We'll Create/Modify

```
src/
├── services/
│   ├── firebase.js          # NEW - Firebase config + init
│   ├── translateService.js   # EXISTS - no changes needed
│   └── authService.js        # NEW - anonymous auth + user context
├── components/
│   ├── StreamView.js         # MODIFY - replace simulation with Firestore listener
│   ├── ChatMessage.js        # MODIFY - add "You" indicator, loading state
│   └── ...
├── context/
│   └── AuthContext.js        # NEW - React context for current user
└── data/
    └── messages.js           # KEEP as fallback - used when Firebase is offline
```

---

## Interview Talking Points

When walking through this project, hit these:

1. **"I chose Firebase because it's in your job description"** - shows you read the posting
2. **"The translation service is decoupled from the data layer"** - explain how swapping
   setInterval for onSnapshot only touched StreamView, not translateService
3. **"I used anonymous auth to reduce friction"** - no signup wall for a chat demo
4. **"The cache prevents redundant API calls"** - talk about the Map-based cache
5. **"CSS custom properties make theming trivial"** - mention dark mode readiness
6. **"Accessibility isn't an afterthought"** - point out the ARIA roles, skip link, reduced motion
7. **"Here's what I'd do next"** - Stripe integration, WebSocket for scale, rate limiting

---

## Package Installs Needed

```bash
npm install firebase
```

That's it. Everything else is already in the project.

---

## Timeline Estimate

- Phase 1 (Firebase): ~2-3 hours of focused work
- Phase 2 (Polish): ~1-2 hours
- Phase 3 (Extras): ~2-3 hours each item
- Total to be interview-ready: Phase 1 + Phase 2 = one afternoon
