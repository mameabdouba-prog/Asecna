const video = document.getElementById("bg-video");
const videoToggle = document.getElementById("video-toggle");

if (video && videoToggle) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reduceMotion.matches) {
    video.pause();
    videoToggle.textContent = "Lecture";
    videoToggle.setAttribute("aria-label", "Lire la vidéo");
  }

  videoToggle.addEventListener("click", () => {
    if (video.paused) {
      video.play().catch(() => {});
      videoToggle.textContent = "Pause";
      videoToggle.setAttribute("aria-label", "Mettre la vidéo en pause");
    } else {
      video.pause();
      videoToggle.textContent = "Lecture";
      videoToggle.setAttribute("aria-label", "Lire la vidéo");
    }
  });
}

const form = document.getElementById("login-form");

if (form) {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const status = document.getElementById("form-status");
  const submit = document.getElementById("login-submit");
  const togglePassword = document.getElementById("toggle-password");

  togglePassword.addEventListener("click", () => {
    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "Masquer" : "Afficher";
    togglePassword.setAttribute("aria-label", isPassword ? "Masquer le mot de passe" : "Afficher le mot de passe");
  });

  [email, password].forEach((input) => {
    input.addEventListener("input", () => {
      status.textContent = "";
      status.classList.remove("is-success");
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    const emailValue = email.value.trim();
    if (!emailValue) {
      emailError.textContent = "Saisissez votre adresse e-mail.";
      email.setAttribute("aria-invalid", "true");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      emailError.textContent = "Adresse e-mail invalide.";
      email.setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      emailError.textContent = "";
      email.removeAttribute("aria-invalid");
    }

    if (!password.value) {
      passwordError.textContent = "Saisissez votre mot de passe.";
      password.setAttribute("aria-invalid", "true");
      isValid = false;
    } else if (password.value.length < 8) {
      passwordError.textContent = "Le mot de passe doit contenir au moins 8 caractères.";
      password.setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      passwordError.textContent = "";
      password.removeAttribute("aria-invalid");
    }

    if (!isValid) {
      status.textContent = "";
      status.classList.remove("is-success");
      return;
    }

    status.textContent = "";
    status.classList.remove("is-success");
    submit.disabled = true;
    submit.textContent = "Connexion…";

    window.setTimeout(() => {
      submit.disabled = false;
      submit.textContent = "Se connecter";
      status.textContent = "Connexion simulée réussie. Branchez un service d'authentification pour un accès réel.";
      status.classList.add("is-success");
    }, 700);
  });
}
