<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="customer/header1.jsp" />
	<main class="main">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <nav class="category">
              <h3 class="category-heading">
                <svg class="category-heading__icon" width="20px" height="20px" viewBox="-2.4 -2.4 28.80 28.80"
                  fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
                      stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                </svg>
                <span class="category-heading__title">Danh mục</span>
              </h3>
              <input type="hidden" class="current-category" value="0">
              <ul class="category-list">
	            <c:forEach var="item" items="${sessionScope.listTheLoai}">
                <li class="category-item">
                  <a href="" class="category-item__link category-item--active">${item.tenTheLoai}</a>
                </li>	
			  	</c:forEach> 
              </ul>
            </nav>
          </div>
          <div class="col-lg-9">
            <!-- <section class="slider">
              <div class="slider-item">
                <img src="" alt="" class="slider-item__img">
              </div>
              <div class="slider-item">
                <img src="" alt="" class="slider-item__img">
              </div>
              <div class="slider-item">
                <img src="" alt="" class="slider-item__img">
              </div>
              <div class="slider-item">
                <img src="" alt="" class="slider-item__img">
              </div>
              <div class="slider-item">
                <img src="" alt="" class="slider-item__img">
              </div>
              <button>
                <button id="button btn-prev"><</button>
              </button>
            </section> -->
            <div class="filter-and-product">
              <!--* Bo loc san pham -->
              <div class="filter">
                <div class="filter__group">
                  <!-- Them class Active -->
                  <button type="button" class="button btnFilter" id="popular">Phổ biến</button>
                  <button type="button" class="button btnFilter" id="bestSeller">Bán chạy</button>
                  <button type="button" class="button btnFilter" id="newest">Sách mới nhất</button>
                  <button onclick="" type="button" class="button btnFilter" id="ascPrice">Giá thấp đến cao</button>
                  <button type="button" class="button btnFilter" id="descPrice">Giá cao đến thấp</button>
                </div>
                <div class="filter__page-controller">
                  <button class="button btnPrev">
                    <svg class="btn__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" xml:space="preserve">
                      <g>
                        <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                        c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
                      </g>
                    </svg>
                  </button>
                  <div class="page__number">
                    <div class="page__current">1</div>
                    <div class="page__border">/</div>
                    <div class="page__total">10</div>
                  </div>
                  <button class="button btnNext">
                    <svg class="btn__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" xml:space="preserve">
                      <g>
                        <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                        c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
                        " />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              <!--* San pham -->
              <div class="product">
                <div class="row">
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Mot_thoang_ta_ruc_ro_o_nhan_gian.jpg);">
                      </div>
                      <div class="product-item__name">Một Thoáng Ta Rực Rỡ Ở Nhân Gian</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">119.350₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div id="viewDetail"></div>
                        <div id="addToCart"></div>
                        <div id="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Cay_cam_ngot_cua_toi.jpg);">
                      </div>
                      <div class="product-item__name">Cây cam ngọt của tôi</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">119.350₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Vang_bong_mot_thoi.jpg);">
                      </div>
                      <div class="product-item__name">Vang Bóng Một Thời (Việt Nam Danh Tác)</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">49400₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Dam_tre_o_dai_duong_den.jpg);">
                      </div>
                      <div class="product-item__name">Đám trẻ ở đại dương đen</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">64350₫</div>
                        <div class="product-item__old-price">99000₫</div>
                        <div class="product-item__discount">-35%</div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Mot_thoang_ta_ruc_ro_o_nhan_gian.jpg);">
                      </div>
                      <div class="product-item__name">Một Thoáng Ta Rực Rỡ Ở Nhân Gian</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">119.350₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div id="viewDetail"></div>
                        <div id="addToCart"></div>
                        <div id="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Cay_cam_ngot_cua_toi.jpg);">
                      </div>
                      <div class="product-item__name">Cây cam ngọt của tôi</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">119.350₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Vang_bong_mot_thoi.jpg);">
                      </div>
                      <div class="product-item__name">Vang Bóng Một Thời (Việt Nam Danh Tác)</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">49400₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Dam_tre_o_dai_duong_den.jpg);">
                      </div>
                      <div class="product-item__name">Đám trẻ ở đại dương đen</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">64350₫</div>
                        <div class="product-item__old-price">99000₫</div>
                        <div class="product-item__discount">-35%</div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Mot_thoang_ta_ruc_ro_o_nhan_gian.jpg);">
                      </div>
                      <div class="product-item__name">Một Thoáng Ta Rực Rỡ Ở Nhân Gian</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">119.350₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div id="viewDetail"></div>
                        <div id="addToCart"></div>
                        <div id="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Cay_cam_ngot_cua_toi.jpg);">
                      </div>
                      <div class="product-item__name">Cây cam ngọt của tôi</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">119.350₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Vang_bong_mot_thoi.jpg);">
                      </div>
                      <div class="product-item__name">Vang Bóng Một Thời (Việt Nam Danh Tác)</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">49400₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Dam_tre_o_dai_duong_den.jpg);">
                      </div>
                      <div class="product-item__name">Đám trẻ ở đại dương đen</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">64350₫</div>
                        <div class="product-item__old-price">99000₫</div>
                        <div class="product-item__discount">-35%</div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(data/Mot_thoang_ta_ruc_ro_o_nhan_gian.jpg);">
                      </div>
                      <div class="product-item__name">Một Thoáng Ta Rực Rỡ Ở Nhân Gian</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">119.350₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div id="viewDetail"></div>
                        <div id="addToCart"></div>
                        <div id="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Cay_cam_ngot_cua_toi.jpg);">
                      </div>
                      <div class="product-item__name">Cây cam ngọt của tôi</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">119.350₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Vang_bong_mot_thoi.jpg);">
                      </div>
                      <div class="product-item__name">Vang Bóng Một Thời (Việt Nam Danh Tác)</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">49400₫</div>
                        <div class="product-item__old-price"></div>
                        <div class="product-item__discount"></div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="product-item">
                      <div class="product-item__image"
                        style="background-image: url(assets/data/Dam_tre_o_dai_duong_den.jpg);">
                      </div>
                      <div class="product-item__name">Đám trẻ ở đại dương đen</div>
                      <div class="product-item__price">
                        <div class="product-item__new-price">64350₫</div>
                        <div class="product-item__old-price">99000₫</div>
                        <div class="product-item__discount">-35%</div>
                      </div>
                      <div class="product-item__action">
                        <div class="viewDetail"></div>
                        <div class="addToCart"></div>
                        <div class="buyNow"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--* Pagination -->
              <div class="pagination">
                <div class="pagination__item">
                  <button class="button btnPrev">
                    <svg class="btn__icon" fill="" height="800px" width="800px" version="1.1" id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 500 500" xml:space="preserve">
                      <g>
                        <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                        c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
                      </g>
                    </svg>
                  </button>
                </div>
                <div class="pagination__item pagination__item--active">
                  <button class="button">1</button>
                </div>
                <div class="pagination__item">
                  <button class="button">2</button>
                </div>
                <div class="pagination__item">
                  <button class="button">3</button>
                </div>
                <div class="pagination__item">
                  <button class="button">4</button>
                </div>
                <div class="pagination__item" id="btnEllipsis">
                  <button class="button">...</button>
                </div>
                <div class="pagination__item">
                  <button class="button">10</button>
                </div>
                <div class="pagination__item">
                  <button class="button btnNext">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <jsp:include page="customer/footer1.jsp" />
    <script type="text/javascript">
    	changePage(1,8);
    	showTheLoai();
    </script>
</body>
</html>