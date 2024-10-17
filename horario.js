document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const days = Array.from(
      document.querySelectorAll('input[name="days"]:checked')
    ).map((input) => input.value);

    if (name && days.length && email) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);
      localStorage.setItem("availableDays", JSON.stringify(days));
      window.location.href = "calendario.html";
    } else {
      alert("Por favor, preencha seu nome, email e escolha ao menos um dia.");
    }
  });
