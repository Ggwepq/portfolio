export const projects = [
  {
    id: "trackwise",
    title: "TrackWise",
    tagline: "A personal expense tracking system.",
    year: "2025",

    gallery: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768152159/portfolio/portfolio_jltuxp.mp5",
      },
      {
        type: "image",
        url: "https://www.spartasystems.com/wp-content/uploads/2021/03/trackwise-digital-video-still-1.jpg.webp",
      },
      {
        type: "image",
        url: "https://comparecamp.com/media/uploads/2020/06/TrackWise-Digital-Dashboard.png",
      },
    ],

    tech: [
      "Laravel",
      "Livewire",
      "AlpineJS",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel",
      "Supabase",
    ],
    role: ["Project Manager", "Full-stack Developer"],

    links: {
      demo: "https://endama-ets.vercel.app/",
      repo: "https://github.com/Ggwepq/exts",
    },
    demoButton: "Live Demo",

    sections: [
      {
        heading: "Overview",
        content:
          "TrackWise is a personal expense tracking system that helps manage and tracks expense, budget, and savings. It is a School Project about developing a assigned system with the use of Agile-Scrumm methodology.",
      },
      {
        heading: "Key Features",
        type: "list",
        items: [
          "Real-time expense categorization using AlpineJS.",
          "Monthly forecasting algorithms based on previous spending.",
          "Dark mode support fully integrated with Tailwind.",
          "Export data to CSV/PDF for tax purposes.",
        ],
      },
      {
        heading: "Technical Challenges",
        content:
          "One of the hardest parts was handling the real-time updates for the budget bars. Using Livewire allowed me to update the UI without full page reloads, but managing the state between the modal inputs and the dashboard chart required careful synchronization.",
      },
    ],
  },
  {
    id: "bis",
    title: "Barangay Information System",
    tagline:
      "A system made for the residents of Barangay 73 Caloocan to reduce manual errors and improve queueing time.",
    year: "2024",
    gallery: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768152159/portfolio/portfolio_jltuxp.mp4",
      },
      {
        type: "image",
        url: "https://www.spartasystems.com/wp-content/uploads/2021/03/trackwise-digital-video-still-1.jpg.webp",
      },
      {
        type: "image",
        url: "https://comparecamp.com/media/uploads/2020/06/TrackWise-Digital-Dashboard.png",
      },
    ],
    tech: ["Laravel", "Bootstrap", "JQuery", "MySQL"],
    role: ["Full-stack Developer"],
    links: { repo: "https://github.com/Ggwepq/Barangay-Information-System" },
    demoButton: "Live Demo",
    sections: [],
  },

  {
    id: "preplus",
    title: "Preplus GMS",
    tagline:
      "A Gym Management System with member management, inventory management, forecast and recommendation based on trends and gym's sales.",
    year: "2024",

    gallery: [
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768152587/portfolio/preplus/0_zusfh1.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768152585/portfolio/preplus/4_y9dmqe.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768152584/portfolio/preplus/2_f5gt5y.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768152471/portfolio/preplus/5_m0lptt.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768152476/portfolio/preplus/9_vfp6zg.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768152467/portfolio/preplus/10_bznojp.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768152475/portfolio/preplus/8_xp4ekb.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768152467/portfolio/preplus/12_giaco9.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768152473/portfolio/preplus/7_mqoifr.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768152466/portfolio/preplus/11_m07zsc.png",
      },
    ],

    tech: ["PHP", "HTML", "CSS", "Javascript", "MySQL"],
    role: ["Back-end Developer"],

    links: {
      repo: "https://github.com/Ggwepq/Preplus-Gym-Information-System",
    },
    demoButton: "Live Demo",

    sections: [],
  },
  {
    id: "bnb",
    title: "BrewsNBites",
    tagline: "An e-commerce platform about coffee, drinks, snacks, and foods.",
    year: "2024",

    gallery: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768152159/portfolio/portfolio_jltuxp.mp4",
      },
    ],

    tech: ["Laravel", "VueJS", "MySQL", "TailwindCSS"],
    role: ["Backend Developer"],

    links: {
      repo: "https://github.com/Ggwepq/BrewsNBites",
    },
    demoButton: "Live Demo",

    sections: [],
  },
  {
    id: "flixtochill",
    title: "FlixToChill",
    tagline: "Very simple movie streaming website.",
    year: "2024",

    gallery: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768152159/portfolio/portfolio_jltuxp.mp4",
      },
    ],

    tech: ["PHP", "HTML", "CSS", "TMDB API"],
    role: ["Full-stack Developer"],

    links: {
      demo: "https://demo.com",
      repo: "https://github.com/Ggwepq/FlixtoChill",
    },
    demoButton: "Live Demo",

    sections: [],
  },
  {
    id: "caveman",
    title: "Caveman Poetry",
    tagline: "A game inspired by Poetry for Neanderthals",
    year: "2024",

    gallery: [
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768151133/caveman-poetry/home_fvszac.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768151127/caveman-poetry/play_udpguz.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768151127/caveman-poetry/cards_v2j83d.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768151129/caveman-poetry/times_up_xy1fre.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768151129/caveman-poetry/results_xpbhbx.png",
      },
    ],

    tech: ["HTML", "CSS", "Javascript"],
    role: ["Front-end Developer"],

    links: {
      demo: "https://ggwepq.github.io/CavemanPoetry/",
      repo: "https://github.com/Ggwepq/CavemanPoetry",
    },
    demoButton: "Live Demo",

    sections: [
      {
        heading: "Words to know Game",
        content:
          "Cave Man Card Game is game where you must use small words to give clues. If you use big words, you get hit with a stick. Teams guess the word. If word is right, you have score. Words are one point three point. Guess one point word first to guess three point phrase. Time is set by your game lord.",
      },
      {
        heading: "Things you can do",
        type: "list",
        items: [
          "Set own time",
          "Set red gray card dye",
          "New card set each play",
          "Show card list",
          "See game rule",
          "See game score",
        ],
      },
    ],
  },

  {
    id: "portfolio",
    title: "Personal Website",
    tagline: "My personal website/porfolio.",
    year: "2025",

    gallery: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768152159/portfolio/portfolio_jltuxp.mp4",
      },
    ],

    tech: ["React", "CSS"],
    role: ["Front-end Developer"],

    links: {
      demo: "https://cedjuani.vercel.app",
      repo: "https://github.com/Ggwepq/portfolio",
    },
    demoButton: "Live Demo",

    sections: [],
  },

  {
    id: "moneysense",
    title: "MoneySense",
    tagline:
      "A voice-guided mobile application for identifying and verifying Philippine Peso for visually-impaired users.",
    year: "2025",

    gallery: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768152159/portfolio/portfolio_jltuxp.mp4",
      },
    ],

    tech: ["Flutter", "Dart", "Python"],
    role: ["Machine Learning", "Backend Developer"],

    links: {
      repo: "https://github.com/PinkyBun/MoneySensei",
    },
    demoButton: "Live Demo",

    sections: [],
  },
  {
    id: "hand2voice",
    title: "Hand2Voice",
    tagline:
      "A mobile application that translates filipino sign language to text.",
    year: "2025",

    gallery: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768142267/hand2voice-preview_pus5hx.mp4",
      },
    ],

    tech: ["Flutter", "Dart", "Python"],
    role: ["Machine Learning", "Mobile App Developer"],

    links: {},
    demoButton: "Live Demo",

    sections: [],
  },
  {
    id: "samurai-revenge",
    title: "Samurai's Revenge",
    tagline: "2D Hack and slash game with good combat and intelligent enemies.",
    year: "2024",

    gallery: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768138901/portfolio/samurai-revenge-preview_dssvsp.mp4",
      },
    ],
    tech: ["Unity", "C#"],
    role: ["Game Developer"],

    links: {},
    demoButton: "Live Demo",

    sections: [],
  },
  {
    id: "kings-knight",
    title: "King's Knight",
    tagline: "2D RPG Game about a knight who failed his king.",
    year: "2024",

    gallery: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768150481/kings-knight-preview_b0oho8.mp4",
      },
    ],

    tech: ["Unity", "C#", "Corgi Engine"],
    role: ["Game Developer"],

    links: {},
    demoButton: "Live Demo",

    sections: [],
  },
  {
    id: "forest-escape",
    title: "Forest Escape",
    tagline: "2D Platformer Game inside a forest.",
    year: "2024",

    gallery: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768150471/forest-escape-preview-3_cqeqjg.mp4",
      },
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768137006/portfolio/forest-escape-preview_a3xkiv.mp4",
      },
      {
        type: "video",
        url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768150471/forest-escape-preview-2_rofncz.mp4",
      },
    ],

    tech: ["Unity", "C#"],
    role: ["Game Developer"],

    links: {
      demo: "https://drive.google.com/file/d/17NOm2akRqvXVYm6PM-MRgpz5BtdTpuFN/view?usp=sharing",
    },
    demoButton: "Download Game",

    sections: [],
  },
];
