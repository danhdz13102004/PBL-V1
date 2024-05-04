`use strict`;
// Disabled to Click btnPrev/ btnNext when currentPage = 1 or = TotalPage
const btnPrev = document.querySelector(`.btnPrev`);
const btnNext = document.querySelector(`.btnNext`);
const currentPage = parseInt(
  document.querySelector(`.page__current`).innerHTML
);
const totalPage = parseInt(document.querySelector(`.page__total`).innerHTML);
if (currentPage === 1) {
  btnPrev.setAttribute(`disabled`, true);
}
if (currentPage === totalPage) {
  btnNext.setAttribute(`disabled`, true);
}
btnPrev.addEventListener(`click`, () => {
});
btnNext.addEventListener(`click`, () => {
});
