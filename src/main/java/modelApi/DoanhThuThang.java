package modelApi;

public class DoanhThuThang {
	String tenThang;
	Double doanhThu = 0.0;
	public DoanhThuThang() {
		
	}
	
	
	
	public DoanhThuThang(String tenThang) {
		this.tenThang = tenThang;
	}



	public DoanhThuThang(String tenThang, Double doanhThu) {
		this.tenThang = tenThang;
		this.doanhThu = doanhThu;
	}


	public String getTenThang() {
		return tenThang;
	}
	public void setTenThang(String tenThang) {
		this.tenThang = tenThang;
	}
	public Double getDoanhThu() {
		return doanhThu;
	}
	public void setDoanhThu(Double doanhThu) {
		this.doanhThu = doanhThu;
	}
	
	
}
