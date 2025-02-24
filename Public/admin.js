// const viewVerifiedButton = document.querySelectorAll(".view-verified-btn");
// const viewProfile = document.querySelector(".view-profile-div");
// const editButton = document.querySelectorAll(".editUser");
const token = localStorage.getItem("authToken");
const cancelDeleteUser = document.getElementById("cancel-delete");

//view transaction section starts here
const viewtransactionButton = document.querySelector(".transactionButton");
const transactionOptionScreen = document.querySelector(
  ".view-transaction-option"
);
const cancelOption = document.querySelector(".calcelOptionScreen");
const viewhistory = document.querySelector(".ViewHistoryBtn");
const userTransactionHistory = document.querySelector(".user-transactions");
const calcelUserTransactionHistory =
  document.querySelector(".cancelUserHistory");
const updateHistoryScreen = document.querySelector(
  ".update-transaction-history"
);
const editHistoryButton = document.querySelector(".editHistoryBtn");
const cancelUpdateHistoryScreen = document.querySelector(".calcelUpdateScreen");
const CreateTransactionButton = document.querySelector(".createbtn");
const createScreen = document.querySelector(".create-screen");
const cancelCreateScreenBtn = document.querySelector(".cancelCreateBtn");
const transactfooterbutton = document.getElementById("transactfooterBtn");

viewtransactionButton.addEventListener("click", function (event) {
  event.preventDefault();
  transactionOptionScreen.classList.toggle("optionScreen-active");
  document.querySelector(".sideBar").classList.toggle("active");
});
document.getElementById("userbtn").addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector(".sideBar").classList.toggle("active");
});

cancelOption.addEventListener("click", function (event) {
  event.preventDefault();
  transactionOptionScreen.classList.toggle("optionScreen-active");
});

transactfooterbutton.addEventListener("click", function (event) {
  event.preventDefault();
  transactionOptionScreen.classList.toggle("optionScreen-active");
  console.log("click", transactfooterbutton);
});

//to view transactionhistory table
viewhistory.addEventListener("click", function (event) {
  event.preventDefault();
  userTransactionHistory.classList.toggle("userHistory-active");
  transactionOptionScreen.classList.toggle("optionScreen-active");
});

// close transaction History screen.........

// view edit history and create history screen section
editHistoryButton.addEventListener("click", function (event) {
  event.preventDefault();
  updateHistoryScreen.classList.toggle("updateHistory-active");
  transactionOptionScreen.classList.toggle("optionScreen-active");
});

// close update screen

// create transaction screen active

CreateTransactionButton.addEventListener("click", function (event) {
  event.preventDefault();
  createScreen.classList.toggle("createScreen-active");
});

cancelCreateScreenBtn.addEventListener("click", function (event) {
  event.preventDefault();
  createScreen.classList.toggle("createScreen-active");
});

// signing out -----

document.addEventListener("DOMContentLoaded", function () {
  // Get elements from the DOM
  const signOutButton = document.getElementById("sign-out");
  const confirmSignOutScreen = document.querySelector(".confirm-signOut");
  const yesConfirm = document.querySelector(".yes-signOut");
  const noConfirm = document.querySelector(".no-signOut");

  // Debugging: Log elements to ensure they are correctly selected
  console.log("signOutButton:", signOutButton);
  console.log("confirmSignOutScreen:", confirmSignOutScreen);
  console.log("yesConfirm:", yesConfirm);
  console.log("noConfirm:", noConfirm);

  // Show the confirmation popup when "Sign Out" is clicked
  signOutButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior (e.g., form submission)
    confirmSignOutScreen.classList.add("active"); // Show the popup
    document.querySelector(".sideBar").classList.toggle("active");
  });

  // Handle "Yes" button click
  yesConfirm.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior
    console.log("Yes button clicked"); // Debugging

    // Show Toastify notification
    Toastify({
      text: "Signing Out.....",
      duration: 3000, // 3 seconds
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "red",
      stopOnFocus: true, // Pause timer on hover
      className: "toast-with-progress", // Custom class
    }).showToast();

    // Redirect after 3 seconds
    setTimeout(function () {
      window.location.href = "/adminlogin.html";
    }, 3000);
  });

  // Handle "No" button click
  noConfirm.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior
    console.log("No button clicked"); // Debugging
    confirmSignOutScreen.classList.remove("active"); // Hide the popup
  });
});
// Example: Show the box after 1 second

//view transaction section ends here...........

// cancelDeleteUser.addEventListener("click", function (event) {
//   event.preventDefault();
//   viewProfile.classList.toggle("active");
// });

// editButton.forEach((editBtn) => {
//   editBtn.addEventListener("click", function (event) {
//     event.preventDefault();
//     editProfileScreen.classList.toggle("activate");
//   });
// });

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

// Show dropdown when input is focused

// Hide dropdown when clicking outside

// Update input value when dropdown option is clicked

// Ensure input always starts with the currency symbol

// Handle form submission
// submitButton.addEventListener("click", () => {
//   const amount = currencyInput.value.replace(currentCurrencySymbol, "").trim();
//   if (amount && !isNaN(amount)) {
//     alert(`Entered amount: ${amount}`);
//   } else {
//     alert("Please enter a valid amount.");
//   }
// });

// footer area
const staticFooter = document.querySelector(".static-footer");
const fixedFooter = document.querySelector(".fixed-footer");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (scrollY > staticFooter.offsetHeight) {
    fixedFooter.classList.remove("hidden");
    fixedFooter.style.transform = "translateY(0)";
  } else {
    fixedFooter.classList.add("hidden");
    fixedFooter.style.transform = "translateY(-100%)";
  }
});

//fetching user data form

document.addEventListener("DOMContentLoaded", fetchPendingUsers);

async function fetchPendingUsers() {
  const token = localStorage.getItem("authToken"); // Retrieve token

  if (!token) {
    Toastify({
      text: "login expired.....",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
    window.location.href = "/adminlogin.html"; // Redirect to login
    return;
  }

  try {
    const response = await fetch(
      "https://unlimitedfunds.onrender.com/api/v1/admin/users",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 401) {
      window.location.href = "/adminlogin.html"; // Redirect to login
      localStorage.removeItem("authToken");
      return;
    }

    if (!response.ok) {
      // Show error toast
      if (typeof Toastify !== "undefined") {
        Toastify({
          text: `HTTP error! Status: ${response.status}`,
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center`, or `right`
          backgroundColor: "red",
          stopOnFocus: true, // Stops timer when hovered
          className: "toast-with-progress", // Add custom class
        }).showToast();
      } else {
        console.error(
          "Toastify is not defined. Please include Toastify library."
        );
      }

      // Optionally, throw an error to stop further execution
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data);

    // Ensure the 'users' field exists and is an array
    const users = Array.isArray(data.data) ? data.data : [];
    console.log("Users:", users);

    if (users.length === 0) {
      Toastify({
        text: "No users found",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center`, or `right`
        backgroundColor: "red",
        stopOnFocus: true, // Stops timer when hovered
        className: "toast-with-progress", // Add custom class
      }).showToast();

      return;
    }

    // Filter pending users based on their status
    const pendingUsers = users.filter(
      (user) => user.status?.trim().toLowerCase() === "hold"
    );

    if (pendingUsers.length === 0) {
      Toastify({
        text: "No pending users found.",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center`, or `right`
        backgroundColor: "red",
        stopOnFocus: true, // Stops timer when hovered
        className: "toast-with-progress", // Add custom class
      }).showToast();
      return;
    }

    displayPendingUsers(pendingUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    Toastify({
      text: "Failed to fetch users. Please try again.",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
  }
}

// Function to dynamically insert pending users into the HTML
function displayPendingUsers(users) {
  const usersContainer = document.querySelector(".penddingUsers");

  if (!usersContainer) {
    console.error("Users container not found!");
    return;
  }

  usersContainer.innerHTML = ""; // Clear existing users

  if (users.length === 0) {
    usersContainer.innerHTML = "<p>No pending users found.</p>";
  } else {
    users.forEach((user) => {
      console.log(`Rendering user: ${user.firstName} ${user.lastName}`);

      const userElement = document.createElement("div");
      userElement.classList.add("user");

      // 🔥 Add data-user-id attribute to track the user properly
      userElement.setAttribute("data-user-id", user._id);

      userElement.innerHTML = `
        <div class="profie-dv">
          <img src="${
            user.profilePicture || "default-avatar.png"
          }" alt="Profile" class="profile-img"/>
        </div>
        <div>
          <p>${user.firstName} ${user.lastName}</p>
        </div>
        <div class="belowbtn">
          <button class="review-button" data-user-id ="${
            user._id
          }">Review</button>
        </div>
      `;

      usersContainer.appendChild(userElement);
    });
  }

  // Attach event listeners after elements are added to the DOM
  document.querySelectorAll(".review-button").forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-user-id");
      openReviewScreen(userId, users); // Pass users array
    });
  });
}

// Function to open and populate the review screen
function openReviewScreen(userId, users) {
  const user = users.find((u) => u._id === userId);
  if (!user) {
    Toastify({
      text: "User not found!.",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
    return;
  }

  document.querySelector(".view-new-user").classList.add("newUser-active");

  const profilepic = document.querySelectorAll(".userImg");
  profilepic.forEach((profilepicture) => {
    profilepicture.src = user.profilePicture || "default-avatar.png";
  });

  const fullprofile = document.querySelectorAll(".fullpicture");
  fullprofile.forEach((fullProfilep) => {
    fullProfilep.src = user.profilePicture || "default-avatar.png";
  });
  document.querySelector(
    ".user-names"
  ).innerText = `${user.firstName} ${user.lastName}`;
  document.querySelector(".user-email").innerText = user.email;
  document.querySelector(".user-name").innerText = user.userName;
  document.querySelector(".country-output").innerText = user.countryOfResidence;
  document.querySelector(".state-output").innerText = user.state;
  document.querySelector(".phoneNumber-output").innerText = user.phoneNumber;
  document.querySelector(".address-output").innerText = user.address;
  const proofOfAddress = document.querySelectorAll(".proofAddress-ouput");
  proofOfAddress.forEach((proofpic) => {
    proofpic.src = user.proofOfAddress || "image/Image.svg";
  });

  document.querySelector(".accountNumber-output").innerText = user.accountNo;
  document.querySelector(".accountType-output").innerText = user.accountType;
  document.querySelector(".occupation-output").innerText = user.occupation;
  document.querySelector(".maritalStatus-output").innerText =
    user.maritalStatus;
  document.querySelector(
    ".accountBalance"
  ).innerText = `$${user.initialDeposit}`;
  document.querySelector(".gender-output").innerText = user.gender;
  document.querySelector(".dOb-output").innerText = user.dateOfBirth;
  document.querySelector(".acc-status").innerText = user.status;
  document.querySelector(".ssn-output").innerText = user.ssn;

  // Remove any existing event listeners before adding a new one
  const approveButton = document.getElementById("approve-user");

  approveButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Approve button clicked for user:", user._id);
    approveUser(user._id);
  });

  document.getElementById("delete-newUser").onclick = function () {
    deleteUser(userId);
  };
}

document
  .querySelector(".viewuserbtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".view-new-user").classList.remove("newUser-active");
  });

// Function to approve a user
async function approveUser(userId) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    Toastify({
      text: "login expired.....!.",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
    window.location.href = "/adminlogin.html"; // Redirect to login
    return;
  }

  try {
    console.log(`📤 Sending approval request for user: ${userId}`);

    const response = await fetch(
      `https://unlimitedfunds.onrender.com/api/v1/admin/approve/user/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "active" }), // Make sure the backend expects this
      }
    );

    if (response.status === 401) {
      window.location.href = "/adminlogin.html"; // Redirect to login
      localStorage.removeItem("authToken");
      return;
    }

    if (!response.ok) {
      const data = await response.json();
      console.log("API Response Data:", data);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    location.reload();
    alert("✅ User approved and moved to active users!");

    // Move the user to approved users section
    moveUserToApproved(userId);
  } catch (error) {
    console.error("❌ Error approving user:", error);
    Toastify({
      text: "Failed to approve user. Try again.!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
  }
}

// Function to move a user to the Approved Users section
document
  .getElementById("transactionForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    
      const createBtn = document.querySelector(".creatBtn"); // Get the button
      createBtn.classList.add("submitting"); // Add the spinning class
    
      const userId = document.getElementById("transactionUserId").value; // Get dynamically set userId
    
      if (!userId) {
        Toastify({
          text: "No user selected!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "red",
          stopOnFocus: true,
          className: "toast-with-progress",
        }).showToast();
        createBtn.classList.remove("submitting"); // Remove the spinning class
        return;
      }
    
      const transactionData = {
        userId: userId, // Dynamically fetched user ID
        transactionType: document.getElementById("transactionType").value,
        transferDate: document.getElementById("dateInput").value,
        beneficiaryName: document.getElementById("beneficiary").value,
        amount: parseFloat(document.getElementById("amount-input").value), // Ensure amount is a number
        beneficiaryAccountNumber: document.getElementById("beneficiaryAccountNumber").value,
        bankName: document.getElementById("beneficiaryAccountName").value,
        beneficiaryCountry: document.getElementById("beneficiaryCountry").value,
        narration: document.getElementById("narration").value,
        swiftcode: document.getElementById("swiftcode").value,
        routingNumber: document.getElementById("routingNumber").value,
        accountType: document.getElementById("accountType").value,
        serviceFee: parseFloat(document.getElementById("serviceFee").value), // Ensure serviceFee is a number
      };
    
      console.log("Submitting Transaction:", transactionData);
    
      try {
        const response = await fetch(
          "https://unlimitedfunds.onrender.com/api/v1/admin/create/transfer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(transactionData),
          }
        );
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Server Error Response:", errorData); // Log the error response
          Toastify({
            text: errorData.description || "Transfer failed. Please try again.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "red",
            stopOnFocus: true,
            className: "toast-with-progress",
          }).showToast();
          throw new Error(errorData.description || "Form submission failed.");
        }
    
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Transaction failed");
    
        Toastify({
          text: "Transaction successful..",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
          stopOnFocus: true,
          className: "toast-with-progress",
        }).showToast();
      } catch (error) {
        console.error("Transaction Error:", error);
        Toastify({
          text: error.message || "Failed to create transaction. Please try again.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "red",
          stopOnFocus: true,
          className: "toast-with-progress",
        }).showToast();
      } finally {
        createBtn.classList.remove("submitting"); // Remove the spinning class
      }
  });

document
  .getElementById("edit-user-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
  });
// Function to fetch the first approved user's ID
async function updateUser(userId) {
  const updateButton = document.getElementById("update-button");
  const buttonText = document.getElementById("button-text");
  const spinner = document.getElementById("spinner");

  console.log("Disabling button and showing spinner"); // Debugging
  updateButton.disabled = true;
  buttonText.classList.add("hidden");
  spinner.classList.remove("hidden");

  const updatedData = {
    firstName: document.getElementById("firstName").value,
    middleName: document.getElementById("middleName").value,
    lastName: document.getElementById("LastName").value,
    email: document.getElementById("emailInput").value,
    countryOfResidence: document.getElementById("countryInput").value,
    state: document.getElementById("stateInput").value,
    address: document.getElementById("addressInput").value,
    phoneNumber: document.getElementById("phone-number").value,
    accountType: document.getElementById("accountType").value,
    maritalStatus: document.getElementById("maritalStatus").value,
    occupation: document.getElementById("occupationInput").value,
    gender: document.getElementById("genderInput").value,
    initialDeposit: document
      .getElementById("currency-input")
      .value.replace(/[^0-9.]/g, ""), // Remove non-numeric characters and convert to float
    ssn: document.getElementById("ssnInput").value,
    status: document.getElementById("statusInput").value,
    dateOfBirth: document.getElementById("dobInput").value,
  };

  try {
    console.log("Sending update request"); // Debugging
    const response = await fetch(
      `https://unlimitedfunds.onrender.com/api/v1/admin/update/user/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.status === 401) {
      console.log("Unauthorized, redirecting to login"); // Debugging
      window.location.href = "/adminlogin.html"; // Redirect to login
      localStorage.removeItem("authToken");
      return;
    }

    if (!response.ok) {
      const data = await response.json();
      console.log("API Response Data:", data); // Debugging
      throw new Error("Failed to update user");
    }

    console.log("User updated successfully"); // Debugging
    Toastify({
      text: "User updated successfully!!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "green",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();

    // Option 1: Reset the form (if needed)
    document.querySelector(".edit-profile-screen").classList.remove("active");

    // Option 2: Fetch updated user data and update the UI
    await fetchApprovedUsers(); // Assuming this function updates the user list
  } catch (error) {
    console.error("Error updating user:", error); // Debugging
    Toastify({
      text: "Failed to update user.",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
  } finally {
    console.log("Re-enabling button and hiding spinner"); // Debugging
    updateButton.disabled = false;
    buttonText.classList.remove("hidden");
    spinner.classList.add("hidden");
  }
}
// Function to fetch and display approved users
async function fetchApprovedUsers() {
  if (!token) {
    Toastify({
      text: "No token found! Please log in.!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
    window.location.href = "/adminlogin.html"; // Redirect to login
    return;
  }

  try {
    const response = await fetch(
      "https://unlimitedfunds.onrender.com/api/v1/admin/users",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log("API Response Data:", data);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data);

    // Ensure the 'users' field exists and is an array
    const users = Array.isArray(data.data) ? data.data : [];
    console.log("Users:", users);

    // Filter approved users (status = active)
    const approvedUsers = users.filter(
      (user) => user.status?.trim().toLowerCase() === "active"
    );

    if (approvedUsers.length === 0) {
      Toastify({
        text: "No approved users found.. !",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center`, or `right`
        backgroundColor: "red",
        stopOnFocus: true, // Stops timer when hovered
        className: "toast-with-progress", // Add custom class
      }).showToast();
      return;
    }

    displayApprovedUsers(approvedUsers);
    displayApproveUserlist(approvedUsers);

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const modal = document.getElementById("deleteConfirmationModal");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");

    let userIdToDelete = null;

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        userIdToDelete = button.getAttribute("data-user-id");
        modal.style.display = "flex"; // Show the modal
      });
    });

    // Handle confirmation
    confirmDeleteButton.addEventListener("click", async () => {
      if (userIdToDelete) {
        try {
          const deleteUrl = `https://unlimitedfunds.onrender.com/api/v1/admin/delete/user/${userIdToDelete}`;
          const deleteResponse = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!deleteResponse.ok) {
            throw new Error(
              `Failed to delete user. Status: ${deleteResponse.status}`
            );
          }

          // Remove the row from the DOM
          const row = document
            .querySelector(`[data-user-id="${userIdToDelete}"]`)
            .closest("tr");
          row.remove();

          // Show success toast
          Toastify({
            text: "User deleted successfully!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center`, or `right`
            backgroundColor: "green",
          }).showToast();

          console.log("User deleted successfully.");
        } catch (error) {
          console.error("Error deleting user:", error);

          // Show error toast
          Toastify({
            text: "Failed to delete user. Please try again.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "red",
          }).showToast();
        } finally {
          modal.style.display = "none"; // Hide the modal
          userIdToDelete = null; // Reset the user ID
        }
      }
    });

    // Handle cancellation
    cancelDeleteButton.addEventListener("click", () => {
      modal.style.display = "none"; // Hide the modal
      userIdToDelete = null; // Reset the user ID
    });
  } catch (error) {
    console.error("Error fetching approved users:", error);
    Toastify({
      text: "Failed to fetch approved users. Please try again. !",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
  }
}

//function to display user transactions

function displayApproveUserlist(users) {
  const approveUserlist = document.querySelector(".user-list");
  if (!approveUserlist) {
    console.error("approveUserslist not found!");
    return;
  }

  console.log("Users data:", users);
  console.log("Is users an array?", Array.isArray(users));
  approveUserlist.innerHTML = ""; // Clear existing users

  if (users.length === 0) {
    approveUserlist.innerHTML = "<p>No user approved</p>";
    return;
  }

  users.forEach((user, index) => {
    console.log(
      `Rendering approved user list: ${user.firstName} ${user.lastName}, Index: ${index}`
    );

    const userElement = document.createElement("div");
    userElement.classList.add("optionBox");
    userElement.setAttribute("data-user-id", user._id);

    userElement.innerHTML = `
      <div class="userOpt-p">
        <p  style =" width: 50px;" class="userOptNumber">${index + 1}</p>
        <p class="userOptName">${user.firstName} ${user.lastName}</p>
      </div>
      <div class="optionButton">
        <button class="ViewHistoryBtn" data-user-id="${
          user._id
        }">View History</button>
        <button class="editHistoryBtn" data-user-id="${
          user._id
        }">Edit History</button>
      </div>
    `;

    approveUserlist.appendChild(userElement);
  });

  // Attach event listener to each View History button
  document.querySelectorAll(".ViewHistoryBtn").forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-user-id");
      console.log("Fetching history for User ID:", userId);
      document.querySelector(".user-transactions").style.display = "block";
      fetchUserTransactions(userId);
    });
  });

  // Attach event listener to each Edit History button
  document.querySelectorAll(".editHistoryBtn").forEach((button) => {
    button.addEventListener("click", function () {
      selectedUserId = this.getAttribute("data-user-id"); // Store selected user ID globally
      console.log("Editing Transaction for User ID:", selectedUserId);

      document.querySelector(".update-transaction-history").style.display =
        "block";
      fetchUserTransactions(selectedUserId);

      // Dynamically insert user ID into the transaction form
      document.getElementById("transactionUserId").value = selectedUserId;
    });
  });

  // Close transaction history
  const cancelUserTransactionHistory =
    document.querySelector(".cancelUserHistory");
  cancelUserTransactionHistory.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".user-transactions").style.display = "none";
  });

  // Close update transaction history
  cancelUpdateHistoryScreen.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".update-transaction-history").style.display =
      "none";
  });
}

//function populate transaction history}

// Function to display approved users
// Function to display approved users
function displayApprovedUsers(users) {
  const approvedUsersContainer = document.querySelector(".approvedUsers");

  if (!approvedUsersContainer) {
    console.error("Approved users container not found!");
    return;
  }

  approvedUsersContainer.innerHTML = ""; // Clear existing users

  if (users.length === 0) {
    approvedUsersContainer.innerHTML = "<p>No approved users found.</p>";
    return;
  }

  users.forEach((user) => {
    console.log(`Rendering approved user: ${user.firstName} ${user.lastName}`);

    const userElement = document.createElement("div");
    userElement.classList.add("user");
    userElement.setAttribute("data-user-id", user._id); // Store user ID

    userElement.innerHTML = `
      <div class="profie-dv">
        <img src="${
          user.profilePicture || "default-avatar.png"
        }" alt="Profile" class="profile-img"/>
      </div>
      <div>
        <p>${user.firstName} ${user.lastName}</p>
      </div>
      <div class="belowbtn">
        <button class="view-verified-btn" data-user-id="${
          user._id
        }">View user</button>
        <button class="editUser" data-user-id="${user._id}">Edit user</button>
      </div>
    `;

    approvedUsersContainer.appendChild(userElement);
  });

  // ✅ Attach event listener to the "View user" button AFTER adding to DOM
  document.querySelectorAll(".view-verified-btn").forEach((Button) => {
    Button.addEventListener("click", function () {
      const userId = this.getAttribute("data-user-id");
      console.log("Clicked User ID:", userId);
      console.log("All Users in List:", users);
      openProfileScreen(userId, users);
    });
  });

  document.querySelectorAll(".editUser").forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-user-id");
      console.log("Clicked User ID:", userId);
      console.log("All Users in List:", users);
      editUserScreen(userId, users);
    });
  });
}

// Call fetchApprovedUsers when the page loads
document.addEventListener("DOMContentLoaded", fetchApprovedUsers);

function openProfileScreen(userId, users) {
  const user = users.find((u) => u._id === userId);
  if (!user) {
    console.log(user);
    return;
  }

  document.querySelector(".view-profile-div").classList.add("active");

  document.querySelector(".userImg").src =
    user.profilePicture || "default-avatar.png";
  document.querySelector(".fullpicture").src =
    user.profilePicture || "default-avatar.png";

  document.querySelector(".user-names").innerText =
    `${user.firstName} ${user.lastName}` || "N/A";
  document.querySelector(".user-email").innerText = user.email;
  document.querySelector(".user-name").innerText = user.userName;
  document.querySelector(".country-output").innerText = user.countryOfResidence;
  document.querySelector(".state-output").innerText = user.state;
  document.querySelector(".phoneNumber-output").innerText = user.phoneNumber;
  document.querySelector(".address-output").innerText = user.address;
  document.querySelector(".proofAddress-ouput").src =
    user.proofOfAddress || "image/Image.svg";
  document.querySelector(".accountNumber-output").innerText = user.accountNo;
  document.querySelector(".accountType-output").innerText = user.accountType;
  document.querySelector(".occupation-output").innerText = user.occupation;
  document.querySelector(".maritalStatus-output").innerText =
    user.maritalStatus;
  document.querySelector(".gender-output").innerText = user.gender;
  document.querySelector(".dOb-output").innerText = user.dateOfBirth;
  document.querySelector(".account-status").innerText = user.status;
  document.querySelector(".ssn-output").innerText = user.ssn;
  document.querySelector(".account-balance").innerText =
    user.initialDeposit || "";

  // Remove any existing event listeners before adding a new one

  document.getElementById("delete-userbtn").onclick = function () {
    deleteUser(userId);
  };

  document.getElementById("cancel-delete").onclick = function () {
    document.querySelector(".view-profile-div").classList.remove("active");
  };
  document.querySelector(".view-p-cancel-button").onclick = function () {
    document.querySelector(".view-profile-div").classList.remove("active");
  };
}

// const editProfileScreen = document.querySelector(".edit-profile-screen");

document.addEventListener("DOMContentLoaded", fetchApprovedUsers);

function editUserScreen(userId, users) {
  const user = users.find((u) => u._id === userId);
  if (!user) {
    console.log(user);
    return;
  }

  document.querySelector(".edit-image").src =
    user.profilePicture || "default-avatar.png";

  document.querySelector(".edit-profile-screen").classList.add("active");
  document.getElementById("firstName").value = user.firstName || "";
  document.getElementById("middleName").value = user.middleName || "";
  document.getElementById("LastName").value = user.lastName || "";
  document.getElementById("emailInput").value = user.email || "";
  document.getElementById("countryInput").value = user.countryOfResidence || "";
  document.getElementById("stateInput").value = user.state || "";
  document.getElementById("addressInput").value = user.address || "";
  document.getElementById("phone-number").value = user.phoneNumber || "";
  document.getElementById("accountType").value = user.accountType || "";
  document.getElementById("maritalStatus").value = user.maritalStatus || "";
  document.getElementById("occupationInput").value = user.occupation || "";
  document.getElementById("genderInput").value = user.gender || "";
  document.getElementById("currency-input").value = user.initialDeposit || "";
  document.getElementById("ssnInput").value = user.ssn || "";
  document.getElementById("statusInput").value = user.status || "";
  document.getElementById("phoneNumber").value = user.phoneNumber || "";
  document.getElementById("dobInput").value = user.dateOfBirth || "";

  document.getElementById("update-button").onclick = async function () {
    await updateUser(userId);
  };

  document.querySelector(".view-p-cancel-button2").onclick = function () {
    document.querySelector(".edit-profile-screen").classList.remove("active");
  };
}

async function updateUser(userId) {
  const updatedData = {
    firstName: document.getElementById("firstName").value,
    middleName: document.getElementById("middleName").value,
    lastName: document.getElementById("LastName").value,
    email: document.getElementById("emailInput").value,
    countryOfResidence: document.getElementById("countryInput").value,
    state: document.getElementById("stateInput").value,
    address: document.getElementById("addressInput").value,
    phoneNumber: document.getElementById("phone-number").value,
    accountType: document.getElementById("accountType").value,
    maritalStatus: document.getElementById("maritalStatus").value,
    occupation: document.getElementById("occupationInput").value,
    gender: document.getElementById("genderInput").value,
    initialDeposit: document
      .getElementById("currency-input")
      .value.replace(/[^0-9.]/g, ""), // Remove non-numeric characters and convert to float
    ssn: document.getElementById("ssnInput").value,
    status: document.getElementById("statusInput").value,
    dateOfBirth: document.getElementById("dobInput").value,
  };
  console.log(updatedData);
  try {
    const response = await fetch(
      `https://unlimitedfunds.onrender.com/api/v1/admin/update/user/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.status === 401) {
      window.location.href = "/adminlogin.html"; // Redirect to login
      localStorage.removeItem("authToken");
      return;
    }

    if (!response.ok) {
      const data = await response.json();
      console.log("API Response Data:", data);
      throw new Error("Failed to update user");
    }
    Toastify({
      text: "User updated successfully!!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "green",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
    location.reload();

    // document.querySelector(".edit-profile-screen").classList.remove("active");

    await fetchApprovedUsers();
  } catch (error) {
    console.error("Error updating user:", error);
    Toastify({
      text: "Failed to update user.",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
  }
}
// Function to delete a user
async function deleteUser(userId) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `https://unlimitedfunds.onrender.com/api/v1/admin/delete/user/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log("API Response Data:", data);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    Toastify({
      text: "User deleted successfully!.",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "green",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();

    location.reload();
    //fetchPendingUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
    Toastify({
      text: "Failed to delete user. Try again.",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center`, or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Stops timer when hovered
      className: "toast-with-progress", // Add custom class
    }).showToast();
  }
}

async function fetchUserTransactions(userId) {
  try {
    const url = `https://unlimitedfunds.onrender.com/api/v1/admin/transfer/user/${userId}`; // Use query param
    console.log("Fetching transactions from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user transactions. Status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Fetched Transactions Data:", data);

    if (!Array.isArray(data.data)) {
      console.error("Invalid data format:", data);
      return;
    }

    // Sort transactions by date (latest first)
    const sortedTransactions = data.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const editTableBody = document.querySelector(
      ".update-transaction-history tbody"
    );
    const tableBody = document.querySelector(".user-transactions tbody");
    // Clear existing rows
    editTableBody.innerHTML = "";
    tableBody.innerHTML = "";

    sortedTransactions.forEach((transaction) => {
      const row = document.createElement("tr");
      const editRow = document.createElement("tr");

      editRow.classList.add("head");
      editRow.innerHTML = `
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
        <td style=" text-wrap: nowrap;" class=" tdflex">
          <h3>${transaction.beneficiaryName || "N/A"}</h3>
          <p>${
            transaction.transactionType === "credit" ? "Received" : "Sent"
          } - ${new Date(transaction.createdAt).toLocaleDateString()}</p>
        </td>
        <td>$${Number(transaction.amount).toLocaleString()}</td>
        <td
            style=";
            border-radius: 12px;
            border: 1px solid black;
            height: 25px;
            text-align: center;
            align-content: center;
           ">
             Success
        </td>
        <td style=" text-wrap: nowrap;" class=" tdflex">
            <h3>${transaction.bankName || "Unknown Bank"}</h3>
            <p>****${transaction.beneficiaryAccountNumber.slice(-4)}</p>
        </td>
        <td>
            <button class="delete-btn" data-transfer-id="${
              transaction._id
            }">Delete</button>
          </td>
      `;
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
          <td class="amount-td">$${Number(
            transaction.amount
          ).toLocaleString()}</td>
          <td class="status-td" style=" border-radius: 12px; border: 1px solid black; height: 25px; text-align: center; align-content: center;">
            Success
          </td>
          <td style=" text-wrap: nowrap;" class=" tdflex" >
              <h3>${transaction.bankName || "Unknown Bank"}</h3>
              <p>****${transaction.beneficiaryAccountNumber.slice(-4)}</p>
          </td>
      `;
      tableBody.appendChild(row);
      editTableBody.appendChild(editRow);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const transferId = button.getAttribute("data-transfer-id");
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this transaction?"
        );

        if (confirmDelete) {
          try {
            const deleteUrl = `https://unlimitedfunds.onrender.com/api/v1/admin/delete/transfer/${transferId}`;
            const deleteResponse = await fetch(deleteUrl, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (!deleteResponse.ok) {
              throw new Error(
                `Failed to delete transaction. Status: ${deleteResponse.status}`
              );
            }

            // Remove the row from the DOM
            const row = button.closest("tr");
            row.remove();

            // Show success toast
            Toastify({
              text: "Transaction deleted successfully!",
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center`, or `right`
              backgroundColor: "green",
            }).showToast();

            console.log("Transaction deleted successfully.");
          } catch (error) {
            console.error("Error deleting transaction:", error);

            // Show error toast
            Toastify({
              text: "Failed to delete transaction. Please try again.",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "red",
            }).showToast();
          }
        }
      });
    });

    //ad event lister to edit button
  } catch (error) {
    console.error("Error fetching user transactions:", error);

    // Show error toast
    Toastify({
      text: "Failed to fetch transactions. Please try again.",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "red",
    }).showToast();
  }
}
// Close modal

// Logout Function
// document.getElementById("logoutButton").addEventListener("click", function() {
//     localStorage.removeItem("adminToken"); // Clear token
//     window.location.href = "admin-login.html"; // Redirect to login
// });

//toggling images

const viewProfilePictures = document.querySelectorAll(".view-image1");
const fullPictures = document.querySelectorAll(".fullpicture");

viewProfilePictures.forEach((viewImage, index) => {
  viewImage.addEventListener("click", function (event) {
    event.preventDefault();

    // Toggle the corresponding fullpicture (same index)
    if (fullPictures[index]) {
      fullPictures[index].classList.toggle("fullpictureActive");
      console.log("click", fullPictures[index]);
    }
  });
});

// Close only the corresponding fullpicture when clicking on it
fullPictures.forEach((fullPicture) => {
  fullPicture.addEventListener("click", function (event) {
    event.preventDefault();
    fullPicture.classList.remove("fullpictureActive"); // Always remove instead of toggle
  });
});

const viewAddressProofs = document.querySelectorAll(".view-image");
const addressProofs = document.querySelectorAll(".proofAddress");

viewAddressProofs.forEach((viewImage, index) => {
  viewImage.addEventListener("click", function (event) {
    event.preventDefault();

    // Toggle only the corresponding proofAddress (same index)
    if (addressProofs[index]) {
      addressProofs[index].classList.toggle("active");
      console.log("Toggled:", addressProofs[index]);
    }
  });
});

// Close only the corresponding proofAddress when clicking on it
addressProofs.forEach((addressProof) => {
  addressProof.addEventListener("click", function (event) {
    event.preventDefault();
    addressProof.classList.remove("active"); // Always remove instead of toggle
  });
});
