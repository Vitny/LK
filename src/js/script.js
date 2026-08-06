const burgerMenu = document.querySelector(".burger-menu");
const sideMenu = document.querySelector(".side-menu");

// Создаём затемнение фона
const menuOverlay = document.createElement("div");
menuOverlay.classList.add("menu-overlay");

document.body.appendChild(menuOverlay);

// Открытие / закрытие меню
function toggleMenu() {
  const isOpen = sideMenu.classList.toggle("menu-open");

  burgerMenu.classList.toggle("active", isOpen);
  menuOverlay.classList.toggle("active", isOpen);

  // Блокируем скролл основного контента
  document.body.classList.toggle("menu-is-open", isOpen);
}

// Закрытие меню
function closeMenu() {
  sideMenu.classList.remove("menu-open");
  burgerMenu.classList.remove("active");
  menuOverlay.classList.remove("active");

  document.body.classList.remove("menu-is-open");
}

// Клик по бургеру / кресту
burgerMenu.addEventListener("click", toggleMenu);

// Клик по затемнённой области
menuOverlay.addEventListener("click", closeMenu);

// Блокируем скролл основного контейнера
document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector(".main-container");

  if (mainContainer) {
    const observer = new MutationObserver(() => {
      const isOpen = sideMenu.classList.contains("menu-open");

      mainContainer.style.overflowY = isOpen ? "hidden" : "";
      mainContainer.style.overflowX = isOpen ? "hidden" : "";
    });

    observer.observe(sideMenu, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
});

// Если экран стал шире мобильного — закрываем меню
window.addEventListener("resize", () => {
  if (window.innerWidth > 1000) {
    closeMenu();
  }
});
