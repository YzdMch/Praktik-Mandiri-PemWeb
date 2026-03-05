// Welcome overlay fade out
setTimeout(() => {
  const overlay = document.getElementById("welcomeOverlay");
  if (overlay) {
    overlay.classList.add("fade-out");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 800);
  }
}, 1500);

// Munculkan ribbon setelah 1 detik
setTimeout(() => {
  const ribbon = document.getElementById("topRibbon");
  if (ribbon) {
    ribbon.classList.add("show");
  }
}, 1000);

// Burger menu
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
