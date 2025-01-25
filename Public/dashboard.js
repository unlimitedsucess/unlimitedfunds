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
const helpbutton = document.querySelectorAll(".help-btn");
const helpDetails = document.querySelectorAll(".help-screen");

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
