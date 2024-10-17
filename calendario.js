document.addEventListener("DOMContentLoaded", function () {
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const availableDays = JSON.parse(localStorage.getItem("availableDays"));

  if (!userName || !availableDays) {
    alert("Por favor, insira seu nome e disponibilidade primeiro.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("greeting").textContent = `Olá, ${userName}!`;

  const availableDaysDiv = document.getElementById("availableDays");

  availableDays.forEach((day) => {
    const dayBtn = document.createElement("button");
    dayBtn.textContent = day;
    dayBtn.classList.add("day-button");
    availableDaysDiv.appendChild(dayBtn);

    dayBtn.addEventListener("click", function () {
      const allButtons = document.querySelectorAll(".day-button");
      allButtons.forEach((btn) => btn.classList.remove("selected"));

      dayBtn.classList.add("selected");

      localStorage.setItem("selectedDay", day);
    });
  });

  document
    .getElementById("scheduleMeeting")
    .addEventListener("click", function () {
      const selectedDay = localStorage.getItem("selectedDay");
      const meetingTime = document.getElementById("meetingTime").value;

      if (selectedDay && meetingTime) {
        const meetingDate = `${selectedDay}, ${meetingTime}`;
        const meetings = JSON.parse(localStorage.getItem("meetings")) || [];
        meetings.push(meetingDate);
        localStorage.setItem("meetings", JSON.stringify(meetings));

        const token = "YOUR_MAILERSEND_API_TOKEN";
        const recipientEmail = "recipient@email.com";

        const emailData = {
          from: {
            email: "info@domain.com",
          },
          to: [
            {
              email: recipientEmail,
            },
          ],
          subject: "Confirmação de Agendamento",
          text: `Olá ${userName}, você agendou uma reunião para ${meetingDate}.`,
          html: `<p>Olá <strong>${userName}</strong>, você agendou uma reunião para <strong>${meetingDate}</strong>.</p>`,
        };

        fetch("https://api.mailersend.com/v1/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(emailData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Email enviado com sucesso:", data);
            alert(
              `Reunião agendada para ${meetingDate} e e-mail de confirmação enviado.`
            );
            window.location.href = "meetings.html";
          })
          .catch((error) => {
            console.error("Erro ao enviar o e-mail:", error);
            alert("Ocorreu um erro ao enviar o e-mail de confirmação.");
          });
      } else {
        alert("Por favor, selecione um dia e horário.");
      }
    });
});
