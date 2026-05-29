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
    hero: {
      badge: 'OUR MISSION',
      heading: 'Empowering Sustainable Agriculture Through AI',
      body: 'We believe every farmer deserves access to fast, accurate, and free plant disease diagnosis. Tanam Pangan is here to help Indonesian farmers detect paddy and tomato diseases early, so they can prevent crop losses.',
    },
    story: {
      heading: 'Capstone Project Story',
      paragraphs: [
        'Tanam Pangan was born out of our concern for the challenges Indonesian farmers face in detecting plant diseases. As students, we saw that access to accurate agricultural information was still limited, especially in rural areas.',
        'This project was developed as a Capstone Project within the Coding Camp program supported by DBS Bank. For several months, our team of six students with backgrounds in AI Engineering, FullStack Development, and Data Science collaborated to build this platform from scratch.',
        'Mentored by Jason and Vivy Junita, we combined computer vision technology with plant disease research to deliver a truly beneficial solution.',
      ],
    },
    team: {
      heading: 'Meet The Capstone Team',
      subheading: 'We are a multidisciplinary team of Coding Camp 2026 trainees passionate about bringing AI technology to help Indonesian farmers.',
      members: [
        { name: 'Zacky',   role: 'AI Engineering',       bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', instagram: '#', linkedin: '#', github: '#' },
        { name: 'Mario',   role: 'AI Engineering',       bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', instagram: '#', linkedin: '#', github: '#' },
        { name: 'Raihan',  role: 'FullStack Engineering', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', instagram: '#', linkedin: '#', github: '#' },
        { name: 'Rafhli',  role: 'FullStack Developer',  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', instagram: '#', linkedin: '#', github: '#' },
        { name: 'Tiara',   role: 'Data Science',         bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', instagram: '#', linkedin: '#', github: '#' },
        { name: 'Katarina',role: 'Data Science',         bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', instagram: '#', linkedin: '#', github: '#' },
      ],
    },
  },

  // Terms of Service
  terms: {
    heading: 'Terms of Service',
    effectiveDate: 'Effective from: May 9, 2026',
    sections: [
      {
        title: 'About Services',
        type: 'paragraph',
        content: 'The Tanam Pangan Service is an AI-based educational platform to help identify diseases in paddy and tomato plants. This service was developed as a capstone project by students.',
      },
      {
        title: 'Permitted Use',
        type: 'list',
        items: [
          'This service is for educational and personal purposes only.',
          'Users are prohibited from using the platform for commercial purposes without permission.',
          'Users are responsible for the accuracy of the photos they upload.',
        ],
      },
      {
        title: 'Service Limitations',
        type: 'list',
        items: [
          'Diagnostic results are recommendations, not final decisions.',
          'For a definitive diagnosis, consult an agricultural extension officer or agronomist.',
          'The Tanam Pangan Team is not responsible for any losses resulting from the use of diagnostic results.',
        ],
      },
      {
        title: 'User Data',
        type: 'list',
        items: [
          'Uploaded photo data is used solely for AI analysis.',
          'We do not sell or share user data with third parties.',
          'Users can delete their accounts and data at any time through their Profile page.',
        ],
      },
      {
        title: 'User Account',
        type: 'list',
        items: [
          'Users are responsible for maintaining the security of their accounts and passwords.',
          'Contact us immediately if you detect any suspicious activity on your account.',
        ],
      },
      {
        title: 'Changes to Services',
        type: 'paragraph',
        content: 'The Tanam Pangan Team reserves the right to change or discontinue services at any time without prior notice, as this is a time-limited project.',
      },
      {
        title: 'Contact',
        type: 'paragraph',
        content: 'Questions regarding Terms of Service can be sent to: example@gmail.com',
      },
    ],
  },

  // Auth 
  auth: {
    login: {
      heading: 'Welcome Back',
      subheading: 'Enter your credential to access your Dashboard',
      emailLabel: 'Email',
      emailPlaceholder: 'tanam@gmail.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      forgotPassword: 'Forgot Password?',
      submitBtn: 'Sign In',
      submittingBtn: 'Processing...',
      noAccount: "Don't have an account?",
      registerLink: 'Register',
    },
    register: {
      heading: 'Sign Up for FREE',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Julius',
      emailLabel: 'Email',
      emailPlaceholder: 'julius@gmail.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: '••••••••',
      passwordRules: [
        { key: 'length',    label: 'At least 8 characters' },
        { key: 'upper',     label: 'Uppercase and lowercase letters' },
        { key: 'number',    label: 'A mixture of letters and numbers' },
        { key: 'special',   label: 'Special characters (example: $, !, @, #, etc.)' },
      ],
      submitBtn: 'Create Account',
      submittingBtn: 'Processing...',
      emailNote: 'Check your email to verify your account',
      termsPrefix: 'By creating an account, you agree to the',
      termsLink: 'Terms of Service',
      confirmMismatch: 'Passwords do not match.',
      nameTooShort: 'Full name must be at least 3 characters.',
    },
    forgotPassword: {
      heading: 'Forgot Password?',
      subheading: 'Enter your email, we will send you a link to reset your password.',
      emailLabel: 'Email',
      emailPlaceholder: 'tanam@gmail.com',
      submitBtn: 'Send Reset Link',
      submittingBtn: 'Sending...',
      successNote: "If your email address is registered, a password reset link will be sent within a few minutes. Check your spam folder if it doesn't appear.",
      navbarQuestion: 'Already remembered?',
      navbarLink: 'Sign In →',
    },
    resetPassword: {
      heading: 'Create New Password',
      subheading: 'Enter new password for your account.',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: '••••••••',
      submitBtn: 'Save New Password',
      submittingBtn: 'Saving...',
      confirmMismatch: 'Passwords do not match.',
      tokenInvalid: 'Reset link is invalid or has expired. Please request a new one.',
      successMessage: 'Password successfully reset. Please sign in.',
      navbarQuestion: 'Already remembered?',
      navbarLink: 'Sign In →',
    },
  },

  // App (protected pages)
  onboarding: {
    steps: [
      {
        icon: 'logo',
        title: 'Welcome To Tanam Pangan!',
        desc: `Welcome!
        Tanam Pangan helps you quickly detect diseases in paddy and tomato plants using AI.`,
        nextBtn: 'Next →',
        skipBtn: 'Skip Intro',
      },
      {
        icon: 'photo',
        title: 'Photo or Scan Your Plant',
        desc: 'Upload a photo of an infected plant leaf from your gallery, or use the live camera for a real-time scan.',
        nextBtn: 'Next →',
        prevBtn: 'Previous',
      },
      {
        icon: 'ai',
        title: 'AI Analysis',
        desc: 'Our AI will analyze your photo in 3–5 seconds and identify diseases based on visual symptoms.',
        nextBtn: 'Next →',
        prevBtn: 'Previous',
      },
      {
        icon: 'result',
        title: 'Get the Result!',
        desc: 'Get a complete diagnosis and treatment recommendations that can be implemented immediately in the field.',
        nextBtn: 'Finish',
        prevBtn: 'Previous',
      },
    ],
  },
  
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
