import React from 'react'
import Resume from '../apps/Resume'
import Projects from '../apps/Projects'
import Skills from '../apps/Skills'
import Contact from '../apps/Contact'
import Terminal from '../apps/Terminal'
import Notepad from '../apps/Notepad'

const apps = [
  {
    id: "resume",
    name: "Resume",
    icon: "/icons/resume.png",
    component: Resume,
  },
  {
    id: "projects",
    name: "Projects",
    icon: "/icons/project.png",
    component: Projects,
  },
  {
    id: "skills",
    name: "Skills",
    icon: "/icons/skills.png",
    component: Skills
  },
  {
    id: "contact",
    name: "Contact",
    icon: "/icons/contactme.png",
    component: Contact
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "/icons/terminal.png",
    component: Terminal
  },
  {
    id: "notepad",
    name: "Notepad",
    icon: "/icons/notepad.png",
    component: Notepad
  },
]

export default apps