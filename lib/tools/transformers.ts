export function transformText(toolId: string, text: string): string {
  if (!text) return '';

  switch (toolId) {
    // 1. JSON Formatter
    case 'json-formatter':
      try {
        return JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        return '❌ Invalid JSON - JSON غير صالح';
      }

    // 2. Slug Generator
    case 'slug-generator':
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s\u0600-\u06FF-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '') || 'no-text';

    // 3. Word Counter
    case 'word-counter':
      const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      const chars = text.length;
      const charsNoSpace = text.replace(/\s/g, '').length;
      const lines = text.split(/\r?\n/).length;
      return `📊 Words: ${words}\n🔢 Characters (with spaces): ${chars}\n📝 Characters (no spaces): ${charsNoSpace}\n📄 Lines: ${lines}`;

    // 4. Hashtag Generator
    case 'hashtag-generator':
      const hashtagWords = text.match(/[\w\u0600-\u06FF]+/g);
      if (!hashtagWords) return 'No words found - لا توجد كلمات';
      const uniqueHashtags = [...new Set(hashtagWords.map(w => '#' + w.toLowerCase()))];
      return uniqueHashtags.join(' ');

    // 5. Remove Duplicate Lines
    case 'remove-duplicate-lines':
      const duplicateLines = text.split(/\r?\n/);
      return [...new Map(duplicateLines.map(l => [l, l])).values()].join('\n');

    // 6. Uppercase
    case 'uppercase':
      return text.toUpperCase();

    // 7. Lowercase
    case 'lowercase':
      return text.toLowerCase();

    // 8. Text Reverser
    case 'text-reverser':
      return Array.from(text).reverse().join('');

    // 9. Character Counter
    case 'character-counter':
      const totalChars = text.length;
      const letters = (text.match(/[a-zA-Z\u0600-\u06FF]/g) || []).length;
      const numbers = (text.match(/[0-9]/g) || []).length;
      const specials = (text.match(/[^a-zA-Z0-9\u0600-\u06FF\s\n]/g) || []).length;
      const spaces = (text.match(/\s/g) || []).length;
      return `🔢 Total: ${totalChars}\n🔤 Letters: ${letters}\n🔢 Numbers: ${numbers}\n✨ Special: ${specials}\n␣ Spaces: ${spaces}`;

    // 10. Remove Spaces
    case 'remove-spaces':
      return text.trim().replace(/\s+/g, ' ');

    // 11. Sentence Case
    case 'sentence-case':
      let sentenceResult = text.toLowerCase();
      sentenceResult = sentenceResult.replace(/^(\s*)([a-z\u0621-\u064A])/i, (_, s, l) => s + l.toUpperCase());
      sentenceResult = sentenceResult.replace(/([.!?؟!])\s+([a-z\u0621-\u064A])/g, (_, p, l) => p + ' ' + l.toUpperCase());
      return sentenceResult;

    // 12. Title Case
    case 'title-case':
      return text.split(/(\s+)/).map(seg => {
        if (seg.trim().length === 0) return seg;
        return seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase();
      }).join('');

    // 13. Text Cleaner
    case 'text-cleaner':
      return text.replace(/[^\w\s\u0600-\u06FF.،!؟]/g, '').replace(/\s+/g, ' ').trim();

    // 14. Strikethrough
    case 'strikethrough':
      return text.split('').map(ch => ch + '̶').join('');

    // 15. Upside Down
    case 'upside-down':
      const upsideMap: Record<string, string> = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ɓ', 'h': 'ɥ',
        'i': 'ı', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ʃ', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
        'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
        'y': 'ʎ', 'z': 'z', 'A': '∀', 'B': '𐐒', 'C': 'ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ',
        'G': '⅁', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N',
        'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ',
        'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z', '0': '0', '1': '1', '2': '2', '3': 'Ɛ',
        '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '!': '¡', '?': '¿',
        '.': '˙', ',': '`', ';': '؛', ':': ':', '(': ')', ')': '(', '[': ']', ']': '['
      };
      return text.split('').map(ch => upsideMap[ch] || ch).reverse().join('');

    // 16. Mirror Text
    case 'mirror-text':
      return Array.from(text).reverse().join('');

    // 17. Italic Text
    case 'italic-text':
      return text.split('').map(ch => {
        if (/[a-zA-Z]/.test(ch)) {
          return String.fromCodePoint(ch.charCodeAt(0) + 120257);
        }
        return ch;
      }).join('');

    // 18. Underline Text
    case 'underline-text':
      return text.split('').map(ch => ch + '̲').join('');

    // 19. Bold Text
    case 'bold-text':
      return text.split('').map(ch => {
        if (/[a-zA-Z]/.test(ch)) {
          return String.fromCodePoint(ch.charCodeAt(0) + 120211);
        }
        return ch;
      }).join('');

    // 20. Alternating Case
    case 'alternating-case':
      return text.split('').map((ch, i) => {
        if (/[a-zA-Z\u0621-\u064A]/.test(ch)) {
          return i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase();
        }
        return ch;
      }).join('');

    // 21. Invert Case
    case 'invert-case':
      return text.split('').map(ch => {
        if (ch === ch.toLowerCase() && ch !== ch.toUpperCase()) return ch.toUpperCase();
        if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) return ch.toLowerCase();
        return ch;
      }).join('');

    // 22. Small Text
    case 'small-text':
      const smallMap: Record<string, string> = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ',
        'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ',
        'q': 'ǫ', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
        'y': 'ʏ', 'z': 'ᴢ'
      };
      return text.split('').map(ch => smallMap[ch.toLowerCase()] || ch).join('');

    // 23. Wide Text
    case 'wide-text':
      return text.split('').map(ch => {
        if (/[a-zA-Z]/.test(ch)) {
          return String.fromCodePoint(ch.charCodeAt(0) + 65248);
        }
        return ch;
      }).join('');

    // 24. Binary Converter
    case 'binary-converter':
      return text.split('').map(ch => ch.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');

    // 25. Unicode Converter
    case 'unicode-converter':
      return text.split('').map(ch => '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0')).join('');

    // 26. Invisible Text
    case 'invisible-text':
      return text.split('').map(() => '​').join('');

    // 27. Sort Words
    case 'sort-words':
      return text.split(/\s+/).sort().join(' ');

    // 28. Roman Numeral
    case 'romannumeral':
    case 'roman-numeral':
      const num = parseInt(text);
      if (isNaN(num)) return '❌ Please enter a valid number - الرجاء إدخال رقم صحيح';
      if (num < 1 || num > 3999) return '❌ Number must be between 1 and 3999 - الرقم يجب أن يكون بين 1 و 3999';
      const romanValues: [number, string][] = [
        [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
        [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
      ];
      let remaining = num;
      let result = '';
      for (const [value, symbol] of romanValues) {
        while (remaining >= value) {
          result += symbol;
          remaining -= value;
        }
      }
      return result;

    default:
      return text;
  }
}