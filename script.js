// Get elements from the page
const form = document.getElementById('entry-form');
const nameInput = document.getElementById('assignment-name');
const gradeInput = document.getElementById('assignment-grade');
const gpaDisplay = document.getElementById('gpa-value');
const entriesList = document.getElementById('entries-list');

// Store assignments
let assignments = [];

// Handle form submission
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const grade = parseFloat(gradeInput.value);

   // Validate input
  if (!name || isNaN(grade) || grade < 0 || grade > 5) {
    alert('Please enter a valid assignment name and a grade between 0 and 5.');
    return;
  }

  // Add assignment
  assignments.push({ name, grade });

  // Update page and storage
  renderEntries();
  calculateGPA();
  saveAssignments();

  // Clear input fields
  nameInput.value = '';
  gradeInput.value = '';
});

// Display assignments
function renderEntries() {
  entriesList.innerHTML = '';
  assignments.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = `${entry.name}: ${entry.grade}`;
    entriesList.appendChild(li);
  });
}

// Calculate and display GPA
function calculateGPA() {
  if (assignments.length === 0) {
    gpaDisplay.textContent = '—';
    return;
  }

  const total = assignments.reduce((sum, entry) => sum + entry.grade, 0);
  const gpa = total / assignments.length;
  gpaDisplay.textContent = gpa.toFixed(2);
}

// Save assignments to localStorage
function saveAssignments() {
  localStorage.setItem('assignments', JSON.stringify(assignments));
}

// Load assignments on page load
window.addEventListener('load', () => {
  const saved = localStorage.getItem('assignments');
  if (saved) {
    assignments = JSON.parse(saved);
    renderEntries();
    calculateGPA();
  }
});

// Log assignments when "S" is pressed
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 's') {
    console.log('All Assignments:', assignments);
  }
});

