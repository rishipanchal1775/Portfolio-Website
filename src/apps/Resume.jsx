export default function Resume() {
  return (
    <div className="overflow-y-auto bg-[#ECE9D8] p-3 text-black text-[12px]">

      {/* HEADER */}
      <div className="mb-3">
        <h1 className="text-[20px] font-bold text-blue-800">
          Rishi Panchal
        </h1>

        <p className="text-[13px] text-blue-700">
          Web Developer
        </p>

        <p className="text-[11px] text-gray-700">
          Maharaja Sayajirao University, Vadodara, Gujarat
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
          <a href="mailto:panchal.rishi1700@gmail.com" className="text-blue-700 underline ml-1">
            panchal.rishi1700@gmail.com
          </a>
          {" • "}
          📱 +91-9313386032
        </p>

        <p className="text-[11px] mt-1">
          🔗{" "}
          <a 
            href="https://www.linkedin.com/in/rishi-panchal"
            target="_blank"
            className="text-blue-700 underline"
          >
            LinkedIn
          </a>

          {" • "} 

          💻{" "}
          <a 
            href="https://github.com/rishipanchal1775"
            target="_blank"
            className="text-blue-700 underline"
          >
            GitHub
          </a>

          {" • "} 

          🌐{" "}
          <a 
            href="https://your-portfolio.com"
            target="_blank"
            className="text-blue-700 underline"
          >
            Portfolio
          </a>
        </p>
      </div>

      {/* ABOUT */}
      <Section title="About Me">
        <p className="mb-1">
          Motivated and creative BCA student with a strong interest in full-stack development.
        </p>

        <ul className="list-disc ml-4 space-y-[2px]">
          <li>Quick learner and dedicated</li>
          <li>Eager to take on challenges</li>
          <li>Seeking internship opportunities</li>
          <li>Interested in real-world projects</li>
        </ul>
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        <p className="font-semibold">
          Maharaja Sayajirao University, Vadodara
        </p>
        <p className="text-[11px]">
          Bachelor of Computer Application (2023 - 2026)
        </p>
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">

        <div className="mb-2">
          <p className="font-semibold">Employee Management System</p>

          <ul className="list-disc ml-4 text-[11px]">
            <li>Admin & Employee dashboard</li>
            <li>Authentication system</li>
            <li>Task management</li>
          </ul>

          <p className="text-[10px] mt-1">
            🔗{" "}
            <a 
              href="https://github.com/rishipanchal1775"
              target="_blank"
              className="text-blue-700 underline"
            >
              View Project
            </a>
          </p>
        </div>

        <div>
          <p className="font-semibold">SteadFast.ai (In Progress)</p>

          <ul className="list-disc ml-4 text-[11px]">
            <li>MERN AI SaaS app</li>
            <li>Clerk authentication</li>
            <li>AI tools (blog, image, resume)</li>
          </ul>

          <p className="text-[10px] mt-1">
            🔗{" "}
            <a 
              href="https://github.com/rishipanchal1775"
              target="_blank"
              className="text-blue-700 underline"
            >
              View Project
            </a>
          </p>
        </div>

      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <div className="grid grid-cols-2 gap-2 text-[11px]">

          <div>
            <p className="font-semibold">Web:</p>
            <p>MERN, HTML, CSS, JS</p>

            <p className="font-semibold mt-1">Database:</p>
            <p>MongoDB, MySQL</p>
          </div>

          <div>
            <p className="font-semibold">Tools:</p>
            <p>Next.js, Tailwind, Git</p>
          </div>

        </div>
      </Section>

      {/* ADDITIONAL */}
      <Section title="Additional">
        <p className="text-[11px]">
          Languages: English, Hindi, Gujarati
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