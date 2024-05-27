package modelApi;

public class DoanhThuTuan {
	String tenNgay;
	Double doanhThuTuanTruoc = 0.0;
	Double doanhThuTuanNay = 0.0;
	public DoanhThuTuan() {

	}
	
	
	
	public DoanhThuTuan(String tenNgay) {
		super();
		this.tenNgay = tenNgay;
	}



	public DoanhThuTuan(String tenNgay, Double doanhThuTuanTruoc, Double doanhThuTuanNay) {

		this.tenNgay = tenNgay;
		this.doanhThuTuanTruoc = doanhThuTuanTruoc;
		this.doanhThuTuanNay = doanhThuTuanNay;
	}



	public String getTenNgay() {
		return tenNgay;
	}



	public void setTenNgay(String tenNgay) {
		this.tenNgay = tenNgay;
	}



	public Double getDoanhThuTuanTruoc() {
		return doanhThuTuanTruoc;
	}



	public void setDoanhThuTuanTruoc(Double doanhThuTuanTruoc) {
		this.doanhThuTuanTruoc = doanhThuTuanTruoc;
	}



	public Double getDoanhThuTuanNay() {
		return doanhThuTuanNay;
	}



	public void setDoanhThuTuanNay(Double doanhThuTuanNay) {
		this.doanhThuTuanNay = doanhThuTuanNay;
	}
	
	
	
	
}
