import * as ToastMessageUI from './toastmessage.js';



const fillPartialStar = (rating, starArray) => {
  // 2 layer (path), front layer clip and show remain part of back layer.
  const fullFillStar = Math.floor(rating);
  const partialFillStar = (rating % 1) * 100;
  starArray.forEach((star, index) => {
    const paths = star.querySelectorAll("path");
    if (index < fullFillStar) {
      paths.forEach((path) => {
        path.style.fill = "#0396ff";
      });
    } else if (index === fullFillStar && partialFillStar !== 0) {
      paths[0].style.fill = "var(--gray-color)";
      paths[0].style.clipPath = `polygon(${partialFillStar}% 0%, 100% 0%, 100% 100%, ${partialFillStar}% 100%)`;
      paths[1].style.fill = "#0396ff";
      paths[1].style.clipPath = `polygon(0 0, ${partialFillStar}% 0, ${partialFillStar}% 100%, 0 100%)`;
    } else {
      paths.forEach((path) => {
        path.style.fill = "var(--gray-color)";
      });
    }
  });
};
const rating = document.querySelector(
  `.product-detail__rating-star-average`
).textContent;
const starArray = document.querySelectorAll(
  `.product-detail__rating-star-icon`
);
fillPartialStar(parseFloat(rating), starArray);

const reviewRating = document.querySelector(
  `.review__rating-score`
).textContent;
const starReviewArray = document.querySelectorAll(`.review__rating-star-icon`);
fillPartialStar(parseFloat(reviewRating), starReviewArray);

//* Show empty review if review count = 0
const emptyReviewList = document.querySelector(`.empty-review__row`);
const reviewList = document.querySelector(`.review__list`);
let reviewCount = 3;
emptyReviewList.classList.toggle(`hidden`, reviewCount !== 0);
reviewList.classList.toggle(`hidden`, reviewCount === 0);

//* Open modal add my feedback
const modalFeedback = document.getElementById(`modal__feedback`);
// const btnAddNewFeedback = document.querySelector(`#addNewFeedback`);
// btnAddNewFeedback.addEventListener(`click`, () => {
//   modalFeedback.style.display = `flex`;
// });

//* Event of modal add feedback
const btnCloseFeedback = document.getElementById(`btnCloseFeedbackForm`);
const btnSaveFeedbackForm = document.getElementById(`btnSaveFeedbackForm`);
let parentRow, ratingCell;
let currentRating;
const ratingStars = [...modalFeedback.getElementsByClassName(`star-icon`)];
const loadingStars = (userRating) => {
  ratingStars.forEach((star, index) => {
    if (index < userRating) {
      star.classList.add(`active-fill`);
    } else {
      star.classList.remove(`active-fill`);
    }
  });
};
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

//* Click in overlays
const overlays = document.querySelectorAll(`.modal__overlay`);
overlays.forEach((overlay) => {
  overlay.addEventListener(`click`, () => {
    const parentElement = overlay.parentNode;
    parentElement.style.display = `none`;
  });
});

//* Open modal delete my review
const btnOpenDeleteReviewModal = document.getElementById(`btnDeleteMyReview`);
const modalDeleteReview = document.getElementById(
  `modal__confirm-delete-review`
);

btnOpenDeleteReviewModal.addEventListener(`click`, () => {
  modalDeleteReview.style.display = `flex`;
});

//* Close modal delete my review

const btnCloseDeleteReviewModal = document.getElementById(
  `confirm-delete-review__action-cancel`
);
btnCloseDeleteReviewModal.addEventListener(`click`, () => {
  modalDeleteReview.style.display = `none`;
});

//* Button filter
const buttons = document.querySelectorAll(".review__filter .button");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    // Perform action based on the clicked button
    switch (this.id) {
      case "all-review":
        // Code to display all reviews
        console.log("Displaying all reviews");
        break;
      case "newest-review":
        // Code to display newest reviews
        console.log("Displaying newest reviews");
        break;
      case "five-star-review":
        // Code to display 5-star reviews
        console.log("Displaying 5-star reviews");
        break;
      case "four-star-review":
        // Code to display 4-star reviews
        console.log("Displaying 4-star reviews");
        break;
      case "three-star-review":
        // Code to display 3-star reviews
        console.log("Displaying 3-star reviews");
        break;
      case "two-star-review":
        // Code to display 2-star reviews
        console.log("Displaying 2-star reviews");
        break;
      case "one-star-review":
        // Code to display 1-star reviews
        console.log("Displaying 1-star reviews");
        break;
      default:
        break;
    }
  });
});

//* Similar product
const rows = document.querySelectorAll(`.product .row`);
const btnViewMore = document.getElementById(`btnViewMore`);
const btnViewLess = document.getElementById(`btnViewLess`);
let visibleRows = 1;
const initSimilarProductList = () => {
  rows.forEach((row, index) => {
    row.style.maxHeight = null; // để đưa phần nội dung có chiều cao của nó, không bị maxHeight hạn chế
    const actualHeight = row.scrollHeight + `px`;
    row.style.maxHeight = `0`;
    row.dataset.maxHeight = actualHeight;
    if (index >= visibleRows) {
      row.style.maxHeight = `0rem`;
    }
    else{
      row.style.maxHeight = actualHeight;
    }
  });
};
window.onload = () => {
  initSimilarProductList();
};
// btnViewMore.addEventListener(`click`, () => {
//   if (visibleRows < rows.length) {
//     rows[visibleRows].style.maxHeight = rows[visibleRows].dataset.maxHeight;
//     ++visibleRows;
//     btnViewMore.scrollIntoView({ behavior: 'smooth', block: 'end' });
//     if (visibleRows === rows.length) {
//       btnViewMore.classList.add(`hidden`);
//       btnViewLess.classList.remove(`hidden`);
//     }
//   }
// });
// btnViewLess.addEventListener(`click`, () => {
//   while (visibleRows > 1) {
//     rows[visibleRows - 1].style.maxHeight = `0`;
//     --visibleRows;
//   }
//   btnViewLess.scrollIntoView({ behavior: 'smooth', block: 'center' });
//   btnViewLess.classList.add(`hidden`);
//   btnViewMore.classList.remove(`hidden`);
// });


//?--------------------------- New -------------------------
//* Hàm fill các ngôi sao
const fillStar = (reviewRowElement, rating) => {
  const stars = [...reviewRowElement.getElementsByClassName(`star-icon`)];
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add(`active-fill`);
    } else {
      star.classList.remove(`active-fill`);
    }
  });
}
const reviewRowElement = document.querySelector(`.review__row`);
fillStar(reviewRowElement, 3);

//* Thêm toast message 
const btnAddToCart = document.querySelector(`.btnAddToCart`);
btnAddToCart.addEventListener(`click`, () => {
  var cookiesArray = document.cookie.split(";");
  var cookieExists = false;
  console.log(cookiesArray.length);
  for (var i = 0; i < cookiesArray.length; i++) {
  var cookie = cookiesArray[i].trim();
  var separatorIndex = cookie.indexOf("=");
  var cookieName = cookie.substring(0, separatorIndex);
  console.log(cookieName);
  console.log(cookieName === "status")
  if (cookieName === "status") { 
          cookieExists = true;
          break; 
  }
  }
  if(!cookieExists) {
    window.location.href = "../customer/signin.jsp";
    return;
  }
   var id = document.querySelector('.inp-contain-id').value;
  console.log("value id " + id);
  addToCart(id);
  ToastMessageUI.toast({
    title: `Thành công`,
    message: `Sản phẩm đã được thêm vào giỏ hàng`,
    type: `success`,
    duration: 5000,
  });
});


function addToCart(id) {
  
  

  var ip = document.querySelector(".item-quantity");
  console.log(ip);
  if(ip !== null) {
      var url = currentURL + "/cart/add?id=" + id + "&soluong=" + ip.value;
      console.log(url);
      fetch(url)
    .then(response => {
            showSmallCart();
/*				ToastMessageUI.toast({
        title: `Thành công`,
        message: `Sản phẩm đã được thêm vào giỏ hàng`,
        type: `success`,
        duration: 5000,
      });*/
     })
  }
  else {
      console.log("input null");
  }
}


