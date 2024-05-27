<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
 <link rel="stylesheet" type="text/css" href="../css/login_signup.css">
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
	<div class="user-form" id="login">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <div class="form-login">
            <div class="form__title">Đăng nhập</div>
            <c:if test="${not empty requestScope.thongBao}">
					<label class="success-info">${requestScope.thongBao}</label>
				</c:if>
				
				<c:if test="${not empty requestScope.loiDangNhap}">
					<label class="error-infor">${requestScope.loiDangNhap}</label>
				</c:if>
				<br>
            <form action="${pageContext.request.contextPath}/khach-hang/dang-nhap" method="post" target="_self" class="form" id="form">
              <!-- ? Email -->
              <div class="form-field ">
                <input class="form__input" id="form__input-email" type="email" name="email" required autofocus
                  placeholder=" " autocomplete="on">
                <label for="form__input-email" class="form__label">Nhập email của bạn</label>
              </div>
              <!-- ? Password -->
              <div class="form-field">
                <input class="form__input" id="form__input-password" type="password" name="password" required
                  placeholder=" " autocomplete="current-password">
                <label for="form__input-password" class="form__label">Nhập mật khẩu</label>
                <div class="form__eye">
                  <svg onclick="showPass(this)" id="form__eye-hide-password" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                      stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                      stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <svg onclick="hiddenPass(this)" id="form__eye-show-password" class="hidden" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                      stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
              <!-- ? Button Login -->
              <button class="button" id="btnLogin" type="submit">ĐĂNG NHẬP</button>
            </form>
            <div class="form__forgot-password">
              <a href="${pageContext.request.contextPath}/customer/forgotpassword.jsp" class="form__forgot-password-text">Quên mật khẩu</a>
            </div>
            <div class="form__switch">
              <div class="form__switch-text">
                Bạn chưa có tài khoản?
              </div>
              <a href="signup.html" class="form__switch-link" target="_self">Đăng ký ngay!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="signin.js"></script>
</body>
<jsp:include page="footer1.jsp" />
<script type="module" src="../js/forgotpassword.js" defer></script>
</html>