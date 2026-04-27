export const siteConfig = {
  name: "MRizkyP Profile",
  titleSuffix: "QA Portfolio",
  description: "Showcasing Experience, Strategic QA, Case Studies, and Testing Expertise. Explore the portfolio of Mohammad Rizky Pratama.",
  keywords: [
    "QA Engineer",
    "Quality Assurance",
    "Test Automation",
    "Portfolio",
    "Selenium",
    "Cypress",
    "Playwright",
    "QA Strategy",
    "Case Studies",
    "Testing Expertise",
    "Mohammad Rizky Pratama",
    "QA Engineer",
  ],
  contact: {
    // Current availability status. Options: "available", "freelance_only", "unavailable", "exploring"
    availabilityStatus: (process.env.NEXT_PUBLIC_AVAILABILITY_STATUS || "exploring") as "available" | "freelance_only" | "unavailable" | "exploring",
  },
  pages: {
    about: {
      title: "About Me",
      description: "Learn about M. Rizky Pratama - QA Engineer with 5+ years of experience in test automation and quality assurance.",
    },
    blog: {
      title: "Brain Dump",
      description: "Tech insights, case studies, and lessons from my real work and things I just had to try",
    },
    caseStudies: {
      title: "QA Case Studies",
      description: "Real-world QA success stories showcasing problem-solving and quality improvements.",
    },
    contact: {
      title: "Contact",
      description: "Get in touch with M. Rizky Pratama - QA Engineer available for collaboration and opportunities.",
    },
    experience: {
      title: "Experience",
      description: "Professional journey as a QA Engineer - work experience and achievements.",
    },
    testArtifacts: {
      title: "Test Artifacts",
      description: "Interactive QA demos: bug report creator, test case runner, and automation result dashboard.",
    },
    testingStrategy: {
      title: "Testing Strategy",
      description: "Interactive overview of my end-to-end testing strategy, from grooming to post-production.",
    },
    endorsements: {
      title: "Endorsements",
      description: "Recommendations and feedback from colleagues, friends, and connections.",
    },
    projects: {
      title: "Projects",
      description: "QA projects and test strategies I've built",
    },
    skills: {
      title: "Skills & Expertise",
      description: "A comprehensive overview of my technical capabilities and toolset.",
    },
  },
};
