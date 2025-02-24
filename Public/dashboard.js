const sendButton = document.querySelector(".send-btn");
const transferScreen = document.querySelector(".transfer");
const cancelTransferBtn = document.getElementById("cancel-transfer");
const proceedTransfer = document.getElementById("procceed-btn");
const confirmTransfer = document.getElementById("confirm-transfer");
const backToTransferDetails = document.getElementById("back-arrow");
const finalConfirmationBtn = document.getElementById("transfer-btn");
const pinBox = document.querySelector(".pin-container");
const backtoproceedTransferBtn = document.getElementById("back-btn2");
const sideBarBtn = document.getElementById("sidebarbtn");
const sideBar = document.getElementById("first-flex");
const cancelSideBar = document.getElementById("cancel-sidebar");
const signOutBtn = document.querySelectorAll(".Sign-out-btn");
const confirmSigntOut = document.querySelectorAll(".confirm-signOut");
const calcelSignOut = document.querySelectorAll(".no-signOut");
const confirmSigntOutbtn = document.querySelectorAll(".yes-signOut");
const helpbutton = document.querySelectorAll(".help-btn");
const helpDetails = document.querySelectorAll(".help-screen");

const token = localStorage.getItem("authToken");

//user profile
const profileButton = document.querySelectorAll(".viewProfile");
const profile = document.querySelector(".profile-details-screen");
cancelProfile = document.getElementById("title-button");

profileButton.forEach((viewprofilebtn) => {
  viewprofilebtn.addEventListener("click", function (event) {
    event.preventDefault();
    profile.classList.toggle("active2");
  });
});
cancelProfile.addEventListener("click", function (event) {
  event.preventDefault();
  profile.classList.toggle("active2");
});
//help section
helpbutton.forEach((helpbtn) => {
  helpbtn.addEventListener("click", function (event) {
    event.preventDefault();
    helpDetails.forEach((helpScreen) => {
      helpScreen.classList.toggle("help-active");
    });
  });
});

//sign out section
signOutBtn.forEach((signOut) => {
  signOut.addEventListener("click", function (event) {
    event.preventDefault();
    confirmSigntOut.forEach((confirmSO) => {
      confirmSO.classList.toggle("sigout-active");
    });
  });
});

confirmSigntOutbtn.forEach((signOutBtn) => {
  signOutBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "login.html";
  });
});

calcelSignOut.forEach((cancelSO) => {
  cancelSO.addEventListener("click", function (event) {
    event.preventDefault();
    confirmSigntOut.forEach((confirmSO) => {
      confirmSO.classList.toggle("sigout-active");
    });
  });
});
sideBarBtn.addEventListener("click", function (event) {
  event.preventDefault();
  sideBar.classList.toggle("activebar");
});
cancelSideBar.addEventListener("click", function (event) {
  event.preventDefault();
  sideBar.classList.toggle("activebar");
});

// finalConfirmationBtn.addEventListener("click", function (event) {
//   event.preventDefault();
//   pinBox.classList.toggle("activate3");
//   confirmTransfer.classList.toggle("activate2");
// });

console.log(sendButton);
// form data.....................

sendButton.addEventListener("click", function (event) {
  event.preventDefault();
  transferScreen.classList.toggle("activate1");
  console.log("click");
});

// msendButton.addEventListener("click", function(event){
//   event.preventDefault()
//   transferScreen.classList.toggle("activate1")
// })
// console.log(sendButton)

// cancelTransferBtn.addEventListener("click", function (event) {
//   event.preventDefault();
//   transferScreen.classList.toggle("activate1");
// });

// proceedTransfer.addEventListener("click", function (event) {
//   event.preventDefault();

//   Retrieve and trim input values
//   const bankName = document.getElementById("bankName").value.trim();
//   const accountName = document.getElementById("accountName").value.trim();
//   const accountNumber = document.getElementById("accountNumber").value.trim();
//   const amount = document.getElementById("amount").value.trim();
//   const narration = document.getElementById("narration").value.trim();

//   Validate for empty fields
//   if (
//     bankName === "" ||
//     accountName === "" ||
//     accountNumber === "" ||
//     amount === "" ||
//     narration === ""
//   ) {
//     alert("Incomplete form");
//     return;
//   }

//   Toggle classes if validation passes
//   confirmTransfer.classList.toggle("activate2");
//   transferScreen.classList.toggle("activate1");
// });

function moveNext(current) {
  const currentInput = document.getElementById(`pin${current}`);
  if (currentInput.value.length === 1 && current < 4) {
    const nextInput = document.getElementById(`pin${current + 1}`);
    nextInput.focus();
  }
}

// Function to log in and get the token
// Login function to get and store the token
// Fetch user data
document.addEventListener("DOMContentLoaded", function () {
  fetchUserData();
});

// Function to display toast messages


// Fetch user data for dashboard and confirm transfer screen
async function fetchUserData() {
  console.log("Fetching user data...");
  const token = localStorage.getItem("authToken");
  if (!token) {
    Toastify({
      text: "Session expired! Redirecting to login.",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
    window.location.href = "/login.html";
    return;
  }
  try {
    const response = await fetch(
      "https://unlimitedfunds.onrender.com/api/v1/user",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 401) {
      // Delay the redirect for 3 seconds (same as toast duration)
      setTimeout(() => {
        window.location.href = "/login.html";
        localStorage.removeItem("authToken");
      }, 3000); // 3000ms = 3 seconds
      return;
    }
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching data:", errorData);
      return;
    }
    const responseData = await response.json();
    populateDashboard(responseData);
    console.log(responseData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    showErrorToast(error.message);
  }
}
// here is my toast functions 

function showSessionExpiredToast() {
  Toastify({
    text: "Session expired! Redirecting to login.",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "red",
    stopOnFocus: true,
    className: "toast-with-progress",
    callback: () => {
      // Redirect to login page after toast is dismissed
      window.location.href = "/login.html";
    },
  }).showToast();
}

// Example usage

function showErrorToast(errorMessage) {
  Toastify({
    text: errorMessage, // The error message to display
    duration: 3000, // Display for 3 seconds
    close: true, // Show close button
    gravity: "top", // Position at the top
    position: "right", // Position on the right
    backgroundColor: "red", // Red background for errors
    stopOnFocus: true, // Pause timer when hovered
    className: "toast-with-progress", // Add custom class (optional)
  }).showToast();
}

function showSuccessToast(successMessage) {
  Toastify({
    text: successMessage, // The success message to display
    duration: 3000, // Display for 3 seconds
    close: true, // Show close button
    gravity: "top", // Position at the top
    position: "right", // Position on the right
    backgroundColor: "green", // Green background for success
    stopOnFocus: true, // Pause timer when hovered
    className: "toast-with-progress", // Add custom class (optional)
  }).showToast();
}
function showSuccessToastWithRedirect(successMessage, redirectUrl) {
  Toastify({
    text: successMessage,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "green",
    stopOnFocus: true,
    className: "toast-with-progress",
    callback: () => {
    
    },
  }).showToast();
}


function populateDashboard(responseData) {
  const data = responseData.data;
  if (!data) {
    console.error("User data is missing!");
    return;
  }

  // Get elements and check if they exist before setting text content;
  const accounNumberElement = document.getElementById("accounNumber");
  const accountTypeElement = document.querySelectorAll(".accountType");
  const figuresElement = document.querySelectorAll(".figures");
  const namesElement = document.querySelector(".names");
  const usernameElement = document.querySelectorAll(".username");
  const profileImageElement = document.querySelectorAll(".profilePics");
  const greetUser = document.getElementById("greetingUser");
  const accounNumber = document.querySelectorAll(".accountNumber");
  const userNames = document.querySelectorAll(".names");
  const fullName = document.querySelector(".fullnames");
  const emailAddress = document.querySelectorAll(".emailaddress");
  const userAddress = document.querySelectorAll(".useraddress");
  const stateEl = document.querySelectorAll(".stateData");
  const dobEl = document.querySelectorAll(".dateObirt");
  const countryEl = document.querySelectorAll(".CountryResidence");
  const monthlyIncome = document.querySelector(".monthlyIncome");

  countryEl.forEach((country) => {
    if (country)
      country.textContent = data.countryOfResidence || "Not available";
  });

  dobEl.forEach((dOB) => {
    if (dOB) dOB.textContent = data.dateOfBirth || "Not available";
  });

  if (monthlyIncome)
    monthlyIncome.textContent = `$${data.monthlyIncome}` || " N/A";
  stateEl.forEach((state) => {
    if (state) state.textContent = data.state || "Not available";
  });
  userAddress.forEach((address) => {
    if (address) address.textContent = data.address || "Not available";
  });

  if (fullName)
    fullName.textContent =
      `${data.firstName} ${data.middleName} ${data.lastName}` ||
      "Not available";

  emailAddress.forEach((email) => {
    if (email) email.textContent = data.email || "Not available";
  });

  userNames.forEach((names) => {
    if (names)
      names.textContent =
        `${data.firstName} ${data.lastName}` || "Not available";
  });

  accounNumber.forEach((accountno) => {
    if (accountno) accountno.textContent = data.accountNo || "Not available";
  });

  accountTypeElement.forEach((accountType) => {
    if (accountType)
      accountType.textContent =
        `${data.accountType} account` || "Not available";
  });

  if (greetUser) greetUser.textContent = `Hello, ${data.firstName}` || "N/A";
  if (accounNumberElement)
    accounNumberElement.textContent = data.accountNo || "Not available";
  if (accountTypeElement)
    accountTypeElement.textContent = data.accountType || "Not available";

  figuresElement.forEach((figEl) => {
    if (figEl)
      figEl.textContent = data.initialDeposit
        ? `$${Number(data.initialDeposit).toLocaleString()}`
        : "Not available";
  });

  if (namesElement)
    namesElement.textContent =
      `${data.firstName} ${data.lastName}` || "Not available";

  usernameElement.forEach((username) => {
    if (username) username.textContent = `@${data.userName}` || "Not available";
  });

  profileImageElement.forEach((profilepics) => {
    if (profilepics && data.profilePicture) {
      profilepics.src = data.profilePicture;
    }
  });

  document.querySelector(".userAccount").textContent =
    data.accountNo || "Not available";
  document.getElementById("accountBalance").textContent = `$${
    data.initialDeposit || "0.00"
  }`;
  document.getElementById("accounNumber").textContent =
    data.accountNo || "Not available";
  document.querySelectorAll(".username").forEach((userEl) => {
    userEl.textContent = `@${data.userName}` || "Not available";
  });
  document.getElementById(
    "greetingUser"
  ).textContent = `Hello, ${data.firstName}`;
  document.querySelector(
    ".fullnames"
  ).textContent = `${data.firstName} ${data.middleName} ${data.lastName}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const dateElement = document.querySelectorAll(".titlep"); // Select the correct date element
  // Another date in confirm screen

  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY

  dateElement.forEach((date) => {
    if (date) date.textContent = formattedDate;
  });
  // Update the date in both elements
});

// Handle form submission to show confirm screen
document.addEventListener("DOMContentLoaded", function () {
  const nextButtons = document.querySelectorAll(".next-btn");
  const backButtons = document.querySelectorAll(".back-btn");
  const pinInputs = document.querySelectorAll(".pin-input");
  let formData = {};

  // Step Navigation
  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = this.closest(".step");
      const nextStepId = this.getAttribute("data-next");
      const nextStep = document.getElementById(nextStepId);

      // If the button belongs to the first step, validate form inputs
      if (currentStep.id === "step-1") {
        if (!validateStep1()) {
          return; // Stop navigation if validation fails
        }
      }

      if (nextStep) {
        nextStep.style.display = "block";
        currentStep.style.display = "none";

        // Populate Step 2 with data from Step 1
        if (nextStepId === "step-2") {
          populateConfirmation();
        }
      } else {
        console.error(`Element with ID ${nextStepId} not found.`);
      }
    });
  });

  // Validation Function for Step 1
  function validateStep1() {
    const inputs = document.querySelectorAll("#step-1 input, #step-1 select"); // Adjust if necessary
    let isValid = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
        input.style.border = "2px solid red"; // Highlight empty fields
        showErrorMessage(input, "This field is required");
      } else {
        input.style.border = ""; // Reset border if valid
        removeErrorMessage(input);
      }
    });

    return isValid;
  }
  document
    .getElementById("routingNumber")
    .addEventListener("input", function (event) {
      event.preventDefault()
      let value = this.value.replace(/\D/g, ""); // Remove non-numeric characters
      if (value.length > 9) value = value.slice(0, 9); // Restrict to 9 digits
      this.value = value;
    });

  document
    .getElementById("routingNumber")
    .addEventListener("blur", function () {
      const routingError = document.getElementById("routingError");
      if (this.value.length !== 9) {
        routingError.style.display = "block";
      } else {
        routingError.style.display = "none";
      }
    });
  // Show error message
  function showErrorMessage(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("span");
      error.classList.add("error-message");
      error.style.color = "red";
      error.style.fontSize = "12px";
      input.parentNode.appendChild(error);
    }
    error.textContent = message;
  }

  // Remove error message
  function removeErrorMessage(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      error.remove();
    }
  }

  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = this.closest(".step");
      const prevStepId = this.getAttribute("data-prev");
      const prevStep = document.getElementById(prevStepId);

      if (prevStep) {
        prevStep.style.display = "block";
        currentStep.style.display = "none";
      } else {
        console.error(`Element with ID ${prevStepId} not found.`);
      }
    });
  });

  // Populate Step 2 with data from Step 1
  function populateConfirmation() {
    // Get amount and ensure it's a valid number
    const amountValue =
      parseFloat(document.getElementById("amount").value.trim()) || 0;

    // Calculate service fee
    const serviceFeeValue = calculateServiceFee(amountValue);
    console.log("Service Fee Calculated:", serviceFeeValue);

    // Store values in formData object
    formData = {
      bankName: document.getElementById("bankName").value.trim(),
      beneficiaryName: document.getElementById("beneficiaryName").value.trim(),
      beneficiaryAccountNumber: document
        .getElementById("beneficiaryAccountNumber")
        .value.trim(),
      beneficiaryCountry: document
        .getElementById("beneficiaryCountry")
        .value.trim(),
      narration: document.getElementById("narration").value.trim(),
      swiftcode: document.getElementById("swiftCode").value.trim(),
      routingNumber: document.getElementById("routingNumber").value.trim(),
      accountType: document.getElementById("typeofAccnt").value.trim(),
      amount: amountValue, // Use validated amount
      serviceFee: serviceFeeValue, // Store calculated fee
    };

    // Populate confirmation screen with formData
    document.getElementById("confirm-beneficiary-name").textContent =
      formData.beneficiaryName;
    document
      .querySelectorAll(".confirm-account-number")
      .forEach((el) => (el.textContent = formData.beneficiaryAccountNumber));
    document.getElementById("confirm-bank-name").textContent =
      formData.bankName;
    document.getElementById("confirm-country").textContent =
      formData.beneficiaryCountry;
    document.getElementById(
      "confirm-amount"
    ).textContent = `$${formData.amount.toLocaleString()}`;
    document.getElementById(
      "confirm-service-fee"
    ).textContent = `$${formData.serviceFee.toLocaleString()}`;

    // Calculate and display total amount (Amount + Service Fee)
    const totalAmount = formData.amount + formData.serviceFee;
    document.getElementById(
      "confirm-total-amount"
    ).textContent = `$${totalAmount.toLocaleString()}`;

    // Populate remaining fields
    document.getElementById("confirm-narration").textContent =
      formData.narration;
    document.getElementById("confirm-routing").textContent =
      formData.routingNumber;
    document.getElementById("confirmSwift").textContent = formData.swiftcode;
    document.getElementById("beneficiaryAccountType").textContent =
      formData.accountType;

    console.log("Final Total Amount:", totalAmount);
  }

  // Select the amount input field and service fee display element

  // Function to calculate service fee
  const amountInput = document.getElementById("amount");
  const serviceFeeDisplay = document.getElementById("serviceFee");

  if (!amountInput || !serviceFeeDisplay) {
    console.error(
      "Element(s) missing: Check if #amount and #serviceFee exist in HTML."
    );
    return; // Stop execution if elements are missing
  }

  function calculateServiceFee(amount) {
    console.log("Amount for Fee Calculation:", amount);
    if (amount < 1000) return 10;
    if (amount >= 1000 && amount < 10000) return 50;
    if (amount >= 10000 && amount < 100000) return 150;
    if (amount >= 100000 && amount < 1000000) return 250;
    return 500;
  }

  amountInput.addEventListener("input", function () {
    const amount = parseFloat(amountInput.value) || 0;
    console.log("Input Amount:", amount);
    const calculatedFee = calculateServiceFee(amount);
    console.log("Calculated Fee:", calculatedFee);
    serviceFeeDisplay.textContent = `$${calculatedFee.toFixed(2)}`; // Ensure correct format
  });

  // Auto-focus next PIN input
  pinInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      if (this.value.length === 1 && index < pinInputs.length - 1) {
        pinInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && this.value.length === 0 && index > 0) {
        pinInputs[index - 1].focus();
      }
    });
  });

  // Final Confirmation with async/await

  document
    .getElementById("final-confirm-btn")
    .addEventListener("click", async function () {
      const confirmBtn = this;
      const spinner = document.getElementById("spinner");
      const buttonText = confirmBtn.querySelector(".button-text");

      // Show spinner, hide button text
      buttonText.style.display = "none";
      spinner.style.display = "inline-block";

      const pin = Array.from(pinInputs)
        .map((input) => input.value)
        .join("");
      formData.transferPin = pin;

      try {
        const response = await fetch(
          "https://unlimitedfunds.onrender.com/api/v1/user/transfer",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          showErrorToast(errorData.description || "Transfer failed. Please try again.", "error");
          throw new Error(errorData.description || "Form submission failed.");
        }

        const data = await response.json();
        console.log("Success:", data);
        showToast("Transfer successful!", "success");

        // Hide transfer screen & show success message
        document.querySelector(".transfer").style.display = "none";
        document.getElementById("success-screen-div").style.display = "block";
      } catch (error) {
        console.error("Error:", error);
        showToast(error.message, "error");;
        document.getElementById("transaction-failed").style.display = "block";
        document.querySelector(".transfer").style.display = "none";
      } finally {
        // Hide spinner, show text back
        buttonText.style.display = "inline";
        spinner.style.display = "none";
      }
    });

  // ✅ Reload page when clicking the "Go Back" button
  document.getElementById("go-back-btn").addEventListener("click", function () {
    window.location.reload();
  });
});


document
  .getElementById("try-again-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.reload();
    document.getElementById("transaction-failed").style.display = "none";
  });

document
  .getElementById("cancel-transfer")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".transfer").classList.toggle("activate1");
  });
function showToast(message, type = "success", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
<span>${message}</span>
<div class="toast-progress"></div>
`;

  document.body.appendChild(toast);

  const progressBar = toast.querySelector(".toast-progress");
  progressBar.style.animation = `toast-progress ${duration}ms linear`;

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document.querySelector("tbody");

  async function fetchTransactions() {
    try {
      const response = await fetch(
        "https://unlimitedfunds.onrender.com/api/v1/user/transfer",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions.");
      }

      const data = await response.json();

      if (!Array.isArray(data.data)) {
        console.error("Invalid data format:", data);
        return;
      }

      // Sort transactions by date (latest first)
      const sortedTransactions = data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Clear existing rows
      tableBody.innerHTML = "";

      sortedTransactions.forEach((transaction) => {
        const row = document.createElement("tr");
        row.classList.add("head");
        row.innerHTML = `
        <td class="type">
         <img 
           class="transaction-icon" 
          src="image/arrow-down.svg" 
          alt="Transaction Icon"
          style="${
            transaction.transactionType === "credit"
              ? "transform: rotate(180deg); padding: 0px;"
              : ""
          }"
       />
      </td>
        <td style=" text-wrap: nowrap;" class="tdflex">
          <h3>${transaction.beneficiaryName || "N/A"}</h3>
          <p>${
            transaction.transactionType === "credit" ? "Received" : "Sent"
          } - ${new Date(transaction.createdAt).toLocaleDateString()}</p>
        </td>
          <td class="amount-td">$${Number(transaction.amount).toLocaleString()}</td>
          <td class="status-td" style=" border-radius: 12px; border: 1px solid black; height: 25px; text-align: center; align-content: center;">
            Success
          </td>
          <td style=" text-wrap: nowrap;" class=" tdflex" >
              <h3>${transaction.bankName || "Unknown Bank"}</h3>
              <p>****${transaction.beneficiaryAccountNumber.slice(-4)}</p>
          </td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  // Fetch transactions when the page loads
  fetchTransactions();
});

