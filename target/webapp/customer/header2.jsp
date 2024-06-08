<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <link rel="stylesheet" type="text/css" href="../css/base.css">
 <link rel="stylesheet" type="text/css" href="../css/style1.css">
 <link rel="stylesheet" type="text/css" href="../css/normalize.css">
<script src="../js/signin.js"></script>
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <script src="../js/main.js"></script>
<header class="header">
      <div class="header-inner">
        <div class="container">
          <div class="row">
            <!-- * Logo -->
            <div class="col-lg-3">
              <div class="header-logo">
                <a class="header-logo__link" href="${pageContext.request.contextPath}/home">
                  <img class="header-logo__img" src="../image/logo.png" alt="logo">
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
                        <a href="#">Những đứa trẻ ở đại dương đen</a>
                      </li>
                      <li class="header-search-bar__history-item">
                        <a href="#">Cây cam ngọt của tôi</a>
                      </li>
                      <li class="header-search-bar__history-item">
                        <a href="#">Dữ Phượng Hành</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <button onclick="changePage(1,4,'search','id')" type="submit" aria-label="search" class="button header-search-bar__btn">
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
                  <!-- * End of Cart -->
                  <!-- * User -->
                  <li class="header-menu__item display-block">
                    <!-- ? Chưa đăng nhập, đăng ký -->
                    <c:if test="${empty sessionScope.khachHang}">
                    <div class="button__wrap">
                      <a class="button btnSignUp" href="${pageContext.request.contextPath}/customer/signup.jsp" ">Đăng ký</a>
                      <a role="button" class="button btnSignIn" href="${pageContext.request.contextPath}/customer/signin.jsp">Đăng nhập</a>
                    </div>
                    </c:if>
                    <!-- ? Đã đăng nhập -->
                    <c:if test="${not empty sessionScope.khachHang}">
                    <div class="header-menu__wrap display-block">
                      <svg id="header-user__icon" class="header-menu__icon display-block" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                          <circle cx="12" cy="9" r="3" stroke-width="2.1px" />
                          <circle cx="12" cy="12" r="10" stroke-width="2.1px" />
                          <path
                            d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                            stroke-width="2.1px" stroke-linecap="round" />
                        </g>
                      </svg>
                      <div class="header-user__avatar hidden">
                        <img src="" alt="">
                      </div>
                      <div class="header-user__wrap">
                        <div class="header-user__list">
                          <a href="${pageContext.request.contextPath}/customer/useraccount.jsp?info" id="header-user__info" class="header-user__option">
                            <div class="header-user__title">Thông tin tài khoản</div>
                          </a>
                          <a href="${pageContext.request.contextPath}/customer/useraccount.jsp?order" id="header-user__order" class="header-user__option">
                            <div class="header-user__title">Đơn hàng của tôi</div>
                          </a>
                          <a href="${pageContext.request.contextPath}/customer/useraccount.jsp?review" id="header-user__order" class="header-user__option">
                            <div class="header-user__title">Quản lí đánh giá</div>
                          </a>
                          <a onclick="showLogout()" id="header-user__logout" class="header-user__option">
                            <div class="header-user__title">Đăng xuất</div>
                          </a>
                        </div>
                      </div>
                    </div>
                    	
                    </c:if>
                  </li>
                  <!-- * End of User -->
                </ul>
              </div>
            </div>
            <!-- *End of Menu -->
          </div>
        </div>
      </div>

      <script>
        function logout() {
          document.querySelector('#logout__action-confirm').click();
        }

      </script>
    </header>