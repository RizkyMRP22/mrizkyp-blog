export const navItems = [
    { href: '/', label: 'Home', comingSoon: process.env.NEXT_PUBLIC_ENABLE_HOME !== 'true' },
    { href: '/about', label: 'About', comingSoon: process.env.NEXT_PUBLIC_ENABLE_ABOUT !== 'true' },
    { href: '/experience', label: 'Experience', comingSoon: process.env.NEXT_PUBLIC_ENABLE_EXPERIENCE !== 'true' },
    { href: '/skills', label: 'Skills', comingSoon: process.env.NEXT_PUBLIC_ENABLE_SKILLS !== 'true' },
    { href: '/projects', label: 'Projects', comingSoon: process.env.NEXT_PUBLIC_ENABLE_PROJECTS !== 'true' },
    // { href: '/case-studies', label: 'Case Studies', comingSoon: process.env.NEXT_PUBLIC_ENABLE_CASE_STUDIES !== 'true' },
    { href: '/testing-strategy', label: 'Testing Strategy', comingSoon: process.env.NEXT_PUBLIC_ENABLE_TESTING_STRATEGY !== 'true' },
    { href: '/test-artifacts', label: 'Test Artifacts', comingSoon: process.env.NEXT_PUBLIC_ENABLE_TEST_ARTIFACTS !== 'true' },
    { href: '/blog', label: 'Brain Dump', comingSoon: process.env.NEXT_PUBLIC_ENABLE_BLOG !== 'true' },
    { href: '/endorsements', label: 'Endorsements', comingSoon: process.env.NEXT_PUBLIC_ENABLE_ENDORSEMENTS !== 'true' },
    { href: '/contact', label: 'Contact', comingSoon: process.env.NEXT_PUBLIC_ENABLE_CONTACT !== 'true' },
].map(item => ({
    ...item,
    href: item.comingSoon ? `/coming-soon?page=${encodeURIComponent(item.label)}` : item.href,
}));
