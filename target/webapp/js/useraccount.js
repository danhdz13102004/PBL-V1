import { Validator } from "./validator.js";
`use strict`;
var max_order_inpage = 10;

const sidebarFunction = document.querySelector(`.account-sidebar-function`);
//? Chức năng chính
const infoOption = sidebarFunction.querySelector(`#account-info`);
const orderOption = sidebarFunction.querySelector(`#account-order`);
const reviewOption = sidebarFunction.querySelector(`#account-review`);
//? Phần hiển thị nội dung 1 chức năng
const infoSection = document.getElementById(`account-information-management`);
const orderSection = document.getElementById(`account-order-management`);
const reviewSection = document.getElementById(`account-review-management`);
//? Tiêu đề phần hiển thị
const infoTitleElement = infoSection.querySelector(`.account-function__title`);
const orderTitleElement = orderSection.querySelector(
  `.account-function__title`
);
const reviewTitleElement = reviewSection.querySelector(
  `.account-function__title`
);
//? Nội dung của từng mục
const infoContent = document.getElementById(`account-form-info`);
const orderContent = document.querySelector(`.order-list__container#all-order`);

const changingPasswordOption = infoOption.querySelector(
  `#account-changing-password`
);
const changingPasswordContent = infoSection.querySelector(
  `#account-form-changing-password`
);

const otherSettingsOption = infoOption.querySelector(`#account-other-settings`);
const otherSettingsContent = infoSection.querySelector(
  `#account-form-other-settings`
);

const completeOrderOption = orderOption.querySelector(`#complete-order-option`);
const deliveringOrderOption = orderOption.querySelector(
  `#delivering-order-option`
);
const awaitingOrderOption = orderOption.querySelector(`#awaiting-order-option`);
const cancelledOrderOption = orderOption.querySelector(
  `#cancelled-order-option`
);
const returnedOrderOption = orderOption.querySelector(`#returned-order-option`);

const completeOrderContent = document.querySelector(
  `.order-list__container#complete-order`
);
const deliveringOrderContent = document.querySelector(
  `.order-list__container#delivering-order`
);
const awaitingOrderContent = document.querySelector(
  `.order-list__container#awaiting-order`
);
const cancelledOrderContent = document.querySelector(
  `.order-list__container#cancelled-order`
);
const returnedOrderContent = document.querySelector(
  `.order-list__container#returned-order`
);


var currentURL = window.location.protocol + "//" + window.location.host;
function formatCurrency(amount) {
	// Kiểm tra xem giá trị đầu vào có phải là số không
	if (typeof amount !== 'number') {
		return 'Invalid input';
	}

	// Chuyển đổi số thành chuỗi và ngược lại
	const formattedAmount = Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

	return formattedAmount;
}


//? Mapping chức năng và content tương ứng với nó
const functionMapping = {
  info: {
    urlParamValue: `info`,
    title: `Thông tin tài khoản`,
    titleElement: infoTitleElement,
    mainOption: infoOption,
    section: infoSection,
    content: infoContent,
    subOptionElement: infoOption.querySelector(`.account-sidebar__sub-option`),
    dropdownIconElement: infoOption.querySelector(
      `.account-sidebar__dropdown-icon`
    ),
    subOptions: [
      {
        urlParamValue: `changingpassword`,
        title: `Đổi mật khẩu`,
        option: changingPasswordOption,
        content: changingPasswordContent,
      },
      {
        urlParamValue: `othersetting`,
        title: `Thiết lập khác`,
        option: otherSettingsOption,
        content: otherSettingsContent,
      },
    ],
  },
  order: {
    urlParamValue: `order`,
    title: `Đơn hàng của tôi`,
    titleElement: orderTitleElement,
    mainOption: orderOption,
    section: orderSection,
    content: orderContent,
    subOptionElement: orderOption.querySelector(`.account-sidebar__sub-option`),
    dropdownIconElement: orderOption.querySelector(
      `.account-sidebar__dropdown-icon`
    ),
    subOptions: [
      {
        urlParamValue: `complete`,
        title: `Đơn hàng đã giao`,
        option: completeOrderOption,
        content: completeOrderContent,
      },
      {
        urlParamValue: `delivering`,
        title: `Đơn hàng đang giao`,
        option: deliveringOrderOption,
        content: deliveringOrderContent,
      },
      {
        urlParamValue: `awaiting`,
        title: `Đơn hàng đang chờ duyệt`,
        option: awaitingOrderOption,
        content: awaitingOrderContent,
      },
      {
        urlParamValue: `cancelled`,
        title: `Đơn hàng đã hủy`,
        option: cancelledOrderOption,
        content: cancelledOrderContent,
      },
      {
        urlParamValue: `returned`,
        title: `Đơn hàng hoàn trả`,
        option: returnedOrderOption,
        content: returnedOrderContent,
      },
    ],
  },
  review: {
    urlParamValue: `review`,
    title: `Đánh giá sản phẩm`,
    titleElement: reviewTitleElement,
    mainOption: reviewOption,
    section: reviewSection,
    content: reviewSection,
    subOptionElement: reviewOption.querySelector(
      `.account-sidebar__sub-option`
    ),
    dropdownIconElement: reviewOption.querySelector(
      `.account-sidebar__dropdown-icon`
    ),
    subOptions: [],
  },
};
const allKeyOptions = [`info`, `order`, `review`];
const allMainOptions = [infoOption, orderOption, reviewOption];

//* Hàm hiển thị Section, nơi chứa nội dung tương ứng với chức năng trên sidebar
//* Section là phần bọc content
const hideAllSection = () => {
  allKeyOptions.forEach((key) => {
    functionMapping[key].section.classList.add(`hidden`);
  });
};
const showManagementSection = (key) => {
  hideAllSection();
  if(key === 'info') {
      // var url = currentURL + "/api/user/selectInforUser";
      // fetch(url)
      // .then(response => {
      //   if (!response.ok) {
      //     throw new Error("Lỗi khi lấy dữ liệu từ URL");
      //   }
      //   return response.json();
      // })
      // .then(data => {
      //   document.querySelector('#form__input-fullname').value = data.ten;
      //   document.querySelector('#form__input-email').value = data.email;
      //   document.querySelector('#form__input-phone-number').value = data.soDienThoai;
      // })
  }
  functionMapping[key].section.classList.remove(`hidden`);
};

//* Hàm hiển thị content chính, ẩn content phụ
const showMainManagementContent = (key) => {
  const mainContent = functionMapping[key].content;
  if (mainContent) {
    mainContent.classList.remove(`hidden`);
  }
  functionMapping[key].subOptions.forEach((subOption) => {
    if (subOption.content) {
      subOption.content.classList.add("hidden");
    }
  });
};

//* Hàm hiển thị content của SubOption
const showSubOptionContent = (mainKey, subOption) => {
  console.log(subOption);
  console.log(subOption.urlParamValue);
  
  const mainContent = functionMapping[mainKey].content;
  if (mainContent) mainContent.classList.add(`hidden`);
  functionMapping[mainKey].subOptions.forEach((subOption) => {
    subOption.content.classList.add(`hidden`);
  });
  if (subOption.content) {
    subOption.content.classList.remove("hidden");
  }
  var inp = document.querySelector(`.inp-check-load-${subOption.urlParamValue}`);
  console.log('element con');
  console.log(inp);
  changePageOrder(1,max_order_inpage,subOption.urlParamValue);
};

//* Hàm update url
const updateURL = (...params) => {
  const paramString = params.join(`&`);
  const newUrl = `${window.location.pathname}?${paramString}`;
  const state = params.reduce((acc, param, index) => {
    acc[`param${index + 1}`] = param;
    return acc;
  }, {});
  history.replaceState(state, ``, newUrl);
};

//* Hàm đặt tiêu đề của mỗi Panel content tương ứng với option
const setTitle = (titleElement, title) => {
  titleElement.textContent = title;
};

//* Hàm thực hiện chuyển trạng thái active, open của function trên thanh sidebar
const toggleOption = (mainKey) => {
  allKeyOptions.forEach((key) => {
    if (key === mainKey) {
      const mainOption = functionMapping[key].mainOption;
      const subOption = functionMapping[key].subOptionElement;
      const dropdownIcon = functionMapping[key].dropdownIconElement;
      if (
        !subOption ||
        !subOption.style.maxHeight ||
        !mainOption.classList.contains(`active`)
      ) {
        mainOption.classList.add(`active`);
        if (subOption)
          subOption.style.maxHeight = subOption.scrollHeight + `px`;
        if (dropdownIcon) dropdownIcon.style.transform = `rotate(270deg)`;
      }
    } else {
      //close other mainOption
      const otherMainOption = functionMapping[key].mainOption;
      const otherSubOption = functionMapping[key].subOptionElement;
      const otherDropdownIcon = functionMapping[key].dropdownIconElement;
      otherMainOption.classList.remove(`active`);
      if (otherSubOption) otherSubOption.style.maxHeight = `0rem`;
      if (otherDropdownIcon)
        otherDropdownIcon.style.transform = `rotate(180deg)`;
    }
  });
};

//* Hàm thực hiện chuyển trạng thái subOption trên sidebar
const toggleSubOption = (mainKey, subOption) => {
  functionMapping[mainKey].subOptions.forEach((option) => {
    if (option === subOption) {
      option.option.classList.add(`active`);
    } else {
      option.option.classList.remove(`active`);
    }
  });
};

//* Hàm quản lý thay đổi khi click mainOption
const handleSidebarClick = (key) => {
  const paramValue = functionMapping[key].urlParamValue;
  if(key === 'order') {
    var element1 = document.querySelector(`.inp-check-load-all`);
    console.log("element all");
    console.log(element1);
    changePageOrder(1,max_order_inpage,"all");
  }
  updateURL(paramValue);
  toggleOption(key);
  setTitle(functionMapping[key].titleElement, functionMapping[key].title);
  showManagementSection(key);
  showMainManagementContent(key);
};

//* Hàm quản lý thay đổi khi click subOption
const handleSubOptionClick = (mainKey, subOption) => {
  updateURL(functionMapping[mainKey].urlParamValue, subOption.urlParamValue);
  toggleSubOption(mainKey, subOption);
  setTitle(functionMapping[mainKey].titleElement, subOption.title);
  showManagementSection(mainKey);
  showSubOptionContent(mainKey, subOption);
};

const initiallizeSubOptions = () => {
  for (const key in functionMapping) {
    const subOptions = functionMapping[key].subOptions;
    if (subOptions) {
      subOptions.forEach((subOption) => {
        const subOptionElement = subOption.option;
        if (subOptionElement) {
          subOptionElement.addEventListener(`click`, (e) => {
            e.stopPropagation(); // ngăn sk lan truyền lên phần tử cha
            handleSubOptionClick(key, subOption);
          });
        }
      });
    }
  }
};
const initiallizeMainOption = () => {
  for (const key in functionMapping) {
    const mainOption = functionMapping[key].mainOption;
    mainOption.addEventListener(`click`, () => {
      // truyền vào key của phần option được click (ta coi là mainKey)
      handleSidebarClick(key);
    });
  }
};
initiallizeMainOption();
initiallizeSubOptions();

//* Tạo param trên path của url
const urlParams = new URLSearchParams(window.location.search);
const pageStatus = urlParams.get(`pagestatus`);
// const loadingPage = (pageStatus) => {
//   if (pageStatus === `info`) {
//     handleSidebarClick(`info`);
//   } else if (pageStatus === `order`) {
//     handleSidebarClick(`order`);
//   } else if (pageStatus === `review`) {
//     handleSidebarClick(`review`);
//   }
// };
const loadingPage = (mainKey, subKey) => {
  if(mainKey && subKey){
    handleSubOptionClick(mainKey, functionMapping[mainKey].subOptions.find(option => option.urlParamValue === subKey));
  }
  else if(mainKey){
    handleSidebarClick(mainKey);
  }
  else{
    handleSidebarClick(`info`);
  }
};


// loadingPage(pageStatus);

//* Kích vào phần đăng xuất
const logout = sidebarFunction.querySelector(`#account-logout`);
const modalLogout = document.getElementById(`modal__account-logout`);
const btnLogoutConfirm = document.getElementById(`logout__action-confirm`);
const btnCancelLogout = document.getElementById(`logout__action-cancel`);
logout.addEventListener(`click`, () => {
  modalLogout.style.display = `flex`;
});
btnLogoutConfirm.addEventListener(`click`, () => {
  window.location.reload();
});
btnCancelLogout.addEventListener(`click`, () => {
  modalLogout.style.display = `none`;
});

//* Tắt các modal bằng overlay
const overlays = document.querySelectorAll(`.modal__overlay`);
Array.from(overlays).forEach((overlay) => {
  overlay.addEventListener(`click`, () => {
    const modalParent = overlay.parentNode;
    modalParent.style.display = `none`;
  });
});

//* Xem chi tiết đơn hàng và chuyển các trạng thái với vai trò người dùng
const modalViewOrderDetail = document.getElementById(
  `modal__view-order-detail`
);
const btnViewDetails = document.querySelectorAll(`.order-view-detail`);
const btnCancelViewDetail = document.getElementById(`btnCancelViewDetail`);
const btnCancelOrder = document.getElementById(`btnCancelOrder`);
const btnRebuyOrder = document.getElementById(`btnRebuyOrder`);
const btnConfirmCompleteOrder = document.getElementById(
  `btnConfirmCompleteOrder`
);
const btnConfirmReturnOrder = document.getElementById(`btnConfirmReturnOrder`);
const btnRequestReturnOrder = document.getElementById(`btnRequestReturnOrder`);
const btnAnnouceProcess = document.getElementById(`btnAnnouceProcess`);
const statusMap = {
  0: "Đã hủy",
  1: "Đang chờ xác nhận",
  2: "Đang xử lý",
  3: "Đang giao hàng",
  4: "Giao hàng hoàn tất",
  5: "Đang yêu cầu trả",
  6: "Đang hoàn trả",
  7: "Đã hoàn trả",
  8: "Từ chối hoàn trả",
};
const buttons = [
  btnCancelViewDetail,
  btnCancelOrder,
  btnRequestReturnOrder,
  btnConfirmReturnOrder,
  btnConfirmCompleteOrder,
  btnRebuyOrder,
  btnAnnouceProcess,
];
const statusToButtonsMap = {
  // Đã Hủy đơn
  0: [btnCancelViewDetail, btnRebuyOrder],
  // Đang chờ xác nhận
  1: [btnCancelViewDetail, btnCancelOrder],
  // Đang xử lý
  2: [btnCancelViewDetail],
  // Đang giao hàng
  3: [btnCancelViewDetail, btnRequestReturnOrder, btnConfirmCompleteOrder],
  // Giao hàng hoàn tất
  4: [btnCancelViewDetail, btnRebuyOrder],
  // Đang yêu cầu trả
  5: [btnCancelViewDetail],
  // Đang hoàn trả
  6: [btnCancelViewDetail, btnConfirmReturnOrder],
  // Đã hoàn trả
  7: [btnCancelViewDetail],
  // Từ chối hoàn trả
  8: [btnCancelViewDetail],
};
//* Giả lập trạng thái đơn hàng
const convertStatus = (input) => {
  if (typeof input === "number") {
    return statusMap[input] !== undefined ? statusMap[input] : input;
  }
  for (const key in statusMap) {
    if (statusMap[key] === input) {
      return parseInt(key);
    }
  }
  return input;
};
const displayButtons = (status) => {
  if (typeof status !== `number`) status = convertStatus(status);
  buttons.forEach((button) => {
    button.classList.toggle(
      `hidden`,
      !statusToButtonsMap[status].includes(button)
    );
  });
};
const removeMargin = (buttons) => {
  const visibleButtons = Array.from(buttons).filter(
    (button) => !button.classList.contains(`hidden`)
  );
  if (visibleButtons.length > 0) {
    visibleButtons.forEach((button) => {
      button.style.marginRight = `1rem`;
    });
    const lastButton = visibleButtons[visibleButtons.length - 1];
    lastButton.style.marginRight = `0rem`;
  }
};
const fillOrderDetail = (orderInfo, modalViewOrderDetail) => {
  // Chọn các ptu từ modal__view-order-detail để load vào
  const id = modalViewOrderDetail.querySelector(
    `.order-info__id .order-info__content`
  );
  const fullname = modalViewOrderDetail.querySelector(
    `.order-info__fullname .order-info__content`
  );
  const invoiceDate = modalViewOrderDetail.querySelector(
    `.order-info__invoice-date .order-info__content`
  );
  const totalPrice = modalViewOrderDetail.querySelector(
    `.order-info__total-price .order-info__content`
  );
  const statusOrder = modalViewOrderDetail.querySelector(
    `.order-info__status .order-info__content`
  );
  const reasonCancellationOrder = modalViewOrderDetail.querySelector(
    `.order-info__cancellation-reason`
  );
  id.textContent = orderInfo.orderId;
  fullname.textContent = orderInfo.orderCustomerName;
  invoiceDate.textContent = orderInfo.orderInvoiceDate;
  totalPrice.textContent = orderInfo.orderTotal;
  statusOrder.textContent = orderInfo.orderStatus;
};
const toggleCancellationReason = (status, modalViewOrderDetail) => {
  const reasonCancellationOrder = modalViewOrderDetail.querySelector(
    `.order-info__cancellation-reason`
  );
  const cancellationLabel =
    reasonCancellationOrder.querySelector(`.order-info__label`);
  const cancellationContent =
    reasonCancellationOrder.querySelector(`.order-info__content`);
  if (status === 0 || status === 6 || status === 7) {
    reasonCancellationOrder.classList.remove(`hidden`);
    cancellationLabel.textContent =
      status === 0 ? "Xem lý do hủy đơn" : "Xem lý do trả hàng";
    cancellationContent.textContent = `Puck Puck buồn ngủ quá nên bấm nhầm.
        Puck Puck buồn ngủ quá nên bấm nhầm.
        Puck Puck buồn ngủ quá nên bấm nhầm.`;
  } else if (status === 8) {
    reasonCancellationOrder.classList.remove(`hidden`);
    cancellationLabel.textContent = `Xem lý do từ chối trả hàng`;
    cancellationContent.textContent = `Load từ vị trí quản lý ra`;
  } else {
    reasonCancellationOrder.classList.add(`hidden`);
    cancellationLabel.textContent = ``;
    cancellationContent.textContent = ``;
  }
};
btnViewDetails.forEach((btnViewDetail) => {
  btnViewDetail.addEventListener(`click`, () => {
    // Data from table row
    const selectedOrder = btnViewDetail.parentNode;
    const orderInfo = {
      orderId: selectedOrder.querySelector(`.order-id`).textContent.trim(),
      orderCustomerName: selectedOrder
        .querySelector(`.order-fullname`)
        .textContent.trim(),
      orderInvoiceDate: selectedOrder
        .querySelector(`.order-invoice-date`)
        .textContent.trim(),
      orderTotal: selectedOrder
        .querySelector(`.order-total-amount`)
        .textContent.trim(),
      orderStatus: selectedOrder
        .querySelector(`.order-status`)
        .textContent.trim(),
    };
    const status = convertStatus(orderInfo.orderStatus);
    fillOrderDetail(orderInfo, modalViewOrderDetail);
    displayButtons(status);
    removeMargin(buttons);
    toggleCancellationReason(status, modalViewOrderDetail);
    modalViewOrderDetail.style.display = `flex`;
  });
});

export function showViewDetail(id) {
    const selectedOrder = btnViewDetail.parentNode;
    const orderInfo = {
      orderId: selectedOrder.querySelector(`.order-id`).textContent.trim(),
      orderCustomerName: selectedOrder
        .querySelector(`.order-fullname`)
        .textContent.trim(),
      orderInvoiceDate: selectedOrder
        .querySelector(`.order-invoice-date`)
        .textContent.trim(),
      orderTotal: selectedOrder
        .querySelector(`.order-total-amount`)
        .textContent.trim(),
      orderStatus: selectedOrder
        .querySelector(`.order-status`)
        .textContent.trim(),
    };
    const status = convertStatus(orderInfo.orderStatus);
    fillOrderDetail(orderInfo, modalViewOrderDetail);
    displayButtons(status);
    removeMargin(buttons);
    toggleCancellationReason(status, modalViewOrderDetail);
    modalViewOrderDetail.style.display = `flex`;
}


btnCancelViewDetail.addEventListener(`click`, () => {
  modalViewOrderDetail.style.display = `none`;
});

//* Form lý do hủy đơn hàng khi click nút hủy đơn hàng hoặc yêu cầu trả hàng
const cancellationReasonDefaultList = [
  { key: "", label: "--- Chọn lý do muốn hủy đơn hàng" },
  { key: 1, label: "Không còn nhu cầu mua hàng" },
  { key: 2, label: "Đặt nhầm/ trùng sản phẩm" },
  { key: 3, label: "Muốn thêm/ bớt sản phẩm" },
  { key: 4, label: "Thay đổi thông tin nhận hàng" },
  { key: 5, label: "Thời gian giao hàng quá chậm" },
  { key: 6, label: "Đơn hàng trước đó bị tách ra quá nhiều lần giao" },
  { key: 7, label: "Thời gian duyệt đơn quá lâu" },
  { key: 8, label: "Chất lượng đơn trước đó không đảm bảo" },
  { key: 9, label: "Quên nhập mã giảm giá" },
  { key: "other", label: "Lý do khác" },
];
const returnReasonDefaultList = [
  { key: "", label: "--- Chọn lý do muốn trả đơn hàng" },
  { key: 1, label: "Sản phẩm không đúng như đơn hàng" },
  { key: 2, label: "Sản phẩm bị hư hỏng, không nguyên vẹn" },
  { key: 3, label: "Bản sách đã cũ, không đúng như mô tả" },
  { key: 4, label: "Không muốn mua sách đó nữa" },
  { key: 5, label: "Thời gian giao hàng quá chậm" },
  { key: "other", label: "Lý do khác" },
];
const modalCancellationReason = document.getElementById(
  `modal__cancellation-reason`
);
const selectedReason = modalCancellationReason.querySelector(
  `select[id="form__input-reason"]`
);
const modalCancellationTitle =
  modalCancellationReason.querySelector(`.modal__title`);
const textareaField =
  modalCancellationReason.querySelector(`.form__textarea-wrap`);
const textareaLabel = modalCancellationReason.querySelector(
  `label[class="form__label-reason"]`
);
const textareaForOtherReason = modalCancellationReason.querySelector(
  `textarea[id="form__textarea-reason"]`
);
const btnCloseReasonForm = document.getElementById(`btnCloseReasonForm`);

//* Load lý do hủy/ trả hàng mặc định
const loadReasons = (list) => {
  list.textContent = ``;
  list.innerHTML = ``;
  for (const obj of list) {
    const option = document.createElement(`option`);
    option.value = obj.key;
    option.textContent = obj.label;
    selectedReason.appendChild(option);
  }
};

const settingModalCancellation = (button) => {
  const isCancelOrder = button === btnCancelOrder;
  const isReturnOrder = button === btnRequestReturnOrder;
  if (isCancelOrder || isReturnOrder) {
    modalCancellationTitle.textContent = isCancelOrder
      ? `Lý do hủy đơn hàng`
      : `Lý do trả hàng`;
    textareaLabel.textContent = `Nhập vào lý do khác`;
    textareaForOtherReason.placeholder = `Nhập lý do của bạn ở đây...`;
    loadReasons(
      isCancelOrder ? cancellationReasonDefaultList : returnReasonDefaultList
    );
    modalCancellationReason.style.display = `flex`;
    modalViewOrderDetail.style.display = `none`;
    selectedReason.focus();
  }
};

//* Chọn nút hủy đơn hàng
btnCancelOrder.addEventListener(`click`, () => {
  // Nút hủy đơn hàng trong phần xem chi tiết
  settingModalCancellation(btnCancelOrder);
});

//* Chọn nút yêu cầu trả hàng (Từ vị trí khách hàng)
btnRequestReturnOrder.addEventListener(`click`, () => {
  settingModalCancellation(btnRequestReturnOrder);
});

const handleReasonChange = () => {
  if (selectedReason.value === `other`) {
    textareaField.classList.remove(`hidden`);
    textareaForOtherReason.focus();
  } else {
    textareaField.classList.add(`hidden`);
  }
};
selectedReason.addEventListener(`change`, handleReasonChange);

btnCloseReasonForm.addEventListener(`click`, () => {
  modalCancellationReason.style.display = `none`;
  modalViewOrderDetail.style.display = `flex`;
  selectedReason.innerHTML = ``;
  selectedReason.value = ``;
  textareaForOtherReason.value = ``;
  textareaField.classList.add(`hidden`);
});

//* Xem lý do hủy đơn/ trả đơn hàng
const labelViewReason = document.querySelector(
  `.order-info__cancellation-reason .order-info__label`
);
labelViewReason.addEventListener(`click`, () => {
  const contentReason = labelViewReason.nextElementSibling;
  if (contentReason.classList.contains("order-info__content--visible")) {
    contentReason.classList.remove("order-info__content--visible");
  } else {
    contentReason.classList.add("order-info__content--visible");
  }
});

//* Validate form info user, changing password, delete account
Validator({
  form: `#account-information-management #account-form-info`,
  formField: `#account-information-management .form-field`,
  rules: [
    Validator.isRequired(
      `#account-information-management input[id="form__input-fullname"]`,
      `Vui lòng nhập đầy đủ họ tên của bạn`
    ),
    Validator.isFullName(
      `#account-information-management input[id="form__input-fullname"]`
    ),
    Validator.isRequired(
      `#account-information-management input[id="form__input-phone-number"]`,
      `Vui lòng nhập vào số điện thoại của bạn`
    ),
    Validator.isPhoneNumber(
      `#account-information-management input[id="form__input-phone-number"]`,
      `Số điện thoại không hợp lệ`
    ),
  ],
  alertMessage: `.form__alert-message`,
  onSubmit: function (values) {
    console.log(values);
  },
});

//* Giả lập chuyển đổi giữa có đơn và ko có đơn hàng
let isEmptyOrderList = false;
const emptyList = document.querySelector(`.order-list__empty-order`);
const orderList = document.querySelector(`.order-list__container`);
emptyList.classList.toggle(`hidden`, !isEmptyOrderList);
orderList.classList.toggle(`hidden`, isEmptyOrderList);

//* Giả lập chuyển đổi giữa có sản phẩm và ko có sản phẩm
let isEmptyProductList = false;
const emptyProductList = document.querySelector(`.review-list__empty-product`);
const productList = document.querySelector(`.review-list__container`);
const reviewPagination = document.querySelector(
  `#account-review-management .pagination`
);
emptyProductList.classList.toggle(`hidden`, !isEmptyProductList);
productList.classList.toggle(`hidden`, isEmptyProductList);
reviewPagination.classList.toggle(`hidden`, isEmptyProductList);
//* Mở modal feedback lên

const modalFeedback = document.getElementById(`modal__feedback`);
const btnFeedbacks = document.querySelectorAll(`.review-view-detail`);
const btnCloseFeedback = document.getElementById(`btnCloseFeedbackForm`);
const btnSaveFeedbackForm = document.getElementById(`btnSaveFeedbackForm`);
let modalFeedbackRating = modalFeedback.querySelector(`review-my-star`);
let parentRow, ratingCell;
let currentRating;
const ratingStars = [...document.getElementsByClassName(`star-icon`)];
const loadingStars = (userRating) => {
  ratingStars.forEach((star, index) => {
    if(index < userRating) {
      star.classList.add(`active-fill`);
    }
    else{
      star.classList.remove(`active-fill`);
    }
  });
};
btnFeedbacks.forEach((btnFeedback) => {
  btnFeedback.addEventListener(`click`, () => {
    parentRow = btnFeedback.parentNode;
    ratingCell = parentRow.querySelector(`.review-my-star`);
    loadingStars(parseInt(ratingCell.textContent.trim()));
    modalFeedback.style.display = `flex`;
  });
});
btnCloseFeedback.addEventListener(`click`, () => {
  modalFeedback.style.display = `none`;
});
btnSaveFeedbackForm.addEventListener(`click`, () => {
  ratingCell.innerHTML = ``;
  const newRating = currentRating;
  ratingCell.innerHTML = newRating;
  modalFeedback.style.display = `none`;
});

const executeRating = (stars) => {
  const starsListLength = stars.length;
  let i;
  Array.from(stars).map((star) => {
    star.addEventListener(`click`, () => {
      i = stars.indexOf(star);
      currentRating = i + 1;
      if (!stars[i].classList.contains(`active-fill`)) {
        for (i; i >= 0; --i) {
          stars[i].classList.add(`active-fill`);
        }
      } else {
        for (let j = i + 1; j < starsListLength; ++j) {
          stars[j].classList.remove(`active-fill`);
        }
      }
    });
  });
};
executeRating(ratingStars);

//* Sự kiện gửi mã OTP
//* Click button
const btnSendingOTPChangePassword = document.querySelector(
  `#account-form-changing-password #btnSendOTPCodeToEmail`
);
const btnSendingOTPDeleteAccount = document.querySelector(
  `#account-form-other-settings #deleting-account-form #btnSendOTPCodeToEmail`
);
const sendingOTPCode = (button) => {
  var inp_mail = document.querySelector('.my-email');
  console.log(inp_mail);
  var email = inp_mail.value;
  var url = currentURL + "/api/user/requestSendEmail?email=" + email;
  console.log(url);
  fetch(url);

  button.setAttribute(`disabled`, true);
  button.style.color = `var(--text-gray-color)`;
  button.style.borderColor = `var(--text-gray-color)`;
  button.style.cursor = `default`;
  let timeCountDown = 60;
  button.innerHTML = `Gửi lại mã sau (${timeCountDown}s)`;
  const timer = setInterval(() => {
    --timeCountDown;
    button.innerHTML = `Gửi lại mã sau (${timeCountDown}s)`;
    if (timeCountDown === 0) {
      clearInterval(timer);
      button.innerHTML = `Gửi mã OTP`;
      button.removeAttribute(`disabled`);
      button.style.color = `var(--blue-color)`;
      button.style.borderColor = `var(--blue-color)`;
      button.style.cursor = `pointer`;
    }
  }, 1000);
};
btnSendingOTPChangePassword.addEventListener(`click`, () => {
  sendingOTPCode(btnSendingOTPChangePassword);
});
btnSendingOTPDeleteAccount.addEventListener(`click`, () => {
  sendingOTPCode(btnSendingOTPDeleteAccount);
});
//* Sự kiện warning caplock và xem được mật khẩu
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

//* Sự kiện bấm nút xác nhận xóa tài khoản
const btnSubmitDeleteAccount = document.querySelector(
  `#btnSubmitDeleteAccount`
);
const modalConfirmDeleteAccount = document.querySelector(
  `#modal__confirm-delete-account`
);
const btnCloseModalConfirmDelete = modalConfirmDeleteAccount.querySelector(
  `#confirm-delete-account__action-cancel`
);
const btnConfirmDelete = modalConfirmDeleteAccount.querySelector(
  `#confirm-delete-account__action-confirm`
);
btnSubmitDeleteAccount.addEventListener(`click`, (e) => {
  e.preventDefault();
  modalConfirmDeleteAccount.style.display = `flex`;
});
btnCloseModalConfirmDelete.addEventListener(`click`, () => {
  modalConfirmDeleteAccount.style.display = `none`;
});


function loadEvent() {
  
  const url = window.location.href;
  var strCmp = currentURL + "/order/addNewOrder";
  console.log("load Event func");
  console.log(url+ " " +strCmp);
  if(url === strCmp ) {
    handleSidebarClick('order');
    return;
  }
  const queryString = url.split('?')[1];
  console.log(queryString);
  console.log("query",queryString);
  if(queryString === "info" || queryString === "order" || queryString === "review"  ) {
    handleSidebarClick(queryString);
  }
  else if(queryString === undefined) {
    loadingPage('info','changingpassword');
  }
  else{
    var mainK = queryString.split('&')[0];
    var option = queryString.split('&')[1];
    console.log(mainK,option);
    loadingPage(mainK,option);
  }
 
}

function loadOrder(page,size,status) {
  var url = currentURL + `/api/user/selectOrderByState?page=${page}&size=${size}&status=${status}`;
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu từ URL");
    }
    return response.json();
  })
  .then(data => {
      var html = `<div class="order-list__row order-list__header">
      <input type="hidden" class="inp-check-load-${status}">
      <div class="order-list__cell">Mã đơn hàng</div>
      <div class="order-list__cell">Thời gian lập</div>
      <div class="order-list__cell">Nguời nhận</div>
      <div class="order-list__cell">Tổng tiền</div>
      <div class="order-list__cell">Tình trạng đơn</div>
      <div class="order-list__cell">Thao tác</div>
    </div>
    <div class="order-list__row order-list__body">`;
      data.forEach(item => {
          html += `<div class="order-list__row">
          <div class="order-list__cell order-id">${item.id}</div>
          <div class="order-list__cell order-invoice-date">${item.thoiGianDatHang}</div>
          <div class="order-list__cell order-fullname">${item.tenNguoiNhan}</div>
          <div class="order-list__cell order-total-amount">${formatCurrency(item.tongTien)}</div>
          <div class="order-list__cell order-status${item.id}">${item.trangThai}</div>
          <div onclick="showViewDetail('${item.id}')" class="order-list__cell order-view-detail">Xem chi tiết</div>
        </div>`;
      });

      html += `</div>`;
      var element;
      if(status === "all") element = document.querySelector('#all-order')
      else if(status === "complete") element = document.querySelector('#complete-order');
      else if(status === "delivering") element = document.querySelector('#delivering-order');
      else if(status === "awaiting") element = document.querySelector('#awaiting-order');
      else if(status === "cancelled") element = document.querySelector('#cancelled-order');
      else if(status === "returned") element = document.querySelector('#returned-order');
      console.log(element);
      element.innerHTML = html;
  })
}


 function changePageOrder(page,size,status) {
  console.log("goi ham changePageOrderorder");
  var url = currentURL + "/api/order/countOrderByIdAndStatus?status=" + status;
  console.log(url);
  var totalPage = null;
  console.log(url);
  fetch(url)
  .then(response => {
      if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu từ URL");
      }
      return response.json();
  })
  .then(data => {
      // data = data.parseInt;
      console.log("dữ liêu: " + data);
      if(data === 0) {
         console.log("hide all");   
          document.querySelector('.order-list__empty-order').classList.remove('hidden');
          document.querySelector('#all-order').classList.add('hidden');
          document.querySelector('#complete-order').classList.add('hidden');
          document.querySelector('#delivering-order').classList.add('hidden');
          document.querySelector('#awaiting-order').classList.add('hidden');
          document.querySelector('#cancelled-order').classList.add('hidden');
          document.querySelector('#returned-order').classList.add('hidden');
          document.querySelector('.pagination').style.display = 'none';
          return;
      }
      else {
        document.querySelector('.order-list__empty-order').classList.add('hidden');
        document.querySelector('.pagination').style.display = 'flex';
      }
      if(data % size === 0) totalPage = data/size;
      else totalPage = Math.floor(data/size) + 1;

      
      loadOrder(page,size,status);
      // html phan trang
      var html = "";
      if(page === 1) {
          html += `<div class="pagination__item disable-paging">`;
      }
      else {
          html += `<div onclick="changePageOrder(${page-1},${size},${status})" class="pagination__item">`;
      }
      html += `<button class="button btnPrev">
          <svg class="btn__icon" fill="" height="800px" width="800px" version="1.1" id="Capa_1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 500 500" xml:space="preserve">
          <g>
              <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
              c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
          </g>
          </svg>
      </button>
      </div>`;
  
      if(totalPage <= 5) {
          for(var i=1;i<=totalPage;i++) {
              if(i === page) {
                  html += `<div class="pagination__item pagination__item--active">
                  <button class="button">${i}</button>
                </div>`;
              }
              else {
                  html += `<div onclick="changePageOrder(${i},${size},'${status}')" class="pagination__item">
                  <button class="button">${i}</button>
                </div>`;
              }
          }
      }
      else {
          if(page <= 3) {
            for(var i=1;i<=6;i++) {
                  if(i <= 4) {
                      if(i === page) {
                          html += `<div class="pagination__item pagination__item--active">
                          <button class="button">${i}</button>
                          </div>`;  
                      }
                      else {
                          html += `<div onclick="changePageOrder(${i},${size},'${status}')" class="pagination__item">
                          <button class="button">${i}</button>
                          </div>`;
                      }
                  }
                  else if(i == 5) {
                      html += `<div class="pagination__item">
                      <button class="button">...</button>
                      </div>`;
                  }
                  else {
                      html += `<div onclick="changePageOrder(${totalPage},${size},'${status}')" class="pagination__item">
                      <button class="button">${totalPage}</button>
                      </div>`;
                  }
            }  
          }
          else if(totalPage - page <=2) {
              html += `<div onclick="changePageOrder(1,${size},'${status}')" class="pagination__item">
                      <button class="button">1</button>
                      </div>`;
              html += `<div class="pagination__item">
                      <button class="button">...</button>
                      </div>`;
              for(var i=totalPage - 3;i<=totalPage;i++) {
                  if(i === page) {
                      html += `<div class="pagination__item pagination__item--active">
                      <button class="button">${i}</button>
                      </div>`;
                  }
                  else {
                      html += `<div onclick="changePageOrder(${i},${size},'${status}')" class="pagination__item">
                      <button class="button">${i}</button>
                      </div>`;
                  }
              }
          }
          else {
              html += `<div onclick="changePageOrder(1,${size},'${status}')" class="pagination__item">
                      <button class="button">1</button>
                      </div>`;
              html += `<div class="pagination__item">
                      <button class="button">...</button>
                      </div>`;
              html += `<div onclick="changePageOrder(${page-1},${size},'${status}')" class="pagination__item">
                      <button class="button">${page-1}</button>
                      </div>`;
              html += `<div class="pagination__item pagination__item--active">
                      <button class="button">${page}</button>
                      </div>`;
              html += `<div onclick="changePageOrder(${page+1},${size},'${status}')" class="pagination__item">
                      <button class="button">${page+1}</button>
                      </div>`;
              html += `<div class="pagination__item">
                      <button class="button">...</button>
                      </div>`;
              html += `<div onclick="changePageOrder(${totalPage},${size},'${status}')" class="pagination__item">
                      <button class="button">${totalPage}</button>
                      </div>`;
              }
      }
  
      if(totalPage === page ) {
          html += `<div class="pagination__item disable-paging">`;
      }
      else {
          html += `<div onclick="changePageOrder(${page+1},${size},'${status}')" class="pagination__item ">`;
      }
      html += `<button class="button btnNext">
          <svg class="btn__icon" fill="" height="800px" width="800px" version="1.1" id="Capa_1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 500 500" xml:space="preserve">
          <g>
              <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
              c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
              " />
          </g>
          </svg>
      </button>
      </div>`;
      document.querySelector(".pagination").innerHTML = html;
      // html phan trang nho o tren
      var html1 = "";
      if(page == 1) {
          html1 += `<button class="button btnPrev disable-paging">
          <svg class="btn__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" xml:space="preserve">
            <g>
              <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
              c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
            </g>
          </svg>
        </button>`;
      }
      else {
          html1 += `<button onclick="changePageOrder(${page-1},${size},'${status}')" class="button btnPrev">
          <svg class="btn__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" xml:space="preserve">
            <g>
              <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
              c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
            </g>
          </svg>
        </button>`;
      }

      html1 += `<div class="page__number">
      <div class="page__current">${page}</div>
      <div class="page__border">/</div>
      <div class="page__total">${totalPage}</div>
    </div>`;

    if(page == totalPage) {
          html1 += `<button class="button btnNext disable-paging">
          <svg class="btn__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" xml:space="preserve">
            <g>
              <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
              c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
              " />
            </g>
          </svg>
        </button>`;
    }
    else {
          html1 += `<button onclick="changePageOrder(${page+1},${size},'${status}')" class="button btnNext">
          <svg class="btn__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" xml:space="preserve">
          <g>
              <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
              c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
              " />
          </g>
          </svg>
      </button>`;
    }

   /* document.querySelector(".filter__page-controller").innerHTML = html1;*/
    var t1 = "inc";
    var t2 = "dec"
    var html2 = `<button onclick="showTextBySearch(${page},${size},'inc')" type="button" class="button btnFilter" id="ascPrice">Giá thấp đến cao</button>
    <button onclick="showTextBySearch(${page},${size},'dec')" type="button" class="button btnFilter" id="descPrice">Giá cao đến thấp</button>`;
   /* document.querySelector(".filter__group").innerHTML = html2;*/
  }) 
}

loadEvent();

