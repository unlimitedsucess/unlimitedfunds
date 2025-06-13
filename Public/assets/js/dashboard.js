const token = localStorage.getItem("authToken");

document.addEventListener("DOMContentLoaded", function () {
  fetchUserData();
});

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
        window.location.href = "/logins.html";
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
    console.log(responseData, "Checking....");
  } catch (error) {
    console.error("Error fetching user data:", error);
    showErrorToast(error.message);
  }
}
//
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
    callback: () => {},
  }).showToast();
}

function populateDashboard(responseData) {
  const data = responseData.data;
  if (!data) {
    console.error("User data is missing!");
    return;
  }

  const profileImage = document.querySelectorAll(".profileImage");
  const profileName = document.querySelectorAll(".profileName");
  const balance = document.querySelectorAll(".balance");
  const accountNumber = document.querySelectorAll(".accountNo");
  const rountingNo = document.querySelectorAll(".rountingNumber");
  const swiftCode = document.querySelectorAll(".swiftCode");
  const accountType = document.querySelectorAll(".accountType");

  accountType.forEach((accouunt) => {
    if (accouunt) {
      accouunt.textContent = data.accountType;
    }
  });
  balance.forEach((balance) => {
    if (balance) {
      const amount = data.initialDeposit;
      balance.textContent = amount ? Number(amount).toLocaleString() : "N/A";
    }
  });

  profileName.forEach((profilename) => {
    if (profilename) {
      profilename.textContent = `${data.firstName} ${data.lastName}`;
    }
  });

  profileImage.forEach((profileimage) => {
    if (profileimage && data.profilePicture) {
      profileimage.src = data.profilePicture;
    }
  });

  accountNumber.forEach((accontNo) => {
    if (accontNo) {
      accontNo.textContent = data.accountNo;
      accontNo.placeholder = data.accountNo;
    }
  });

  rountingNo.forEach((rounting) => {
    if (rounting) {
      rounting.textContent = data.routingNumber;
      rounting.placeholder = data.routingNumber;
    }
  });
  swiftCode.forEach((swift) => {
    if (swift) {
      swift.textContent = data.swiftcode;
      swift.placeholder = data.swiftcode;
    }
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document.getElementById("transactionTableBody");

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

      if (response.status === 401) {
        window.location.href = "../logins.html";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch transactions.");
      }

      const data = await response.json();
      console.log("transaction history:", data);

      if (!Array.isArray(data.data)) {
        console.error("Invalid data format:", data);
        return;
      }

      const sortedTransactions = data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Clear table
      tableBody.innerHTML = "";

      sortedTransactions.forEach((txn, index) => {
        const createdAt = new Date(txn.createdAt); // Use createdAt here

        const date = createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        });

        const time = createdAt.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "UTC",
        });

        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${index + 1}</td>
    <td><div class="td-content product-invoice">$${txn.amount}</div></td>
    <td><div class="td-content product-brand text-primary">
      <span class='text-${
        txn.transactionType === "credit" ? "success" : "danger"
      }'>
        ${txn.transactionType}
      </span>
    </div></td>
    <td><div class="td-content product-invoice">${
      txn.beneficiaryName
    }</div></td>
    <td><div class="td-content product-brand">${txn.narration}</div></td>
    <td><div class="td-content product-invoice">${date}</div></td>
    <td><div class="td-content pricing"><span>${time}</span></div></td>
    <td><div class="td-content">
      <span class="badge outline-badge-primary shadow-none col-md-12">Completed</span>
    </div></td>
  `;
        tableBody.appendChild(row);
      });

      // Notifications (last 3)
      const notificationContainer = document.querySelector(
        ".dropdown-menu .notification-scroll"
      );
      if (notificationContainer) {
        notificationContainer.innerHTML = "";

        const recentTransactions = sortedTransactions.slice(0, 3);
        recentTransactions.forEach((txn) => {
          const typeClass =
            txn.transactionType === "credit" ? "text-success" : "text-danger";
          const icon =
            txn.transactionType === "credit"
              ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-x-circle text-danger">
                 <circle cx="12" cy="12" r="10"></circle>
                 <line x1="15" y1="9" x2="9" y2="15"></line>
                 <line x1="9" y1="9" x2="15" y2="15"></line>
               </svg>`;

          notificationContainer.innerHTML += `
            <div class="dropdown-item">
              <div class="media">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-activity">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <div class="media-body">
                  <div class="data-info">
                    <h6 class=""><span class="${typeClass}">
                      ${
                        txn.transactionType === "credit"
                          ? "Credit [Alert]"
                          : "Debit [Alert]"
                      }
                    </span></h6>
                    <p class="">$${Number(txn.amount).toLocaleString()}</p>
                  </div>
                  <div class="icon-status">${icon}</div>
                </div>
              </div>
            </div>
          `;
        });
      }

      // Today’s total debit subtraction from 50,000
      const today = new Date().toISOString().split("T")[0];
      const todaysTransactions = sortedTransactions.filter(
        (txn) =>
          new Date(txn.createdAt).toISOString().split("T")[0] === today &&
          txn.transactionType === "debit"
      );
      const totalDebits = todaysTransactions.reduce(
        (sum, txn) => sum + Number(txn.amount),
        0
      );
      const remaining = 50000 - totalDebits;

      const limitEl = document.querySelector(".limitRemain");
      if (limitEl) {
        limitEl.textContent = `$${remaining.toLocaleString()}`;
      }

      // Last transaction amount
      const lastTransaction = sortedTransactions[0];
      const lastEl = document.querySelector(".lastTransaction");
      if (lastTransaction && lastEl) {
        lastEl.textContent = `$${Number(
          lastTransaction.amount
        ).toLocaleString()}`;
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  fetchTransactions();
});
