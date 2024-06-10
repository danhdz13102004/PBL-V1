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
  <title>Danh sách đơn hàng | Quản trị Admin</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Main CSS-->
  <link rel="stylesheet" type="text/css" href="../css/quanli.css">
  <link rel="stylesheet" type="text/css" href="../css/style1.css">
  <link rel="stylesheet" type="text/css" href="../css/base.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <!-- or -->
  <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">

  <!-- Font-icon css-->
  <link rel="stylesheet" type="text/css"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body onload="time()" class="app sidebar-mini rtl">
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
    
    <style>
    	.btn-confirm {
    		background-color: #bfefc4;
    		color: #02790c;
    	}
    </style>
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
<!--       <li><a class="app-menu__item haha" href="phan-mem-ban-hang.html"><i class='app-menu__icon bx bx-cart-alt'></i>
          <span class="app-menu__label">POS Bán Hàng</span></a></li>
      <li><a class="app-menu__item " href="/nvql/index.jsp"><i class='app-menu__icon bx bx-tachometer'></i><span
            class="app-menu__label">Bảng điều khiển</span></a></li> -->
      <li><a class="app-menu__item" href="/nvql/index.jsp"><i
            class='app-menu__icon bx bx-pie-chart-alt-2'></i><span class="app-menu__label">Báo cáo doanh thu</span></a>
      </li>

      <c:if test="${not empty khachHang and khachHang.role.name() == 'AD'}">
    	<li><a class="app-menu__item" href="/admin/table-data-table.jsp"><i class='app-menu__icon bx bx-user-voice'></i><span
            class="app-menu__label">Quản lý khách hàng</span></a></li> 
	</c:if>
      <li><a class="app-menu__item" href="/nvql/manageProduct.jsp"><i
            class='app-menu__icon bx bx-purchase-tag-alt'></i><span class="app-menu__label">Quản lý sản phẩm</span></a>
      </li>
      <li><a class="app-menu__item active" href="/nvql/manageOrder.jsp"><i class='app-menu__icon bx bx-task'></i><span
            class="app-menu__label">Quản lý đơn hàng</span></a></li>
            

      <li><a class="app-menu__item" href="/nvql/manageDiscount.jsp"><i class='app-menu__icon bx bx-dollar'></i><span
            class="app-menu__label">Quản lí giảm giá</span></a></li>
     

    </ul>
  </aside>
    <main class="app-content">
      <div class="app-title">
        <ul class="app-breadcrumb breadcrumb side">
          <li class="breadcrumb-item active"><a href="#"><b>Danh sách đơn hàng</b></a></li>
        </ul>
        <div id="clock"></div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <div class="tile-body">
              <!-- <div class="row element-button">
                <div class="col-sm-2">
  
                  <a class="btn btn-add btn-sm" href="form-add-don-hang.html" title="Thêm"><i class="fas fa-plus"></i>
                    Tạo mới đơn hàng</a>
                </div>
                <div class="col-sm-2">
                  <a class="btn btn-delete btn-sm nhap-tu-file" type="button" title="Nhập" onclick="myFunction(this)"><i
                      class="fas fa-file-upload"></i> Tải từ file</a>
                </div>
  
                <div class="col-sm-2">
                  <a class="btn btn-delete btn-sm print-file" type="button" title="In" onclick="myApp.printTable()"><i
                      class="fas fa-print"></i> In dữ liệu</a>
                </div>
                <div class="col-sm-2">
                  <a class="btn btn-delete btn-sm print-file js-textareacopybtn" type="button" title="Sao chép"><i
                      class="fas fa-copy"></i> Sao chép</a>
                </div>
  
                <div class="col-sm-2">
                  <a class="btn btn-excel btn-sm" href="" title="In"><i class="fas fa-file-excel"></i> Xuất Excel</a>
                </div>
                <div class="col-sm-2">
                  <a class="btn btn-delete btn-sm pdf-file" type="button" title="In" onclick="myFunction(this)"><i
                      class="fas fa-file-pdf"></i> Xuất PDF</a>
                </div>
                <div class="col-sm-2">
                  <a class="btn btn-delete btn-sm" type="button" title="Xóa" onclick="myFunction(this)"><i
                      class="fas fa-trash-alt"></i> Xóa tất cả </a>
                </div>
              </div> -->
              <table class="table table-hover table-bordered" id="sampleTable">
                <thead>
                  <tr>
                    <th class="abc" style="width: 300px">Đơn hàng</th>
                    <th class="abc" style="width: 100px">Số lượng</th>
                    <th style="width: 130px">Tên người nhận</th>
                    <th style="width: 150px">Địa chỉ nhận hàng</th>
                    <th style="width: 120px">Số điện thoại</th>
                    <th style="width: 80px">Tổng tiền</th>
                    <th style="width: 100px">Tình trạng</th>
                    <th >Tính năng</th>
                  </tr>
                </thead>
                <tbody class="main-row">
<!--                   <tr height="100px">
                    <td width="300">Ghế làm việc Zuno <br> Bàn ăn gỗ Theresa</td>
                    <td width="50">2 <br> 3</td>
                    <td width="100">Ngô Văn Danh</td>
                    <td width="120">Triệu Thanh Phú</td>
                    <td width="100">0355420872</td>
                    <td width="80">9.400.000 đ</td>
                    <td width="100"><span class="badge bg-success">Hoàn thành</span></td>
                    <td ><button class="btn btn-primary btn-sm trash" type="button" title="Xóa"><i class="fa-solid fa-circle-xmark"></i></button>
                      <button class="btn btn-primary btn-sm edit" type="button" title="Sửa"><i class="fa fa-edit"></i></button>
                      <button class="btn btn-primary btn-sm btn-confirm" type="button" title="Xác nhận"><i class="fa-solid fa-circle-check"></i></button>
                      </td>    
                  </tr> -->
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
	 	<div style="justify-content: center;" class="pagination">
	                <div class="pagination__item">
	                  <button class="button btnPrev">
	                    <svg class="btn__icon" fill="" height="800px" width="800px" version="1.1" id="Capa_1"
	                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	                      viewBox="0 0 500 500" xml:space="preserve">
	                      <g>
	                        <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
	                        c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
	                      </g>
	                    </svg>
	                  </button>
	                </div>
	                <div class="pagination__item pagination__item--active">
	                  <button class="button">1</button>
	                </div>
	                <div class="pagination__item">
	                  <button class="button">2</button>
	                </div>
	                <div class="pagination__item">
	                  <button class="button">3</button>
	                </div>
	                <div class="pagination__item">
	                  <button class="button">4</button>
	                </div>
	                <div class="pagination__item" id="btnEllipsis">
	                  <button class="button">...</button>
	                </div>
	                <div class="pagination__item">
	                  <button class="button">10</button>
	                </div>
	                <div class="pagination__item">
	                  <button class="button btnNext">
	                    <svg class="btn__icon" fill="" height="800px" width="800px" version="1.1" id="Capa_1"
	                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	                      viewBox="0 0 500 500" xml:space="preserve">
	                      <g>
	                        <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
	                        c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
	                        " />
	                      </g>
	                    </svg>
	                  </button>
	                </div>
	              </div>
    </main>
    
    
  <!-- Essential javascripts for application to work-->
  <script src="../js/jquery-3.2.1.min.js"></script>
  <script src="../js/popper.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="../js/quanli.js"></script>
    <script src="../js/manageorder.js"></script>
  <!-- The javascript plugin to display page loading on top-->
  <script src="../js/plugins/pace.min.js"></script>
  <!-- Page specific javascripts-->
<!--   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script> -->
  <!-- Data table plugin-->
<!--   <script type="text/javascript" src="../js/plugins/jquery.dataTables.min.js"></script>
  <script type="text/javascript" src="../js/plugins/dataTables.bootstrap.min.js"></script>
  <script type="text/javascript">$('#sampleTable').DataTable();</script> -->
  <script>
  	changePage(1,10);
    function deleteRow(r) {
      var i = r.parentNode.parentNode.rowIndex;
      document.getElementById("myTable").deleteRow(i);
    }
    jQuery(function () {
      jQuery(".trash").click(function () {
        swal({
          title: "Cảnh báo",
         
          text: "Bạn có chắc chắn là muốn xóa đơn hàng này?",
          buttons: ["Hủy bỏ", "Đồng ý"],
        })
          .then((willDelete) => {
            if (willDelete) {
              swal("Đã xóa thành công.!", {
                
              });
            }
          });
      });
    });
    oTable = $('#sampleTable').dataTable();
    $('#all').click(function (e) {
      $('#sampleTable tbody :checkbox').prop('checked', $(this).is(':checked'));
      e.stopImmediatePropagation();
    });

    //EXCEL
    // $(document).ready(function () {
    //   $('#').DataTable({

    //     dom: 'Bfrtip',
    //     "buttons": [
    //       'excel'
    //     ]
    //   });
    // });


    //Thời Gian
    function time() {
      var today = new Date();
      var weekday = new Array(7);
      weekday[0] = "Chủ Nhật";
      weekday[1] = "Thứ Hai";
      weekday[2] = "Thứ Ba";
      weekday[3] = "Thứ Tư";
      weekday[4] = "Thứ Năm";
      weekday[5] = "Thứ Sáu";
      weekday[6] = "Thứ Bảy";
      var day = weekday[today.getDay()];
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      m = checkTime(m);
      s = checkTime(s);
      nowTime = h + " giờ " + m + " phút " + s + " giây";
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      today = day + ', ' + dd + '/' + mm + '/' + yyyy;
      tmp = '<span class="date"> ' + today + ' - ' + nowTime +
        '</span>';
      document.getElementById("clock").innerHTML = tmp;
      clocktime = setTimeout("time()", "1000", "Javascript");

      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
    }
    //In dữ liệu
    var myApp = new function () {
      this.printTable = function () {
        var tab = document.getElementById('sampleTable');
        var win = window.open('', '', 'height=700,width=700');
        win.document.write(tab.outerHTML);
        win.document.close();
        win.print();
      }
    }
    //     //Sao chép dữ liệu
    //     var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

    // copyTextareaBtn.addEventListener('click', function(event) {
    //   var copyTextarea = document.querySelector('.js-copytextarea');
    //   copyTextarea.focus();
    //   copyTextarea.select();

    //   try {
    //     var successful = document.execCommand('copy');
    //     var msg = successful ? 'successful' : 'unsuccessful';
    //     console.log('Copying text command was ' + msg);
    //   } catch (err) {
    //     console.log('Oops, unable to copy');
    //   }
    // });


    //Modal
    $("#show-emp").on("click", function () {
      $("#ModalUP").modal({ backdrop: false, keyboard: false })
    });
  </script>
</body>
	<div class="form-confirm">
	    <div class="overlay"></div>
	    <div class="confirm-box">
	        <span class ="confirm-box-title">Cảnh báo</span>
	        <br>
	        <span>Bạn có chắc chắn là hủy đơn hàng này?</span>
	        <div>
	            <button onclick="closeConfirmDelete()" class="cancel-btn">Hủy bỏ</button>
	            <button class="confirm-btn">Đồng ý</button>
	        </div>
	    </div>
	</div>
</html>