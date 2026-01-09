/* ================= THEME TOGGLE ================= */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkToggle");
  if (!toggle) return;

  const isDark = localStorage.getItem("darkMode") === "on";
  document.body.classList.toggle("dark", isDark);

  toggle.innerHTML = isDark
    ? '<i data-lucide="sun"></i>'
    : '<i data-lucide="moon"></i>';

  lucide.createIcons();

  toggle.onclick = () => {
    document.body.classList.toggle("dark");
    const nowDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", nowDark ? "on" : "off");

    toggle.innerHTML = nowDark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    lucide.createIcons();
  };
});

/* ================= COMMON ================= */

function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

/* ================= LOGIN ================= */

function loginUser() {
  const identifier = document.getElementById("loginIdentifier").value;
  const password = document.getElementById("loginPassword").value;

  if (!identifier || !password) {
    alert("Please enter login details");
    return;
  }

  localStorage.setItem("gumasto_logged_in", "true");
  window.location.href = "../dashboard.html";
}

function continueAsGuest() {
  localStorage.removeItem("gumasto_logged_in");
  window.location.href = "../dashboard.html";
}

/* ================= SIGNUP ================= */

function signupUser() {
  const inputs = document.querySelectorAll("#signupForm input");
  let hasError = false;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add("input-error");
      hasError = true;
    } else {
      input.classList.remove("input-error");
    }
  });

  if (hasError) return;

  localStorage.setItem("gumasto_logged_in", "true");
  window.location.href = "../dashboard.html";
}

/* ================= RESET PASSWORD ================= */

function resetPassword() {
  localStorage.setItem("gumasto_logged_in", "true");
  window.location.href = "../dashboard.html";
}

/* ================================================= */
/* ================= OTP FLOW ====================== */
/* ================================================= */

const OTP_DURATION = 120; // 2 minutes
const MAX_ATTEMPTS = 5;

let otpSent = false;
let otpTimerInterval = null;

/* utils */
function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function attemptsKey() {
  return "otp_attempts_" + todayKey();
}

/* MAIN BUTTON */
function handleOtpAction() {
  const btn = document.getElementById("otpActionBtn");
  const input = document.getElementById("forgotIdentifier");

  let attempts = Number(localStorage.getItem(attemptsKey()) || 0);

  if (attempts >= MAX_ATTEMPTS) {
    alert("Too many attempts. Try again tomorrow.");
    btn.disabled = true;
    return;
  }

  /* SEND / RESEND */
  if (!otpSent) {
    if (!input.value.trim()) {
      input.classList.add("input-error");
      return;
    }
    input.classList.remove("input-error");

    localStorage.setItem("gumasto_otp", "123456"); // demo
    otpSent = true;

    btn.textContent = "Verify OTP";
    btn.disabled = true;

    document.getElementById("otpSection").style.display = "block";
    document.getElementById("otpError").classList.remove("show");

    clearOtpInputs();
    setOtpInputsDisabled(false);
    startOtpTimer();

    alert("OTP sent (demo): 123456");
    return;
  }

  /* VERIFY */
  verifyOtp();
}

/* TIMER */
function startOtpTimer() {
  let remaining = OTP_DURATION;
  const timerEl = document.getElementById("otpTimer");

  clearInterval(otpTimerInterval);

  timerEl.style.display = "block";
  timerEl.style.color = "";
  timerEl.textContent = formatTime(remaining);

  otpTimerInterval = setInterval(() => {
    remaining--;
    timerEl.textContent = formatTime(remaining);

    if (remaining <= 0) {
      clearInterval(otpTimerInterval);
      timerEl.textContent = "OTP expired";
      timerEl.style.color = "#dc2626";

      otpSent = false;
      setOtpInputsDisabled(true);

      const btn = document.getElementById("otpActionBtn");
      btn.textContent = "Resend OTP";
      btn.disabled = false;
    }
  }, 1000);
}

function formatTime(sec) {
  return `OTP expires in ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

/* VERIFY OTP */
function verifyOtp() {
  const enteredOtp = [...document.querySelectorAll(".otp-inputs input")]
    .map(i => i.value).join("");

  const savedOtp = localStorage.getItem("gumasto_otp");

  let attempts = Number(localStorage.getItem(attemptsKey()) || 0);

  if (enteredOtp !== savedOtp) {
    attempts++;
    localStorage.setItem(attemptsKey(), attempts);

    document.getElementById("otpError").classList.add("show");

    clearInterval(otpTimerInterval);
    clearOtpInputs();
    setOtpInputsDisabled(true);

    otpSent = false;

    const btn = document.getElementById("otpActionBtn");
    btn.textContent = "Resend OTP";
    btn.disabled = false;

    if (attempts >= MAX_ATTEMPTS) {
      alert("Too many failed attempts. Try again tomorrow.");
      btn.disabled = true;
    }
    return;
  }

  clearInterval(otpTimerInterval);
  window.location.href = "../auth/reset-password.html";
}

/* INPUT UX */
document.addEventListener("input", e => {
  if (!e.target.parentElement?.classList.contains("otp-inputs")) return;

  if (e.target.value && e.target.nextElementSibling) {
    e.target.nextElementSibling.focus();
  }

  const allFilled = [...document.querySelectorAll(".otp-inputs input")]
    .every(i => i.value.length === 1);

  document.getElementById("otpActionBtn").disabled = !allFilled;
});

/* HELPERS */
function clearOtpInputs() {
  document.querySelectorAll(".otp-inputs input").forEach(i => (i.value = ""));
}

function setOtpInputsDisabled(disabled) {
  document.querySelectorAll(".otp-inputs input")
    .forEach(i => (i.disabled = disabled));
}

/* ENABLE SEND OTP WHEN EMAIL ENTERED */
document.getElementById("forgotIdentifier")?.addEventListener("input", e => {
  if (!otpSent) {
    document.getElementById("otpActionBtn").disabled = !e.target.value.trim();
  }
});

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  otpSent = false;
  clearOtpInputs();
  setOtpInputsDisabled(true);
});