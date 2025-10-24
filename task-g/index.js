// index.js
// Author: Marius Pozo (after Ville Heikkiniemi)
// Date: 2025-10-24

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("addInfoForm");
  const table = document.getElementById("timetable").querySelector("tbody");
  const nameInput = document.getElementById("fullName");
  const mailInput = document.getElementById("email");
  const phoneInput = document.getElementById("tel");
  const DoBInput = document.getElementById("DoB");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = nameInput.value.trim();
    if (!fullName) return;
    const mail = mailInput.value.trim();

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

    const mailCell = document.createElement("td");
    mailCell.textContent = mail;
    row.appendChild(mailCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = validPhone;
    row.appendChild(phoneCell);

    const DoBCell = document.createElement("td");
    DoBCell.textContent = DoBInput.value;
    row.appendChild(DoBCell);

    table.appendChild(row);

    // Reset form and focus
    form.reset();
    courseInput.focus();
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
