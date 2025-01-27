const viewVerifiedButton = document.querySelectorAll(".view-verified-btn");
const viewProfile = document.querySelector(".view-profile-div");
const cancelViewProfileBtn = document.querySelector(".view-p-cancel-button");
const editButton = document.querySelectorAll(".editUser");
const editProfileScreen = document.querySelector(".edit-profile-screen");
const cancelEditScreen = document.querySelector(".view-p-cancel-button2");
const viewNewUser = document.querySelector(".view-new-user");
const viewNewUserButton =document.querySelectorAll(".review-button")
const cancelNewProfileBtn = document.querySelector(".viewuserbtn")
const  cancelDeleteUser = document.getElementById("cancel-delete")



//view transaction section starts here
const viewtransactionButton =document.querySelector(".transactionButton")
const transactionOptionScreen = document.querySelector (".view-transaction-option");
const cancelOption = document.querySelector(".calcelOptionScreen");
const viewhistory = document.querySelector (".ViewHistoryBtn");
const userTransactionHistory = document.querySelector(".user-transactions")
const calcelUserTransactionHistory = document.querySelector(".cancelUserHistory")
const updateHistoryScreen = document.querySelector(".update-transaction-history")
const editHistoryButton = document.querySelector(".editHistoryBtn")
const cancelUpdateHistoryScreen = document.querySelector(".calcelUpdateScreen")
const CreateTransactionButton = document.querySelector (".createbtn")
const createScreen = document.querySelector(".create-screen")
const cancelCreateScreenBtn =document.querySelector(".cancelCreateBtn")
const transactfooterbutton = document.getElementById("transactfooterBtn")

viewtransactionButton.addEventListener("click", function(event){
  event.preventDefault();
  transactionOptionScreen.classList.toggle("optionScreen-active");
})

cancelOption.addEventListener("click", function(event){
  event.preventDefault();
  transactionOptionScreen.classList.toggle("optionScreen-active");
})

transactfooterbutton.addEventListener("click", function(event){
  event.preventDefault();
  transactionOptionScreen.classList.toggle("optionScreen-active");
  console.log("click", transactfooterbutton)
})

//to view transactionhistory table
viewhistory.addEventListener("click", function(event){
  event.preventDefault();
  userTransactionHistory.classList.toggle("userHistory-active")
  transactionOptionScreen.classList.toggle("optionScreen-active");
})



// close transaction History screen.........
calcelUserTransactionHistory.addEventListener("click", function(event){
  event.preventDefault();
  userTransactionHistory.classList.toggle("userHistory-active")
})


// view edit history and create history screen section
editHistoryButton.addEventListener("click", function(event){
  event.preventDefault();
  updateHistoryScreen.classList.toggle("updateHistory-active")
  transactionOptionScreen.classList.toggle("optionScreen-active");
})

// close update screen
cancelUpdateHistoryScreen.addEventListener("click", function(event){
  event.preventDefault();
  updateHistoryScreen.classList.toggle("updateHistory-active")
})

// create transaction screen active

CreateTransactionButton.addEventListener("click", function(event){
  event.preventDefault()
  createScreen.classList.toggle("createScreen-active")
})

cancelCreateScreenBtn.addEventListener("click", function(event){
  event.preventDefault();
  createScreen.classList.toggle("createScreen-active")
})

//view transaction section ends here...........

viewNewUserButton.forEach((viewBtn) =>{
  viewBtn.addEventListener("click", function(event){
    event.preventDefault()
    viewNewUser.classList.toggle("newUser-active")
  })
})
 


cancelNewProfileBtn.addEventListener("click", function(event){
  event.preventDefault()
  viewNewUser.classList.toggle("newUser-active")

})
viewVerifiedButton.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    viewProfile.classList.toggle("active");
  });
});

cancelViewProfileBtn.addEventListener("click", function (event) {
  event.preventDefault();
  viewProfile.classList.toggle("active");
});

cancelDeleteUser.addEventListener("click", function (event) {
  event.preventDefault();
  viewProfile.classList.toggle("active");
});

editButton.forEach((editBtn) => {
  editBtn.addEventListener("click", function (event) {
    event.preventDefault();
    editProfileScreen.classList.toggle("activate");
  });
});
cancelEditScreen.addEventListener("click", function (event) {
  event.preventDefault();
  editProfileScreen.classList.toggle("activate");
});

const phoneNumberInput = document.getElementById("phone-number");
const dropdown = document.getElementById("dropdown");

// Default country code
const defaultCountryCode = "US +1 ";

// Show dropdown when input is focused
phoneNumberInput.addEventListener("focus", () => {
  dropdown.style.display = "block";
});

// Hide dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest(".phone-input-container")) {
    dropdown.style.display = "none";
  }
});

// Update input value when dropdown option is clicked
dropdown.addEventListener("click", (event) => {
  const targetDiv = event.target.closest("div");
  if (targetDiv && targetDiv.dataset.value) {
    phoneNumberInput.value = targetDiv.dataset.value + " ";
    dropdown.style.display = "none";
  }
});

// Ensure the input always starts with the country code
phoneNumberInput.addEventListener("input", () => {
  let currentValue = phoneNumberInput.value;

  // Ensure the input starts with the default country code (US +1)
  if (!currentValue.startsWith(defaultCountryCode)) {
    phoneNumberInput.value =
      defaultCountryCode + currentValue.replace(defaultCountryCode, "");
  }

  // Only allow numbers after the country code
  const countryCode = defaultCountryCode;
  const phoneNumberPattern = /^[0-9]*$/; // Only digits allowed

  const phoneNumber = currentValue.replace(countryCode, "");
  if (!phoneNumberPattern.test(phoneNumber)) {
    phoneNumberInput.value = countryCode + phoneNumber.slice(0, -1);
  }
});

// Ensure country code is always present when the input loses focus
phoneNumberInput.addEventListener("blur", () => {
  if (!phoneNumberInput.value.trim()) {
    phoneNumberInput.value = defaultCountryCode; // Keep default country code if input is empty
  }
});

// Handle form submission
// submitButton.addEventListener("click", () => {
//   const phoneNumber = phoneNumberInput.value.trim();
//   if (phoneNumber.startsWith("+") && phoneNumber.length > 3) {
//     alert(`Full phone number: ${phoneNumber}`);
//   } else {
//     alert("Please enter a valid phone number.");
//   }
// });

const currencyInput = document.getElementById("currency-input");
const currencydropdown = document.getElementById("currency-dropdown");

// Default currency symbol
let currentCurrencySymbol = "$";

// Show dropdown when input is focused
currencyInput.addEventListener("focus", () => {
  currencydropdown.style.display = "block";
});

// Hide dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest(".currency-input-container")) {
    currencydropdown.style.display = "none";
  }
});

// Update input value when dropdown option is clicked
currencydropdown.addEventListener("click", (event) => {
  const targetDiv = event.target.closest("div");
  if (targetDiv && targetDiv.dataset.symbol) {
    currentCurrencySymbol = targetDiv.dataset.symbol;
    currencyInput.value = `${currentCurrencySymbol} `;
    currencydropdown.style.display = "none";
  }
});

// Ensure input always starts with the currency symbol
currencyInput.addEventListener("input", () => {
  const currentValue = currencyInput.value;
  if (!currentValue.startsWith(currentCurrencySymbol)) {
    currencyInput.value =
      `${currentCurrencySymbol} ` +
      currentValue.replace(currentCurrencySymbol, "").replace(/[^0-9.]/g, "");
  } else {
    // Remove invalid characters
    const numericValue = currentValue
      .replace(currentCurrencySymbol, "")
      .replace(/[^0-9.]/g, "");
    currencyInput.value = `${currentCurrencySymbol} ${numericValue}`;
  }
});

// Restore currency symbol if input is cleared
currencyInput.addEventListener("blur", () => {
  if (
    !currencyInput.value.trim() ||
    currencyInput.value === `${currentCurrencySymbol} `
  ) {
    currencyInput.value = `${currentCurrencySymbol} `;
  }
});

// Handle form submission
// submitButton.addEventListener("click", () => {
//   const amount = currencyInput.value.replace(currentCurrencySymbol, "").trim();
//   if (amount && !isNaN(amount)) {
//     alert(`Entered amount: ${amount}`);
//   } else {
//     alert("Please enter a valid amount.");
//   }
// });
