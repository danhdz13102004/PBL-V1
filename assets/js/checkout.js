import { Validator } from "./validator.js";
`use strict`;
const overlays = document.querySelectorAll(`.modal__overlay`);
const btnChangeDefaultInfo = document.getElementById(
  `checkout-default__action-switch`
);
const modalSwitchInfo = document.getElementById(`modal__switch-checkout-info`);
const modalAddNewInfo = document.getElementById(`modal__addNewInfo`);
const checkoutHistoryList = document.querySelector(`.checkout-history__list`);
const checkoutHistoryOptions = document.querySelectorAll(
  `.checkout-history__option`
);
const btnReturn = document.getElementById(`btnReturn`);
const btnAddNewInfo = document.getElementById(`btnAddNewInfo`);
const btnReturnSwitchInfo = document.getElementById(`btnReturnSwitchInfo`);
const btnChooseDefaultInfo = document.getElementById(`btnChooseDefaultInfo`);
const btnRadios = document.querySelectorAll(`.checkout-radio-choose-default`);
const checkoutActionEditButtons = document.querySelectorAll(
  `.checkout-history__action-edit`
);
const checkoutDefault = document.getElementById(`checkout-default`);
const defaultFullname = checkoutDefault.querySelector(
  `.checkout-default__phone-number`
);
const defaultPhoneNumber = checkoutDefault.querySelector(
  `.checkout-default__fullname`
);
const defaultAddress = checkoutDefault.querySelector(
  `.checkout-default__address span`
);
overlays.forEach((overlay) => {
  overlay.addEventListener(`click`, () => {
    const modalParent = overlay.parentNode;
    modalParent.style.display = `none`;
  });
});
btnChangeDefaultInfo.addEventListener(`click`, () => {
  modalSwitchInfo.style.display = `flex`;
});
btnReturn.addEventListener(`click`, () => {
  modalSwitchInfo.style.animation = `FadeInAndZoomOut`;
  modalSwitchInfo.style.display = `none`;
});
btnAddNewInfo.addEventListener(`click`, () => {
  modalAddNewInfo.style.display = `flex`;
  modalSwitchInfo.style.display = `none`;
  const firstInput = document.querySelector(
    `#modal__addNewInfo .checkout-info__field:first-child .checkout-info__input`
  );
  console.log(firstInput);
  firstInput.focus();
});
btnReturnSwitchInfo.addEventListener(`click`, () => {
  modalAddNewInfo.style.display = `none`;
  modalSwitchInfo.style.display = `flex`;
});
checkoutHistoryOptions.forEach((option, index) => {
  option.addEventListener(`click`, () => {
    btnRadios[index].checked = `true`;
  });
});
const reloadCheckoutHistoryList = (option) => {
  const curentDefaultOption = checkoutHistoryList.firstElementChild;
  const currentDefaultLabel = curentDefaultOption.querySelector(
    `.checkout-history__label-default`
  );
  currentDefaultLabel.classList.remove(`active`);
  const newDefaultLabel = option.querySelector(
    `.checkout-history__label-default`
  );
  newDefaultLabel.classList.add(`active`);
  checkoutHistoryList.prepend(option);
};
const loadOptionToDefaultInfo = (option) => {
  const fullName = option.querySelector(`.checkout-history__fullname`);
  const phoneNumber = option.querySelector(`.checkout-history__phone-number`);
  const homeAddress = option.querySelector(
    `.checkout-history__address .home-address`
  );
  const ward = option.querySelector(`.checkout-history__address .ward`);
  const district = option.querySelector(`.checkout-history__address .district`);
  const province = option.querySelector(`.checkout-history__address .province`);
  defaultFullname.textContent = fullName.textContent.trim();
  defaultPhoneNumber.textContent = phoneNumber.textContent.trim();
  defaultAddress.textContent = `${homeAddress.textContent.trim()}, ${ward.textContent.trim()}, ${district.textContent.trim()}, ${province.textContent.trim()}`;
};
btnChooseDefaultInfo.addEventListener(`click`, () => {
  const currentCheckedRadio = checkoutHistoryList.querySelector(
    `.checkout-radio-choose-default:checked`
  );
  const option = currentCheckedRadio.closest(`.checkout-history__option`);
  loadOptionToDefaultInfo(option);
  reloadCheckoutHistoryList(option);
});

//* Call VN province API, make template for initialize Selector
const cUrl = {
  provinceUrl: "https://web-staging.ghtklab.com/api/v1/public/address/list",
  districtUrl:
    "https://web-staging.ghtklab.com/api/v1/public/address/list?parentId={province-id}&type=3",
  wardUrl:
    "https://web-staging.ghtklab.com/api/v1/public/address/list?parentId={district-id}&type=1",
  alleyRoadUrl:
    "https://web-staging.ghtklab.com/api/v1/public/address/hamlet?parentId={ward-id}",
};
const loadProvinces = async (provinceSelectElement) => {
  try {
    const response = await fetch(cUrl.provinceUrl);
    const data = await response.json();
    provinceSelectElement.innerHTML = `<option value="">Chọn tỉnh/ thành phố</option>`;
    data.data.forEach((province) => {
      const option = document.createElement("option");
      option.setAttribute("value", province.id);
      option.textContent = province.name;
      provinceSelectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
  }
};
const loadDistricts = async (
  provinceSelectElement,
  districtSelectElement,
  wardSelectElement,
  addressElement
) => {
  try {
    const provinceId = provinceSelectElement.value;
    if (provinceId !== "") {
      const response = await fetch(
        cUrl.districtUrl.replace(`{province-id}`, provinceId)
      );
      const data = await response.json();
      districtSelectElement.innerHTML = `<option value="">Chọn quận/ huyện</option>`;
      data.data.forEach((district) => {
        const option = document.createElement(`option`);
        option.setAttribute(`value`, district.id);
        option.textContent = district.name;
        districtSelectElement.appendChild(option);
      });
      districtSelectElement.disabled = false;
      districtSelectElement.style.cursor = `pointer`;
    } else {
      districtSelectElement.innerHTML = `<option value="">Chọn quận/ huyện</option>`;
      districtSelectElement.disabled = true;
      districtSelectElement.style.cursor = `not-allowed`;
      wardSelectElement.innerHTML = `<option value="">Chọn xã/ phường</option>`;
      wardSelectElement.disabled = true;
      wardSelectElement.style.cursor = `not-allowed`;
      addressElement.disabled = true;
      addressElement.style.cursor = `not-allowed`;
      addressElement.value = ``;
    }
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
  }
};
const loadWards = async (
  districtSelectElement,
  wardSelectElement,
  addressElement
) => {
  try {
    const districtId = districtSelectElement.value;
    if (districtId !== "") {
      const response = await fetch(
        cUrl.wardUrl.replace(`{district-id}`, districtId)
      );
      const data = await response.json();
      wardSelectElement.innerHTML = `<option value="">Chọn xã/ phường</option>`;
      data.data.forEach((ward) => {
        const option = document.createElement(`option`);
        option.setAttribute(`value`, ward.id);
        option.textContent = ward.name;
        wardSelectElement.appendChild(option);
      });
      wardSelectElement.disabled = false;
      wardSelectElement.style.cursor = `pointer`;
    } else {
      wardSelectElement.innerHTML = `<option value="">Chọn xã/ phường</option>`;
      wardSelectElement.disabled = true;
      wardSelectElement.style.cursor = `not-allowed`;
      addressElement.disabled = true;
      addressElement.style.cursor = `not-allowed`;
      addressElement.value = ``;
    }
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
  }
};
const addressEnable = async (wardSelectElement, addressElement) => {
  const wardId = wardSelectElement.value;
  if (wardId !== "") {
    addressElement.disabled = false;
    addressElement.style.cursor = `text`;
  } else {
    addressElement.disabled = true;
    addressElement.value = ``;
    addressElement.style.cursor = `not-allowed`;
  }
};
const safeLoadDistricts = (
  provinceSelectElement,
  districtSelectElement,
  wardSelectElement,
  addressElement
) => {
  provinceSelectElement.removeEventListener(`change`, loadDistricts);
  provinceSelectElement.addEventListener(`change`, async () => {
    try {
      await loadDistricts(
        provinceSelectElement,
        districtSelectElement,
        wardSelectElement,
        addressElement
      );
    } catch (error) {
      console.error("Lỗi khi thực hiện loadDistricts:", error);
    }
  });
};
const safeLoadWards = (
  districtSelectElement,
  wardSelectElement,
  addressElement
) => {
  districtSelectElement.removeEventListener("change", loadWards);
  districtSelectElement.addEventListener("change", async () => {
    try {
      await loadWards(districtSelectElement, wardSelectElement, addressElement);
    } catch (error) {
      console.error("Lỗi khi thực hiện loadWards:", error);
    }
  });
};
const safeEnableAddress = (wardSelectElement, addressElement) => {
  wardSelectElement.removeEventListener("change", addressEnable);
  wardSelectElement.addEventListener("change", async () => {
    try {
      await addressEnable(wardSelectElement, addressElement);
    } catch (error) {
      console.error("Lỗi khi thực hiện addressEnable:", error);
    }
  });
};
const initializeAddressSelectors = (
  provinceSelector,
  districtSelector,
  wardSelector,
  addressSelector
) => {
  const provinceSelectElement = document.querySelector(provinceSelector);
  const districtSelectElement = document.querySelector(districtSelector);
  const wardSelectElement = document.querySelector(wardSelector);
  const addressElement = document.querySelector(addressSelector);
  districtSelectElement.disabled = true;
  districtSelectElement.style.cursor = `not-allowed`;
  wardSelectElement.disabled = true;
  wardSelectElement.style.cursor = `not-allowed`;
  addressElement.disabled = true;
  addressElement.style.cursor = `not-allowed`;

  const initAddressSelectors = async () => {
    await loadProvinces(provinceSelectElement);
    safeLoadDistricts(
      provinceSelectElement,
      districtSelectElement,
      wardSelectElement,
      addressElement
    );
    safeLoadWards(districtSelectElement, wardSelectElement, addressElement);
    safeEnableAddress(wardSelectElement, addressElement);
  };
  initAddressSelectors();
};
window.onload = initializeAddressSelectors(
  `#modal__addNewInfo .checkout-info__province`,
  `#modal__addNewInfo .checkout-info__district`,
  `#modal__addNewInfo .checkout-info__ward`,
  `#modal__addNewInfo .checkout-info__address`
);
const lookupProvinceById = async (provinceId) => {
  try {
    const response = await fetch(cUrl.provinceUrl);
    const data = await response.json();
    const province = data.data.find((province) => province.id == provinceId);
    return province ? province.name : null;
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
    return null;
  }
};
const lookupDistrictById = async (provinceId, districtId) => {
  try {
    const response = await fetch(
      cUrl.districtUrl.replace(`{province-id}`, provinceId)
    );
    const data = await response.json();
    const district = data.data.find((district) => district.id == districtId);
    return district ? district.name : null;
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
    return null;
  }
};
const lookupWardById = async (districtId, wardId) => {
  try {
    const response = await fetch(
      cUrl.wardUrl.replace(`{district-id}`, districtId)
    );
    const data = await response.json();
    const ward = data.data.find((ward) => ward.id == wardId);
    return ward ? ward.name : null;
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
    return null;
  }
};
const lookupProvinceByName = async (provinceName) => {
  try {
    const response = await fetch(cUrl.provinceUrl);
    const data = await response.json();
    const province = data.data.find(
      (province) => province.name == provinceName
    );
    return province ? province.id : null;
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
    return null;
  }
};
const lookupDistrictByName = async (provinceId, districtName) => {
  try {
    const response = await fetch(
      cUrl.districtUrl.replace(`{province-id}`, provinceId)
    );
    const data = await response.json();
    const district = data.data.find(
      (district) => district.name == districtName
    );
    return district ? district.id : null;
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
    return null;
  }
};
const lookupWardByName = async (districtId, wardName) => {
  try {
    const response = await fetch(
      cUrl.wardUrl.replace(`{district-id}`, districtId)
    );
    const data = await response.json();
    const ward = data.data.find((ward) => ward.name == wardName);
    return ward ? ward.id : null;
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
    return null;
  }
};
//* Validate input
let values = {};
Validator({
  form: `#modal__addNewInfo .checkout-info__content`,
  formField: `#modal__addNewInfo .checkout-info__field`,
  rules: [
    Validator.isRequired(
      `#modal__addNewInfo input[id="checkout-info__fullname"]`,
      `Vui lòng nhập đầy đủ họ tên của bạn`
    ),
    Validator.isFullName(
      `#modal__addNewInfo input[id="checkout-info__fullname"]`
    ),
    Validator.isRequired(
      `#modal__addNewInfo #checkout-info__phone-number`,
      `Vui lòng nhập vào số điện thoại của bạn`
    ),
    Validator.isPhoneNumber(`#modal__addNewInfo #checkout-info__phone-number`),
    Validator.isRequired(
      `#modal__addNewInfo select[id="checkout-info__province"`,
      `Vui lòng chọn tỉnh/ thành phố`
    ),
    Validator.isRequired(
      `#modal__addNewInfo select[id="checkout-info__district"`,
      `Vui lòng chọn quận/ huyện`
    ),
    Validator.isRequired(
      `#modal__addNewInfo select[id="checkout-info__ward"`,
      `Vui lòng chọn xã/ phường`
    ),
    Validator.isRequired(
      `#modal__addNewInfo input[id="checkout-info__address"`,
      `Vui lòng nhập vào địa chỉ của bạn`
    ),
  ],
  alertMessage: `.form__alert-message`,
  onSubmit: function (values) {
    console.log(values);
  },
});

//* Add new option in history list
let data = {};
const formElement = document.querySelector(
  `#modal__addNewInfo .checkout-info__content`
);
const btnSubmitInfo = document.getElementById(`btnSubmitInfo`);
btnSubmitInfo.disabled = true;
btnSubmitInfo.style.pointerEvents = `none`;
const inputs = Array.from(formElement.querySelectorAll(`[name]`));
const isValidForm = (inputs, button) => {
  let isValid = true;
  inputs.forEach((input) => {
    if (input.value === "" || input.value === undefined) {
      isValid = false;
      button.disabled = true;
      button.style.pointerEvents = `none`;
      return isValid;
    }
  });
  button.disabled = !isValid;
  button.style.pointerEvents = !isValid ? `none` : `all`;
  return isValid;
};
inputs.forEach((input) => {
  let isValid;
  input.addEventListener(`change`, () => {
    isValid = isValidForm(inputs, btnSubmitInfo);
    if (isValid) {
      inputs.forEach((input) => {
        data[input.name] = input.value;
      });
    }
  });
});
const renderData = (optionData) => {
  const checkoutHistoryOption = document.createElement(`div`);
  checkoutHistoryOption.setAttribute(`class`, `checkout-history__option`);
  checkoutHistoryOption.innerHTML = `
    <input type="radio" name="chooseDefault" class="checkout-radio-choose-default"
      id="checkout-radio-choose-default" checked>
    <div class="checkout-history__info-wrap">
      <div class="checkout-history__info">
        <div class="checkout-history__fullname">
          ${optionData.fullname}
        </div>
        <div class="checkout-history__phone-number">
          ${optionData.phoneNumber}
        </div>
        <div class="checkout-history__label-default">Mặc định</div>
      </div>
      <div class="checkout-history__address">
        <div class="home-address">
          ${optionData.address}
        </div>
        <div class="address">
          <span class="ward">${optionData.ward}</span>,
          <span class="district">${optionData.district}</span>,
          <span class="province">${optionData.province}</span>
        </div>
      </div>
    </div>
    <div class="checkout-history__action">
      <button class="button checkout-history__action-edit">
        <svg class="checkout-history__action-edit-icon" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
            fill="#000000" />
        </svg>
        <span class="checkout-history__action-edit-label">Cập nhật</span>
      </button>
    </div>
  `;
  checkoutHistoryList.appendChild(checkoutHistoryOption);
  checkoutHistoryOption.addEventListener(`click`, () => {
    const radio = checkoutHistoryOption.querySelector(
      `.checkout-radio-choose-default`
    );
    radio.checked = `true`;
  });
  const btnEdit = checkoutHistoryOption.querySelector(
    `.checkout-history__action-edit`
  );
  btnEdit.addEventListener(`click`, async () => {
    btnEdit.disabled = true;
    btnEdit.style.cursor = `wait`;
    targetElement = checkoutHistoryOption;
    getCurrenData(checkoutHistoryOption);
    await loadToUpdateInfo(currentData);
    btnEdit.disabled = false;
    btnEdit.style.cursor = `pointer`;
    modalUpdateInfo.style.display = `flex`;
    modalSwitchInfo.style.display = `none`;
  });
};
const createOption = async (data) => {
  let province, district, ward;
  try {
    [province, district, ward] = await Promise.all([
      lookupProvinceById(data.province),
      lookupDistrictById(data.province, data.district),
      lookupWardById(data.district, data.ward),
    ]);
    let optionData = {
      province,
      district,
      ward,
      fullname: data.fullname,
      phoneNumber: data.phoneNumber,
      address: data.address,
    };
    renderData(optionData);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin:", error);
  }
};
const clearAllInfo = (
  provinceSelector,
  districtSelector,
  wardSelector,
  addressSelector
) => {
  const provinceSelectElement = document.querySelector(provinceSelector);
  const districtSelectElement = document.querySelector(districtSelector);
  const wardSelectElement = document.querySelector(wardSelector);
  const inputs = Array.from(formElement.querySelectorAll(`[name]`));
  inputs.forEach((input) => {
    if (input.name !== "country") {
      input.value = ``;
    }
  });
  provinceSelectElement.innerHTML = `<option value="">Chọn tỉnh/ thành phố</option>`;
  districtSelectElement.innerHTML = `<option value="">Chọn quận/ huyện</option>`;
  wardSelectElement.innerHTML = `<option value="">Chọn xã/ phường</option>`;
};
btnSubmitInfo.addEventListener(`click`, async () => {
  if (isValidForm(inputs, btnSubmitInfo)) {
    btnSubmitInfo.disabled = true;
    btnSubmitInfo.style.cursor = `wait`;
    await createOption(data);
    modalAddNewInfo.style.display = `none`;
    modalSwitchInfo.style.display = `flex`;
    clearAllInfo(
      `#modal__addNewInfo .checkout-info__province`,
      `#modal__addNewInfo .checkout-info__district`,
      `#modal__addNewInfo .checkout-info__ward`,
      `#modal__addNewInfo .checkout-info__address`
    );
    initializeAddressSelectors(
      `#modal__addNewInfo .checkout-info__province`,
      `#modal__addNewInfo .checkout-info__district`,
      `#modal__addNewInfo .checkout-info__ward`,
      `#modal__addNewInfo .checkout-info__address`
    );
  }
  btnSubmitInfo.disabled = false;
  btnSubmitInfo.style.cursor = `pointer`;
});

//* Update option in history list
Validator({
  form: `#modal__addUpdateInfo .checkout-info__content`,
  formField: `#modal__addUpdateInfo .checkout-info__field`,
  rules: [
    Validator.isRequired(
      `#modal__addUpdateInfo input[id="checkout-info__fullname"]`,
      `Vui lòng nhập đầy đủ họ tên của bạn`
    ),
    Validator.isFullName(
      `#modal__addUpdateInfo input[id="checkout-info__fullname"]`
    ),
    Validator.isRequired(
      `#modal__addUpdateInfo #checkout-info__phone-number`,
      `Vui lòng nhập vào số điện thoại của bạn`
    ),
    Validator.isPhoneNumber(
      `#modal__addUpdateInfo #checkout-info__phone-number`
    ),
    Validator.isRequired(
      `#modal__addUpdateInfo select[id="checkout-info__province"`,
      `Vui lòng chọn tỉnh/ thành phố`
    ),
    Validator.isRequired(
      `#modal__addUpdateInfo select[id="checkout-info__district"`,
      `Vui lòng chọn quận/ huyện`
    ),
    Validator.isRequired(
      `#modal__addUpdateInfo select[id="checkout-info__ward"`,
      `Vui lòng chọn xã/ phường`
    ),
    Validator.isRequired(
      `#modal__addUpdateInfo input[id="checkout-info__address"`,
      `Vui lòng nhập vào địa chỉ của bạn`
    ),
  ],
  alertMessage: `.form__alert-message`,
  onSubmit: function (values) {
    console.log(values);
  },
});
const modalUpdateInfo = document.getElementById(`modal__addUpdateInfo`);
const btnCloseUpdateModal = document.querySelector(
  `#modal__addUpdateInfo #btnReturnSwitchInfo`
);
const btnUpdateInfo = document.getElementById(`btnUpdateInfo`);
let currentData = {};
let targetElement;
const getCurrenData = (optionParent) => {
  const fullname = optionParent.querySelector(`.checkout-history__fullname`);
  const phoneNumber = optionParent.querySelector(
    `.checkout-history__phone-number`
  );
  const address = optionParent.querySelector(
    `.checkout-history__address .home-address`
  );
  const province = optionParent.querySelector(
    `.checkout-history__address .province`
  );
  const district = optionParent.querySelector(
    `.checkout-history__address .district`
  );
  const ward = optionParent.querySelector(`.checkout-history__address .ward`);
  currentData = {
    fullname: fullname.textContent.trim(),
    phoneNumber: phoneNumber.textContent.trim(),
    address: address.textContent.trim(),
    province: province.textContent.trim(),
    district: district.textContent.trim(),
    ward: ward.textContent.trim(),
  };
};
const loadToUpdateInfo = async (currentData) => {
  let provinceId, districtId, wardId;
  provinceId = await lookupProvinceByName(currentData.province);
  if (provinceId) {
    districtId = await lookupDistrictByName(provinceId, currentData.district);
    if (districtId) {
      wardId = await lookupWardByName(districtId, currentData.ward);
      console.log(wardId);
    } else {
      console.log("Không tìm thấy quận/huyện.");
    }
  } else {
    console.log("Không tìm thấy tỉnh/thành phố.");
  }
  const fullnameInput = modalUpdateInfo.querySelector(
    `input[id="checkout-info__fullname"]`
  );
  const phoneNumberInput = modalUpdateInfo.querySelector(
    `input[id="checkout-info__phone-number"]`
  );
  const addressInput = modalUpdateInfo.querySelector(
    `input[id="checkout-info__address"]`
  );
  const provinceInput = modalUpdateInfo.querySelector(
    `select[id="checkout-info__province"]`
  );
  const districtInput = modalUpdateInfo.querySelector(
    `select[id="checkout-info__district"]`
  );
  const wardInput = modalUpdateInfo.querySelector(
    `select[id="checkout-info__ward"]`
  );
  console.log(provinceInput, districtInput, wardInput);
  fullnameInput.value = currentData.fullname;
  phoneNumberInput.value = currentData.phoneNumber;
  addressInput.value = currentData.address;
  await loadProvinces(provinceInput);
  provinceInput.value = provinceId;
  await loadDistricts(provinceInput, districtInput, wardInput, addressInput);
  districtInput.value = districtId;
  await loadWards(districtInput, wardInput, addressInput);
  wardInput.value = wardId;
  safeLoadDistricts(provinceInput, districtInput, wardInput, addressInput);
  safeLoadWards(districtInput, wardInput, addressInput);
  safeEnableAddress(wardInput, addressInput);
};
checkoutActionEditButtons.forEach((checkoutActionEditButton) => {
  checkoutActionEditButton.addEventListener(`click`, async () => {
    checkoutActionEditButton.disabled = true;
    checkoutActionEditButton.style.cursor = `wait`;
    const optionParent = checkoutActionEditButton.closest(
      `.checkout-history__option`
    );
    targetElement = optionParent;
    getCurrenData(optionParent);
    await loadToUpdateInfo(currentData);
    modalUpdateInfo.style.display = `flex`;
    modalSwitchInfo.style.display = `none`;
    checkoutActionEditButton.disabled = false;
    checkoutActionEditButton.style.cursor = `pointer`;
  });
});
btnCloseUpdateModal.addEventListener(`click`, () => {
  modalUpdateInfo.style.display = `none`;
  modalSwitchInfo.style.display = `flex`;
  clearAllInfo(
    `#modal__addUpdateInfo .checkout-info__province`,
    `#modal__addUpdateInfo .checkout-info__district`,
    `#modal__addUpdateInfo .checkout-info__ward`,
    `#modal__addUpdateInfo .checkout-info__address`
  );
});
let newUpdateData = {};
const formUpdateElement = document.querySelector(
  `#modal__addUpdateInfo .checkout-info__content`
);
btnUpdateInfo.disabled = true;
btnUpdateInfo.style.pointerEvents = `none`;
const allInputs = Array.from(formUpdateElement.querySelectorAll(`[name]`));
allInputs.forEach((input) => {
  let isValid;
  input.addEventListener(`change`, () => {
    isValid = isValidForm(allInputs, btnUpdateInfo);
    if (isValid) {
      allInputs.forEach((input) => {
        newUpdateData[input.name] = input.value;
      });
    }
  });
});
btnUpdateInfo.addEventListener(`click`, async () => {
  if (isValidForm(allInputs, btnUpdateInfo)) {
    btnUpdateInfo.style.cursor = `wait`;
    btnUpdateInfo.disabled = true;
    const fullname = targetElement.querySelector(`.checkout-history__fullname`);
    const phoneNumber = targetElement.querySelector(
      `.checkout-history__phone-number`
    );
    const address = targetElement.querySelector(
      `.checkout-history__address .home-address`
    );
    const province = targetElement.querySelector(
      `.checkout-history__address .province`
    );
    const district = targetElement.querySelector(
      `.checkout-history__address .district`
    );
    const ward = targetElement.querySelector(
      `.checkout-history__address .ward`
    );
    fullname.textContent = newUpdateData.fullname;
    phoneNumber.textContent = newUpdateData.phoneNumber;
    address.textContent = ``;
    let provinceId, districtId, wardId;
    if (parseInt(newUpdateData.province)) {
      const provinceName = await lookupProvinceById(newUpdateData.province);
      province.textContent = provinceName;
      provinceId = newUpdateData.province;
      console.log(province);
    } else {
      province.textContent = newUpdateData.province;
      provinceId = await lookupProvinceByName(newUpdateData.province);
      console.log(province, provinceId);
    }
    if (parseInt(newUpdateData.district)) {
      const districtName = await lookupDistrictById(
        provinceId,
        newUpdateData.district
      );
      district.textContent = districtName;
      districtId = newUpdateData.district;
      console.log(district);
    } else {
      district.textContent = newUpdateData.district;
      districtId = await lookupDistrictByName(
        provinceId,
        newUpdateData.district
      );
      console.log(districtId);
    }
    if (parseInt(newUpdateData.ward)) {
      const wardName = await lookupWardById(districtId, newUpdateData.ward);
      ward.textContent = wardName;
      console.log(ward);
    } else {
      ward.textContent = newUpdateData.ward;
    }
    address.textContent = newUpdateData.address;

    btnUpdateInfo.style.cursor = `pointer`;
    btnUpdateInfo.disabled = false;
    modalUpdateInfo.style.display = `none`;
    modalSwitchInfo.style.display = `flex`;
    clearAllInfo(
      `#modal__addUpdateInfo .checkout-info__province`,
      `#modal__addUpdateInfo .checkout-info__district`,
      `#modal__addUpdateInfo .checkout-info__ward`,
      `#modal__addUpdateInfo .checkout-info__address`
    );
  }
});

let addressOption = 1;
const boxNewCheckoutInfo = document.querySelector(`.checkout-new-info`);
checkoutDefault.classList.toggle(`hidden`,addressOption === 0);
boxNewCheckoutInfo.classList.toggle(`hidden`,addressOption !== 0);
