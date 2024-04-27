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
			return response.json();x
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
    if (cookieName === "status") { 
        cookieExists = true;
        break; 
    }
    }
    // if(!cookieExists) {
    //     window.location.href = "../customer/signinView.jsp";
    //     return;
    // }

    var ip = document.querySelector(".val-add");
    if(ip !== null) {
        var url = currentURL + "/cart/add?id=" + id + "&soluong=" + ip.value;
        console.log(url);
        fetch(url);
    }
    else {
        console.log("input null");
    }
}

function showCart() {
    var url = currentURL + "/api/user/selectCart";
    console.log(url);
    var html = `<div class="title">
    <div class="row">
        <div class="col"><h4><b>Shopping Cart</b></h4></div>
        <div class="col align-self-center text-right text-muted">3 items</div>
    </div>
</div>  `;
    fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error("Lỗi khi lấy dữ liệu từ URL");
			}
			return response.json();x
		})
		.then(data => {
            data.forEach(item => {
                if(item.soLuong > 0) {
                    html += `<div class="row border-top border-bottom">
                    <div class="row main align-items-center">
                        <div class="col-2"><img class="img-fluid" src="${item.sach.urlImage}"></div>
                        <div class="col">
                            <div class="row text-muted">${item.sach.tenSach}</div>
                            <div class="row">${formatCurrency(item.sach.giaBan)}</div>
                        </div>
                        <div class="col">
                            <span onclick = updateInCart("dec",${item.sach.idSach},${item.sach.giaBan}) href="#" style="
                            cursor: pointer;
                            padding-right: 12px;
                            ">-</span>
                            <a href="#" class="border val${item.sach.idSach}">${item.soLuong}</a>
                            <span onclick = updateInCart("inc",${item.sach.idSach},${item.sach.giaBan}) href="#" style="
                            padding-left: 12px;
                            cursor: pointer;
                            ">+</span>
                        </div>
                        <div class="col price${item.sach.idSach}"> ${formatCurrency(item.sach.giaBan * item.soLuong)}</div>
                        <div onclick="deleteAndShow(${item.sach.idSach})" class="col"><span class="close">&#10005;</span></div>                
                        </div>
                </div>`;     
                } 
            })
            var container =  document.querySelector(".cart");
            console.log(container);
            if(container !== null) container.innerHTML = html;
        })
}


function updateInCart(key,id,price) {
    var val = document.querySelector(`.val${id}`).textContent;
    val = parseInt(val);
    var url = currentURL + `/api/user/updateCart?id=${id}&soluong=`;
    if(key === "dec" && val === 1) return;
    if(key === "dec") {
        val--;
        url += "-1";
    }
    else {
        val++;
        url += "1";
    }
    console.log(url);
    fetch(url);
    document.querySelector(`.val${id}`).textContent = val.toString();
    document.querySelector(`.price${id}`).textContent = (formatCurrency(val * price)).toString();  
}

function deleteAndShow(id) {
    var url = currentURL + "/api/user/deleteAndShow?id=" + id ;
    var html = `<div class="title">
    <div class="row">
        <div class="col"><h4><b>Shopping Cart</b></h4></div>
        <div class="col align-self-center text-right text-muted">3 items</div>
    </div>
</div>  `;
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
            html += `<div class="row border-top border-bottom">
            <div class="row main align-items-center">
                <div class="col-2"><img class="img-fluid" src="${item.sach.urlImage}"></div>
                <div class="col">
                    <div class="row text-muted">${item.sach.tenSach}</div>
                    <div class="row">${formatCurrency(item.sach.giaBan)}</div>
                </div>
                <div class="col">
                    <span onclick = updateInCart("dec",${item.sach.idSach},${item.sach.giaBan}) href="#" style="
                    cursor: pointer;
                    padding-right: 12px;
                    ">-</span>
                    <a href="#" class="border val${item.sach.idSach}">${item.soLuong}</a>
                    <span onclick = updateInCart("inc",${item.sach.idSach},${item.sach.giaBan}) href="#" style="
                    padding-left: 12px;
                    cursor: pointer;
                    ">+</span>
                </div>
                <div class="col price${item.sach.idSach}"> ${formatCurrency(item.sach.giaBan * item.soLuong)}</div>
                <div onclick="deleteAndShow(${item.sach.idSach})" class="col"><span class="close">&#10005;</span></div>                
                </div>
        </div>`;     
        } 
    })
    var container =  document.querySelector(".cart");
    console.log(container);
    if(container !== null) container.innerHTML = html;
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
                <div class="product-item">
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
                </div>
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
                <div class="product-item">
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
                </div>
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

function changePage(page,size) {
    var val = document.querySelector(".header-search-bar__input-field").value;
    var val_category = parseInt(document.querySelector(".current-category").value);
    if(val === undefined || val === null) val = "";
    var url = currentURL + "/api/user/countNumber?txt=" + val;
    if(val_category !== 0) {
        
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
	                            <button class="button" id="btnViewCartDetail">Xem giỏ hàng</button>
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
                  <span onclick="showTextByKindOfBook(1,4,${item.id})"  class="category-item__link category-item--active">${item.ten}</span>
                </li>	
            `;
        })
        document.querySelector(".category-list").innerHTML = html;
    })
}