// Data estimasi harga (simulasi)
const priceMatrix = {
  macbook: {
    lcd: [800000, 1200000],
    battery: [450000, 600000],
    ssd: [350000, 500000],
    thermal: [150000, 200000],
    other: [200000, 500000],
  },
  windows: {
    lcd: [500000, 800000],
    battery: [300000, 450000],
    ssd: [250000, 400000],
    thermal: [100000, 150000],
    other: [150000, 400000],
  },
  pc: {
    lcd: [600000, 1000000],
    battery: [400000, 550000],
    ssd: [300000, 450000],
    thermal: [120000, 180000],
    other: [180000, 450000],
  },
  imac: {
    lcd: [1500000, 2500000],
    battery: [800000, 1200000],
    ssd: [500000, 800000],
    thermal: [250000, 350000],
    other: [300000, 700000],
  },
  other: {
    lcd: [400000, 700000],
    battery: [250000, 400000],
    ssd: [200000, 350000],
    thermal: [100000, 150000],
    other: [100000, 300000],
  },
};

const branchNames = {
  jaksel: "Jakarta Selatan (Head Office)",
  jakpus: "Jakarta Pusat",
  jakbar: "Jakarta Barat",
  jaktim: "Jakarta Timur",
  jakut: "Jakarta Utara",
  tangerang: "Tangerang",
  bekasi: "Bekasi",
  depok: "Depok",
};

const deviceNames = {
  macbook: "MacBook Pro / Air",
  windows: "Windows Laptop",
  pc: "Desktop PC",
  imac: "iMac / Mac Desktop",
  other: "Lainnya",
};

const issueNames = {
  lcd: "Layar Pecah / LCD Rusak",
  battery: "Baterai Kembang / Drop",
  ssd: "Upgrade SSD",
  thermal: "Thermal Paste / Cleaning",
  other: "Lainnya",
};

// Form elements
const form = document.getElementById("priceForm");
const submitBtn = document.getElementById("submitBtn");
const resultCard = document.getElementById("resultCard");
const ticketSpan = document.getElementById("ticketNumber");
const resultDevice = document.getElementById("resultDevice");
const resultIssue = document.getElementById("resultIssue");
const resultBranch = document.getElementById("resultBranch");
const resultPrice = document.getElementById("resultPrice");

// Validation helper
function validateField(fieldId, groupId) {
  const field = document.getElementById(fieldId);
  const group = document.getElementById(groupId);
  const value = field.value.trim();
  let isValid = true;

  if (fieldId === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  } else if (fieldId === "phone") {
    isValid = value.length >= 8 && /^[0-9]+$/.test(value.replace(/[-\s]/g, ""));
  } else if (
    fieldId === "device" ||
    fieldId === "issue" ||
    fieldId === "branch"
  ) {
    isValid = value !== "";
  } else {
    isValid = value !== "";
  }

  if (!isValid) {
    group.classList.add("error");
  } else {
    group.classList.remove("error");
  }
  return isValid;
}

// Real-time validation on blur
document
  .getElementById("nama")
  .addEventListener("blur", () => validateField("nama", "group-nama"));
document
  .getElementById("email")
  .addEventListener("blur", () => validateField("email", "group-email"));
document
  .getElementById("phone")
  .addEventListener("blur", () => validateField("phone", "group-phone"));
document
  .getElementById("device")
  .addEventListener("change", () => validateField("device", "group-device"));
document
  .getElementById("issue")
  .addEventListener("change", () => validateField("issue", "group-issue"));
document
  .getElementById("branch")
  .addEventListener("change", () => validateField("branch", "group-branch"));
document
  .getElementById("description")
  .addEventListener("blur", () =>
    validateField("description", "group-description"),
  );

// Generate random ticket
function generateTicket() {
  return "GEEK-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Get price range
function getPriceRange(device, issue) {
  if (!priceMatrix[device] || !priceMatrix[device][issue]) return [0, 0];
  return priceMatrix[device][issue];
}

// Format rupiah
function formatRupiah(amount) {
  return "Rp " + amount.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&.");
}

// Reset form
window.resetForm = function () {
  form.reset();
  resultCard.classList.remove("show");
  submitBtn.disabled = false;
  submitBtn.innerHTML = `<span>Dapatkan Estimasi</span> <i class="fas fa-arrow-right"></i>`;
  // remove all error classes
  document
    .querySelectorAll(".form-group")
    .forEach((g) => g.classList.remove("error"));
};

// Handle form submit
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Validate all fields
  const validNama = validateField("nama", "group-nama");
  const validEmail = validateField("email", "group-email");
  const validPhone = validateField("phone", "group-phone");
  const validDevice = validateField("device", "group-device");
  const validIssue = validateField("issue", "group-issue");
  const validBranch = validateField("branch", "group-branch");
  const validDesc = validateField("description", "group-description");

  if (
    !validNama ||
    !validEmail ||
    !validPhone ||
    !validDevice ||
    !validIssue ||
    !validBranch ||
    !validDesc
  ) {
    return;
  }

  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="loader"></span> Memproses...`;

  // Simulate network delay
  setTimeout(() => {
    // Get values
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const device = document.getElementById("device").value;
    const issue = document.getElementById("issue").value;
    const branch = document.getElementById("branch").value;
    const description = document.getElementById("description").value;

    // Generate ticket
    const ticket = generateTicket();

    // Get price range
    const [min, max] = getPriceRange(device, issue);
    const priceText =
      min === 0 && max === 0
        ? "Estimasi akan diinformasikan setelah teknisi memeriksa"
        : `${formatRupiah(min)} - ${formatRupiah(max)}`;

    // Fill result card
    ticketSpan.textContent = ticket;
    resultDevice.textContent = deviceNames[device] || device;
    resultIssue.textContent = issueNames[issue] || issue;
    resultBranch.textContent = branchNames[branch] || branch;
    resultPrice.textContent = priceText;

    // Show result
    resultCard.classList.add("show");
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Dapatkan Estimasi</span> <i class="fas fa-arrow-right"></i>`;

    // Optional: scroll to result
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Here you could also send data to server using fetch
    console.log({
      nama,
      email,
      phone,
      device,
      issue,
      branch,
      description,
      ticket,
    });
  }, 1500); // simulate 1.5s loading
});

// Burger menu (copy from homepage)
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");
burger.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  const icon = burger.querySelector("i");
  if (mobileNav.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

const mobileLinks = mobileNav.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    const icon = burger.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});
