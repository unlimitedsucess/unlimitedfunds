function validateStep(currentStep, nextStep) {
  let isValid = true;
  const inputs = document.querySelectorAll(`#step${currentStep} input`);
  inputs.forEach((input) => {
    const errorSpan = document.getElementById(input.id + "Error");
    if (!input.value.trim()) {
      input.classList.add("error");
      errorSpan.textContent = "This field is required";
      isValid = false;
    } else {
      input.classList.remove("error");
      errorSpan.textContent = "";
    }

    // Email validation
    if (input.type === "email" && input.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value)) {
        input.classList.add("error");
        errorSpan.textContent = "Enter a valid email address";
        isValid = false;
      }
    }
  });
  if (isValid) nextStepForm(currentStep, nextStep);
}

function nextStepForm(currentStep, nextStep) {
  document.getElementById(`step${currentStep}`).classList.remove("active");
  document.getElementById(`step${nextStep}`).classList.add("active");
  updateProgressBar(nextStep);
}

function prevStep(prev) {
  document.querySelector(".active").classList.remove("active");
  document.getElementById(`step${prev}`).classList.add("active");
  updateProgressBar(prev);
}

function updateProgressBar(step) {
  const progress = document.getElementById("progress");
  const stepCount = 2; // Update if more steps are added
  progress.style.width = `${(step / stepCount) * 100}%`;
}

document
  .getElementById("multiStepForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

function previewImage(event) {
  const input = event.target;
  const file = input.files[0];

  if (!file) {
    console.error("No file selected");
    return;
  }

  // Validate that the file is an image
  if (!file.type.startsWith("image/")) {
    console.error("Invalid type specified for image preview");
    alert("Please upload a valid image file (JPEG, PNG, etc.).");
    input.value = ""; // Reset the input field
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    let previewId = input.id === "proofOfAddress" ? "preview" : "preview2";
    const imgPreview = document.getElementById(previewId);

    imgPreview.src = e.target.result;
    imgPreview.style.display = "block"; // Make image visible
    imgPreview.dataset.visible = "true"; // Store state in dataset

    imgPreview.onclick = function () {
      toggleImage(imgPreview);
    };
  };

  reader.readAsDataURL(file);
}

// Function to toggle image visibility (used for Reset button)
function toggleImage(image) {
  if (image.dataset.visible === "true") {
    image.style.display = "none";
    image.dataset.visible = "false";
  } else {
    image.style.display = "block";
    image.dataset.visible = "true";
  }
}

// Function for Reset button to toggle visibility instead of clearing
function resetImage(previewId) {
  const imgPreview = document.getElementById(previewId);
  toggleImage(imgPreview); // Just toggle visibility
}

document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password-input");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const pinInput = document.getElementById("pin-input");
  const confirmPinInput = document.getElementById("confirm-pin");

  const passwordError = document.getElementById("password-inputError");
  const confirmPasswordError = document.getElementById("confirm-passwordError");
  const pinError = document.getElementById("pin-inputError");
  const confirmPinError = document.getElementById("confirm-pinError");

  const passwordToggle = document.getElementById("eye-icon");
  const confirmPasswordToggle = document.getElementById("eye-icon2");
  const pinToggle = document.getElementById("eye-icon3");
  const confirmPinToggle = document.getElementById("eye-icon4");

  // Regex patterns
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const pinRegex = /^\d{4}$/; // Exactly 4 digits

  function validatePassword(input, errorElement) {
    if (!passwordRegex.test(input.value)) {
      errorElement.textContent =
        "Password must be at least 8 characters, include a number, a capital letter, and a special character.";
      input.style.border = "2px solid red";
      return false;
    } else {
      errorElement.textContent = "";
      input.style.border = "2px solid green";
      return true;
    }
  }

  function validatePin(input, errorElement) {
    if (!pinRegex.test(input.value)) {
      errorElement.textContent = "PIN must be exactly 4 numbers.";
      input.style.border = "2px solid red";
      return false;
    } else {
      errorElement.textContent = "";
      input.style.border = "2px solid green";
      return true;
    }
  }

  function matchInputs(input1, input2, errorElement, type = "password") {
    if (input1.value !== input2.value) {
      errorElement.textContent = `${type} does not match!`;
      input2.style.border = "2px solid red";
      return false;
    } else {
      errorElement.textContent = "";
      input2.style.border = "2px solid green";
      return true;
    }
  }

  // Input listeners
  passwordInput.addEventListener("input", () =>
    validatePassword(passwordInput, passwordError)
  );

  confirmPasswordInput.addEventListener("input", () =>
    matchInputs(
      passwordInput,
      confirmPasswordInput,
      confirmPasswordError,
      "Password"
    )
  );

  pinInput.addEventListener("input", () => validatePin(pinInput, pinError));
  confirmPinInput.addEventListener("input", () =>
    matchInputs(pinInput, confirmPinInput, confirmPinError, "PIN")
  );

  // Toggle password & PIN visibility
  function toggleVisibility(input, icon) {
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  }

  passwordToggle.addEventListener("click", () =>
    toggleVisibility(passwordInput, passwordToggle)
  );
  confirmPasswordToggle.addEventListener("click", () =>
    toggleVisibility(confirmPasswordInput, confirmPasswordToggle)
  );
  pinToggle.addEventListener("click", () =>
    toggleVisibility(pinInput, pinToggle)
  );
  confirmPinToggle.addEventListener("click", () =>
    toggleVisibility(confirmPinInput, confirmPinToggle)
  );
});

const phoneNumberInput = document.getElementById("phone-number");
const dropdown = document.getElementById("dropdown");

// Default country code (US +1)
let currentCountryCode = "+1";
phoneNumberInput.value = currentCountryCode + " "; // Ensure default formatting

// Show dropdown when input is focused
phoneNumberInput.addEventListener("focus", () => {
  dropdown.style.display = "block"; // Show dropdown
});

// Hide dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest(".phone-input-container")) {
    dropdown.style.display = "none"; // Close dropdown when clicking outside
  }
});

// Update input value when dropdown option is clicked
dropdown.addEventListener("click", (event) => {
  const targetDiv = event.target.closest("div");

  if (targetDiv && targetDiv.dataset.value) {
    // Extract only the "+XX" part (country code) using regex
    const match = targetDiv.dataset.value.match(/\+\d+/);

    if (match) {
      currentCountryCode = match[0]; // Store only "+XX"
    }

    // Update input field with correct format
    phoneNumberInput.value = currentCountryCode + " ";
    phoneNumberInput.focus(); // Keep focus on input for user typing
    dropdown.style.display = "none"; // Hide dropdown after selection
  }
});

// Allow users to type phone number after the country code
phoneNumberInput.addEventListener("input", () => {
  let currentValue = phoneNumberInput.value.trim();

  // Ensure phone number starts with the selected country code
  if (!currentValue.startsWith(currentCountryCode)) {
    phoneNumberInput.value =
      currentCountryCode + currentValue.replace(/^\+\d+\s*/, ""); // Remove any incorrect country code
  }
});

// Ensure the country code remains present when the input loses focus
phoneNumberInput.addEventListener("blur", () => {
  let currentValue = phoneNumberInput.value.trim();

  // Only restore the country code if input is empty
  if (!currentValue.startsWith(currentCountryCode)) {
    phoneNumberInput.value = currentCountryCode + " ";
  }
});

// for currency
// const currencyInput = document.getElementById("currency-input");
// const currencydropdown = document.getElementById("currency");

// // Default currency symbol
// let currentCurrencySymbol = "$";

// // Show dropdown when input is focused
// currencyInput.addEventListener("focus", () => {
//   currencydropdown.style.display = "block";
// });

// // Hide dropdown when clicking outside
// document.addEventListener("click", (event) => {
//   if (!event.target.closest(".currency-input-container")) {
//     currencydropdown.style.display = "none";
//   }
// });

// // Update input value when dropdown option is clicked
// currencydropdown.addEventListener("click", (event) => {
//   const targetDiv = event.target.closest("div");
//   if (targetDiv && targetDiv.dataset.symbol) {
//     currentCurrencySymbol = targetDiv.dataset.symbol;
//     currencyInput.value = `${currentCurrencySymbol} `;
//     currencydropdown.style.display = "none";
//   }
// });

// // Ensure input always starts with the currency symbol
// currencyInput.addEventListener("input", () => {
//   const currentValue = currencyInput.value;
//   if (!currentValue.startsWith(currentCurrencySymbol)) {
//     currencyInput.value =
//       `${currentCurrencySymbol} ` +
//       currentValue.replace(currentCurrencySymbol, "").replace(/[^0-9.]/g, "");
//   } else {
//     // Remove invalid characters
//     const numericValue = currentValue
//       .replace(currentCurrencySymbol, "")
//       .replace(/[^0-9.]/g, "");
//     currencyInput.value = `${currentCurrencySymbol} ${numericValue}`;
//   }
// });

// // Restore currency symbol if input is cleared
// currencyInput.addEventListener("blur", () => {
//   if (
//     !currencyInput.value.trim() ||
//     currencyInput.value === `${currentCurrencySymbol} `
//   ) {
//     currencyInput.value = `${currentCurrencySymbol} `;
//   }
// });
// Show toast notifications for success or error

document
  .getElementById("multiStepForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById("multiStepForm");
    const formData = new FormData(form); // Collect form data

    // Show spinner and disable button while submitting
    const submitBtn = document.getElementById("submit-btn");
    const submitText = document.getElementById("submit-text");
    const spinner = document.getElementById("spinner");
    submitText.textContent = "Submitting...";
    spinner.classList.remove("hidden");
    submitBtn.disabled = true;

    // Validate the checkbox (Agree to terms)
    const agreeToTerms = document.getElementById("agreeToTerms");

    if (!agreeToTerms.checked) {
      document.getElementById("termsError").textContent =
        "You must agree to the Terms & Conditions.";
      // Reset button state
      submitText.textContent = "Submit";
      spinner.classList.add("hidden");
      submitBtn.disabled = false;
      return; // Stop form submission
    } else {
      document.getElementById("termsError").textContent = ""; // Clear error
      formData.set("agreeToTerms", agreeToTerms.checked ? "true" : "false"); // Append as string
    }

    // Validate password (ensure it's a string)
    let password = formData.get("password");
    if (typeof password !== "string") {
      password = String(password); // Convert to string
    }
    formData.set("password", password);

    // Process phone number if necessary
    let phoneNumber = formData.get("phoneNumber");
    if (phoneNumber) {
      phoneNumber = phoneNumber.replace(/^[^\d+]*\+/, "+").trim(); // Clean up phone number
      formData.set("phoneNumber", phoneNumber);
    }

    try {
      // Send the data to the API
      const response = await fetch(
        "https://unlimitedfunds.onrender.com/api/v1/signup", // Replace with your API endpoint
        {
          method: "POST",
          body: formData, // Send FormData
        }
      );
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        showToast("Error Response:", errorData);
        throw new Error(
          errorData.description ||
            "form submission fail please check your details."
        );
      }
      const data = await response.json(); // Parse response as JSON

      console.log(data);
        showToast("Form submitted successfully!", "success"); // Green success toast
      
        setTimeout(() => {
          window.location.href = "/accountcreated.html";
        }, 2000); // Small delay for smooth transition
    
      } catch (error) {
      console.error("Error:", error);
      showToast("Something went wrong! Please try again.", "error"); // Show error in red
    } finally {
      // Reset button state
      submitText.textContent = "Submit";
      spinner.classList.add("hidden");
      submitBtn.disabled = false;
    }
  });

// Show toast notifications for success or error
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

  // Configure progress bar with dynamic color
  progressBar.className = "toast-progress";
  progressBar.style.backgroundColor =
    type === "success" ? "rgba(0, 128, 0, 0.7)" : "rgba(220, 53, 69, 0.7)"; // Green for success, Red for error

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
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  document.body.appendChild(container);
  return container;
}
