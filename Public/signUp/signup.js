// signup.js
const form = document.getElementById("registrationForm");
const steps = Array.from(document.querySelectorAll(".step"));
let currentStep = 0;

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const countrySel = document.getElementById("countrySelect");
const stateSel = document.getElementById("stateSelect");

function showStep(index) {
  steps.forEach((step, i) => step.classList.toggle("active", i === index));
  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.style.display = index === steps.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = index === steps.length - 1 ? "inline-block" : "none";
}

nextBtn.onclick = () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
};

prevBtn.onclick = () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
};

async function fetchCountries() {
  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/flag/unicode");
    const data = await res.json();
    return data.data.map((c) => c.name).sort();
  } catch (err) {
    console.error("Error fetching countries:", err);
    return [];
  }
}

async function fetchStates(country) {
  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    });
    const data = await res.json();

    if (!data.data || !Array.isArray(data.data.states)) {
      console.warn("No states found or invalid format for:", country);
      return [];
    }

    return data.data.states.map((s) => s.name);
  } catch (err) {
    console.error("Error fetching states:", err);
    return [];
  }
}

async function populateCountries() {
  countrySel.innerHTML = '<option value="">Select Country</option>';
  const countries = await fetchCountries();
  countries.forEach((c) => {
    const opt = new Option(c, c);
    countrySel.add(opt);
  });
}

countrySel.addEventListener("change", async () => {
  const selectedCountry = countrySel.value;
  stateSel.innerHTML = '<option value="">Loading states...</option>';

  if (!selectedCountry) return;

  const states = await fetchStates(selectedCountry);
  stateSel.innerHTML = '<option value="">Select State</option>';

  if (states.length === 0) {
    stateSel.innerHTML += '<option disabled>No states found</option>';
  } else {
    states.forEach((s) => stateSel.add(new Option(s, s)));
  }
});

populateCountries();
showStep(currentStep);

document.getElementById("registrationForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Validate agreement to terms
  const agreeToTerms = form.querySelector("[name='agreeToTerms']");
  if (!agreeToTerms.checked) {
    showToast("You must agree to the Terms & Conditions.", "error");
    return;
  }
  formData.set("agreeToTerms", "true");

  // Sanitize password and phone number
  const password = formData.get("password")?.toString() || "";
  const phoneNumber = formData.get("phoneNumber")?.replace(/[^\d+]/g, "") || "";

  formData.set("password", password);
  formData.set("phoneNumber", phoneNumber);

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const response = await fetch("https://unlimitedfunds.onrender.com/api/v1/signup", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.description || "Form submission failed.");
    }

    const result = await response.json();
    console.log(result);

    showToast("Form submitted successfully!", "success");
    setTimeout(() => {
      window.location.href = "/accountcreated.html";
    }, 2000);
  } catch (error) {
    console.error("Submission error:", error);
    showToast(error.message, "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});

function showToast(message, type = "success") {
  const toastContainer =
    document.getElementById("toast-container") || createToastContainer();
  const toast = document.createElement("div");
  const progressBar = document.createElement("div");

  toast.className = `toast ${type === "success" ? "toast-success" : "toast-error"}`;
  toast.innerHTML = `
    <span class="toast-icon">
      ${type === "success"
        ? '<i class="fa-solid fa-check-circle"></i>'
        : '<i class="fa-solid fa-exclamation-circle"></i>'}
    </span>
    <span>${message}</span>
  `;

  progressBar.className = "toast-progress";
  progressBar.style.backgroundColor =
    type === "success" ? "rgba(0, 128, 0, 0.7)" : "rgba(220, 53, 69, 0.7)";

  toast.appendChild(progressBar);
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
    progressBar.style.width = "100%";
    setTimeout(() => {
      progressBar.style.width = "0%";
    }, 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }, 10);
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  document.body.appendChild(container);
  return container;
}
