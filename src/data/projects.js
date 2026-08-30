export const projects = [
    {
        id: "moneysense",
        title: "MoneySense",
        tagline:
            "An on-device AI and computer vision assistive mobile application for identifying and verifying Philippine currency in real-time.",
        year: "2025",

        gallery: [
            {
                type: "video",
                url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1787970342/portfolio/MoneySense/Miss_Vanessa_f4tq4v.mp4",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787971941/portfolio/MoneySense/moneysense-7_vmyw18.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787971942/portfolio/MoneySense/moneysense-3_apc3lv.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787971941/portfolio/MoneySense/moneysense-5_k6dmw3.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787971940/portfolio/MoneySense/moneysense-4_zwpoze.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787971940/portfolio/MoneySense/moneysense-7_xtcges.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787971942/portfolio/MoneySense/moneysense-2_ea0yck.jpg",
            },
        ],

        tech: ["Flutter", "Dart", "Python", "TensorFlow Lite", "YOLOv8", "ResNet-18", "Google ML Kit", "Riverpod"],
        role: ["Machine Learning", "Mobile Developer", "Backend Developer", "Project Manager"],

        links: {
            repo: "https://github.com/Ggwepq/moneysensev2",
        },
        demoButton: "Repo Link",

        sections: [
            {
                heading: "Overview",
                content:
                    "MoneySense is a free, completely offline, bilingual assistive mobile application built for visually impaired Filipinos to identify and verify Philippine Peso banknotes and coins in real time. Powered by on-device computer vision and deep learning models, it announces denominations aloud in Filipino or English and provides tactile and non-speech audio cues without sending any camera data to the cloud.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Real-Time Philippine Peso Banknote and Coin Detection via On-Device YOLOv8-Nano",
                    "Multi-Stage Authenticity Verification (ResNet-18 Classifier, Siamese Feature Extractor, Google ML Kit OCR)",
                    "Bilingual Voice Guidance and Priority-Queued TTS in Filipino (Tagalog) and English",
                    "Voice Command Control ('Hey MoneySense') with On-Device Intent Parsing",
                    "Three Tailored Accessibility Profiles (Low Vision, Partially Blind, Fully Blind)",
                    "Denomination-Specific Haptic Vibration Patterns and Non-Speech Earcon Audio Cues",
                    "Gestural & Inertial Navigation (Tilt Navigation and Shake-to-Go-Back)",
                    "Interactive Sensor-Driven Audio Onboarding and Feature Tutorials",
                    "100% On-Device Processing with Zero Data or Internet Dependency",
                ],
            },
        ],
    },

    {
        id: "alams",
        title: "ALAMS",
        tagline:
            "Automated attendance monitoring system powered by real-time face detection, liveness verification, and anti-spoofing neural networks.",
        year: "2026",

        gallery: [
            {
                type: "video",
                url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1780552860/portfolio/alams-media_o5mown.mp4",
            },
        ],

        tech: ["Flutter", "Dart", "Supabase", "SQLite"],
        role: ["Mobile Developer", "Machine Learning"],

        links: {
            repo: "https://github.com/Ggwepq/alams",
        },
        demoButton: "Repo Link",

        sections: [
            {
                heading: "Overview",
                content:
                    "ALAMS is a mobile attendance monitoring application built with Flutter for Android. It replaces traditional punch cards and PIN-based systems with a fully automated, camera-driven workflow that verifies employee identity through real-time face recognition, liveness detection, and neural-network anti-spoofing before recording any attendance event.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Face Recognition",
                    "Multi-Layer Anti-Spoofing",
                    "Guided Employee Registration",
                    "Attendance Logging",
                    "Admin Dashboard",
                    "Department Filtering",
                    "Supabase Cloud Sync",
                    "Hashed Admin Credentials",
                    "Login Rate Limiting",
                    "Configurable Settings",
                    "Soft-Delete Data Preservation",
                ],
            },
        ],
    },

    {
        id: "hand2voice",
        title: "Hand2Voice",
        tagline:
            "Real-time sign language translation mobile app converting Filipino Sign Language (FSL) into text using deep learning and computer vision.",
        year: "2025",

        gallery: [
            {
                type: "video",
                url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768142267/portfolio/hand2voice-preview_pus5hx.mp4",
            },
        ],

        tech: ["Flutter", "Dart", "Python", "MediaPipe", "TensorFlow Lite"],
        role: ["Machine Learning", "Mobile App Developer"],

        links: {},
        demoButton: "Live Demo",

        sections: [
            {
                heading: "Overview",
                content:
                    "Hand2Voice is an assistive mobile application designed to bridge communication gaps for the Deaf and hard-of-hearing community in the Philippines. It captures live hand gestures through the device camera and translates Filipino Sign Language (FSL) into written text in real time using deep learning.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Real-Time Filipino Sign Language (FSL) Gesture Recognition",
                    "On-Device Hand Landmark Extraction via MediaPipe",
                    "Instant Sign-to-Text Translation and Sentence Construction",
                    "Text-to-Speech Audio Playback for Translated Gestures",
                    "Interactive Learning Guide for FSL Alphabet and Common Signs",
                ],
            },
        ],
    },

    {
        id: "starvving",
        title: "Starvving",
        tagline:
            "A fully offline-first GPS running and fitness activity tracker built with local vector map rendering and a high-contrast HUD aesthetic.",
        year: "2026",

        gallery: [
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969987/portfolio/starvving/starvving-1_bgwoqs.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969987/portfolio/starvving/starvving-2_xvzp03.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969990/portfolio/starvving/starvving-3_viwjkh.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969991/portfolio/starvving/starvving-4_dur3ho.jpg",
            },
        ],

        tech: [
            "Flutter",
            "Dart",
            "MapLibre Native",
            "SQLite",
            "Riverpod",
        ],
        role: ["Mobile Developer", "UI/UX Designer"],

        links: {
            repo: "https://github.com/Ggwepq/starvving",
        },
        demoButton: "Repo Link",

        sections: [
            {
                heading: "Overview",
                content:
                    "Starvving is an offline-first Android application designed for runners and walkers who need reliable workout tracking without depending on an internet connection. Featuring a rugged, high-contrast 'Performance Dark' HUD design system, Starvving renders vector maps from preloaded local .mbtiles files and logs workout metrics directly to an on-device SQLite database.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Real-Time GPS Tracking for Pace, Distance, Time, and Cadence",
                    "Fully Offline Vector Maps with MapLibre Native and Offline .mbtiles Region Management",
                    "High-Contrast 'Performance Dark' HUD Theme with Selectable Accents (Neon Lime, Action Orange, Crimson)",
                    "Live Lap Tracking and Interval Split Calculation",
                    "Distance Goal Setting with Dynamic Progress Bar",
                    "Tabular Figure Typography to Prevent Layout Shifting During Live Movement",
                    "Activity Feed, History Log, and Interactive Route Polyline Replay",
                    "Performance Insights, Metric Summaries, and Gamification Badges",
                    "Local SQLite Activity Storage with Strava and Cloud Export Options",
                ],
            },
        ],
    },

    {
        id: "trackwise",
        title: "TrackWise",
        tagline:
            "A modern full-stack personal finance and expense management platform with multi-wallet analytics, budgeting, and recurring transactions.",
        year: "2025",

        gallery: [
            {
                type: "image",
                url: "/assets/images/projects/trackwise/Sort_yonfix.png",
            },
            {
                type: "image",
                url: "/assets/images/projects/trackwise/Screenshot_2026-01-13_232802_kxy575.png",
            },
            {
                type: "image",
                url: "/assets/images/projects/trackwise/Screenshot_2026-01-13_232821_vm4oiu.png",
            },
            {
                type: "image",
                url: "/assets/images/projects/trackwise/Screenshot_2026-01-13_232935_bhfef8.png",
            },
            {
                type: "image",
                url: "/assets/images/projects/trackwise/Screenshot_2026-01-13_233516_xhl0pu.png",
            },
            {
                type: "image",
                url: "/assets/images/projects/trackwise/Screenshot_2026-01-13_234128_dwu7z9.png",
            },
            {
                type: "image",
                url: "/assets/images/projects/trackwise/Screenshot_2026-01-13_234157_unw3oi.png",
            },
            {
                type: "image",
                url: "/assets/images/projects/trackwise/Screenshot_2026-01-13_234230_qfqrmn.png",
            },
            {
                type: "image",
                url: "/assets/images/projects/trackwise/Screenshot_2026-01-13_234221_h2vgit.png",
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
        role: ["Project Manager", "Full-stack Developer", "UI/UX Designer"],

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
                    "Adding and Editing Expense and Income Transactions",
                    "Deleting Transactions",
                    "Categorizing Transaction",
                    "Searching, Filtering, Sorting Transaction",
                    "Image Support and Tagging Transaction",
                    "Adding and Editing Wallet (Adding, Editing, Deleting, Pinning, Grouping)",
                    "Deleting Wallets",
                    "Pinning and Categorizing Wallets",
                    "Budget Setting for Wallets",
                    "Adding and Deleting Category for Transactions",
                    "Grouping Categories and Wallets",
                    "Reports and Charts for Transactions",
                    "Recurring Transactions Support",
                    "Multi-theme Support",
                    "Login and Register with Email Support",
                ],
            },
        ],
    },

    {
        id: "bnb",
        title: "BrewsNBites",
        tagline:
            "Full-stack gourmet e-commerce platform featuring dynamic cart state management, Stripe payment processing, and admin inventory control.",
        year: "2024",

        gallery: [
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768322179/portfolio/BrewsNBites/Screenshot_2026-01-14_003246_pi4bhv.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768322179/portfolio/BrewsNBites/Screenshot_2026-01-14_003305_ud7scc.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768322178/portfolio/BrewsNBites/Screenshot_2026-01-14_003331_yh3wkr.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768322178/portfolio/BrewsNBites/Screenshot_2026-01-14_003107_hjwyfk.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768322178/portfolio/BrewsNBites/Screenshot_2026-01-14_003036_ki9anh.png",
            },
        ],

        tech: ["Laravel", "VueJS", "InertiaJS", "MySQL", "TailwindCSS", "Stripe"],
        role: ["Full-stack Developer", "Backend Developer"],

        links: {
            repo: "https://github.com/Ggwepq/BrewsNBites",
        },
        demoButton: "Live Demo",

        sections: [
            {
                heading: "Overview",
                content:
                    "BrewsNBites is a full-stack e-commerce web application designed for food and coffee lovers to browse, customize, and order gourmet beverages and meals online. Built with Laravel and Inertia.js with Vue 3, the platform offers real-time cart state management, seamless Stripe checkout integration, and an administrative inventory dashboard.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Product Browsing and Multi-Filter Search (Price Range, Category, Brand)",
                    "Interactive Shopping Cart with Dynamic Quantity and Subtotal Calculation",
                    "Secure Online Payment Processing via Stripe Checkout Integration",
                    "Customer Delivery Address Management and Order History Tracking",
                    "Administrative Dashboard with Flowbite UI Components",
                    "Full Product Management (CRUD) with Multiple Image Uploads and Deletion",
                    "Category and Brand Catalog Management",
                    "Role-Based Access Control and Secure User Authentication",
                ],
            },
        ],
    },

    {
        id: "samurai-revenge",
        title: "Samurai's Revenge",
        tagline:
            "Fast-paced 2D hack-and-slash game built in Unity featuring state-machine enemy AI, parry mechanics, and multi-phase boss battles.",
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

        sections: [
            {
                heading: "Overview",
                content:
                    "Samurai's Revenge is an action-packed 2D hack-and-slash game built in Unity. Players control a lone samurai on a quest for vengeance, featuring responsive melee combat combos, parry mechanics, and challenging enemy AI state machines.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Fluid Sword Combat with Combos, Dodging, and Parrying",
                    "State-Machine Driven Enemy AI with Patrol, Aggro, and Attack Behaviors",
                    "Challenging Boss Battles with Multi-Phase Attack Patterns",
                    "Dynamic Health, Stamina, and Combat Animation Systems",
                    "Immersive Sound Effects, Camera Shake, and Visual Hit-Stops",
                ],
            },
        ],
    },

    {
        id: "bis",
        title: "Barangay Information System",
        tagline:
            "Full-stack civic information and queue optimization system with automated certificate issuance, SMS/Email broadcasts, and resident management.",
        year: "2024",
        gallery: [
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156477/portfolio/bis/Screenshot_2026-01-12_021652_pdusuv.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156480/portfolio/bis/Screenshot_2026-01-12_021734_k6kkm6.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156479/portfolio/bis/Screenshot_2026-01-12_021827_sptfmz.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156478/portfolio/bis/Screenshot_2026-01-12_021908_hjgr4f.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156483/portfolio/bis/Screenshot_2026-01-12_022040_e1z37m.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156482/portfolio/bis/Screenshot_2026-01-12_021936_ojyet5.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156484/portfolio/bis/Screenshot_2026-01-12_022154_ftfwma.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156487/portfolio/bis/Screenshot_2026-01-12_022506_k2hbtr.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156486/portfolio/bis/Screenshot_2026-01-12_022515_lyiupm.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156488/portfolio/bis/Screenshot_2026-01-12_022533_grgk2p.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156490/portfolio/bis/Screenshot_2026-01-12_022833_twacgh.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156491/portfolio/bis/Screenshot_2026-01-12_022901_csmv3g.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156493/portfolio/bis/Screenshot_2026-01-12_022926_l2oxgd.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156494/portfolio/bis/Screenshot_2026-01-12_022940_g9ppgy.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156495/portfolio/bis/Screenshot_20241205-065232_atti4b.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156501/portfolio/bis/Screenshot_20241209-053715_higbb3.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768156478/portfolio/bis/image_i5fqr4.png",
            },
        ],
        tech: ["Laravel", "Bootstrap", "JQuery", "MySQL"],
        role: ["Full-stack Developer", "UI/UX Developer"],
        links: { repo: "https://github.com/Ggwepq/Barangay-Information-System" },
        demoButton: "Live Demo",
        sections: [
            {
                heading: "Overview",
                content:
                    "A full-stack information system for Barangay 73 Caloocan to reduce manual processing errors and improve queueing efficiency. Implemented resident, officer, and account management, court schedule handling, certificate request and printing, and announcement delivery via email and SMS with separate admin and resident portals.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Resident Management and Filtering",
                    "Certificate Request and Request Management",
                    "Email and SMS Announcements",
                    "Barangay Project Management",
                    "Court Schedule Tracking",
                    "Residents and Blotter Reports",
                    "Officer Management",
                    "System Settings and Backup",
                ],
            },
        ],
    },

    {
        id: "preplus",
        title: "Preplus GMS",
        tagline:
            "Gym management and sales forecasting system with membership tracking, trend analysis, and BMI calculation.",
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

        sections: [
            {
                heading: "Overview",
                content:
                    "Preplus GMS is a Gym Management System made for Fitness Academy Gym.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Member and Membership Management",
                    "Account Management",
                    "Product and Stock Management",
                    "BMI Calculator",
                    "Gym Sales Forecasting",
                    "Recommendation based on Trends and Sales",
                    "Charts and Visualization for Sales and Forecasting",
                ],
            },
        ],
    },

    {
        id: "msg",
        title: "Msg",
        tagline:
            "An invite-only, passkey-authenticated private chat application featuring real-time messaging and frosted glass iOS interactions.",
        year: "2026",

        gallery: [
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787970004/portfolio/msg/msg-5_kd6ivn.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969999/portfolio/msg/msg-2_lnmjnx.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787970007/portfolio/msg/msg-6_wkmgbq.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787970002/portfolio/msg/msg-3_qn56zy.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787970003/portfolio/msg/msg-4_zvegpc.jpg",
            },
        ],

        tech: [
            "Flutter",
            "Dart",
            "Firebase Firestore",
            "Firebase Storage",
        ],
        role: ["Mobile Developer"],

        links: {
            repo: "https://github.com/Ggwepq/msg",
        },
        demoButton: "Repo Link",

        sections: [
            {
                heading: "Overview",
                content:
                    "Msg is a private, invite-only mobile chat application that replaces traditional phone numbers and email sign-ups with unique cryptographic passkeys. Designed with a sleek, minimalist dark aesthetic and iOS-inspired gesture interactions, Msg provides private 1-on-1 conversations with media sharing and tapback reactions.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Key-Only Passcode Authentication (No phone numbers, emails, or public discovery)",
                    "Real-Time Direct Messaging via Firebase Cloud Firestore",
                    "iOS-Style Context Menus with Frosted Glass Blur Overlays on Long-Press",
                    "Tapback Message Reactions (❤️, 😂, 🔥, 👍, 😮, 🚀)",
                    "Photo and Video Sharing with On-Device Compression and In-App Caching",
                    "Full-Screen Media Viewer and Inline Video Playback",
                    "Custom Dark Themes with Accent Color Personalization (Lavender, Mint, Peach, Coral)",
                    "Admin Dashboard for Passkey Generation, Role Assignment, and Key Revocation",
                    "Local Push Notifications and Custom Permission Handling",
                ],
            },
        ],
    },

    {
        id: "kings-knight",
        title: "King's Knight",
        tagline:
            "Narrative-driven 2D action RPG made in Unity featuring dungeon exploration, melee combat, and character dialogue.",
        year: "2024",

        gallery: [
            {
                type: "video",
                url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768150481/portfolio/kings-knight-preview_b0oho8.mp4",
            },
        ],

        tech: ["Unity", "C#"],
        role: ["Game Developer"],

        links: {},
        demoButton: "Live Demo",

        sections: [
            {
                heading: "Overview",
                content:
                    "King's Knight is a narrative-driven 2D action RPG made in Unity using the Corgi Engine. The game follows the story of a royal knight who failed his kingdom and must battle through perilous dungeons to reclaim his honor.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Tight 2D Platforming and Melee Combat Mechanics",
                    "Story Dialogue System with Character Portraits",
                    "Level Progression with Environmental Hazards and Traps",
                    "Inventory and Health Item Management",
                    "Atmospheric Pixel Art and Dynamic Lighting",
                ],
            },
        ],
    },

    {
        id: "forest-escape",
        title: "Forest Escape",
        tagline:
            "Precision 2D platformer in Unity with dynamic parallax scrolling, hazard progression, and checkpoint physics.",
        year: "2024",

        gallery: [
            {
                type: "video",
                url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768150471/portfolio/forest-escape-preview-3_cqeqjg.mp4",
            },
            {
                type: "video",
                url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768150471/portfolio/forest-escape-preview-2_rofncz.mp4",
            },
            {
                type: "video",
                url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768137006/portfolio/forest-escape-preview_a3xkiv.mp4",
            },
        ],

        tech: ["Unity", "C#"],
        role: ["Game Developer"],

        links: {
            demo: "https://drive.google.com/file/d/17NOm2akRqvXVYm6PM-MRgpz5BtdTpuFN/view?usp=sharing",
        },
        demoButton: "Download Game",

        sections: [
            {
                heading: "Overview",
                content:
                    "Forest Escape is a precision 2D platformer game built in Unity. Players must navigate dense, hazard-filled forest levels by mastering double jumps, dash mechanics, and avoiding hostile flora and fauna.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Precision Platforming with Jump and Wall-Slide Mechanics",
                    "Multiple Levels with Increasing Hazard Complexity",
                    "Collectible Item System and High-Score Tracking",
                    "Checkpoint and Respawn System",
                    "Smooth Parallax Scrolling and Atmospheric Forest Soundtrack",
                ],
            },
        ],
    },

    {
        id: "ikiwatch",
        title: "Ikiwatch",
        tagline:
            "A serene, botanical-themed anime discovery and media watchlist tracker built with clean architecture and REST integration.",
        year: "2026",

        gallery: [
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969992/portfolio/ikiwatch/ikiwatch-1_fdk6c6.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969993/portfolio/ikiwatch/ikiwatch-2_zmhy66.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969995/portfolio/ikiwatch/ikiwatch-3_nv6lnq.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969997/portfolio/ikiwatch/ikiwatch-4_tvqj7d.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969998/portfolio/ikiwatch/ikiwatch-5_behkyr.jpg",
            },
        ],

        tech: [
            "Flutter",
            "Dart",
            "Tailwind CSS",
            "REST API",
        ],
        role: ["Mobile Developer", "UI/UX Designer"],

        links: {
            repo: "https://github.com/Ggwepq/ikiwatch",
        },
        demoButton: "Repo Link",

        sections: [
            {
                heading: "Overview",
                content:
                    "Ikigai is a tranquil, thoughtfully crafted anime discovery and watchlist tracking application. Designed around a calming botanical aesthetic with earth tones and elegant serif typography, Ikigai emphasizes purposeful whitespace and architectural layout grids to create a mindful, clutter-free media browsing experience.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Curated Seasonal Anime Feed and Trending Show Discovery",
                    "Personal Watchlist, Favorites, and Media Library Management",
                    "Comprehensive Anime Detail View with Episode Lists, Synopses, and Studio Info",
                    "Calm Botanical Design System with Tonal Layering and Minimalist Outlines",
                    "Dynamic Search, Genre Filtering, and Discover Channels",
                    "Local Data Caching for Offline Watchlist and Library Viewing",
                ],
            },
        ],
    },

    {
        id: "qread",
        title: "QRead",
        tagline:
            "A fast, lightweight QR code and barcode scanner with smart payload parsing and one-tap Wi-Fi connectivity.",
        year: "2026",

        gallery: [
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969986/portfolio/qread/qread-1_gcm9aq.jpg",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1787969987/portfolio/qread/qread-2_ayxree.jpg",
            },
        ],

        tech: [
            "Flutter",
            "Dart",
        ],
        role: ["Mobile Developer"],

        links: {
            repo: "https://github.com/Ggwepq/qread",
        },
        demoButton: "Repo Link",

        sections: [
            {
                heading: "Overview",
                content:
                    "QRead is a lightweight, responsive QR code and barcode reader application developed with Flutter. Built using Clean Architecture principles, QRead instantly captures and categorizes scanned codes, enabling immediate actions such as connecting to Wi-Fi networks, opening verified web URLs, or copying raw text payloads with a single tap.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "High-Speed Real-Time QR Code and Multi-Format Barcode Scanning",
                    "Intelligent Payload Parsing for Wi-Fi Networks, URLs, and Plain Text",
                    "One-Tap Wi-Fi Network Connection Directly from Scanned QR Codes",
                    "Safe Web Link Preview and In-App URL Redirection",
                    "Camera Controls with Flashlight Toggle and Front/Rear Lens Switching",
                    "Scan History Log with Quick Search and Clipboard Export",
                    "Minimalist, Gesture-Friendly Interface with Dark and Light Mode Support",
                ],
            },
        ],
    },

    {
        id: "trakit",
        title: "CIT Week TrakIt",
        tagline:
            "A cross-platform QR-based attendance tracking mobile app built for college intramurals with dynamic multi-day event scheduling.",
        year: "2025",

        gallery: [
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1788076405/portfolio/trakit/trakit-3_iebcr8.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1788076405/portfolio/trakit/trakit-4_q4fbsj.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1788076405/portfolio/trakit/trakit-3_iebcr8.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1788076404/portfolio/trakit/trakit-2_flc41d.png",
            },
        ],

        tech: [
            ".NET MAUI",
            "C#",
            "XAML",
            "Firebase Firestore",
            "ZXing.Net",
            "MVVM",
        ],
        role: ["Frontend Developer"],

        links: {
            repo: "https://github.com/iamnon3/cit-weektrakit",
        },
        demoButton: "Repo Link",

        sections: [
            {
                heading: "Overview",
                content:
                    "TrakIt is a cross-platform mobile attendance management application built with .NET MAUI for college intramural and sports festival events (CIT Week). Designed to streamline event operations, the app allows sports facilitators to quickly verify student attendance by scanning paper-distributed QR code badges with real-time dynamic check-in and check-out tracking across a week-long multi-event tournament schedule.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "High-Speed QR Code Scanning via ZXing.Net.Maui for Paper-Distributed Student Badges",
                    "Dynamic Time In and Time Out Windows for a Multi-Day (One-Week) Intramurals Schedule",
                    "Real-Time Student Identity Verification (Student Number, Full Name, Section, and Program)",
                    "Event & Sports Selection (Facilitator Assignment to Specific Matches and Venues)",
                    "Live Attendance Roster with Real-Time Filtering by Year Level, Event, and Scan Status",
                    "Duplicate Scan Detection & Instant Visual Toast Feedback for Facilitators",
                    "Cloud Synchronization Powered by Google Cloud Firestore and REST APIs",
                    "MVVM Architecture with CommunityToolkit.Mvvm and Custom XAML UI Components",
                ],
            },
        ],
    },

    {
        id: "watchlist",
        title: "Watchlist API and UI",
        tagline: "RESTful movie watchlist API and streaming interface with TMDB catalog integration.",
        year: "2024",

        gallery: [
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768323241/portfolio/Screenshot_2026-01-14_005335_uni8ql.png",
            },
            {
                type: "video",
                url: "https://res.cloudinary.com/dxau89gcg/video/upload/v1768323226/portfolio/flixtochill-preview_eeei0r.mp4",
            },
        ],

        tech: ["Laravel", "TailwindCSS", "MySQL", "TMDB API"],
        role: ["Full-Stack Developer"],

        links: {
            repo: "https://github.com/Ggwepq/SIA-Restful-Api/tree/movie-api",
        },
        demoButton: "Live Demo",

        sections: [
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Create, Edit, Delete Watchlists",
                    "Add, Edit, Delete Movies",
                    "Movie Streaming",
                ],
            },
        ],
    },

    {
        id: "flixtochill",
        title: "FlixToChill",
        tagline: "Minimalist movie discovery and streaming web application powered by the TMDB API.",
        year: "2024",

        gallery: [
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768323896/portfolio/flixtochill/Screenshot_2026-01-14_010111_fpaho9.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768323887/portfolio/flixtochill/Screenshot_2026-01-14_010141_mlatjy.png",
            },
            {
                type: "image",
                url: "https://res.cloudinary.com/dxau89gcg/image/upload/v1768323901/portfolio/flixtochill/Screenshot_2026-01-14_010429_orpjbm.png",
            },
        ],

        tech: ["PHP", "HTML", "CSS", "TMDB API"],
        role: ["Full-stack Developer"],

        links: {
            repo: "https://github.com/Ggwepq/FlixtoChill",
        },
        demoButton: "Live Demo",

        sections: [
            {
                heading: "Overview",
                content:
                    "FlixToChill is a minimalist movie discovery and streaming web application. Built with PHP and integrating with the TMDB API, it allows movie enthusiasts to browse trending titles, search through extensive catalogs, watch trailers, and stream films seamlessly.",
            },
            {
                heading: "Key Features",
                type: "list",
                items: [
                    "Live Trending and Top-Rated Movies Catalog via TMDB API",
                    "Instant Search by Title, Genre, and Release Year",
                    "Detailed Movie Information Pages with Cast, Ratings, and Overviews",
                    "Integrated Video Player and Trailer Previews",
                    "Responsive and Clean Dark UI Layout",
                ],
            },
        ],
    },

    {
        id: "caveman",
        title: "Caveman Poetry",
        tagline: "Interactive vocabulary web party game inspired by Poetry for Neanderthals.",
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
];
