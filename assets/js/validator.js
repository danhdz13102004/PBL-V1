let selectorRules = {};
export const Validator = (options) => {
  const getParent = (element, selector) => {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  };
  // Validate tất cả các rule test funtion của 1 trường input
  const validate = (inputElement, rule) => {
    // const errorMessage = rule.test(inputElement.value);
    let errorMessage;
    const formField = getParent(inputElement, options.formField);
    const fieldMessage = formField.querySelector(options.alertMessage);
    const arrayRuleFunction = selectorRules[rule.selector];
    for (let i = 0; i < arrayRuleFunction.length; i++) {
      //arrayRuleFunction[i] = test function ở vị trí i trong mảng của rule.selector
      errorMessage = arrayRuleFunction[i](inputElement.value);
      switch (inputElement.type) {
        case `radio`: {
        }
        case `checkbox`: {
          errorMessage = rule[i](
            formElement.querySelector(rule.selector + ":checked")
          );
        }
        default: {}
      }
      if (errorMessage) break;
    }
    if (errorMessage) {
      formField.classList.add(`error`);
      fieldMessage.innerText = errorMessage;
    } else {
      formField.classList.remove(`error`);
      fieldMessage.innerText = ``;
    }
    return !errorMessage;
    // truong ko sai => undefined => !(undefined) = true (valid)
  };
  const formElement = document.querySelector(options.form);
  if (formElement) {
    formElement.onsubmit = (e) => {
      e.preventDefault();
      let isFormValid = true;
      options.rules.forEach((rule) => {
        const inputElement = formElement.querySelector(rule.selector);
        let isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });
      if (isFormValid) {
        if (typeof options.onSubmit === "function") {
          let enableInputs = formElement.querySelectorAll(`[name]`);
          let formValues = Array.from(enableInputs).reduce(function (values,input) {
            switch (input.type) {
              case `radio`: {
                values[input.name] = formElement.querySelector(
                  `input[name="` + input.name + `"]:checked`.value);
                break;
              }
              case `checkbox`: {
                if(!input.matches(`:checked`)) return values;
                if(!Array.isArray(values[input.name])){
                  values[input.name] = [];
                }
                values[input.name].push();
                break;
              }
              case `file`: {
                values[input.name] = input.files;
                break;
              }
              default: {
                values[input.name] = input.value;
                break;
              }
            }
            return values;
          },
          {});
          // khởi tạo values = {}, môi lần lặp qua lưu value vào input tương ứng
          // Trả về object từ mảng enableInput
          options.onSubmit(formValues);
        } else {
          //ko co onSubmit, submit voi voi hanh vi mac dinh
          formElement.submit();
        }
      }
    };
    // Lặp qua mỗi rule và validate
    options.rules.forEach((rule) => {
      // selectorRules đã tồn tại key tương ứng với selector của rule, ta sẽ push rule test vào mảng các test function.
      // Nếu selectorRules chưa có key tương ứng, ta sẽ khai báo một mảng mới và thêm rule test vào mảng đó.
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }
      let inputElement = formElement.querySelector(rule.selector);
      if (inputElement) {
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };
        inputElement.oninput = () => {
          const fieldMessage = formElement.querySelector(options.alertMessage);
          fieldMessage.innerText = ``;
          getParent(inputElement, options.formField).classList.remove(`error`);
        };
      }
    });
  }
};
// Khi có lỗi => Message lỗi
// Khi hợp lệ => Ko trả ra gì cả / undefined
Validator.isRequired = (selector, message) => {
  return {
    selector: selector,
    test: function (value) {
      return value.trim().length > 0
        ? undefined
        : message || "Vui lòng nhập trường này";
    },
  };
};
Validator.isEmail = (selector, message) => {
  return {
    selector: selector,
    test: function (value) {
      const regex =
        /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]|[a-zA-Z0-9-]*[a-zA-Z0-9]:?(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
      return regex.test(value)
        ? undefined
        : message ||
            "Vui lòng nhập lại email theo cú pháp: dia_chi_emai@ten_mien";
    },
  };
};
Validator.isConfirmed = (selector, getPassword, defaultMessage) => {
  return {
    selector: selector,
    test: function (value) {
      return value === getPassword()
        ? undefined
        : defaultMessage || "Mật khẩu không khớp";
    },
  };
};
Validator.isPhoneNumber = (selector, message) =>{
  return{
    selector: selector,
    test: function (value) {
      const regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
      return regex.test(value)
        ? undefined
        : message || "Số điện thoại không hợp lệ";
    }
  }
}
Validator.isFullName = (selector, message) => {
  return{
    selector: selector,
    test: function (value) {
      let firstLetter="[A-EGHIK-VXYÂĐỔÔÚỨ]".normalize("NFC"),
      otherLetters="[a-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫]".normalize("NFC"),
      regexString="^"
                 +firstLetter+otherLetters+"+\\s"
                 +"("+firstLetter+otherLetters+"+\\s)*"
                 +firstLetter+otherLetters+"+$",
      regexPattern=RegExp(regexString);
      return regexPattern.test(value)
        ? undefined
        : message || "Họ tên không hợp lệ";
    }
  }
}
Validator.isValidForm = (formElement) => {
  let isValid = true;
  for(const selector in selectorRules){
    const inputElement = formElement.querySelector(selector);
    const arrayRuleFunction = selectorRules[selector];
    arrayRuleFunction.forEach(rule => {
      if(inputElement.value == null || inputElement.value == undefined){
        isValid = false;
        return isValid;
      }
      const errorMessage = rule(inputElement.value);
      if(errorMessage){
        isValid = false;
        return isValid;
      }
    })
  }
  return isValid;
}


