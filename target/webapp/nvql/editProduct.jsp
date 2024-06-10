<%@page import="model.User"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">

<head>
<%
    User khachHang = (User) session.getAttribute("khachHang");
    String role = khachHang != null ? khachHang.getRole().name() : "";
%>
  <title>Chỉnh sửa sản phẩm | Quản trị Admin</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Main CSS-->
  <link rel="stylesheet" type="text/css" href="../css/quanli.css">
  <!-- Font-icon css-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <!-- or -->
  <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">
  <link rel="stylesheet" type="text/css"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <script type="text/javascript" src="/ckeditor/ckeditor.js"></script>
  <script src="http://code.jquery.com/jquery.min.js" type="text/javascript"></script>
  <script>
	
    function readURL(input, thumbimage) {
      if (input.files && input.files[0]) { //Sử dụng  cho Firefox - chrome
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#thumbimage").attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
      else { // Sử dụng cho IE
        $("#thumbimage").attr('src', input.value);
      }
      $("#thumbimage").show();
      $('.filename').text($("#uploadfile").val());
      $('.Choicefile').css('background', '#14142B');
      $('.Choicefile').css('cursor', 'default');
      $(".removeimg").show();
      $(".Choicefile").unbind('click');

    }
    $(document).ready(function () {
      $(".Choicefile").bind('click', function () {
        $("#uploadfile").click();

      });
      $(".removeimg").click(function () {
        $("#thumbimage").attr('src', '').hide();
        $("#myfileupload").html('<input type="file" id="uploadfile"  onchange="readURL(this);" />');
        $(".removeimg").hide();
        $(".Choicefile").bind('click', function () {
          $("#uploadfile").click();
        });
        $('.Choicefile').css('background', '#14142B');
        $('.Choicefile').css('cursor', 'pointer');
        $(".filename").text("");
      });
    })
  </script>
</head>

<body class="app sidebar-mini rtl">
  <style>
    .Choicefile {
      display: block;
      background: #14142B;
      border: 1px solid #fff;
      color: #fff;
      width: 150px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      padding: 5px 0px;
      border-radius: 5px;
      font-weight: 500;
      align-items: center;
      justify-content: center;
    }

    .Choicefile:hover {
      text-decoration: none;
      color: white;
    }

    #uploadfile,
    .removeimg {
      display: none;
    }

    #thumbbox {
      position: relative;
      width: 100%;
      margin-bottom: 20px;
    }

    .removeimg {
      height: 25px;
      position: absolute;
      background-repeat: no-repeat;
      top: 5px;
      left: 5px;
      background-size: 25px;
      width: 25px;
      /* border: 3px solid red; */
      border-radius: 50%;

    }

    .removeimg::before {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      content: '';
      border: 1px solid red;
      background: red;
      text-align: center;
      display: block;
      margin-top: 11px;
      transform: rotate(45deg);
    }

    .removeimg::after {
      /* color: #FFF; */
      /* background-color: #DC403B; */
      content: '';
      background: red;
      border: 1px solid red;
      text-align: center;
      display: block;
      transform: rotate(-45deg);
      margin-top: -2px;
    }
  </style>
  <!-- Navbar-->
  <header class="app-header">
    <!-- Sidebar toggle button--><a class="app-sidebar__toggle" href="#" data-toggle="sidebar"
      aria-label="Hide Sidebar"></a>
    <!-- Navbar Right Menu-->
    <ul class="app-nav">


      <!-- User Menu-->
      <li><a class="app-nav__item" href="${pageContext.request.contextPath}/khach-hang/dang-xuat"><i class='bx bx-log-out bx-rotate-180'></i> </a>

      </li>
    </ul>
  </header>
  <!-- Sidebar menu-->
  <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
  <aside class="app-sidebar">
    <div class="app-sidebar__user">
      <div>
        <c:if test="${not empty khachHang and khachHang.role.name() == 'AD'}">
        <p class="app-sidebar__user-designation">Quản trị viên </p>
      </c:if>
      
      <c:if test="${not empty khachHang and khachHang.role.name() == 'NV'}">
        <p class="app-sidebar__user-designation">Nhân viên quản lí  </p>
      </c:if>
      </div>
    </div>
    <hr>
    <ul class="app-menu">
      <li><a class="app-menu__item" href="/nvql/index.jsp"><i
            class='app-menu__icon bx bx-pie-chart-alt-2'></i><span class="app-menu__label">Báo cáo doanh thu</span></a>
      </li>
      
      <c:if test="${not empty khachHang and khachHang.role.name() == 'AD'}">
    	<li><a class="app-menu__item" href="/admin/table-data-table.jsp"><i class='app-menu__icon bx bx-user-voice'></i><span
            class="app-menu__label">Quản lý khách hàng</span></a></li> 
	</c:if>

      <!-- <li><a class="app-menu__item" href="#"><i class='app-menu__icon bx bx-user-voice'></i><span
            class="app-menu__label">Quản lý khách hàng</span></a></li> -->
      <li><a class="app-menu__item active" href="/nvql/manageProduct.jsp"><i
            class='app-menu__icon bx bx-purchase-tag-alt'></i><span class="app-menu__label">Quản lý sản phẩm</span></a>
      </li>
      <li><a class="app-menu__item " href="/nvql/manageOrder.jsp"><i class='app-menu__icon bx bx-task'></i><span
            class="app-menu__label">Quản lý đơn hàng</span></a></li>
            
      <li><a class="app-menu__item" href="/nvql/manageDiscount.jsp"><i class='app-menu__icon bx bx-dollar'></i><span
            class="app-menu__label">Quản lí giảm giá</span></a></li>
    </ul>
  </aside>
  <main class="app-content">
    <div class="app-title">
      <ul class="app-breadcrumb breadcrumb">
        <li class="breadcrumb-item">Danh sách sản phẩm</li>
        <li class="breadcrumb-item"><a href="#">Chỉnh sửa sản phẩm</a></li>
      </ul>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="tile">
          <h3 class="tile-title">Cập nhật thông tin sản phẩm</h3>
          <div class="tile-body">
            <!-- <div class="row element-button">
              <div class="col-sm-2">
                <a class="btn btn-add btn-sm" data-toggle="modal" data-target="#exampleModalCenter"><i
                    class="fas fa-folder-plus"></i> Thêm nhà cung cấp</a>
              </div>
              <div class="col-sm-2">
                <a class="btn btn-add btn-sm" data-toggle="modal" data-target="#adddanhmuc"><i
                    class="fas fa-folder-plus"></i> Thêm danh mục</a>
              </div>
              <div class="col-sm-2">
                <a class="btn btn-add btn-sm" data-toggle="modal" data-target="#addtinhtrang"><i
                    class="fas fa-folder-plus"></i> Thêm tình trạng</a>
              </div>
            </div> -->
             <form action="/nvql-controller/updateAndReload" method="post" enctype="multipart/form-data" class="row"> 
             <div class="row">
             <input type="hidden" name="id" value="${requestScope.product.id}"> 
              <div class="form-group col-md-3">
                <label class="control-label">Tên sản phẩm</label>
                <input value="${requestScope.product.ten}" onchange="onchangeInput('.tensanpham',this)" name="tensanpham" class="form-control" type="text" required>
              </div>
				
			<input value="${requestScope.product.ctGiamGia.id}" name="idgiamgia" class="form-control" type="hidden" required>

              <div class="form-group  col-md-3">
                <label class="control-label">Số lượng</label>
                <input value="${requestScope.product.soLuongNhap}" onchange="onchangeInput('.soluong',this)" name="soluong" class="form-control" type="number" required>
              </div>
              <div class="form-group col-md-3">
                <label class="control-label">Số trang</label>
                <input value="${requestScope.product.soTrang}" onchange="onchangeInput('.sotrang',this)" name="sotrang" class="form-control" type="number" placeholder="" required>
              </div>
              <div class="form-group col-md-3">
                <label for="exampleSelect1" class="control-label">Danh mục</label>
                <select onchange=" onchangeSelect('.category',this)" name="category"  class="form-control" id="selectCategory">
                  <option>-- Chọn danh mục --</option>
                  <option>Bàn ăn</option>
                  <option>Bàn thông minh</option>
                  <option>Tủ</option>
                  <option>Ghế gỗ</option>
                  <option>Ghế sắt</option>
                  <option>Giường người lớn</option>
                  <option>Giường trẻ em</option>
                  <option>Bàn trang điểm</option>
                  <option>Giá đỡ</option>
                </select>
              </div>
              <div class="form-group col-md-3 ">
                <label for="exampleSelect1" class="control-label">Nhà xuất bản</label>
                <select onchange=" onchangeSelect('.producer',this)" name="producer" class="form-control" id="selectProducer">
                  <option>-- Chọn nhà cung cấp --</option>
                  <option>Phong vũ</option>
                  <option>Thế giới di động</option>
                  <option>FPT</option>
                  <option>Võ Trường</option>
                </select>
              </div>
              
              <div class="form-group col-md-3 ">
                <label for="exampleSelect1" class="control-label">Tác giả</label>
                <select onchange=" onchangeSelect('.author',this)" name="author" class="form-control" id="selectAuthor">
                  <option>-- Chọn tác giả --</option>
                  <option>Phong vũ</option>
                  <option>Thế giới di động</option>
                  <option>FPT</option>
                  <option>Võ Trường</option>
                </select>
              </div>
              
              
              <div class="form-group col-md-3">
                <label class="control-label">Giá bán</label>
                <input value="${requestScope.product.giaBan}" onchange="onchangeInput('.giaban',this)" name="giaban" class="form-control" type="text" required>
              </div>
              <div class="form-group col-md-3">
                <label class="control-label">Giá nhập</label>
                <input value="${requestScope.product.giaNhap}" onchange="onchangeInput('.giavon',this)"  name="giavon" class="form-control" type="text" required>
              </div>

              <!-- <div class="form-group col-md-3">
                <label class="control-label">Phần trăm giảm giá</label>
                <input value="${requestScope.product.phanTramGiamGia}" onchange="onchangeInput('.giamgia',this)"  min="0" max="100" name="giamgia" class="form-control" type="number" placeholder="0 đến 100" required>
              </div> -->
            
              
              <div class="form-group col-md-12">
              	<input type="hidden" name="urlImage" value="${requestScope.product.urlImage}">
               <label class="control-label">Ảnh sản phẩm</label>
                <div id="myfileupload">
        			<input  type="file" id="uploadfile" name="ImageUpload" onchange="readURL(this);" />
                </div>
                <div id="thumbbox">
                  <img height="450" width="400" alt="Thumb image" id="thumbimage" src="${requestScope.product.urlImage}" />
                  <a class="removeimg" href="javascript:"></a>
                </div>
                <div id="boxchoice">
                  <a href="javascript:" class="Choicefile"><i class="fas fa-cloud-upload-alt"></i> Chọn ảnh</a>
                  <p style="clear:both"></p>
                </div> 
				<!-- <div id="myfileupload">
		        	
                  	<input type="file" name="file" accept="image/*"> 
                </div> -->
               
<!--                 <div id="thumbbox">
                  <img height="450" width="400" alt="Thumb image" id="thumbimage" style="display: none" />
                </div> -->
              </div>
              <div class="form-group col-md-12">
                <label class="control-label">Mô tả sản phẩm</label>
                <textarea  onchange="onchangeInput('.mota',this)" class="form-control" name="mota" id="mota">${requestScope.product.moTa}</textarea>
                <script>CKEDITOR.replace('mota');</script>
              </div>
           </div>
           <button style="display: none;"id="btn-submit" type="submit" value="submit"> 
		 </form> 
          </div>
          
          <button onclick="submitButtonFunc('btn-submit')" class="btn btn-save" type="button">Lưu lại</button>
          <a class="btn btn-cancel" href="/nvql/manageProduct.jsp">Hủy bỏ</a>
        </div>
   
  </main>


  <!--
  MODAL CHỨC VỤ 
-->
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">

        <div class="modal-body">
          <div class="row">
            <div class="form-group  col-md-12">
              <span class="thong-tin-thanh-toan">
                <h5>Thêm mới nhà cung cấp</h5>
              </span>
            </div>
            <div class="form-group col-md-12">
              <label class="control-label">Nhập tên chức vụ mới</label>
              <input class="form-control" type="text" required>
            </div>
          </div>
          <BR>
          <button class="btn btn-save" type="button">Lưu lại</button>
          <a class="btn btn-cancel" data-dismiss="modal" href="#">Hủy bỏ</a>
          <BR>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
  <!--
MODAL
-->



  <!--
  MODAL DANH MỤC
-->
  <div class="modal fade" id="adddanhmuc" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">

        <div class="modal-body">
          <div class="row">
            <div class="form-group  col-md-12">
              <span class="thong-tin-thanh-toan">
                <h5>Thêm mới danh mục </h5>
              </span>
            </div>
            <div class="form-group col-md-12">
              <label class="control-label">Nhập tên danh mục mới</label>
              <input class="form-control" type="text" required>
            </div>
            <div class="form-group col-md-12">
              <label class="control-label">Danh mục sản phẩm hiện đang có</label>
              <ul style="padding-left: 20px;">
                <li>Bàn ăn</li>
              <li>Bàn thông minh</li>
              <li>Tủ</li>
              <li>Ghế gỗ</li>
              <li>Ghế sắt</li>
              <li>Giường người lớn</li>
              <li>Giường trẻ em</li>
              <li>Bàn trang điểm</li>
              <li>Giá đỡ</li>
              </ul>
            </div>
          </div>
          <BR>
          <button class="btn btn-save" type="button">Lưu lại</button>
          <a class="btn btn-cancel" data-dismiss="modal" href="#">Hủy bỏ</a>
          <BR>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
  <!--
MODAL
-->




  <!--
  MODAL TÌNH TRẠNG
-->
  <div class="modal fade" id="addtinhtrang" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">

        <div class="modal-body">
          <div class="row">
            <div class="form-group  col-md-12">
              <span class="thong-tin-thanh-toan">
                <h5>Thêm mới tình trạng</h5>
              </span>
            </div>
            <div class="form-group col-md-12">
              <label class="control-label">Nhập tình trạng mới</label>
              <input class="form-control" type="text" required>
            </div>
          </div>
          <BR>
          <button  class="btn btn-save" type="button">Lưu lại</button>
          <a class="btn btn-cancel" data-dismiss="modal" href="#">Hủy bỏ</a>
          <BR>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
  <!--
MODAL
-->



  <script src="../js/jquery-3.2.1.min.js"></script>
  <script src="../js/popper.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  <script src="../js/quanli.js"></script>
  <script src="../js/plugins/pace.min.js"></script>
  <script>
  	showCategory("<c:out value='${requestScope.product.theLoai.id}'/>");
  	showAuthor("<c:out value='${requestScope.product.tacGia.id}'/>");
  	showProducer("<c:out value='${requestScope.product.nxb.id}'/>");
    const inpFile = document.getElementById("inpFile");
    const loadFile = document.getElementById("loadFile");
    const previewContainer = document.getElementById("imagePreview");
    const previewImage = previewContainer.querySelector(".image-preview__image");
    const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
    inpFile.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";
        reader.addEventListener("load", function () {
          previewImage.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
      }
    });

  </script>
</body>

</html>