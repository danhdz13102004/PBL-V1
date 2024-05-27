<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Quản lí giảm giá | Quản trị Admin</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Main CSS-->
  <link rel="stylesheet" type="text/css" href="../css/quanli.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <!-- or -->
  <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">

  <!-- Font-icon css-->
  <link rel="stylesheet" type="text/css"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">

</head>

<body onload="time()" class="app sidebar-mini rtl">
  <!-- Navbar-->
  <header class="app-header">
    <!-- Sidebar toggle button--><a class="app-sidebar__toggle" href="#" data-toggle="sidebar"
      aria-label="Hide Sidebar"></a>
    <!-- Navbar Right Menu-->
    <ul class="app-nav">


      <!-- User Menu-->
      <li><a class="app-nav__item" href="/index.html"><i class='bx bx-log-out bx-rotate-180'></i> </a>

      </li>
    </ul>
  </header>
  <!-- Sidebar menu-->
  <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
  <aside class="app-sidebar">
    <div class="app-sidebar__user"><img class="app-sidebar__user-avatar" src="/images/hay.jpg" width="50px"
        alt="User Image">
      <div>
        <p class="app-sidebar__user-designation">Nhân viên quản lí</p>
      </div>
    </div>
    <hr>
    <ul class="app-menu">
      <li><a class="app-menu__item" href="/nvql/index.jsp"><i
            class='app-menu__icon bx bx-pie-chart-alt-2'></i><span class="app-menu__label">Báo cáo doanh thu</span></a>
      </li>

      <!-- <li><a class="app-menu__item" href="#"><i class='app-menu__icon bx bx-user-voice'></i><span
            class="app-menu__label">Quản lý khách hàng</span></a></li> -->
      <li><a class="app-menu__item" href="/nvql/manageProduct.jsp"><i
            class='app-menu__icon bx bx-purchase-tag-alt'></i><span class="app-menu__label">Quản lý sản phẩm</span></a>
      </li>
      <li><a class="app-menu__item" href="/nvql/manageOrder.jsp"><i class='app-menu__icon bx bx-task'></i><span
            class="app-menu__label">Quản lý đơn hàng</span></a></li>
            

      <li><a class="app-menu__item active" href="/nvql/manageDiscount.jsp"><i class='app-menu__icon bx bx-dollar'></i><span
            class="app-menu__label">Quản lí giảm giá</span></a></li>
    </ul>
  </aside>
    <main class="app-content">
      <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item">Quản lí giảm giá</li>
          <li class="breadcrumb-item"><a href="#">Thêm giảm giá</a></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Tạo mới chương trình giảm giá</h3>
            <div class="tile-body">
              <form class="row">
                <div class="form-group  col-md-3">
                  <label class="control-label">Tên chương trình giảm giá</label>
                  <input class="form-control inp-name" type="text" name="name" required>
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Thời gian bắt đầu</label>
                  <input class="form-control inp-start" type="date" name="starttime" required>
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Thời gian kết thúc</label>
                  <input class="form-control inp-end" type="date" name="endtime" required>
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Phần trăm giảm giá</label>
                  <input class="form-control inp-percent" type="number" name="percent" required>
                </div>
                
                <div class="form-group col-md-4">
                <label for="exampleSelect1" class="control-label">Thể loại áp dụng</label>
                <select  name="category"  class="form-control" id="selectCategory">
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
              <div class="form-group col-md-4 ">
                <label for="exampleSelect1" class="control-label">Nhà xuất bản áp dụng</label>
                <select  name="producer" class="form-control" id="selectProducer">
                  <option>-- Chọn nhà cung cấp --</option>
                  <option>Phong vũ</option>
                  <option>Thế giới di động</option>
                  <option>FPT</option>
                  <option>Võ Trường</option>
                </select>
              </div>
              
              <div class="form-group col-md-4 ">
                <label for="exampleSelect1" class="control-label">Tác giả áp dụng</label>
                <select name="author" class="form-control" id="selectAuthor">
                  <option>-- Chọn tác giả --</option>
                  <option>Phong vũ</option>
                  <option>Thế giới di động</option>
                  <option>FPT</option>
                  <option>Võ Trường</option>
                </select>
              </div>
                
                
               <!--  <div class="form-group  col-md-4">
                  <label class="control-label">Số hiệu người bán</label>
                  <input class="form-control" type="text">
                </div>
                <div class="form-group  col-md-4">
                  <label class="control-label">Ngày làm đơn hàng</label>
                  <input class="form-control" type="date" >
                </div>
                <div class="form-group  col-md-4">
                  <label class="control-label">Tên sản phẩm cần bán</label>
                  <input class="form-control" type="text">
                </div>
                <div class="form-group  col-md-4">
                  <label class="control-label">Mã sản phẩm</label>
                  <input class="form-control" type="text">
                </div>
                <div class="form-group  col-md-4">
                  <label class="control-label">Số lượng</label>
                  <input class="form-control" type="number">
                </div>
                <div class="form-group col-md-4">
                  <label for="exampleSelect1" class="control-label">Tình trạng</label>
                  <select class="form-control" id="exampleSelect1">
                    <option>-- Chọn tình trạng --</option>
                    <option>Đã xử lý</option>
                    <option>Đang chờ</option>
                    <option>Đã hủy</option>
                  </select>
                </div>
                <div class="form-group  col-md-4">
                  <label class="control-label">Ghi chú đơn hàng</label>
                  <textarea class="form-control" rows="4" ></textarea>
                </div>   -->
                
          </div>
          <button onclick="addNewDisCount()" class="btn btn-save" type="button">Lưu lại</button>
          <a class="btn btn-cancel" href="/nvql/manageDiscount.jsp">Hủy bỏ</a>
        </div>
    </main>
  <script src="../js/quanli.js"></script>
   <script type="text/javascript">
   	showCategory();
 	showAuthor();
 	showProducer();
   </script>
   <!-- Essential javascripts for application to work-->
  <script src="../js/jquery-3.2.1.min.js"></script>
  <script src="../js/popper.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  <!-- The javascript plugin to display page loading on top-->
  <script src="../js/plugins/pace.min.js"></script>
  </body>
</html>