<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<fmt:setLocale value="vi_VN" />
<!DOCTYPE html>
<html lang="vi">

<head>
<jsp:include page="customer/meta.jsp" />
<title>Trang chủ</title>
</head>

<body>
	<jsp:include page="customer/header.jsp" />

	<section class="section-content mb-2 menu-all-category">
		<div class="container">
			<!-- <header class="section-heading py-4 d-flex justify-content-between">
				<h3 class="section-title">Danh mục sản phẩm</h3>
				<a class="btn btn-secondary" href="#" role="button"
					style="height: fit-content;">Xem tất cả</a>
			</header> -->
			<!-- section-heading.// -->
			<div class="row item-grid all-category">
				<%-- <c:forEach var="category" items="${requestScope.categories}">
					<div class="col-lg-3 col-md-6">
						<div class="card mb-4">
							<div class="card-body">
								<a
									href="${pageContext.request.contextPath}/category?id=${category.id}"
									class="stretched-link">
									<div class="d-flex align-items-center">
										<c:choose>
											<c:when test="${empty category.imageName}">
												<img width="50" height="50"
													src="${pageContext.request.contextPath}/img/50px.png"
													alt="50px.png">
											</c:when>
											<c:otherwise>
												<img width="50" height="50"
													src="${pageContext.request.contextPath}/image/${category.imageName}"
													alt="${category.imageName}">
											</c:otherwise>
										</c:choose>
										<span class="category-title ms-3">${category.name}</span>
									</div>
								</a>
							</div>
						</div>
					</div>
					<!-- col.// -->
				</c:forEach> --%>
				<div class="col-lg-3 col-md-6">
						<div class="card mb-4">
							<div class="card-body">
								<a style="text-decoration: none;"
									href="${pageContext.request.contextPath}/category?id=${category.id}"
									class="stretched-link">
									<div class="d-flex align-items-center">
												<img width="50" height="50"
													src="${pageContext.request.contextPath}/images/sach-giao-khoa.jpg";
													alt="50px.png">
										<span class="category-title ms-3">Sách giáo khoa</span>
									</div>
								</a>
							</div>
						</div>
					</div>
				<div class="col-lg-3 col-md-6">
						<div class="card mb-4">
							<div class="card-body">
								<a style="text-decoration: none;"
									href="${pageContext.request.contextPath}/category?id=${category.id}"
									class="stretched-link">
									<div class="d-flex align-items-center">
												<img width="50" height="50"
													src="${pageContext.request.contextPath}/images/sach-khoa-hoc.png"
													alt="50px.png">
										<span class="category-title ms-3">Sách khoa học</span>
									</div>
								</a>
							</div>
						</div>
					</div>
				<div class="col-lg-3 col-md-6">
						<div class="card mb-4">
							<div class="card-body">
								<a style="text-decoration: none;"
									href="${pageContext.request.contextPath}/category?id=${category.id}"
									class="stretched-link">
									<div class="d-flex align-items-center">
												<img width="50" height="50"
													src="${pageContext.request.contextPath}/images/truyen-tranh.png"
													alt="50px.png">
										<span class="category-title ms-3">Truyện tranh</span>
									</div>
								</a>
							</div>
						</div>
					</div>
				<div class="col-lg-3 col-md-6">
						<div class="card mb-4">
							<div class="card-body">
								<a style="text-decoration: none;"
									href="${pageContext.request.contextPath}/category?id=${category.id}"
									class="stretched-link">
									<div class="d-flex align-items-center">
												<img width="50" height="50"
													src="${pageContext.request.contextPath}/images/tieu-thuyet.png"
													alt="50px.png">
										<span class="category-title ms-3">Tiểu thuyết</span>
									</div>
								</a>
							</div>
						</div>
					</div>
					
				<div class="col-lg-3 col-md-6">
						<div class="card mb-4">
							<div class="card-body">
								<a style="text-decoration: none;"
									href="${pageContext.request.contextPath}/category?id=${category.id}"
									class="stretched-link">
									<div class="d-flex align-items-center">
												<img width="50" height="50"
													src="${pageContext.request.contextPath}/images/truyen-dai.png"
													alt="50px.png">
										<span class="category-title ms-3">Truyện dài</span>
									</div>
								</a>
							</div>
						</div>
					</div>
			
			
			<div class="col-lg-3 col-md-6">
						<div class="card mb-4">
							<div class="card-body">
								<a style="text-decoration: none;"
									href="${pageContext.request.contextPath}/category?id=${category.id}"
									class="stretched-link">
									<div class="d-flex align-items-center">
												<img width="50" height="50"
													src="${pageContext.request.contextPath}/images/sach-giao-trinh.png"
													alt="50px.png">
										<span class="category-title ms-3">Sách giáo trình</span>
									</div>
								</a>
							</div>
						</div>
					</div>
			<div class="col-lg-3 col-md-6">
						<div class="card mb-4">
							<div class="card-body">
								<a style="text-decoration: none;"
									href="${pageContext.request.contextPath}/category?id=${category.id}"
									class="stretched-link">
									<div class="d-flex align-items-center">
												<img width="50" height="50"
													src="${pageContext.request.contextPath}/images/bao-in.png"
													alt="50px.png">
										<span class="category-title ms-3">Báo in</span>
									</div>
								</a>
							</div>
						</div>
					</div>
			<div class="col-lg-3 col-md-6">
						<div class="card mb-4">
							<div class="card-body">
								<a style="text-decoration: none;"
									href="${pageContext.request.contextPath}/category?id=${category.id}"
									class="stretched-link">
									<div class="d-flex align-items-center">
												<img width="50" height="50"
													src="${pageContext.request.contextPath}/images/truyen-ngan.png"
													alt="50px.png">
										<span class="category-title ms-3">Truyện ngắn</span>
									</div>
								</a>
							</div>
						</div>
					</div>
			</div>
			</div>
			
			</div>
			</div>
			
		</div>
			<!-- row.// -->
		</div>
		<!-- container.// -->
	</section>
	<!-- section-content.// -->

	<section class="section-content mb-5">
		<div class="container">
			<header class="section-heading py-4 d-flex justify-content-between">
				<h3 class="section-title">Sản phẩm mới nhất</h3>
				<a class="btn btn-secondary" href="#" role="button"
					style="height: fit-content;">Xem tất cả</a>
			</header>
			<!-- section-heading.// -->
			<div class="row item-grid contain-newest">
				<c:set var="myList" value="${sessionScope.listNewest}" />
				<%-- <c:forEach items="${myList}" var="item">
					<div class="col-xl-3 col-lg-4 col-md-6">
						<div class="card p-3 mb-4">
							<a
								href="${pageContext.request.contextPath}/product?id=${item.id}"
								class="img-wrap text-center"> 
										<img width="200" height="200" class="img-fluid"
											src="${pageContext.request.contextPath}${item.urlImage}"
											alt="">
							</a>
							<div class="info-wrap mt-2">
								<a
									href="${pageContext.request.contextPath}/product?id=${item.id}"
									class="title">${item.ten} </a>
								<div>
											<span class="price mt-1 fw-bold"> <fmt:formatNumber type="currency" value="${item.giaBan}" />
											
											</span>
											<span class="ms-2 text-muted text-decoration-line-through">
												100.000₫
											</span>
											<span class="ms-2 badge bg-info"> 50%
											</span>
								</div>
							</div>
						</div>
					</div>
				</c:forEach> --%>

				
			
			</div>
			<!-- row.// -->
		</div>
		<!-- container.// -->
	</section>
	<!-- section-content.// -->

	<jsp:include page="customer/footer.jsp" />
</body>
<script type="text/javascript">
 	showNewestItem(); 
</script>
</html>
