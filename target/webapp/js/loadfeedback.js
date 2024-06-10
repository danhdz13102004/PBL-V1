var currentURL = window.location.protocol + "//" + window.location.host;
const PAGE_SIZE=2

function loadFeedBack(page,size,kind = "all" , star = "none") {
    var id = document.querySelector(".inp-contain-id").value;
    var url = currentURL;
    if(kind === "all") {
      url += `/api/detail_order_user/getFeedbackOfBook?idSach=${id}&curPage=${page}&size=${size}`;
    }
    else {
      url += `/api/detail_order_user/getFBOfBookHasStar?idSach=${id}&curPage=${page}&size=${size}&soSao=${star}`;
    }
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
          html += `<div class="review__row row">
                          <div class="col-lg-2">
                            <div class="info__wrap">
                              <div class="avatar">
                                <svg class="avatar-icon" viewBox="0 0 24 24" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                  <g id="SVGRepo_iconCarrier">
                                    <circle cx="12" cy="9" r="3" stroke="#1C274C" stroke-width="1.9200000000000004" />
                                    <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.9200000000000004" />
                                    <path
                                      d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                                      stroke="#1C274C" stroke-width="1.9200000000000004" stroke-linecap="round" />
                                  </g>
                                </svg>
                              </div>
                              <div class="info">
                                <div class="fullname">${item.tenKhachHangDanhGia}</div>
                                <div class="time">
                                  ${item.thoiGian}
                                </div>
                              </div>
                            </div>
                            <div class="review-total__row">
                              <div class="review-total__label">
                                <img class="review-total__label-image" src="../image/review-image.png" alt="">
                                <div class="review-total__label-content">Đã viết</div>
                              </div>
                              <div class="review-total__value">13 Đánh giá</div>
                            </div>
                          </div>
                          <div class="col-lg-10">
                            <div class="voting">
                              <div class="voting__star-list">`;
                      for(var i = 1;i<= 5;i++) {
                        if(i <= item.soSao) {
                          html += `<svg class="star-icon voting__star-icon active-fill" viewBox="0 0 24 24" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                                      stroke="#000000" stroke-width="0.024" stroke-linecap="round"
                                      stroke-linejoin="round" />
                                    <path
                                      d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                                      stroke="#000000" stroke-width="0.024" stroke-linecap="round"
                                      stroke-linejoin="round" />
                                  </g>
                                </svg>`;
                        }
                        else {
                          html += `<svg class="star-icon voting__star-icon" viewBox="0 0 24 24" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                                      stroke="#000000" stroke-width="0.024" stroke-linecap="round"
                                      stroke-linejoin="round" />
                                    <path
                                      d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                                      stroke="#000000" stroke-width="0.024" stroke-linecap="round"
                                      stroke-linejoin="round" />
                                  </g>
                                </svg>`;
                        }
                      }   
                      html += `
                              </div>
                              <div class="voting__status">
                                <svg class="voting__status-icon" viewBox="0 0 24 24" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                                    fill="#292D32" />
                                </svg>
                                <div class="voting__status-content">Đã mua hàng</div>
                              </div>
                            </div>
                            <div class="comment">
                              ${item.binhLuan}
                            </div>
                          </div>
                        </div>`;
        })
  
        document.querySelector(".review__list").innerHTML = html;
      })
  }
  
  function changePageFeedBack(page,size,kind = "all",star = "id") {
    var url = currentURL;
    var id = document.querySelector(".inp-contain-id").value;
    if(kind === "all") {
        url += `/api/detail_order_user/countFeedbackOfBook?idSach=${id}`;
    }
    else {
        url += `/api/detail_order_user/countFBOfBookHasStar?idSach=${id}&soSao=${star}`;
    }
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
            document.querySelector('.empty-review__row').classList.remove("hidden");
            document.querySelector('.pagination').style.display = 'none';
            document.querySelector(".review__list").style.display = 'none';
        }
        else {
            document.querySelector('.empty-review__row').classList.add("hidden");
            document.querySelector('.pagination').style.display = 'flex';
            document.querySelector(".review__list").style.display = 'flex';
        }
        
        if(data % size === 0) totalPage = data/size;
        else totalPage = Math.floor(data/size) + 1;

        
        loadFeedBack(page,size,kind,star);
        // html phan trang
        var html = "";
        if(page === 1) {
            html += `<div class="pagination__item disable-paging">`;
        }
        else {
            html += `<div onclick="changePageFeedBack(${page-1},${size},'${kind}',${star})" class="pagination__item">`;
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
                    html += `<div onclick="changePageFeedBack(${i},${size},'${kind}',${star})" class="pagination__item">
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
                            html += `<div onclick="changePageFeedBack(${i},${size},'${kind}',${star})" class="pagination__item">
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
                        html += `<div onclick="changePageFeedBack(${totalPage},${size},'${kind}',${star})" class="pagination__item">
                        <button class="button">${totalPage}</button>
                        </div>`;
                    }
              }  
            }
            else if(totalPage - page <=2) {
                html += `<div onclick="changePageFeedBack(1,${size},'${kind}',${star})" class="pagination__item">
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
                        html += `<div onclick="changePageFeedBack(${i},${size},'${kind}',${star})" class="pagination__item">
                        <button class="button">${i}</button>
                        </div>`;
                    }
                }
            }
            else {
                html += `<div onclick="changePageFeedBack(1,${size},'${kind}',${star})" class="pagination__item">
                        <button class="button">1</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="button">...</button>
                        </div>`;
                html += `<div onclick="changePageFeedBack(${page-1},${size},'${kind}',${star})" class="pagination__item">
                        <button class="button">${page-1}</button>
                        </div>`;
                html += `<div class="pagination__item pagination__item--active">
                        <button class="button">${page}</button>
                        </div>`;
                html += `<div onclick="changePageFeedBack(${page+1},${size})" class="pagination__item">
                        <button class="button">${page+1}</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="button">...</button>
                        </div>`;
                html += `<div onclick="changePageFeedBack(${totalPage},${size},'${kind}',${star})" class="pagination__item">
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
        
    }) 

}

changePageFeedBack(1,3);