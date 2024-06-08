var currentURL = window.location.protocol + "//" + window.location.host;
function formatCurrency(amount) {
	// Kiểm tra xem giá trị đầu vào có phải là số không
	if (typeof amount !== 'number') {
		return 'Invalid input';
	}

	// Chuyển đổi số thành chuỗi và ngược lại
	const formattedAmount = Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

	return formattedAmount;
}

function loadOrder(page,size) {
    var url = currentURL + "/api/order/selectOrder?page=" + page + "&size=" + size;
	fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(data => {	
		var html = "";
		data.forEach(item => {
			html += `<tr height="100px">`;
			var h1 = `<td width="350">`, h2 = `<td width="50">`;
			var cnt = 0;
			// item.listChiTietDonHang.forEach(ctdh => {
			// 	cnt++;
			// 	if(cnt > 0) {
			// 		h1 += `<br>`; h2 += `<br>`; 
			// 	}
			// 	h1 += ctdh.tenSach;
			// 	h2 += ctdh.soLuong;
			// })
			for(var key in item.listChiTietDonHang) {
				if (item.listChiTietDonHang.hasOwnProperty(key)) {
					var ctdh = item.listChiTietDonHang[key];
					console.log(ctdh);
					if(cnt > 0) {
						h1 += `<br>`; h2 += `<br>`; 
					}
					h1 += ctdh.tenSach;
					h2 += ctdh.soLuong;
					cnt++;
				  }
			}
            if(item.trangThai === "Đã hủy") {
                h1 += `<br>`;
                h1 += `<span style="color:red; font-size:16px">Lí do hủy: Hủy bởi nvql</span>`;
            }
            else if (item.trangThai === "Đang chờ xử lý trả hàng") {
                h1 += `<br>`;
                h1 += `<span style="color:red; font-size:16px">Lí do trả hàng: ${item.loiNhan}</span>`;
            }
			h1 += `</td>`; h2 += `</td>`;
			html += h1 + h2;
			html += `<td width="100">${item.tenNguoiNhan}</td>
			<td width="120">${item.diaChiGiaoHang}</td>
			<td width="100">${item.soDienThoai}</td>
			<td width="80">${formatCurrency(item.tongTien)}</td>`;
			if(item.trangThai === "Đang xử lý") {
				html += `<td class="status${item.id}"><span class="badge bg-warning">Chờ xác nhận</span></td>`;
				html += `<td class="action${item.id}"><button onclick="showConfirmDelete('${item.id}')" class="btn btn-primary btn-sm trash" type="button" title="Hủy đơn hàng"><i class="fa-solid fa-circle-xmark"></i></button>
				<button onclick="confirmOrder('${item.id}')" class="btn btn-primary btn-sm btn-confirm" type="button" title="Xác nhận"><i class="fa-solid fa-circle-check"></i></button>
				</td> </tr>  `;
			}		
			else if(item.trangThai === "Đã hủy") {
				html += `<td><span class="badge bg-danger">Đã hủy</span></td>`;
			}
			else if(item.trangThai === "Đã xác nhận") {
				console.log('Tt đã xác nhận');
				html += `<td class="status${item.id}"><span class="badge bg-success">Đã xác nhận</span></td>`;
				html += `<td class="action${item.id}"><button onclick="changeToShipping('${item.id}')" class="btn btn-primary btn-sm edit" type="button" title="Chuyển sang đang giao hàng" id="show-emp" data-toggle="modal"
                      data-target="#ModalUP"><i class="fa-solid fa-car-side"></i></button>
				</td> </tr>  `;
			}
            else if(item.trangThai === "Đang giao hàng") {
                html += `<td class="status${item.id}"><span class="badge bg-success">Đang giao hàng</span></td>`;
            }
            else if(item.trangThai === "Đang chờ xử lý trả hàng") {
                html += `<td class="status${item.id}"><span class="badge bg-warning">Yêu cầu trả hàng</span></td>`;
                html += `<td class="action${item.id}"><button onclick="refuseReturn('${item.id}')" class="btn btn-primary btn-sm trash" type="button" title="Hủy đơn hàng"><i class="fa-solid fa-circle-xmark"></i></button>
				<button onclick="confirmReturn('${item.id}')" class="btn btn-primary btn-sm btn-confirm" type="button" title="Xác nhận"><i class="fa-solid fa-circle-check"></i></button>
				</td> </tr>  `;
            }
		});

		document.querySelector('.main-row').innerHTML = html;
	})
}


function showConfirmDelete(id) {
    document.querySelector('.form-confirm ').classList.add("active");
    document.querySelector('.confirm-btn').addEventListener('click', () => {
        deleteOrder(id);
    });
}

function closeConfirmDelete() {
    document.querySelector('.form-confirm ').classList.remove("active");
}

function deleteOrder(id) {
    var url = currentURL + "/api/order/updateOrder?id=" +id + `&status=delete&message=${encodeURIComponent("Hủy bởi nvql")}`;
    console.log(url);
    fetch(url)
    .then(response => {
        closeConfirmDelete();
        document.querySelector(`.status${id}`).innerHTML = `<span class="badge bg-danger">Đã hủy</span>`;
		document.querySelector(`.action${id}`).innerHTML = "";
    })
}

function changeToShipping(id) {
    var url = currentURL + "/api/order/updateOrder?id=" +id + "&status=delivering";
    console.log(url);
    fetch(url)
    .then(response => {
        closeConfirmDelete();
        document.querySelector(`.status${id}`).innerHTML = `<span class="badge bg-success">Đang giao hàng</span>`;
		document.querySelector(`.action${id}`).innerHTML = "";
    })
}


function confirmOrder(id) {
	var url = currentURL + "/api/order/updateOrder?id=" +id + "&status=confirm";
	fetch(url)
    .then(response => {
        document.querySelector(`.status${id}`).innerHTML = `<span class="badge bg-success">Đã xác nhận</span>`;
		document.querySelector(`.action${id}`).innerHTML = `<button onclick="changeToShipping('${id}')" class="btn btn-primary btn-sm edit" type="button" title="Chuyển sang đang giao hàng" id="show-emp" data-toggle="modal"
                      data-target="#ModalUP"><i class="fa-solid fa-car-side"></i></button>`;
    })
} 

function refuseReturn(id) {
    var url = currentURL + "/api/order/updateOrder?id=" +id + "&status=refuseReturn";
	fetch(url)
    document.querySelector(`.status${id}`).innerHTML = `<span class="badge bg-danger">Từ chối trả hàng</span>`;
	document.querySelector(`.action${id}`).innerHTML = "";
}

function confirmReturn(id) {
    var url = currentURL + "/api/order/updateOrder?id=" +id + "&status=confirmReturn";
	fetch(url)
    document.querySelector(`.status${id}`).innerHTML = `<span class="badge bg-success">Xác nhận trả hàng</span>`;
	document.querySelector(`.action${id}`).innerHTML = "";
}




function changePage(page,size) {

    var url = currentURL + "/api/order/countAll";
    var totalPage = null;
    console.log(url);
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(data => {
        // data = data.parseInt;
        console.log("dữ liêu: " + data);
        
        if(data % size === 0) totalPage = data/size;
        else totalPage = Math.floor(data/size) + 1;

        
        loadOrder(page,size);
        // html phan trang
        var html = "";
        if(page === 1) {
            html += `<div class="pagination__item disable-paging">`;
        }
        else {
            html += `<div onclick="changePage(${page-1},${size})" class="pagination__item">`;
        }
        html += `<button class="button btnPrev">
            <svg class="btn__icon" fill="" height="800px" width="800px" version="1.1" id="Capa_1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 500 500" xml:space="preserve">
            <g>
                <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
            </g>
            </svg>
        </button>
        </div>`;
    
        if(totalPage <= 5) {
            for(var i=1;i<=totalPage;i++) {
                if(i === page) {
                    html += `<div class="pagination__item pagination__item--active">
                    <button class="button">${i}</button>
                  </div>`;
                }
                else {
                    html += `<div onclick="changePage(${i},${size})" class="pagination__item">
                    <button class="button">${i}</button>
                  </div>`;
                }
            }
        }
        else {
            if(page <= 3) {
              for(var i=1;i<=6;i++) {
                    if(i <= 4) {
                        if(i === page) {
                            html += `<div class="pagination__item pagination__item--active">
                            <button class="button">${i}</button>
                            </div>`;  
                        }
                        else {
                            html += `<div onclick="changePage(${i},${size})" class="pagination__item">
                            <button class="button">${i}</button>
                            </div>`;
                        }
                    }
                    else if(i == 5) {
                        html += `<div class="pagination__item">
                        <button class="button">...</button>
                        </div>`;
                    }
                    else {
                        html += `<div onclick="changePage(${totalPage},${size})" class="pagination__item">
                        <button class="button">${totalPage}</button>
                        </div>`;
                    }
              }  
            }
            else if(totalPage - page <=2) {
                html += `<div onclick="changePage(1,${size})" class="pagination__item">
                        <button class="button">1</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="button">...</button>
                        </div>`;
                for(var i=totalPage - 3;i<=totalPage;i++) {
                    if(i === page) {
                        html += `<div class="pagination__item pagination__item--active">
                        <button class="button">${i}</button>
                        </div>`;
                    }
                    else {
                        html += `<div onclick="changePage(${i},${size})" class="pagination__item">
                        <button class="button">${i}</button>
                        </div>`;
                    }
                }
            }
            else {
                html += `<div onclick="changePage(1,${size})" class="pagination__item">
                        <button class="button">1</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="button">...</button>
                        </div>`;
                html += `<div onclick="changePage(${page-1},${size})" class="pagination__item">
                        <button class="button">${page-1}</button>
                        </div>`;
                html += `<div class="pagination__item pagination__item--active">
                        <button class="button">${page}</button>
                        </div>`;
                html += `<div onclick="changePage(${page+1},${size})" class="pagination__item">
                        <button class="button">${page+1}</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="button">...</button>
                        </div>`;
                html += `<div onclick="changePage(${totalPage},${size})" class="pagination__item">
                        <button class="button">${totalPage}</button>
                        </div>`;
                }
        }
    
        if(totalPage === page ) {
            html += `<div class="pagination__item disable-paging">`;
        }
        else {
            html += `<div onclick="changePage(${page+1},${size})" class="pagination__item ">`;
        }
        html += `<button class="button btnNext">
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
        </div>`;
        document.querySelector(".pagination").innerHTML = html;
        // html phan trang nho o tren
        var html1 = "";
        if(page == 1) {
            html1 += `<button class="button btnPrev disable-paging">
            <svg class="btn__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" xml:space="preserve">
              <g>
                <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
              </g>
            </svg>
          </button>`;
        }
        else {
            html1 += `<button onclick="changePage(${page-1},${size})" class="button btnPrev">
            <svg class="btn__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" xml:space="preserve">
              <g>
                <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
              </g>
            </svg>
          </button>`;
        }

        html1 += `<div class="page__number">
        <div class="page__current">${page}</div>
        <div class="page__border">/</div>
        <div class="page__total">${totalPage}</div>
      </div>`;

      if(page == totalPage) {
            html1 += `<button class="button btnNext disable-paging">
            <svg class="btn__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" xml:space="preserve">
              <g>
                <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
                " />
              </g>
            </svg>
          </button>`;
      }
      else {
            html1 += `<button onclick="changePage(${page+1},${size})" class="button btnNext">
            <svg class="btn__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" xml:space="preserve">
            <g>
                <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
                " />
            </g>
            </svg>
        </button>`;
      }

     /* document.querySelector(".filter__page-controller").innerHTML = html1;*/
      var t1 = "inc";
      var t2 = "dec"
      var html2 = `<button onclick="showTextBySearch(${page},${size},'inc')" type="button" class="button btnFilter" id="ascPrice">Giá thấp đến cao</button>
      <button onclick="showTextBySearch(${page},${size},'dec')" type="button" class="button btnFilter" id="descPrice">Giá cao đến thấp</button>`;
     /* document.querySelector(".filter__group").innerHTML = html2;*/
    }) 
}