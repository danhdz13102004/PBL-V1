<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="vi">

<head>
<jsp:include page="meta.jsp" />
<title>Đăng ký</title>

<style type="text/css">
	.notify-label {
		color: red;
	}
</style>
</head>

<body>
	<jsp:include page="header.jsp" />

	<section class="section-content" style="margin: 100px 0;">
		<div class="card mx-auto" style="max-width: 380px">
			<div class="card-body">
				<c:if test="${not empty requestScope.successMessage}">
					<div class="alert alert-success" role="alert">${requestScope.successMessage}</div>
				</c:if>
				<c:if test="${not empty requestScope.errorMessage}">
					<div class="alert alert-danger" role="alert">${requestScope.errorMessage}</div>
				</c:if>
				<h4 class="card-title mb-4">Đăng ký</h4>
				<form action="${pageContext.request.contextPath}/khach-hang/dang-ki"
					method="post">
					<div class="mb-3">
						<label for="inputEmail" class="form-label">Email</label> <input
							type="email"
							class="form-control"
							id="inputEmail" name="email" 
							value="${not empty requestScope.email ? requestScope.email : ''}">
						<c:if test="${not empty requestScope.loiEmail}">
							<label class="notify-label"> <c:out value="${requestScope.loiEmail}" />
							 </label>
						</c:if>
					</div>
					<div class="mb-3">
						<label for="inputPassword" class="form-label">Mật khẩu</label> <input
							type="password"
							class="form-control"
							id="inputPassword" name="password"
							value="${not empty requestScope.password ? requestScope.password : ''}">
						<c:if
							test="${not empty requestScope.loiPass}">
							<label class="notify-label"> <c:out value="${requestScope.loiPass}" />
							 </label>
						</c:if>
					</div>
					<div class="mb-3">
						<label for="inputFullname" class="form-label">Họ và tên</label> <input
							type="text"
							class="form-control"
							id="inputFullname" name="fullname"
							value="${not empty requestScope.fullname ? requestScope.fullname : ''}">
					</div>
					<div class="mb-3">
						<label for="inputEmail" class="form-label">Số điện thoại</label> <input
							type="text"
							class="form-control"
							id="inputEmail" name="phonenumber" 
							value="${not empty requestScope.phonenumber ? requestScope.phonenumber : ''}">
						<c:if test="${not empty requestScope.phonenumber}">
							<label class="notify-label"> <c:out value="${requestScope.loiPhone}" />
							 </label>
						</c:if>
					</div>
					<button type="submit" class="btn btn-primary w-100">Đăng
						ký</button>
				</form>
			</div>
			<!-- card-body.// -->
		</div>
		<!-- card.// -->
		<p class="text-center mt-4">
			Đã có tài khoản? <a href="${pageContext.request.contextPath}/signin">Đăng
				nhập</a>
		</p>
	</section>
	<!-- section-content.// -->

	<jsp:include page="footer.jsp" />
</body>

</html>
