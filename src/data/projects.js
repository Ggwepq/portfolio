export const projects = [
  {
    id: "trackwise",
    title: "TrackWise",
    tagline: "A personal expense tracking system.",
    year: "2025",

    gallery: [
      { type: "video", url: "/trackwise.mp4" },
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
      { type: "video", url: "/trackwise.mp4" },
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
    sections: [],
  },

  {
    id: "preplus",
    title: "Preplus GMS",
    tagline:
      "A Gym Management System with member management, inventory management, forecast and recommendation based on trends and gym's sales.",
    year: "2024",

    gallery: [
      { type: "video", url: "/trackwise.mp4" },
      {
        type: "image",
        url: "https://www.spartasystems.com/wp-content/uploads/2021/03/trackwise-digital-video-still-1.jpg.webp",
      },
      {
        type: "image",
        url: "https://comparecamp.com/media/uploads/2020/06/TrackWise-Digital-Dashboard.png",
      },
    ],

    tech: ["PHP", "HTML", "CSS", "Javascript", "MySQL"],
    role: ["Back-end Developer"],

    links: {
      repo: "https://github.com/Ggwepq/Preplus-Gym-Information-System",
    },

    sections: [],
  },
  {
    id: "bnb",
    title: "BrewsNBites",
    tagline: "An e-commerce platform about coffee, drinks, snacks, and foods.",
    year: "2024",

    gallery: [{ type: "video", url: "/trackwise.mp4" }],

    tech: ["Laravel", "VueJS", "MySQL", "TailwindCSS"],
    role: ["Backend Developer"],

    links: {
      repo: "https://github.com/Ggwepq/BrewsNBites",
    },

    sections: [],
  },
  {
    id: "flixtochill",
    title: "FlixToChill",
    tagline: "Very simple movie streaming website.",
    year: "2024",

    gallery: [{ type: "video", url: "/trackwise.mp4" }],

    tech: ["PHP", "HTML", "CSS", "TMDB API"],
    role: ["Full-stack Developer"],

    links: {
      demo: "https://demo.com",
      repo: "https://github.com/Ggwepq/FlixtoChill",
    },

    sections: [],
  },
  {
    id: "caveman",
    title: "Caveman Poetry",
    tagline: "A game inspired by Poetry for Neanderthals",
    year: "2024",

    gallery: [{ type: "video", url: "/trackwise.mp4" }],

    tech: ["HTML", "CSS", "Javascript"],
    role: ["Front-end Developer"],

    links: {
      repo: "https://github.com/Ggwepq/CavemanPoetry",
    },

    sections: [],
  },

  {
    id: "portfolio",
    title: "Personal Website",
    tagline: "My personal website/porfolio.",
    year: "2025",

    gallery: [{ type: "video", url: "/trackwise.mp4" }],

    tech: ["React", "CSS"],
    role: ["Front-end Developer"],

    links: {
      demo: "https://cedjuani.vercel.app",
      repo: "https://github.com/Ggwepq/portfolio",
    },

    sections: [],
  },

  {
    id: "moneysense",
    title: "MoneySense",
    tagline:
      "A voice-guided mobile application for identifying and verifying Philippine Peso for visually-impaired users.",
    year: "2025",

    gallery: [{ type: "video", url: "/trackwise.mp4" }],

    tech: ["Flutter", "Dart", "Python"],
    role: ["Machine Learning", "Backend Developer"],

    links: {
      repo: "https://github.com/PinkyBun/MoneySensei",
    },

    sections: [],
  },
  {
    id: "hand2voice",
    title: "Hand2Voice",
    tagline:
      "A mobile application that translates filipino sign language to text.",
    year: "2025",

    gallery: [{ type: "video", url: "/trackwise.mp4" }],

    tech: ["Flutter", "Dart", "Python"],
    role: ["Machine Learning", "Mobile App Developer"],

    links: {},

    sections: [],
  },
  {
    id: "samurai-revenge",
    title: "MoneySense",
    tagline: "2D Hack and slash game with good combat and intelligent enemies.",
    year: "2024",

    gallery: [{ type: "video", url: "/trackwise.mp4" }],

    tech: ["Unity", "C#"],
    role: ["Game Developer"],

    links: {},

    sections: [],
  },
  {
    id: "kings-knight",
    title: "King's Knight",
    tagline: "2D RPG Game about a knight who failed his king.",
    year: "2024",

    gallery: [{ type: "video", url: "/trackwise.mp4" }],

    tech: ["Unity", "C#"],
    role: ["Game Developer"],

    links: {},

    sections: [],
  },
  {
    id: "forest-escape",
    title: "Forest Escape",
    tagline: "2D Platformer Game inside a forest.",
    year: "2024",

    gallery: [{ type: "video", url: "/trackwise.mp4" }],

    tech: ["Unity", "C#"],
    role: ["Game Developer"],

    links: {},

    sections: [],
  },
];
