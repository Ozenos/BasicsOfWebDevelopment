// index.js
// Author: Marius Pozo (after Ville Heikkiniemi)
// Date: 2025-10-24

document.addEventListener("DOMContentLoaded", () => {
  const CHECK = '✅';
  const CROSS = '❌';

  const form = document.getElementById("addInfoForm");
  const table = document.getElementById("timetable").querySelector("tbody");

  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("tel");
  const DoBInput = document.getElementById("dob");
  const termsInput = document.getElementById("terms");

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const DoBError = document.getElementById('dob-error');

  // Name input check
  function validateName(submit) {
    const value = nameInput.value.trim(); // remove spaces at start/end
    const namePattern = /^[A-Za-z\s]+$/; // only letters and spaces

    if (value === '') {
      if (submit === 1) nameError.textContent = 'Name is required.';
    } else if (!namePattern.test(value)) {
      nameError.textContent = 'Name can only contain letters and spaces.';
    } else if (value.length < 2) {
      nameError.textContent = 'Name must be at least 2 characters.';
    } else {
      nameError.textContent = ''; // clear error
    }
  }
  nameInput.addEventListener('blur', () => validateName(0));

  // Email input check
  function validateEmail(submit) {
    const value = emailInput.value;
    if (!value.includes('@') && (value.trim() || submit == 1)) {
      emailError.textContent = 'Please enter a valid email address.';
    } else {
      emailError.textContent = ''; // clears the error
    }
  }
  emailInput.addEventListener('blur', () => validateEmail(0));

  // Date input check
  function validateDate() {
    const dateInput = document.getElementById('dob');
    const dateError = document.getElementById('dob-error');
    const value = dateInput.value;

    if (!value) {
      dateError.textContent = 'Date of birth is required.';
      return;
    }

    const enteredDate = new Date(value);
    const today = new Date();

    // Check for invalid date format
    if (isNaN(enteredDate.getTime())) {
      dateError.textContent = 'Please enter a valid date.';
      return;
    }

    // Check for unrealistic old date
    const oldestAllowed = new Date('1900-01-01');
    if (enteredDate < oldestAllowed) {
      dateError.textContent = 'Date is too far in the past.';
      return;
    }

    // Calculate age
    let age = today.getFullYear() - enteredDate.getFullYear();
    const monthDiff = today.getMonth() - enteredDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < enteredDate.getDate())) {
      age--;
    }

    if (age < 18) {
      dateError.textContent = 'You must be at least 18 years old.';
    } else {
      dateError.textContent = ''; // clear error
    }
  }
  DoBInput.addEventListener('blur', validateDate);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateDate();
    validateEmail(1);
    validateName(1);

    // Check for any active error messages
    const errors = document.querySelectorAll('.error-message');
    let hasError = false;

    errors.forEach(error => {
      if (error.textContent.trim() !== '') {
        hasError = true;
      }
    });

    if (hasError) {
      event.preventDefault(); // stops form submission
      return;
    }

    const fullName = nameInput.value.trim();
    const email = emailInput.value.trim();

    const phone = phoneInput.value.trim();
    const phonePattern = /^[+]?[\d\s\-()]{6,20}$/;
    // If the phone number field is filled in but does not match the format → it is not displayed
    let validPhone = "";
    if (phone && phonePattern.test(phone)) validPhone = phone;

    // Create new table row
    const row = document.createElement("tr");

    const timeCell = document.createElement("td");
    timeCell.textContent = getCustomTimestamp();
    row.appendChild(timeCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = fullName;
    row.appendChild(nameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = email;
    row.appendChild(emailCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = validPhone;
    row.appendChild(phoneCell);

    const DoBCell = document.createElement("td");
    DoBCell.textContent = DoBInput.value;
    row.appendChild(DoBCell);

    const TermsCell = document.createElement("td");
    TermsCell.textContent = termsInput.value;
    row.appendChild(TermsCell);

    table.appendChild(row);

    // Reset form and focus
    form.reset();
  });
});

function getCustomTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // mois de 01 à 12
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}