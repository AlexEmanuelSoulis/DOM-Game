// === Sélections des éléments ===
const portalScreenElement = document.getElementById("screenPortal");
const gameScreenElement = document.querySelector("#screenGame");
const startButtonElement  = document.querySelector("#start");
const usernameInputElement = document.querySelector("#inputUsername");
const hudPlayerNameElement = document.querySelector("#hudName");
const hudTriesElement = document.querySelector("#hudScore");
const terminalFormElement = document.querySelector("#terminalInput");
const terminalInputElement = document.querySelector("#inputCommand");
const lastOutputLineElement= document.querySelector("#displayInput") ;
const terminalContainer =document.getElementById("terminal");
// Crée le conteneur d'historique s'il n'existe pas
let terminalOutputContainer = terminalContainer.querySelector("#terminalOutput");
if (!terminalOutputContainer) {
  terminalOutputContainer = document.createElement("div") ;
  terminalOutputContainer.id = "terminalOutput";
  terminalContainer.appendChild(terminalOutputContainer);
}
// === État du jeu ===
let startTriesCount = 0;
let currentDirectoryName = "root";
// === Système de fichiers (root) ===
const fileEnvName = ".env";
const fileSshName = ".ssh";
const fileConfigName = "config.json";
const fileReadmeName = "readme.md";
const fileNotesName = "notes.txt";
// === Dossiers (root) ===
const dirDocumentsName = "documents";
const dirDesktopName = "desktop";
const dirConfidentialName = "confidential";
const dirDownloadsName = "downloads";
// === /documents ===
const fileBudgetName = "budget.xlsx";
const fileReportName = "report.docx";
const filePresentationName = "presentation.pptx";
// === /desktop ===
const fileTodoName = "todo.txt";
const fileWallpaperName = "wallpaper.png";
// === /confidential ===
const fileSecretsName = "secrets.db";
const filePasswordsName = "passwords.csv" ;
const fileAdminHintName = "admin.txt"; // corrigé (pas "adminxt")

// === /downloads ===
const fileSetupName = "setup.exe";
const fileMovieName = "movie.mp4";
const fileArchiveName = "archive.zip" ;

// === Identifiants admin (cachés) ===
const adminUsernameValue = "#AD1000";
const adminPasswordValue = "A9!delta";
// === Répertoires valides ===
const validDirectoryList = ["root", "documents", "desktop", "confidential", "downloads"];
// === Utilitaires de terminal ===
function appendTerminalLine(textToPrint) {
  const lineElement = document.createElement("div");
  lineElement.className = "term-line";
  lineElement.textContent = textToPrint;
  terminalOutputContainer.appendChild(lineElement);

  lastOutputLineElement.textContent = textToPrint;
  terminalOutputContainer.scrollTop = terminalOutputContainer.scrollHeight;
}

function updatePromptForDirectory(directoryName) {
  terminalInputElement.setAttribute("placeholder", `(${directoryName}) enter command...`);
  terminalContainer.setAttribute("data-dir", directoryName);
}

//== Démarrage / bascule d’écran ===
startButtonElement.addEventListener("click", (clickEvent) => {
  clickEvent.preventDefault();

  const typedPlayerName = (usernameInputElement.value || "").trim();
  if (typedPlayerName.length < 3) {
    return;
  }
hudPlayerNameElement.textContent = `Welcome, ${typedPlayerName}`;
  startTriesCount += 1;
  hudTriesElement.textContent = `Number of tries: ${startTriesCount}`;
        portalScreenElement.classList.add("hidden");
gameScreenElement.classList.remove("hidden");

  localStorage.setItem("playerName", typedPlayerName);
  updatePromptForDirectory(currentDirectoryName)
  terminalInputElement.focus();
  
});
//  Soumission d'une commande 
terminalFormElement.addEventListener("submit", (submitEvent) => {
  submitEvent.preventDefault();
const savedPlayerName = (localStorage.getItem("playerName") || "user").trim();
  const rawCommandText = terminalInputElement.value.trim();
  if (!rawCommandText) {
    return;
  }
  appendTerminalLine(`$(${savedPlayerName}): ${rawCommandText}`);
  handleTerminalCommand(savedPlayerName, rawCommandText);

  terminalInputElement.value  = "";
  terminalInputElement.focus();
});

// === Routeur de commandes ===
function handleTerminalCommand(playerName, commandText) {
  const trimmed = commandText.trim();
  const startsWithSlash = trimmed.startsWith("/");
  const normalized = trimmed.toLowerCase();
  const withoutSlash = startsWithSlash ? normalized.slice(1).trim() : normalized;

  // Commande vide
  if (withoutSlash.length === 0) {
    appendTerminalLine("Type /help for commands");
    return;
  }

  // Commandes de sortie (facultatif)
  if (withoutSlash ==="exit" || withoutSlash === "quit") {
    appendTerminalLine("Exiting game...");
    gameScreenElement.classList.add("hidden");
    portalScreenElement.classList.remove("hidden");
    return;
  }

  // HELP
  if (withoutSlash ==="help") {
    appendTerminalLine("|--------------------------------");
    appendTerminalLine("> Commands:");
    appendTerminalLine(">  /help       - List commands");
    appendTerminalLine(">  /about      - About game");
    appendTerminalLine(">  /clear      - Clear terminal");
    appendTerminalLine(">  /ls         - List directory");
    appendTerminalLine(">  /cd <dir>   - Change dir");
    appendTerminalLine(">  /open <f>   - Open file");
    appendTerminalLine(">  /admin      - Admin login");
    appendTerminalLine("|--------------------------------");
    return;
  }
  // ABOUT
  if (withoutSlash === "about") {
    appendTerminalLine("HACK/IN — tiny DOM hacking game");
    return;
  }

//               CLEAR
  if (withoutSlash === "clear") {
    const allLines = terminalOutputContainer.querySelectorAll(".term-line");
    allLines.forEach((lineElement) => lineElement.remove());
    lastOutputLineElement.textContent = "";
    return;
  }//  /LS
  if (withoutSlash === "ls") {
    if (currentDirectoryName === "root") {
      appendTerminalLine("Root:");
      appendTerminalLine("  Files: " + [fileEnvName, fileSshName, fileConfigName, fileReadmeName, fileNotesName].join(", "));
      appendTerminalLine("  Folders: " + [dirDocumentsName, dirDesktopName, dirConfidentialName, dirDownloadsName].map((d) => d + "/").join(" "));
    } else if (currentDirectoryName === "documents") {
      appendTerminalLine("Documents: " + [fileBudgetName, fileReportName, filePresentationName].join(", "));
    } else if (currentDirectoryName === "desktop") {

      appendTerminalLine("Desktop: " + [fileTodoName, fileWallpaperName].join(", "));
    } else if (currentDirectoryName === "confidential") {
      appendTerminalLine("Confidential: " + [fileSecretsName, filePasswordsName, fileAdminHintName].join(", "));
    } else if (currentDirectoryName === "downloads") {
      appendTerminalLine("Downloads: " + 
        [fileSetupName, fileMovieName, fileArchiveName].join(", "));
    }
    return;
  }

  //CD
  if (withoutSlash.startsWith("cd ")) {
    const targetRaw = trimmed.slice(4).trim();
    const targetClean = targetRaw.replace(/\/+$/, "").toLowerCase();

    if (targetClean === ".." || targetClean === "root") {
      currentDirectoryName  = "root";
      updatePromptForDirectory("root");
      appendTerminalLine("Moved to root/");
      return;
    }
    if (validDirectoryList.includes(targetClean)) {
      currentDirectoryName = targetClean;
      updatePromptForDirectory(targetClean);
      appendTerminalLine(`Moved to ${targetClean}/`);
      return;
    }

    appendTerminalLine("No such directory: " + targetRaw);
    return;
  }
  // OPEN
  if (withoutSlash.startsWith("open ")) {
    const fileRaw = trimmed.slice(6).trim();

    // root
    if (fileRaw===fileEnvName) {
      appendTerminalLine("DB_HOST=127.0.0.1");
      appendTerminalLine("DB_USER=admin");
      appendTerminalLine("DB_PASSWORD=12345");
      return;
    }
    if (fileRaw=== fileSshName) {
      appendTerminalLine("ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCy...");
      return;
    }
    if (fileRaw=== fileConfigName) {
      appendTerminalLine("{ server: '127.0.0.1', port: 22 }");
      return;
    }

    if (fileRaw === fileReadmeName) {
      appendTerminalLine("Welcome to hacking mini-game!");
      return;
    }
    if (fileRaw ===fileNotesName) {
      appendTerminalLine("TODO: find hidden password... Check confidential/");
      return;
    }

    // documents
    if (fileRaw === fileBudgetName) {
      appendTerminalLine("Budget 2025: Revenues > Expenses!");
      return;
    }
    if (fileRaw === fileReportName) {
      appendTerminalLine("Q1 Report: profits increased by 12%");
      return;
    }
    if (fileRaw === filePresentationName) {
      appendTerminalLine("Slide 1: Title — Confidential Project");
      return;
    }

    // desktop
    if (fileRaw === fileTodoName) {
      appendTerminalLine("- Finish hacking game");
      appendTerminalLine("- Buy coffee");
      return;
    }
    if (fileRaw === fileWallpaperName) {
      appendTerminalLine("[IMAGE DATA: wallpaper.png]");
      return;
    }



    // confidential
    if (fileRaw === fileSecretsName) {
      appendTerminalLine("credentials.json");
      return;
    }
    if (fileRaw === filePasswordsName) {
      appendTerminalLine("username: " + adminUsernameValue);
      appendTerminalLine("password: " + adminPasswordValue);
      return;
    }
    if (fileRaw === fileAdminHintName) {
      appendTerminalLine("Hint: admin user is '" + adminUsernameValue + "'. Try /admin.");
      return;
    }



    // downloads
    if (fileRaw === fileSetupName) {
      appendTerminalLine("[binary content]");
      return;
    }
    if (fileRaw === fileMovieName) {
      appendTerminalLine("[video file]");
      return;
    }
    if (fileRaw === fileArchiveName) {
      appendTerminalLine("Archive: img1.jpg, doc2.pdf");
      return;
    }

    appendTerminalLine("File not found: " + fileRaw);
    return;


  }

  // ADMIN
  if (withoutSlash === "admin") {
    const typedAdminUsername = prompt("Admin username:");
    if (typedAdminUsername === null) {
      appendTerminalLine("Admin login cancelled.");
      return;
    }

    const typedAdminPassword = prompt("Admin password:");
    if (typedAdminPassword === null) {
      appendTerminalLine("Admin login cancelled.");
      return;
    }

    const isUsernameValid = typedAdminUsername.trim() === adminUsernameValue;
    const isPasswordValid = typedAdminPassword === adminPasswordValue;

    if (isUsernameValid && isPasswordValid) {
      alert("Access granted");
      appendTerminalLine("Admin panel unlocked. Welcome!");
    } else {
      alert("Access denied");
      appendTerminalLine("Invalid credentials.");
      startTriesCount++;
      alert('Number of tries: ' + startTriesCount);
      hudTriesElement.textContent = `Number of tries: ${startTriesCount}`;
      return;
    }
    return;
  }

  // Inconnu
  appendTerminalLine(`$(${playerName}): Unknown command "${commandText}"`);
  appendTerminalLine("Type /help");


  

}

