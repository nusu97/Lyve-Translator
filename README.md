# Lyve Translator

Real-time multilingual chat translation for live streams. Built as a working prototype around the iShowSpeed Ethiopia stream, where 2.4M concurrent viewers from 50+ countries couldn't understand each other.

This app plugs into that exact problem: a viewer in Tokyo sees Japanese, a viewer in São Paulo sees Portuguese, and an Amharic-speaking fan in Addis Ababa sees their own language, all from the same chat feed, translated on the fly.

## What It Does

The app has three main views, each tackling a different part of the product story:

**Stream View** - A simulated live stream interface with a real-time chat feed. Messages arrive one by one (15 messages from 12 different languages). When a viewer taps the globe icon and selects a language, every message gets translated live using the MyMemory Translation API. No pre-baked translations - the API call happens in real time, with results cached so repeat translations are instant.

**Creator Dashboard** - Analytics for the streamer showing viewer count, languages detected, translations served, watch time impact, language distribution bars, and a sentiment breakdown (hype, funny, love, shock). Designed to show creators what they're missing without translation.

**Business Case** - A product pitch page laying out the problem (75% of live chat is non-English, viewers leave when excluded, revenue drops), the solution (one-toggle real-time translation), and projected impact metrics (40% longer watch time, 3.2x more non-English chat, 28% more gift revenue).

## Tech Stack

- **React 19** - functional components, hooks only, no class components
- **MyMemory Translation API** - free tier, no API key required, handles the live translation
- **Lucide React** - icon library (lightweight, tree-shakable)
- **CSS custom properties** - full design system with CSS variables, no CSS-in-JS or Tailwind
- **Create React App** - standard toolchain with zero custom webpack config

## Project Structure

```
src/
├── App.js                          # Root component, tab navigation between 3 views
├── App.css                         # Global styles, CSS variables, design tokens
├── index.js                        # React 19 createRoot entry point
├── components/
│   ├── StreamView.js               # Live stream + chat with translation toggle
│   ├── StreamView.css
│   ├── ChatMessage.js              # Individual chat bubble with translation display
│   ├── ChatMessage.css
│   ├── CreatorDashboard.js         # Analytics view with stats, language bars, sentiment
│   ├── CreatorDashboard.css
│   ├── BusinessCase.js             # Product pitch with problem/solution/metrics
│   ├── BusinessCase.css
│   ├── BottomNav.js                # Mobile-style bottom navigation bar
│   └── BottomNav.css
├── services/
│   └── translateService.js         # MyMemory API integration + caching layer
└── data/
    └── messages.js                 # Chat message data (15 messages, 12 languages)
```

## How the Translation Works

The translation flow lives in two files:

**`translateService.js`** handles the API layer. It calls the MyMemory Translation API (`api.mymemory.translated.net/get`) with a source language, target language, and the text. An in-memory `Map` caches every translation so identical text never hits the API twice. If the API fails or the source language matches the target, it returns the original text.

```javascript
// Core translation call
const params = new URLSearchParams({
    q: text,
    langpair: `${sourceLang}|${targetLang}`,
});
const response = await fetch(`${MYMEMORY_URL}?${params}`);
```

**`StreamView.js`** manages the UI side. When a user picks a language from the dropdown, a `useEffect` fires that maps over all visible messages and calls `translateText()` for each one in parallel using `Promise.all`. A cleanup function sets a `cancelled` flag to prevent state updates from stale requests if the user switches languages quickly.

```javascript
useEffect(() => {
    if (!preferredLang) { setTranslations({}); return; }
    let cancelled = false;

    async function translateAll() {
        const newTranslations = {};
        await Promise.all(
            visibleMessages.map(async (msg) => {
                if (msg.lang === preferredLang) return;
                const result = await translateText(msg.original, msg.lang, preferredLang);
                if (!cancelled) newTranslations[msg.id] = result;
            })
        );
        if (!cancelled) setTranslations(prev => ({ ...prev, ...newTranslations }));
    }

    translateAll();
    return () => { cancelled = true; };
}, [preferredLang, visibleMessages]);
```

The translations are stored in a `translations` state object keyed by message ID, then passed down to each `ChatMessage` component. If a translation exists and the message's language doesn't match the user's preferred language, the translated text renders below the original in a styled callout.

## Key Technical Decisions

**Why MyMemory over Google Translate API?** Google's API requires billing setup and an API key. MyMemory gives 5,000 characters/day free with zero configuration - no signup, no key, no env variables. For a prototype/demo, this matters. Adding an email bumps it to 50,000 chars/day.

**Why in-memory cache instead of localStorage?** The cache only needs to last for the current session. Chat messages are ephemeral. A `Map` is faster than serializing to localStorage and avoids stale translation data across sessions.

**Why CSS custom properties instead of Tailwind or styled-components?** The design system is defined once in `App.css` with ~40 CSS variables (colors, spacing, shadows, radii, transitions). Every component references these tokens. This keeps the bundle small, avoids runtime CSS overhead, and makes theming trivial. Swap the variables and the whole app updates.

**Why simulate messages with setInterval?** Real Twitch/YouTube chat APIs require OAuth and server-side infrastructure. The interval-based simulation (`1200ms` per message) demonstrates the exact same UI behavior a real WebSocket feed would produce, without the auth complexity. The data is structured so swapping in a real source means replacing one `useEffect`.

## Accessibility

The app follows WCAG 2.1 patterns throughout:

- Skip-to-content link for keyboard navigation
- `role="tablist"`, `role="tab"`, `aria-selected` on the tab bar
- `role="log"` and `aria-live="polite"` on the chat container so screen readers announce new messages
- `aria-label` on every interactive element (buttons, inputs, dropdown options)
- `aria-expanded` and `aria-haspopup` on the language dropdown toggle
- `prefers-reduced-motion` media query disables all animations
- `:focus-visible` outlines for keyboard users (no focus rings on mouse click)
- Minimum 48px touch targets on all buttons (`--touch-target` variable)

## Running Locally

```bash
git clone https://github.com/nusu97/Lyve-Translator.git
cd Lyve-Translator
npm install
npm start
```

Opens at `http://localhost:3000`. No environment variables or API keys needed.

## Things I'd Add With More Time

- **WebSocket integration** - replace the simulated message feed with a real Twitch/YouTube chat connection
- **Language auto-detection** - use the API's detection endpoint instead of hardcoding `lang` per message
- **Persistent language preference** - save the user's chosen language in localStorage
- **Rate limiting** - queue translation requests to stay within the free tier limits on heavy streams
- **Server-side translation proxy** - move API calls to a backend to protect rate limits and add response caching across users
- **Dark mode** - the CSS variable system is already set up for it, just needs a second set of token values
