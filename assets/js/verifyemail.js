import * as HeaderUtitls from "./header.js";
document
  .querySelector(`header-component`)
  .addEventListener(`headerReady`, () => {
    let shadowRoot = document.querySelector(`header-component`).shadowRoot;
    HeaderUtitls.setIsUserLogin(false);
    HeaderUtitls.initHeader(shadowRoot, HeaderUtitls.isUserLogin);
  });
const otpInput = document.getElementById(`form__input-otp`);
otpInput.addEventListener(`keydown`, (event) => {
  if (event.key === `-` || event.key === `e`) {
    event.preventDefault();
  }
});

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
