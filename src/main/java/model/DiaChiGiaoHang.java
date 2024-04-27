package model;

import javax.persistence.*;

@Entity
public class DiaChiGiaoHang {
	
	@Id
	@Column(name="Id")
	private String id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_khach_hang")	
	private User khachHang;
	
	@Column(name = "Dia_chi")
	private String diaChi;
	
	public DiaChiGiaoHang()
	{
		
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
}
