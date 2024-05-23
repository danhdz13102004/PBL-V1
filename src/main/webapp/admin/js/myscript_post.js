var currentURL = window.location.protocol + "//" + window.location.host;
var saveButton = document.querySelector('.btn.btn-save')
function insertUser(){
	var ten = document.querySelector('input[for="ten"]').value 
	var email = document.querySelector('input[for="email"]').value 
	var matKhau = document.querySelector('input[for="matKhau"]').value 
	var SDT = document.querySelector('input[for="SDT"]').value 
	var ngaysinh = document.querySelector('input[for="ngaySinh"]').value 
	var gt = document.querySelector('select[for="gioiTinh"]').value 
	var gioitinh = null
	if (gt==='true') gioitinh = true
	else if (gt==='false') gioitinh=false
	var role = document.querySelector('select[for="role"]').value 
	var status = document.querySelector('select[for="status"]').value 
	var object = {
		ten:ten,
		email:email,
		matKhau:matKhau,
		SDT:SDT,
		ngaySinh:ngaysinh,
		gioiTinh:gioitinh,
		role:role, 
		status:status
	}
	console.log(object)
	var url = `${currentURL}/api/admin`
	fetch(url,{
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body: JSON.stringify(object)
	})
}
saveButton.addEventListener('click',insertUser)