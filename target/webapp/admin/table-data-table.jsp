<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Danh sách nhân viên | Quản trị Admin</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Main CSS-->
  <link rel="stylesheet" type="text/css" href="css/main.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <!-- or -->
  <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
  
  <!-- Font-icon css-->
  <link rel="stylesheet" type="text/css"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">
  
  <!-- my custom style -->
  <link rel="stylesheet" type="text/css" href="css/mycss.css">
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
    <div class="app-sidebar__user">
      <div>
              <c:if test="${not empty khachHang and khachHang.role.name() == 'AD'}">
        <p class="app-sidebar__user-designation">Quản trị viên </p>
      </c:if>
      
      <c:if test="${not empty khachHang and khachHang.role.name() == 'NV'}">
        <p class="app-sidebar__user-designation">Nhân viên quản lí  </p>
      </div>
    </div>
    <hr>
    <ul class="app-menu">
  	<li><a class="app-menu__item" href="/nvql/index.jsp"><i
            class='app-menu__icon bx bx-pie-chart-alt-2'></i><span class="app-menu__label">Báo cáo doanh thu</span></a>
      </li>
	
	 <c:if test="${not empty khachHang and khachHang.role.name() == 'AD'}">
    	<li><a class="app-menu__item active" href="/admin/table-data-table.jsp"><i class='app-menu__icon bx bx-user-voice'></i><span
            class="app-menu__label">Quản lý khách hàng</span></a></li>
	</c:if>
      <li><a class="app-menu__item" href="/nvql/manageProduct.jsp"><i
            class='app-menu__icon bx bx-purchase-tag-alt'></i><span class="app-menu__label">Quản lý sản phẩm</span></a>
      </li>
      <li><a class="app-menu__item" href="/nvql/manageOrder.jsp"><i class='app-menu__icon bx bx-task'></i><span
            class="app-menu__label">Quản lý đơn hàng</span></a></li>
            

      <li><a class="app-menu__item " href="/nvql/manageDiscount.jsp"><i class='app-menu__icon bx bx-dollar'></i><span
            class="app-menu__label">Quản lí giảm giá</span></a></li>
      
      

    </ul>
  </aside>
  <main class="app-content">
    <div class="app-title">
      <ul class="app-breadcrumb breadcrumb side">
        <li class="breadcrumb-item active"><a href="#"><b>Danh sách nhân viên</b></a></li>
      </ul>
      <div id="clock"></div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="tile">
          <div class="tile-body">

            <div class="row element-button">
              <div class="col-sm-2">

                <a class="btn btn-add btn-sm" href="form-add-nhan-vien.html" title="Thêm"><i class="fas fa-plus"></i>
                  Tạo mới nhân viên</a>
              </div>
              <div class="col-sm-2">
                <a class="btn btn-delete btn-sm" type="button" title="Xóa" onclick="deleteAll()"><i
                    class="fas fa-trash-alt"></i> Xóa tất cả </a>
              </div>
            </div>
            <div class="searchFilter">
                <div class="searchFilter__item">
                    <label>Họ và tên :</label>
                    <input class="searchFilter__item__value" type="text" for="name">
                </div>
                <div class="searchFilter__item">
                  <label >Trạng thái :</label>
                  <select class="searchFilter__item__value" for="status">
                    <option value="AC">Active</option>
                    <option value="BL">Khóa tài khoản</option>
                    <option value="DC">Deactive</option>
                    <option value="AU">Chờ xác thực</option>
                    <option value="All">All</option>
                  </select>
                </div>
                <div class="searchFilter__item">
                  <label>Giới tính :</label>
                  <select class="searchFilter__item__value" for="gioitinh">
                    <option value="false">Nữ</option>
                    <option value="true">Nam</option>
                    <option value="All">All</option>
                  </select>
                </div>
                <div class="searchFilter__item">
                  <label>SDT :</label>
                  <input class="searchFilter__item__value" type="text" for="sdt">
                </div>
                <div class="searchFilter__item">
                  <label>Role :</label>
                  <select class="searchFilter__item__value" for="role">
                    <option value="AD">Admin</option>
                    <option value="NV">Nhân viên</option>
                    <option value="KH">Khách hàng</option>
                    <option value="All">All</option>
                  </select>
                </div>
                <div class="searchFilter__item">
                  <button class="searchFilter__item__button">Search</button>
                </div>
            </div>
            <div id = "pagination">
            	<div class="btn_wrap">
            		<button class='btn pre_btn'><i class='bx bx-chevron-left'></i></button>
            	</div>
            	<div class='page_num'>
	            	<div class='cur_page'>1</div>
	            	<div class='delim'>/</div>
	            	<div class='total_page'>10</div>
            	</div>
            	<div class="btn_wrap">
            		<button class='btn next_btn'><i class='bx bx-chevron-right'></i></button>
				</div>
            </div>
            <table class="table table-hover table-bordered js-copytextarea" cellpadding="0" cellspacing="0" border="0"
              id="sampleTable">
              <thead>
                <tr>
                  <th width="10"><input type="checkbox" id="all" onchange="checkAll(this.checked)"></th>
                  <th>ID nhân viên</th>
                  <th width="150">Họ và tên</th>
                  <th>Địa chỉ email</th>
<!--                   <th>Ngày sinh</th>
                  <th>Giới tính</th> -->
                  <th>SĐT</th>
                  <th>Vai trò</th>
                  <th >Trạng thái</th>
                  <th width="100">Tính năng</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr>
                  <td width="10"><input type="checkbox" name="check1" value="1"></td>
                  <td>#CD12837</td>
                  <td>Hồ Thị Thanh Ngân</td>
                  <td>Active</td>
                  <td>12/02/1999</td>
                  <td>Nữ</td>
                  <td>0926737168</td>
                  <td>NV</td>
                  <td class="table-td-center"><button class="btn btn-primary btn-sm trash" type="button" title="Xóa"
                      onclick="deleteRow(this)"><i class="fas fa-trash-alt"></i>
                    </button>
                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp"
                      data-toggle="modal" data-target="#ModalUP" ><i class="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td width="10"><input type="checkbox" name="check2" value="2"></td>
                  <td>#SX22837</td>
                  <td>Trần Khả Ái</td>
                  <td>Deactive</td>
                  <td>22/12/1999</td>
                  <td>Nữ</td>
                  <td>0931342432</td>
                  <td>KH</td>
                  <td><button class="btn btn-primary btn-sm trash" type="button" title="Xóa"
                      onclick="myFunction(this)"><i class="fas fa-trash-alt"></i>
                    </button>
                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp"
                      data-toggle="modal" data-target="#ModalUP" ><i class="fas fa-edit"></i>
                    </button>
                  </td>
                </tr> -->
                

              </tbody>
            </table>
            <div id = "pagination_bottom">
            	<div class="pagination__item">
            		<button class='bottom_button pre_btn'><i class='bx bx-chevron-left'></i></button>
            	</div>
            	<div class="pagination__item">
                        <button class="bottom_button">1</button>
                </div>
                <div class="pagination__item">
                        <button class="bottom_button">...</button>
                </div>
                <div class="pagination__item">
                        <button class="bottom_button">4</button>
                        </div>
                <div class="pagination__item pagination__item--active">
                        <button class="bottom_button">5</button>
                        </div>
                <div  class="pagination__item">
                        <button class="bottom_button">6</button>
                        </div> 
                <div class="pagination__item">
                        <button class="bottom_button">...</button>
                </div>               
                <div class="pagination__item">
                        <button class="bottom_button">10</button>
                </div> 
                <div class="pagination__item">
            		<button class='bottom_button next_btn'><i class='bx bx-chevron-right'></i></button>
            	</div>
            </div>
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

        <div class="modal-body">
          <div class="row">
            <div class="form-group  col-md-12">
              <span class="thong-tin-thanh-toan">
                <h5>Chỉnh sửa thông tin nhân viên cơ bản</h5>
              </span>
            </div>
          </div>
          <div class="row info" >
            <div class="form-group col-md-6">
              <label class="control-label">ID nhân viên</label>
              <input class="form-control" type="text" required name="id" value="#CD2187" disabled>
            </div>
            <div class="form-group col-md-6">
              <label class="control-label">Họ và tên</label>
              <input class="form-control" type="text" required name="ten" value="Võ Trường">
            </div>
            <div class="form-group  col-md-6">
              <label class="control-label">Số điện thoại</label>
              <input class="form-control" type="number" required name="sdt" value="09267312388">
            </div>
            <div class="form-group col-md-6">
              <label class="control-label">Địa chỉ email</label>
              <input class="form-control" type="text" required name="email" value="truong.vd2000@gmail.com">
            </div>
            <div class="form-group col-md-6">
              <label class="control-label">Ngày sinh</label>
              <input class="form-control" type="date" name="ngaysinh" value="15/03/2000">
            </div>
            <div class="form-group  col-md-6">
              <label for="exampleSelect1" class="control-label">Vai trò</label>
              <select class="form-control" name="role" id="exampleSelect1">
                <option value="AD">Admin</option>
                <option value="NV">Nhân viên</option>
                <option value="KH">Khách hàng</option>
              </select>
            </div>
            <div class="form-group  col-md-6">
              <label for="exampleSelect1" class="control-label">Giới tính</label>
              <select class="form-control" name="gioitinh" id="exampleSelect1">
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </div>
            <div class="form-group  col-md-6">
              <label for="exampleSelect1" class="control-label">Trạng thái</label>
              <select class="form-control" name="status" id="exampleSelect1">
                <option value="AC">Active</option>
                <option value="BL">Khóa tài khoản</option>
                <option value="DC">Deactive</option>
                <option value="AU">Chờ xác thực</option>
              </select>
            </div>
          </div>
          
          <BR>
          <button class="btn btn-save" type="button" onclick = "update()">Lưu lại</button>
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
	<!-- my script -->
  <script src="js/myscript_get.js"></script>
  <script src="js/myscript_post.js"></script>
  <!-- Essential javascripts for application to work-->
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="src/jquery.table2excel.js"></script>
  <script src="js/main.js"></script>
  <!-- The javascript plugin to display page loading on top-->
  <script src="js/plugins/pace.min.js"></script>
  <!-- Page specific javascripts-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
  <!-- Data table plugin-->
  <!-- <script type="text/javascript" src="js/plugins/jquery.dataTables.min.js"></script> -->
  <!-- <script type="text/javascript" src="js/plugins/dataTables.bootstrap.min.js"></script> -->
  <script type="text/javascript">$('#sampleTable').DataTable();</script>
  <script>
   /*  function deleteRow(r) {
      var i = r.parentNode.parentNode.rowIndex;
      document.getElementById("myTable").deleteRow(i);
    }
    jQuery(function () {
      jQuery(".trash").click(function () {
        swal({
          title: "Cảnh báo",
         
          text: "Bạn có chắc chắn là muốn xóa nhân viên này?",
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
    }); */

    //EXCEL
    // $(document).ready(function () {
    //   $('#').DataTable({

     //    dom: 'Bfrtip',
      //   "buttons": [
      //     'excel'
      //   ]
      // });
     //});


    //Thời Gian
    // function time() {
    //   var today = new Date();
    //   var weekday = new Array(7);
    //   weekday[0] = "Chủ Nhật";
    //   weekday[1] = "Thứ Hai";
    //   weekday[2] = "Thứ Ba";
    //   weekday[3] = "Thứ Tư";
    //   weekday[4] = "Thứ Năm";
    //   weekday[5] = "Thứ Sáu";
    //   weekday[6] = "Thứ Bảy";
    //   var day = weekday[today.getDay()];
    //   var dd = today.getDate();
    //   var mm = today.getMonth() + 1;
    //   var yyyy = today.getFullYear();
    //   var h = today.getHours();
    //   var m = today.getMinutes();
    //   var s = today.getSeconds();
    //   m = checkTime(m);
    //   s = checkTime(s);
    //   nowTime = h + " giờ " + m + " phút " + s + " giây";
    //   if (dd < 10) {
    //     dd = '0' + dd
    //   }
    //   if (mm < 10) {
    //     mm = '0' + mm
    //   }
    //   today = day + ', ' + dd + '/' + mm + '/' + yyyy;
    //   tmp = '<span class="date"> ' + today + ' - ' + nowTime +
    //     '</span>';
    //   document.getElementById("clock").innerHTML = tmp;
    //   clocktime = setTimeout("time()", "1000", "Javascript");

    //   function checkTime(i) {
    //     if (i < 10) {
    //       i = "0" + i;
    //     }
    //     return i;
    //   }
    // }
    // //In dữ liệu
    // var myApp = new function () {
    //   this.printTable = function () {
    //     var tab = document.getElementById('sampleTable');
    //     var win = window.open('', '', 'height=700,width=700');
    //     win.document.write(tab.outerHTML);
    //     win.document.close();
    //     win.print();
    //   }
    // }
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
  /* 	var list = document.querySelectorAll(".btn.btn-primary.btn-sm.edit");
 	list.forEach((item)=>{
	 		item.addEventListener("click", function (e) {
	 		var tr = e.target.closest('tr')
			var tds = tr.children
			var id = tds[1].innerHTML
			var ten = tds[2].innerHTML
			var status = tds[3].innerHTML
			var ns = tds[4].innerHTML
			var gt = tds[5].innerHTML
			var sdt = tds[6].innerHTML
			var role = tds[7].innerHTML
			console.log({
				id:id,
				ten:ten,
				status:status,
				ngaysinh:ns,
				gioitinh:gt,
				SDT:sdt,
				role:role
			})
 		
	  		$("#ModalUP .modal-body .row.info input[name='id']").val(id)	
 		})
    }); */

    
  </script>
  
</body>

</html>