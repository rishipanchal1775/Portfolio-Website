# My Portfolio Website

I built this portfolio as an interactive desktop inspired by Windows XP. I wanted to present my background, resume, projects, skills, and contact information in a more personal way than a standard portfolio page. I am a BCA graduate moving toward DevOps and cloud engineering, and this website lets visitors explore my work through familiar desktop-style apps and windows.

The project is a responsive, browser-based single-page application. We can use it with a mouse, keyboard, or touch screen. The desktop experience is the main interface: each portfolio section opens in its own movable window.

## How we can use the website

### Login screen

We enter the demo password shown on the login screen: `password123`. We can press Enter or select the arrow button. The website displays a short loading sequence before opening the desktop. If we enter a different password, it shows an error. This is a visual portfolio feature; the password is in the front-end code and does not protect private information.

### Desktop and windows

We open an app by double-clicking its desktop icon. On a touch screen, we tap the icon twice. We can also focus an icon with the keyboard and press Enter or Space.

After opening an app, we can:

- Drag its window by the title bar.
- Resize it by dragging an edge or corner.
- Minimize, maximize, restore, or close it with the title-bar buttons.
- Select its taskbar button to bring it forward, or restore it if it is minimized.
- Keep several app windows open at the same time.

The taskbar displays the current time and date. Open windows and their positions are saved in the current browser tab's session.

### Start menu

We select **Start** to see my profile and the **Turn Off Computer** option. Selecting it plays the shutdown sequence and returns us to the login screen. The Start menu's Internet and E-mail entries are visual placeholders and do not open apps.

### Apps

- **Resume:** We can read my summary, education, project highlights, skills, and languages. **Download PDF** downloads my resume. The LinkedIn, GitHub, and Portfolio links open my profiles and website.
- **Projects:** We can browse project names, descriptions, categories, sizes, and dates. We double-click a project on a computer, or tap it on a touch screen, to open its link.
- **Skills:** We can browse my technologies and experience highlights. The Projects and Contact shortcuts open those apps in their own desktop windows.
- **Contact:** The Contact Information tab shows my email, phone number, and profile links. The Send Message tab contains a form. The sidebar can open my Resume or Projects app, and its quick actions can open the resume or message form.
- **Terminal:** We type a command at the `C:\Rishi>` prompt and press Enter. The `help` command lists the available commands. We can use `open resume` (or `open projects`, `open skills`, `open contact`, `open terminal`, or `open notepad`) to open an app; `dir` to list apps; `date` and `whoami` for basic information; `download` to download my resume; and `clear` or `cls` to clear the terminal. Other commands are `joke`, `fortune`, `ascii`, `matrix`, `hacker`, `weather [city]`, `music`, `calc [expression]`, `flip`, `roll`, and `motivate`. For example, `weather London` looks up London's current weather, and `calc (2 + 3) * 4` calculates an expression. The calculator supports basic arithmetic, decimals, parentheses, and unary plus or minus.
- **Notepad:** We can edit the sample cover letter, start a new note, generate a cover letter, and view character, word, and line counts. Open, Save, and Save As use the browser's file picker and require a browser that supports the File System Access API, such as Chrome or Edge.

Some parts recreate the Windows XP look but are display-only: these include the Start menu's Internet and E-mail entries, system tray icons, and some menu and toolbar labels inside the apps.

## Technology and platform

I built the site with **JavaScript and React JSX**. It runs in a modern web browser as a responsive single-page application, with mouse, keyboard, and touch interactions. There is no separate application server or database in this project.

I use **React 19** and **React DOM** for the interface, **Vite** for the front-end build tooling, **Tailwind CSS 4** for most styling, and **Zustand** for shared window state. I use a small amount of custom CSS for animations and shared styles.

## Libraries and development tools

These are the libraries and tools included in the project:

- **react** and **react-dom**: build and render the interface.
- **zustand**: manage shared desktop and window state.
- **tailwindcss** and **@tailwindcss/vite**: style components and connect Tailwind to Vite.
- **vite** and **@vitejs/plugin-react**: provide front-end development and production build tooling.
- **postcss** and **autoprefixer**: CSS processing tools.
- **lucide-react**: provide the show and hide password icons.
- **eslint**, **@eslint/js**, **eslint-plugin-react-hooks**, **eslint-plugin-react-refresh**, and **globals**: check JavaScript and React code.
- **@types/react** and **@types/react-dom**: provide React type definitions for editor tooling. The application is JavaScript, not TypeScript.

## APIs and browser features

- **Web3Forms API:** The Contact form sends a POST request to `https://api.web3forms.com/submit`. It expects `VITE_WEB3FORMS_ACCESS_KEY` to be configured in the website's environment. Sending a message requires an internet connection.
- **JokeAPI:** The Terminal's `joke` command requests a single programming joke from `https://v2.jokeapi.dev`.
- **Open-Meteo Geocoding and Forecast APIs:** The Terminal's `weather` command searches for a city and requests its current weather. These requests require an internet connection.
- **Fetch API:** The Contact form and Terminal use the browser's `fetch` function to make requests to the external services above.
- **Web Storage API (`sessionStorage`):** The window store saves open-window state for the current browser session.
- **File System Access API:** Notepad uses `showOpenFilePicker`, `showSaveFilePicker`, and writable file handles to open and save text files. Support varies by browser; Chrome and Edge support these controls.
- **HTML Audio API (`Audio`):** The login and shutdown sequences and Terminal music use audio files stored with the website.
- **Pointer Events and `matchMedia`:** Pointer events let us drag and resize windows. `matchMedia` lets the desktop icons and project list respond to touch input.
- **Browser date and time formatting:** The taskbar formats the current time and date with JavaScript locale methods.

The joke and weather commands use online services, and music uses local files included with the site. The Contact form needs the Web3Forms access key to submit messages.

## File structure

```text
Portfolio-Website-main/
├── index.html                      # Browser document and React mount point
├── README.md                       # Project explanation and visitor manual
├── .gitignore                      # Files excluded from version control
├── package.json                    # Project dependencies and package scripts
├── package-lock.json               # Locked dependency versions
├── vite.config.js                  # Vite, React, and Tailwind plugin setup
├── eslint.config.js                # ESLint configuration
├── public/
│   ├── icons/                      # Desktop, window, login, and tray images
│   ├── music/                      # Login, shutdown, and Terminal audio
│   ├── wallpapers/                 # Login and desktop backgrounds
│   ├── resume.pdf                  # Downloadable resume
│   └── website.png                 # Website image asset
└── src/
    ├── App.jsx                     # Login, loading, desktop, and shutdown stages
    ├── main.jsx                    # React entry point and global CSS import
    ├── index.css                   # Tailwind import, shared button style, animations
    ├── assets/
    │   └── hero.png                # Image asset
    ├── apps/
    │   ├── appComponents.js        # Maps app IDs to React components
    │   ├── Contact.jsx             # Contact information and message form
    │   ├── Notepad.jsx             # Editable note and browser file operations
    │   ├── Projects.jsx            # Project browser interface
    │   ├── Resume.jsx              # Resume interface
    │   ├── Skills.jsx              # Skills and experience interface
    │   └── Terminal.jsx            # Terminal prompt and command output
    ├── components/
    │   ├── Auth/Login.jsx          # Password screen
    │   ├── Desktop/
    │   │   ├── Desktop.jsx         # Desktop background and main layout
    │   │   └── DesktopIcons.jsx    # Desktop app icon list
    │   ├── Icons/DesktopIcon.jsx   # Selecting and opening an app icon
    │   ├── Taskbar/
    │   │   ├── StartMenu.jsx       # Start menu and shutdown action
    │   │   └── Taskbar.jsx         # Open windows, clock, and system tray
    │   └── Window/
    │       ├── Window.jsx          # Window controls, dragging, and resizing
    │       └── WindowManager.jsx  # Creates windows for open apps
    ├── data/
    │   ├── apps.js                 # App IDs, names, icons, and lookup helpers
    │   ├── contact.js              # Contact details, tabs, navigation, and form labels
    │   ├── profile.js              # Shared name, title, contact details, and profile links
    │   ├── projects.js              # Project names and details
    │   ├── resume.js                # Resume summary, education, projects, and skills
    │   └── skills.js                # Technologies and experience highlights
    ├── store/
    │   └── windowStore.js          # Shared window state and session persistence
    └── utils/
        ├── calculate.js            # Arithmetic expression parser for the Terminal
        ├── terminalCommands.js     # Terminal commands and external API requests
        └── windowGeometry.js       # Window position and resize calculations
```

I keep app details separate from their React components. `src/data/apps.js` contains app metadata, while `src/apps/appComponents.js` maps those app IDs to components. This separation lets one app look up another without importing the component registry.
