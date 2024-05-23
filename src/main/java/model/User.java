package model;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
@Table(name = "NguoiDung")
public class User {
	@Id
	@GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "US"), 
      strategy = "model.MyIDGenerator")
	@Column(name = "Id")
	private String id;
	
	@Column(name = "Ten")
	private String ten;
	
	@Column(length = 10)
	private String SDT;
	
	@Column(name = "Email")
	private String email;
	
	@Column(name = "Mat_khau")
	private String matKhau;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "Vai_tro")
	private Role role;
	
	@Column(name = "Gioi_tinh")
	private boolean gioiTinh;
	
	@Column(name = "Ngay_sinh")
	private Timestamp ngaySinh;
	
	@Column(name = "Ma_xac_thuc")
	private String maXacThuc;
	
	
	@Enumerated(EnumType.STRING)
	@Column(name = "Trang_thai")
	private Status status;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "khachHang", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<DiaChiGiaoHang> listDiaChi;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "khachHang", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DanhGia> listDanhGia;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "khachHang", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietGioHang> listChiTietGioHang;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "khachHang", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DonHang> listDonHang;
	
	public User() {
		
	}
	
	

	public User(String id, String ten, String sDT, String email, String matKhau, Role role, String maXacThuc,
			Status status) {
		super();
		this.id = id;
		this.ten = ten;
		this.SDT = sDT;
		this.email = email;
		this.matKhau = matKhau;
		this.role = role;
		this.maXacThuc = maXacThuc;
		this.status = status;
	}



	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public String getSDT() {
		return this.SDT;
	}

	public void setSDT(String sdt) {
		this.SDT = sdt;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMatKhau() {
		return matKhau;
	}

	public void setMatKhau(String mk) {
		this.matKhau = mk;
	}

	public Role getRole() {
		return this.role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public boolean isGioiTinh() {
		return this.gioiTinh;
	}

	public void setGioiTinh(boolean gt) {
		this.gioiTinh = gt;
	}
	
	public Timestamp getNgaySinh() {
		return this.ngaySinh;
	}

	public void setNgaySinh(Timestamp ns) {
		this.ngaySinh = ns;
	}
	public String getMaXacThuc() {
		return maXacThuc;
	}

	public void setMaXacThuc(String maXacThuc) {
		this.maXacThuc = maXacThuc;
	}

	public Status getStatus() {
		return this.status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	public void setDiaChiGiaoHang(List<DiaChiGiaoHang> list)
	{
		if (this.role == Role.KH)
		{
			this.listDiaChi = list;
		}
	}
	public void setListDanhGia(List<DanhGia> list)
	{
		if (this.role == Role.KH)
		{
			this.listDanhGia = list;
		}
	}
	public void setListDonHang(List<DonHang> list)
	{
		if (this.role == Role.KH)
		{
			this.listDonHang = list;
		}
	}
	public void setChiTietGioHang(List<ChiTietGioHang> list)
	{
		if (this.role == Role.KH)
		{
			this.listChiTietGioHang = list;
		}
	}
	public List<DiaChiGiaoHang> getDiaChiGiaoHang() {
		if (this.role == Role.KH)
		{
			return this.listDiaChi;
		}
		return null;
	}
	
	public List<DanhGia> getlistDanhGia()
    {
		if (this.role == Role.KH)
		{
			return this.listDanhGia;
		}
		return null;
    }
	public List<ChiTietGioHang> getChiTietGioHang() {
		if (this.role == Role.KH)
		{
			return this.listChiTietGioHang;
		}
		return null;
	}
	
	public List<DonHang> getlistDonHang()
    {
		if (this.role == Role.KH)
		{
			return this.listDonHang;
		}
		return null;
    }
	public static enum Role
	{
		KH("Khach hang"),
		NV("Nhan vien"),
		AD("Quan tri vien");
		private String roleName;
		private Role(String rname)
		{
			this.roleName=rname;
		}
		@Override
		public String toString() 
		{
			return this.roleName;
		}
		
	}
	public static enum Status
	{
		AU("Cho xac thuc"),
		AC("Active"),
		BL("Khoa tai khoan"),
		DC("Deactive");
		private String statusName;
		private Status(String sname)
		{
			this.statusName=sname;
		}
		@Override
		public String toString()
		{
			return this.statusName;
		}
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", ten=" + ten + ", SDT=" + SDT + ", email=" + email + ", matKhau=" + matKhau + "]";
	}
	
	
}
