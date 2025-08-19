const screenPortal = document.querySelector("#screenPortal");
const screenGame   = document.querySelector("#screenGame");
const startBtn     = document.querySelector("#start");
const inputName    = document.querySelector("#inputUsername");
const hudName      = document.querySelector("#hudName");
const hudScore     = document.querySelector("#hudScore");

const termForm     = document.querySelector("#terminalInput");
const cmdInput     = document.querySelector("#inputCommand");
const displayLine  = document.querySelector("#displayInput");

let tries = 0;
let currentDir = "root";

const envFile = ".env";
const sshFile = ".ssh";
const configFile = "config.json";
const readmeFile = "readme.md";
const notesFile = "notes.txt";

const documentsFolder = "documents/";
const desktopFolder = "desktop/";
const confidentialFolder = "confidential/";
const downloadsFolder = "downloads/";

const budgetFile = "budget.xlsx";
const reportFile = "report.docx";
const presentationFile = "presentation.pptx";

const todoFile = "todo.txt";
const wallpaperFile = "wallpaper.png";

const secretsFile = "secrets.db";
const passwordsFile = "passwords.csv";
const adminHintFile = "admin.txt";

const setupFile = "setup.exe";
const movieFile = "movie.mp4";
const archiveFile = "archive.zip";

const ADMIN_USER = "#AD1000";
const ADMIN_PASS = "A9!delta";

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = (inputName.value || "").trim();
  if (name.length < 3) return;

  hudName.textContent = `Welcome, ${name}`;
  tries += 1;
  hudScore.textContent = `Number of tries: ${tries}`;
  screenPortal.classList.add("hidden");
  screenGame.classList.remove("hidden");
  localStorage.setItem("playerName", name);
  cmdInput.focus();
});

termForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = (localStorage.getItem("playerName") || "user").trim();
  const cmd = cmdInput.value.trim();
  if (!cmd) return;
  handleCommand(name, cmd);
  cmdInput.value = "";
  cmdInput.focus();
});

function handleCommand(name, cmd) {
  const normalizedCmd = cmd.toLowerCase();

  if (normalizedCmd === "/help" || normalizedCmd === "help") {
    displayLine.textContent =
`Commands:
  /help            - List available commands
  /about           - About this game
  /clear           - Clear the terminal
  /ls              - List items in current directory
  /cd <dir|..>     - Change directory (documents, desktop, confidential, downloads, root, ..)
  /open <file>     - Open a file (e.g. .env, config.json, secrets.db)
  /admin           - Admin login (requires credentials hidden in files)`;
    return;
  }

  if (normalizedCmd === "/about" || normalizedCmd === "about") {
    displayLine.textContent = "HACK/IN — tiny DOM hacking game. Type /help to begin.";
    return;
  }

  if (normalizedCmd === "/clear" || normalizedCmd === "clear") {
    displayLine.textContent = "";
    return;
  }

  if (normalizedCmd === "/ls") {
    if (currentDir === "root") {
      displayLine.textContent =
        `Root:\n ${envFile}, ${sshFile}, ${configFile}, ${readmeFile}, ${notesFile}\n` +
        `Folders: ${documentsFolder}, ${desktopFolder}, ${confidentialFolder}, ${downloadsFolder}`;
    }
    if (currentDir === "documents") {
      displayLine.textContent = `Documents:\n ${budgetFile}, ${reportFile}, ${presentationFile}`;
    }
    if (currentDir === "desktop") {
      displayLine.textContent = `Desktop:\n ${todoFile}, ${wallpaperFile}`;
    }
    if (currentDir === "confidential") {
      displayLine.textContent = `Confidential:\n ${secretsFile}, ${passwordsFile}, ${adminHintFile}`;
    }
    if (currentDir === "downloads") {
      displayLine.textContent = `Downloads:\n ${setupFile}, ${movieFile}, ${archiveFile}`;
    }
    return;
  }

  if (normalizedCmd.startsWith("/cd ")) {
    const targetRaw = cmd.slice(4).trim();
    const target = targetRaw.replace(/\/+$/,'').toLowerCase();

    if (target === "root") currentDir = "root";
    else if (target === "documents") currentDir = "documents";
    else if (target === "desktop") currentDir = "desktop";
    else if (target === "confidential") currentDir = "confidential";
    else if (target === "downloads") currentDir = "downloads";
    else if (target === "..") currentDir = "root";
    else displayLine.textContent = `No such directory: ${targetRaw}`;
    return;
  }

  if (normalizedCmd.startsWith("/open ")) {
    const file = cmd.slice(6).trim();

    if (file === envFile) displayLine.textContent = "DB_HOST=127.0.0.1\nDB_USER=admin\nDB_PASSWORD=12345";
    else if (file === sshFile) displayLine.textContent = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCy...";
    else if (file === configFile) displayLine.textContent = "{\n  \"server\": \"127.0.0.1\",\n  \"port\": 22\n}";
    else if (file === readmeFile) displayLine.textContent = "Welcome to the hacking mini-game!";
    else if (file === notesFile) displayLine.textContent = "TODO: find the hidden password... Check confidential/";
    else if (file === adminHintFile) displayLine.textContent = "Admin hint: user is '#AD1000'. Try /admin.";
    else if (file === budgetFile) displayLine.textContent = "Budget 2025: Revenues > Expenses!";
    else if (file === reportFile) displayLine.textContent = "Q1 Report: profits increased by 12%";
    else if (file === presentationFile) displayLine.textContent = "Slide 1: Title — Confidential Project";
    else if (file === todoFile) displayLine.textContent = "- Finish hacking game\n- Buy coffee";
    else if (file === wallpaperFile) displayLine.textContent = "[IMAGE DATA: wallpaper.png]";
    else if (file === secretsFile) displayLine.textContent = "credentials.json";
    else if (file === passwordsFile) displayLine.textContent = "username: #AD1000\npassword: A9!delta";
    else if (file === setupFile) displayLine.textContent = "[Executable binary content]";
    else if (file === movieFile) displayLine.textContent = "[Video file: movie.mp4]";
    else if (file === archiveFile) displayLine.textContent = "Archive contains: [img1.jpg, doc2.pdf]";
    else displayLine.textContent = `File not found: ${file}`;
    return;
  }

  if (normalizedCmd === "/admin") {
    const u = prompt("Admin username:");
    if (u === null) { displayLine.textContent = "Admin login cancelled."; return; }
    const p = prompt("Admin password:");
    if (p === null) { displayLine.textContent = "Admin login cancelled."; return; }

    if (u.trim() === ADMIN_USER && p === ADMIN_PASS) {
      alert("Access granted");
      displayLine.textContent = "Admin panel unlocked. Welcome!";
    } else {
      alert("Access denied");
      displayLine.textContent = "Invalid credentials.";
    }
    return;
  }

  displayLine.textContent = `$(${name}): Unknown command "${cmd}"\nType /help`;
}


function setTimer() {
  tries += 1;
  hudScore.textContent = `Number of tries: ${tries}`;
  setTimeout(setTimer, 60000 * 15);
}
setTimer();