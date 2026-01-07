function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

/* LOGIN */
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

/* GUEST */
function continueAsGuest() {
  localStorage.removeItem("gumasto_logged_in");
  window.location.href = "../dashboard.html";
}

/* PASSWORD MATCH VALIDATION (LIVE) */
function validatePasswordMatch(passId, confirmId, errorId, btnId) {
  const pass = document.getElementById(passId);
  const confirm = document.getElementById(confirmId);
  const error = document.getElementById(errorId);
  const btn = document.getElementById(btnId);

  if (!pass.value || !confirm.value) {
    btn.disabled = true;
    return;
  }

  if (pass.value !== confirm.value) {
    pass.classList.add("input-error");
    confirm.classList.add("input-error");
    error.classList.add("show");
    btn.disabled = true;
  } else {
    pass.classList.remove("input-error");
    confirm.classList.remove("input-error");
    error.classList.remove("show");
    btn.disabled = false;
  }
}

/* SIGN UP */
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

/* FORGOT PASSWORD */
function goReset() {
  const input = document.getElementById("forgotIdentifier");

  if (!input.value.trim()) {
    input.classList.add("input-error");
    return;
  }

  input.classList.remove("input-error");
  window.location.href = "../auth/reset-password.html";
}

/* RESET PASSWORD */
function resetPassword() {
  localStorage.setItem("gumasto_logged_in", "true");
  window.location.href = "../dashboard.html";
}
