document.addEventListener("DOMContentLoaded", () => {
  // Select the burger element
  const burger = document.querySelector(".navbar-burger");
  // Select the menu element
  const menu = document.querySelector(".navbar-menu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      // Toggle the "is-active" class on both
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");

      // Toggle aria-expanded for accessibility
      const isOpen = burger.classList.contains("is-active");
      burger.setAttribute("aria-expanded", isOpen);
    });
  }
});
