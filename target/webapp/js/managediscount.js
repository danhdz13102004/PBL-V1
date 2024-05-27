var currentURL = window.location.protocol + "//" + window.location.host;

function convertDateFormat(dateStr) {
    var parts = dateStr.split('/');
    if (parts.length !== 3) {
        throw new Error("Invalid date format. Please use DD/MM/YYYY.");
    }
    var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
    return formattedDate;
}

function convertDateShow(dateStr) {
    var parts = dateStr.split('/');
    if (parts.length !== 3) {
        throw new Error("Invalid date format. Please use DD/MM/YYYY.");
    }
    var formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0];
    return formattedDate;
}

function showEdit(id) {
    document.querySelector('.inp-id-update').value = id;
    var name = document.querySelector(`.text-name${id}`);
    var start =  document.querySelector(`.text-start${id}`);
    var end = document.querySelector(`.text-end${id}`);
    var discount = document.querySelector(`.text-discount${id}`);
    console.log(name,start,end,discount);

    document.querySelector('.inp-name').value = name.innerText;
    document.querySelector('.inp-start').value = convertDateFormat(start.innerText);
    document.querySelector('.inp-end').value = convertDateFormat(end.innerText);
    document.querySelector('.inp-discount').value = discount.innerText.slice(0, -1);
}

function confirmEdit() {
    var id = document.querySelector('.inp-id-update').value;
    var name = document.querySelector('.inp-name').value;
    var start = document.querySelector('.inp-start').value;
    var end = document.querySelector('.inp-end').value;
    var discount = document.querySelector('.inp-discount').value;
    var url = currentURL + `/api/nvql/updateDiscount?id=${id}&name=${encodeURIComponent(name)}&start=${start}&end=${end}&discount=${discount}`;
    console.log(url);
    fetch(url);
    document.querySelector(`.text-name${id}`).innerText = name;
    document.querySelector(`.text-start${id}`).innerText = start;
    document.querySelector(`.text-end${id}`).innerText = end;
    document.querySelector(`.text-discount${id}`).innerText = discount + "%";
    document.querySelector('.btn-cancel-update').click();
}
 
function loadDiscount(page,size) {
    var  txt = document.querySelector('.header-search-bar__input-field').value;
    var url = currentURL + `/api/nvql/selectDiscount?page=${page}&size=${size}`;
    if(txt !== "") url += `&txt=${txt}`;
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
            html += `<tr>
            <td class="text-name${item.id}">${item.name}</td>
            <td class="text-start${item.id}">${item.start}</td>
            <td class="text-end${item.id}">${item.end}</td>
            <td><span class="badge bg-success text-discount${item.id}">${item.mucGiam}%</span></td>
            <td><button onclick="showConfirmDelete('${item.id}')" class="btn btn-primary btn-sm trash" type="button" title="Xóa"
                    onclick="myFunction(this)"><i class="fas fa-trash-alt"></i> 
                </button>
                <button onclick="showEdit('${item.id}')" class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp" data-toggle="modal"
                      data-target="#ModalUP"><i class="fas fa-edit"></i></button>
               
            </td>
        </tr>`;
        })
        var body = document.querySelector('.main-body');
        body.innerHTML = html;
    })
}


function changePage(page,size) {
    var  txt = document.querySelector('.header-search-bar__input-field').value;
    var url = currentURL + "/api/nvql/countDiscount?txt=" + txt;
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

        
        loadDiscount(page,size);
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
        console.log(html);
        document.querySelector(".my-pagination").innerHTML = html;
        console.log( document.querySelector(".my-pagination"));
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
    document.querySelector('.form-confirm').style.display = 'flex';
    document.querySelector('.inp-id-delete').value =  id;

}

function closeConfirmDelete() {
    document.querySelector('.form-confirm').style.display = 'none';
}

function confirmToDelete() {
    var id = document.querySelector('.inp-id-delete').value;
    var url = currentURL + "/api/nvql/deleteDiscount?id=" + id;
    console.log(url);
    fetch(url)
    .then(response => {
        loadDiscount(1,5);
        closeConfirmDelete();       
    })
    
}