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

// Переключение вкладок "Предстоящие" / "Прошедшие"
document.addEventListener("DOMContentLoaded", () => {
  const toggleUpcoming = document.querySelector(".toggle.upcoming");
  const togglePast = document.querySelector(".toggle.past");
  const appointmentItems = document.querySelectorAll(".appointment-item");

  if (!toggleUpcoming || !togglePast) return;

  function showUpcoming() {
    toggleUpcoming.classList.add("active");
    togglePast.classList.remove("active");

    appointmentItems.forEach((item) => {
      const isDone = item.querySelector(".appointment-state.done");
      item.classList.toggle("hide", Boolean(isDone));
    });
  }

  function showPast() {
    togglePast.classList.add("active");
    toggleUpcoming.classList.remove("active");

    appointmentItems.forEach((item) => {
      const isDone = item.querySelector(".appointment-state.done");
      item.classList.toggle("hide", !isDone);
    });
  }

  toggleUpcoming.addEventListener("click", showUpcoming);
  togglePast.addEventListener("click", showPast);
});
