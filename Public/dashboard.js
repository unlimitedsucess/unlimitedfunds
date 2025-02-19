const sendButton = document.querySelector(".send-btn");
const transferScreen = document.querySelector(".transfer-details-screen");
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
const confirmSigntOutbtn = document.querySelectorAll(".yes-signOut")
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

confirmSigntOutbtn.forEach((signOutBtn)=>{
  signOutBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href ="login.html"

  })
})

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

finalConfirmationBtn.addEventListener("click", function (event) {
  event.preventDefault();
  pinBox.classList.toggle("activate3");
  confirmTransfer.classList.toggle("activate2");
});

backtoproceedTransferBtn.addEventListener("click", function (event) {
  event.preventDefault();
  confirmTransfer.classList.toggle("activate2");
  pinBox.classList.toggle("activate3");
});
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

cancelTransferBtn.addEventListener("click", function (event) {
  event.preventDefault();
  transferScreen.classList.toggle("activate1");
});

proceedTransfer.addEventListener("click", function (event) {
  event.preventDefault();

  // Retrieve and trim input values
  const bankName = document.getElementById("bankName").value.trim();
  const accountName = document.getElementById("accountName").value.trim();
  const accountNumber = document.getElementById("accountNumber").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const narration = document.getElementById("narration").value.trim();

  // Validate for empty fields
  if (
    bankName === "" ||
    accountName === "" ||
    accountNumber === "" ||
    amount === "" ||
    narration === ""
  ) {
    alert("Incomplete form");
    return;
  }

  // Toggle classes if validation passes
  confirmTransfer.classList.toggle("activate2");
  transferScreen.classList.toggle("activate1");
});

backToTransferDetails.addEventListener("click", function () {
  transferScreen.classList.toggle("activate1");
  confirmTransfer.classList.toggle("activate2");
});

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

async function fetchUserData() {
  console.log("called");
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No token found! Please log in first.");
    window.location.href = "/login.html"; // Redirect if no token
    return;
  }

  try {
    const response = await fetch(
      "https://unlimitedfunds.onrender.com/api/v1/user",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the header
          "Content-Type": "application/json",
        },
      }
    );

    console.log("User Data Response Status:", response.status);

    if (response.status === 401) {
      alert("Session expired! Redirecting to login.");
      window.location.href = "/login.html";
      localStorage.removeItem("authToken");
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error fetching data:", errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("User Data:", responseData);

    // Call function to populate the dashboard
    populateDashboard(responseData);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Call fetchUserData after the page loads
document.addEventListener("DOMContentLoaded", fetchUserData);

// Function to populate dashboard with user data
function populateDashboard(responseData) {
  const data = responseData.data; // Extract the actual user data

  if (!data) {
    console.error("User data is missing!");
    return;
  }

  // Get elements and check if they exist before setting text content
  const accountBalanceElement = document.getElementById("accountBalance");
  const accounNumberElement = document.getElementById("accounNumber");
  const accountTypeElement = document.querySelectorAll(".accountType");
  const balanceElement = document.getElementById("balance");
  const figuresElement = document.querySelector(".figures");
  const namesElement = document.querySelector(".names");
  const usernameElement = document.querySelectorAll(".username");
  const profileImageElement = document.querySelectorAll(".profilePics");
  const greetUser = document.getElementById("greetingUser");
  const accounNumber = document.querySelectorAll(".accountNumber");
  const userNames = document.querySelectorAll(".names");
  const fullName = document.querySelector(".fullnames");
  const emailAddress = document.querySelectorAll(".emailaddress");
  const userAddress = document.querySelectorAll(".useraddress");
  const stateEl = document.querySelectorAll(".stateData")
  const dobEl = document.querySelectorAll(".dateObirt")
  const countryEl = document.querySelectorAll(".CountryResidence")
  

  countryEl.forEach((country)=>{
    if(country)country.textContent = data.countryOfResidence|| "Not available";

  })

  dobEl.forEach((dOB)=>{
    if(dOB)dOB.textContent = data.dateOfBirth|| "Not available";
  } )


  stateEl.forEach((state) =>{
    if(state)state.textContent = data.state|| "Not available";
  })
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
      accountType.textContent = data.accountType || "Not available";
  });

  if (greetUser) greetUser.textContent = `Hello, ${data.firstName}` || "N/A";
  if (accountBalanceElement)
    accountBalanceElement.textContent = data.initialDeposit
      ? `$${Number(data.initialDeposit).toLocaleString()}`
      : "Not available";
  if (accounNumberElement)
    accounNumberElement.textContent = data.accountNo || "Not available";
  if (accountTypeElement)
    accountTypeElement.textContent = data.accountType || "Not available";
  if (balanceElement)
    balanceElement.textContent = data.initialDeposit
      ? `$${Number(data.initialDeposit).toLocaleString()}`
      : "Not available";
  if (figuresElement)
    figuresElement.textContent = data.initialDeposit
      ? `$${Number(data.initialDeposit).toLocaleString()}`
      : "Not available";
  if (namesElement)
    namesElement.textContent =
      `${data.firstName} ${data.lastName}` || "Not available";

  usernameElement.forEach((username) => {
    if (username) username.textContent = `@${data.userName}` || "Not available";
  });

  profileImageElement.forEach((profilepics)=>{
    if (profilepics && data.profilePicture) {
      profilepics.src = data.profilePicture;
    }
  })
  // If profile picture exists, update the image source
  

}

// function displayUserData(userId, users){
//   const user =
// }
// Example usage
// async function main() {
//   const email = "your_email@example.com"; // Replace with real email
//   const password = "your_password"; // Replace with real password

//   const token = await loginAndGetToken(email, password);
//   if (token) {
//     await fetchUserData();
//   }
// }

//main(); // Run script
