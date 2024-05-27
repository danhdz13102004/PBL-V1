<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
  <link rel="stylesheet" href="../css/forgotpassword.css">
 <script type="module" src="../js/forgotpassword.js"></script>
</head>
<body>
	<jsp:include page="header1.jsp" />
	<div class="user-forgot-password-form">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-forgot-password">
              <div class="form__title">Lấy lại tài khoản</div>
              <form action="${pageContext.request.contextPath}/khach-hang/reset-password" method="post" target="_self" class="form" id="form">
                <!-- ? Email -->
                <div class="form-field ">
                  <input class="form__input" id="form__input-email" type="email" name="email" required autofocus
                    placeholder=" " >
                  <label for="form__input-email" class="form__label">Email của bạn</label>
                  <c:if test="${not empty requestScope.loiEmail}">
	                  <div class="form__alert">
	                    <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	                      <path
	                        d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
	                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	                      <circle cx="12" cy="16.5" r="1" fill="#000000" />
	                    </svg>
	                    <div class="form__alert-message">${requestScope.loiEmail}</div>
	                  </div>
                  </c:if>
	                </div>    
                <!-- ? OTP -->
                <div class="form-field">
                  <input class="form__input" id="form__input-otp" type="number" name="otpCode" required placeholder=" ">
                  <label for="form__input-otp" class="form__label">Nhập mã xác nhận OTP</label>
                  <c:if test="${not empty requestScope.loiOTP}">
	                  <div class="form__alert">
	                    <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	                      <path
	                        d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
	                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	                      <circle cx="12" cy="16.5" r="1" fill="#000000" />
	                    </svg>
	                    <div class="form__alert-message">${requestScope.loiOTP}</div>
	                  </div>
                  </c:if>
                  <button class="button" id="btnSendOTPCodeToEmail">Gửi mã OTP</button>
                </div>
                <!-- ? Password -->
                <div class="form-field">
                  <input class="form__input" id="form__input-password" type="password" name="password" required
                    placeholder=" ">
                  <label for="form__input-password" class="form__label">Nhập mật khẩu</label>
                  <c:if test="${not empty requestScope.loiPass}">
	                  <div class="form__alert">
	                    <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	                      <path
	                        d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
	                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	                      <circle cx="12" cy="16.5" r="1" fill="#000000" />
	                    </svg>
	                    <div class="form__alert-message">${requestScope.loiPass}</div>
	                  </div>
                  </c:if>
                  <div class="form__eye">
                    <svg id="form__eye-hide-password" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path
                        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg id="form__eye-show-password" class="hidden" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
                <!-- ? Confirm Password -->
                <div class="form-field">
                  <input class="form__input" id="form__input-confirm-password" type="password" name="confirmPassword"
                    required placeholder=" ">
                  <label for="form__input-confirm-password" class="form__label">Nhập lại mật khẩu</label>
                  <div class="form__eye">
                    <svg id="form__eye-hide-password" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path
                        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg id="form__eye-show-password" class="hidden" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
                <!-- ? Button Login -->
                <div class="button__wrap">
                  <button class="button" id="btnReturnLoginPage">Quay lại</button>
                  <button class="button" id="btnSubmitVerify" type="submit">Xác nhận</button>
                </div>
                <div class="form__note">Lưu ý: Hãy chắc chắn rằng tài khoản email của bạn đã được lập. Nếu bạn không
                  nhận được
                  mã OTP, hãy ấn gửi lại mã OTP hoặc kiểm tra hòm thư rác.</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
	<jsp:include page="footer1.jsp" />
</body>
</html>