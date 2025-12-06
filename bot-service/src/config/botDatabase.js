const botTrainingData = [
  // Testimonials / Experience
  {
    question: ["experience", "how long", "since when", "how many years"],
    answer:
      "We’ve been helping businesses grow online for over 7 years 🌟 with proven strategies and measurable results.",
  },
  {
    question: ["clients", "your customers", "who you worked with", "portfolio"],
    answer:
      "We’ve worked with startups, e-commerce brands, healthcare, real estate, and tech companies 🏢. Each strategy is tailored to industry needs.",
  },

  // Team
  {
    question: ["your team", "who works with you", "experts", "staff"],
    answer:
      "Our team consists of SEO specialists, social media managers, ad campaign experts, web developers, and content writers 💼.",
  },
  {
    question: [
      "who will handle my project",
      "dedicated manager",
      "account manager",
    ],
    answer:
      "Each client is assigned a dedicated account manager 👩‍💼 who coordinates with our marketing team to ensure smooth execution.",
  },

  // Results / Reporting
  {
    question: ["results", "guarantee", "roi", "success rate"],
    answer:
      "We focus on ROI-driven campaigns 📊. While no ethical agency can guarantee #1 overnight, we consistently deliver measurable growth and leads 🚀.",
  },
  {
    question: ["reporting", "analytics", "progress", "how do i track results"],
    answer:
      "We provide detailed monthly reports 📈 with analytics, traffic data, and campaign performance for complete transparency.",
  },

  // Competitors
  {
    question: [
      "what makes you different",
      "why not other agencies",
      "difference",
    ],
    answer:
      "Unlike many agencies, we focus on **long-term ROI, transparent reporting, and custom strategies** — not just vanity metrics 💡.",
  },

  // Offers
  {
    question: ["discount", "offers", "free trial", "deal"],
    answer:
      "We occasionally provide seasonal offers 🎉. Right now, we’re offering a **free consultation** to discuss your project.",
  },

  // Career / Jobs
  {
    question: ["jobs", "career", "hiring", "work with you"],
    answer:
      "Yes! We’re always looking for talented marketers and developers 💼. You can send your CV to 📧 careers@dmservices.com.",
  },

  // Payment
  {
    question: ["payment", "how to pay", "payment methods"],
    answer:
      "We accept multiple payment methods 💳 including bank transfer, PayPal, and major credit cards.",
  },
  {
    question: ["currency", "international payment"],
    answer:
      "Yes, we work with clients worldwide 🌍 and accept international payments in USD, EUR, and INR.",
  },

  // Timeline
  {
    question: ["how long does it take", "project duration", "timeframe"],
    answer:
      "It depends on the service ⏳. SEO usually takes 3–6 months for visible results, while ads and social campaigns can show impact within weeks.",
  },

  // Training & Workshops
  {
    question: [
      "training",
      "workshops",
      "do you teach",
      "learn digital marketing",
    ],
    answer:
      "Yes! We provide **digital marketing training & workshops** 🎓 for teams who want to learn SEO, Ads, and Social Media Marketing.",
  },

  // Greetings
  {
    question: ["hi", "hello", "hey", "good morning", "good evening"],
    answer:
      "Hello! 👋 Welcome to our Digital Marketing services. How can I help you today?",
  },
  {
    question: ["who are you", "what are you"],
    answer:
      "I’m your Digital Marketing Assistant 🤖 here to answer your questions about our services.",
  },

  // Services
  {
    question: ["services", "what services do you offer", "your services"],
    answer:
      "We offer SEO, Social Media Marketing, Google Ads, Content Marketing, Email Marketing, and Website Development.",
  },
  {
    question: ["seo", "search engine optimization", "rank on google"],
    answer:
      "Our SEO service helps your website rank higher on Google, attract more visitors, and grow organic traffic 🚀.",
  },
  {
    question: [
      "social media",
      "facebook marketing",
      "instagram ads",
      "linkedin marketing",
    ],
    answer:
      "We manage and run ad campaigns on Facebook, Instagram, LinkedIn, and Twitter to boost your brand visibility 📱.",
  },
  {
    question: ["google ads", "ppc", "paid ads"],
    answer:
      "We create high-converting Google Ads and PPC campaigns to maximize ROI 💰.",
  },
  {
    question: ["content marketing", "blogs", "articles"],
    answer:
      "Our content marketing team creates engaging blogs, articles, and website content to attract and retain your audience ✍️.",
  },
  {
    question: ["email marketing", "newsletter", "mail campaigns"],
    answer:
      "We run targeted email campaigns to nurture leads and retain customers 📩.",
  },
  {
    question: ["website development", "web design", "mern development"],
    answer:
      "We design and develop modern websites using MERN stack with SEO-friendly structure 💻.",
  },

  // Pricing
  {
    question: ["pricing", "cost", "how much", "plans"],
    answer:
      "Our pricing depends on the service and package you choose. Would you like me to connect you with a sales expert for details?",
  },

  // Process
  {
    question: ["how do you work", "process", "workflow"],
    answer:
      "We start with a free consultation, then create a customized strategy, implement campaigns, and track performance 📊.",
  },

  // Benefits
  {
    question: ["why choose you", "benefits", "advantages"],
    answer:
      "We focus on ROI-driven strategies, transparent reporting, and personalized digital marketing solutions tailored to your business 💡.",
  },

  // Consultation
  {
    question: ["free consultation", "talk to expert", "book meeting"],
    answer:
      "Yes! We offer a free consultation. Would you like me to schedule a call with our marketing expert? 📞",
  },

  // Contact
  {
    question: ["contact", "how to reach you", "email", "phone"],
    answer:
      "You can reach us at 📧 support@dmservices.com or 📞 +1-555-987-6543. Our representatives are available Mon–Sat, 9AM–7PM.",
  },

  // Location
  {
    question: ["where are you located", "your location", "office"],
    answer:
      "We are based in New Delhi, India 🌍, but we proudly serve clients worldwide.",
  },

  // Support
  {
    question: ["help", "support", "issue"],
    answer:
      "I’m here to help! You can also email 📧 support@dmservices.com for technical assistance or project queries.",
  },

  // Goodbye
  {
    question: ["bye", "goodbye", "see you"],
    answer:
      "Goodbye! 👋 It was great chatting with you. Wishing you success in your business!",
  },
  // Company Info
  {
    question: [
      "about your company",
      "tell me about your company",
      "who owns this company",
      "company details",
    ],
    answer:
      "We are a Digital Marketing agency specializing in SEO, Social Media Marketing, Google Ads, Content Marketing, Email Marketing, and Website Development 🌐. Our mission is to help businesses grow online with ROI-driven strategies 🚀.",
  },
];

// badWords.js
export const badWords = [
  "fuck",
  "f u",
  "f***",
  "fuck you",
  "f uck",
  "f uck you",
  "f uck off",
  "f uck u",
  "f uck off",
  "f uck you",
  "f uck u",
  "bitch",
  "asshole",
  "nigga",
  "nigger",
  "cunt",
  "dick",
  "bastard",
  "slut",
  "whore",
  "shit",
  "bitch",
  "asshole",
  "nigga",
  "nigger",
  "cunt",
  "dick",
  "bastard",
  "slut",
  "whore",
];

// Default Fallback (if no match found)
export const fallbackResponse =
  "🤔 I couldn’t find an exact answer to your question. " +
  "But don’t worry — you can always reach our team directly: \n\n" +
  "📧 Email: support@dmservices.com \n" +
  "📞 Phone: +1-555-987-6543 \n\n" +
  "Our digital marketing specialists will be happy to assist you! 🚀";

export default botTrainingData;
