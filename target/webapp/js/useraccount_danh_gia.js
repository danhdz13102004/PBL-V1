var currentURL = window.location.protocol + "//" + window.location.host;
var danhGiaSanPham = document.querySelector('.account-sidebar__option:nth-of-type(3)')
const PAGE_SIZE=5
var curID
var idUser 

function setBottomPagination(page, totalPage)
{
	var html = "";
        if(page === 1) {
            html += `<div class="pagination__item disable-paging">`;
        }
        else {
            html += `<div onclick="changeThePage(${page-1},${PAGE_SIZE})" class="pagination__item">`;
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
                    html += `<div onclick="changeThePage(${i},${PAGE_SIZE})" class="pagination__item">
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
                            html += `<div onclick="changeThePage(${i},${PAGE_SIZE})" class="pagination__item">
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
                        html += `<div onclick="changeThePage(${totalPage},${PAGE_SIZE})" class="pagination__item">
                        <button class="button">${totalPage}</button>
                        </div>`;
                    }
              }  
            }
            else if(totalPage - page <=2) {
                html += `<div onclick="changeThePage(1,${PAGE_SIZE})" class="pagination__item">
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
                        html += `<div onclick="changeThePage(${i},${PAGE_SIZE})" class="pagination__item">
                        <button class="button">${i}</button>
                        </div>`;
                    }
                }
            }
            else {
                html += `<div onclick="changeThePage(1,${PAGE_SIZE})" class="pagination__item">
                        <button class="button">1</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="button">...</button>
                        </div>`;
                html += `<div onclick="changeThePage(${page-1},${PAGE_SIZE})" class="pagination__item">
                        <button class="button">${page-1}</button>
                        </div>`;
                html += `<div class="pagination__item pagination__item--active">
                        <button class="button">${page}</button>
                        </div>`;
                html += `<div onclick="changeThePage(${page+1},${PAGE_SIZE})" class="pagination__item">
                        <button class="button">${page+1}</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="button">...</button>
                        </div>`;
                html += `<div onclick="changeThePage(${totalPage},${PAGE_SIZE})" class="pagination__item">
                        <button class="button">${totalPage}</button>
                        </div>`;
                }
        }
    
        if(totalPage === page ) {
            html += `<div class="pagination__item disable-paging">`;
        }
        else {
            html += `<div onclick="changeThePage(${page+1},${PAGE_SIZE})" class="pagination__item">`;
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
        document.querySelector("#account-review-management .pagination").innerHTML = html;
}

function  updateDanhGia(idCTDH, soSao, binhLuan)
{
  
	var now=Date.now();
	var url = `${currentURL}/api/detail_order_user/add_update?idCTDH=${idCTDH}&soSao=${soSao}&binhLuan=${encodeURIComponent(binhLuan)}&thoiGian=${now}`
	console.log(url);
  fetch(url)
	.then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then((data)=>{
		console.log(data)
		document.querySelector(`#account-review-management .review-list__container .review-list__row.review-list__body #${idCTDH} .review-invoice-date`).innerHTML=data.danhGia.thoiGian;
		document.querySelector(`#account-review-management .review-list__container .review-list__row.review-list__body #${idCTDH} .review-average-star`).innerHTML=parseFloat(data.sach.soSaoTB).toFixed(2);
		document.querySelector(`#account-review-management .review-list__container .review-list__row.review-list__body #${idCTDH} .review-feed-back`).innerHTML=data.danhGia.binhLuan;
	})
}

//* Mở modal feedback lên

const modalFeedback = document.getElementById(`modal__feedback`);

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

btnCloseFeedback.addEventListener(`click`, () => {
  modalFeedback.style.display = `none`;
});
btnSaveFeedbackForm.addEventListener(`click`, () => {
  var binhLuan=document.querySelector("#modal__feedback .feedback-textarea").value
  if(currentRating === undefined) {
    console.log("curID " + curID);  
    var parent = document.querySelector(`#${curID}`);
    console.log(parent);
    var child = parent.querySelector('.review-my-star');
    console.log(child);
    var text = child.textContent;
    console.log("text: " + text);
    if(text === "Chưa đánh giá") {
      currentRating = 5;
    }
    else {
      currentRating = parseInt(text);
    }
  }
  updateDanhGia(curID,currentRating,binhLuan);
  
  ratingCell.innerHTML = currentRating;
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

function changeThePage(page, size){
	var totalPage = document.querySelector("#account-review-management .pagination .pagination__item:nth-last-child(2) .button").innerHTML
	getDanhGia(idUser, page, size)
	setBottomPagination(page, parseInt(totalPage))
}
function getDanhGia(id, page, size)
{
	var url = `${currentURL}/api/detail_order_user?idUser=${id}&curPage=${page}&size=${size}`
  console.log(url);
	fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then((data)=>{
		console.log(data)
		var html=''
		data.forEach((item)=>{
			if (!item.danhGia){
				html+=
				`
				<div class="review-list__row" id=${item.id}>
                  <input type="hidden" value="${item.sach.urlImage}" class="img-${item.id}">
	                <div class="review-list__cell review-id">${item.sach.idSach}</div>
	                <div class="review-list__cell review-name">${item.sach.tenSach}</div>
	                <div class="review-list__cell review-unit-price">${item.sach.giaBan}</div>
	                <div class="review-list__cell review-invoice-date">${item.donHang.thoiGianDatHang}</div>
	                <div class="review-list__cell review-average-star">${parseFloat(item.sach.soSaoTB).toFixed(2)}</div>
	                <div class="review-list__cell review-my-star">Chưa đánh giá</div>
	                <div class="review-list__cell review-view-detail" >Đánh giá</div>
	                <div class="review-list__cell review-feed-back" style="display:none;"></div>
	            </div>
				`
			}
				
			else{
				html+=
				`
				<div class="review-list__row" id="${item.id}">
                  <input type="hidden" value="${item.sach.urlImage}" class="img-${item.id}">
	                <div class="review-list__cell review-id">${item.sach.idSach}</div>
	                <div class="review-list__cell review-name">${item.sach.tenSach}</div>
	                <div class="review-list__cell review-unit-price">${item.sach.giaBan}</div>
	                <div class="review-list__cell review-invoice-date">${item.donHang.thoiGianDatHang}</div>
	                <div class="review-list__cell review-average-star">${parseFloat(item.sach.soSaoTB).toFixed(2)}</div>
	                <div class="review-list__cell review-my-star">${item.danhGia.soSao}</div>
	                <div class="review-list__cell review-view-detail" >Đánh giá</div>
	                <div class="review-list__cell review-feed-back" style="display:none;">${item.danhGia.binhLuan}</div>
	            </div>
				`
			}
			
			
		})
		document.querySelector('#account-review-management .review-list__container .review-list__row.review-list__body').innerHTML=html
		const btnFeedbacks = document.querySelectorAll(`.review-view-detail`);
		btnFeedbacks.forEach((btnFeedback)=>{
		  btnFeedback.addEventListener(`click`, () => {
			
		    parentRow = btnFeedback.parentNode;
		    ratingCell = parentRow.querySelector(`.review-my-star`);
        if(ratingCell.textContent === "Chưa đánh giá") {
          currentRating = 5;    
        }
        else {
          currentRating = parseInt(ratingCell.textContent.trim());
        }
		    loadingStars(parseInt(ratingCell.textContent.trim()));
		    curID = parentRow.id
		    var idSP = parentRow.querySelector(`.review-id`).innerHTML
		    var name = parentRow.querySelector(`.review-name`).innerHTML
		    var binhLuan = parentRow.querySelector(`.review-feed-back`).innerHTML
		    document.querySelector("#modal__feedback .feedback-product__id").textContent=`Mã sách: #${idSP}`
		    document.querySelector("#modal__feedback .feedback-product__name").textContent=`${name}`;
        var urlImg = document.querySelector(`.img-${curID}`).value;
        document.querySelector('.feedback-product__img').innerHTML = `<div class="feedback-product__image" style="background-image: url(${urlImg});">
                              </div>`;
		    
		    if (binhLuan!=='undefined')
		    {
				document.querySelector("#modal__feedback .feedback-textarea").value=`${binhLuan}`
			}
			else{
				document.querySelector("#modal__feedback .feedback-textarea").value=''
			}
		    modalFeedback.style.display = `flex`;
  });
});
	})
}


danhGiaSanPham.addEventListener('click', ()=>{
	idUser = '1713455089563'// do sth get id user
	var url = `${currentURL}/api/detail_order_user/count?idUser=${idUser}`
	fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then((cnt)=>{
		var totalPage=Math.ceil(parseInt(cnt,10)/PAGE_SIZE)
		console.log(totalPage)
		if (totalPage===0)
		{
			document.querySelector('#account-review-management .review-list__empty-product').classList.remove('hidden')
			document.querySelector('#account-review-management .review-list__container').classList.add('hidden')
			document.querySelector("#account-review-management .pagination").style.display='none'
		}
		else{
			document.querySelector('#account-review-management .review-list__empty-product').classList.add('hidden')
			document.querySelector('#account-review-management .review-list__container').classList.remove('hidden')
			document.querySelector("#account-review-management .pagination").style.display='flex'
			setBottomPagination(1,totalPage)
			getDanhGia(idUser,1,PAGE_SIZE)
		}
		
	})
})