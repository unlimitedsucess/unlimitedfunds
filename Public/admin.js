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
calcelUserTransactionHistory.addEventListener("click", function (event) {
  event.preventDefault();
  userTransactionHistory.classList.toggle("userHistory-active");
});

// view edit history and create history screen section
editHistoryButton.addEventListener("click", function (event) {
  event.preventDefault();
  updateHistoryScreen.classList.toggle("updateHistory-active");
  transactionOptionScreen.classList.toggle("optionScreen-active");
});

// close update screen
cancelUpdateHistoryScreen.addEventListener("click", function (event) {
  event.preventDefault();
  updateHistoryScreen.classList.toggle("updateHistory-active");
});

// create transaction screen active

CreateTransactionButton.addEventListener("click", function (event) {
  event.preventDefault();
  createScreen.classList.toggle("createScreen-active");
});

cancelCreateScreenBtn.addEventListener("click", function (event) {
  event.preventDefault();
  createScreen.classList.toggle("createScreen-active");
});

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
    alert("login expired.....");
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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data);

    // Ensure the 'users' field exists and is an array
    const users = Array.isArray(data.data) ? data.data : [];
    console.log("Users:", users);

    if (users.length === 0) {
      alert("No users found.");
      return;
    }

    // Filter pending users based on their status
    const pendingUsers = users.filter(
      (user) => user.status?.trim().toLowerCase() === "hold"
    );

    if (pendingUsers.length === 0) {
      alert("No pending users found.");
      return;
    }

    displayPendingUsers(pendingUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("Failed to fetch users. Please try again.");
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
    return;
  }

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
    alert("User not found!");
    return;
  }
 
  document.querySelector(".view-new-user").classList.add("newUser-active");



    const profilepic = document.querySelectorAll(".userImg")
    profilepic.forEach((profilepicture) =>{
      profilepicture.src =  user.profilePicture || "default-avatar.png";
    })

    const fullprofile = document.querySelectorAll(".fullpicture")
    fullprofile.forEach((fullProfilep) =>{
      fullProfilep.src = user.profilePicture  || "default-avatar.png";
    })
  document.querySelector(
    ".user-names"
  ).innerText = `${user.firstName} ${user.lastName}`;
  document.querySelector(".user-email").innerText = user.email;
  document.querySelector(".user-name").innerText = user.userName;
  document.querySelector(".country-output").innerText = user.countryOfResidence;
  document.querySelector(".state-output").innerText = user.state;
  document.querySelector(".phoneNumber-output").innerText = user.phoneNumber;
  document.querySelector(".address-output").innerText = user.address;
  const proofOfAddress = document.querySelectorAll(".proofAddress-ouput")
  proofOfAddress.forEach((proofpic)=>{
    proofpic.src=  user.proofOfAddress || "image/Image.svg";
  })

  
  document.querySelector(".accountNumber-output").innerText = user.accountNo;
  document.querySelector(".accountType-output").innerText = user.accountType;
  document.querySelector(".occupation-output").innerText = user.occupation;
  document.querySelector(".maritalStatus-output").innerText =
    user.maritalStatus;
    document.querySelector(".accountBalance").innerText =`$${user.initialDeposit}`;
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
    alert("login expired.....");
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
    alert("Failed to approve user. Try again.");
  }
}

// Function to move a user to the Approved Users section
function moveUserToApproved(userId) {
  const pendingUsersContainer = document.querySelector(".penddingUsers"); // Pending users section
  const approvedUsersContainer = document.querySelector(".approvedUsers"); // Approved users section

  if (!pendingUsersContainer || !approvedUsersContainer) {
    console.error("One or more user containers not found!");
    return;
  }

  // Find the user element in pending users list
  const userElement = pendingUsersContainer.querySelector(
    `.user[data-user-id="${userId}"]`
  );

  if (!userElement) {
    console.error(`User with ID ${userId} not found in pending list.`);
    return;
  }

  // Remove user from pending list
  userElement.remove();

  // Modify buttons for approved user
  const buttonsDiv = userElement.querySelector(".belowbtn");
  buttonsDiv.innerHTML = `
    <button class="view-verified-btn">View user</button>
    <button class="editUser">Edit user</button>
  `;

  // Move to approved users section
  approvedUsersContainer.appendChild(userElement);

  console.log(`✅ User ${userId} moved to Approved Users.`);
}

// Function to fetch and display approved users
async function fetchApprovedUsers() {


  if (!token) {
    alert("No token found! Please log in.");
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
      alert("No approved users found.");
      return;
    }

    displayApprovedUsers(approvedUsers);
  } catch (error) {
    console.error("Error fetching approved users:", error);
    alert("Failed to fetch approved users. Please try again.");
  }
}

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
    alert("User not found!");
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
  document.querySelector(".account-balance").innerText = user.initialDeposit || "";

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
    alert("User not found!");
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
  document.getElementById("dobInput").value = user.dateOfBirth || ""

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
    initialDeposit: document.getElementById("currency-input").value.replace(/[^0-9.]/g, ""), // Remove non-numeric characters and convert to float
    ssn: document.getElementById("ssnInput").value,
    status: document.getElementById("statusInput").value,
    dateOfBirth: document.getElementById("dobInput").value,
  };
console.log(updatedData)
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
      throw new Error("Failed to update user"); }

      alert("User updated successfully!");
      location.reload();

    // document.querySelector(".edit-profile-screen").classList.remove("active");

    await fetchApprovedUsers();
  } catch (error) {
    console.error("Error updating user:", error);
    alert("Failed to update user.");
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

    alert("User deleted successfully!");
    location.reload();
    //fetchPendingUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Failed to delete user. Try again.");
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

