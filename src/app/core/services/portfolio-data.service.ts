import { Injectable } from '@angular/core';
import {
  NavLink,
  SocialLink,
  SkillCategory,
  ExperienceItem,
  Project,
  ProjectDetail,
  Certification,
  EducationItem,
} from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  readonly navLinks: NavLink[] = [
    { label: 'Home', fragment: 'home', icon: 'home' },
    { label: 'About', fragment: 'about', icon: 'user' },
    { label: 'Skills', fragment: 'skills', icon: 'code' },
    { label: 'Experience', fragment: 'experience', icon: 'briefcase' },
    { label: 'Projects', fragment: 'projects', icon: 'folder' },
    { label: 'Certifications', fragment: 'certifications', icon: 'award' },
    { label: 'Education', fragment: 'education', icon: 'graduation' },
    { label: 'Contact', fragment: 'contact', icon: 'mail' },
  ];

  readonly socialLinks: SocialLink[] = [
    {
      label: 'GitHub',
      url: 'https://github.com/GarimaSingh2706',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/garima2706/?isSelfProfile=true',
      icon: 'linkedin',
    },
    {
      label: 'Email',
      url: 'mailto:gspunit02@gmail.com',
      icon: 'mail',
    },
  ];

  readonly heroInfo = {
    name: "Garima Singh",
    role: 'Full Stack Developer',
    tech: 'Java • Spring Boot • Angular • PostgreSQL',
    description:
      'Computer Science graduate and software developer passionate about building scalable backend services, responsive web applications and reliable full-stack solutions.',
    terminalLines: [
      'Garima Singh',
      '> Java Developer',
      '> Spring Boot Developer',
      '> Angular Developer',
      '> Backend Enthusiast',
    ],
  };

  readonly aboutInfo = {
    text: "I am a Computer Science graduate from VIT Bhopal University and currently work as a software developer at LTM. I enjoy building backend services, REST APIs and responsive web applications using Java, Spring Boot and Angular. I am particularly interested in solving real-world problems through clean, maintainable and scalable software.",
    highlights: [
      { label: 'B.Tech CSE', value: 'VIT Bhopal University' },
      { label: 'Period', value: '2021–2025' },
      { label: 'CGPA', value: '8.75' },
      { label: 'Role', value: 'Software Developer' },
      { label: 'Stack', value: 'Java / Spring Boot / Angular / PostgreSQL' },
    ],
    stats: [
      { label: 'Years of Study', value: 4, suffix: '' },
      { label: 'CGPA', value: 8.75, suffix: '' },
      { label: 'Projects Built', value: 3, suffix: '+' },
      { label: 'Certifications', value: 7, suffix: '+' },
    ],
  };

  readonly skills: SkillCategory[] = [
    {
      title: 'Programming',
      icon: 'code',
      skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'SQL'],
    },
    {
      title: 'Backend',
      icon: 'server',
      skills: ['Spring Boot', 'Spring', 'REST APIs', 'JPA/Hibernate', 'JDBC', 'Maven'],
    },
    {
      title: 'Frontend',
      icon: 'layout',
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Database',
      icon: 'database',
      skills: ['PostgreSQL', 'MySQL'],
    },
    {
      title: 'Tools',
      icon: 'wrench',
      skills: ['Git', 'GitHub', 'Docker', 'Postman', 'IntelliJ IDEA', 'VS Code'],
    },
  ];

  readonly experience: ExperienceItem[] = [
    {
      company: 'LTM',
      role: 'Software Developer',
      period: '2025 – Present',
      current: true,
      description:
        'Building enterprise-grade backend services and web applications for client projects using modern Java and Angular technologies.',
      achievements: 
[
  'Engineered Java and Spring Boot REST APIs for a banking case management platform across 8 countries',
  'Automated SLA-based case escalation using scheduled Spring Boot batch jobs and notification workflows',
  'Delivered 10–15 production change requests, implementing business logic enhancements and feature updates',
  'Optimized case-listing APIs with 20-record pagination for datasets exceeding 30,000 cases',
  'Reduced API response time from 2 minutes 45 seconds to 6 seconds through database query optimization',
  'Developed PostgreSQL queries using INSERT, UPDATE, and multi-table JOINs to support banking workflows',
  'Implemented automated email-triggered case creation, CRUD operations, and reliable backend processing',
]
,
      technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Git', 'Maven'],
    },
  ];

  readonly projects: Project[] = [
    {
      slug: 'farmaid',
      title: 'FarmAid',
      tagline: 'Farmer loan management platform',
      description:
        'Farmer loan management platform with user loan applications, administration, CRUD operations, feedback and REST APIs.',
      technologies: ['Java', 'Spring Boot', 'Angular', 'MySQL'],
      image: 'farmaid',
      githubUrl: 'https://github.com/GarimaSingh2706/farmaid',
      featured: true,
    },
    {
      slug: 'meditrust',
      title: 'MediTrust / Sehat Sansaar',
      tagline: 'Healthcare platform with EHR & QR prescriptions',
      description:
        'Healthcare platform concept involving electronic health records, QR-based prescriptions and doctor dashboard.',
      technologies: ['Blockchain', 'Web Development', 'QR'],
      image: 'meditrust',
      githubUrl: 'https://github.com/Sehat-Sansar',
      featured: true,
    },
    {
      slug: 'dental-cavity-detection',
      title: 'Dental Cavity Detection',
      tagline: 'CNN-based dental cavity detection system',
      description:
        'CNN-based dental cavity detection system involving image preprocessing, augmentation and classification.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
      image: 'dental',
      githubUrl: 'https://github.com/GarimaSingh2706/Cavity-Classification',
      featured: true,
    },
  ];

  readonly projectDetails: Record<string, ProjectDetail> = {
    farmaid: {
      slug: 'farmaid',
      title: 'FarmAid',
      tagline: 'Farmer loan management platform with full CRUD and REST APIs',
      heroImage: 'farmaid',
      overview:
        'FarmAid is a full-stack web application designed to streamline farmer loan applications and administration. It provides a user-friendly interface for farmers to apply for loans while giving administrators powerful tools to manage applications, review feedback, and maintain records.',
      problem:
        'Rural farmers often lack a digital platform to apply for and track loan applications. The loan management process was manual, slow, and prone to errors, making it difficult for administrators to handle large volumes of applications efficiently.',
      solution:
        'FarmAid provides a centralized platform built with Spring Boot backend and Angular frontend. Farmers can submit loan applications online, track their status, and provide feedback. Administrators can review applications, perform CRUD operations, and manage the entire loan lifecycle through a clean dashboard.',
      features: [
        'User loan application submission and tracking',
        'Admin dashboard with full CRUD operations',
        'Feedback system for loan applicants',
        'RESTful API architecture with Spring Boot',
        'Secure authentication and role-based access',
        'Responsive Angular frontend for all devices',
      ],
      techStack: [
        { category: 'Backend', items: ['Java', 'Spring Boot', 'REST APIs', 'JPA/Hibernate'] },
        { category: 'Frontend', items: ['Angular', 'TypeScript', 'HTML', 'CSS'] },
        { category: 'Database', items: ['MySQL'] },
        { category: 'Tools', items: ['Maven', 'Git', 'Postman'] },
      ],
      architecture:
        'The application follows a layered architecture: Angular SPA frontend communicating with Spring Boot REST API backend, which connects to a MySQL database via JPA/Hibernate. The backend exposes RESTful endpoints for loan applications, user management, and feedback.',
      challenges:
        'Designing a clean data model for loan workflows with multiple states, implementing role-based access control, and ensuring the Angular frontend provided a smooth experience for users with varying technical literacy.',
      learnings:
        'Deepened understanding of full-stack development, REST API design, Spring Boot ecosystem, and building production-quality Angular applications with proper state management.',
      githubUrl: 'https://github.com/GarimaSingh2706/farmaid',
    },
    meditrust: {
      slug: 'meditrust',
      title: 'MediTrust / Sehat Sansaar',
      tagline: 'Healthcare platform with electronic health records & QR prescriptions',
      heroImage: 'meditrust',
      overview:
        'MediTrust (Sehat Sansaar) is a healthcare platform concept that leverages blockchain technology and QR codes to manage electronic health records (EHR), enable QR-based prescriptions, and provide a comprehensive doctor dashboard.',
      problem:
        'Patient health records are often scattered across providers, making it hard to access complete medical history. Paper-based prescriptions are easily lost and difficult to verify, creating risks for patients and healthcare providers.',
      solution:
        'MediTrust creates a secure, blockchain-backed electronic health record system. Prescriptions are generated as QR codes for easy sharing and verification. A doctor dashboard provides quick access to patient history, enabling better-informed medical decisions.',
      features: [
        'Electronic Health Records (EHR) management',
        'QR-based prescription generation and verification',
        'Doctor dashboard with patient overview',
        'Blockchain-based record integrity',
        'Secure access control for sensitive health data',
        'Patient portal for viewing medical history',
      ],
      techStack: [
        { category: 'Core', items: ['Blockchain', 'Web Development', 'QR Code'] },
        { category: 'Healthcare', items: ['EHR', 'Prescriptions', 'Doctor Dashboard'] },
      ],
      architecture:
        'A concept platform combining blockchain for immutable health records with a web interface for doctors and patients. QR codes bridge the physical-digital gap for prescriptions, enabling quick verification at pharmacies and clinics.',
      challenges:
        'Ensuring data privacy and security for sensitive health records, designing an intuitive QR-based prescription flow, and architecting a system that balances blockchain immutability with practical usability.',
      learnings:
        'Explored blockchain applications in healthcare, QR code integration, and the importance of user-centered design in medical technology. Gained insight into the regulatory and privacy considerations of health data.',
      githubUrl: 'https://github.com/Sehat-Sansar',
    },
    'dental-cavity-detection': {
      slug: 'dental-cavity-detection',
      title: 'Dental Cavity Detection',
      tagline: 'CNN-based dental cavity detection using deep learning',
      heroImage: 'dental',
      overview:
        'A deep learning project that uses Convolutional Neural Networks (CNNs) to detect dental cavities from X-ray images. The system preprocesses images, applies data augmentation, and classifies them to assist dental professionals in early cavity detection.',
      problem:
        'Early dental cavity detection relies on visual examination by dentists, which can be subjective and time-consuming. An automated system could help identify cavities more consistently and serve as a second opinion tool.',
      solution:
        'Built a CNN-based classification model using TensorFlow and Keras. The pipeline includes image preprocessing with OpenCV, data augmentation to improve generalization, and a trained model that classifies dental X-rays as cavity or no-cavity.',
      features: [
        'CNN model for dental cavity classification',
        'Image preprocessing pipeline with OpenCV',
        'Data augmentation for improved generalization',
        'Training and evaluation metrics visualization',
        'Binary classification: cavity vs. no-cavity',
        'Model accuracy and loss tracking',
      ],
      techStack: [
        { category: 'ML Framework', items: ['TensorFlow', 'Keras'] },
        { category: 'Image Processing', items: ['OpenCV', 'NumPy'] },
        { category: 'Language', items: ['Python'] },
      ],
      architecture:
        'The pipeline flows from raw dental X-ray images through OpenCV preprocessing (resizing, normalization, noise reduction), data augmentation (rotation, flipping, zooming), into a CNN model built with Keras Sequential API, outputting a binary classification.',
      challenges:
        'Limited dataset size requiring robust augmentation, preventing overfitting on medical images, and achieving meaningful classification accuracy on a specialized domain.',
      learnings:
        'Practical deep learning with TensorFlow/Keras, image preprocessing techniques, the importance of data augmentation for small datasets, and evaluating model performance in a medical context.',
      githubUrl: 'https://github.com/garima-singh/Cavity-Classification',
    },
  };

  
readonly certifications: Certification[] = [
  {
    title: 'Docker',
    issuer: 'Udemy',
    year: '2026',
    icon: 'server',
    credentialUrl: 'https://www.udemy.com/certificate/UC-1b7df1f2-3b8f-455a-82b8-ee8964eb0f19/',
  },
  {
    title: 'SQL',
    issuer: 'HackerRank',
    year: '2026',
    icon: 'database',
    credentialUrl: 'https://www.hackerrank.com/certificates/d36b50759161',
  },
  {
    title: 'Model Context Protocol',
    issuer: 'Coursera',
    year: '2026',
    icon: 'ai',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/6Z5IZ3SCO75C',
  },
  {
    title: 'Getting started with Data',
    issuer: 'IBM',
    year: '2025',
    icon: 'database',
    credentialUrl: 'https://www.credly.com/badges/33baea62-246c-4fe1-ad5d-c38f2e59f947',
  },
  {
    title: 'Google AI Essentials',
    issuer: 'Google',
    year: '2024',
    icon: 'ai',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/TUK5WYZGL9FV?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
  },
  {
    title: 'Computer Networking',
    issuer: 'Google',
    year: '2023',
    icon: 'network',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/YVPC4YJVVTUT',
  },
  {
    title: 'Career Skills',
    issuer: 'LinkedIn',
    year: '2022',
    icon: 'career',
    credentialUrl: 'https://www.linkedin.com/learning/certificates/f9364d7bfe15fe1158ace25919cf6c410cae6198238257f4c7eda5ef10d3e4cb?contentTrackingId=rehdAjoOS%2FSGdE57DPIcXw%3D%3D&viewName=premium-nav-upsell-text&upsellOrderOrigin=Tracking%3Av1%3Apremium_nav_upsell_text%3ANav%3AIn-Product',
  },
];


  readonly education: EducationItem[] = [
    {
      institution: 'VIT Bhopal University',
      degree: 'B.Tech Computer Science & Engineering',
      period: '2021–2025',
      score: '8.75',
      scoreLabel: 'CGPA',
      description:
        'Comprehensive computer science education covering data structures, algorithms, databases, web development, machine learning, and software engineering principles.',
    },
    {
      institution: 'Sanskar Public School',
      degree: 'Class XII (Senior Secondary)',
      period: '2020–2021',
      score: '91.8%',
      scoreLabel: 'Percentage',
      description: 'Senior secondary education with focus on Science and Mathematics.',
    },
    {
      institution: 'Oxford Public School',
      degree: 'Class X (Secondary)',
      period: '2018–2019',
      score: '87.8%',
      scoreLabel: 'Percentage',
      description: 'Secondary education with a strong foundation across all subjects.',
    },
  ];

  readonly resumeUrl = '/assets/resume/Garima_Resume.pdf';

  getProjectBySlug(slug: string): ProjectDetail | undefined {
    return this.projectDetails[slug];
  }
}
