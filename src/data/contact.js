import profile from "./profile"

const contact = {
  person: {
    name: profile.name,
    title: profile.title,
    email: profile.contactEmail,
    phone: profile.phone,
  },
  links: profile.links,
  tabs: [
    { id: "info", label: "Contact Information" },
    { id: "message", label: "Send Message" },
  ],
  navigation: {
    title: "Navigation",
    items: [
      { label: "About Me", appId: "resume" },
      { label: "Experience", appId: "resume" },
      { label: "Projects", appId: "projects" },
      { label: "Education", appId: "resume" },
    ],
  },
  quickActions: {
    title: "Quick Actions",
    items: [
      { label: "View Resume", appId: "resume" },
      { label: "Send Message", tabId: "message" },
    ],
  },
  form: {
    subject: "Portfolio Message",
    fields: [
      { name: "name", placeholder: "Name", type: "text" },
      { name: "email", placeholder: "Email", type: "email" },
      { name: "message", placeholder: "Message", type: "textarea" },
    ],
    sendLabel: "Send",
    sendingLabel: "Sending...",
  },
  labels: {
    onlinePresence: "Online Presence",
    alternative: "Alternative:",
    email: "Email",
    ready: "Contact Manager Ready",
  },
  messages: {
    sent: "Message sent successfully",
    failed: "Failed to send",
    error: "Error sending message",
  },
}

export default contact
