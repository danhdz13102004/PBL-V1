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
function showAndHideMenu() {
    var menu = document.querySelector(".menu-all-category");
    if(menu.classList.contains("slideInDown")) {
        menu.classList.remove("slideInDown");
        menu.classList.add("slideOutUp");
        menu.classList.remove("show");
    }
    else {
        menu.classList.add("slideInDown")
        menu.classList.add("show");
        menu.classList.remove("slideOutUp");
    }
}

function showNewestItem() {
    var url = currentURL + "/api/user/getNewestItem";
    var html = "";
    return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error("Lỗi khi lấy dữ liệu từ URL");
			}
			return response.json();
		})
		.then(data => {
            data.forEach(item => {
                if(item.phanTramGiamGia === 0) {
                        html += `<div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="card p-3 mb-4">
                        <a
                            href="${currentURL}/product/detail?id=${item.id}"
                            class="img-wrap text-center"> 
                                    <img width="200" height="200" class="img-fluid"
                                        src="${currentURL}${item.urlImage}"
                                        alt="">
                        </a>
                        <div class="info-wrap mt-2">
                            <a
                                href="${currentURL}/product/detail?id=${item.id}"
                                class="title">${item.ten}</a>
                            <div>
                                        <span class="price mt-1 fw-bold"> ${formatCurrency(item.giaBan)}
                                        </span>
                            </div>
                        </div>
                    </div>
                </div>`; 
                }
                else {
                        html += `<div class="col-xl-3 col-lg-4 col-md-6">
                        <div class="card p-3 mb-4">
                            <a
                                href="${currentURL}/product/detail?id=${item.id}"
                                class="img-wrap text-center"> 
                                        <img width="200" height="200" class="img-fluid"
                                            src="${currentURL}${item.urlImage}"
                                            alt="">
                            </a>
                            <div class="info-wrap mt-2">
                                <a
                                    href="${currentURL}/product/detail?id=${item.id}"
                                    class="title">${item.ten}</a>
                                <div>
                                            <span class="price mt-1 fw-bold"> ${formatCurrency(item.giaBan * (1 - item.phanTramGiamGia/100))}
                                            </span>
                                            <span class="ms-2 text-muted text-decoration-line-through">
                                                ${formatCurrency(item.giaBan)}
                                            </span>
                                            <span class="ms-2 badge bg-info"> ${item.phanTramGiamGia}%
                                            </span>
                                </div>
                            </div>
                        </div>
                    </div>`;        
                }
            });

            document.querySelector(".contain-newest").innerHTML = html;

        })
}

function addToCart(id) {
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

    var ip = document.querySelector(".item-quantity");
    console.log(ip);
    if(ip !== null) {
        var url = currentURL + "/cart/add?id=" + id + "&soluong=" + ip.value;
        console.log(url);
        fetch(url)
       .then(response => {
            showSmallCart();
       })
    }
    else {
        console.log("input null");
    }
}

// function showCart() {
//     var url = currentURL + "/api/user/selectCart";
//     console.log(url);
//     var html = `<div class="title">
//     <div class="row">
//         <div class="col"><h4><b>Shopping Cart</b></h4></div>
//         <div class="col align-self-center text-right text-muted">3 items</div>
//     </div>
// </div>  `;
//     fetch(url)
// 		.then(response => {
// 			if (!response.ok) {
// 				throw new Error("Lỗi khi lấy dữ liệu từ URL");
// 			}
// 			return response.json();
// 		})
// 		.then(data => {
//             data.forEach(item => {
//                 if(item.soLuong > 0) {
//                     html += `<div class="row border-top border-bottom">
//                     <div class="row main align-items-center">
//                         <div class="col-2"><img class="img-fluid" src="${item.sach.urlImage}"></div>
//                         <div class="col">
//                             <div class="row text-muted">${item.sach.tenSach}</div>
//                             <div class="row">${formatCurrency(item.sach.giaBan)}</div>
//                         </div>
//                         <div class="col">
//                             <span onclick = updateInCart("dec",${item.sach.idSach},${item.sach.giaBan}) href="#" style="
//                             cursor: pointer;
//                             padding-right: 12px;
//                             ">-</span>
//                             <a href="#" class="border val${item.sach.idSach}">${item.soLuong}</a>
//                             <span onclick = updateInCart("inc",${item.sach.idSach},${item.sach.giaBan}) href="#" style="
//                             padding-left: 12px;
//                             cursor: pointer;
//                             ">+</span>
//                         </div>
//                         <div class="col price${item.sach.idSach}"> ${formatCurrency(item.sach.giaBan * item.soLuong)}</div>
//                         <div onclick="deleteAndShow(${item.sach.idSach})" class="col"><span class="close">&#10005;</span></div>                
//                         </div>
//                 </div>`;     
//                 } 
//             })
//             var container =  document.querySelector(".cart");
//             console.log(container);
//             if(container !== null) container.innerHTML = html;
//         })
// }

function showCart(){
    var url = currentURL + "/api/user/selectCart";
  var total = 0;
  console.log(url);
  var html = "";
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu từ URL");
    }
    return response.json();
  })
  .then(data => {
          data.forEach(item => {
      
              if(item.soLuong > 0) {
                  var giaSauGiamGia = item.sach.giaBan * (1 - item.sach.phamTramGiamGia / 100);
                  if(item.status === true) total += giaSauGiamGia * item.soLuong;
                  html += `<div class="cart-detail-product__item">
                  <div for="cart-detail-product__item-checkBox" class="cart-detail-product__item-info">
                    <input onclick="checkBoxItemEvent(this,'none','${item.sach.idSach}')" type="checkbox" name="" class="cart-detail-product__item-checkbox">
                    <div class="cart-detail-product__item-image-wrap">
                      <a href="" class="cart-detail-product__item-image"
                        style="background-image: url(${item.sach.urlImage});">
                      </a>
                    </div>
                    <div class="cart-detail-product__item-name">
                      <a href="" class="cart-detail-product__item-link">
                        ${item.sach.tenSach}
                      </a>
                    </div>
                  </div>
                  <div>
                    <span class="cart-detail-product__item-unitPrice">${formatCurrency(giaSauGiamGia)}</span>
                    <br>
                    <span style="padding-left: 8px" class="product-item__old-price">${formatCurrency(item.sach.giaBan)}</span>
                  </div>
                  <div class="cart-detail-product__item-quantity">
                    <button onclick="updateInCart('dec',${item.sach.idSach},${giaSauGiamGia})" class="button" id="btnDecrease">
                      <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12L18 12" stroke="#000000" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </button>
                    <input type="text" name="item-quantity" class="val${item.sach.idSach}" id="item-quantity" value="${item.soLuong}" readonly>
                    <button onclick="updateInCart('in',${item.sach.idSach},${giaSauGiamGia})" class="button" id="btnIncrease">
                      <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18M12 6V18" stroke="#000000" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <span class="cart-detail-product__item-totalAmount total${item.sach.idSach}">${formatCurrency(item.soLuong * giaSauGiamGia)}</span>
                  <button onclick="deleteAndShow(${item.sach.idSach})" class="button" id="btnDelete">
                    <svg class="cart-detail-product__btnDelete-icon" id="cart-detail-product__header-btnDelete"
                      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25V3.75ZM22.5 5.25C22.9142 5.25 23.25 4.91421 23.25 4.5C23.25 4.08579 22.9142 3.75 22.5 3.75V5.25ZM1.5 5.25H22.5V3.75H1.5V5.25Z"
                        fill="#71717A" />
                      <path
                        d="M9.75 1.5V0.75V1.5ZM8.25 3H7.5H8.25ZM7.5 4.5C7.5 4.91421 7.83579 5.25 8.25 5.25C8.66421 5.25 9 4.91421 9 4.5H7.5ZM15 4.5C15 4.91421 15.3358 5.25 15.75 5.25C16.1642 5.25 16.5 4.91421 16.5 4.5H15ZM15.75 3H16.5H15.75ZM14.25 0.75H9.75V2.25H14.25V0.75ZM9.75 0.75C9.15326 0.75 8.58097 0.987053 8.15901 1.40901L9.21967 2.46967C9.36032 2.32902 9.55109 2.25 9.75 2.25V0.75ZM8.15901 1.40901C7.73705 1.83097 7.5 2.40326 7.5 3H9C9 2.80109 9.07902 2.61032 9.21967 2.46967L8.15901 1.40901ZM7.5 3V4.5H9V3H7.5ZM16.5 4.5V3H15V4.5H16.5ZM16.5 3C16.5 2.40326 16.2629 1.83097 15.841 1.40901L14.7803 2.46967C14.921 2.61032 15 2.80109 15 3H16.5ZM15.841 1.40901C15.419 0.987053 14.8467 0.75 14.25 0.75V2.25C14.4489 2.25 14.6397 2.32902 14.7803 2.46967L15.841 1.40901Z"
                        fill="#71717A" />
                      <path
                        d="M9 17.25C9 17.6642 9.33579 18 9.75 18C10.1642 18 10.5 17.6642 10.5 17.25H9ZM10.5 9.75C10.5 9.33579 10.1642 9 9.75 9C9.33579 9 9 9.33579 9 9.75H10.5ZM10.5 17.25V9.75H9V17.25H10.5Z"
                        fill="#71717A" />
                      <path
                        d="M13.5 17.25C13.5 17.6642 13.8358 18 14.25 18C14.6642 18 15 17.6642 15 17.25H13.5ZM15 9.75C15 9.33579 14.6642 9 14.25 9C13.8358 9 13.5 9.33579 13.5 9.75H15ZM15 17.25V9.75H13.5V17.25H15Z"
                        fill="#71717A" />
                      <path
                        d="M18.865 21.124L18.1176 21.0617L18.1176 21.062L18.865 21.124ZM17.37 22.5L17.3701 21.75H17.37V22.5ZM6.631 22.5V21.75H6.63093L6.631 22.5ZM5.136 21.124L5.88343 21.062L5.88341 21.0617L5.136 21.124ZM4.49741 4.43769C4.46299 4.0249 4.10047 3.71818 3.68769 3.75259C3.2749 3.78701 2.96818 4.14953 3.00259 4.56231L4.49741 4.43769ZM20.9974 4.56227C21.0318 4.14949 20.7251 3.78698 20.3123 3.75259C19.8995 3.7182 19.537 4.02495 19.5026 4.43773L20.9974 4.56227ZM18.1176 21.062C18.102 21.2495 18.0165 21.4244 17.878 21.5518L18.8939 22.6555C19.3093 22.2732 19.5658 21.7486 19.6124 21.186L18.1176 21.062ZM17.878 21.5518C17.7396 21.6793 17.5583 21.75 17.3701 21.75L17.3699 23.25C17.9345 23.25 18.4785 23.0379 18.8939 22.6555L17.878 21.5518ZM17.37 21.75H6.631V23.25H17.37V21.75ZM6.63093 21.75C6.44274 21.75 6.26142 21.6793 6.12295 21.5518L5.10713 22.6555C5.52253 23.0379 6.06649 23.25 6.63107 23.25L6.63093 21.75ZM6.12295 21.5518C5.98449 21.4244 5.89899 21.2495 5.88343 21.062L4.38857 21.186C4.43524 21.7486 4.69172 22.2732 5.10713 22.6555L6.12295 21.5518ZM5.88341 21.0617L4.49741 4.43769L3.00259 4.56231L4.38859 21.1863L5.88341 21.0617ZM19.5026 4.43773L18.1176 21.0617L19.6124 21.1863L20.9974 4.56227L19.5026 4.43773Z"
                        fill="#71717A" />
                    </svg>
                  </button>
                </div>`; 
              } 
          })
          var container =  document.querySelector(".cart-detail-product__body");
          if(container !== null) container.innerHTML = html;
          document.querySelector(".payment-info__subtotal-result").innerText = formatCurrency(total).toString();
          document.querySelector(".payment-info__total-result").innerText = formatCurrency(total + 15000).toString();
          document.querySelector(".sub_total_inp").value = total.toString();
        })
}



function updateInCart(key,id,price) {
    var val = document.querySelector(`.val${id}`).value;
    val = parseInt(val);
    var sub_total = parseInt(document.querySelector(".sub_total_inp").value);
    var url = currentURL + `/api/user/updateCart?id=${id}&soluong=`;
    if(key === "dec" && val === 1) return;
    if(key === "dec") {
        sub_total -= price;
        val--;
        url += "-1";
    }
    else {
        sub_total += price;
        val++;
        url += "1";
    }
    console.log(url);
    fetch(url);
    document.querySelector(`.val${id}`).value = val.toString();
    document.querySelector(`.total${id}`).textContent = (formatCurrency(val * price)).toString();
    // document.querySelector(".payment-info__subtotal-result").innerText = formatCurrency(sub_total).toString();
    // document.querySelector(".payment-info__total-result").innerText = formatCurrency(sub_total + 15000).toString(); 
    // document.querySelector(".sub_total_inp").value = sub_total.toString();
}

function deleteAndShow(id) {
    var url = currentURL + "/api/user/deleteAndShow?id=" + id ;
    fetch(url)
    .then(response => {
        showCart();
    })
}
// Show sách theo nội dung của thanh tìm kiếm
function showTextBySearch(page,size,sort = "none") {
    var text = document.querySelector(".header-search-bar__input-field").value.toString();
    var url = currentURL + `/api/user/selectByText?page=${page}&size=${size}`;
    
    if(text !== null) {
        url += `&txt=${text}`;
    }
    console.log(sort);
    console.log(sort === 'inc');
    var val_category = parseInt(document.querySelector(".current-category").value);
    if(val_category !== 0) {
        showTextByKindOfBook(page,size,val_category,sort); return;
    }
    if(sort === "inc") {
        url += `&sort=inc`;
    }
    else if(sort == "dec") {
        url += `&sort=dec`;
    }
    // console.log(url);
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(data => {
        var cnt = 0;
        // html show sach ra giao dien
        var html = "";
        data.forEach(item => {
            cnt++;
            if(cnt % 4 === 1) html += `<div class="row">`;
            if(item.phanTramGiamGia > 0) {
                html += `<div class="col-lg-3">
                <a href="${currentURL}/product/detail?id=${item.id}" class="product-item" style="text-decoration: none;">
                  <div class="product-item__image"
                    style="background-image: url(${item.urlImage});">
                  </div>
                  <div class="product-item__name">${item.ten}</div>
                  <div class="product-item__price">
                    <div class="product-item__new-price">${formatCurrency(item.giaBan * (1 - item.phanTramGiamGia/100))}</div>
                    <div class="product-item__old-price">${formatCurrency(item.giaBan)}</div>
                    <div class="product-item__discount">${item.phanTramGiamGia}%</div>
                  </div>
                  <div class="product-item__action">
                    <div id="viewDetail"></div>
                    <div id="addToCart"></div>
                    <div id="buyNow"></div>
                  </div>
                </a>
              </div>`;
            }
            else {
                html += `<div class="col-lg-3">
                <a href="${currentURL}/product/detail?id=${item.id}"  class="product-item">
                  <div class="product-item__image"
                    style="background-image: url(${item.urlImage});">
                  </div>
                  <div class="product-item__name">${item.ten}</div>
                  <div class="product-item__price">
                    <div class="product-item__new-price">${formatCurrency(item.giaBan)}</div>
                  </div>
                  <div class="product-item__action">
                    <div id="viewDetail"></div>
                    <div id="addToCart"></div>
                    <div id="buyNow"></div>
                  </div>
                </a>
              </div>`;
            }
            if(cnt % 4 === 0) html += `</div>`;
        })
        var container = document.querySelector(".product").innerHTML = html;
    })
}
// Show sách theo thể loại sách
function showTextByKindOfBook(page,size,id,sort = "none") {
    var url = currentURL + `/api/user/selectByKindOfBook?page=${page}&size=${size}&idtheloai=${id}`;
    document.querySelector(".current-category").value = id;
    console.log(sort);
    console.log(sort === 'inc');
    if(sort === "inc") {
        url += `&sort=inc`;
    }
    else if(sort == "dec") {
        url += `&sort=dec`;
    }
    // console.log(url);
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(data => {
        var cnt = 0;
        // html show sach ra giao dien
        var html = "";
        data.forEach(item => {
            cnt++;
            if(cnt % 4 === 1) html += `<div class="row">`;
            if(item.phanTramGiamGia > 0) {
                html += `<div class="col-lg-3">
                <a href="${currentURL}/product/detail?id=${item.id}" class="product-item" style="text-decoration: none;">
                  <div class="product-item__image"
                    style="background-image: url(${item.urlImage});">
                  </div>
                  <div class="product-item__name">${item.ten}</div>
                  <div class="product-item__price">
                    <div class="product-item__new-price">${formatCurrency(item.giaBan * (1 - item.phanTramGiamGia/100))}</div>
                    <div class="product-item__old-price">${formatCurrency(item.giaBan)}</div>
                    <div class="product-item__discount">${item.phanTramGiamGia}%</div>
                  </div>
                  <div class="product-item__action">
                    <div id="viewDetail"></div>
                    <div id="addToCart"></div>
                    <div id="buyNow"></div>
                  </div>
                </a>
              </div>`;
            }
            else {
                html += `<div class="col-lg-3">
                <div class="product-item">
                  <div class="product-item__image"
                    style="background-image: url(${item.urlImage});">
                  </div>
                  <div class="product-item__name">${item.ten}</div>
                  <div class="product-item__price">
                    <div class="product-item__new-price">${formatCurrency(item.giaBan)}</div>
                  </div>
                  <div class="product-item__action">
                    <div id="viewDetail"></div>
                    <div id="addToCart"></div>
                    <div id="buyNow"></div>
                  </div>
                </div>
              </div>`;
            }
            if(cnt % 4 === 0) html += `</div>`;
        })
        var container = document.querySelector(".product").innerHTML = html;
    })
}

function changePage(page,size,text = "none",id = "id") {
    if(text === "search") {
        var currentUrl = window.location.href;
        console.log(currentUrl);
        console.log(currentURL !== `${currentURL}/home`);
        if(currentURL !== `${currentURL}/home` || currentURL !== `${currentURL}/khach-hang/dang-nhap`) {
            var text = document.querySelector(".header-search-bar__input-field").value;
            window.location.href = `${currentURL}/home?text=${text}`;
        }
        document.querySelector(".current-category").value = 0;
    }   
    else if(id !== "id") {
        document.querySelector(".current-category").value = id;
    }
    var val = document.querySelector(".header-search-bar__input-field").value;
    var val_category = parseInt(document.querySelector(".current-category").value);
    if(val === undefined || val === null) val = "";
    var url = currentURL + "/api/user/countNumber?txt=" + val;
    if(val_category !== 0) {
        url = currentURL + `/api/user/countNumberByCategory?id=${val_category}`;
    }
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
        
        if(data % size === 0) totalPage = data/size;
        else totalPage = Math.floor(data/size) + 1;

        
        console.log("val-cate: " + val_category);
        if(val_category !== 0) {
            showTextByKindOfBook(page,size,val_category);
        }
        else {
            showTextBySearch(page,size);
        }
        // html phan trang
        var html = "";
        if(page === 1) {
            html += `<div class="pagination__item disable-paging">`;
        }
        else {
            html += `<div onclick="changePage(${page-1},${size})" class="pagination__item">`;
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
                    html += `<div onclick="changePage(${i},${size})" class="pagination__item">
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
                            html += `<div onclick="changePage(${i},${size})" class="pagination__item">
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
                        html += `<div onclick="changePage(${totalPage},${size})" class="pagination__item">
                        <button class="button">${totalPage}</button>
                        </div>`;
                    }
              }  
            }
            else if(totalPage - page <=2) {
                html += `<div onclick="changePage(1,${size})" class="pagination__item">
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
                        html += `<div onclick="changePage(${i},${size})" class="pagination__item">
                        <button class="button">${i}</button>
                        </div>`;
                    }
                }
            }
            else {
                html += `<div onclick="changePage(1,${size})" class="pagination__item">
                        <button class="button">1</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="button">...</button>
                        </div>`;
                html += `<div onclick="changePage(${page-1},${size})" class="pagination__item">
                        <button class="button">${page-1}</button>
                        </div>`;
                html += `<div class="pagination__item pagination__item--active">
                        <button class="button">${page}</button>
                        </div>`;
                html += `<div onclick="changePage(${page+1},${size})" class="pagination__item">
                        <button class="button">${page+1}</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="button">...</button>
                        </div>`;
                html += `<div onclick="changePage(${totalPage},${size})" class="pagination__item">
                        <button class="button">${totalPage}</button>
                        </div>`;
                }
        }
    
        if(totalPage === page ) {
            html += `<div class="pagination__item disable-paging">`;
        }
        else {
            html += `<div onclick="changePage(${page+1},${size})" class="pagination__item ">`;
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
            html1 += `<button onclick="changePage(${page-1},${size})" class="button btnPrev">
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
            html1 += `<button onclick="changePage(${page+1},${size})" class="button btnNext">
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

      document.querySelector(".filter__page-controller").innerHTML = html1;
      var t1 = "inc";
      var t2 = "dec"
      var html2 = `<button onclick="showTextBySearch(${page},${size},'inc')" type="button" class="button btnFilter" id="ascPrice">Giá thấp đến cao</button>
      <button onclick="showTextBySearch(${page},${size},'dec')" type="button" class="button btnFilter" id="descPrice">Giá cao đến thấp</button>`;
      document.querySelector(".filter__group").innerHTML = html2;
    }) 

}


function showSmallCart() {
    var url = currentURL + "/api/user/selectCart";
    console.log(url);
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(data => {
        var cnt = 0;
        var totalPrice = 0;
        var html = `<div class="header-cart__list">
        <h4 class="header-cart__heading">Sách đã thêm</h4>
        <ul class="header-cart__table">`;
        console.log(data);
        data.forEach(item => {
            console.log(item.sach.idSach);
            console.log(item.sach.tenSach);
            console.log(item.sach.phamTramGiamGia);
            console.log(item.sach.giaBan);      
            var price = item.sach.giaBan * (1 - item.sach.phamTramGiamGia / 100 );
            if(item.soLuong > 0) {
                cnt++;
                html += `<li class="header-cart__item">
                <img src="${item.sach.urlImage}" alt=""
                  class="header-cart__item-image">
                <div class="header-cart__item-info">
                  <div class="header-cart__item-name">${item.sach.tenSach}</div>
                  <div class="header-cart__item-amount">
                    <div class="header-cart__item-price">${formatCurrency(price)}</div>
                    <div class="header-cart__item-multiply">x</div>
                    <div class="header-cart__item-quantity">${item.soLuong}</div>
                  </div>
                </div>
              </li>  `;
              totalPrice += price * item.soLuong;
            }
        })
        if(cnt === 0 ) {
            html = `<div class="header-cart__list--empty">
            <img src="/image/cart-empty-img.png" alt="empty-cart" class="empty-cart__image">
            <div class="header-cart__message">Chưa có sản phẩm trong giỏ hàng của bạn</div>
          </div>`;
        }
        else{
            html += `
            </ul>
	                          <div class="header-cart__footer">
	                            <div class="header-cart__total">
	                              <div class="header-cart__total-title">Tổng tiền</div>
	                              <div class="header-cart__total-amount">${formatCurrency(totalPrice)}</div>
	                            </div>
	                            <a href="${currentURL}/customer/cartDetail.jsp" class="button" id="btnViewCartDetail">Xem giỏ hàng</a>
	                          </div>
	                        </div>`;
            document.querySelector(".header-cart__notice").textContent = cnt.toString();
        }

        document.querySelector(".header-cart__wrap").innerHTML = html;
        
    })
}

function showTheLoai() {
    var url = currentURL + "/api/user/getAllTheLoai";
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(data => {
        var html = "";
        data.forEach(item => {
            html += `
            <li class="category-item">
                  <span onclick="changePage(1,4,'none',${item.id})"  class="category-item__link category-item--active">${item.ten}</span>
                </li>	
            `;
        })
        document.querySelector(".category-list").innerHTML = html;
    })
}

function checkBoxItemEvent(element,type="none",id="none") {
  var url;
  if(type === "false") element.checked = false;
  else if(type === "true") element.checked = true;
  if(type !== "none") return;

  console.log(element.checked);
  console.log(element);
  if(!element.checked) {
      element.checked = false;
      document.querySelector(".all_checkbox").checked = false;
      url = currentURL + `/api/cart/setStatusFalse?id=${id}`;
      fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu từ URL");
    }
    return response.json();
  })
  .then(data => {
          var total = 0;
          data.forEach(item => {
            var giaSauGiamGia = item.sach.giaBan * (1 - item.sach.phamTramGiamGia / 100);
            if(item.soLuong > 0 && item.status === true) {
              total += giaSauGiamGia * item.soLuong ;
            }
          })
          document.querySelector(".payment-info__subtotal-result").innerText = `${formatCurrency(total)}`;
          document.querySelector(".payment-info__total-result").innerText = `${formatCurrency(total + 15000)}`;
          if(total === 0) document.querySelector("#btnToPaymentPage").classList.add("btn-invalid");
    })
  }
  else {
      url = currentURL + `/api/cart/setStatusTrue?id=${id}`;
      fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu từ URL");
    }
    return response.json();
  })
  .then(data => {
          var total = 0;
          data.forEach(item => {
            var giaSauGiamGia = item.sach.giaBan * (1 - item.sach.phamTramGiamGia / 100);
            if(item.soLuong > 0 && item.status === true) {
              total += giaSauGiamGia * item.soLuong ;
            }
          })
          document.querySelector(".payment-info__subtotal-result").innerText = `${formatCurrency(total)}`;
          document.querySelector(".payment-info__total-result").innerText = `${formatCurrency(total + 15000)}`;
          if(total > 0) document.querySelector("#btnToPaymentPage").classList.remove("btn-invalid");
    })
      element.checked = true;
      var list = document.querySelectorAll(".cart-detail-product__item-checkbox");
      var check = true;
      list.forEach(item => {
        console.log(item.checked);
        if(!item.checked) {
          check = false; return;
        }
      })
      if(check) document.querySelector(".all_checkbox").checked = true;
  }
}

function checkBoxAllEvent(element) {
  var url;
  console.log("onchange checkbox-all");
    var list = document.querySelectorAll(".cart-detail-product__item-checkbox");
    list.forEach(item => {
      if(element.checked) {
        url = currentURL + "/api/cart/setStatusAllTrue";
        if(!item.checked) checkBoxItemEvent(item,"true");
        document.querySelector("#btnToPaymentPage").classList.remove("btn-invalid");
      }
      else {
        url = currentURL + "/api/cart/setStatusAllFalse";
        if(item.checked) {
          checkBoxItemEvent(item,"false");
        }
        document.querySelector("#btnToPaymentPage").classList.add("btn-invalid");
      }
    })
    fetch(url);
}

function showItemInOrder() {
  console.log("show order");
  var url = currentURL + "/api/order/selectItemInOrder";
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu từ URL");
    }
    return response.json();
  })
  .then(data => {
          var html = "";
          var total = 15000;
          data.forEach(item => {
                console.log(item.status === true && parseInt(item.soLuong) > 0);
                if(item.status === true && parseInt(item.soLuong) > 0) {
                  var giaBanSauGiamGia = item.sach.giaBan * (1 - item.sach.phamTramGiamGia / 100);
                  total += giaBanSauGiamGia * item.soLuong;
                  html += `<div class="checking-order__item">
                  <div for="checking-order__item-checkBox" class="checking-order__item-info">
                    <div class="checking-order__item-image-wrap">
                      <div href="" class="checking-order__item-image"
                        style="background-image: url(${item.sach.urlImage});">
                      </div>
                    </div>
                    <div class="checking-order__item-name">
                      <div href="" class="checking-order__item-link">
                        ${item.sach.tenSach}
                      </div>
                    </div>
                  </div>
                  <span class="checking-order__item-unitPrice">${formatCurrency(giaBanSauGiamGia)}</span>
                  <div class="checking-order__item-quantity">
                    ${item.soLuong}
                  </div>
                  <span class="checking-order__item-totalAmount">${formatCurrency(giaBanSauGiamGia * item.soLuong)}</span>
                </div>`;
                }
          })

          document.querySelector(".contain-all-item").innerHTML = html;
          document.querySelector(".payment__total-result").innerText = formatCurrency(total);
          document.querySelector(".totalprice-inp").value = total;
      })
}


function changeSoLuong(key) {
  var sl = parseInt(document.querySelector(".item-quantity").value);
  if(sl === 1 && key === "dec") return;
  if(key === "inc") sl++;
  else sl--;
  document.querySelector(".item-quantity").value = sl.toString();
  document.querySelector(".inp-quantity").value = sl;
}


function loadAllProvince() {
  var url = "https://web-staging.ghtklab.com/api/v1/public/address/list";
  console.log(url)
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu từ URL");
    }
    return response.json();
  })
  .then(province => {
    var html = `<option value="">Chọn tỉnh/ thành phố</option>`;
    province.data.forEach(item => {
        html += `<option value="${item.id}">${item.name}</option>`;
    })
    console.log(html);
    var list = document.querySelector(".update-province");
    console.log(list);
    list.innerHTML = html;
    loadAllDistrict();
  })
}

function loadAllDistrict() {
  var selectElement = document.querySelector(".update-province");
            
  // Lấy giá trị của tùy chọn được chọn
  var selectedValue = selectElement.value;

  console.log("select val " + selectedValue);
  if(selectedValue !== "") {
    console.log(selectedValue);
    var url = `https://web-staging.ghtklab.com/api/v1/public/address/list?parentId=${selectedValue}&type=3`;
    console.log(url)
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu từ URL");
      }
      return response.json();
    })
    .then(province => {
      var html = `<option value="">Chọn quận/ huyện</option>`;
      province.data.forEach(item => {
          html += `<option value="${item.id}">${item.name}</option>`;
      })
      console.log(html);
      var list = document.querySelector(".update-district");
      console.log(list);
      list.innerHTML = html;
    })
  } 
}

function loadAllWard() {
  var selectElement = document.querySelector(".update-district");
            
  // Lấy giá trị của tùy chọn được chọn
  var selectedValue = selectElement.value;

  console.log("select val " + selectedValue);
  if(selectedValue !== "") {
    console.log(selectedValue);
    var url = `https://web-staging.ghtklab.com/api/v1/public/address/list?parentId=${selectedValue}&type=1`;
    console.log(url)
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu từ URL");
      }
      return response.json();
    })
    .then(province => {
      var html = `<option value="">Chọn xã/ phường</option>`;
      province.data.forEach(item => {
          html += `<option value="${item.id}">${item.name}</option>`;
      })
      console.log(html);
      var list = document.querySelector(".update-ward");
      console.log(list);
      list.innerHTML = html;
    })
  } 
}


function onChangeSelect(element,kind) {
  var selectedIndex = element.selectedIndex;
            
  // Lấy text của option đang được chọn
  var selectedText = element.options[selectedIndex].text;

  var inp = document.querySelector(`.${kind}`);
  console.log(kind);
  console.log(inp + " " + selectedText);
  document.querySelector(`.${kind}`).value = selectedText;
}



function loadAddress() {
    var url  = currentURL + "/api/user/selectAddress";
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu từ URL");
      }
      return response.json();
    })
    .then(data => {
        var html1 = "";
        var html2 = "";
        var cnt = 0;
        data.forEach(item => {
          cnt++;
          if(cnt <= 1) {
            html1 += `<div class="checkout-default__info">
            <div class="checkout-default__fullname">
              ${item.tenNguoiNhan}
            </div>
            <div class="checkout-default__phone-number">
              ${item.soDienThoai}
            </div>
          </div>
          <div class="checkout-default__address">
            <label for="">Địa chỉ: </label>
            <span>
              ${item.diaChi}
            </span>
          </div>`;
          html2 += `<div class="checkout-history__option">
          <input type="radio" name="chooseDefault" class="checkout-radio-choose-default"
            id="checkout-radio-choose-default" checked>
          <div class="checkout-history__info-wrap">
            <div class="checkout-history__info">
              <div class="checkout-history__fullname">
                ${item.tenNguoiNhan}
              </div>
              <div class="checkout-history__phone-number">
                ${item.soDienThoai}
              </div>
              <div class="checkout-history__label-default">Mặc định</div>
            </div>
            <div class="checkout-history__address">
              <div class="home-address">
                ${item.diaChi}
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
              <input class="inp-id" type="hidden" value="${item.id}">
            </button>
          </div>
        </div>`;
          }
          else {
            html2 += `<div class="checkout-history__option">
          <input type="radio" name="chooseDefault" class="checkout-radio-choose-default"
            id="checkout-radio-choose-default">
          <div class="checkout-history__info-wrap">
            <div class="checkout-history__info">
              <div class="checkout-history__fullname">
                ${item.tenNguoiNhan}
              </div>
              <div class="checkout-history__phone-number">
                ${item.soDienThoai}
              </div>
              <div class="checkout-history__label-default">Mặc định</div>
            </div>
            <div class="checkout-history__address">
              <div class="home-address">
                ${item.diaChi}
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
              <input class="inp-id" type="hidden" value="${item.id}">
            </button>
          </div>
        </div>`;
          }
        })
        if(html1 === "") {
          html1 = `<div class="checkout-default__item">
          <div class="checkout-default__info-wrap">
            <div class="checkout-default__address">
              <span>
                Chưa có địa chỉ
              </span>
            </div>
          </div>
          <div class="checkout-default__label-default active">Mặc định</div>
          <div class="checkout-default__action">
            <button class="button" id="checkout-default__action-switch">
              <svg class="checkout-default__action-switch-icon" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                  fill="#000000" />
              </svg>
              <span class="checkout-default__action-switch-label">Thêm mới địa chỉ</span>
            </button>
          </div>
        </div>`;
        }


        document.querySelector('.checkout-default__info-wrap').innerHTML = html1;
        document.querySelector('.checkout-history__list').innerHTML = html2;
        setText();
    })
}


function setText() {
  document.querySelector('.fullname-inp').value = document.querySelector('.checkout-default__fullname').innerText;
  document.querySelector('.phonenumber-inp').value = document.querySelector('.checkout-default__phone-number').innerText;

  var spans = document.querySelector('.checkout-default__address').querySelectorAll("span");
  spans.forEach(function(span, index) {
    document.querySelector('.address-inp').value = span.innerText;
 });
  
}

