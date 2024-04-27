<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Varela+Round&display=swap"
    rel="stylesheet">
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
	.success-info {
		color: #20d55d;
		font-size: 16px;
	}
	.error-infor {
		color: red;
		font-size: 16px;
	}
</style>
</head>
<body>
	<jsp:include page="header1.jsp" />
	<div class="signin-form">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="form-login">
            <div class="form__title">Đăng nhập</div>
            <form action="${pageContext.request.contextPath}/khach-hang/dang-nhap" method="post" target="_self">
            	<c:if test="${not empty requestScope.thongBao}">
					<label class="success-info">${requestScope.thongBao}</label>
				</c:if>
				
				<c:if test="${not empty requestScope.loiDangNhap}">
					<label class="error-infor">${requestScope.loiDangNhap}</label>
				</c:if>
              <div class="form__input-field">
                <input class="" type="email" name="email" placeholder="Enter your email" required autofocus>
                <i class="uil uil-envelope icon"></i>
              </div>
              <div class="form__input-alert">
                <div class="form__input-alert-icon"></div>
              </div>
              <div class="form__input-field">
                <input name="password" type="password" class="password" placeholder="Enter your password" required>
                <i class="uil uil-lock icon"></i>
                <i class="uil uil-eye-slash showHidePw"></i>
              </div>
              <div class="form__password-alert">
                <div class="form__password-alert-icon"></div>
              </div>
              <div class="buttonWrap">
                <button class="button btnSignIn" type="submit">Đăng nhập</button>
              </div>
            </form>
            <div class="form__forgot-password">
              <a href="#" class="text">Quên mật khẩu</a>
            </div>
            <div class="login-signup">
              <span class="text">Bạn chưa có tài khoản?
                <a style="color: #0396ff;" href="#" class="text signup-link">Đăng ký ngay</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="signin.js"></script>
</body>
<jsp:include page="footer1.jsp" />
</html>