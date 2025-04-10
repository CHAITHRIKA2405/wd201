document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#userTable tbody");

  function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  function loadUsers() {
    tableBody.innerHTML = "";
    const users = getUsers();
    users.forEach(user => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.termsAccepted ? 'true' : 'false'}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  function isValidAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 && age <= 55;
  }

  function isValidEmail(email) {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(email);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const termsAccepted = document.getElementById("terms").checked;

    if (!isValidEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!isValidAge(dob)) {
      alert("You must be between 18 and 55 years old.");
      return;
    }

    const user = { name, email, password, dob, termsAccepted };
    saveUser(user);
    loadUsers();
    form.reset();
  });

  loadUsers(); // Load existing users on page load
});
