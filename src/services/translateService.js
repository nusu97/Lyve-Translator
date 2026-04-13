// Free translation using MyMemory API (no API key needed)
// Docs: https://mymemory.translated.net/doc/spec.php
// Limit: 5,000 chars/day without key, 50,000/day with free email key

const MYMEMORY_URL = 'https://api.mymemory.translated.net/get';

// Simple in-memory cache to avoid re-translating identical text
const cache = new Map();

/**
 * Translate text from one language to another using MyMemory API.
 * @param {string} text - The text to translate
 * @param {string} sourceLang - Source language code (e.g. 'pt', 'es', 'fr')
 * @param {string} targetLang - Target language code (e.g. 'en')
 * @returns {Promise<string>} - Translated text
 */
export async function translateText(text, sourceLang, targetLang) {
    if (!text || sourceLang === targetLang) return text;

    const cacheKey = `${sourceLang}|${targetLang}|${text}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    const params = new URLSearchParams({
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
    });

    try {
        const response = await fetch(`${MYMEMORY_URL}?${params}`);
        if (!response.ok) throw new Error(`Translation API error: ${response.status}`);

        const data = await response.json();

        if (data.responseStatus === 200 && data.responseData?.translatedText) {
            const translated = data.responseData.translatedText;
            cache.set(cacheKey, translated);
            return translated;
        }

        // Fallback: return original text if translation fails
        return text;
    } catch (error) {
        console.error('Translation failed:', error);
        return text;
    }
}

/**
 * Translate a batch of messages to the target language.
 * @param {Array} messages - Array of message objects with { original, lang }
 * @param {string} targetLang - Target language code
 * @returns {Promise<Map<number, string>>} - Map of message id -> translated text
 */
export async function translateMessages(messages, targetLang) {
    const results = new Map();

    const promises = messages.map(async (msg) => {
        const translated = await translateText(msg.original, msg.lang, targetLang);
        results.set(msg.id, translated);
    });

    await Promise.all(promises);
    return results;
}
