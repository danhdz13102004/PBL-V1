import * as HeaderUtils from "./header.js";
document
  .querySelector(`header-component`)
  .addEventListener(`headerReady`, () => {
    let shadowRoot = document.querySelector(`header-component`).shadowRoot;
    HeaderUtils.setIsUserLogin(false);
  });

// Warning CapsLock
const passwordInputs = document.querySelectorAll('input[type="password"]');
passwordInputs.forEach((passwordInput) => {
  const passwordInputField = passwordInput.parentNode;
  const passwordAlertMessage =
    passwordInputField.querySelector(`.form__alert-message`);
  const formField = passwordInput.closest(".form-field");
  passwordInput.addEventListener(`keyup`, (event) => {
    if (event.getModifierState("CapsLock")) {
      passwordInputField.classList.add(`warning`);
      passwordAlertMessage.textContent = `Lưu ý: Bạn đang bật Caps Lock`;
    } else {
      passwordInputField.classList.remove(`warning`);
      passwordAlertMessage.textContent = ``;
    }
  });

  // Hide/Show password
  const eyeOpen = passwordInput.parentNode.querySelector(
    ".form__eye-hide-password"
  );
  console.log(eyeOpen);
  const eyeClose = passwordInput.parentNode.querySelector(
    ".form__eye-show-password"
  );
  const eyeWrap = eyeOpen.parentNode;
  const switchOpenClosePassword = () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    eyeOpen.classList.toggle("hidden");
    eyeClose.classList.toggle("hidden");
  };
  eyeWrap.addEventListener("click", switchOpenClosePassword);
});
