export function transformText(toolId: string, text: string): string {
  if (!text) return '';

  switch (toolId) {
    case 'json-formatter': {
      try {
        return JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        return '❌ Invalid JSON - JSON غير صالح';
      }
    }

    case 'slug-generator': {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s\u0600-\u06FF-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '') || 'no-text';
    }

    case 'word-counter': {
      const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      const chars = text.length;
      const charsNoSpace = text.replace(/\s/g, '').length;
      const lines = text.split(/\r?\n/).length;
      return `📊 Words: ${words}\n🔢 Characters (with spaces): ${chars}\n📝 Characters (no spaces): ${charsNoSpace}\n📄 Lines: ${lines}`;
    }

    case 'hashtag-generator': {
      const hashtagWords = text.match(/[\w\u0600-\u06FF]+/g);
      if (!hashtagWords) return 'No words found - لا توجد كلمات';
      const uniqueHashtags = [...new Set(hashtagWords.map(w => '#' + w.toLowerCase()))];
      return uniqueHashtags.join(' ');
    }

    case 'remove-duplicate-lines': {
      const duplicateLines = text.split(/\r?\n/);
      return [...new Map(duplicateLines.map(l => [l, l])).values()].join('\n');
    }

    case 'uppercase': {
      return text.toUpperCase();
    }

    case 'lowercase': {
      return text.toLowerCase();
    }

    case 'text-reverser': {
      return Array.from(text).reverse().join('');
    }

    case 'character-counter': {
      const totalChars = text.length;
      const letters = (text.match(/[a-zA-Z\u0600-\u06FF]/g) || []).length;
      const numbers = (text.match(/[0-9]/g) || []).length;
      const specials = (text.match(/[^a-zA-Z0-9\u0600-\u06FF\s\n]/g) || []).length;
      const spaces = (text.match(/\s/g) || []).length;
      return `🔢 Total: ${totalChars}\n🔤 Letters: ${letters}\n🔢 Numbers: ${numbers}\n✨ Special: ${specials}\n␣ Spaces: ${spaces}`;
    }

    case 'remove-spaces': {
      return text.trim().replace(/\s+/g, ' ');
    }

    case 'sentence-case': {
      let sentenceResult = text.toLowerCase();
      sentenceResult = sentenceResult.replace(/^(\s*)([a-z\u0621-\u064A])/i, (_, s, l) => s + l.toUpperCase());
      sentenceResult = sentenceResult.replace(/([.!?؟!])\s+([a-z\u0621-\u064A])/g, (_, p, l) => p + ' ' + l.toUpperCase());
      return sentenceResult;
    }

    case 'title-case': {
      return text.split(/(\s+)/).map(seg => {
        if (seg.trim().length === 0) return seg;
        return seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase();
      }).join('');
    }

    case 'text-cleaner': {
      return text.replace(/[^\w\s\u0600-\u06FF.،!؟]/g, '').replace(/\s+/g, ' ').trim();
    }

    case 'strikethrough': {
      return text.split('').map(ch => ch + '̶').join('');
    }

    case 'upside-down': {
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
    }

    case 'mirror-text': {
      return Array.from(text).reverse().join('');
    }

    case 'italic-text': {
      return text.split('').map(ch => {
        if (/[a-zA-Z]/.test(ch)) {
          return String.fromCodePoint(ch.charCodeAt(0) + 120257);
        }
        return ch;
      }).join('');
    }

    case 'underline-text': {
      return text.split('').map(ch => ch + '̲').join('');
    }

    case 'bold-text': {
      return text.split('').map(ch => {
        if (/[a-zA-Z]/.test(ch)) {
          return String.fromCodePoint(ch.charCodeAt(0) + 120211);
        }
        return ch;
      }).join('');
    }

    case 'alternating-case': {
      return text.split('').map((ch, i) => {
        if (/[a-zA-Z\u0621-\u064A]/.test(ch)) {
          return i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase();
        }
        return ch;
      }).join('');
    }

    case 'invert-case': {
      return text.split('').map(ch => {
        if (ch === ch.toLowerCase() && ch !== ch.toUpperCase()) return ch.toUpperCase();
        if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) return ch.toLowerCase();
        return ch;
      }).join('');
    }

    case 'small-text': {
      const smallMap: Record<string, string> = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ',
        'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ',
        'q': 'ǫ', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
        'y': 'ʏ', 'z': 'ᴢ'
      };
      return text.split('').map(ch => smallMap[ch.toLowerCase()] || ch).join('');
    }

    case 'wide-text': {
      return text.split('').map(ch => {
        if (/[a-zA-Z]/.test(ch)) {
          return String.fromCodePoint(ch.charCodeAt(0) + 65248);
        }
        return ch;
      }).join('');
    }

    case 'binary-converter': {
      return text.split('').map(ch => ch.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    }

    case 'unicode-converter': {
      return text.split('').map(ch => '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0')).join('');
    }

    case 'invisible-text': {
      return text.split('').map(() => '​').join('');
    }

    case 'sort-words': {
      return text.split(/\s+/).sort().join(' ');
    }

    case 'romannumeral':
    case 'roman-numeral': {
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
    }

    // ========== الأدوات الجديدة (مع أقواس) ==========
    case 'password-generator': {
      const length = parseInt(text) || 12;
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$%^&*()_+';
      let password = '';
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    }

    case 'js-minify': {
      let minified = text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
      minified = minified.replace(/\s+/g, ' ').trim();
      return minified;
    }

    case 'js-beautify': {
      let beautified = text.replace(/\{/g, '{\n  ').replace(/\}/g, '\n}\n').replace(/;/g, ';\n');
      beautified = beautified.replace(/\n\s*\n/g, '\n').replace(/,\s*/g, ', ');
      return beautified.trim();
    }

    case 'js-formatter': {
      let formatted = text.replace(/\{/g, ' {\n  ').replace(/\}/g, '\n}\n').replace(/;/g, ';\n').replace(/,\s*/g, ', ');
      formatted = formatted.replace(/\n\s*\n/g, '\n');
      return formatted.trim();
    }

    case 'html-formatter': {
      let htmlTemp = text.replace(/>\s*</g, '>\n<').replace(/(<[^>]+>)/g, (match) => match);
      const linesArr = htmlTemp.split('\n');
      let indentLevel = 0;
      const formattedHtml = linesArr.map(line => {
        if (line.includes('</')) indentLevel--;
        const out = '  '.repeat(Math.max(0, indentLevel)) + line;
        if (line.includes('<') && !line.includes('/>') && !line.includes('</') && !line.includes('!--')) indentLevel++;
        return out;
      }).join('\n');
      return formattedHtml;
    }

    case 'css-formatter': {
      let css = text.replace(/\{/g, '{\n  ').replace(/\}/g, '\n}\n').replace(/;/g, ';\n').replace(/,\s*/g, ', ');
      css = css.replace(/\n\s*\n/g, '\n');
      return css.trim();
    }

    case 'md5-generator': {
      // Simple simulation, not real MD5. For production, use a proper library.
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(32, '0');
    }

    case 'remove-emojis': {
      return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    }

    case 'replace-text': {
      const [search, replacement] = text.split('|');
      if (!search) return text;
      const regex = new RegExp(search, 'g');
      return text.replace(regex, replacement || '');
    }

    default:
      return text;
  }
}