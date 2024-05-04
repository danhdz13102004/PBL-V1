const btnReturnCart = document.getElementById(`btnReturnCart`);
console.log(btnReturnCart);
btnReturnCart.addEventListener(`click`, () => {
  window.location.href = `/cartdetail.html`;
});