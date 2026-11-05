// App metadata is kept separate from React components so any app can look up
// another app without creating circular imports.
const apps = [
  { id: "resume", name: "Resume", icon: "/icons/resume.png" },
  { id: "projects", name: "Projects", icon: "/icons/project.png" },
  { id: "skills", name: "Skills", icon: "/icons/skills.png" },
  { id: "contact", name: "Contact", icon: "/icons/contactme.png" },
  { id: "terminal", name: "Terminal", icon: "/icons/terminal.png" },
  { id: "notepad", name: "Notepad", icon: "/icons/notepad.png" },
]

export const getAppById = (id) => apps.find((app) => app.id === id)
export const getAppByName = (name) =>
  apps.find((app) => app.name.toLowerCase() === name?.toLowerCase())

export default apps
