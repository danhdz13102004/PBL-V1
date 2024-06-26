<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- Thêm thư viện Toastr CSS và JS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tài khoản của tôi</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Varela+Round&display=swap"
    rel="stylesheet">
  <link rel="shortcut icon" href="assets/image/logo.ico" type="image/x-icon">
  <link rel="stylesheet" href="../css/normalize.css">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/useraccount.css">
  <script type="module" src="../js/validator.js" defer></script>
  <script type="module" src="../js/useraccount.js" defer>
</script>
 
  <script type="module" src="../js/loadorder.js" defer></script>
  <style type="text/css">
  	.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: none; /* Ẩn thông báo ban đầu */
}

.notification button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
}

.error-infor {
		color: red;
		font-size: 16px;
	}
  </style>
  
  
  
</head>

<body>
  <div class="webapp">
  <div id="notification" class="notification">
  <span id="notificationMessage">Cập nhật thành công!</span>
  <button id="closeBtn" onclick="closeNotification()">X</button>
</div>
    <!-- * Header -->
   <jsp:include page="header1.jsp" />
    <!-- * User Account management -->
    <main class="main-user-account" id="main-user-account">
      <div class="container">																		
        <div class="row">
          <div class="col-lg-3">
            <div class="account-sidebar-function">
              <div class="account-sidebar__title">
                <h1 class="account-sidebar__title-content">
                  Tài khoản
                </h1>
              </div>
              <ul class="account-sidebar__menu">
                <li class="account-sidebar__option" id="account-info">
                  <div class="account-sidebar__main-option">
                    <div class="account-sidebar__option-wrap">
                      <svg class="account-sidebar__option-icon" stroke="currentColor" fill="currentColor"
                        stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
                        </path>
                      </svg>
                      <div class="account-sidebar__link-to-function">
                        <span>Thông tin tài khoản</span>
                      </div>
                    </div>
                    <svg class="account-sidebar__option-icon account-sidebar__dropdown-icon" viewBox="0 0 24 24"
                      fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
                          fill="#0F0F0F" />
                      </g>
                    </svg>
                  </div>
                  <div class="account-sidebar__sub-option">
                    <ul class="sub-list">
                      <li class="sub-option" id="account-changing-password">
                        <div class="sub-option__content">
                          Đổi mật khẩu
                        </div>
                      </li>
                      <li style="display: none;" class="sub-option" id="account-other-settings">
                        <div class="sub-option__content">
                          Thiết lập khác
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="account-sidebar__option" id="account-order">
                  <div class="account-sidebar__main-option">
                    <div class="account-sidebar__option-wrap">
                      <svg class="account-sidebar__option-icon" stroke="currentColor" fill="currentColor"
                        stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z">
                        </path>
                      </svg>
                      <div class="account-sidebar__link-to-function">
                        <span>Đơn hàng của tôi</span>
                      </div>
                    </div>
                    <svg class="account-sidebar__option-icon account-sidebar__dropdown-icon" viewBox="0 0 24 24"
                      fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
                          fill="#0F0F0F" />
                      </g>
                    </svg>
                  </div>
                  <div class="account-sidebar__sub-option">
                    <ul class="sub-list">
                      <li class="sub-option" id="complete-order-option">
                        <div class="sub-option__content">
                          Đơn hàng đã giao
                        </div>
                      </li>
                      <li class="sub-option" id="delivering-order-option">
                        <div class="sub-option__content">
                          Đơn hàng đang giao
                        </div>
                      </li>
                      <li class="sub-option" id="awaiting-order-option">
                        <div class="sub-option__content">
                          Đơn hàng chờ duyệt
                        </div>
                      </li>
                      <li class="sub-option" id="cancelled-order-option">
                        <div class="sub-option__content">
                          Đơn hàng đã hủy
                        </div>
                      </li>
                      <li class="sub-option" id="returned-order-option">
                        <div class="sub-option__content">
                          Đơn hàng hoàn trả
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="account-sidebar__option" id="account-review">
                  <div class="account-sidebar__main-option">
                    <div class="account-sidebar__option-wrap">
                      <img class="account-sidebar__option-icon"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACZ0lEQVR4nO1Yv6viQBCe+BMDoqgnWqiIYGFrI2pjd4/rbe1s7e0ttfIP0D5/wlkpnGClzYGKP56vSaMoWlnMMQs5UHmXxKgvy+WDgbg7O/m+zc7srgAWLFiwYMHCJX4AwAcAoMlsAwBvoAEbE5DFT+xdiwA0uaniqwmiJQAeMFOCIKDP52NGz9x9AY/Hg61WC5vNJnvmSoAgCBiPx3G73eJut8NEIvHIr6AKwy9xu91Yr9dRAT1TGzcCgsEgzmazvwIWiwWGQiE+BDidTqxUKngNaqM+0whwOBxsWYiiiF6vF/1+P5vlVCqFw+HwRgC1UR/5kC+NEUWRxaBYLxVgt9uxWCxiu91GSZJwMBjgdDrF4/GIajidTsyXxkiSxGIUCgUW8+UCZFlGo5BlmcV6qQAyl8uF2WwW5/P53eTX6zXmcjm9FeoxApQ8SKfTOBqNdJMfj8eYyWTuSezHCVCWUywWw16vp5l8v9/HZDKpN3mfI0AREYlELmr/ZyAf8tWx5vHpAsioPO73e1UBh8MBw+HwveTxKQJsNhurJFpBZZPGgFkEUCLWarUboufzmdk1yNfArqwK3UHpuNztdi9I0kZVKpUwn8/fJHin0zFyxFaF7qB0aZlMJozccrnEarXKjgtUZShZqb9cLrMdWCmh1AZmEUAJTJtSo9HAaDTKNrlrH2qjPvJZrVZGTqeq0B2UdtJAIMCWxb8uLtRHPuRr4H6gCjS5qeKrCeJ/L2BjgllGI38tvplUxDsAfIcHQstLfwNABEwK5Jk88E4eeCcPvJMH3skD7+SBd/KEnwDwCwC+sV8W4C78AZLItl6vSeBBAAAAAElFTkSuQmCC">
                      <div class="account-sidebar__link-to-function">
                        <span>Đánh giá sản phẩm</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="account-sidebar__main-option" id="account-logout">
                  <div class="account-sidebar__option-wrap">
                    <svg class="account-sidebar__option-icon" fill="#000000" viewBox="0 0 24 24" id="sign-out-2"
                      data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line">
                      <polyline id="primary" points="18 9 21 12 18 15"
                        style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                      </polyline>
                      <line id="primary-2" data-name="primary" x1="21" y1="12" x2="7" y2="12"
                        style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                      </line>
                      <path id="primary-3" data-name="primary"
                        d="M14,16v3a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V5A1,1,0,0,1,4,4h9a1,1,0,0,1,1,1V8"
                        style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                      </path>
                    </svg>
                    <div class="account-sidebar__link-to-function">
                      <span>Đăng xuất</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="account-function__content account-management" id="account-information-management">
              <div class="account-function__title">Thông tin tài khoản</div>
              <form class="account-form-info" action="" method="" id="account-form-info">
                <!--* Full name -->
                <div class="form-field">
                  <label for="form__input-fullname" class="form__label">Họ và tên</label>
                  <input class="form__input" id="form__input-fullname" type="text" name="fullname" placeholder=" "
                    autocomplete="" value="${sessionScope.khachHang.ten}">
                  
                </div>
                <!--* Email -->
                <div class="form-field">
                  <label for="form__input-email" class="form__label">Email</label>
                  <input class="form__input" id="form__input-email" type="email" name="email" placeholder=" "
                    autocomplete="" value="${sessionScope.khachHang.email}" readonly>
                  
                </div>
                <!--* Phone number  -->
                <div class="form-field">
                  <label for="form__input-phone-number" class="form__label">Số điện thoại</label>
                  <input class="form__input" id="form__input-phone-number" type="tel" name="phonenumber" placeholder=" "
                    autocomplete="" value="${sessionScope.khachHang.SDT}">
                  
                </div>
                <button onclick="updateInfor()" class="button" id="btnSaveUserInfo">Lưu thay đổi</button>
              </form>
              <form class="account-form-info" action="${pageContext.request.contextPath}/khach-hang/change-password" method="post" id="account-form-changing-password">
                <!-- ? Email -->
                 <div class="form-field ">
                  <label for="form__input-email" class="form__label">Email của bạn</label>
                  <input class="form__input my-email" id="form__input-email" type="email" name="email" autofocus placeholder=" "
                    value="${sessionScope.khachHang.email}">
                  <!-- <div class="form__alert">
                    <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="12" cy="16.5" r="1" fill="#000000" />
                    </svg>
                    <div class="form__alert-message">Email chưa được đăng ký hoặc không tồn tại</div>
                  </div> -->
                </div> 
                <!-- ? OTP -->
                <div class="form-field">
                  <label for="form__input-otp" class="form__label">Nhập mã xác nhận OTP</label>
                  <input class="form__input" id="form__input-otp" type="number" name="otpCode" placeholder=" ">
                    <c:if test="${not empty requestScope.loiOTP}">
	                  <div class="form__alert">
	                    <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	                      <path
	                        d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
	                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	                      <circle cx="12" cy="16.5" r="1" fill="#000000" />
	                    </svg>
	                    <div class="form__alert-message">Mã xác nhận không hợp lệ</div>
	                  </div>
					</c:if>
					
					<c:if test="${not empty requestScope.loiDangNhap}">
					<label class="error-infor">${requestScope.loiDangNhap}</label>
					</c:if>
                  <button class="button" id="btnSendOTPCodeToEmail">Gửi mã OTP</button>
                </div>
                <!-- ? Current Password -->
                <div class="form-field">
                  <label for="form__input-password" class="form__label">Nhập mật khẩu hiện tại</label>
                  <input class="form__input" id="form__input-password" type="password" name="oldpass" placeholder=" ">
                    <c:if test="${not empty requestScope.loiOldPass}">
	                  <div class="form__alert">
	                    <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	                      <path
	                        d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
	                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	                      <circle cx="12" cy="16.5" r="1" fill="#000000" />
	                    </svg>
	                    <div class="form__alert-message">Mật khẩu không chính xác</div>
	                  </div>
					</c:if>
                  <div class="form__eye">
                    <svg class="form__eye-hide-password" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path
                        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg class="form__eye-show-password hidden" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
                <!-- ? Password -->
                <div class="form-field">
                  <label for="form__input-password" class="form__label">Nhập mật khẩu mới</label>
                  <input class="form__input" id="form__input-password" type="password" name="password" placeholder=" ">
                    <c:if test="${not empty requestScope.loiPass}">
	                  <div class="form__alert">
	                    <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	                      <path
	                        d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
	                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	                      <circle cx="12" cy="16.5" r="1" fill="#000000" />
	                    </svg>
	                    <div class="form__alert-message">Mật khẩu không khớp</div>
	                  </div>
                    	
					</c:if>
                  <div class="form__eye">
                    <svg class="form__eye-hide-password" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path
                        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg class="form__eye-show-password hidden" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
                <!-- ? Confirm Password -->
                <div class="form-field">
                  <label for="form__input-confirm-password" class="form__label">Nhập lại mật khẩu mới</label>
                  <input class="form__input" id="form__input-confirm-password" type="password" name="confirmPassword"
                    placeholder=" ">
           
                  <div class="form__eye">
                    <svg class="form__eye-hide-password" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path
                        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg class="form__eye-show-password hidden" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
                <!-- ? Button SubmitChanging -->
                <div class="button__wrap">
                  <button class="button" id="btnSubmitChangingPassword" type="submit">Xác nhận</button>
                </div>
                <div class="form__note">Lưu ý: Nếu bạn không nhận được
                  mã OTP, hãy ấn gửi lại mã OTP hoặc kiểm tra hòm thư rác.
                </div>
              </form>
              <form class="account-form-info" action="" method="" id="account-form-other-settings">
                <div class="heading">
                  <h3 class="heading__title">Xóa tài khoản</h3>
                </div>
                <div class="account-form-info__wrap" id="deleting-account-form">
                  <!-- ? Email -->
                  <div class="form-field ">
                    <label for="form__input-email" class="form__label">Email của bạn</label>
                    <input class="form__input" id="form__input-email" type="email" name="email" autofocus
                      placeholder=" " value="puckluvperfume@gmail.com">
                    <div class="form__alert">
                      <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="12" cy="16.5" r="1" fill="#000000" />
                      </svg>
                      <div class="form__alert-message">Email chưa được đăng ký hoặc không tồn tại</div>
                    </div>
                  </div>
                  <!-- ? OTP -->
                  <div class="form-field">
                    <label for="form__input-otp" class="form__label">Nhập mã xác nhận OTP</label>
                    <input class="form__input" id="form__input-otp" type="number" name="otpCode" placeholder=" ">
                    <div class="form__alert">
                      <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="12" cy="16.5" r="1" fill="#000000" />
                      </svg>
                      <div class="form__alert-message">Mã xác nhận không khớp</div>
                    </div>
                    <button class="button" id="btnSendOTPCodeToEmail">Gửi mã OTP</button>
                  </div>
                  <!-- ? Button SubmitDeleteAccount -->
                  <div class="button__wrap">
                    <button class="button" id="btnSubmitDeleteAccount">Xác nhận</button>
                  </div>
                  <div class="form__note">Lưu ý: Nếu bạn không nhận được
                    mã OTP, hãy ấn gửi lại mã OTP hoặc kiểm tra hòm thư rác.
                  </div>
                  <div class="modal" id="modal__confirm-delete-account">
                    <div class="modal__overlay"></div>
                    <div class="modal__body">
                      <div class="modal__inner">
                        <div class="confirm-delete-account__container">
                          <div class="confirm-delete-account__head">
                            <svg class="modal__alert-icon confirm-delete-account__alert-icon" class="dialog-content__icon" viewBox="0 0 24 24"
                              fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V13.5C12.75 13.9142 12.4142 14.25 12 14.25C11.5858 14.25 11.25 13.9142 11.25 13.5V9C11.25 8.58579 11.5858 8.25 12 8.25Z">
                              </path>
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10.0052 4.45201C10.8464 2.83971 13.1536 2.83971 13.9948 4.45201L20.5203 16.9592C21.3019 18.4572 20.2151 20.25 18.5255 20.25H5.47447C3.78487 20.25 2.69811 18.4572 3.47966 16.9592L10.0052 4.45201ZM12.6649 5.14586C12.3845 4.60842 11.6154 4.60842 11.335 5.14586L4.80953 17.6531C4.54902 18.1524 4.91127 18.75 5.47447 18.75H18.5255C19.0887 18.75 19.4509 18.1524 19.1904 17.6531L12.6649 5.14586Z">
                              </path>
                              <path
                                d="M12 17.25C12.6213 17.25 13.125 16.7463 13.125 16.125C13.125 15.5037 12.6213 15 12 15C11.3787 15 10.875 15.5037 10.875 16.125C10.875 16.7463 11.3787 17.25 12 17.25Z">
                              </path>
                            </svg>
                            <div class="confirm-delete-account__title">Thông báo</div>
                          </div>
                          <div class="confirm-delete-account__content-wrap">
                            <div class="confirm-delete-account__content">Bạn có chắc chắn muốn xóa tài khoản?</div>
                          </div>
                        </div>
                        <div class="confirm-delete-account__action-wrap">
                          <button class="button" id="confirm-delete-account__action-cancel">Hủy</button>
                          <button class="button" id="confirm-delete-account__action-confirm">Xác nhận</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="account-function__content order-management" id="account-order-management">
              <div class="order-function__header">
                <div class="account-function__title">Đơn hàng của tôi</div>
                <div style="display: none;" class="order__search">
                  <input class="order__search-input" type="search" placeholder="Tìm kiếm đơn hàng">
                  <div class="order__search-select-wrap">
                    <select class="order__search-select">
                      <option value="id">Theo mã đơn hàng</option>
                      <option value="productName">Theo tên sản phẩm</option>
                      <option value="invoiceDate">Theo ngày tạo đơn hàng</option>
                    </select>
                  </div>
                  <button class="button btnSearchOrder" id="btnSearchOrder">
                    <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                        sketch:type="MSPage">
                        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -1139.000000)"
                          fill="#000000">
                          <path
                            d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
                            id="search" sketch:type="MSShapeGroup">
                          </path>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="order-list__empty-order">
                <div class="order-list__empty-order-img">
                  <img src="../image/order-empty-img.png" alt="donhangtrong">
                </div>
                <div class="order-list__empty-order-content">
                  Bạn chưa có đơn hàng nào.
                </div>
              </div>
              <div class="order-list__container" id="all-order">
                <div class="order-list__row order-list__header">
                  <div class="order-list__cell">Mã đơn hàng</div>
                  <div class="order-list__cell">Thời gian lập</div>
                  <div class="order-list__cell">Nguời nhận</div>
                  <div class="order-list__cell">Tổng tiền</div>
                  <div class="order-list__cell">Tình trạng đơn</div>
                  <div class="order-list__cell">Thao tác</div>
                </div>
                <div class="order-list__row order-list__body">
                  <!-- <div class="order-list__row">
                    <div class="order-list__cell order-id">103459307</div>
                    <div class="order-list__cell order-invoice-date">22:30, 24/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Từ chối hoàn trả</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div>
                  <div class="order-list__row">
                    <div class="order-list__cell order-id">103459306</div>
                    <div class="order-list__cell order-invoice-date">12:30, 22/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Đã hoàn trả</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div>
                  <div class="order-list__row">
                    <div class="order-list__cell order-id">103459305</div>
                    <div class="order-list__cell order-invoice-date">12:03, 22/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Đang hoàn trả</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div>
                  <div class="order-list__row">
                    <div class="order-list__cell order-id">103459304</div>
                    <div class="order-list__cell order-invoice-date">03:12, 22/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Đang xử lý</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div>
                  <div class="order-list__row">
                    <div class="order-list__cell order-id">103459303</div>
                    <div class="order-list__cell order-invoice-date">5:20, 21/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Giao hàng hoàn tất</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div>
                  <div class="order-list__row">
                    <div class="order-list__cell order-id">103459302</div>
                    <div class="order-list__cell order-invoice-date">5:21, 20/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Đang giao hàng</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div>
                  <div class="order-list__row">
                    <div class="order-list__cell order-id">103459301</div>
                    <div class="order-list__cell order-invoice-date">5:21, 20/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Đang chờ xác nhận</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div>
                  <div class="order-list__row">
                    <div class="order-list__cell order-id">103459300</div>
                    <div class="order-list__cell order-invoice-date">17:21, 05/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Đã hủy</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div> -->
                </div>
              </div>
              <div class="order-list__container" id="complete-order">
                <div class="order-list__row order-list__header">
                  <div class="order-list__cell">Mã đơn hàng</div>
                  <div class="order-list__cell">Thời gian lập</div>
                  <div class="order-list__cell">Nguời nhận</div>
                  <div class="order-list__cell">Tổng tiền</div>
                  <div class="order-list__cell">Tình trạng đơn</div>
                  <div class="order-list__cell">Thao tác</div>
                </div>
                <div class="order-list__row order-list__body">
                  <!-- <div class="order-list__row">
                    <div class="order-list__cell order-id">103459303</div>
                    <div class="order-list__cell order-invoice-date">5:20, 21/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Giao hàng hoàn tất</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div> -->
                </div>
              </div>
              <div class="order-list__container" id="delivering-order">
                <!-- <div class="order-list__row order-list__header">
                  <div class="order-list__cell">Mã đơn hàng</div>
                  <div class="order-list__cell">Thời gian lập</div>
                  <div class="order-list__cell">Nguời nhận</div>
                  <div class="order-list__cell">Tổng tiền</div>
                  <div class="order-list__cell">Tình trạng đơn</div>
                  <div class="order-list__cell">Thao tác</div>
                </div> -->
                <div class="order-list__row order-list__body">
                  <!-- <div class="order-list__row">
                    <div class="order-list__cell order-id">103459302</div>
                    <div class="order-list__cell order-invoice-date">5:21, 20/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Đang giao hàng</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div> -->
                </div>
              </div>
              <div class="order-list__container" id="awaiting-order">
                <div class="order-list__row order-list__header">
                  <div class="order-list__cell">Mã đơn hàng</div>
                  <div class="order-list__cell">Thời gian lập</div>
                  <div class="order-list__cell">Nguời nhận</div>
                  <div class="order-list__cell">Tổng tiền</div>
                  <div class="order-list__cell">Tình trạng đơn</div>
                  <div class="order-list__cell">Thao tác</div>
                </div>
                <div class="order-list__row order-list__body">
                  <!-- <div class="order-list__row">
                    <div class="order-list__cell order-id">103459300</div>
                    <div class="order-list__cell order-invoice-date">17:21, 05/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Đã hủy</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div> -->
                </div>
              </div>
              <div class="order-list__container" id="cancelled-order">
                <div class="order-list__row order-list__header">
                  <div class="order-list__cell">Mã đơn hàng</div>
                  <div class="order-list__cell">Thời gian lập</div>
                  <div class="order-list__cell">Nguời nhận</div>
                  <div class="order-list__cell">Tổng tiền</div>
                  <div class="order-list__cell">Tình trạng đơn</div>
                  <div class="order-list__cell">Thao tác</div>
                </div>
                <div class="order-list__row order-list__body">
                  <!-- <div class="order-list__row">
                    <div class="order-list__cell order-id">103459300</div>
                    <div class="order-list__cell order-invoice-date">17:21, 05/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Đã hủy</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div> -->
                </div>
              </div>
              <div class="order-list__container" id="returned-order">
                <div class="order-list__row order-list__header">
                  <div class="order-list__cell">Mã đơn hàng</div>
                  <div class="order-list__cell">Thời gian lập</div>
                  <div class="order-list__cell">Nguời nhận</div>
                  <div class="order-list__cell">Tổng tiền</div>
                  <div class="order-list__cell">Tình trạng đơn</div>
                  <div class="order-list__cell">Thao tác</div>
                </div>
                <div class="order-list__row order-list__body">
                  <!-- <div class="order-list__row">
                    <div class="order-list__cell order-id">103459300</div>
                    <div class="order-list__cell order-invoice-date">17:21, 05/05/2024</div>
                    <div class="order-list__cell order-fullname">Puck & Perfume</div>
                    <div class="order-list__cell order-total-amount">520.521đ</div>
                    <div class="order-list__cell order-status">Đã hủy</div>
                    <div class="order-list__cell order-view-detail">Xem chi tiết</div>
                  </div> -->
                </div>
              </div>
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
              <div class="modal" id="modal__view-order-detail">
                <div class="modal__overlay"></div>
                <div class="modal__body">
                  <div class="modal__inner">
                    <div class="order-detail">
                      <div class="order-detail__container">
                        <div class="order-product__list">
                          <div class="order-product__info">
                            <div class="order-product__img">
                              <div class="order-product__image"
                                style="background-image: url(assets/data/Khong_phai_soi_nhung_cung_dung_la_cuu.jpg);">
                              </div>
                            </div>
                            <div class="order-product__info-wrap">
                              <div class="order-product__name">
                                Không phải sói nhưng cũng đừng là cừu
                              </div>
                              <div class="order-product__quantity">
                                2 x
                              </div>
                              <div style="padding-left: 12px;" class="order-product__unitPrice">
                                100.000đ
                              </div>
                            </div>
                          </div>
                          <div class="order-product__info">
                            <div class="order-product__img">
                              <div class="order-product__image"
                                style="background-image: url(assets/data/Khong_phai_soi_nhung_cung_dung_la_cuu.jpg);">
                              </div>
                            </div>
                            <div class="order-product__info-wrap">
                              <div class="order-product__name">
                                Không phải sói nhưng cũng đừng là cừu
                              </div>
                              <div class="order-product__quantity">
                                2 x
                              </div>
                              <div class="order-product__unitPrice">
                                100.000đ
                              </div>
                            </div>
                          </div>
                          <div class="order-product__info">
                            <div class="order-product__img">
                              <div class="order-product__image"
                                style="background-image: url(assets/data/Khong_phai_soi_nhung_cung_dung_la_cuu.jpg);">
                              </div>
                            </div>
                            <div class="order-product__info-wrap">
                              <div class="order-product__name">
                                Không phải sói nhưng cũng đừng là cừu
                              </div>
                              <div class="order-product__quantity">
                                2 x
                              </div>
                              <div class="order-product__unitPrice">
                                100.000đ
                              </div>
                            </div>
                          </div>
                          <div class="order-product__info">
                            <div class="order-product__img">
                              <div class="order-product__image"
                                style="background-image: url(assets/data/Khong_phai_soi_nhung_cung_dung_la_cuu.jpg);">
                              </div>
                            </div>
                            <div class="order-product__info-wrap">
                              <div class="order-product__name">
                                Không phải sói nhưng cũng đừng là cừu
                              </div>
                              <div class="order-product__quantity">
                                2 x
                              </div>
                              <div class="order-product__unitPrice">
                                100.000đ
                              </div>
                            </div>
                          </div>
                          <div class="order-product__info">
                            <div class="order-product__img">
                              <div class="order-product__image"
                                style="background-image: url(assets/data/Khong_phai_soi_nhung_cung_dung_la_cuu.jpg);">
                              </div>
                            </div>
                            <div class="order-product__info-wrap">
                              <div class="order-product__name">
                                Không phải sói nhưng cũng đừng là cừu
                              </div>
                              <div class="order-product__quantity">
                                2 x
                              </div>
                              <div class="order-product__unitPrice">
                                100.000đ
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="order-payment__info">
                          <div class="order-info__wrap order-info__title">
                            <label class="order-info__label">Chi tiết đơn hàng</label>
                          </div>
                          <div class="order-info__wrap order-info__status">
                            <div class="order-info__content order-text-status">
                              Đơn hàng đang chờ xác nhận
                            </div>
                          </div>
                          <div class="order-info__wrap order-info__id">
                            <label class="order-info__label">Mã đơn hàng:</label>
                            <div class="order-info__content order-text-id">103459304</div>
                          </div>
                          <div class="order-info__wrap order-info__fullname">
                            <label class="order-info__label">Họ và tên người nhận:</label>
                            <div class="order-info__content order-text-name">Lê Võ Nhật Minh</div>
                          </div>
                          <div class="order-info__wrap order-info__phone-number">
                            <label class="order-info__label">Số điện thoại:</label>
                            <div class="order-info__content order-text-phone">0987654321</div>
                          </div>
                          <div class="order-info__wrap order-info__address">
                            <label class="order-info__label">Địa chỉ giao hàng:</label>
                            <div class="order-info__content order-text-address">K19/21 Ngô Sĩ Liên, Phường Hòa Minh, Quận Liên Chiểu, Đà
                              Nẵng
                            </div>
                          </div>
                          <div class="order-info__wrap order-info__invoice-date">
                            <label class="order-info__label">Thời gian lập đơn:</label>
                            <div class="order-info__content order-text-time">
                              5:21, 20/5/2024
                            </div>
                          </div>
                          <div class="order-info__wrap order-info__total-price">
                            <label class="order-info__label">Tổng tiền:</label>
                            <div class="order-info__content order-text-money">
                              1.000.000đ
                            </div>
                          </div>
                          <div class="order-info__wrap order-info__payment-method">
                            <label class="order-info__label">Phương thức thanh toán:</label>
                            <div class="order-info__content">
                              COD
                            </div>
                          </div>
                          <div class="order-info__wrap order-info__cancellation-reason">
                            <label class="order-info__label label-click">Xem lý do hủy đơn</label>
                            <div class="order-info__content label-detail"></div>
                          </div>
                          <div class="order-info__wrap order-button__wrap">
                            <button class="button btnCancelViewDetail" id="btnCancelViewDetail">Quay lại</button>
                            <!-- Tạo đơn => Đơn hàng đang chờ xác nhận, tại đây có thể hủy đơn -->
                            <!-- NVQL xác nhận => Trạng thái chờ xử lý (Đóng gói, thuê đơn vị vận chuyển,...) 
                                => Đang giao hàng hoặc NVQL có thể hủy đơn (Vì yếu tố bên ngoài) -->
                            <input type="hidden" class="inp-order-current">
                            <input type="hidden" class="inp-status-current">
                            <button class="button" id="btnCancelOrder">Hủy đơn hàng</button>
                            <button onclick="requestReturn()" class="button" id="btnRequestReturnOrder">Yêu cầu trả hàng</button>
                            <button class="button" id="btnConfirmReturnOrder">Trả hàng hoàn tất</button>
                            <!-- Giao hàng hoàn tất => Trạng thái đã giao hàng hoàn tất -->
                            <button onclick="completeOrder()" class="button" id="btnConfirmCompleteOrder">Giao hàng hoàn tất</button>
                            <!-- Mua lại -->
                            <button class="button" id="btnRebuyOrder">Mua lại</button>
                            <!-- <button class="button" id="btnAnnouceProcess"></button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal" id="modal__cancellation-reason">
                <div class="modal__overlay"></div>
                <div class="modal__body">
                  <div class="modal__inner">
                    <div class="modal__container">
                      <div class="modal__head">
                        <div class="modal__title">Lý do hủy đơn hàng</div>
                      </div>
                      <form class="modal__form-reason" action="" method="post">
                        <div class="form__select-wrap">
                          <select class="form__input-reason" name="reason" id="form__input-reason">
                          </select>
                        </div>
                        <div class="form__textarea-wrap hidden">
                          <label class="form__label-reason" for="form__textarea-reason">Nhập vào lý do khác</label>
                          <textarea class="form__input-reason form__textarea-reason" name="reason"
                            id="form__textarea-reason" placeholder="Nhập lý do khác của bạn" autofocus></textarea>
                        </div>
                        <div class="form__alert">
                          <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="12" cy="16.5" r="1" fill="#000000" />
                          </svg>
                          <div class="form__alert-message">Không được để trống</div>
                        </div>
                        <div class="form__button-wrap">
                          <button class="button" type="button" id="btnCloseReasonForm">Đóng lại</button>
                          <button onclick="cancelOrder()" class="button" type="button" id="btnSubmitReasonForm">Xác nhận</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="account-function__content review-management" id="account-review-management">
              <div class="review-function__header">
                <div class="account-function__title">Đánh giá sản phẩm</div>
              </div>
              <div class="review-list__empty-product">
                <div class="review-list__empty-product-img">
                  <img src="../image/order-empty-img.png" alt="donhangtrong">
                </div>
                <div class="review-list__empty-product-content">
                  Bạn chưa mua sản phẩm nào.
                </div>
              </div>
              <div class="review-list__container">
                <div class="review-list__row review-list__header">
                  <div class="review-list__cell">Mã sản phẩm</div>
                  <div class="review-list__cell">Tên sản phẩm</div>
                  <div class="review-list__cell">Đơn giá</div>
                  <div class="review-list__cell">Thời gian mua</div>
                  <div class="review-list__cell">Số sao trung bình</div>
                  <div class="review-list__cell">Số sao của bạn</div>
                  <div class="review-list__cell">Đánh giá</div>
                </div>
                <div class="review-list__row review-list__body">
                  <div class="review-list__row">
                    <div class="review-list__cell review-id">103459307</div>
                    <div class="review-list__cell review-name">Muôn kiếp nhân sinh</div>
                    <div class="review-list__cell review-unit-price">520.521đ</div>
                    <div class="review-list__cell review-invoice-date">22:30, 24/05/2024</div>
                    <div class="review-list__cell review-average-star">4.9</div>
                    <div class="review-list__cell review-my-star">4</div>
                    <div class="review-list__cell review-view-detail">Đánh giá</div>
                  </div>
                  <div class="review-list__row">
                    <div class="review-list__cell review-id">103459307</div>
                    <div class="review-list__cell review-name">Một thoáng ta rực rỡ ở nhân gian</div>
                    <div class="review-list__cell review-unit-price">520.521đ</div>
                    <div class="review-list__cell review-invoice-date">22:30, 24/05/2024</div>
                    <div class="review-list__cell review-average-star">4.6</div>
                    <div class="review-list__cell review-my-star">Chưa đánh giá</div>
                    <div class="review-list__cell review-view-detail">Đánh giá</div>
                  </div>
                </div>
              </div>
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
              <div class="modal" id="modal__feedback">
                <div class="modal__overlay"></div>
                <div class="modal__body">
                  <div class="modal__inner">
                    <div class="feedback-detail">
                      <div class="feedback-detail__container">
                        <div class="feedback-product">
                          <div class="feedback-product__info">
                            <div class="feedback-product__img">
                              <div class="feedback-product__image"
                                style="background-image: url(assets/data/Khong_phai_soi_nhung_cung_dung_la_cuu.jpg);">
                              </div>
                            </div>
                          </div>
                          <div class="feedback-product__info-wrap">
                            <div class="feedback-product__id">
                              Mã sách: #103459307
                            </div>
                            <div class="feedback-product__name">
                              Không phải sói nhưng cũng đừng là cừu
                            </div>
                          </div>
                        </div>
                        <div class="feedback__info">
                          <div class="feedback-info__body">
                            <div class="feedback-info__title">
                              Đánh giá sản phẩm
                            </div>
                            <div class="feedback-info__star">
                              <svg class="star-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                              </svg>
                              <svg class="star-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                              </svg>
                              <svg class="star-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                              </svg>
                              <svg class="star-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                              </svg>
                              <svg class="star-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                              </svg>
                            </div>
                            <textarea class="feedback-textarea" name="feedback" id="" cols="30" rows="10"
                              placeholder="Nhập đánh giá của bạn vào đây (Có thể để trống)"></textarea>
                          </div>
                          <div class="feedback-info__wrap feedback-button__wrap">
                            <div class="order-button__wrap">
                              <button class="button" id="btnCloseFeedbackForm">Trở lại</button>
                              <button class="button" id="btnSaveFeedbackForm">Lưu</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal" id="modal__account-logout">
              <div class="modal__overlay"></div>
              <div class="modal__body">
                <div class="modal__inner logout__inner">
                  <div class="logout__container">
                    <div class="logout__head">
                      <svg class="modal__alert-icon logout__alert-icon" class="dialog-content__icon" viewBox="0 0 24 24"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V13.5C12.75 13.9142 12.4142 14.25 12 14.25C11.5858 14.25 11.25 13.9142 11.25 13.5V9C11.25 8.58579 11.5858 8.25 12 8.25Z">
                        </path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M10.0052 4.45201C10.8464 2.83971 13.1536 2.83971 13.9948 4.45201L20.5203 16.9592C21.3019 18.4572 20.2151 20.25 18.5255 20.25H5.47447C3.78487 20.25 2.69811 18.4572 3.47966 16.9592L10.0052 4.45201ZM12.6649 5.14586C12.3845 4.60842 11.6154 4.60842 11.335 5.14586L4.80953 17.6531C4.54902 18.1524 4.91127 18.75 5.47447 18.75H18.5255C19.0887 18.75 19.4509 18.1524 19.1904 17.6531L12.6649 5.14586Z">
                        </path>
                        <path
                          d="M12 17.25C12.6213 17.25 13.125 16.7463 13.125 16.125C13.125 15.5037 12.6213 15 12 15C11.3787 15 10.875 15.5037 10.875 16.125C10.875 16.7463 11.3787 17.25 12 17.25Z">
                        </path>
                      </svg>
                      <div class="logout__title">Thông báo</div>
                    </div>
                    <div class="logout__content-wrap">
                      <div class="logout__content">Bạn có chắc chắn muốn đăng xuất?</div>
                    </div>
                  </div>
                  <div class="logout__action-wrap">
                    <button class="button" id="logout__action-cancel">Hủy</button>
                    <a href="${pageContext.request.contextPath}/khach-hang/dang-xuat" class="button" id="logout__action-confirm">Đăng xuất</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <jsp:include page="footer1.jsp" />
  </div>
  <script type="text/javascript">
  </script>
   <script  src="../js/useraccount_danh_gia.js"></script>
</body>
</html>