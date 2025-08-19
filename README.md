# HACK/IN – JavaScript Hacking Mini-Game

## Description
HACK/IN is a small hacking simulation game built with JavaScript, HTML, and CSS.  
The player interacts with a fake terminal, navigates through a simulated file system, opens files, finds hidden clues, and eventually gains access to the administrator account.  

The game runs entirely in the browser and demonstrates **DOM manipulation**, **event handling**, and **dynamic UI updates**.

---

## Features
- **Login screen** with player username.
- **Game screen** with terminal simulation.
- **Interactive terminal commands**:
  - `/help` → List available commands.
  - `/about` → About the game.
  - `/clear` → Clear the terminal output.
  - `/ls` → List files and folders in the current directory.
  - `/cd <dir>` → Change directory (`root`, `documents`, `desktop`, `confidential`, `downloads`).
  - `/open <file>` → Open a file and display its content.
  - `/admin` → Hidden admin login (credentials are hidden in the files).
- **Simulated file system**:
  - **root/** → `.env`, `.ssh`, `config.json`, `readme.md`, `notes.txt` + subfolders.
  - **documents/** → `budget.xlsx`, `report.docx`, `presentation.pptx`.
  - **desktop/** → `todo.txt`, `wallpaper.png`.
  - **confidential/** → `secrets.db`, `passwords.csv`, `admin.txt`.
  - **downloads/** → `setup.exe`, `movie.mp4`, `archive.zip`.
- **Clues system**:  
  Some files contain hints (`notes.txt`, `passwords.csv`, `admin.txt`) that reveal the hidden **admin username and password**.
- **Admin login popup**:  
  If the correct credentials are entered, the player unlocks the admin panel.
- **Player name storage** using `localStorage`.

---

## Project Structure
├── index.html # Main HTML file
├── style.css # Game styles
├── script.js # Game logic (DOM & commands)
├── README.md # Project documentation


---

## How to Play
1. Open `index.html` in your browser.
2. Enter your username on the start screen.
3. Use the terminal to explore:
   - Type `/help` to see available commands.
   - Use `/cd` and `/ls` to navigate directories.
   - Open files with `/open <filename>`.
4. Find the hidden credentials inside the **confidential/** folder.
5. Type `/admin` and enter the correct username and password to win.

---

##  Technologies Used
- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **DOM Manipulation**
- **LocalStorage API**

---

## License
This project is free to use for educational purposes.  
Created as a DOM manipulation practice project.
