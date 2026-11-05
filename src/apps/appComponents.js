// Keep component imports out of shared app metadata to avoid circular imports.
import Contact from "./Contact"
import Notepad from "./Notepad"
import Projects from "./Projects"
import Resume from "./Resume"
import Skills from "./Skills"
import Terminal from "./Terminal"

const appComponents = {
  resume: Resume,
  projects: Projects,
  skills: Skills,
  contact: Contact,
  terminal: Terminal,
  notepad: Notepad,
}

export default appComponents
