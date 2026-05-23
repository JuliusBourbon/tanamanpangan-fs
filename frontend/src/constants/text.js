// constants/text.js — Semua teks UI terpusat di sini

export const TEXT = {
  // Shared / Navbar
  navbar: {
    public: {
      home: 'Home',
      encyclopedia: 'Diseases Encyclopedia',
      howItWorks: 'How It Works',
      about: 'About Us',
      signUp: 'Sign Up',
      signIn: 'Sign In',
    },
    auth: {
      backToHome: 'Back to Home',
      brand: 'Tanam Pangan',
    },
    app: {
      dashboard: 'Dashboard',
      scan: 'Scan',
      history: 'Scan History',
      encyclopedia: 'Diseases Encyclopedia',
      profile: 'Profile',
    },
  },

  // Landing Page
  landing: {
    hero: {
      badge: 'AI Computer Vision Powered',
      headline1: 'Protect your crops with',
      headline2: 'precision AI',
      subheadline: 'Upload plant photo, get instant diagnosis & treatment solution',
      body: 'Worried about your plants being infected? Get AI-based diagnostic results and appropriate treatment recommendations in seconds.',
      tagline: 'Free, Easy, Accurate.',
      btnTryNow: 'Try Now',
      btnHowItWorks: 'See How It Works',
    },
    different: {
      heading1: 'What Makes',
      brand: 'Tanam Pangan',
      heading2: 'Different?',
      desc1: 'Tanam Pangan was developed specifically for Indonesian farmers, focusing on the most common paddy and tomato plant diseases.',
      desc2: "It's free, easy to use, and based on academic research.",
      cards: [
        {
          title: 'Free & Fast',
          desc: 'No fees or complicated installation required. Simply open your browser, upload a photo, and get results in 3–5 seconds.',
        },
        {
          title: 'Special Paddy & Tomato',
          desc: 'Trained with a dataset of diseases common in Indonesia, not irrelevant global data.',
        },
        {
          title: 'Diagnosis & Treatment',
          desc: 'Not only do you know the name of the disease, but you also know how to treat it with clear treatment recommendations.',
        },
      ],
      academic: {
        title: 'Academic Research Project',
        desc1: 'Tanam Pangan was developed as a final project by students, supported by the Coding Camp 2026 program supported by DBS Bank.',
        desc2: 'This platform was built for educational purposes and continues to be actively developed.',
      },
    },
    steps: {
      heading: 'With Super Easy Steps',
      sub: '3 Easy Steps to an Accurate Diagnosis',
      items: [
        {
          num: '1',
          title: 'Upload Photo',
          desc: 'Take a photo of the infected leaf in good lighting. You can take one from your gallery or directly from your camera.',
        },
        {
          num: '2',
          title: 'AI Analysis',
          desc: 'Our AI system will identify disease patterns in photos within 3–5 seconds.',
        },
        {
          num: '3',
          title: 'Get Treatment',
          desc: 'Receive a complete diagnosis with confidence level, symptoms, and treatment recommendations that can be implemented immediately.',
        },
      ],
    },
    cta: {
      heading: 'Ready to protect your harvest?',
      desc: 'Create a free account and start scanning your plants today. No credit card required, no hidden fees.',
      btn: 'Create Free Account',
      note: 'No credit card required. Start for free now',
    },
    footer: {
      brandDesc: 'An AI-based plant disease detection platform for Indonesian farmers. Developed by Coding Camp 2026 students.',
      products: 'Products',
      company: 'Company',
      productLinks: [
        { label: 'How it works', to: '/how-it-works' },
        { label: 'Scan Dashboard', to: '/login' },
        { label: 'Scan History', to: '/login' },
        { label: 'Diseases Encyclopedia', to: '/encyclopedia' },
      ],
      companyLinks: [
        { label: 'About Us', to: '/about' },
        { label: 'Capstone Team', to: '/about#team' },
        { label: 'Contact', to: '#' }, // placeholder — isi sendiri
      ],
      copyright: '© 2026 Tanam Pangan All Right reserved',
      builtFor: 'Built to fulfill Coding Camp Capstone Project powered by Bank DBS capstone project',
    },
  },

  // How It Works 
  howItWorks: {    
    heading: 'How Tanam Pangan Works',
    subheading: "Tanam Pangan uses computer vision technology to analyze plant photos and automatically detect diseases. Here's how our system works.",
    steps: [
      {
        num: 1,
        title: 'Capture or Upload Plant Photo',
        desc: 'Upload a photo of the infected plant leaf from your gallery, or use the camera directly for a real-time scan. Make sure the photo is clear and well-lit for the best analysis results.',
      },
      {
        num: 2,
        title: 'AI Analysis',
        desc: 'Our AI model processes the photo using computer vision to identify visual patterns of plant disease. The analysis process takes approximately 3–5 seconds.',
      },
      {
        num: 3,
        title: 'Diagnosis Results',
        desc: 'The system displays the detected disease along with its confidence score and severity level. If the confidence level is low, the system will display several possible diseases.',
      },
      {
        num: 4,
        title: 'Treatment Recommendations',
        desc: 'Get complete information on how to treat the detected disease, including treatment methods, dosages, and application times.',
      },
    ],
  },

  // About Us 
  about: {
    
  },

  // Terms of Service
  terms: {
    
  },

  // Auth 
  auth: {
    login: {
      
    },
    register: {
      
    },
    forgotPassword: {
      
    },
    resetPassword: {
      
    },
  },

  // App (protected pages)
  dashboard: {
    
  },
  scan: {
    
  },
  history: {
    
  },
  encyclopedia: {
    
  },
  profile: {
    
  },
}
