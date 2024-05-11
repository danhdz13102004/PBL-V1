const overlays = document.querySelectorAll(`.modal__overlay`);
const btnDefaultInfoEdit = document.getElementById(`checkout-history-action__edit`);
const modalSwitchInfo = document.getElementById(`modal__switch-checkout-info`);
const btnReturn = document.getElementById(`btnReturn`);
const btnAddNewInfo = document.getElementById(`btnAddNewInfo`);
const btnReturnSwitchInfo = document.getElementById(`btnReturnSwitchInfo`);
const modalAddNewInfo = document.getElementById(`modal__addNewInfo`);
const checkoutOptions = document.querySelectorAll(`.checkout-option`);
overlays.forEach((overlay) => {
  overlay.addEventListener(`click`,()=>{
    const modalParent = overlay.parentNode;
    modalParent.style.display = `none`;
  })
});
btnDefaultInfoEdit.addEventListener(`click`, () => {
  modalSwitchInfo.style.display = `flex`;  
});
btnReturn.addEventListener(`click`,()=>{
  modalSwitchInfo.style.animation = `FadeInAndZoomOut`;
  modalSwitchInfo.style.display = `none`;
})
btnAddNewInfo.addEventListener(`click`,()=>{
  modalAddNewInfo.style.display = `flex`;
  modalSwitchInfo.style.display = `none`;
});
btnReturnSwitchInfo.addEventListener(`click`, ()=>{
  modalAddNewInfo.style.display = `none`;
  modalSwitchInfo.style.display = `flex`;
});
checkoutOptions.forEach(checkoutOption => {
  checkoutOption.addEventListener(`click`, ()=>{
    const radio = checkoutOption.querySelector(`.checkout-radio-choose-default`);
    radio.checked = `true`;
  });
});