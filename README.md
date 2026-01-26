# Habit Tracker with Calendar View

A browser-based habit tracking application with calendar interface, statistics tracking, dark mode, and data export/import capabilities. Built as part of the VET Interview Assessment.

## 🌐 Live Demo

**Deployed App:** https://midhat81.github.io/habit-tracker/

---

## 1. Project Choice

I chose **Project #3: The Habit Tracker with Calendar View** from the three available options.

**Reasoning:** Given the deadline of January 17, 2026, I selected this project because:
- It has the simplest data structure (habits and completion dates)
- Requires fewer complex features compared to the Kanban board (no drag-and-drop) or Markdown editor (no file management)
- Can be built as a single-page application with pure HTML/CSS/JavaScript
- LocalStorage API perfectly fits the requirement for browser-based data persistence
- Clear, achievable scope for a 3-day development timeline

---

## 2. Justification of Tools

### AI Tool: Claude (Sonnet 4.5)
- **Reasoning:** I chose Claude for its strong reasoning abilities in breaking down complex requirements into step-by-step implementation
- **Strengths:** Excellent at generating clean, well-structured code with proper commenting
- **Approach:** Used conversational prompting to build the project incrementally

### Technologies:
- **HTML5:** Semantic markup for accessibility and structure
- **CSS3:** Modern gradients, flexbox, and grid for responsive design without framework overhead
- **Vanilla JavaScript (ES6+):** No framework dependencies, lightweight and fast
- **LocalStorage API:** Perfect for client-side data persistence without backend complexity
- **File API:** For data export/import functionality
- **GitHub Pages:** Free, simple deployment directly from repository

### Why No Frameworks?
- Faster development for small project scope
- No build process or dependencies required
- Easier to understand and modify
- Meets all requirements without additional complexity

---

## 3. High-Level Approach

### Strategy: Iterative Conversational Prompting

I used a **chain of prompts** approach rather than a single prompt, breaking the project into logical steps:

1. **Project Planning** - Asked AI to analyze which project was shortest given deadline
2. **Project Structure** - Requested folder structure and setup commands
3. **Git Setup** - Step-by-step Git initialization and GitHub connection
4. **Incremental Development** - Built in sequence:
   - HTML structure first
   - CSS styling second
   - JavaScript functionality third
5. **Testing** - Verified all features worked correctly
6. **Deployment** - GitHub Pages setup
7. **Feature Enhancement** - Added advanced features:
   - Dark mode toggle
   - Data export/import
8. **Documentation** - Comprehensive README

### Logic Structure:
```
User Input → AI Guidance → Implementation → Testing → Next Step
```

This approach allowed me to:
- Verify each component before moving forward
- Catch errors early
- Understand each part of the codebase
- Adjust requirements as needed
- Add features incrementally without breaking existing functionality

---

## 4. Final Prompts

### Initial Planning Prompt:
```
Hi, can you guide me which project is shortest? You can see 1 select out of 3.
Deadline: January 17
Only first guide me then we have the next step.
```

### Structure Setup Prompt:
```
Okay, first folder structure please.
I am using Windows so PowerShell commands.
```

### Development Prompts (in sequence):
```
1. "Okay Git repo"
2. "Okay first HTML and then next step by step"
3. "Okay CSS"
4. "Okay" (for JavaScript)
5. "Okay test app and also I using VS Code to run"
6. "Yes it's running perfectly, now deployment"
```

### Feature Enhancement Prompts:
```
1. "can you access my github any features additional i can add"
2. "okay step by step - step 1" (Dark Mode implementation)
3. "okay now good any new feature?" (Export/Import implementation)
```

### Documentation Prompt:
```
[Provided assessment requirements for README sections]
In my docs this is.
update this also with all latest
```

**Key Prompt Engineering Insight:** I used simple, conversational prompts and let Claude guide the structure. This worked because:
- Claude understood context from previous messages
- Each step built on the last
- I could verify and test before proceeding
- Natural conversation flow prevented overwhelming complexity
- Incremental feature additions kept the project manageable

---

## 5. Instructions: How to Run This Project

### Option A: View Live Deployment
Simply visit: **https://midhat81.github.io/habit-tracker/**

### Option B: Run Locally

**Prerequisites:**
- Git installed
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Text editor (VS Code recommended)

**Steps:**

1. **Clone the Repository**
```powershell
git clone https://github.com/midhat81/habit-tracker.git
cd habit-tracker
```

2. **Open in VS Code (Optional)**
```powershell
code .
```

3. **Run the Application**

   **Method 1: Using Live Server (Recommended)**
   - Install "Live Server" extension in VS Code
   - Right-click `index.html`
   - Select "Open with Live Server"
   - App opens at `http://127.0.0.1:5500`

   **Method 2: Direct Browser Open**
```powershell
   Start-Process index.html
```
   Or simply double-click `index.html` in File Explorer

4. **Use the Application**
   - Add a habit using the input field
   - Click on a habit to select it
   - Click calendar days to mark completions (green = completed)
   - View statistics updating in real-time
   - Navigate months using arrow buttons
   - Toggle dark mode using sun/moon button (top-right)
   - Export your data for backup (📥 Export button)
   - Import previously exported data (📤 Import button)
   - All data persists in browser LocalStorage

### How to Reproduce Results:

1. **Test Habit Creation:**
   - Enter "Morning Exercise" → Click "Add Habit"
   - Habit appears in list

2. **Test Calendar Marking:**
   - Click on the habit you just created (turns purple)
   - Click on today's date in calendar (turns green)
   - Click yesterday's date (turns green)
   - "Current Streak" should show 2 days

3. **Test Data Persistence:**
   - Refresh page (F5)
   - All habits and completions remain

4. **Test Statistics:**
   - Mark 5 consecutive days
   - "Current Streak" = 5
   - "Total Completions" = 5
   - "This Month" shows percentage

5. **Test Dark Mode:**
   - Click the sun icon (☀️) in top-right corner
   - Interface switches to dark theme
   - Icon changes to moon (🌙)
   - Refresh page - theme preference is saved

6. **Test Export/Import:**
   - Click "📥 Export" button
   - JSON file downloads with timestamp
   - Delete a habit
   - Click "📤 Import" button
   - Select the downloaded file
   - Confirm import - deleted habit is restored

---

## 6. Challenges & Iterations

### Challenge 1: LocalStorage Restriction Awareness
**Problem:** Initial concern about browser storage limitations.

**Solution:** Researched LocalStorage API capabilities and confirmed it's perfect for this use case (5-10MB limit, more than sufficient for habit tracking data).

**Iteration:** No prompt changes needed, but clarified data structure early.

### Challenge 2: Calendar Date Calculation
**Problem:** Needed to correctly calculate days in month, handle month transitions, and display prev/next month days.

**Solution:** Asked Claude for complete calendar rendering logic with proper date handling.

**Iteration:** 
- Initial prompt: "Okay" (for JavaScript)
- Claude provided comprehensive date logic
- Tested edge cases (month boundaries, leap years)
- No revisions needed - worked first time

### Challenge 3: Streak Calculation Logic
**Problem:** Current streak vs. longest streak calculation can be complex with non-consecutive dates.

**Solution:** Reviewed Claude's algorithm for calculating streaks:
- Current streak: Count backward from today
- Longest streak: Iterate through sorted dates finding consecutive runs

**Iteration:** Original JavaScript implementation was correct, no changes needed.

### Challenge 4: Git Push Typo
**Problem:** Typed `git push origin mai` instead of `main`.

**Solution:** Simple correction to `git push origin main`.

**Learning:** Pay attention to command spelling, especially branch names.

### Challenge 5: Understanding Assessment Requirements
**Problem:** README requirements were detailed and specific.

**Solution:** Carefully structured README to match all 6 required sections.

**Iteration:** Asked Claude to format README according to exact assessment specifications.

### Challenge 6: CSS Not Loading
**Problem:** After adding dark mode, the page showed unstyled HTML because the CSS file only contained dark mode styles.

**Solution:** Realized the original base styles were accidentally removed. Claude provided the complete CSS file with both base styles and dark mode styles combined.

**Learning:** When adding features, ensure all existing code remains intact. Always use version control to track changes.

### Challenge 7: Feature Integration
**Problem:** Adding new features (dark mode, export/import) without breaking existing functionality.

**Solution:** Added features incrementally with clear separation in code (comment blocks). Tested each feature immediately after implementation.

**Iteration:** Step-by-step approach:
1. Added HTML elements
2. Added CSS styles
3. Added JavaScript functionality
4. Tested thoroughly before moving to next feature

---

## Features Implemented

✅ **Core Requirements:**
- Three-panel layout equivalent (habits list, calendar, statistics)
- Create and manage multiple habits
- Calendar grid for visual tracking
- Mark habits complete on specific dates
- Calculate and display statistics:
  - Current streak
  - Longest streak
  - Total completions
  - Monthly completion rate
- Browser-based local storage (LocalStorage API)

✅ **Additional Features:**
- Month navigation (previous/next)
- Today's date highlighting
- Visual feedback (hover effects, color coding)
- Delete habits functionality
- Responsive design for mobile/desktop
- Empty state messages
- Confirmation dialogs for destructive actions
- **Dark mode toggle** with persistence
- **Data export** as JSON with timestamp
- **Data import** with validation and confirmation
- Smooth theme transitions
- Accessible button labels

---

## Project Structure
```
habit-tracker/
├── index.html          # Main HTML structure with dark mode toggle & export/import UI
├── styles.css          # All styling including dark mode and responsive design
├── app.js              # Application logic, LocalStorage, dark mode, and data management
├── README.md           # This file
└── .gitignore         # Git ignore rules
```

---

## Technologies & APIs Used

- **HTML5** - Semantic structure, file input for imports
- **CSS3** - Gradients, flexbox, grid, animations, dark mode theming
- **JavaScript ES6+** - Arrow functions, template literals, destructuring, Blob API
- **LocalStorage API** - Client-side data persistence for habits and theme preference
- **File API** - Reading and writing JSON files for data backup/restore
- **Blob API** - Creating downloadable JSON files
- **Git & GitHub** - Version control
- **GitHub Pages** - Free hosting

---

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

**Minimum Requirements:** Any modern browser with LocalStorage support and File API (all browsers from 2015+)

---

## Future Enhancements (Out of Scope)

- Habit categories/tags with color coding
- Weekly/monthly view toggle
- Advanced statistics with charts (Chart.js integration)
- Habit reminders/notifications using Notification API
- Achievements/badges system for milestones
- Data backup to cloud storage
- Multi-user support with authentication
- Habit templates library
- Mobile PWA (Progressive Web App) version
- Keyboard shortcuts for power users

---

## License

This project was created for the VET Interview Assessment.

---

## Contact

**GitHub:** https://github.com/midhat81
**Repository:** https://github.com/midhat81/habit-tracker

---

## Acknowledgments

- Built with assistance from Claude (Anthropic)
- Assessment provided by VET Interview Team
- Deployed on GitHub Pages
- Dark mode and export/import features added through iterative development