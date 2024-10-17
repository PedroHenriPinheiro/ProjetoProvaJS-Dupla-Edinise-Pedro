document.addEventListener("DOMContentLoaded", function () {
  const meetings = JSON.parse(localStorage.getItem("meetings")) || [];

  const meetingList = document.getElementById("meetingList");
  if (meetings.length > 0) {
    meetings.forEach((meeting) => {
      const li = document.createElement("li");
      li.textContent = `Reunião em: ${meeting}`;
      meetingList.appendChild(li);
    });
  } else {
    meetingList.textContent = "Nenhuma reunião agendada.";
  }
});
