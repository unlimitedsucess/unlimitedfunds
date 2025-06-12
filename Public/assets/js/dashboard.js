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

      console.log("Fetched Transactions Data:", data);

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

      sortedTransactions.forEach((txn, index) => {
        const updatedAt = new Date(txn.updatedAt);
        const date = updatedAt.toLocaleDateString(); // e.g., "6/12/2025"
        const time = updatedAt.toLocaleTimeString(); // e.g., "12:38:18 PM"
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${index + 1}</td>
      <td><div class="td-content product-invoice">$${txn.amount}</div></td>
      <td><div class="td-content product-brand text-primary">
        <span class='text-${
          txn.transactionType === "credit" ? "success" : "danger"
        }'>${txn.transactionType}</span>
      </div></td>
      <td><div class="td-content product-invoice">${
        txn.beneficiaryName
      }</div></td>
      <td><div class="td-content product-brand">${txn.narration}</div></td>
      <td><div class="td-content product-invoice">${date}</div></td>
      <td><div class="td-content pricing"><span>${time}</span></div></td>
    <td><div class="td-content">
  <span class="badge outline-badge-primary shadow-none col-md-12">
    Completed
  </span>
</div></td>
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
