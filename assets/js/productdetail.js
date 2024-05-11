import * as Utils from './utils.js';
const rating = document.querySelector(`.product-detail__rating-star-average`).textContent;
console.log(rating);
Utils.fillPartialStar(parseFloat(rating));
