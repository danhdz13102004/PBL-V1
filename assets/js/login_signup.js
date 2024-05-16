import {Validator} from './validator.js';
import * as HeaderUtils from './header.js';
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

Validator({
  form: `#signup #form`,
  formField: `#signup .form-field`,
  rules: [
    Validator.isRequired(`#signup #form__input-email`,`Vui lòng nhập vào trường email`),
    Validator.isEmail(`#signup #form__input-email`),
    Validator.isRequired(`#signup #form__input-username`, `Vui lòng nhập đầy đủ họ tên của bạn`),
    Validator.isFullName(`#signup #form__input-username`),
    Validator.isRequired(`#signup #form__input-phone-number`,`Vui lòng nhập vào số điện thoại của bạn`),
    Validator.isPhoneNumber(`#signup #form__input-phone-number`),
    Validator.isRequired(`#signup #form__input-password`,`Vui lòng nhập mật khẩu`),
    Validator.isRequired(`#signup #form__input-confirm-password`),
    Validator.isConfirmed(`#signup #form__input-confirm-password`, () => { return document.querySelector(`#signup #form__input-password`).value;}, `Mật khẩu nhập lại không khớp`)
  ],
  alertMessage: `.form__alert-message`,
  onSubmit: function (data) {
    let datas = {...data};
    console.log(datas);
  }
})

Validator({
  form: `#login #form`,
  formField: `#login .form-field`,
  rules: [
    Validator.isRequired(`#login #form__input-email`,`Vui lòng nhập vào trường email`),
    Validator.isEmail(`#login #form__input-email`),
    Validator.isRequired(`#login #form__input-password`,`Vui lòng nhập mật khẩu`),
  ],
  alertMessage: `.form__alert-message`,
});