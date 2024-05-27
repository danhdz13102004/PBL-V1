<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
 <link rel="stylesheet" type="text/css" href="../css/base.css">
 <link rel="stylesheet" type="text/css" href="../css/style1.css">
 <link rel="stylesheet" type="text/css" href="../css/normalize.css">
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <script src="../js/main.js"></script>
 <script src="../js/login_signup.js"></script>
  <script src="../js/forgotpassword.js"></script>
</head>
<body>
	<header class="header">
    <div class="header-inner">
      <div class="container">
        <div class="row">
          <!-- * Logo -->
          <div class="col-lg-3">
            <div class="header-logo">
              <a class="header-logo__link" href="index.html">
                <img class="header-logo__img" src="assets/image/logo.png" alt="logo">
                <div class="header-logo__name">
                  <h2 class="header-logo__name-main">PDM</h2>
                  <h4 class="header-logo__name-sub">Bookstore</h4>
                </div>
              </a>
            </div>
          </div>
          <!-- * End of Logo -->
          <!-- * Search bar -->
          <div class="col-lg-5">
            <div class="header-search-bar">
              <div class="header-search-bar__input">
                <input type="search" name="query" value="" class="header-search-bar__input-field"
                  placeholder="Bạn cần tìm gì hôm nay" autocomplete="off">
                <!-- * Search history -->
                <div class="header-search-bar__history">
                  <h3 class="header-search-bar__history-heading">Lịch sử tìm kiếm</h3>
                  <ul class="header-search-bar__history-list">
                    <li class="header-search-bar__history-item">
                      <a href="#">Cây cam ngọt của tôi</a>
                    </li>
                  </ul>
                </div>
              </div>
              <button type="submit" aria-label="search" class="button header-search-bar__btn">
                <svg class="header-search-bar__btn-icon" width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                    stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <!-- * End of Search bar -->
          <!-- * Menu -->
          <div class="col-lg-4">
            <div class="header-menu">
              <ul class="header-menu__list">
                <!-- * Cart -->
                <li class="header-menu__item display-block" id="cart">
                  <div class="header-menu__wrap display-block">
                    <svg id="header-cart__icon" class="header-menu__icon display-block" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.7351 14.0181C8.91085 13.6985 9.24662 13.5 9.61132 13.5H16.47C17.22 13.5 17.88 13.09 18.22 12.47L21.6008 6.33041C21.7106 6.13097 21.7448 5.91025 21.7129 5.70131C21.8904 5.52082 22 5.27321 22 5C22 4.44772 21.5523 4 21 4H6C5.96703 4 5.93443 4.0016 5.90228 4.00471L5.7317 3.64435C5.40095 2.94557 4.69708 2.5 3.92398 2.5H2.92004C2.36776 2.5 1.92004 2.94772 1.92004 3.5C1.92004 4.05228 2.36776 4.5 2.92004 4.5H3.14518C3.6184 4.5 4.04931 4.77254 4.25211 5.20011L7.08022 11.1627C7.35632 11.7448 7.33509 12.4243 7.02318 12.988L6.17004 14.53C5.44004 15.87 6.40004 17.5 7.92004 17.5H18.92C19.4723 17.5 19.92 17.0523 19.92 16.5C19.92 15.9477 19.4723 15.5 18.92 15.5H9.61131C8.85071 15.5 8.36855 14.6845 8.7351 14.0181ZM17.0408 10.4677L19.5108 6H6.84671L8.90839 10.3557C9.23914 11.0544 9.94301 11.5 10.7161 11.5H15.2905C16.0183 11.5 16.6886 11.1046 17.0408 10.4677Z"
                        fill="#000000" />
                      <path
                        d="M7.92005 18.5C6.82005 18.5 5.93005 19.4 5.93005 20.5C5.93005 21.6 6.82005 22.5 7.92005 22.5C9.02005 22.5 9.92005 21.6 9.92005 20.5C9.92005 19.4 9.02005 18.5 7.92005 18.5Z"
                        fill="#000000" />
                      <path
                        d="M17.9201 18.5C16.8201 18.5 15.9301 19.4 15.9301 20.5C15.9301 21.6 16.8201 22.5 17.9201 22.5C19.0201 22.5 19.9201 21.6 19.9201 20.5C19.9201 19.4 19.0201 18.5 17.9201 18.5Z"
                        fill="#000000" />
                    </svg>
                    <div class="header-cart__notice">10</div>
                    <div class="header-cart__wrap">
                      <!--? Chưa có hàng -->
                      <div class="header-cart__list--empty">
                        <img src="assets/image/cart-empty-img.png" alt="empty-cart" class="empty-cart__image">
                        <div class="header-cart__message">Chưa có sản phẩm trong giỏ hàng của
                          bạn</div>
                      </div>
                      <!--? Giỏ hàng có sách -->
                      <div class="header-cart__list">
                        <h4 class="header-cart__heading">Sách đã thêm</h4>
                        <ul class="header-cart__table">
                          <li class="header-cart__item">
                            <img src="assets/data/Mot_thoang_ta_ruc_ro_o_nhan_gian.jpg" alt=""
                              class="header-cart__item-image">
                            <div class="header-cart__item-info">
                              <div class="header-cart__item-name">Một Thoáng Ta Rực Rỡ Ở
                                Nhân Gian Một Thoáng Ta Rực
                                Rỡ Ở Nhân Gian Một Thoáng Ta Rực Rỡ Ở Nhân Gian</div>
                              <div class="header-cart__item-amount">
                                <div class="header-cart__item-price">999.400₫</div>
                                <div class="header-cart__item-multiply">x</div>
                                <div class="header-cart__item-quantity">2</div>
                              </div>
                            </div>
                          </li> 
                        </ul>
                        <div class="header-cart__footer">
                          <div class="header-cart__total">
                            <div class="header-cart__total-title">Tổng tiền</div>
                            <div class="header-cart__total-amount">1.000.000 ₫</div>
                          </div>
                          <button class="button" id="btnViewCartDetail">Xem giỏ hàng</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- * End of Cart -->
                <!-- * User -->
                <li class="header-menu__item display-block">
                  <!-- ? Chưa đăng nhập, đăng ký -->
                  <div class="button__wrap">
                    <a class="button" id="btnSignup" href="signup.html" target="_self">Đăng ký</a>
                    <a class="button" id="btnLogin" href="login.html" target="_self">Đăng nhập</a>
                  </div>
                  <!-- ? Đã đăng nhập -->
                  <div class="header-menu__wrap display-block">
                    <svg id="header-user__icon" class="header-menu__icon display-block" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <circle cx="12" cy="9" r="3" stroke-width="2.1px" />
                        <circle cx="12" cy="12" r="10" stroke-width="2.1px" />
                        <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                          stroke-width="2.1px" stroke-linecap="round" />
                      </g>
                    </svg>
                    <div class="header-user__avatar hidden">
                      <img src="" alt="">
                    </div>
                    <div class="header-user__name">Lê Võ Nhật Minh</div>
                    <div class="header-user__wrap">
                      <div class="header-user__list">
                        <div id="header-user__info" class="header-user__option">
                          <div class="header-user__title">Thông tin tài khoản</div>
                        </div>
                        <div id="header-user__order" class="header-user__option">
                          <div class="header-user__title">Đơn hàng của tôi</div>
                        </div>
                        <div id="header-user__logout" class="header-user__option">
                          <div class="header-user__title">Đăng xuất</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- * End of User -->
              </ul>
            </div>
          </div>
          <!-- *End of Menu -->
        </div>
      </div>
    </div>
  </header>
</body>
</html>