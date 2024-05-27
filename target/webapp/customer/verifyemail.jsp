<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Xác thực email</title>
  <link rel="stylesheet" href="../css/verifyemail.css">
  <script type="module" src="../js/header.js"></script>
  <script type="module" src="../js/footer.js"></script>
  <script type="module" src="../js/forgotpassword.js"></script>
</head>
<body>
	<jsp:include page="header1.jsp" />
	<div class="user-verify-form">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-verify">
       
              <div class="form__title">Xác thực tài khoản</div>
              <c:if test="${not empty requestScope.baoLoi}">
	                  	<span style="font-size:16px; color: red; padding-bottom: 20px;">${requestScope.baoLoi}</span>
                </c:if>
              <form action="${pageContext.request.contextPath}/khach-hang/xac-thuc" method="post" target="_self" class="form" id="form">
                <!-- ? Email -->
                <div class="form-field ">
                  <input class="form__input" id="form__input-email" type="email" name="email" required autofocus
                    placeholder=" " readonly value="${requestScope.email != null ? requestScope.email : ''}">
                  <label for="form__input-email" class="form__label">Email của bạn</label>
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
                <!-- ? Button Login -->
                <div class="button__wrap">
                  <button class="button" id="btnReturnSignupPage">Quay lại</button>
                  <button class="button" id="btnSubmitVerify" type="submit">Xác nhận</button>
                </div>
                <div class="form__note">Lưu ý: Hãy chắc chắn rằng tài khoản email của bạn đã được lập. Nếu bạn không nhận được
                  mã OTP, hãy ấn gửi lại mã OTP hoặc kiểm tra hòm thư rác.</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
		// Đợi cho trang tải hoàn tất
		window.addEventListener('load', function() {
		    // Tìm nút bằng ID
		    var button = document.getElementById('btnSendOTPCodeToEmail');
		    // Kích hoạt sự kiện click trên nút
		    button.click();
		});
</script>
    <jsp:include page="footer1.jsp" />
</body>
</html>