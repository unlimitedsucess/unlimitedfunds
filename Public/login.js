document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate inputs
    if (!email || !password) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    // Show spinner and disable the submit button
    const submitBtn = document.getElementById("login-btn");
    const submitText = document.getElementById("submit-text");
    const spinner = document.getElementById("spinner");
    submitText.textContent = "login..";
    spinner.classList.remove("hidden");
    submitBtn.disabled = true;

    // During form submission
    submitText.hidden = true; // Hide the text
    spinner.hidden = false; // Show the spinner
    submitBtn.disabled = true; // Disable the button

    try {
      // Prepare the request body
      const requestBody = {
        email: email,
        password: password,
      };

      // Debugging: Log the request details
      console.log(
        "Sending request to:",
        "https://unlimitedfunds.onrender.com/api/v1/signin"
      );
      console.log("Request body:", JSON.stringify(requestBody));

      // Send the request to the API
      const response = await fetch(
        "https://unlimitedfunds.onrender.com/api/v1/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        console.log("Error Response:", errorData);
        throw new Error(
          errorData.description ||
            "Login failed. Please check your credentials."
        );
      }

      // Parse the successful response
      const data = await response.json();
      console.log("Login successful:", data.data);

      localStorage.setItem("authToken", data.data.token); 

      // Show success toast with progress bar
      showToast("Login successful! Redirecting...", "success", 3000);

      // Redirect or handle successful login
      setTimeout(() => {
        window.location.href = "/dashboard.html"; // Example redirect
      }, 3000); // Redirect after 5 seconds
    } catch (error) {
      console.error("Error:", error);
      
    
      // Show error toast with progress bar
      showToast(
        error.message ||
          "Login failed. Please check your credentials and try again.",
        "error",
        3000
      );
      setTimeout(() => {
        window.location.href = "/accountPending.html";
      }, 2000); // Small delay for smooth transition
  
    } finally {
      // Hide spinner and re-enable the submit button
      submitText.textContent = "Login";
      document.getElementById("login-btn").style.backgroundColor= "green"
      spinner.hidden = true; // Hide the spinner
      submitBtn.disabled = false
      spinner.classList.add("hidden");
      submitText.hidden = false;
    }
  });

// Function to show toast with progress bar
function showToast(message, type = "success") {
  const toastContainer =
    document.getElementById("toast-container") || createToastContainer();
  const toast = document.createElement("div");
  const progressBar = document.createElement("div");

  // Apply type-specific styles
  const toastTypeClass = type === "success" ? "toast-success" : "toast-error";

  // Set toast class and content
  toast.className = `toast ${toastTypeClass}`;
  toast.innerHTML = `
      <span class="toast-icon"> ${
        type === "success"
          ? '<i class="fa-solid fa-check-circle"></i>'
          : '<i class="fa-solid fa-exclamation-circle"></i>'
      }</span>
      <span>${message}</span>
    `;

  // Configure progress bar
  progressBar.className = "toast-progress";
  toast.appendChild(progressBar);
  toastContainer.appendChild(toast);

  // Trigger reflow to enable CSS transitions
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Animate progress bar
  progressBar.style.width = "100%"; // Start at 100%
  setTimeout(() => {
    progressBar.style.width = "0%"; // Animate to 0%
  }, 10);

  // Remove toast after animation completes
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300); // Wait for fade-out animation
  }, 3000); // Toast duration
}

// Helper function to create the toast container if it doesn't exist
function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  document.body.appendChild(container);
  return container;
}
