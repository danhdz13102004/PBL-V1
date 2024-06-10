package model;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
public class DiaChiGiaoHang {
	
	@Id
	@GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "DC"), 
      strategy = "model.MyIDGenerator")
	@Column(name="Id")
	private String id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_khach_hang")	
	private User khachHang;
	
	@Column(name = "Ten_nguoi_nhan")
	private String tenNguoiNhan;
	
	@Column(name = "So_dien_thoai")
	private String soDienThoai;
	
	@Column(name = "Dia_chi")
	private String diaChi;
	

	@Column(name = "Trang_thai")
	Boolean status = false;
	
	
	public DiaChiGiaoHang()
	{
		
	}
	
	
	
	public DiaChiGiaoHang(User khachHang, String tenNguoiNhan, String soDienThoai, String diaChi) {
		super();
		this.khachHang = khachHang;
		this.tenNguoiNhan = tenNguoiNhan;
		this.soDienThoai = soDienThoai;
		this.diaChi = diaChi;
	}



	public String getId()
	{
		return this.id;
	}
	
	public void setId(String id)
	{
		this.id=id;
	}
	public User getKhachHang()
	{
		return this.khachHang;
	}
	public void setKhachHang(User khachHang)
	{
		this.khachHang = khachHang;
	}
	
	public String getDiaChi()
	{
		return this.diaChi;
	}
	
	public void setDiaChi(String diaChi)
	{
		this.diaChi = diaChi;
	}



	public String getTenNguoiNhan() {
		return tenNguoiNhan;
	}



	public void setTenNguoiNhan(String tenNguoiNhan) {
		this.tenNguoiNhan = tenNguoiNhan;
	}



	public String getSoDienThoai() {
		return soDienThoai;
	}



	public void setSoDienThoai(String soDienThoai) {
		this.soDienThoai = soDienThoai;
	}
	
	public boolean isStatus()
    {
        return this.status;
    }

    public void setStatus(boolean status)
    {
        this.status = status;
    }
	
}
