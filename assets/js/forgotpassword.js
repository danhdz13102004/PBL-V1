import * as HeaderUtils from "./header.js";
document
  .querySelector(`header-component`)
  .addEventListener(`headerReady`, () => {
    let shadowRoot = document.querySelector(`header-component`).shadowRoot;
    HeaderUtils.setIsUserLogin(false);
    HeaderUtils.initHeader(shadowRoot, HeaderUtils.isUserLogin);
  });
const otpInput = document.getElementById(`form__input-otp`);
otpInput.addEventListener(`keydown`, (event) => {
  if (event.key === `-` || event.key === `e`) {
    event.preventDefault();
  }
});

//* Click button Send OTP Code
const btnSendOTPCodeToEmail = document.getElementById(`btnSendOTPCodeToEmail`);
btnSendOTPCodeToEmail.addEventListener(`click`, () => {
  btnSendOTPCodeToEmail.setAttribute(`disabled`, true);
  btnSendOTPCodeToEmail.style.color = `var(--text-gray-color)`;
  btnSendOTPCodeToEmail.style.borderColor = `var(--text-gray-color)`;
  btnSendOTPCodeToEmail.style.cursor = `default`;
  let timeCountDown = 5;
  btnSendOTPCodeToEmail.innerHTML = `Gửi lại mã sau (${timeCountDown}s)`;
  let timer = setInterval(() => {
    --timeCountDown;
    btnSendOTPCodeToEmail.innerHTML = `Gửi lại mã sau (${timeCountDown}s)`;
    if (timeCountDown === 0) {
      clearInterval(timer);
      btnSendOTPCodeToEmail.innerHTML = `Gửi mã OTP`;
      btnSendOTPCodeToEmail.removeAttribute(`disabled`);
      btnSendOTPCodeToEmail.style.color = `var(--blue-color)`;
      btnSendOTPCodeToEmail.style.borderColor = `var(--blue-color)`;
      btnSendOTPCodeToEmail.style.cursor = `pointer`;
    }
  }, 1000);
});
//* Click button Return
const btnReturnLoginPage = document.getElementById(`btnReturnLoginPage`);
btnReturnLoginPage.addEventListener(`click`, ()=>{
  window.location.href = `/login.html`;
})

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
    `#form__eye-hide-password`
  );
  const eyeClose = passwordInput.parentNode.querySelector(
    `#form__eye-show-password`
  );
  const eyeWrap = eyeOpen.parentNode;
  const switchOpenClosePassword = () => {
    const type =
      passwordInput.getAttribute(`type`) === `password` ? `text` : `password`;
    passwordInput.setAttribute(`type`, type);
    eyeOpen.classList.toggle("hidden");
    eyeClose.classList.toggle("hidden");
  };
  eyeWrap.addEventListener(`click`, switchOpenClosePassword);
});
