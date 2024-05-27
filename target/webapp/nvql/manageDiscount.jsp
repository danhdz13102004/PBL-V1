<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

    <head>
        <title>Quản lí giảm giá| Quản trị Admin</title>
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
      	<style type="text/css">
      		.col-sm-12 .dataTables_paginate,
      		.col-sm-12 .dataTables_info,
      		.col-sm-12 .dataTables_filter,
      		.col-sm-12 .dataTables_length {
      			display: none;
      		} 
      		
      		.form-confirm {
      			z-index: 10;
      		}     		
      	</style>
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
        <p class="app-sidebar__user-name"><b>Võ Trường</b></p>
        <p class="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
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
            <ul class="app-breadcrumb breadcrumb side">
                <li class="breadcrumb-item active"><a href="#"><b>Quản lí giảm giá</b></a></li>
            </ul>
            <div id="clock"></div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="tile">
                    <div class="tile-body">
                        <div class="row element-button">
                            <div class="col-sm-2">
              
                              <a class="btn btn-add btn-sm" href="/nvql/addNewDiscount.jsp" title="Thêm"><i class="fas fa-plus"></i>
                                Tạo mới chương trình giảm giá</a>
                            </div>
                            <!-- <div class="col-sm-2">
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
                            </div> -->
                          </div>
                        <div class="row">
                        	<div class="col-sm-4">
                              <div class="input-group">
								  <div class="form-outline" data-mdb-input-init>
								    <input placeholder="Search" type="search" id="form1" class="header-search-bar__input-field" />
								  </div>
								  <button onclick="changePage(1,5)" style="padding: 8px;" type="button" class="btn btn-primary" data-mdb-ripple-init>
								    <i class="fas fa-search"></i>
								  </button>	
								</div>
                            </div>
                        </div>
                        <table class="table table-hover table-bordered" id="sampleTable">
                            <thead>
                                <tr>
                                    <th>Tên chương trình</th>
                                    <th>Thời gian bắt đầu</th>
                                    <th>Thời gian kết thúc</th>
                                    <th>Phần trăm giảm giá</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody class="main-body">
                                <tr>
                                    <td>Chương trình giảm giá hè</td>
                                    <td>21/5/2024</td>
                                    <td>1/8/2024</td>
                                    <td><span class="badge bg-success">10%</span></td>
                                    <td><button class="btn btn-primary btn-sm trash" type="button" title="Xóa"
                                            onclick="myFunction(this)"><i class="fas fa-trash-alt"></i> 
                                        </button>
                                        <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp" data-toggle="modal"
                      						data-target="#ModalUP"><i class="fas fa-edit"></i></button>
                                       
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style="justify-content: center;" class="pagination my-pagination">
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
            </div>
        </div>
    </main>

<!--
  MODAL
-->
<div class="modal fade" id="ModalUP" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static"
data-keyboard="false">

<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
	<input type="hidden" class="inp-id-update"> 
    <div class="modal-body">
      <div class="row">
        <div class="form-group  col-md-12">
          <span class="thong-tin-thanh-toan">
            <h5>Chỉnh sửa thông tin sản phẩm cơ bản</h5>
          </span>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-6">
            <label class="control-label">Tên chương trình </label>
            <input class="form-control inp-name" type="text" >
          </div>
        <div class="form-group col-md-6">
            <label class="control-label">Ngày bắt đầu</label>
          <input class="form-control inp-start" type="date" required >
        </div>
        
      </div>

      <div class="row">
        <div class="form-group col-md-6">
          <label class="control-label">Ngày kết thúc </label>
          <input class="form-control inp-end" type="date" >
        </div>
      <div class="form-group col-md-6">
          <label class="control-label">Phần trăm giảm giá</label>
        <input class="form-control inp-discount" type="number" required>
      </div>
      </div>
      <BR>
      <a href="#" style="    float: right;
    font-weight: 600;
    color: #ea0000;">Chỉnh sửa sản phẩm nâng cao</a>
      <BR>
      <BR>
      <button onclick="confirmEdit()" class="btn btn-save" type="button">Lưu lại</button>
      <a class="btn btn-cancel btn-cancel-update" data-dismiss="modal" href="#">Hủy bỏ</a>
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

    <!-- Essential javascripts for application to work-->
    <script src="../js/jquery-3.2.1.min.js"></script>
    <script src="../js/popper.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="../src/jquery.table2excel.js"></script>
    <script src="../js/quanli.js"></script>
    <!-- The javascript plugin to display page loading on top-->
    <script src="../js/plugins/pace.min.js"></script>
    <!-- Page specific javascripts-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
    <!-- Data table plugin-->
    <script type="text/javascript" src="../js/plugins/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="../js/plugins/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="../js/managediscount.js">
    </script>
    <script type="text/javascript">
    	changePage(1,5);  
        $('#sampleTable').DataTable();
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
    </script>
    <script>
        function deleteRow(r) {
            var i = r.parentNode.parentNode.rowIndex;
            document.getElementById("myTable").deleteRow(i);
        }
        jQuery(function () {
            jQuery(".trash").click(function () {
                swal({
                    title: "Cảnh báo",
                    text: "Bạn có chắc chắn là muốn xóa sản phẩm này?",
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
    </script>
</body>

<div class="form-confirm">
		<input type="hidden" class="inp-id-delete"> 
	    <div class="overlay"></div>
	    <div class="confirm-box">
	        <span class ="confirm-box-title">Cảnh báo</span>
	        <br>
	        <span>Bạn có chắc chắn là xóa chương trình giảm giá này?</span>
	        <div>
	            <button onclick="closeConfirmDelete()" class="cancel-btn">Hủy bỏ</button>
	            <button onclick="confirmToDelete()" class="confirm-btn">Đồng ý</button>
	        </div>
	    </div>
	</div>

<!-- <div class="form-edit">
	<div></div>
	<div class="modal-content">

    <div class="modal-body">
      <div class="row">
        <div class="form-group  col-md-12">
          <span class="thong-tin-thanh-toan">
            <h5>Chỉnh sửa thông tin sản phẩm cơ bản</h5>
          </span>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-6">
            <label class="control-label">Mã sản phẩm </label>
            <input class="form-control" type="number" value="71309005">
          </div>
        <div class="form-group col-md-6">
            <label class="control-label">Tên sản phẩm</label>
          <input class="form-control" type="text" required value="Bàn ăn gỗ Theresa">
        </div>
        
      </div>

      <div class="row">
        <div class="form-group col-md-6">
          <label class="control-label">Mã sản phẩm </label>
          <input class="form-control" type="number" value="71309005">
        </div>
      <div class="form-group col-md-6">
          <label class="control-label">Tên sản phẩm</label>
        <input class="form-control" type="text" required value="Bàn ăn gỗ Theresa">
      </div>
      </div>
      <BR>
      <a href="#" style="    float: right;
    font-weight: 600;
    color: #ea0000;">Chỉnh sửa sản phẩm nâng cao</a>
      <BR>
      <BR>
      <button class="btn btn-save" type="button">Lưu lại</button>
      <a class="btn btn-cancel" data-dismiss="modal" href="#">Hủy bỏ</a>
      <BR>
    </div>
    
    <div class="modal-footer">
    </div>
  </div>
</div> -->
</html>