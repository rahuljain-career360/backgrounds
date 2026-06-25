import type { ZoneData } from './types'

export const CAR_SPAWN: [number, number, number] = [0, 0.5, 0]

export const ZONES: ZoneData[] = [
  {
    id: 'about',
    label: 'About Me',
    position: [0, 0, 12],
    color: '#3b82f6',
    content: {
      title: 'Alex Rivera',
      description: 'Creative Developer & Digital Designer',
      details: [
        'Building immersive digital experiences for 8+ years',
        'Expert in React, Three.js, and interactive 3D',
        'Passionate about pushing creative boundaries',
      ],
      icon: '👤',
    },
  },
  {
    id: 'projects',
    label: 'Projects',
    position: [12, 0, 0],
    color: '#22c55e',
    content: {
      title: 'Featured Projects',
      description: 'Explore my latest work',
      details: [
        'Nebula Dashboard — Real-time 3D data analytics',
        'Prism Studio — Brand identity & motion system',
        'Orbit CMS — Headless CMS with drag-drop builder',
      ],
      icon: '🚀',
    },
  },
  {
    id: 'skills',
    label: 'Skills',
    position: [0, 0, -12],
    color: '#a855f7',
    content: {
      title: 'Skills & Expertise',
      description: 'Technologies I work with',
      details: [
        'React / Next.js / TypeScript',
        'Three.js / WebGL / 3D Graphics',
        'UI/UX Design & Prototyping',
      ],
      icon: '⚡',
    },
  },
  {
    id: 'contact',
    label: 'Contact',
    position: [-12, 0, 0],
    color: '#f97316',
    content: {
      title: 'Get In Touch',
      description: "Let's create something together",
      details: [
        'Email: alex@example.com',
        'GitHub: github.com/alexrivera',
        'Twitter: @alexrivera',
      ],
      icon: '📬',
    },
  },
]
