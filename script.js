// =========================
// COUNTDOWN
// =========================

const targetDate = new Date("2026-10-17T17:00:00+05:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const difference = targetDate - now;

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (difference <= 0) {
    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    return;
  }

  days.textContent = String(
    Math.floor(difference / (1000 * 60 * 60 * 24))
  ).padStart(2, "0");

  hours.textContent = String(
    Math.floor((difference / (1000 * 60 * 60)) % 24)
  ).padStart(2, "0");

  minutes.textContent = String(
    Math.floor((difference / (1000 * 60)) % 60)
  ).padStart(2, "0");

  seconds.textContent = String(
    Math.floor((difference / 1000) % 60)
  ).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// =========================
// SCROLL ANIMATION
// =========================

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  reveals.forEach((element) => {
    observer.observe(element);
  });
} else {
  reveals.forEach((element) => {
    element.classList.add("visible");
  });
}


// =========================
// RSVP → GOOGLE SHEETS
// =========================

const form = document.getElementById("rsvpForm");
const success = document.getElementById("success");

const googleScriptURL =
  "https://script.google.com/macros/s/AKfycbzRBWYFMh3Ly0hDF8iY_I2eV_fBXf6EH_54q2yx10ccstaaDq-Osd9Nj-tRL9-ksYufRA/exec";

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const attendance = document.querySelector(
      'input[name="attendance"]:checked'
    );

    if (!name || !attendance) {
      return;
    }

    const button = form.querySelector("button");

    button.disabled = true;
    button.textContent = "Жіберілуде...";

    const data = new URLSearchParams();

    data.append("name", name);
    data.append("attendance", attendance.value);

    try {
      await fetch(googleScriptURL, {
        method: "POST",
        body: data
      });

      success.textContent =
        `Рақмет, ${name}! Жауабыңыз қабылданды. 🤍`;

      success.classList.add("show");

      button.textContent = "Жіберілді ✓";

    } catch (error) {
      console.error(error);

      button.disabled = false;
      button.textContent = "Жіберу";

      alert("Қате орын алды. Қайтадан көріңіз.");
    }

    // =========================
// MUSIC
// =========================

const musicButton = document.getElementById("musicButton");
const music = document.getElementById("backgroundMusic");

if (musicButton && music) {
  music.volume = 0.5;

  musicButton.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicButton.textContent = "Ⅱ";
      } catch (error) {
        console.error("Музыка не запустилась:", error);
      }
    } else {
      music.pause();
      musicButton.textContent = "♪";
    }
  });
}
  });
}
