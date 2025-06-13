document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const steps = Array.from(document.querySelectorAll(".step"));
  let currentStep = 0;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const countrySel = document.getElementById("countrySelect");
  const stateSel = document.getElementById("stateSelect");
  const phoneInput = document.querySelector('input[name="phoneNumber"]');

  function showStep(index) {
    steps.forEach((step, i) => step.classList.toggle("active", i === index));
    prevBtn.style.display = index === 0 ? "none" : "inline-block";
    nextBtn.style.display = index === steps.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = index === steps.length - 1 ? "inline-block" : "none";
  }
  showStep(currentStep);

  nextBtn.onclick = () => {
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    }
  };
  prevBtn.onclick = () => {
    currentStep--;
    showStep(currentStep);
  };

  async function fetchCountries() {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd");
      const json = await res.json();

      if (!Array.isArray(json)) {
        console.error("Unexpected countries response format:", json);
        return [];
      }

      return json.map(c => {
        const root = c.idd?.root || "";
        const suffix = (c.idd?.suffixes && c.idd.suffixes.length > 0) ? c.idd.suffixes[0] : "";
        return {
          name: c.name?.common || "Unknown",
          code: root + suffix
        };
      }).filter(c => c.code).sort((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
      console.error("Error fetching countries:", err.message || err);
      return [];
    }
  }

  async function populateCountries() {
    countrySel.innerHTML = '<option value="">Select Country</option>';
    const countries = await fetchCountries();

    countries.forEach((c) => {
      const opt = new Option(c.name, c.name);
      if (c.code) opt.dataset.code = c.code;
      countrySel.add(opt);
    });
  }

  async function fetchStates(country) {
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      return Array.isArray(data.data?.states) ? data.data.states.map(s => s.name) : [];
    } catch (err) {
      console.error("Error fetching states:", err.message || err);
      return [];
    }
  }

  countrySel.addEventListener("change", async () => {
    const selectedCountry = countrySel.value;
    const selectedOption = countrySel.options[countrySel.selectedIndex];
    const dialCode = selectedOption.dataset.code;

    if (dialCode && phoneInput) {
      // Replace if empty or not already a full international number
      if (!phoneInput.value || !phoneInput.value.startsWith("+")) {
        phoneInput.value = dialCode;
      }
    }

    // Load states
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

  function validateStep(stepIndex) {
    const stepFields = steps[stepIndex].querySelectorAll("input, select, textarea");
    for (let field of stepFields) {
      if (!field.checkValidity()) {
        showToast(`${field.name} is invalid or required`, "error");
        return false;
      }

      if (field.name === "ssn" && field.value.length !== 9) {
        showToast("SSN must be 9 digits", "error");
        return false;
      }

      if (["transferPin", "confirmTransferPin"].includes(field.name) && field.value.length !== 4) {
        showToast("PIN must be exactly 4 digits", "error");
        return false;
      }

      if (field.name === "password") {
        const strong = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if (!strong.test(field.value)) {
          showToast("Password must have uppercase and special character", "error");
          return false;
        }
      }

      if (field.name === "confirmPassword") {
        const pass = form.querySelector('[name="password"]').value;
        if (field.value !== pass) {
          showToast("Passwords do not match", "error");
          return false;
        }
      }

      if (field.name === "confirmTransferPin") {
        const pin = form.querySelector('[name="transferPin"]').value;
        if (field.value !== pin) {
          showToast("PINs do not match", "error");
          return false;
        }
      }
    }
    return true;
  }

  function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container") || createToastContainer();
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
    progressBar.style.backgroundColor = type === "success" ? "green" : "crimson";
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

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!validateStep(currentStep)) return;

    const agree = form.querySelector("[name='agreeToTerms']");
    if (!agree?.checked) {
      showToast("You must agree to the Terms & Conditions", "error");
      return;
    }

    const formData = new FormData(form);
    formData.set("agreeToTerms", "true");
    formData.set("phoneNumber", formData.get("phoneNumber")?.replace(/[^\d+]/g, "") || "");
    formData.set("password", formData.get("password")?.toString() || "");

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      const res = await fetch("https://unlimitedfunds.onrender.com/api/v1/signup", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.description || "Submission failed");
      }

      showToast("Form submitted successfully!", "success");
      setTimeout(() => {
        window.location.href = "/accountcreated.html";
      }, 2000);
    } catch (err) {
      console.error("Submission error:", err);
      showToast(err.message, "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
});
