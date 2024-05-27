<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
	integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
	crossorigin="anonymous"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
	integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz"
	crossorigin="anonymous"></script>
<body>
<%
	String url = request.getScheme() + "://" + request.getServerName()+ ":" + request.getServerPort() + request.getContextPath();
	String maKhachHang = request.getAttribute("maKhachHang") +"";
	if(maKhachHang == null) maKhachHang = "";
	String baoLoi = (String) request.getAttribute("baoLoi");
	if(baoLoi == null) baoLoi = "";
%>
<style>
	.mt-32 {
		
		display: flex;
		justify-content: center;
		align-items:center;
		width:100%;
		height:100vh;
	}
	.red {
		color: red;
	}
</style>
<div class="container">
	<div class="mt-32">
	<form method="post" action="<%= url %>/khach-hang/xac-thuc" >
	  <input type="hidden" name="hanhDong" value="xac-thuc-so">
	  <span class="red"><%= baoLoi %></span>
	  <div class="mb-3">
	    <label for="maXacThuc" class="form-label">Nhập mã xác thực gửi đến email của bạn</label>
	    <input name="maXacThuc" type="number" class="form-control" id="maXacThuc" aria-describedby="emailHelp" required="required">
	    <input name="maKhachHang" type="hidden" class="form-control" id="maKhachHang" aria-describedby="emailHelp" value="<%= maKhachHang %>">
	  </div>
	  <button type="submit" class="btn btn-primary">Xác thực</button>
	</form>
	</div>
</div>



</body>
</html>