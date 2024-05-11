let itemsCount;
//* Show empty if itemsCount = 0, show cart if itemsCount != 0
const cartEmptyColumn = document.querySelector(
  `.main__form div:where(.col-lg-12)`
);
const cartProductItemColumn = document.querySelector(
  `.main__form div:where(.col-lg-9)`
);
const cartCheckoutColumn = document.querySelector(
  `.main__form div:where(.col-lg-3)`
);
document
  .querySelector("header-component")
  .addEventListener("headerReady", () => {
    let shadowRoot = document.querySelector("header-component").shadowRoot;
    itemsCount = shadowRoot.querySelector(
      ".header .header-cart__notice"
    ).innerHTML;
  });
cartEmptyColumn.classList.toggle(`hidden`, itemsCount !== 0);
cartCheckoutColumn.classList.toggle(`hidden`, itemsCount === 0);
cartProductItemColumn.classList.toggle(`hidden`, itemsCount === 0);

//* Checkbox Event
const checkBoxAll = document.getElementById(
  `cart-detail-product__header-checkBoxAll`
);
const checkBox = document.querySelectorAll(
  `.cart-detail-product__item-checkbox`
);
//checkBoxAll => All checkBox: Checked
checkBoxAll.addEventListener(`change`, () => {
  checkBox.forEach((item) => {
    item.checked = checkBoxAll.checked;
  });
});
// Check all checkBox => CheckBoxAll: Checked
// Checked full checkBox => CheckBoxAll: Checked
// Unchecked 1 or more checkBox => CheckBoxAll: unchecked
checkBox.forEach((item) => {
  item.addEventListener(`change`, () => {
    const newCheckBoxArray = [...checkBox];
    checkBoxAll.checked = newCheckBoxArray.every((newItem) => newItem.checked);
  });
});

//* Prevent input (item-quantity) type negative number
//* Prevent input (item-quantity) is null or 0 ( return value = 1)
const itemQuantityList = document.querySelectorAll(`.item-quantity`);
console.log(itemQuantityList);
itemQuantityList.forEach(itemQuantity => {
  itemQuantity.addEventListener(`keydown`, (event) => {
    if (event.key === "-" || event.key === "e") {
      event.preventDefault();
    }
  });
  itemQuantity.addEventListener(`change`, () => {
    if (itemQuantity.value === "" || parseInt(itemQuantity.value) === 0) {
      itemQuantity.value = 1;
    }
  });
});
//* Click button increase, decrease or input
const btnIncreaseList = document.querySelectorAll(`.btnIncrease`);
btnIncreaseList.forEach(btnIncrease => {
  btnIncrease.addEventListener(`click`,()=>{
    const parent = btnIncrease.parentNode;
    const itemQuantity = parent.querySelector(`.item-quantity`);
    const itemQuantityValue = parseInt(itemQuantity.value); 
    itemQuantity.value = itemQuantityValue + 1;
  });
});
const btnDecreaseList = document.querySelectorAll(`.btnDecrease`);
btnDecreaseList.forEach(btnDecrease => {
  btnDecrease.addEventListener(`click`,()=>{
    const parent = btnDecrease.parentNode;
    const itemQuantity = parent.querySelector(`.item-quantity`);
    const itemQuantityValue = parseInt(itemQuantity.value); 
    if(itemQuantityValue > 1){
      itemQuantity.value = itemQuantityValue - 1;
    }
  });
});

//* Click on button "Thanh toán"
const btnToPaymentPage = document.getElementById(`btnToPaymentPage`);
btnToPaymentPage.addEventListener(`click`, () => {
    window.location.href = `/checkout.html`;
});
