<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="vi">

<head>
<jsp:include page="meta.jsp" />
<title>Đăng nhập</title>

<style type="text/css">
	.success-info {
		color: #20d55d;
	}
	.error-infro {
		color: red;
	}
</style>
</head>

<body>
	<jsp:include page="header.jsp" />

	<section class="section-content" style="margin: 100px 0;">
		<div class="card mx-auto" style="max-width: 380px">
			<div class="card-body">
				<c:if test="${not empty requestScope.thongBao}">
					<label class="success-info">${requestScope.thongBao}</label>
				</c:if>
				
				<c:if test="${not empty requestScope.loiDangNhap}">
					<label class="error-info">${requestScope.loiDangNhap}</label>
				</c:if>
				<h4 class="card-title mb-4">Đăng nhập</h4>
				<form action="${pageContext.request.contextPath}/khach-hang/dang-nhap"
					method="post">
					<div class="mb-3">
						<input name="email"
							class="form-control "
							placeholder="Nhập gmail" type="gmail" autocomplete="off"
							value="${requestScope.username}">	
					</div>
					<div class="mb-3">
						<input name="password"
							class="form-control"
							placeholder="Mật khẩu" type="password" autocomplete="off"
							value="${requestScope.password}">
					</div>
					<button type="submit" class="btn btn-primary w-100">Đăng
						nhập</button>
				</form>
			</div>
			<!-- card-body.// -->
		</div>
		<!-- card .// -->
		<p class="text-center mt-4">
			Không có tài khoản? <a
				href="${pageContext.request.contextPath}/signupView.jsp">Đăng ký</a>
		</p>
	</section>
	<!-- section-content.// -->

	<jsp:include page="footer.jsp" />
</body>

</html>
