// Roleplaying Kaomoji Sequences (Happy to Neutral only, No Parentheses)
// Each sequence represents a logical emotional arc / roleplay storyline.

export const ROLEPLAY_SEQUENCES = [
  {
    id: 'eureka_daydream',
    name: 'Daydream to Eureka',
    description: 'Pondering a thought, getting inspired, and beaming with delight',
    steps: [
      { face: '・・?', mood: 'thinking', effect: 'thinking' },
      { face: '￣～￣;', mood: 'thinking', effect: 'thinking' },
      { face: '☆▽☆', mood: 'excited', effect: 'sparkle' },
      { face: '≧▽≦', mood: 'happy', effect: 'happy' },
      { face: '•̀ᴗ-✧', mood: 'winking', effect: 'wink' },
      { face: '＾▽＾', mood: 'happy', effect: 'happy' },
    ],
  },
  {
    id: 'sweet_hug_warmth',
    name: 'Friendly Wave to Warm Hug',
    description: 'Waving hello, blooming affection, and sharing a big warm hug',
    steps: [
      { face: '・ω・ノ', mood: 'neutral', effect: 'wave' },
      { face: '◕‿◕', mood: 'happy', effect: 'happy' },
      { face: '♡˙︶˙♡', mood: 'love', effect: 'love' },
      { face: 'っ´▽`っ', mood: 'hugging', effect: 'hug' },
      { face: 'つ≧▽≦つ', mood: 'hugging', effect: 'hug' },
      { face: '⌒ω⌒', mood: 'love', effect: 'blush' },
    ],
  },
  {
    id: 'cozy_cat_nap',
    name: 'Cozy Nap to Gentle Wakeup',
    description: 'Taking a cozy rest, stretching, waking up refreshed with a smile',
    steps: [
      { face: '˘ω˘', mood: 'sleepy', effect: 'sleep' },
      { face: 'ᴗ˳ᴗ', mood: 'sleepy', effect: 'sleep' },
      { face: '￣o￣', mood: 'sleepy', effect: 'yawn' },
      { face: '⊙_⊙', mood: 'neutral', effect: 'alert' },
      { face: '•́ ᴗ •̀', mood: 'neutral', effect: 'blush' },
      { face: '´▽`', mood: 'happy', effect: 'happy' },
    ],
  },
  {
    id: 'bashful_peekaboo',
    name: 'Shy Peek to Playful Wink',
    description: 'Blushing bashfully, peeking out, and giving a playful starry wink',
    steps: [
      { face: '〃ω〃', mood: 'hiding', effect: 'blush' },
      { face: '//▽//', mood: 'hiding', effect: 'shy' },
      { face: '・_・ヾ', mood: 'neutral', effect: 'thinking' },
      { face: '｡･･｡', mood: 'hiding', effect: 'blush' },
      { face: '^_−☆', mood: 'winking', effect: 'wink' },
      { face: '๑˃ᴗ˂ﻭ', mood: 'happy', effect: 'happy' },
    ],
  },
  {
    id: 'smooth_chill_vibes',
    name: 'Cool Shades & Chill Groove',
    description: 'Amused smirk, putting on cool shades, chilling peacefully',
    steps: [
      { face: '¬‿¬', mood: 'neutral', effect: 'smirk' },
      { face: '⌐■_■', mood: 'happy', effect: 'sparkle' },
      { face: '￣ー￣', mood: 'neutral', effect: 'nod' },
      { face: '≧ω≦ゞ', mood: 'happy', effect: 'happy' },
      { face: '✿◠‿◠', mood: 'happy', effect: 'sparkle' },
      { face: '⌒▽⌒', mood: 'happy', effect: 'happy' },
    ],
  },
  {
    id: 'heartfelt_affection',
    name: 'Heartfelt Love & Kiss',
    description: 'Gazing with fond eyes, hearts, blowing a kiss, and radiant love',
    steps: [
      { face: '´,,•ω•,,', mood: 'love', effect: 'blush' },
      { face: '｡♥‿♥｡', mood: 'love', effect: 'love' },
      { face: '˘ ³˘♥', mood: 'love', effect: 'kiss' },
      { face: '灬♥ω♥灬', mood: 'love', effect: 'love' },
      { face: '♡°▽°♡', mood: 'love', effect: 'love' },
      { face: '◕‿◕', mood: 'happy', effect: 'happy' },
    ],
  },
  {
    id: 'cheerful_bounce',
    name: 'Playful Sparkle & Joy',
    description: 'Chuckling warmly, starry excitement, and a joyful victory cheer',
    steps: [
      { face: '◕‿◕', mood: 'happy', effect: 'happy' },
      { face: 'ꉂˊᗜˋ*', mood: 'happy', effect: 'happy' },
      { face: '✧ω✧', mood: 'excited', effect: 'sparkle' },
      { face: '٩◕‿◕｡۶', mood: 'excited', effect: 'happy' },
      { face: '｡•̀ᴗ-✧', mood: 'winking', effect: 'wink' },
      { face: '*^▽^*', mood: 'happy', effect: 'sparkle' },
    ],
  },
];
