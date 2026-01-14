// State Management
let habits = [];
let selectedHabitId = null;
let currentDate = new Date();
let completions = {}; // Format: { habitId: { 'YYYY-MM-DD': true } }

// DOM Elements
const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');
const calendar = document.getElementById('calendar');
const currentMonthEl = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const statsContainer = document.getElementById('statsContainer');

// Initialize App
function init() {
    loadData();
    renderHabits();
    renderCalendar();
    renderStats();
    attachEventListeners();
}

// Event Listeners
function attachEventListeners() {
    addHabitBtn.addEventListener('click', addHabit);
    habitInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addHabit();
    });
    prevMonthBtn.addEventListener('click', () => changeMonth(-1));
    nextMonthBtn.addEventListener('click', () => changeMonth(1));
}

// Add New Habit
function addHabit() {
    const habitName = habitInput.value.trim();
    if (!habitName) {
        alert('Please enter a habit name');
        return;
    }

    const newHabit = {
        id: Date.now().toString(),
        name: habitName,
        createdAt: new Date().toISOString()
    };

    habits.push(newHabit);
    habitInput.value = '';
    
    saveData();
    renderHabits();
    renderStats();
}

// Delete Habit
function deleteHabit(habitId) {
    if (confirm('Are you sure you want to delete this habit?')) {
        habits = habits.filter(h => h.id !== habitId);
        delete completions[habitId];
        
        if (selectedHabitId === habitId) {
            selectedHabitId = null;
        }
        
        saveData();
        renderHabits();
        renderCalendar();
        renderStats();
    }
}

// Select Habit
function selectHabit(habitId) {
    selectedHabitId = habitId;
    renderHabits();
    renderCalendar();
    renderStats();
}

// Render Habits List
function renderHabits() {
    if (habits.length === 0) {
        habitList.innerHTML = '<div class="empty-state">No habits yet. Add your first habit above!</div>';
        return;
    }

    habitList.innerHTML = habits.map(habit => `
        <li class="habit-item ${selectedHabitId === habit.id ? 'selected' : ''}" 
            onclick="selectHabit('${habit.id}')">
            <span class="habit-name">${habit.name}</span>
            <button class="delete-btn" onclick="event.stopPropagation(); deleteHabit('${habit.id}')">
                Delete
            </button>
        </li>
    `).join('');
}

// Calendar Functions
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonthEl.textContent = `${monthNames[month]} ${year}`;

    // Get calendar data
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Build calendar HTML
    let calendarHTML = '';
    
    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        calendarHTML += `<div class="calendar-day day-header">${day}</div>`;
    });

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        calendarHTML += `<div class="calendar-day other-month">${day}</div>`;
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = today.getDate() === day && 
                       today.getMonth() === month && 
                       today.getFullYear() === year;
        const isCompleted = selectedHabitId && 
                          completions[selectedHabitId] && 
                          completions[selectedHabitId][dateStr];
        
        const classes = ['calendar-day'];
        if (isToday) classes.push('today');
        if (isCompleted) classes.push('completed');
        
        calendarHTML += `
            <div class="${classes.join(' ')}" 
                 onclick="toggleCompletion('${dateStr}')"
                 title="${isCompleted ? 'Completed' : 'Not completed'}">
                ${day}
            </div>`;
    }

    // Next month days
    const totalCells = 42; // 6 rows × 7 days
    const cellsUsed = firstDay + daysInMonth;
    const nextMonthDays = totalCells - cellsUsed;
    
    for (let day = 1; day <= nextMonthDays; day++) {
        calendarHTML += `<div class="calendar-day other-month">${day}</div>`;
    }

    calendar.innerHTML = calendarHTML;
}

// Toggle Completion
function toggleCompletion(dateStr) {
    if (!selectedHabitId) {
        alert('Please select a habit first');
        return;
    }

    if (!completions[selectedHabitId]) {
        completions[selectedHabitId] = {};
    }

    if (completions[selectedHabitId][dateStr]) {
        delete completions[selectedHabitId][dateStr];
    } else {
        completions[selectedHabitId][dateStr] = true;
    }

    saveData();
    renderCalendar();
    renderStats();
}

// Calculate Statistics
function calculateStats(habitId) {
    if (!habitId || !completions[habitId]) {
        return { currentStreak: 0, longestStreak: 0, totalCompletions: 0, monthlyRate: 0 };
    }

    const dates = Object.keys(completions[habitId]).sort();
    const totalCompletions = dates.length;

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    let checkDate = new Date(today);
    
    while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (completions[habitId][dateStr]) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate = null;

    dates.forEach(dateStr => {
        const currentDate = new Date(dateStr);
        
        if (lastDate) {
            const diffDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                tempStreak++;
            } else {
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 1;
            }
        } else {
            tempStreak = 1;
        }
        
        lastDate = currentDate;
    });
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate monthly completion rate
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let monthlyCompletions = 0;
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (completions[habitId][dateStr]) {
            monthlyCompletions++;
        }
    }
    
    const monthlyRate = Math.round((monthlyCompletions / daysInMonth) * 100);

    return { currentStreak, longestStreak, totalCompletions, monthlyRate };
}

// Render Statistics
function renderStats() {
    if (!selectedHabitId) {
        statsContainer.innerHTML = '<div class="empty-state">Select a habit to view statistics</div>';
        return;
    }

    const stats = calculateStats(selectedHabitId);
    const selectedHabit = habits.find(h => h.id === selectedHabitId);

    statsContainer.innerHTML = `
        <div class="stat-card">
            <h3>Current Streak</h3>
            <div class="stat-value">${stats.currentStreak}</div>
            <div class="stat-label">days in a row</div>
        </div>
        <div class="stat-card">
            <h3>Longest Streak</h3>
            <div class="stat-value">${stats.longestStreak}</div>
            <div class="stat-label">days</div>
        </div>
        <div class="stat-card">
            <h3>Total Completions</h3>
            <div class="stat-value">${stats.totalCompletions}</div>
            <div class="stat-label">times completed</div>
        </div>
        <div class="stat-card">
            <h3>This Month</h3>
            <div class="stat-value">${stats.monthlyRate}%</div>
            <div class="stat-label">completion rate</div>
        </div>
    `;
}

// Local Storage Functions
function saveData() {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('completions', JSON.stringify(completions));
    localStorage.setItem('selectedHabitId', selectedHabitId || '');
}

function loadData() {
    const savedHabits = localStorage.getItem('habits');
    const savedCompletions = localStorage.getItem('completions');
    const savedSelectedId = localStorage.getItem('selectedHabitId');

    if (savedHabits) habits = JSON.parse(savedHabits);
    if (savedCompletions) completions = JSON.parse(savedCompletions);
    if (savedSelectedId) selectedHabitId = savedSelectedId || null;
}

// Start the app
init();