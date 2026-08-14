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

// переключение активного пациента в верхней панели

document.addEventListener("DOMContentLoaded", () => {
  const patientButtons = document.querySelectorAll(".patient-button");

  patientButtons.forEach((button) => {
    button.addEventListener("click", () => {
      patientButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

// СТРАНИЦЫ ЗАПИСИ
// переключение кнопок .button-choose + активация кнопки "Продолжить"
document.addEventListener("DOMContentLoaded", () => {
  const groups = document.querySelectorAll(".buttons-choose");

  groups.forEach((group) => {
    const buttons = group.querySelectorAll(".button-choose");
    if (!buttons.length) return;

    // ищем ближайший общий блок и в нём кнопку "Продолжить"
    const appointmentContainer = group.closest(".appointment-container");
    const continueButton = appointmentContainer
      ? appointmentContainer.querySelector(".main-button")
      : null;

    function setButtonState(button, isActive) {
      button.classList.toggle("active", isActive);

      // если внутри кнопки есть пара картинок .choose-icon (обычная/активная) — переключаем их
      const chooseIcons = button.querySelectorAll(".choose-icon");
      if (chooseIcons.length === 2) {
        chooseIcons[0].classList.toggle("hide", isActive);
        chooseIcons[1].classList.toggle("hide", !isActive);
      }

      // если внутри кнопки есть галочка .check-icon — показываем/скрываем её
      const checkIcon = button.querySelector(".check-icon");
      if (checkIcon) {
        checkIcon.classList.toggle("hide", !isActive);
      }
    }

    function updateContinueButton() {
      if (!continueButton) return;
      const hasActive = group.querySelector(".button-choose.active");
      continueButton.classList.toggle("disabled", !hasActive);
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => setButtonState(btn, btn === button));
        updateContinueButton();
      });
    });

    // изначальное состояние: ничего не выбрано — кнопка "Продолжить" неактивна
    updateContinueButton();
  });
});
