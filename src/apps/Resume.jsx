import profile from "../data/profile"
import resumeContent from "../data/resume"

export default function Resume() {
  return (
    <div className="overflow-y-auto bg-[#ECE9D8] p-3 text-black text-[12px]">

      {/* HEADER */}
      <div className="mb-3">
        <h1 className="text-[20px] font-bold text-blue-800">
          {profile.name}
        </h1>

        <p className="text-[13px] text-blue-700">
          {profile.title}
        </p>

        <p className="text-[11px] text-gray-700">
          {profile.location}
        </p>

        {/* DOWNLOAD BUTTON (XP STYLE) */}
        <button
          onClick={() => window.open("/resume.pdf")}
          className="mt-2 xp-btn"
        >
          📄 Download PDF
        </button>
      </div>

      {/* CONTACT PANEL */}
      <div className="mb-3 p-2 bg-[#d4d0c8] border border-gray-500 shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_#808080]">

        <p className="text-[11px]">
          📧
          <a href={`mailto:${profile.email}`} className="text-blue-700 underline ml-1">
            {profile.email}
          </a>
          {" • "}
          📱 {profile.phone}
        </p>

        <p className="text-[11px] mt-1">
          🔗{" "}
          <a
            href={profile.links.linkedin}
            target="_blank"
            className="text-blue-700 underline"
          >
            LinkedIn
          </a>

          {" • "}

          💻{" "}
          <a
            href={profile.links.github}
            target="_blank"
            className="text-blue-700 underline"
          >
            GitHub
          </a>

          {" • "}

          🌐{" "}
          <a
            href={profile.links.portfolio}
            target="_blank"
            className="text-blue-700 underline"
          >
            Portfolio
          </a>
        </p>
      </div>

      {/* ABOUT */}
      <Section title="About Me">
        <p className="mb-1">{resumeContent.about.summary}</p>

        <ul className="list-disc ml-4 space-y-[2px]">
          {resumeContent.about.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        <p className="font-semibold">{resumeContent.education.institution}</p>
        <p className="text-[11px]">{resumeContent.education.degree}</p>
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">

        {resumeContent.projects.map((project, index) => (
          <div key={project.name} className={index === 0 ? "mb-2" : ""}>
            <p className="font-semibold">{project.name}</p>
            <ul className="list-disc ml-4 text-[11px]">
              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
            <p className="text-[10px] mt-1">
              🔗{" "}
              <a href={project.link} target="_blank" className="text-blue-700 underline">
                View Project
              </a>
            </p>
          </div>
        ))}

      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <div className="grid grid-cols-2 gap-2 text-[11px]">

          {resumeContent.skillColumns.map((column) => (
            <div key={column[0].label}>
              {column.map((group) => (
                <div key={group.label}>
                  <p className={`font-semibold ${group.label === "Database" ? "mt-1" : ""}`}>{group.label}:</p>
                  <p>{group.items.join(", ")}</p>
                </div>
              ))}
            </div>
          ))}

        </div>
      </Section>

      {/* ADDITIONAL */}
      <Section title="Additional">
        <p className="text-[11px]">
          Languages: {resumeContent.languages.join(", ")}
        </p>
      </Section>

    </div>
  )
}


// 🧩 REUSABLE XP SECTION
function Section({ title, children }) {
  return (
    <div className="mb-3 border border-gray-500">

      {/* HEADER BAR */}
      <div className="bg-[#d4d0c8] px-2 py-[2px] text-[12px] font-semibold border-b border-gray-500">
        {title}
      </div>

      {/* CONTENT */}
      <div className="p-2 bg-[#ece9d8]">
        {children}
      </div>
    </div>
  )
}
