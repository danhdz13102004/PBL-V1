var currentURL = window.location.protocol + "//" + window.location.host;
var searchButton = document.querySelector(".searchFilter__item .searchFilter__item__button")
var maybeUpdateOb
var CRITERIA
const PAGE_SIZE=2
var preBtn = document.querySelector('#pagination .btn.pre_btn')
var nextBtn = document.querySelector('#pagination .btn.next_btn')
function showModal (e) {
		var tr = e.target.closest('tr')
		maybeUpdateOb = tr
		var tds = tr.children
		var id = tds[1].innerHTML
		var ten = tds[2].innerHTML
		var email = tds[3].innerHTML
		var ns = tds[4].innerHTML
		var gt = (tds[5].innerHTML==='Nam')?'true':'false'
		var sdt = tds[6].innerHTML
		var role = tds[7].innerHTML
		var status = tds[8].innerHTML
		console.log({
			id:id,
			ten:ten,
			email:email,
			status:status,
			ngaysinh:ns,
			gioitinh:gt,
			SDT:sdt,
			role:role
		})
		document.querySelector('#ModalUP .modal-body .row.info input[name="id"]').value=id
		document.querySelector('#ModalUP .modal-body .row.info input[name="ten"]').value=ten
		document.querySelector('#ModalUP .modal-body .row.info input[name="sdt"]').value=sdt
		document.querySelector('#ModalUP .modal-body .row.info input[name="email"]').value=email
		document.querySelector('#ModalUP .modal-body .row.info input[name="ngaysinh"]').value=ns
		document.querySelector(`#ModalUP .modal-body .row.info select[name="role"] option[value=${role}]`).selected = true
		document.querySelector(`#ModalUP .modal-body .row.info select[name="gioitinh"] option[value=${gt}]`).selected = true
		document.querySelector(`#ModalUP .modal-body .row.info select[name="status"] option[value=${status}]`).selected = true
	  	
}
function deleteRow(r) {
	var id = [r.parentNode.parentNode.children[1].innerHTML]
 	
	var url = `${currentURL}/api/admin`
  	fetch(url,{
		method:'DELETE',
		headers:{
			'Content-Type':'application/json'
		},
		body: JSON.stringify(id)
	}).then((response)=>{
		if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
		var i = r.parentNode.parentNode.rowIndex;
  		document.getElementById("sampleTable").deleteRow(i);
	})
}
function update()
{
	var id = document.querySelector('#ModalUP .modal-body .row.info input[name="id"]').value
	var ten = document.querySelector('#ModalUP .modal-body .row.info input[name="ten"]').value
	var SDT = document.querySelector('#ModalUP .modal-body .row.info input[name="sdt"]').value
	var email = document.querySelector('#ModalUP .modal-body .row.info input[name="email"]').value
	var ngaysinh = document.querySelector('#ModalUP .modal-body .row.info input[name="ngaysinh"]').value
	var role = document.querySelector(`#ModalUP .modal-body .row.info select[name="role"]`).value
	var gt = document.querySelector(`#ModalUP .modal-body .row.info select[name="gioitinh"]`).value
	var gioitinh = null
	if (gt==='true') gioitinh = true
	else if (gt==='false') gioitinh=false
	var status = document.querySelector(`#ModalUP .modal-body .row.info select[name="status"]`).value
	var object = {
		id:id,
		ten:ten,
		email:email,
		SDT:SDT,
		ngaySinh:ngaysinh,
		gioiTinh:gioitinh,
		role:role, 
		status:status
	}
	console.log(object)
	var url = `${currentURL}/api/admin`
	fetch(url,{
		method:'PUT',
		headers:{
			'Content-Type':'application/json'
		},
		body: JSON.stringify(object)
	}).then((response)=>{
		if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        maybeUpdateOb.innerHTML = 
        `
        	<td width="10"><input type="checkbox" value=${id} onchange=></td>
            <td>${id}</td>
            <td>${ten}</td>
            <td>${email}</td>
            <td>${ngaysinh}</td>
            <td>${gioitinh?'Nam':'Nữ'}</td>
            <td>${SDT}</td>
            <td>${role}</td>
            <td>${status}</td>
            <td><button class="btn btn-primary btn-sm trash" type="button" title="Xóa"
                onclick="deleteRow(this)"><i class="fas fa-trash-alt"></i>
            </button>
            <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp"
                data-toggle="modal" data-target="#ModalUP" onclick="showModal(event)"><i class="fas fa-edit"></i>
            </button>
            </td>
        `
        document.querySelector(".btn.btn-cancel").click()
	})
}
// search
function searchByCriteria(criteria, page, size)
{
    var url=`${currentURL}/api/admin?SDT=${criteria.SDT}&ten=${criteria.ten}&email=${criteria.email}&gioitinh=${criteria.gioitinh}&role=${criteria.role}&status=${criteria.status}&curPage=${page}&size=${size}`
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(items =>{
		console.log(items)
        var html ='';
        items.forEach(item=>{
			html+=
            `
            <tr>
                <td width="10"><input type="checkbox" value=${item.id}></td>
                <td>${item.id}</td>
                <td>${item.ten}</td>
                <td>${item.email}</td>
                <td>${item.ngaySinh}</td>
                <td>${item.gioiTinh?'Nam':'Nữ'}</td>
                <td>${item.SDT}</td>
                <td>${item.role}</td>
                <td>${item.status}</td>
                <td><button class="btn btn-primary btn-sm trash" type="button" title="Xóa"
                    onclick="deleteRow(this)"><i class="fas fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp"
                    data-toggle="modal" data-target="#ModalUP" onclick="showModal(event)"><i class="fas fa-edit"></i>
                </button>
                </td>
            </tr>
            `
        });
        document.querySelector('#sampleTable tbody').innerHTML = html;
    })

}
function setBottomPagination(page, totalPage)
{
	var html=''
		html +=`<div onclick="changePage(${page-1},${PAGE_SIZE})" class="pagination__item">
            		<button class='bottom_button pre_btn'><i class='bx bx-chevron-left'></i></button>
            	</div>`
		if(totalPage <= 5) {
            for(var i=1;i<=totalPage;i++) {
                if(i === page) {
                    html += `<div class="pagination__item pagination__item--active">
                    <button class="bottom_button">${i}</button>
                  </div>`;
                }
                else {
                    html += `<div onclick="changePage(${i},${PAGE_SIZE})" class="pagination__item">
                    <button class="bottom_button">${i}</button>
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
                            <button class="bottom_button">${i}</button>
                            </div>`;  
                        }
                        else {
                            html += `<div onclick="changePage(${i},${PAGE_SIZE})" class="pagination__item">
                            <button class="bottom_button">${i}</button>
                            </div>`;
                        }
                    }
                    else if(i == 5) {
                        html += `<div class="pagination__item">
                        <button class="bottom_button">...</button>
                        </div>`;
                    }
                    else {
                        html += `<div onclick="changePage(${totalPage},${PAGE_SIZE})" class="pagination__item">
                        <button class="bottom_button">${totalPage}</button>
                        </div>`;
                    }
              }  
            }
            else if(totalPage - page <=2) {
                html += `<div onclick="changePage(1,${PAGE_SIZE})" class="pagination__item">
                        <button class="bottom_button">1</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="bottom_button">...</button>
                        </div>`;
                for(var i=totalPage - 3;i<=totalPage;i++) {
                    if(i === page) {
                        html += `<div class="pagination__item pagination__item--active">
                        <button class="bottom_button">${i}</button>
                        </div>`;
                    }
                    else {
                        html += `<div onclick="changePage(${i},${PAGE_SIZE})" class="pagination__item">
                        <button class="bottom_button">${i}</button>
                        </div>`;
                    }
                }
            }
            else {
                html += `<div onclick="changePage(1,${PAGE_SIZE})" class="pagination__item">
                        <button class="bottom_button">1</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="bottom_button">...</button>
                        </div>`;
                html += `<div onclick="changePage(${page-1},${PAGE_SIZE})" class="pagination__item">
                        <button class="bottom_button">${page-1}</button>
                        </div>`;
                html += `<div class="pagination__item pagination__item--active">
                        <button class="bottom_button">${page}</button>
                        </div>`;
                html += `<div onclick="changePage(${page+1},${PAGE_SIZE})" class="pagination__item">
                        <button class="bottom_button">${page+1}</button>
                        </div>`;
                html += `<div class="pagination__item">
                        <button class="bottom_button">...</button>
                        </div>`;
                html += `<div onclick="changePage(${totalPage},${PAGE_SIZE})" class="pagination__item">
                        <button class="bottom_button">${totalPage}</button>
                        </div>`;
                }
        }
		html+=`<div onclick="changePage(${page+1},${PAGE_SIZE})" class="pagination__item">
            		<button class='bottom_button next_btn'><i class='bx bx-chevron-right'></i></button>
            	</div>`
        document.querySelector('#pagination_bottom').innerHTML = html
}
searchButton.addEventListener('click',()=>{
    var name = document.querySelector('.searchFilter__item__value[for="name"]')
    var status = document.querySelector('.searchFilter__item__value[for="status"]')
    var gioitinh = document.querySelector('.searchFilter__item__value[for="gioitinh"]')
    var sdt = document.querySelector('.searchFilter__item__value[for="sdt"]')
    var role = document.querySelector('.searchFilter__item__value[for="role"]')
    CRITERIA= {
        ten:name.value,
        status:status.value,
        gioitinh:gioitinh.value,
        SDT:sdt.value,
        role:role.value,
        status:status.value,
        email:""
    }
    console.log(CRITERIA)
    var totalPage;
    var url=`${currentURL}/api/admin/count?SDT=${CRITERIA.SDT}&ten=${CRITERIA.ten}&email=${CRITERIA.email}&gioitinh=${CRITERIA.gioitinh}&role=${CRITERIA.role}&status=${CRITERIA.status}`
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
        return response.json();
    })
    .then(cnt=>{
		totalPage = Math.ceil(parseInt(cnt,10)/PAGE_SIZE)
		console.log(cnt)
		if (totalPage!=0)
		{
			document.querySelector('#pagination').style.display = 'flex';
			document.querySelector('#pagination_bottom').style.display = 'flex';
			setBottomPagination(1,totalPage)
			document.querySelector('#pagination .cur_page').innerHTML = 1;
			document.querySelector('#pagination .total_page').innerHTML = totalPage;
		}
		else{
			document.querySelector('#pagination').style.display = 'none';
			document.querySelector('#pagination_bottom').style.display = 'none';
		}
		searchByCriteria(CRITERIA,1,PAGE_SIZE)
	})
    
})
function checkAll(isChecked)
{
	var cbs = document.querySelectorAll("input[type='checkbox']")
	cbs.forEach((item)=>{
		item.checked = isChecked
	})
}
function deleteAll()
{
	
	var ids=[]
	var cbs = document.querySelectorAll("input[value]")
	cbs.forEach((item)=>{
		if (item.checked)
			ids.push(item.value);
	})
	console.log(ids);
	var url = `${currentURL}/api/admin`
  	fetch(url,{
		method:'DELETE',
		headers:{
			'Content-Type':'application/json'
		},
		body: JSON.stringify(ids)
	}).then((response)=>{
		if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ URL");
        }
		searchButton.click();
		document.querySelector('th input[id="all"]').checked=false;
	})
}
function changePage(page, size)
{
	var totalPage = document.querySelector('#pagination .total_page').innerHTML
	if (page>=1 && page<=totalPage)
	{		
	    document.querySelector('#pagination .cur_page').innerHTML = page;
		searchByCriteria(CRITERIA,page,size)
		setBottomPagination(page,totalPage)
		document.querySelector('th input[id="all"]').checked=false;
		
	}
}
preBtn.addEventListener('click',()=>{
	var curPage = document.querySelector('#pagination .cur_page').innerHTML
	changePage(parseInt(curPage,10)-1,PAGE_SIZE)
})
nextBtn.addEventListener('click',()=>{
	var curPage = document.querySelector('#pagination .cur_page').innerHTML
	changePage(parseInt(curPage,10)+1,PAGE_SIZE)
})

