// (function () {
// 	"use strict";

// 	var treeviewMenu = $('.app-menu');

// 	// Toggle Sidebar
// 	$('[data-toggle="sidebar"]').click(function(event) {
// 		event.preventDefault();
// 		$('.app').toggleClass('sidenav-toggled');
// 	});

// 	// Activate sidebar treeview toggle
// 	$("[data-toggle='treeview']").click(function(event) {
// 		event.preventDefault();
// 		if(!$(this).parent().hasClass('is-expanded')) {
// 			treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
// 		}
// 		$(this).parent().toggleClass('is-expanded');
// 	});

// 	// Set initial active toggle
// 	$("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

// 	//Activate bootstrip tooltips
// 	/*$("[data-toggle='tooltip']").tooltip();*/

// })();

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


function showTextBySearch(page,size,select = "none") {
    var text = document.querySelector(".header-search-bar__input-field").value;
    var url = currentURL + `/api/user/selectByText?page=${page}&size=${size}`;

    if(text !== null) {
        url += `&txt=${text}`;
    }

    if(select !== "none") {
        url += "&reload=true"
    }
    console.log(url);

    // console.log(url);
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(data => {
        var cnt = 0;
        // html show sach ra giao dien
        var html = "";
        data.forEach(item => {
            html += `
            <tr>
                                    <td>${item.ten}</td>
                                    <td><img src="${item.urlImage}" alt="" width="100px;"></td>
                                    <td>${item.soLuongNhap - item.soLuongBan}</td>
                                    <td>${formatCurrency(item.giaBan)}</td>
                                    <td>${item.theLoai.tenTheLoai}</td>
                                    <td><button class="btn btn-primary btn-sm trash" type="button" title="Xóa"
                                          onclick="showConfirmDelete('${item.id}')" ><i class="fas fa-trash-alt"></i> 
                                        </button>
                                        <a href="${currentURL}/nvql-controller/editProduct?id=${item.id}" class="btn btn-primary btn-sm edit" type="button" title="Sửa"><i style="color: rgb(245 157 57);" class="fas fa-edit"></i></a>
                                       
                                    </td>
            						</tr>
            `;
        })
        var container = document.querySelector(".main-contain").innerHTML = html;
    })
}



function showCategory(id = "none") {
    var url = currentURL + "/api/nvql/getTheLoaiSach";
    console.log(url);
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(data => {
        var html = "";
        if(id === "none") {
            html += `<option value="0"> -- Chọn thể loại -- </option>`
        }
        data.forEach(item => {
            // console.log(item.id.toString() === id.toString());
            if(item.id.toString() === id.toString()) {
                html = `<option value="${item.id}" "> ${item.ten} </option>` + html;
            }
            else {
                html += `<option value="${item.id}"> ${item.ten} </option>`;
            }
        })
        console.log(html);
        document.querySelector("#selectCategory").innerHTML = html;
    })
}

function showAuthor(id = "none") {
    var url = currentURL + "/api/nvql/getTacGia";
    console.log(url);
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(data => {
        var html = "";
        if(id === "none") {
            html += `<option value="0"> -- Chọn tác giả -- </option>`
        }
        data.forEach(item => {
            console.log(id);
            if(item.id.toString() === id.toString()) {
                html = `<option value="${item.id}" "> ${item.ten} </option>` + html;
            }
            else {
            html += `<option value="${item.id}"> ${item.ten} </option>`;
            }
        })
        document.querySelector("#selectAuthor").innerHTML = html;
    })
}

function showProducer(id = "none") {
    var url = currentURL + "/api/nvql/getNhaXuatBan";
    console.log(url);
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(data => {
        var html = "";
        if(id === "none") {
            html += `<option value="0"> -- Chọn nhà xuất bản -- </option>`
        }
        data.forEach(item => {
            if(item.id.toString() === id.toString()) {
                html = `<option value="${item.id}" "> ${item.ten} </option>` + html;
            }
            else {
                html += `<option value="${item.id}"> ${item.ten} </option>`;
            }
        })
        document.querySelector("#selectProducer").innerHTML = html;
    })
}

function submitButtonFunc(buttonid) {
    var btn = document.querySelector(`#btn-submit`);
    btn.click();
}

function onchangeInput(id,element) {
    document.querySelector(id).value = element.value;
}

function onchangeSelect(id,element) {
    var selectedValue = element.options[element.selectedIndex].value;
    document.querySelector(id).value = selectedValue;
}

function changePage(page,size,text = "none") {
    // if(text === "search") {
    //     var currentUrl = window.location.href;
    //     console.log(currentUrl);
    //     console.log(currentURL !== `${currentURL}/home`);
    //     if(currentURL !== `${currentURL}/home` || currentURL !== `${currentURL}/khach-hang/dang-nhap`) {
    //         var text = document.querySelector(".header-search-bar__input-field").value;
    //         window.location.href = `${currentURL}/home?text=${text}`;
    //     }
    //     document.querySelector(".current-category").value = 0;
    // }   
    // else if(id !== "id") {
    //     document.querySelector(".current-category").value = id;
    // }
    var val = document.querySelector(".header-search-bar__input-field").value;
    // var val_category = parseInt(document.querySelector(".current-category").value);
    if(val === undefined || val === null) val = "";
    var url = currentURL + "/api/user/countNumber?txt=" + val;
    // if(val_category !== 0) {
    //     url = currentURL + `/api/user/countNumberByCategory?id=${val_category}`;
    // }
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

        
        // console.log("val-cate: " + val_category);
        if(text !== "none") showTextBySearch(page,size,text);
        else showTextBySearch(page,size,text);
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




function showConfirmDelete(id) {
    document.querySelector('.form-confirm ').classList.add("active");
    document.querySelector('.confirm-btn').addEventListener('click', () => {
        deleteItem(id);
    });
}

function closeConfirmDelete() {
    document.querySelector('.form-confirm ').classList.remove("active");
}

function deleteItem(id) {
    var url = currentURL + "/api/nvql/deleteSach?id=" +id;
    console.log(url);
    fetch(url)
    .then(response => {
        closeConfirmDelete();
        var divElement = document.querySelector(".pagination__item--active");

    // Lấy giá trị của button trong thẻ div
        var buttonValue = divElement.querySelector(".button").textContent;

        console.log("Page:",parseInt(buttonValue));
        changePage(parseInt(buttonValue),10,"true");
    })
}



var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

let monthArr = [];
let revenueArr = [];





async function fetchDataOfWeek() {
      const url = currentURL + "/api/nvql/getDoanhThuTuan";
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error("Lỗi khi lấy dữ liệu từ URL");
          }
          const data = await response.json();
          
          let dayOfWeelArr = [];
          let revenueBefore = [];
          let revenueCurrent = [];
          data.forEach(item => {
        	  dayOfWeelArr.push(item.tenNgay),
        	  revenueBefore.push(item.doanhThuTuanTruoc),
        	  revenueCurrent.push(item.doanhThuTuanNay)
          });

          new Chart("ChartWeek", {
        	  type: "bar",
        	  data: {
        	    labels: dayOfWeelArr,
        	    datasets: [{
        	      label: "Tuần trước",
        	      backgroundColor: "#b2c2d3",
        	      data: revenueBefore
        	    },
        	    {
        	      label: "Tuần này",
        	      backgroundColor: "#007bff",
        	      data: revenueCurrent
        	    }
        	    ]
        	  },
        	  options: {
        	    legend: {display: true},
        	    title: {
        	      display: true,
        	      text: "Doanh thu theo tuần"
        	    }
        	  }
        	});
      } catch (error) {
          console.error("Error fetching data: ", error);
      }
  }
  
   async function fetchDataOfMonth() {
      const url = currentURL + "/api/nvql/getDoanhThuThang";
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error("Lỗi khi lấy dữ liệu từ URL");
          }
          const data = await response.json();
          
          let monthArr = [];
          let revenueArr = [];
          data.forEach(item => {
              monthArr.push(item.tenThang);
              revenueArr.push(item.doanhThu);
          });

          new Chart("ChartMonth", {
              type: "bar",
              data: {
                labels: monthArr,
                datasets: [{
                  backgroundColor: "#0396ff",
                  data: revenueArr
                }]
              },
              options: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Doanh thu theo tháng"
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true // Ensure the y-axis starts at 0
                      }
                    }]
                  }
                }
            });
      } catch (error) {
          console.error("Error fetching data: ", error);
      }
  }

  async function fetchDataOfDay() {
      const url = currentURL + "/api/nvql/getDoanhThuNgay";
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error("Lỗi khi lấy dữ liệu từ URL");
          }
          const data = await response.json();
          
          let monthArr = [];
          let revenueArr = [];
          data.forEach(item => {
              monthArr.push(item.tenThang);
              revenueArr.push(item.doanhThu);
          });

          new Chart("ChartDay", {
        	  type: "line",
        	  data: {
        	    labels: monthArr,
        	    datasets: [{
        	      fill: false,
        	      lineTension: 0,
        	      backgroundColor: "rgba(0,0,255,1.0)",
        	      borderColor: "#0396ff",
        	      data: revenueArr
        	    }]
        	  },
        	  options: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Doanh thu theo ngày"
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true // Ensure the y-axis starts at 0
                      }
                    }]
                  }
                }
        	});
      } catch (error) {
          console.error("Error fetching data: ", error);
      }
  } 
  
 function changeChart() {
	 var selectedValue = document.getElementById("mySelect").value;
	 var element = document.querySelector(".contain-chart");
	 if(selectedValue === "1") {
		 element.innerHTML = `<canvas class="embed-responsive-item" id="ChartDay"></canvas>`;
		 fetchDataOfDay();
	 }
	 else if(selectedValue === "2") {
		 element.innerHTML = `<canvas class="embed-responsive-item" id="ChartWeek"></canvas>`;
		 fetchDataOfWeek();
	 }
	 else if(selectedValue === "3") {
		 element.innerHTML = `<canvas class="embed-responsive-item" id="ChartMonth"></canvas>`;
		 fetchDataOfMonth();
	 }
 }
  

 function addAuthor() {
    var name = document.querySelector('.inp-author').value;
    if(name.toString().length === 0) {
        document.querySelector('.btn-cancel1').click();
        return;
    }
    var url = currentURL + `/api/nvql/addTacGia?name=${encodeURIComponent(name)}`;
    fetch(url)
    .then(response => {
      showAuthor();
      document.querySelector('.btn-cancel1').click();
    })
}

function addCategory() {
    var name = document.querySelector('.inp-category').value;
    if(name.toString().length === 0){
        document.querySelector('.btn-cancel2').click();
        return;
    } 
    var url = currentURL + `/api/nvql/addTheLoaiSach?name=${encodeURIComponent(name)}`;
    fetch(url)
    .then(response => {
      showCategory();
      document.querySelector('.btn-cancel2').click();
    })
}

function addProducer() {
    var name = document.querySelector('.inp-producer').value;
    if(name.toString().length === 0){
        document.querySelector('.btn-cancel3').click();
        return;
    } 
    var url = currentURL + `/api/nvql/addNhaXuatBan?name=${encodeURIComponent(name)}`;
    fetch(url)
    .then(response => {
      showProducer();
      document.querySelector('.btn-cancel3').click();
    })
}


function addNewDisCount() {
    var name = document.querySelector('.inp-name').value;
    var start = document.querySelector('.inp-start').value;
    var end = document.querySelector('.inp-end').value;
    var percent = document.querySelector('.inp-percent').value;

    var author = document.querySelector('#selectAuthor');
    console.log(author);
    var selectedIndex = author.selectedIndex;
    var authorText = author.options[selectedIndex].value;

    var category = document.querySelector('#selectCategory');
    var selectedIndex1 = category.selectedIndex;
    var categoryText = category.options[selectedIndex1].value;
    console.log(category);

    var producer = document.querySelector('#selectProducer');
    var selectedIndex2 = producer.selectedIndex;
    var producerText = producer.options[selectedIndex2].value;
    console.log(producer);

    console.log(name,start,end,percent,authorText,categoryText,producerText);

    var url = currentURL + `/api/nvql/addNewDiscount?name=${encodeURIComponent(name)}&starttime=${start}&endtime=${end}&percent=${percent}&category=${categoryText}&author=${authorText}&producer=${producerText}`;
    console.log(url);
    fetch(url); 
    window.location.href = currentURL + "/nvql/manageDiscount.jsp";
}