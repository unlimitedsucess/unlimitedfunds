  document.addEventListener("DOMContentLoaded", function () {
    const toggleIcon = document.getElementById("toggle-password");
    const passwordInput = document.getElementById("password");

    if (toggleIcon && passwordInput) {
      toggleIcon.style.cursor = "pointer";

      toggleIcon.addEventListener("click", function () {
        const isHidden = passwordInput.type === "password";
        passwordInput.type = isHidden ? "text" : "password";

        // Swap icon class
        if (toggleIcon.classList.contains("feather-eye")) {
          toggleIcon.classList.remove("feather-eye");
          toggleIcon.classList.add("feather-eye-off");
        } else {
          toggleIcon.classList.remove("feather-eye-off");
          toggleIcon.classList.add("feather-eye");
        }
      });
    }
  });

  // Form submit handler
  document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;

    if (!email || !password) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    const submitBtn = document.getElementById("login-btn");
    const submitText = document.getElementById("submit-text");
    const spinner = document.getElementById("spinner");

    submitText.textContent = "Login...";
    spinner.classList.remove("hidden");
    submitBtn.disabled = true;
    submitText.hidden = true;
    spinner.hidden = false;

    try {
      const requestBody = { email, password };

      const response = await fetch("https://unlimitedfunds.onrender.com/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Error Response:", data);

        const errorMessage = data.description || "Login failed.";

        if (
          errorMessage.toLowerCase().includes("not approved") ||
          errorMessage.toLowerCase().includes("pending")
        ) {
          window.location.href = "/accountPending.html";
          return;
        }

        throw new Error(errorMessage);
      }

      console.log("Login successful:", data.data);
      localStorage.setItem("authToken", data.data.token);

      showToast("Login successful! Redirecting...", "success", 3000);
      setTimeout(() => {
        window.location.href = "user/dashboard.html";
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      showToast(
        error.message || "Login failed. Please check your credentials and try again.",
        "error",
        3000
      );
    } finally {
      submitText.textContent = "Login";
      submitText.hidden = false;
      spinner.hidden = true;
      submitBtn.disabled = false;
      spinner.classList.add("hidden");
      submitBtn.style.backgroundColor = "green";
    }
  });

  // Toast notification function
  function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container") || createToastContainer();
    const toast = document.createElement("div");
    const progressBar = document.createElement("div");

    const toastTypeClass = type === "success" ? "toast-success" : "toast-error";

    toast.className = `toast ${toastTypeClass}`;
    toast.innerHTML = `
      <span class="toast-icon"> ${
        type === "success"
          ? '<i class="fa-solid fa-check-circle"></i>'
          : '<i class="fa-solid fa-exclamation-circle"></i>'
      }</span>
      <span>${message}</span>
    `;

    progressBar.className = "toast-progress";
    toast.appendChild(progressBar);
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    progressBar.style.width = "100%";
    setTimeout(() => {
      progressBar.style.width = "0%";
    }, 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Helper to create toast container
  function createToastContainer() {
    const container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
    return container;
  }
